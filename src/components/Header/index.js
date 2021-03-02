import React from 'react';
import { Container, Row, Col, TextInput, Button, Icon } from 'react-materialize';
import UserChip from '../UserChip'
import "./style.css"

function Header({ userState }) {
  return (
    <>
      <Row className="mb0">
        <UserChip userState={userState} />
      </Row>
      <Row>

        <header>

          <h1>Radcats  Karaoke</h1>
        </header>

      </Row>
    </>
  );
}

export default Header;