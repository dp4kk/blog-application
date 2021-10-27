import React from 'react'
import AuthProvider from './Firebase/AuthProvider'
import Login from './Pages/Login'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import SignUp from './Pages/Signup'
import Dashboard from './Components/Dashboard'
import WriteBlog from './Components/WriteBlog'
import { CssBaseline } from '@mui/material'
import SingleBlog from './Components/SingleBlog'
import PrivateRoute from './Firebase/PrivateRoute'
import Profile from './Pages/Profile'

const App = () => {
  return (
    <React.Fragment>
    <CssBaseline/>
    <AuthProvider>
    <Router>
      <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={SignUp}/>
          <PrivateRoute exact path='/' component={Dashboard}/>
          <PrivateRoute path='/write' component={WriteBlog}/>
          <PrivateRoute path='/blog/:id' component={SingleBlog}/>
          <PrivateRoute path='/profile' component={Profile}/>
       </Switch>
    </Router> 
      </AuthProvider>
      </React.Fragment>
  )
}

export default App
