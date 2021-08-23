import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useHistory, useLocation } from "react-router-dom"
import axios from 'axios'

const api = axios.create({
    baseURL: `https://afya-kwanza-backend.herokuapp.com/`
})

const ProtectedRoute = ({ Component }) => {
    const history = useHistory()
    const location = useLocation();
    const [profile, setProfile] = useState({})
    const getProfile = async () => {

        try {
            const res = await api.get("/saccos/sacco/profile", {
                headers: { token: localStorage.tokenated }
            });

            return res.data
        } catch (err) {
            console.error(`An error occured: ${err.message}`);
        }
    }
  

    useEffect(() => {
   
        // console.log("Stored token=>", localStorage.tokenated)
        !localStorage.tokenated && history.push('/login')

         const interval = setInterval(() => {
            (async () => {

                const check_profile = await getProfile()
                setProfile(check_profile)

                if(!profile){
                    localStorage.removeItem('tokenated')
                    history.push('/login')
                }
                 
                // console.log("Profile==>", profile)

            })()
        }, 10000);

        return () => clearInterval(interval)
    }, [profile])


    
    return (

        <>

            <Component/>
        </>
    )
}

export default ProtectedRoute
