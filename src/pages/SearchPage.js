import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import Search from "../components/Search";
import Header from "../components/Header";

export default function SearchPage({ userData, setUserData }) {
    return (
        <>
            {
                userData.isLoggedIn ?
                    <>
                        <Header userData={userData} setUserData={setUserData} />
                        <Search userData={userData} />
                    </>
                    : <Redirect to="/" />
            }
        </>
    )
}