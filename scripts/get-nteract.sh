sudo apt install libgif-dev
git clone git@github.com:nteract/nteract.git
cd nteract
yarn
cd applications/desktop
yarn dist
cd dist
AppImage=$(ls nteract*.AppImage)
chmod a+x $AppImage
./$AppImage --appimage-extract