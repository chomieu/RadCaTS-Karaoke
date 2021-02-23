import React from 'react'
import { Modal, Button } from 'react-materialize';
import "./style.css"

const trigger = <Button>Open Modal</Button>;

export default () => (
    <Modal className="align-center" header="Modal Header" trigger={trigger}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Modal>

);