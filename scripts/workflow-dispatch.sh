#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

workflow="$1"

gh repo list \
  --jq '.[].nameWithOwner' \
  --json 'nameWithOwner' \
  --limit 1000 \
  --no-archived \
  --source \
  --visibility public |
  while read -r repository; do
    gh workflow run "$workflow" --repo "$repository" || true
  done
