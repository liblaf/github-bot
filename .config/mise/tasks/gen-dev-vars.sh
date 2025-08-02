#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

if [[ -f '.dev.vars' ]]; then exit 0; fi

chezmoi execute-template '.dev.vars.tmpl' --file --output '.dev.vars'
