package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
)

type CountRequest struct {
	Word            string `json:"character"`         // frontend sends as 'character'
	CountWithSpaces string `json:"count_with_spaces"` // "yes" or "no"
	CountType       string `json:"count_type"`        // "row" or "column"
}

type CountResponse struct {
	TotalCount int `json:"total_count"`
}

func countWords(character, countWithSpaces, countType string) int {
	switch countType {
	case "row":
		lines := strings.Split(character, "\n")
		if countWithSpaces == "no" {
			// Only count non-empty lines (lines with at least one word)
			count := 0
			for _, line := range lines {
				if len(strings.Fields(line)) > 0 {
					count++
				}
			}
			return count
		}
		// With spaces: count all lines, including empty ones
		return len(lines)

	case "column":
		if countWithSpaces == "no" {
			// Count all characters except spaces, tabs, and newlines
			cleaned := strings.ReplaceAll(character, " ", "")
			cleaned = strings.ReplaceAll(cleaned, "\t", "")
			cleaned = strings.ReplaceAll(cleaned, "\n", "")
			return len([]rune(cleaned))
		}
		// With spaces: count all characters except newlines
		noNewline := strings.ReplaceAll(character, "\n", "")
		return len([]rune(noNewline))

	default:
		return 0
	}
}

func countHandler(w http.ResponseWriter, r *http.Request) {
	// Enable CORS for dev
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var req CountRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// Debug log to verify received input
	log.Printf("Received: %q\n", req.Word)

	totalCount := countWords(req.Word, req.CountWithSpaces, req.CountType)
	resp := CountResponse{TotalCount: totalCount}
	json.NewEncoder(w).Encode(resp)
}

func main() {
	http.HandleFunc("/api/count", countHandler)
	log.Println("Backend listening at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
