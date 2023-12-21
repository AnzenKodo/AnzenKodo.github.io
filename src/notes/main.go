package main

import (
	"bytes"
	_ "embed"
	"encoding/json"
    "fmt"
	"io"
	"io/fs"
	"log"
	"os"
	"path"
	"text/template"
)

type m map[string]string

func check(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func pathNoExt(filepath string) string {
	return filepath[:len(filepath)-len(path.Ext(filepath))]
}

func filename(filepath string) string {
	filebase := path.Base(filepath)
	return filebase[:len(filebase)-len(path.Ext(filebase))]
}

func getData() m {
	file, err := os.ReadFile("../" + os.Getenv("CONFIG"))
	check(err)

	var config m
	dec := json.NewDecoder(bytes.NewReader(file))
	dec.Decode(&config)

	data := make(m)
	data["name"] = "AK#Notes"
	data["short_name"] = "Notes"
	data["start_url"] = config["website"] + "notes"
	data["description"] = "My useless Notes."
	data["theme_color"] = ""
	data["background_color"] = ""
	data["foreground_color"] = ""
	data["author"] = config["username"]
	data["website"] = config["website"]
	data["logo"] = config["website"] + "assets/notes.png"
	data["input"] = "../note/Online"
	data["heading"] = ""
	data["url"] = config["website"] + ""
	data["output"] = "../" + os.Getenv("OUTPUT") + "/notes"

	return data
}

//go:embed index.html
var temp string

func htmlParse(inputPath string, outputPath string) {
	file, err := os.ReadFile(inputPath)

	tem, err := template.New("webpage").Parse(temp)
	check(err)

	data := getData()
	
	data["heading"] = filename(inputPath)
	data["title"] = data["name"] + " - " + data["heading"]
	
	data["content"] = string(Markdown(file))
	data["toc"] = string(MarkdownToc(file))
    
	buf := new(bytes.Buffer)
	err = tem.Execute(buf, data)
	check(err)

	err = os.WriteFile(outputPath, buf.Bytes(), 0666)
	check(err)
}

func copyFile(inputPath string, outputPath string) {
	src, err := os.Open(inputPath)
	check(err)
	defer src.Close()

	dist, err := os.Create(outputPath)
	defer dist.Close()

	_, err = io.Copy(dist, src)
	check(err)
}

func main() {
	data := getData()

	fs.WalkDir(
		os.DirFS(data["input"]), ".", func(filepath string, d fs.DirEntry, err error) error {
			check(err)
			if filepath[:1] == "." {
				return nil
			}

			inputFilepath := data["input"] + "/" + filepath
			outputFilepath := data["output"] + "/" + filepath
			htmlOutputFilepath := pathNoExt(outputFilepath) + ".html"
			if filepath == "README.md" {
				htmlOutputFilepath = data["output"] + "/index.html"
			}

			stat, err := os.Stat(inputFilepath)
			check(err)

			if stat.IsDir() {
				err := os.MkdirAll(outputFilepath, 0750)
				check(err)
                fmt.Println("Created folder"+outputFilepath, "from", inputFilepath)
				return nil
			}

			if path.Ext(inputFilepath) == ".md" {
				htmlParse(inputFilepath, htmlOutputFilepath)
                // fmt.Println("Created file", htmlOutputFilepath, "from", inputFilepath)
				return nil
			}

			copyFile(inputFilepath, outputFilepath)
            // fmt.Println("Copyed file", outputFilepath, "from", inputFilepath)

			return nil
		})
}
