# Job interview assignment
We kindly ask you to solve the task below. By solving and submitting this assignment you provide us with insights in how you solve real-world problems. What we will be looking at are topics such as: choice of technology, structuring of code, use of VCS, selection of 3rd party libraries, documentation etc.

## The task
Develop a solution that, given a select query, can read data from a database, write it to a local file and then delete the data from the database. The solution should verify that data is written to the file, and that data integrity is maintained, before deleting it from the database.

- Use Bash, PHP, JavaScript or Go as the language
- Use MySQL, MariaDB, CockroachDB or SQLite as the database

Please use the data set provided in the SQL dump in this repo. Please also consider that your solution should be able to handle much larger data sets.

## Expectations
Make a copy of this repo. Solve the task below. Push your code to a public repo, and send us the link as a reply to our email.

Your solution should include a short readme describing your solution, how to use/test it and any final considerations such as known errors, next steps, security concerns etc. Don’t worry we are not expecting this thing to be perfect.


# Node.js and MySQL mini-project

#### Description
This mini-project develops a solution that, given a select query, can read data from a database, write it to a local file and then delete the data from the database. The solution should verify that data is written to the file, and that data integrity is maintained, before deleting it from the database.

#### Used tools 
To visualize and keep the data I used the database management system MySQL, and Express.js as the framework. 

#### Code description
The steps in the code are the following: first it creates a connection with mysql, then it connects to it and creates the database. If you already have a database, then the function that creates one is not necesarry for testing the solution. 
The function that selects from table `users`, stores the data in the variable `result`, stringifies it and saves it into a local file and checks the file size. After that, it hashes both from file and the data from the variable, and compares the hashes. If the hashes are the same and the file size if bigger than zero, then it means that the data is written and the integrity is maintained. 
The function checksum hashes the string version of the variable `results`. 

#### How to test
1. You need to have node and express js installed
3. run the file in the terminal from the project location using the `npm run dev` command-> open the browser and type: http://localhost:3000/createdb, see the results in the terminal
4. in another tab go to http://localhost/phpmyadmin and find the node_and_mysql database (to do that you need to have XAMPP installed)
5. insert the [sqldump.sql](https://github.com/cego/interview-assignment/blob/master/sqldump.sql "sqldump.sql") file
6. go to first tab and change to http://localhost:3000/getusers
7. see the result in the terminal and check the file users.json

#### Known errors
1. Before you create the database node_and_mysql comment line 11 and uncomment it after it was created and you can visualize it with phpmyadmin;
2. if the dependencies in node do not work try to install mysql and nodemon again with the help of `npm install` command.

#### Next steps
1. Import the [sqldump.sql](https://github.com/cego/interview-assignment/blob/master/sqldump.sql "sqldump.sql") file from code and not manually;
2. Instead of storing the data in a single variable (in this solution called: results), it would be nice to be able to stream it directly from the database, since the actual solution would slow down the process considerably if there was to work with large amounts of data.

#### Security concerns
There is needed a solution in case the connection with the database is lost and only a part of the data is saved to the file, then the issue would be that the data is lost when deleted from the database.

