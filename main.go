package main

import (
	"bytes"
    "fmt"
	"io"
	"io/fs"
	"os"
	"path"
	"text/template"
	"strings"
	"bufio"
	"time"
    "context"
	"net/http"

	"github.com/mmcdole/gofeed"
)

const VERSION = "0.1"
const PORT = "8080"
var Website = "https://AnzenKodo.github.io"

type Config map[string]string

func get_config() Config {
    return Config{
        "name": "Aman",
        "username": "AnzenKodo",
        "website": Website,
        "output": "site",
        "template": "template",
    }
}

func check(err error, v ...any) {
	if err != nil {
        fmt.Fprint(os.Stderr, "Error: ", fmt.Sprint(v...), "\n", err)
        os.Exit(1)
	}
}

func path_no_ext(filepath string) string {
	return filepath[:len(filepath)-len(path.Ext(filepath))]
}

func filename(filepath string) string {
	filebase := path.Base(filepath)
	return filebase[:len(filebase)-len(path.Ext(filebase))]
}

func mkdir(in string) {
    err := os.MkdirAll(in, 0750)
    check(err, "can't make dir:", in)
}

func copy_dir(dist string, src string) {
    _, err := os.Stat(src)
    if !os.IsNotExist(err) {
        err := os.RemoveAll(src)
        check(err, "can't remove dir: ", src)
    }

    err = os.CopyFS(src, os.DirFS(dist))
    check(err, "can't copy dir '", src, "' to '", dist, "'.")
}

func read_file(in string) []byte {
    content, err := os.ReadFile(in)
    check(err, "can't read file: ", in)
    return content
}

func write_file(out string, content []byte) {
	err := os.WriteFile(out, content, 0666)
    check(err, "can't write template file: ", out)
}

func copy_file(in string, out string) {
	src, err := os.Open(in)
	check(err, "can't open file:", in)
	defer src.Close()

	dist, err := os.Create(out)
	check(err, "can't create file:", out)
	defer dist.Close()

	_, err = io.Copy(dist, src)
	check(err, "can't copy file '" + in + "' to '" + out + "'")
}

func parse_file(in string, out string, config Config) {
    config["url"] = config["start_url"] + strings.Replace(out, config["output"], "", -1)

    file := read_file(in)

	tem, err := template.New("webpage").Parse(string(file))
    check(err, "can't make render template file: ", in)

	buf := new(bytes.Buffer)
    err = tem.Execute(buf, config)
    check(err, "can't execute template file: ", in)

    write_file(out, buf.Bytes())

    fmt.Println("Created file '" + out + "' from '" + in + "'")
}

func handle_md(in string, in_dir string, config Config) Config {
    content := read_file(in)
    config["content"] = string(parse_md(content))
    config["toc"] = string(parse_md_toc(content))

    description := strings.Replace(strings.Replace(string(content), "  ", " ", -1), "\n", " ", -1)
    description_len := len(description)
    if description_len > 100 {
        description_len = 100
    }

    if filename(in) == "index" {
        file_dir := path.Base(path.Dir(in))

        if file_dir == path.Base(in_dir) {
            config["heading"] = "Home"
        } else {
            config["heading"] = file_dir
            config["description"] = description[:description_len]
        }
    } else {
        config["heading"] = filename(in)
        config["description"] = description[:description_len]
    }
    config["title"] = config["heading"] + " - " + config["website_name"]

    return config
}

func make_index() {
    config := get_config()
    config["theme"] = "#f20544"
    config["favicon"] = config["website"] + "/assets/favicon/index.png"
    config["description"] = config["name"] + " aka " + config["username"] + " official website."
    config["logo"] = config["website"] + "/assets/img/logo.png"

    content := read_file("README.md")
    config["content"] = string(parse_md(content))

    in := config["template"] + "/index.html"
    out := config["output"] + "/index.html"

    parse_file(in, out, config)
}

func make_404() {
    config := get_config()
    config["theme"] = "#f20544"
    config["favicon"] = config["website"] + "/assets/favicon/index.png"
    config["description"] = "Page Not Found"
    config["page"] = "404"
    config["content"] = `<h1>Page Not Found</h1>
    <p>Go back <a href="` + config["website"] +`">Home</a></p>
</h1>`

    in := config["template"] + "/page.html"
    out := config["output"] + "/404.html"

    parse_file(in, out, config)
}

