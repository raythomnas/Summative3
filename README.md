This is an events app where attendees/organizers will be able to read, comment, edit and delete events once they are logged in (CRUD).

	Step 1: Install root folder
	Github link: https://github.com/raythomnas/Summative3.git

	Front and Back end
	Will be located in the same project root folder called Summative3
	For the first time working in the project, please access the terminal and:

	iOS(MAMP): 
			cd <drag folder htdocs>
			cd htdocs
			git clone master-dev <github link master-dev>
			cd Summative3
			sudo npm install nodemon -g
			sudo npm install -g grunt-cli

	Step 2: Install Packages
			cd backEnd
			npm i
			cd frontEnd
			npm i

	Step 3: First commit to Github
	All members will create their own brunch to send their updates. Create your branch to send your first commit.
			git branch (all branches should show)
			git checkout -b <your new branch name> (creates a new branch)
			git checkout <branch name> (to switch to a local branch)
			git status
			git add .
			git commit -m “<##>”
			git push --set-upstream origin <branch name>

	Step 4:To add any Updates from GitHub
	To Pull:
			cd <drag folder htdocs>
			cd htdocs
			cd Summative 3
			git branch -a (Show all branches : local and remote)
			git checkout <your branch name> (to switch to a local branch that track a remote branch that has the same name)
			git pull origin master-dev

	To Push:
		
			git status
			git add .
			git commit -m “<##>”
			git push origin <your branch name>

	Step 5: Run the project
	Back end 
		In one terminal window:
			Install nodemon globally sudo npm install nodemon -g (if not done earlier, do it just once)
			Use the legacy version in vagrant set up nodemon -L index.js
			Use this non-vagrant set up nodemon index.js to run it
		In the browser:
			Lab computer: http://192.168.33.10:3000/
			Laptop : http://localhost:3000. 
			If running through vagrant delete \"open http://localhost:8888\" in package .json file
	Front end
		In a 2d terminal window: ###########
		In the browser:
			Lab computer: http://192.168.33.10
			Laptop: http://localhost/ (accessing through MAMP)

