#!/bin/bash

html_content=$(sed 's/"/\\"/g' template.html | tr -d '\n')
template="
  {
    \"TemplateName\": \"shut-confirm-email\",
    \"SubjectPart\": \"SHUT - Confirm Email\",
    \"TextPart\": \"\",
    \"HtmlPart\": \"$html_content\"
  }
"

# Create template
create_template() {
  aws ses create-template --template "$template"
}

# Funkcja do aktualizacji szablonu e-mail
update_template() {
  aws ses update-template --template "$template"
}

# Funkcja do usuwania szablonu e-mail
delete_template() {
  aws ses delete-template --template-name shut-confirm-email
}

# Sprawdzanie argumentu podanego do skryptu
if [ "$1" == "create" ]; then
  create_template
elif [ "$1" == "update" ]; then
  update_template
elif [ "$1" == "delete" ]; then
  delete_template
else
  echo "Usage: $0 {create|update|delete}"
  exit 1
fi
