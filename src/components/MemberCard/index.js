import React from "react"
import { Row, Col } from "react-materialize";

export default function MemberCard({u}) {
  return (
    <Row key={u.userId}>
      <Col><img src={`${u.pfp}`} /></Col>
      <Col>{u.username} {u.score}</Col>
    </Row> 
  )
}
