import React, { useEffect, useState } from 'react';
import API from "../utils/API";
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import SignUp from '../components/SignUp';
import LogIn from '../components/LogIn';
import "../App.css"

export default function Landing({ userData, setUserData, loginSuccess }) {
    return (
        <div className="pageContents">
            {userData.isLoggedIn ? <Redirect to="/search" /> : null}
            <h1 className="white-text mt-5">Radcats karaoke</h1>
            <Header userData={userData} setUserData={setUserData} />

            <SignUp loginSuccess={loginSuccess} />

            <LogIn loginSuccess={loginSuccess} />

        </div>
    )
}
