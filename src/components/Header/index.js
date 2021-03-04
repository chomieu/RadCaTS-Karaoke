import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { Container, Row, Col, TextInput, Button, Icon } from 'react-materialize';
import UserChip from '../UserChip';
import Logout from "../Logout";
import "./style.css"

function Header({ userData, setUserData }) {
  return (
    <div className="header">
      { userData.isLoggedIn
        ? <Row>
          <Col s={1}>
            <Link to="/"><h6>Radcats Karaoke</h6></Link>
          </Col>
          <Col className="right">
            <Logout userData={userData} setUserData={setUserData} />
            <UserChip userData={userData} />
          </Col>
        </Row>
        : null
      }
    </div>
  );
}

export default Header;