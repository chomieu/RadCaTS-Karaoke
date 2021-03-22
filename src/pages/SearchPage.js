import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import Search from "../components/Search";
import Header from "../components/Header";
import "../App.css"

export default function SearchPage({ userData, setUserData, setIsPlaying, search, setSearch }) {

    return (
        <div className="pageContents">
            {
                userData.isLoggedIn ?
                    <>
                        <Header userData={userData} setUserData={setUserData} setIsPlaying={setIsPlaying} />
                        <Search userData={userData} search={search} setSearch={setSearch} />
                    </>
                    : <Redirect to="/" />
            }
        </div>
    )
}