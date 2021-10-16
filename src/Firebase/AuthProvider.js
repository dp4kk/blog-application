import React, { createContext, useEffect, useState } from 'react'
import {auth} from './Firebase'
import axios from 'axios';
import 'firebase/compat/auth'

export const FirebaseContext=createContext()
const AuthProvider = ({children}) => {
    const [error,setError]=useState('')
    const [currentUser,setCurrentUser]=useState()
    const [open,setOpen]=useState(false)
    const [userName,setUserName]=useState('')
    const [blogs,setBlogs]=useState([])
    const [displayBlog,setDisplayBlog]=useState([])
    const [loading,setLoading]=useState(true)

    const signup=(email,password)=>{
        return auth.createUserWithEmailAndPassword(email,password)
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
            console.log(blogs)          
            console.log(displayBlog)
    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    },[])
        const contexts={currentUser,signup,login,logout,error,setError,open,setOpen,userName,setUserName,blogs,setBlogs,displayBlog}
    return (
        <FirebaseContext.Provider value={contexts}>
            {!loading && children}
        </FirebaseContext.Provider>
    )
}

export default AuthProvider
