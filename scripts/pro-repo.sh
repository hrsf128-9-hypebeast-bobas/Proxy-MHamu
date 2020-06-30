cd repos
git clone https://github.com/hrsf128-9-hypebeast-bobas/$1.git
cd $1
npm install
npm run $2
npm run start