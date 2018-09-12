sudo apt install libgif-dev
git clone git@github.com:nteract/nteract.git
cd nteract
yarn
cd applications/desktop
yarn dist
cd dist
AppImage=$(ls nteract*.AppImage | head -1)
if [ $? -eq 0 ] 
then
chmod a+x $AppImage
./$AppImage --appimage-extract
else
echo "Error, the nteract AppImage doesn't exist!"
fi
