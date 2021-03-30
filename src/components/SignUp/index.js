import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-materialize';
import API from "../../utils/API"
import "./style.css";


function SignUp({ loginSuccess }) {

    const trigger = <Button className="btn_purple">Sign Up</Button>;
    const [formInputs, setFormInputs] = useState({
        username: "",
        password: "",
        confirm: "",
        valid: false
    })

    useEffect(() => {
        if (formInputs.password.length >= 8 &&
            formInputs.password === formInputs.confirm) {
            setFormInputs({
                ...formInputs,
                valid: true
            })
        } else {
            setFormInputs({
                ...formInputs,
                valid: false
            })
        }
    }, [formInputs.confirm])

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
            password: "",
            confirm: "",
            valid: false
        })

        API.signup(formInputs)
            .then(res => { loginSuccess('signup', res) })
            .catch(err => { console.log(err) })
    }

    return (
        <Modal
            className="center-align"
            header="Sign Up"
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
                <div className="form-group left-align">
                    <input
                        type="password"
                        name="confirm"
                        value={formInputs.confirm}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="password">Confirm Password</label>
                </div>

                {formInputs.valid
                    ? <Button
                        className="btn_purple login__btn"
                        type="submit"
                        modal="close"
                        onClick={handleInputSubmit}
                    >Submit</Button>
                    : <Button
                        disabled
                        className="btn_purple login__btn"
                    >Submit</Button>
                }
            </form>
        </Modal>
    )
}

export default SignUp;