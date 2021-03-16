import React from "react";
import { Row, Col } from "react-materialize";
import "./style.css";

export default function MemberCard(props) {
  return (
    <Row className="member_row">
      <Col className="s3"><img className="member_image" src={props.pfp} /></Col>
      <Col className="s6"><p className="member_text">{props.username}</p></Col>
      <Col className="s3"><p className="member_score">{props.pts}</p></Col>
    </Row>
  )
}
