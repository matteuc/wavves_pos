# wavves POS (Point of Sale)
**wavves**, a simple POS system built on *Express.js* and *Handlebars.js*, is a lightweight business management application designed to help businesses establish an easy to use POS. There are three main functions: a) creating new transactions, b) modifying the products that are available for sale, and c) viewing previous transactions. To get started with **wavves**, follow the instructions below!

## Usage 
The **wavves** POS can be initiated via the command line:

First, install the dependencies...
```sh
$ npm install 
```

... then, create a new file named *.env* in the root directory and enter the following code:
```
MYSQL_SECRET={Your MySQL Secret}
```
*Replace '{Your MySQL Secret}' with your MySQL password; no quotes are necessary*

... then, open up your favorite MySQL GUI (i.e. MySQL Workbench) or the MySQL CLI to run the file *schema.sql* within the *db* directory. Feel free to populate your product database by running *seeds.sql* in the same directory, though you can just as easily add your own custom products within the application itself.

... and you are good to go!
```sh
$ node wavves_pos_server
```

*If running locally, the application can be found at http://localhost:8080/*

### Packages
The application uses two node packages. Their names and usage are listed below.

| API | DOCUMENTATION | FUNCTION |
| ------ | ------ | ------ |
| *dotenv* | https://www.npmjs.com/package/dotenv | Allows use of environmental variables |
| *express* | https://www.npmjs.com/package/express | Allows use of Express.js |
| *express-handlebars* | https://www.npmjs.com/package/express-handlebars | Allows use of Handlebars.js (templating framework) with Express.js |
| *moment* | https://www.npmjs.com/package/moment | Allows use of Moment.js (date formatter & parser) |
| *mysql* | https://www.npmjs.com/package/mysql | Allows connection to your local MySQL database |


