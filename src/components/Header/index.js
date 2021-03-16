import React, { useState } from 'react';
import { Redirect } from "react-router-dom"
import { Row, Col } from 'react-materialize';
import UserChip from '../UserChip';
import Logout from "../Logout";
import "./style.css";

function Header({ audio, userData, setUserData, setIsPlaying }) {

  const [redirect, setRedirect] = useState()

  const handleHome = () => {
    setIsPlaying(false)
    if (audio) {
      audio.src = ''
    }
    setRedirect(<Redirect to="/" />)
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
      {redirect}
    </div>
  );
}

export default Header;