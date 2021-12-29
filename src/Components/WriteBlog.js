import { Button, createTheme, Grid, IconButton, Paper, TextField, ThemeProvider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React,{useContext, useState} from 'react'
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import SendIcon from "@mui/icons-material/Send";
import FormatUnderlined from '@mui/icons-material/FormatUnderlined';
import HomeIcon from "@mui/icons-material/Home";
import axios from 'axios';
import { FirebaseContext } from '../Firebase/AuthProvider';
import { useHistory } from 'react-router';
import { Box } from '@mui/system';
import Brightness4Icon from "@mui/icons-material/Brightness4";
const theme=createTheme()
const useStyles = makeStyles(() => ({
  paper: {
    width: "100%",
    minHeight: "100vh",
  },
  topic: {
    position: "relative",
    width: "75%",
    left: "15%",
    height: "30px",
  },
  content: {
    position: "relative",
    width: "75%",
    left: "15%",
  },
  image: {
    position: "relative",
    width: "75%",
    left: "15%",
  },
  formatPaper: {
    position: "relative",
    width: "75%",
    left: "15%",
    marginTop: theme.spacing(3),
  },
  button: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  dark: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: theme.spacing(1),
    marginLeft: theme.spacing(8),
  },
  home: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
})); 

const WriteBlog = () => {
    const history=useHistory()
    const classes=useStyles()
    const {currentUser,themeset,darkMode,setDarkMode,toggle,setToggle}=useContext(FirebaseContext)
    const [topic,setTopic]=useState('')
    const [content,setContent]=useState('')
    const [imageUrl,setImageUrl]=useState('')
    const [bold,setBold]=useState(false)
    const [italic,setItalic]=useState(false)
    const [underline,setUnderline]=useState(false)
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await axios
          .post("https://dpaak-blog-app.herokuapp.com/saveblog", {
            title: topic,
            content: content,
            imageURL: imageUrl,
            creator: currentUser.displayName,
          })
          .then((res) => {
            history.push("/");
            // window.location.reload();
            setToggle(!toggle)
          })
          .catch((err) => {
            console.log(err.response);
             history.push("/");
            // window.location.reload();
            setToggle(!toggle)
          });
    }


    return (
      <React.Fragment>
        <ThemeProvider theme={themeset}>
          <Paper className={classes.paper} elevation={3}>
            <Typography variant="h2" color="secondary" align="center">
              <Box fontFamily="fantasy">
                {" "}
                {`${currentUser.displayName}'s Blog`}{" "}
              </Box>
            </Typography>

            <div className={classes.home}>
              <IconButton color="secondary" onClick={() => history.push("/")}>
                <HomeIcon fontSize={"large"} />
              </IconButton>
            </div>
            <div className={classes.dark}>
              <IconButton
                color="secondary"
                onClick={() => setDarkMode(!darkMode)}
              >
                <Brightness4Icon fontSize='large' />
              </IconButton>
            </div>
            <form>
              <div className={classes.button}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Publish
                  <SendIcon />
                </Button>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    label="Topic"
                    color="secondary"
                    className={classes.topic}
                    inputProps={{
                      min: 0,
                      style: { textAlign: "center", fontSize: 25 },
                    }}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    onKeyPress={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation={1} className={classes.formatPaper}>
                    <IconButton onClick={() => setBold(!bold)}>
                      <FormatBoldIcon />
                    </IconButton>
                    <IconButton onClick={() => setItalic(!italic)}>
                      <FormatItalicIcon />
                    </IconButton>
                    <IconButton onClick={() => setUnderline(!underline)}>
                      <FormatUnderlined />
                    </IconButton>
                  </Paper>
                  <TextField
                    variant="outlined"
                    placeholder="Content"
                    multiline
                    rows={22}
                    className={classes.content}
                    color="secondary"
                    inputProps={{
                      min: 0,
                      style: {
                        fontSize: 20,
                        fontWeight: bold ? "bolder" : "",
                        textDecoration: underline ? "underline" : "",
                        fontStyle: italic ? "italic" : "",
                      },
                    }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyPress={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                  />
                  <TextField
                    variant="outlined"
                    placeholder="Cover Image Url(not compulsory)"
                    className={classes.image}
                    color="secondary"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onKeyPress={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </ThemeProvider>
      </React.Fragment>
    );
}

export default WriteBlog
