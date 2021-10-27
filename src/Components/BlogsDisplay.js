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
    marginLeft: theme.spacing(5),
  },
}));
const BlogsDisplay = () => {
  const classes = useStyles();
  const { displayBlog, query, themeset } = useContext(FirebaseContext);
  console.log(displayBlog);

  return (
    <ThemeProvider theme={themeset}>
      <Paper className={classes.root}>
        <Grid container spacing={2}>
          {displayBlog
            .filter((val) => {
              if (query === "") {
                return val;
              } else if (
                val.title.toLowerCase().includes(query.toLowerCase())
              ) {
                return val;
              }
              return false
            })
            .map((blog) => {
              return (
                <Grid item xs={4} key={blog.id}>
                  <Card sx={{ maxWidth: 400 }}>
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
                      image={blog.imageUrl}
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
