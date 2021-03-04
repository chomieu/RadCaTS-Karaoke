import React from "react"
import { Row, Col } from "react-materialize";

export default function MemberCard(props) {
  return (
    <Row>
      <Col><img src={props.pfp} /></Col>
      <Col>{props.username} {props.pts}</Col>
    </Row> 
  )
}
