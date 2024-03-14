# For Firebase Storage Buckets for Front End Folder
1. Go to https://console.firebase.google.com/
2. Click `Add Project`
   - Name the Firebase project and don't enable google analytics for this project
   - Click create project and continue
4. Select `Default Account for Firebase` and click 'Create Project`
5. Under Get started by adding Firebase to your app click web
   - Add the name of your app
   - Don't enable firebase hosting
   - Copy the `apiKey, authDomanin, projectId, storageBucket, messagingSenderId, or appId` keys and continue to the console
     **MAKE SURE YOU SAVE YOUR KEYS FOR LATER**
6. Now within your project, go to the sidebar and click build, click storage, and get started
   - start in production mode
   - nam5 (us-central)
7. Now within the Storage go under rules and change `allow read, write: if false;` to `allow read, write: if true;`
   - publish the changes

---

# How to add the API to the app
1. Now within your code editor of the front-end/ do npm install
2. now within **front-end/** folder, create a file `.env` and put these keys within it
```
       -populate your .env file with this and initialize the variables with the API keys you saved earlier something like this:
   
       REACT_APP_BACKEND_URL=http://localhost:5000
    
       REACT_APP_API_KEY = 
       REACT_APP_AUTH_DOMAIN = 
       REACT_APP_PROJECT_ID = 
       REACT_APP_STORAGE_BUCKET = 
       REACT_APP_MESSAGING_SENDER_ID = 
       REACT_APP_APP_ID = 
```

For example in the .env: `REACT_APP_API_KEY=AIzaSyDeXC8ui1BTeL1UdvemE7ntCNscUxl_HTE`
      
