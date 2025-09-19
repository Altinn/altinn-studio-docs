dir=$1

for f in $(ls ${dir} | egrep '(nb|en).md')
do
	echo $f
sed -i '' -n '/<!-- begin intro -->/,$p' ${dir}/$f
done
