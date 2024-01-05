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
	"strings"
)

type m map[string]string

func check(err error, message ...string) {
	if err != nil {
		if len(message) > 0 {
			fmt.Println(message[0]);
		}
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
	file, err := os.ReadFile("../" + os.Getenv("INFO"))
	check(err, "Can't read INFO file.")

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
	data["logo"] = config["website"] + "assets/favicon/notes.png"
	data["heading"] = ""
	data["url"] = config["website"] + ""
	
	data["input"] = os.Getenv("HOME") + "/Documents/Notes/Online"
	data["inputDir"] = path.Base(data["input"])
	_, err = os.Stat(data["input"])
    if os.IsNotExist(err) { data["input"] = "../note/Online" }
    
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
	data["content"] = string(Markdown(file))
	data["toc"] = string(MarkdownToc(file))
    
    description := strings.Replace(strings.Replace(string(file), "  ", " ", -1), "\n", " ", -1)
	if filename(inputPath) == "index" {
	   fileDir := path.Base(path.Dir(inputPath))
	   
	   if fileDir == data["inputDir"] { 
            data["heading"] = "Home"
	   } else { 
            data["heading"] = fileDir
            data["description"] = description[:100]
	   }
	} else { 
        data["heading"] = filename(inputPath)
        data["description"] = description[:100]
    }
    data["title"] = data["heading"] + " - " + data["name"]

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
			check(err, "Problem with Dir sync: " + filepath)
			if filepath[:1] == "." {
				return nil
			}

			inputFilepath := data["input"] + "/" + filepath
			outputFilepath := data["output"] + "/" + filepath
			htmlOutputFilepath := pathNoExt(outputFilepath) + ".html"
			if filepath == "Home.md" {
				htmlOutputFilepath = data["output"] + "/index.html"
			}

			stat, err := os.Stat(inputFilepath)
			check(err, "Can't get file stat: " + inputFilepath)

			if stat.IsDir() {
				err := os.MkdirAll(outputFilepath, 0750)
				check(err, "Can't make Dir: " + outputFilepath)
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
