import React, { useContext } from 'react'
import {Redirect,Route} from 'react-router-dom'
import { FirebaseContext } from './AuthProvider'

const PrivateRoute=({component:Component,...rest})=>{
        const {currentUser}=useContext(FirebaseContext)
        return(
            <Route {...rest} render={
                props=>{
                    return currentUser ? <Component {...props}/> : <Redirect to='/login'/>
                }
            }/>
        )
}

export default PrivateRoute