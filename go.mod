module ak-build

go 1.23.2

require (
	github.com/alecthomas/chroma v0.10.0
	github.com/mmcdole/gofeed v1.3.0
	github.com/russross/blackfriday v1.6.0
	github.com/shurcooL/sanitized_anchor_name v1.0.0
	golang.org/x/net v0.30.0
)

require (
	github.com/PuerkitoBio/goquery v1.8.0 // indirect
	github.com/andybalholm/cascadia v1.3.2 // indirect
	github.com/dlclark/regexp2 v1.4.0 // indirect
	github.com/json-iterator/go v1.1.12 // indirect
	github.com/mmcdole/goxpp v1.1.1-0.20240225020742-a0c311522b23 // indirect
	github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
	github.com/modern-go/reflect2 v1.0.2 // indirect
	golang.org/x/text v0.19.0 // indirect
)

replace (
	github.com/PuerkitoBio/goquery => ./libs/goquery
	github.com/alecthomas/chroma => ./libs/chroma
	github.com/andybalholm/cascadia => ./libs/cascadia
	github.com/dlclark/regexp2 => ./libs/regexp2
	github.com/json-iterator/go => ./libs/go
	github.com/mmcdole/gofeed => ./libs/gofeed
	github.com/mmcdole/goxpp => ./libs/goxpp
	github.com/modern-go/concurrent => ./libs/concurrent
	github.com/modern-go/reflect2 => ./libs/reflect2
	github.com/russross/blackfriday => ./libs/blackfriday
	github.com/shurcooL/sanitized_anchor_name => ./libs/sanitized_anchor_name
)
