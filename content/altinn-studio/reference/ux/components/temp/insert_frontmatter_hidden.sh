dir=$1

for f in $(ls ${dir})
do
sed -i '' '1i\
---\
hidden: true\
---\
\
' $dir/$f
done
