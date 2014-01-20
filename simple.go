package main

import (
	"net/http"
	"strings"
)

func handler(w http.ResponseWriter, r *http.Request) {
	// Workaround for Quentin's system configuration.
	// For some reason, css files are getting served
	// without a content-type...
	if strings.HasSuffix(r.URL.Path, ".css") {
		w.Header().Set("Content-Type", "text/css")
	}
	http.ServeFile(w, r, "."+r.URL.Path)
}

func main() {
	http.HandleFunc("/", handler)
}