func make_license() {
    config := get_config()
    config["theme"] = "#f20544"
    config["favicon"] = config["website"] + "/assets/favicon/index.png"
    config["description"] = "License of " + config["username"]
    config["page"] = "License"

    content := read_file("LICENSE.md")
    config["content"] = string(parse_md(content))

    in := config["template"] + "/page.html"
    out := config["output"] + "/license.html"

    parse_file(in, out, config)
}

func make_notes() {
    config := get_config()
    config["theme"] = "#FF6C22"
    config["favicon"] = config["website"] + "/assets/favicon/notes.png"
    config["description"] = "My useless Notes."
    config["website_name"] = "AK#Notes"
    config["start_url"] = config["website"] + "/notes"
    config["short_name"] = "Notes"

    in_dir := os.Getenv("HOME") + "/Drive/Notes/Online"
    _, err := os.Stat(in_dir)
    if os.IsNotExist(err) { in_dir = "./notes/Online" }

    out_dir := config["output"] + "/notes"

	fs.WalkDir(os.DirFS(in_dir), ".", func(file string, _ fs.DirEntry, err error) error {
		check(err, "problem with dir sync: " + file)

		if file[:1] == "." {
			return nil
		}

		in_file := in_dir + "/" + file
		out_file := out_dir + "/" + file
		html_out_file := path_no_ext(out_file) + ".html"

		stat, err := os.Stat(in_file)
		check(err, "can't get file stat: " + in_file)

		if stat.IsDir() {
            mkdir(out_file)
            fmt.Println("Created folder '" + out_file + "' from '" + in_file + "'")
			return nil
		}

		if path.Ext(in_file) == ".md" {
            in := config["template"] + "/notes.html"
            out := html_out_file
            config := handle_md(in_file, in_dir, config)
			parse_file(in, out, config)
			return nil
		}

		copy_file(in_file, out_file)
        // fmt.Println("Copyed file '" + out_file + "' from '" + in_file + "'")

		return nil
    })
}

func make_br() {
    config := get_config()
    config_opml := get_config()

    config["theme"] = "#2fafff"
    config["favicon"] = config["website"] + "/assets/favicon/blogroll.png"
    config["description"] = "List of websites that " + config["username"] + " reads."
    config["website_name"] = "AK#Blogroll"
    config["start_url"] = config["website"] + "/blogroll"
    // Theme: Modus Vivendi Tinted
    config["bg"] = "#0d0e1c"
    config["fg"] = "#FFFFFF"

    config_opml["website_name"] = "AK#Feed"
    config_opml["date"] = time.Now().Format(time.RFC822)

    in_opml_md := os.Getenv("HOME") + "/Online/Notes/Feed.md"
    _, err := os.Stat(in_opml_md)
    if os.IsNotExist(err) { in_opml_md = "Feed.md" }

    file, err := os.Open(in_opml_md)
    check(err, "can't open file:", in_opml_md)
    defer file.Close()

    scanner := bufio.NewScanner(file)
    ran := false
    for scanner.Scan() {
		line := scanner.Text()

        if len(line) == 0 {
            continue
        }
        if line[0] == '#' {
            topic := line[3:]
            topic_id := strings.Replace(strings.ToLower(topic), " ", "_", -1)

            config["content"] += "<h2 id='" + topic_id + "'><a href='#" + topic_id + "' aria-hidden='true'></a>" + topic + "</h2>"
            if ran {
                config_opml["content"] += "\n\t\t</outline>\n"
            }
            config_opml["content"] += "\t\t" + `<outline title="` + topic + `" text="` + topic + `">`;
        }
		if line[0] == '-' {
		    feed_url := line[2:]

            ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
            defer cancel()

		    feed, err := gofeed.NewParser().ParseURLWithContext(feed_url, ctx)
		    if err != nil {
                config["content"] += `<details>
    <summary>`+feed_url+` <a href="`+feed_url+`" target="_blank">Feed</a></summary>
    <p>`+fmt.Sprint(err)+`</p>
</details>`
                fmt.Fprint(os.Stderr, "Couldn't parse feed: ", feed_url, "\n", err, "\n")
                continue
		    }

		    config["content"] += `<details>
	<summary>`+feed.Title+` <a href="`+feed.Link+`" target="_blank">URL</a> | <a href="`+feed_url+`" target="_blank">Feed</a></summary>
	<p>`+feed.Description+`</p>
	<ul>`

            for _, item := range feed.Items {
                config["content"] += `<li><a href="`+item.Link+`" target="_blank">`+item.Title+`</a> `+item.Published+`</li>`
            }

            config["content"] += `</ul>
</details>`

            config_opml["content"] += "\n\t\t\t" + `<outline text="`+feed.Title+`" title="`+feed.Title+`" htmlUrl="`+feed.Link+`" language="english" type="`+feed.FeedType+`" xmlUrl="`+feed_url+`" />`

            fmt.Println("Parsed feed:", feed_url)
		}
		ran = true
	}
    config_opml["content"] += "\n\t\t</outline>"

	err = scanner.Err()
	check(err, "can't reading file:", in_opml_md)

    dir := config["output"] + ""
    mkdir(dir)

    in := config["template"] + "/blogroll.html"
    out := dir + "/index.html"
    parse_file(in, out, config)

    in_mf := config["template"] + "/manifest.json"
    out_mf := dir + "/manifest.json"
    parse_file(in_mf, out_mf, config)

    in_opml := config_opml["template"] + "/feed.opml"
    out_opml := dir + "/feed.opml"
    parse_file(in_opml, out_opml, config_opml)
}

