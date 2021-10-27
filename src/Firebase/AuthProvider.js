import React, { createContext, useEffect, useState } from 'react'
import {auth} from './Firebase'
import axios from 'axios';
import 'firebase/compat/auth'
import { createTheme } from '@mui/material/styles';



export const FirebaseContext=createContext()
const AuthProvider = ({children}) => {
    const [error,setError]=useState('')
    const [currentUser,setCurrentUser]=useState()
    const [open,setOpen]=useState(false)
    const [userName,setUserName]=useState('')
    const [blogs,setBlogs]=useState([])
    const [displayBlog,setDisplayBlog]=useState([])
    const [loading,setLoading]=useState(true)
    const [query,setQuery]=useState('')
    const [darkMode,setDarkMode]=useState(true)
    const signup=(email,password)=>{
        return auth.createUserWithEmailAndPassword(email,password)
    }
    //
    const themeset = createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light'
      },
    });
    if(currentUser){
    console.log(currentUser.displayName)
    }
    const login=(email,password)=>{
        return auth.signInWithEmailAndPassword(email,password)
    }

    const logout=()=>{
        return auth.signOut()
    }


       useEffect(() => {
         const getblogs = async () => {
           await axios
             .get("https://dpaak-blog-app.herokuapp.com/getblog")
             .then((response) => {
               setBlogs(response.data);
             })
             .catch((err) => {
               setTimeout(getblogs, 4000);
             });
         };
         getblogs();

         return()=>{
             setBlogs([])
         }
         //eslint-disable-next-line
       }, []);  

       useEffect(()=>{
           if(blogs){
            setDisplayBlog(
              blogs.map(data => {
                  return({
                  title: data.title,
                  content: data.content.substring(0,175),
                  imageUrl: data.imageURL,
                  date: data.date.substring(0, 10),
                  creator:data.creator,
                  id:data._id
                  })})
            );
           }
           return()=>{
               setDisplayBlog([])
           }
       },[blogs])
        
    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            if(userName!==''){
            user.updateProfile({
                displayName:userName
            }).then(()=>{console.log(user)}).catch(err=>console.log(err))}
            setLoading(false)
        })
        return unsubscribe
        //eslint-disable-next-line
    },[])


    useEffect(()=>{
        if(userName!==''){
            currentUser.updateProfile({
                displayName:userName
            }).then(()=>{console.log(currentUser)}).catch(err=>console.log(err))}
        }
        
    ,[userName,currentUser])

        const contexts={currentUser,signup,login,logout,error,setError,open,setOpen,userName,setUserName,blogs,setBlogs,displayBlog,query,setQuery,darkMode,setDarkMode,themeset}
    return (
        <FirebaseContext.Provider value={contexts}>
            {!loading && children}
        </FirebaseContext.Provider>
    )
}

export default AuthProvider
