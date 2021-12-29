import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  IconButton,
  createTheme,
  Paper,
  ThemeProvider,
  Button,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../Firebase/AuthProvider";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import HomeIcon from "@mui/icons-material/Home";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
const theme = createTheme();
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
  const history = useHistory();
  const classes = useStyles();
  const { currentUser, themeset, darkMode, setDarkMode,toggle,setToggle,editBlog } =
    useContext(FirebaseContext);
  const [blogs, setBlogs] = useState([]);
  const [displayBlog, setDisplayBlog] = useState([]);
  const [deleteBlogDialogue, setDeleteBlogDialogue] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState("");
  useEffect(() => {
    const getBlogs = async () => {
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
    };
    getBlogs();
    return () => {
      setBlogs();
    };
  }, [currentUser,toggle]);

  useEffect(() => {
    if (blogs) {
      setDisplayBlog(
        blogs.map((data) => {
          return {
            title: data.title,
            id: data._id,
            content: data.content.substring(0, 200),
            date: data.date.substring(0, 10),
          };
        })
      );
    }
  }, [blogs]);

  const handleDeleteDialogClose = () => {
    setDeleteBlogDialogue(false);
  };

  const handleDeletion = (id) => {
    setDeleteBlogDialogue(true);
    setDeleteBlogId(id);
  };
  

 

  const handleDeleteBlog = async () => {
    await axios
      .post("https://dpaak-blog-app.herokuapp.com/deleteblog", {
        id: deleteBlogId,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

      setDeleteBlogDialogue(false)
      setToggle(!toggle)
  };

const handleEditBlog=async(id)=>{
  await editBlog(id)
  history.push('/editblog')
}
  return (
    <React.Fragment>
      <ThemeProvider theme={themeset}>
        <Paper className={classes.paper}>
          <Typography align="center" variant="h2" color="secondary">
            <Box fontFamily="fantasy">{currentUser.displayName}'s blog</Box>
          </Typography>
          <div className={classes.home}>
            <IconButton color="secondary" onClick={() => history.push("/")}>
              <HomeIcon fontSize="large" />
            </IconButton>
          </div>
          <div className={classes.dark}>
            <IconButton
              color="secondary"
              onClick={() => setDarkMode(!darkMode)}
            >
              <Brightness4Icon fontSize="large" />
            </IconButton>
          </div>
          {displayBlog.length ? (
            <Grid container spacing={3}>
              {displayBlog.map((item) => {
                return (
                  <Grid item key={item.id}>
                    <Card sx={{ maxWidth: 500, margin: 10 }} variant='elevation' elevation={5}>
                      <CardHeader
                        action={
                          <div>
                            <IconButton color="inherit" onClick={()=>handleEditBlog(item.id)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDeletion(item.id)}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </div>
                        }
                      />
                      <CardContent>
                        <Typography align="left" variant="h5" color="secondary">
                          <Box fontFamily="fantasy">{item.title}</Box>
                        </Typography>
                        <Typography
                          align="left"
                          variant="subtitle2"
                          color="gray"
                        >
                          <Box fontStyle="italic">{item.date}</Box>
                        </Typography>
                        <Typography
                          align="left"
                          variant="subtitle2"
                          color="lightslategray"
                        >
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
          ) : (
            <Typography align="center" variant="h4" color="secondary">
              <Box fontStyle="italic">Nothing to see..</Box>
            </Typography>
          )}
          <Dialog open={deleteBlogDialogue} onClose={handleDeleteDialogClose}>
            <DialogTitle>
              {"Are you sure you want to delete the blog ?"}
            </DialogTitle>
            <DialogActions>
              <Button variant="contained" onClick={handleDeleteDialogClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleDeleteBlog}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default Profile;
