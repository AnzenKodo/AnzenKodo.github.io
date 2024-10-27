/*
 * Original https://pkg.go.dev/github.com/shurcooL/github_flavored_markdown
 * Only used main.go with some modification file and deleted almost everything
 *
 ********************************************************************************
 *
 * MIT License
 *
 * Copyright (c) 2014 Dmitri Shuralyov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
*/

package main

import (
    "bytes"
    "fmt"
    "strings"
    "path"

    "golang.org/x/net/html"
	"github.com/russross/blackfriday"
    "github.com/shurcooL/sanitized_anchor_name"
    "github.com/alecthomas/chroma/quick"
)

// Markdown renders GitHub Flavored Markdown text.
func parse_md(text []byte) []byte {
	const htmlFlags = blackfriday.HTML_FOOTNOTE_RETURN_LINKS
	renderer := &renderer{ Html: blackfriday.HtmlRenderer(htmlFlags, "", "").(*blackfriday.Html) }
	return blackfriday.Markdown(text, renderer, extensions)
}

func parse_md_toc(text []byte) []byte {
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

func double_space(out *bytes.Buffer) {
	if out.Len() > 0 {
		out.WriteByte('\n')
	}
}

// extract_text returns the recursive concatenation of the text content of an html node.
func extract_text(n *html.Node) string {
	var out string
	for c := n.FirstChild; c != nil; c = c.NextSibling {
		if c.Type == html.TextNode {
			out += c.Data
		} else {
			out += extract_text(c)
		}
	}
	return out
}


func (options *renderer) Link(out *bytes.Buffer, link []byte, title []byte, content []byte) {
    mdLink := string(link)
    mdLinkContent := string(content)
    if path.Ext(mdLink) == ".md" {
        htmlLink := path_no_ext(mdLink)+".html"
        out.WriteString(fmt.Sprintf("<a href=\"%s\">%s</a>", htmlLink, mdLinkContent))
    } else {
		out.WriteString(fmt.Sprintf("<a href=\"%s\">%s</a>", mdLink, mdLinkContent))
    }
}

// GitHub Flavored Markdown heading with clickable and hidden anchor.
func (options *renderer) Header(out *bytes.Buffer, text func() bool, level int, _ string) {
	marker := out.Len()
	double_space(out)

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
		textContent = extract_text(node)
	} else {
		textContent = html.UnescapeString(textHTML)
	}
	anchorName := sanitized_anchor_name.Create(textContent)

	if extensions&blackfriday.HTML_TOC != 0 {
        options.TocHeaderWithAnchor(tocMaker, level - 1, anchorName)
    }

	out.WriteString(fmt.Sprintf(`<h%d><a name="%s" class="heading-anchor" href="#%s" rel="nofollow" aria-hidden="true"></a>%s</h%d>`, level, anchorName, anchorName, strings.TrimSpace(textHTML), level))
}

// TODO: Clean up and improve this code.
// GitHub Flavored Markdown fenced code block with highlighting.
func (*renderer) BlockCode(out *bytes.Buffer, text []byte, lang string) {
	double_space(out)

    if lang == "mermaid" {
        out.WriteString("<pre class='mermaid'>")
        out.Write(text)
        out.WriteString("</pre>")
        return
    }

	out.WriteString("<div class=\"code-block\">")
	if lang != "" {
	   out.WriteString(fmt.Sprintf(`<span class="code-block-language-name">.%s</span>`, lang))
	}

   err := quick.Highlight(out, string(text), lang, "html", "vulcan")
   if err != nil {
       fmt.Println("Error: can't genrate highlight for lang '", lang, "'.\n", err)
   }

	out.WriteString("</div>")
}

func escape_single_char(char byte) (string, bool) {
	if char == '"' {
		return "&quot;", true
	}
	if char == '&' {
		return "&amp;", true
	}
	if char == '<' {
		return "&lt;", true
	}
	if char == '>' {
		return "&gt;", true
	}
	return "", false
}

func attr_escape(out *bytes.Buffer, src []byte) {
	org := 0
	for i, ch := range src {
		if entity, ok := escape_single_char(ch); ok {
			if i > org {
				// copy all the normal characters since the last escape
				out.Write(src[org:i])
			}
			org = i + 1
			out.WriteString(entity)
		}
	}
	if org < len(src) {
		out.Write(src[org:])
	}
}

func (options *renderer) Image(out *bytes.Buffer, link []byte, title []byte, alt []byte) {
	out.WriteString("<img loading=\"lazy\" src=\"")
	attr_escape(out, link)
	out.WriteString("\" alt=\"")
	if len(alt) > 0 {
		attr_escape(out, alt)
	}
	if len(title) > 0 {
		out.WriteString("\" title=\"")
		attr_escape(out, title)
	}

	out.WriteString("\" />")
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
