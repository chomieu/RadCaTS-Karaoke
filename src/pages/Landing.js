import React, { useEffect } from 'react';
import API from "../utils/API";
import Header from '../components/Header';
import SignUp from '../components/SignUp';
import LogIn from '../components/LogIn';
import { Redirect } from 'react-router-dom';

export default function Landing({ userData, setUserData }) {

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
          API.checkWebToken(token)
            .then(res => { loginSuccess(res) })
            .catch(err => { console.log( err ) })
        }
    }, [])
    
    const loginSuccess = (res) => {
        console.log(res)
        localStorage.setItem("token", res.data.token)

        setUserData({
            isLoggedIn: true,
            id: res.data.user._id,
            token: res.data.token,
            username: res.data.user.username,
            profilePicture: res.data.user.profilePicture
        })
    }
    return (
        <div>
            <Header userData={ userData } />
            {
                !userData.isLoggedIn ?
                    <>
                        <SignUp loginSuccess={ loginSuccess } />
                        <LogIn loginSuccess={ loginSuccess } />
                    </>
                : <Redirect to="/search" />
            }
        </div>
    )
}
