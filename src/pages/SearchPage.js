import React, { useEffect, useState } from 'react';
import Search from "../components/Search";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";

export default function SearchPage({ userData, setUserData }) {

    return (
        <>
            {
                userData.isLoggedIn ?
                <>
                    <Header userData={ userData } setUserData={ setUserData } />
                    <Search userData={ userData } />
                </>
                : <Redirect to="/" />
            }
        </>
    )
}