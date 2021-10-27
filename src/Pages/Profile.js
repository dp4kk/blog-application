import { Card, CardActions, CardContent, Grid, Typography,IconButton, createTheme, Paper, ThemeProvider } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext,useEffect, useState } from 'react'
import { FirebaseContext } from '../Firebase/AuthProvider'
import axios from 'axios'
import {Link ,useHistory} from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import HomeIcon from "@mui/icons-material/Home";
import Brightness4Icon from "@mui/icons-material/Brightness4";
const theme=createTheme()
const useStyles = makeStyles(() => ({
  home: {
    position: "absolute",
    left: 0,
    top: 0,
    margin: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  paper: {
    width: "100%",
    minHeight: "100vh",
  },
  dark: {
    position: "absolute",
    right: 0,
    top: 0,
    margin: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
}));
const Profile = () => {
    const history=useHistory()
    const classes=useStyles()
    const {currentUser,themeset,darkMode,setDarkMode}=useContext(FirebaseContext)
    const [blogs,setBlogs]=useState([])
    const [displayBlog,setDisplayBlog]=useState([])
    useEffect(()=>{
        const getBlogs=async()=>{
            axios
              .get("https://dpaak-blog-app.herokuapp.com/userblog", {
                params: {
                  name: currentUser.displayName,
                },
              })
              .then((res) => {
                setBlogs(res.data);
              })
              .catch(() => setTimeout(getBlogs, 4000));
        }
        getBlogs()
        return ()=>{
            setBlogs()
            
        }
    },[currentUser])

    useEffect(()=>{
        if(blogs){
            setDisplayBlog(
            blogs.map((data)=>{
                return({
                    title:data.title,
                    id:data._id,
                    content:data.content.substring(0,200),
                    date:data.date.substring(0,10)
                })
            })
            )}
    },[blogs])

    console.log(displayBlog)

    console.log(blogs)
    return (
        <React.Fragment>
        <ThemeProvider theme={themeset} >
        <Paper className={classes.paper}>
        <Typography align='center' variant='h2' color='secondary'><Box fontFamily='fantasy' >{currentUser.displayName}'s blog</Box></Typography>
        <div className={classes.home}>
            <IconButton color='secondary' onClick={()=>history.push('/')}><HomeIcon fontSize='large'/></IconButton>
        </div>
        <div className={classes.dark}>
            <IconButton color='secondary' onClick={()=>setDarkMode(!darkMode)}><Brightness4Icon fontSize='large'/></IconButton>
        </div>
        {
            displayBlog.length ? (
                 <Grid container spacing={4}>
                 {displayBlog.map(item=>{
                     return (
                       <Grid item key={item.id}>
                         <Card sx={{maxWidth:500,margin:10}} variant='outlined'>
                           <CardContent>
                             <Typography align="left" variant="h5" color='secondary'>
                               <Box fontFamily='fantasy'>{item.title}</Box>
                             </Typography>
                             <Typography align="left" variant="subtitle2" color='gray'>
                               <Box fontStyle='italic'>{item.date}</Box>
                             </Typography>
                             <Typography align="left" variant="subtitle2" color='lightslategray'>
                               {item.content}...
                             </Typography>
                           </CardContent>
                           <CardActions>
                             <Link
                               to={`/blog/${item.id}`}
                               style={{ textDecoration: "none" }}
                             >
                               <Typography variant="body2" color="blueviolet">
                                 {" "}
                                 See More{" "}
                               </Typography>
                             </Link>
                           </CardActions>
                         </Card>
                       </Grid>
                     );
                 })}
                </Grid>
            )
            : ( <Typography align='center' variant='h4' color='secondary'><Box fontStyle='italic'>Nothing to see..</Box></Typography>)
        }
        </Paper>
        </ThemeProvider>
        </React.Fragment>
    )
}

export default Profile
