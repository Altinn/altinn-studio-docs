components=$1
output=$2

if [[ $components && $output ]]; then 
	
	echo "Generate files for the following components:"
	for component in $(cat $components); do echo $component;done
	
	echo "Continue? (y)"
	read confirm

	if [[ "$confirm" = 'y' ]]; then

		# Create component folders
		for component in $(cat $components);do mkdir -p ${output}/$component;done


		for component in $(ls ${output});do
			# Copy template files
			cp ../_component-template/_index.nb.md ../_component-template/_index.en.md ${output}/$component/
	
			# Replace fields in frontmatter with component name
			sed -i '' 's/title: Komponent/title: '"$component"'/' ${output}/$component/_index.nb.md
			sed -i '' 's/linktitle: Komponent/linktitle: '"$component"'/' ${output}/$component/_index.nb.md
			sed -i '' 's/title: Component/title: '"$component"'/' ${output}/$component/_index.en.md
			sed -i '' 's/linktitle: Component/linktitle: '"$component"'/' ${output}/$component/_index.en.md
			sed -i '' 's/schemaname:/schemaname: '"$component"'/' ${output}/$component/_index.*
		done
	fi
else
	echo "Please provide a text file with component names and an output folder"
fi
