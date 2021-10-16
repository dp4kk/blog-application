import { Card, CardActions, CardContent, CardHeader, CardMedia, createTheme, Grid, IconButton, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { FirebaseContext } from '../Firebase/AuthProvider'
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {useHistory} from 'react-router-dom'
const theme=createTheme()
const useStyles=makeStyles(()=>({
    root:{
        marginLeft:theme.spacing(5)
    },
    add:{
        position:'absolute',
        top:'100%',
        left:'95%',
        transform:'scale(2)'
    }
}))
const BlogsDisplay = () => {
    const history=useHistory()
    const classes=useStyles()
    const {displayBlog}=useContext(FirebaseContext)
    return (
      <div className={classes.root}>
        <Grid container spacing={2}>
          {displayBlog.map((blog) => {
            return (
              <Grid item xs={4} key={blog.id}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardHeader title={blog.title} subheader={blog.date} />
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
                    <Link to={`/blog/${blog.id}`}>
                      <Typography variant="body2" color="gray">
                        {" "}
                        See More{" "}
                      </Typography>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
          <div className={classes.add} onClick={() => history.push("/write")}>
            <IconButton color="secondary">
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </div>
        </Grid>
      </div>
    );
}

export default BlogsDisplay
