import React , {useEffect} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useHistory} from "react-router-dom"
 
const ProtectedRoute = ({Component}) =>{

 const history = useHistory()
 
    useEffect(() => {
        if(!localStorage.tokenated){
            history.push('/login')
        }
      
    }, [])


    return (

        <>
            <Component/>
        </>
    )
}

export default ProtectedRoute
