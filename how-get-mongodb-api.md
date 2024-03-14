# Create mongoDb API
1. Sign in to mongodb https://www.mongodb.com/atlas/database
<img src="./attachments/mongo-1.png" width="400">

2. Add a **new project** from the top left corner
3. Add project name, then click Next
4. Click **Create Project**
5. Click **Create**
<img src="./attachments/mongo-2.png" width="400">

6. Choose M0 plan and name Cluster as `Cluster0`, then click **Create Deployment**
<img src="./attachments/mongo-3.png" width="600">

7. A pop up will show up, click **Add Your Current IP Address** -> **Add IP Address**
8. Create Username and Password. In my case, username is **bulbasaur**, and password is **hereisPassword**. Then click **Create Database User** -> **Choose a connection method**
<img src="./attachments/mongo-4.png" width="500">

9. Click **Drivers**
10. Click **Review setup project**
11. Copy the connection string and replace `<password>` by your password. For example:
I get this connection string
```
mongodb+srv://bulbasaur:<password>@cluster0.dyzicgw.mongodb.net/
```

Then, I change it to:
```
mongodb+srv://bulbasaur:hereisPassword@cluster0.dyzicgw.mongodb.net/
```

12. Click **Done**

---

# Add API to the app

1. In the `back-end` folder, create `config.env` with content below

```
ATLAS_URI=<Paste your API here>
PORT=5000
ACCESS_SECRET = "jwt-access-token-secret-key"
REFRESH_SECRET = "jwt-refresh-token-secret-key"
```

side note:`jwt-access-token-secret-key` is a string, it's not a token

For example:
```
ATLAS_URI=mongodb+srv://bulbasaur:hereisPassword@cluster0.dyzicgw.mongodb.net/
PORT=5000
ACCESS_SECRET = "jwt-access-token-secret-key"
REFRESH_SECRET = "jwt-refresh-token-secret-key"
```
2. Now go to the back-end folder and run `npm install` and `npm start`
3. Getting this log meaning it's working
```
$ npm start

> back-end@1.0.0 start
> nodemon app.jsx

[nodemon] 3.1.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: jsx,json
[nodemon] starting `node app.jsx`
Server is running... in port 5000
```