func make_brave_reward_verification() {
    config := get_config()

    dirname := config["output"] + "/.well-know"
    filename := dirname + "/brave-rewards-verification.txt"
    content := `This is a Brave Creators publisher verification file.

Domain: anzenkodo.github.io
Token: 71f75ea13a91a0b84f3042f46af322cbf1e01ad87d47c14fecad2fab04eb1f21`

    mkdir(dirname)
    write_file(filename, []byte(content))
    fmt.Println("Created file '" + filename + "'")
}

func start_server(port string) {
    config := get_config()

	fmt.Println("Serving", config["output"], "on", config["website"])
    fmt.Fprint(os.Stderr, http.ListenAndServe(":"+port, http.FileServer(http.Dir(config["output"]))))
}

func copy_assets() {
    config := get_config()
    copy_dir("assets", config["output"]+"/assets")
    fmt.Println("Copied 'assets' to '"+config["output"]+"/assets'.")
}

func print_help() {
    name := os.Args[0]
    config := get_config()

    fmt.Println(name+` aka AK#Build is `+config["username"]+` build system.

Usage of `+name+`:
    build                   Build all sites expect Blogroll.
    build-all               Build all sites.
    build-notes             Build only notes.
    build-br                Build only Blogroll.
    serve [port]            Start server in '`+config["output"]+`' dir.
    serve-only [port]       Start only server in `+config["output"]+`' dir.
                            Default port number is '`+PORT+`'.
    help --help -h          Print help message.
    version --version -v    Print version number.

Version: `+VERSION+`
License: [MIT](https://spdx.org/licenses/MIT)
`)
    os.Exit(0)
}

func main() {
    if len(os.Args) < 2 {
        print_help()
    }

    arg := os.Args[1]

    if arg == "help" || arg == "--help" || arg == "-h" {
        print_help()
    }
    if arg == "version" || arg == "--version" || arg == "-v" {
        fmt.Println("Version:", VERSION)
        os.Exit(1)
    }

    config := get_config()
    mkdir(config["output"])

    port := PORT
    if len(os.Args) > 3 {
        para := os.Args[2]
        if para == "port" {
            port = para
        } else {
            fmt.Print(os.Stderr, "Error: Wrong argument provided: ", para, "\n\n")
            print_help()
        }
    }
    if arg == "serve" {
        Website = "http://localhost:"+port

        make_index()
        make_license()
        make_404()
        make_brave_reward_verification()
        make_notes()
        copy_assets()

        start_server(port)
    } else if arg == "serve-only" {
        Website = "http://localhost:"+port
        start_server(port)
    }

    if arg == "build_all" {
        make_index()
        make_license()
        make_404()
        make_brave_reward_verification()

        make_notes()
        make_br()
    } else if arg == "build" {
        make_index()
        make_license()
        make_404()
        make_brave_reward_verification()

        make_notes()
    } else if arg == "build-notes" {
        make_notes()
    } else if arg == "build-br" {
        make_br()
    } else {
        fmt.Fprint(os.Stderr, "Error: Wrong argument provided: ", arg, "\n\n")
        print_help()
    }

    copy_assets()
}
