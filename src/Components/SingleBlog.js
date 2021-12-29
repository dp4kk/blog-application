import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {
  Typography,
  CircularProgress,
  CardMedia,
  Card,
  CardContent,
  createTheme,
  IconButton,
  ThemeProvider,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import { useHistory } from "react-router";
import { FirebaseContext } from "../Firebase/AuthProvider";
import Brightness4Icon from "@mui/icons-material/Brightness4";

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
 paper:{
   width:'100%',
   minHeight:'100vh'
 }
 ,
  dark: {
    position: "absolute",
    right: 0,
    top: 0,
    margin: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  home: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
}));
const defaultURL =
  "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80";

const SingleBlog = () => {
  const { themeset, darkMode, setDarkMode } = useContext(FirebaseContext);
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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
    return () => {
      setBlog();
      setLoading(true);
    };
  }, [id]);

  return loading ? (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  ) : (
    <ThemeProvider theme={themeset}>
      <Paper className={classes.paper}>
        <div className={classes.home}>
          <IconButton color="secondary" onClick={() => history.push("/")}>
            <HomeIcon fontSize={"large"} />
          </IconButton>
        </div>
        <div className={classes.dark}>
          <IconButton color="secondary" onClick={() => setDarkMode(!darkMode)}>
            <Brightness4Icon fontSize="large" />
          </IconButton>
        </div>
        <Typography align="center" variant="h2" color="secondary">
          {blog.title}
        </Typography>
        <Typography align="center" variant="subtitle2" color="gray">
          <Box fontStyle={"italic"}> {blog.creator} </Box>
        </Typography>
        <Typography align="center" variant="subtitle2" color="gray">
          <Box fontStyle="italic">{blog.date.substring(0, 10)}</Box>
        </Typography>
        <Card className={classes.card} variant="elevation" elevation={0}>
          <CardMedia
            component="img"
            height="400"
            alt="Blog Cover"
            image={blog.imageURL ? blog.imageURL : defaultURL}
          />
          <CardContent>
            <Typography>{blog.content}</Typography>
          </CardContent>
        </Card>
      </Paper>
    </ThemeProvider>
  );
};

export default SingleBlog;



