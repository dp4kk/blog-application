
import { AppBar, IconButton, Toolbar, Typography,Button, TextField, ThemeProvider, } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { createTheme} from '@mui/system'
import React, { useContext } from 'react'
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { FirebaseContext } from '../Firebase/AuthProvider';
import {useHistory} from 'react-router-dom'
import Brightness4Icon from "@mui/icons-material/Brightness4";

const theme = createTheme();
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(1),
  },
  title: {
    display: "inline-block",
    marginLeft: theme.spacing(4),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  search: {
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
      }},
      searchBox:{
        marginLeft:theme.spacing(5)
      },
  outline: {
    borderWidth: "1px",
    borderColor: "yellow !important",
  },
}));
const NavBar = () => {
    const history=useHistory()
    const { logout,query,setQuery,themeset,darkMode,setDarkMode}=useContext(FirebaseContext)
    const classes=useStyles()
    return (
      <React.Fragment>
      <ThemeProvider theme={themeset}>
        <div className={classes.root}>
          <AppBar position="static" color="secondary">
            <Toolbar>
              <IconButton
                color="inherit"
                className={classes.title}
                onClick={() => window.location.reload()}
              >
                <MenuBookIcon fontSize="large" />
              </IconButton>
              <Typography variant="h6">BLOG</Typography>
              <div className={classes.searchBox}>
              <TextField
                variant="outlined"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                size='small'
                placeholder="search"
                color="secondary"
                inputProps={{
                  style: {
                    color: "white"
                  },
                }}
                className={classes.search}
              /></div>
              <div className={classes.root} />
              <div>
              <IconButton color='inherit' onClick={()=>setDarkMode(!darkMode)}>
                <Brightness4Icon fontSize='large'/>
              </IconButton>
              </div>
              <div className={classes.button}>
                <IconButton
                  color="inherit"
                  onClick={() => history.push("/profile")}
                >
                  <PersonOutlineIcon fontSize="large" />
                </IconButton>
              </div>

              <div className={classes.button}>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => history.push("/write")}
                >
                  Add post
                </Button>
              </div>
              <Button variant="outlined" color="inherit" onClick={logout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </div>
        </ThemeProvider>
      </React.Fragment>
    );
}

export default NavBar


//