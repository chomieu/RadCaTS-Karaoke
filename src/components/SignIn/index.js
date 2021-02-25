import React, { useState } from 'react';
import "./style.css";
import { Modal, Button } from 'react-materialize';

const trigger = <Button>Sign In</Button>;

function SignIn() {

    const [formInputs, setFormInputs] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = event => {
        setFormInputs({
            ...formInputs,
            [event.target.name]: event.target.value
        })
    }

    const handleInputSubmit = event => {
        event.preventDefault();
        alert(`Thank you, ${formInputs.name}! Your message has been sent!`);
        setFormInputs({
            email: "",
            password: ""
        })
    }

    return (
        <Modal className="center-align" header="Sign In" trigger={trigger}>

            <form>
                <div className="form-group left-align">
                    <input type="email" name="email" onChange={handleInputChange} />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-group left-align">
                    <input type="password" name="password" onChange={handleInputChange} />
                    <label htmlFor="password">Password</label>
                </div>

                {formInputs.email && formInputs.password ?
                    <Button className="login__btn" type="submit">Submit</Button>
                    :
                    <Button disabled className="login__btn" type="submit" >Submit</Button>
                }
            </form>
        </Modal >
    )
}

export default SignIn;