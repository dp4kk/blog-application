import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

var firebaseConfig = {
  apiKey: "AIzaSyAH80YN5cxtqPmwnHM2LYGeLKBkiD76FPQ",
  authDomain: "blog-project-b872c.firebaseapp.com",
  projectId: "blog-project-b872c",
  storageBucket: "blog-project-b872c.appspot.com",
  messagingSenderId: "772367213114",
  appId: "1:772367213114:web:a7e5c3e7bf8de8b93d8b03"
};

const  app=firebase.initializeApp(firebaseConfig)
export const auth=app.auth()
export default app