import React, { useState } from 'react';
import "./style.css";
import { Modal, Button } from 'react-materialize';

const trigger = <Button>Open SignIn</Button>;

function SignIn() {

    const [ formInputs, setFormInputs ] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = event => {
        setFormInputs({
            ...formInputs,
            [ event.target.name ] : event.target.value
        })
    }

    const handleInputSubmit = event => {
        event.preventDefault();
        alert( `Thank you, ${ formInputs.name }! Your message has been sent!`);
        setFormInputs({
            email: "",
            password: ""
        })
    }

    return (
        <Modal className="align-center" header="Modal Header" trigger={trigger}>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" onChange={ handleInputChange } />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={ handleInputChange } />
                </div>
            </form>
        </Modal>
    )
}

export default SignIn;