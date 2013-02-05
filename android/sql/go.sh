ant clean
ant
unzip -o dist/*sql*.zip
cp -f -R ./modules /Library/Application\ Support/Titanium
rm -r ./modules

