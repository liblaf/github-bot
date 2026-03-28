#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

{
  echo '# -*- mode: dotenv; -*-'
  bws secret list --output env 'f70d4be0-4425-4646-a7e1-b41b00963d9c'
} > "$MISE_PROJECT_ROOT/.dev.vars"
