# Summative3
Team project Val Isa &amp; Roy

set up:

Navigate to your wamp or mamp www folder
Open terminal or command prompt and cd into this folder, run git init
navigate to master-dev branch on github and copy the clone link
Run git clone <paste link>
You should have a folder named summative3 in this www folder now, cd into there and then into frontend
Run npm i, you can check everything is installed by seeing if the node_modules folder has bootstrap/popper etc
Do the same for backend folder
Return to the main folder containing the front and back ends and run npm install -g nodemon as well as npm install -g grunt-cli
These both note that you may need to use the sudo command for mac OS, which i believe you place after the command like npm install -g grunt-cli sudo
After this you need to set up both config files, i have included a fakeconfig file you just need to copy and input the info/change file name to config.json
Once that's sorted cd into backend and run nodemon -L
Terminal should print:

Mongodb app listening on port 3000!
We are connected to mongo db
DB connected!
