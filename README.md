## How to get your on API for MongoDB Database and Firebase Storage Buckets
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
      
   
### For Mongodb Database for Backend Folder


## How to run the web properly?
Use two terminal:

1. Get API access from Henry or Edmund (only once)
   - to configure API access within the backend you will have to make a file called "config.env" and put the access token, refresh token, and MongoDB database within the back-end/ folder
   - to configure API access within the frontend you will have to make a file called ".env" and put the firebase storage bucket APIs within the front-end/ folder
2. CD into chop-recipes-web/back-end
   - run `npm install`
3. CD into chop-recipes-web/front-end
   - run `npm install`
5. run `npm start` in the **back-end** folder
6. run `npm start` in the **front-end** folder

## Resources Used During Construction:

Tutorials:
- https://www.youtube.com/watch?v=rzoLTK3T36U "Ep36 - Editable Field in React"
- https://www.youtube.com/watch?v=Op5LkZiAn2E&t=120s&ab_channel=AshishNallana "MERN File Upload using Firebase 🔥| Upload Files & Images to MongoDB | Firebase Storage"
- https://www.youtube.com/watch?v=dX_LteE0NFM&ab_channel=WebDevCody

Online Components:
- https://tailwindcomponents.com/component/tailwind-css-404-error-page
- https://www.flaticon.com/
- https://gradientbuttons.colorion.co/


Docs:
- https://tailwindcss.com/
- https://mongodb.com/docs
- https://firebase.google.com/docs/storage/web/start
- https://jwt.io/introduction
- https://expressjs.com/en/resources/middleware/cookie-parser.html
- https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- https://react.dev/reference/react/useContext
