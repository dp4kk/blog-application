import React , {useContext, useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FirebaseContext } from "../Firebase/AuthProvider";
import { Alert, Snackbar } from "@mui/material";
import {useHistory} from 'react-router-dom'
const Copyright=(props)=> {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
        Blog
      {" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const  SignUp=()=> {
    const history=useHistory()
    const {setUserName,signup,open,setOpen}=useContext(FirebaseContext)
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [dontMatch,setDontMatch]=useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    setDontMatch(false)
    if (password === confirmPassword) {
        try {
            await signup(email,password)
            await setUserName(name)
            history.push('/')
        } catch (err) {
            console.log(err)
        }
    } else {
        setDontMatch(true)
        setOpen(true)
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setName('')
  };
  const handleClose=(e,reason)=>{
      if(reason==='clickaway'){
          return
      }
      setOpen(false)
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Cpassword"
                  label="Confirm Password"
                  type="password"
                  id="Cpassword"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {dontMatch ? ( <Snackbar 
        autoHideDuration={3000}
        open={open}
        onClose={handleClose}
        anchorOrigin={{horizontal:'center',vertical:'top'}}>
            <Alert severity='error'>Passwords donot match</Alert>
        </Snackbar>):
    (null)}
    </ThemeProvider>
  );
}

export default SignUp