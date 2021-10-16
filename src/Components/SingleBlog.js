import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { Typography ,CircularProgress, CardMedia,Card, CardContent, createTheme,IconButton } from '@mui/material';
import {makeStyles} from '@mui/styles'
import { Box } from '@mui/system';
import HomeIcon from "@mui/icons-material/Home";
import { useHistory } from 'react-router';
    const theme=createTheme()
 const useStyles = makeStyles(() => ({
   loading: {
     top: "50%",
     left: "50%",
     position: "absolute",
   },
 card:{
     margin:theme.spacing(5)
 },
  home: {
    position: "absolute",
    top: 0,
    left:0,
    margin: theme.spacing(1),
    marginLeft: theme.spacing(2),}
 }));


const SingleBlog = () => {
    const history=useHistory()
            const classes=useStyles()
        const { id } = useParams();
    const [blog,setBlog]=useState()    
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
         const searchBlog = async () => {
           await axios
             .get("https://dpaak-blog-app.herokuapp.com/searchblog", {
               params: {
                 id: id,
               },
             })
             .then((response) => {
               setBlog(response.data);
               setLoading(false);
             })
             .catch((err) => {
               setTimeout(searchBlog, 4000);
             });
         };
         searchBlog();
         return()=>{
             setBlog()
         }
    },[id])
    console.log(blog)
    return loading ? (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    ) : (
      <div>
        <div className={classes.home}>
          <IconButton color="secondary" onClick={() => history.push("/")}>
            <HomeIcon fontSize={"large"} />
          </IconButton>
        </div>
        <Typography align="center" variant="h2" color="secondary">
          {blog.title}
        </Typography>
        <Typography align="center" variant="subtitle2" color="gray">
          <Box fontStyle={"italic"}> {blog.creator} </Box>
        </Typography>
        <Typography align="center" variant="subtitle2" color="gray">
          <Box fontStyle="italic">{blog.date}</Box>
        </Typography>
        <Card className={classes.card}>
          <CardMedia
            component="img"
            height="400"
            alt="Blog Cover"
            image={blog.imageURL}
          />
          <CardContent>
            <Typography>{blog.content}</Typography>
          </CardContent>
        </Card>
      </div>
    );
}

export default SingleBlog