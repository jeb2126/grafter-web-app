# Grafter

## Project summary 

Grafter is a react web app designed to be a organisational hub for tradespeople making it easier for them to organise their projects. Grafter collates information about projects and materials together. Allowing users to view, add, update and delete them as they wish using firebase. 

### Step 1 - Clone repository from GitHub

On GitHub.com go to the following URL: https://github.com/jeb2126/grafter-web-app

Then navigate to the main page of the repository.

Click on the green Code button, above the list of files. To clone the repository using HTTPS, copy the given URL.

Once copied open the Terminal and change the current working directory to the location where you want the cloned directory.

Then type git clone in the Terminal and paste the URL copied earlier.
The Terminal command should look like the following: $ git clone https://github.com/jeb2126/grafter-web-app.git

Once done press enter to create a local clone of the repository.

### Step 2 - Open correct project folder

To ensure the correct project folder is open type into the Terminal: cd grafter-web-app

### Step 3 - create dotenv file

In order to link the project to the firesbase store create a file called .env and insert the following code into it:

REACT_APP_API_KEY=AIzaSyAkIICk8WweTPH68ElHnzKe-ryznnj-WVs
REACT_APP_AUTH_DOMAIN=grafter-web-app.firebaseapp.com
REACT_APP_PROJECT_ID=grafter-web-app
REACT_APP_STORAGE_BUCKET=grafter-web-app.appspot.com
REACT_APP_SENDER_ID=90990024519
REACT_APP_APP_ID=1:90990024519:web:3d0976737e67bb17659e62

### Step 4 - Run app in development mode

Once inside the project folder type into the Terminal: npm start
This will open http://localhost:3000 to view the app in the browser

## Minimum versions required to run project

Node.js: v17.1.0
