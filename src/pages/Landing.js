import React, { useEffect, useState } from 'react';
import API from "../utils/API";
import Header from '../components/Header';
import SignUp from '../components/SignUp';
import LogIn from '../components/LogIn';
import { Redirect } from 'react-router-dom';

export default function Landing({ userData, setUserData }) {

    const [redirectPage, setRedirectPage] = useState()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            API.checkWebToken(token)
                .then(res => {
                    loginSuccess(res, 'checkWebToken')
                })
                .catch(err => { console.log(err) })
        }
    }, [])

    const loginSuccess = (res, source) => {
        localStorage.setItem("token", res.data.token)
        console.log(res, source)

        setUserData({
            isLoggedIn: true,
            id: res.data.user._id,
            token: res.data.token,
            username: res.data.user.username,
            profilePicture: res.data.user.profilePicture
        })
        setRedirectPage(<Redirect to="/search" />)
    }
    return (
        <div>
            <Header userData={userData} setUserData={setUserData} />
            {
                !userData.isLoggedIn
                    ?
                    <>
                        <SignUp loginSuccess={loginSuccess} />
                        <LogIn loginSuccess={loginSuccess} redirectPage={redirectPage} />
                    </>
                    : null
            }
            {redirectPage}
        </div>
    )
}
