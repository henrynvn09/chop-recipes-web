### For Firebase Storage Buckets for Front End Folder
1. Go to https://console.firebase.google.com/
2. Click `Add Project`
   - name the storage bucket
3. Click continue
4. Select `Default Account for Firebase` and click 'Create Project`
5. Under Get started by adding Firebase to your app click web
   - Add the name of your app
   - Copy the initialization of Firebase and continue to the console
6. Now within your project, go to the sidebar and click build, click storage, and get started
   - start in production mode
   - nam5 (us-central)
7. Now within the Storage go under rules and change `allow read, write: if false;` to `allow read, write: if true;`
8. Now within your code editor of the front-end/ do npm install or npm install Firebase 
9. now within **front-end/index.js** and add which is just the initialization of Firebase given
    
       import firebase from "firebase/compat/app";
          const firebaseConfig = {
            apiKey: process.env.REACT_APP_API_KEY,
            authDomain: process.env.REACT_APP_AUTH_DOMAIN,
            projectId: process.env.REACT_APP_PROJECT_ID,
            storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_APP_ID
          };
       firebase.initializeApp(firebaseConfig);
   
   - make sure to replace all the keys with your keys
   - if you want to keep your keys more private you can put them in a `.env file` within the front-end/
      - For example in the .env: `REACT_APP_API_KEY=AIzaSyDeXC8ui1BTeL1UdvemE7ntCNscUxl_HTE`

