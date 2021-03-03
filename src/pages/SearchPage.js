import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import Search from "../components/Search";
import Header from "../components/Header";
import "../App.css"

export default function SearchPage({ userData, setUserData }) {
    return (
        <div className="pageContents">
            {
                userData.isLoggedIn ?
                    <>
                        <Header userData={userData} setUserData={setUserData} />
                        <Search userData={userData} />
                    </>
                    : <Redirect to="/" />
            }
        </div>
    )
}