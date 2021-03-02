import React, { useState } from 'react';
import { Modal, Button } from 'react-materialize';
import API from "../../utils/API"
import "./style.css";



function LogIn({ loginSuccess, redirect }) {

    const trigger = <Button>Sign In</Button>
    const [formInputs, setFormInputs] = useState({
        username: "",
        password: "",
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setFormInputs({
            ...formInputs,
            [name]: value
        })
    }

    const handleInputSubmit = e => {
        e.preventDefault();
        setFormInputs({
            username: "",
            password: ""
        })

        API.login(formInputs)
            .then(res => {
                loginSuccess(res, 'login')
            })
            .catch(err => { console.log(err) })
    }


    return (
        <Modal
            className="center-align"
            header="Sign In"
            trigger={trigger}
        >
            <form>
                <div className="form-group left-align">
                    <input
                        type="text"
                        name="username"
                        value={formInputs.username}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form-group left-align">
                    <input
                        type="password"
                        name="password"
                        value={formInputs.password}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="password">Password</label>
                </div>

                {formInputs.username && formInputs.password
                    ? <Button
                        className="login__btn"
                        type="submit"
                        modal="close"
                        onClick={handleInputSubmit}
                    >Submit</Button>
                    : <Button
                        disabled
                        className="login__btn"
                        type="submit"
                    >Submit</Button>
                }
            </form>
            {redirect}
        </Modal >
    )
}

export default LogIn;