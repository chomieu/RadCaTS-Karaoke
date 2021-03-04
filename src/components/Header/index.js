import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { Container, Row, Col, TextInput, Button, Icon } from 'react-materialize';
import UserChip from '../UserChip';
import Logout from "../Logout";
import "./style.css"

function Header({ userData, setUserData, setIsPlaying }) {

  const handleHome = () => {
    setIsPlaying(false)
    audio.src = ''
    setRedirect(<Redirect to="/" />)
    // window.location.reload()

  }

  return (
    <div className="header">
      { userData.isLoggedIn
        ? <Row>
          <Col s={1}>
            <a onClick={handleHome} style={{ cursor: "pointer" }}><h6 >Radcats Karaoke</h6></a>
          </Col>
          <Col className="right">
            <Logout userData={userData} setUserData={setUserData} setIsPlaying={setIsPlaying} />
            <UserChip userData={userData} />
          </Col>
        </Row>
        : null
      }
    </div>
  );
}

export default Header;