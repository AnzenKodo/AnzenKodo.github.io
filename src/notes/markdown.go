package main

import (
    "bytes"
    "fmt"
    "strings"
    "path"

	"github.com/russross/blackfriday"
    "github.com/shurcooL/sanitized_anchor_name"
    "github.com/alecthomas/chroma/quick"
    "golang.org/x/net/html"
)

// Markdown renders GitHub Flavored Markdown text.
func Markdown(text []byte) []byte {
	const htmlFlags = blackfriday.HTML_FOOTNOTE_RETURN_LINKS
	renderer := &renderer{ Html: blackfriday.HtmlRenderer(htmlFlags, "", "").(*blackfriday.Html) }
	return blackfriday.Markdown(text, renderer, extensions)
}

func MarkdownToc(text []byte) []byte {
	const htmlFlags = blackfriday.HTML_TOC | blackfriday.HTML_OMIT_CONTENTS
	renderer := &renderer{ Html: blackfriday.HtmlRenderer(htmlFlags, "", "").(*blackfriday.Html) }
	return blackfriday.Markdown(text, renderer, extensions)
}

// extensions for GitHub Flavored Markdown-like parsing.
const extensions = blackfriday.EXTENSION_NO_INTRA_EMPHASIS  |
                        blackfriday.EXTENSION_TABLES        |
                        blackfriday.EXTENSION_FENCED_CODE   | 
                        blackfriday.EXTENSION_AUTOLINK      |
                        blackfriday.EXTENSION_STRIKETHROUGH |
                        blackfriday.EXTENSION_SPACE_HEADERS |
                        blackfriday.EXTENSION_FOOTNOTES     |
                        blackfriday.EXTENSION_HEADER_IDS    |
                        blackfriday.EXTENSION_NO_EMPTY_LINE_BEFORE_BLOCK


type renderer struct {
	*blackfriday.Html
}
func (options *renderer) Link(out *bytes.Buffer, link []byte, title []byte, content []byte) {
    mdLink := string(link)
    mdLinkContent := string(content)
    if path.Ext(mdLink) == ".md" {
        htmlLink := pathNoExt(mdLink)+".html"
        out.WriteString(fmt.Sprintf("<a href=\"%s\">%s</a>", htmlLink, mdLinkContent))
    }
}

// GitHub Flavored Markdown heading with clickable and hidden anchor.
func (options *renderer) Header(out *bytes.Buffer, text func() bool, level int, _ string) {
	marker := out.Len()
	doubleSpace(out)

	if !text() {
		out.Truncate(marker)
		return
	}

	textHTML := out.String()[marker:]
	tocMaker := out.Bytes()[marker:]
	out.Truncate(marker)

	// Extract text content of the heading.
	var textContent string
	if node, err := html.Parse(strings.NewReader(textHTML)); err == nil {
		textContent = extractText(node)
	} else {
		// Failed to parse HTML (probably can never happen), so just use the whole thing.
		textContent = html.UnescapeString(textHTML)
	}
	anchorName := sanitized_anchor_name.Create(textContent)

	if extensions&blackfriday.HTML_TOC != 0 {	
        options.TocHeaderWithAnchor(tocMaker, level - 1, anchorName)
    }
        
	out.WriteString(fmt.Sprintf("<h%d>", level))
	out.WriteString(textHTML)
	out.WriteString(fmt.Sprintf(`<a name="%s" class="heading-anchor" href="#%s" rel="nofollow" aria-hidden="true"></a></h%d>`, anchorName, anchorName, level))
	
}

// extractText returns the recursive concatenation of the text content of an html node.
func extractText(n *html.Node) string {
	var out string
	for c := n.FirstChild; c != nil; c = c.NextSibling {
		if c.Type == html.TextNode {
			out += c.Data
		} else {
			out += extractText(c)
		}
	}
	return out
}

// TODO: Clean up and improve this code.
// GitHub Flavored Markdown fenced code block with highlighting.
func (*renderer) BlockCode(out *bytes.Buffer, text []byte, lang string) {
	doubleSpace(out)
	
	err := quick.Highlight(out, string(text), lang, "html", "rrt")
	check(err)
}

// Task List support.
func (r *renderer) ListItem(out *bytes.Buffer, text []byte, flags int) {
	switch {
	case bytes.HasPrefix(text, []byte("[ ] ")):
		text = append([]byte(`<input type="checkbox" disabled="">`), text[3:]...)
	case bytes.HasPrefix(text, []byte("[x] ")) || bytes.HasPrefix(text, []byte("[X] ")):
		text = append([]byte(`<input type="checkbox" checked="" disabled="">`), text[3:]...)
	}
	r.Html.ListItem(out, text, flags)
}

func doubleSpace(out *bytes.Buffer) {
	if out.Len() > 0 {
		out.WriteByte('\n')
	}
}