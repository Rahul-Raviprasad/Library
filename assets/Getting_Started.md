#Getting Started with the Database.

##1) Create the library database using following command.
Syntax:
Basic syntax of use DATABASE statement is as follows:
```
use DATABASE_NAME
```
```
>use library
switched to db library
```
To check your currently selected database use the command db
```
>db
library
```
If you want to check your databases list, then use the command show dbs.
```
>show dbs
local          0.000GB
mean-dev       0.000GB
reimbursement  0.000GB
```
Your created database (library) is not present in list.
To display database you need to insert at least one document into it.

In mongodb default database is "test".
If you didn't create any database then collections will be stored in test database.
