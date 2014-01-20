package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
)

func handler(w http.ResponseWriter, r *http.Request) {
	// Workaround for Quentin's system configuration.
	// For some reason, css files are getting served
	// without a content-type...
	if strings.HasSuffix(r.URL.Path, ".css") {
		w.Header().Set("Content-Type", "text/css")
	}

	url := r.URL.Path

	log.Println(url)

	if url == "" {
		url = "/default.htm"
	}

	http.ServeFile(w, r, "."+url)
}

func main() {
	portNumber := flag.Int("port", 8080, "Sets the port the server listens on for both http requests and websocket connections.")

	flag.Parse()

	http.HandleFunc("/", handler)

	fmt.Println("Beginning HTTP listening on port", *portNumber)
	err := http.ListenAndServe(":"+strconv.Itoa(*portNumber), nil)
	if err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
