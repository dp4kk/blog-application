import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  createTheme,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { FirebaseContext } from "../Firebase/AuthProvider";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

const theme = createTheme();
const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    minHeight: "100vh",
  },
  grid: {
    
    padding:theme.spacing(4),
    marginLeft:theme.spacing(12)
  },
}));
const BlogsDisplay = () => {
  const classes = useStyles();
  const { displayBlog, query, themeset } = useContext(FirebaseContext);
  
  const defaultURL =
    "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80";

  return (
    <ThemeProvider theme={themeset}>
      <Paper className={classes.root}>
        <Grid container spacing={2} className={classes.grid}>
          {displayBlog
            .filter((val) => {
              if (query === "") {
                return val;
              } else if (
                val.title.toLowerCase().includes(query.toLowerCase())
              ) {
                return val;
              }
              return false;
            })
            .map((blog) => {
              return (
                <Grid item xs={4} key={blog.id}>
                  <Card sx={{ maxWidth: 420 }} variant='elevation' elevation={5}>
                    <CardHeader
                      title={
                        <Typography align="left" variant="h5" color="secondary">
                          <Box fontFamily="fantasy">{blog.title}</Box>
                        </Typography>
                      }
                      subheader={
                        <Typography
                          align="left"
                          variant="subtitle2"
                          color="gray"
                        >
                          <Box fontStyle="italic">{blog.date}</Box>
                        </Typography>
                      }
                    />
                    <CardMedia
                      component="img"
                      height="200"
                      alt="Blog Cover"
                      image={blog.imageUrl ? blog.imageUrl : defaultURL}
                    />
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        color="lightslategrey"
                        align="center"
                      >
                        {blog.creator}
                      </Typography>
                      <Typography variant="body2" color="lightslategrey">
                        {blog.content} ...
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        to={`/blog/${blog.id}`}
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
      </Paper>
    </ThemeProvider>
  );
};

export default BlogsDisplay;
