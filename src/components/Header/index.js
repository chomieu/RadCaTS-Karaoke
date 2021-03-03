import React from 'react';
import { Container, Row, Col, TextInput, Button, Icon } from 'react-materialize';
import UserChip from '../UserChip';
import Logout from "../Logout";
import "./style.css"

function Header({ userData, setUserData }) {
  return (
    <>
      { userData.isLoggedIn
        ? <Row className="mb0">
          <Logout userData={userData} setUserData={setUserData} />
          <UserChip userData={userData} />
        </Row>
        : null
      }
      <Row>

        <header>

          <h1>Radcats  Karaoke</h1>
        </header>

      </Row>
    </>
  );
}

export default Header;