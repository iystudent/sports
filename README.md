How to run this application locally
- Ensure you have installed MongoDB latest version
- In mongoDB create a database 'sports'
- In sports/archive folder there is a data in file called 'results.csv'
- Import 'results.csv' into the newly created database 'sports'
- Database configuration file can be found in config/setting.js
- Ensure you have installed node  v20.5.0
- Clone the repository and run `npm install` command in your terminal to install all the dependencies.
- Run `node index.js`.
- The server will be started in port 3000
- Open chrome and visit http://localhost:3000

How to run this application in production
- For production first signup with mongo atlas
- Create user name and password
- Choose a free account 
- Create database called 'sports' with collection results
- On connect to database choose connect with mongodb
- Copy connection string and paste it as server url in config/setting.js
- Replace password with the password created above
- Go to render.com and create an account
- Connect with your github repository
- On deployment enter name of the site
- Run time choose node
- Build command enter 'npm install' to install all depencies listed in package.json file
- Start command enter 'node index.js'
- Instance type choose free
- Then click on Create Web service
- Click at your web url at the top after creating web service to access your website