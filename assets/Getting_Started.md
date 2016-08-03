#Getting Started with the Database.

##1) Create the library database as shown below.
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

##2) Create the Required collections as shown below.
Syntax:
Basic syntax of createCollection() command is as follows
```
db.createCollection(name, options)
```
In the command, name is name of collection to be created. Options is a document and used to specify configuration of collection
```
Parameter	  Type	    Description
Name	      String	  Name of the collection to be created
Options	    Document	(Optional) Specify options about memory size and indexing
```
Options parameter is optional, so you need to specify only name of the collection.
Refer the link for more details.
```
http://www.tutorialspoint.com/mongodb/mongodb_create_collection.htm
```

While inserting the document, MongoDB first checks size field of capped collection, then it checks max field.

* 1) Creating Users Collection
```
db.createCollection("col_users")
{ "ok" : 1 }
> show collections
col_users
```

* 2) Creating Books Collection
```
db.createCollection("col_books")
{ "ok" : 1 }
> show collections
col_books
col_users
```
* 3) Creating Transaction Collection
```
db.createCollection("col_transaction")
{ "ok" : 1 }
> show collections
col_books
col_transaction
col_users
```
* 4) Creating Reviews Collection
```
db.createCollection("col_reviews")
{ "ok" : 1 }
> show collections
col_books
col_reviews
col_transaction
col_users
```

* 5) Creating Category Collection
```
db.createCollection("col_category")
{ "ok" : 1 }
> show collections
col_books
col_category
col_reviews
col_transaction
col_users
```
##3) Importing the database

* 1) Use the following command to import the data from the csv format.
Syntax is as follows:
```
mongoimport --db <databaseName> --collection <collectionName> --type csv --headerline --file <path>
```
Example is as shown below:
```
mongoimport --db myDb --collection myCollection --type csv --headerline --file anoopg/Downloads/Books\ List1.csv

```


* 2) Run the below query to change the fields in the mongodb

```
db.books.updateMany({},{$rename:{"Review Link":"reviewLink", "Condition":"condition", "Possessor":"possessor","State":"state","Publication":"publications","Title":"title","Type":"category"}})

```
