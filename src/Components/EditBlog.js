import {
  Button,
  createTheme,
  Grid,
  IconButton,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext, useState } from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import SendIcon from "@mui/icons-material/Send";
import FormatUnderlined from "@mui/icons-material/FormatUnderlined";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { FirebaseContext } from "../Firebase/AuthProvider";
import { useHistory } from "react-router";
import { Box } from "@mui/system";
import Brightness4Icon from "@mui/icons-material/Brightness4";
const theme = createTheme();
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

const EditBlog = () => {
  const history = useHistory();
  const classes = useStyles();
  const {
    themeset,
    darkMode,
    setDarkMode,
    toggle,
    setToggle,
    editTopic,
    editContent,
    editBlogId,
    setEditTopic,
    setEditContent,
    setEditUrl,
    editUrl,
  } = useContext(FirebaseContext);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://dpaak-blog-app.herokuapp.com/editblog", {
        title: editTopic,
        content: editContent,
        imageURL: editUrl,
        id: editBlogId,
      })
      .then((res) => {
        history.push("/");

        setToggle(!toggle);
      })
      .catch((err) => {
        console.log(err.response);
        history.push("/");

        setToggle(!toggle);
      });
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={themeset}>
        <Paper className={classes.paper} elevation={3}>
          <Typography variant="h2" color="secondary" align="center">
            <Box fontFamily="fantasy"> {`Edit Blog`} </Box>
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
              <Brightness4Icon fontSize="large" />
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
                Edit
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
                  value={editTopic}
                  onChange={(e) => setEditTopic(e.target.value)}
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
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onKeyPress={(e) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                />
                <TextField
                  variant="outlined"
                  placeholder="Cover Image Url(not compulsory)"
                  className={classes.image}
                  color="secondary"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
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
};

export default EditBlog;
