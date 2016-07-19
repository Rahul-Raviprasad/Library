#DB Setup
This gives a basic outline on how to setup MongoDB, and have the db, collections and their relationships setup.
Also it will have scripts and steps to initialize an empty DB with excel/JSON data already available with us.


##Install MongoDB Community Edition Manually On OS X

###1) Download the binary files for the desired release of MongoDB.
Download the binaries from https://www.mongodb.org/downloads.

For example, to download the latest release through the shell, issue the following:
```
curl -O https://fastdl.mongodb.org/osx/mongodb-osx-x86_64-3.2.8.tgz
```

###2) Extract the files from the downloaded archive.
For example, from a system shell, you can extract through the tar command:
```
tar -zxvf mongodb-osx-x86_64-3.2.8.tgz
```

###3) Copy the extracted archive to the target directory.
Copy the extracted folder to the location from which MongoDB will run.
```
mkdir -p mongodb
cp -R -n mongodb-osx-x86_64-3.2.8/ mongodb
```

###4) Ensure the location of the binaries is in the PATH variable.
The MongoDB binaries are in the bin/ directory of the archive. To ensure that the binaries are in your PATH, you can modify your PATH.

For example, you can add the following line to your shell’s rc file (e.g. ~/.bashrc):
```
export PATH=<mongodb-install-directory>/bin:$PATH
```
Replace <mongodb-install-directory> with the path to the extracted MongoDB archive.



##Run MongoDB

###1) Create the data directory.
Before you start MongoDB for the first time, create the directory to which the mongod process will write data. By default, the mongod process uses the /data/db directory. If you create a directory other than this one, you must specify that directory in the dbpath option when starting the mongod process later in this procedure.

The following example command creates the default /data/db directory:
```
mkdir -p /data/db
```

###2) Set permissions for the data directory.
Before running mongod for the first time, ensure that the user account running mongod has read and write permissions for the directory.


###3)	Run MongoDB.
To run MongoDB, run the mongod process at the system prompt. If necessary, specify the path of the mongod or the data directory. See the following examples.

Run without specifying paths

If your system PATH variable includes the location of the mongod binary and if you use the default data directory (i.e., /data/db), simply enter mongod at the system prompt:
```
mongod
```

Specify the path of the mongod¶

If your PATH does not include the location of the mongod binary, enter the full path to the mongod binary at the system prompt:
```
<path to binary>/mongod
```

Specify the path of the data directory¶

If you do not use the default data directory (i.e., /data/db), specify the path to the data directory using the --dbpath option:


```
mongod --dbpath <path to data directory>
```

###4)	Begin using MongoDB.
To help you start using MongoDB, MongoDB provides Getting Started Guides in various driver editions. See Getting Started for the available editions.

Before deploying MongoDB in a production environment, consider the Production Notes document.

Later, to stop MongoDB, press Control+C in the terminal where the mongod instance is running.

###5) One way of killing monogdb process
In this case, type the following command
```
ps wuax | grep mongo
You should see something that looks like this

User           31936   0.5 0.4 2719784 35624   ?? S     7:34pm   0:09.98 mongod
User           31945   0.0 0.0 2423368   184 s000 R+   8:24pm   0:00.00 grep mongo
Now enter the kill command for the mongod instance (31936 in this case):

kill 31936
```
