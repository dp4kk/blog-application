
import { AppBar, IconButton, Toolbar, Typography,Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { createTheme } from '@mui/system'
import React, { useContext } from 'react'
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { FirebaseContext } from '../Firebase/AuthProvider';
const theme=createTheme()
const useStyles=makeStyles(()=>({
    root:{
        flexGrow:1,
        marginBottom:theme.spacing(4)
    },
    title:{
        display:'inline-block',
        marginLeft:theme.spacing(4)
    },
    button:{
      marginRight:theme.spacing(3)
    }
}))
const NavBar = () => {
    const { logout}=useContext(FirebaseContext)
    const classes=useStyles()
    return (
      <React.Fragment>
        <div className={classes.root}>
          <AppBar position="static" color="secondary">
            <Toolbar>
              <IconButton color="inherit" className={classes.title}>
                <MenuBookIcon fontSize="large" />
              </IconButton>
              <Typography variant="h6">BLOG</Typography>
              <div className={classes.root} />
             
              <Button variant="outlined" color="inherit" onClick={logout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      </React.Fragment>
    );
}

export default NavBar
