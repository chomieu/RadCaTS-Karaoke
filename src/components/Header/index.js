import React, { useState } from 'react';
import { Container, Row, Col, TextInput, Button, Icon } from 'react-materialize';
import UserChip from '../UserChip';
import Logout from "../Logout";
import "./style.css"

function Header({ userData, setUserData }) {
  return (
    <>
      { userData.isLoggedIn
        ? <Row>
          <Col s={1}>
            <h6>Radcats Karaoke</h6>
          </Col>
          <Col className="right">
            <Logout userData={userData} setUserData={setUserData} />
            <UserChip userData={userData} />
          </Col>
        </Row>
        : null
      }
    </>
  );
}

export default Header;