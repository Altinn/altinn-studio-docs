components=$1
newComponents=$2

if [[ ${components} && ${newComponents} ]]; then
	echo "Move the following components:"
	for component in $(cat $components); do echo $component;done
	
	echo "Continue? (y)"
	read confirm

	if [[ "$confirm" = 'y' ]];then

		mkdir -p temporary-backup/

		for component in $(cat ${components}); do 
			mv ../${component} temporary-backup/
			mv ${newComponents}/${component} ../
		done
	fi
fi
		
