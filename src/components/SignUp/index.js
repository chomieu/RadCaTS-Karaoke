import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-materialize';
import API from "../../utils/API"
import "./style.css";

const trigger = <Button>Sign Up</Button>;

function SignUp({ setUserState }) {

    const [formInputs, setFormInputs] = useState({
        username: "",
        password: "",
        confirm: "",
        match: false
    })

    useEffect(() => {
        if (formInputs.password.length >= 8 && formInputs.password === formInputs.confirm) {
            setFormInputs({ ...formInputs, match: true })
        } else { setFormInputs({ ...formInputs, match: false }) }
    }, [formInputs.confirm])

    const handleInputChange = e => {
        const { name, value } = e.target
        setFormInputs({ ...formInputs, [name]: value })
    }

    const handleInputSubmit = e => {
        e.preventDefault();
        API.signup(formInputs).then(res => {
            localStorage.setItem("token", res.data.token)
            setUserState({
                id: res.data.user.id,
                username: res.data.user.email,
                token: res.data.token,
                isLoggedIn: true
            })
            setFormInputs({ username: "", password: "", confirm: "", match: false })
        }).catch(err => {
            console.log(err);
            localStorage.removeItem("token");
        })
    }

    return (
        <Modal className="center-align" header="Sign Up" trigger={trigger}>
            <form>
                {/* <div className="form-group left-align">
                    <input type="email" name="email" onChange={handleInputChange} />
                    <label htmlFor="email">Email address</label>
                </div> */}

                <div className="form-group left-align">
                    <input type="text" name="username" value={formInputs.username} onChange={handleInputChange} />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form-group left-align">
                    <input type="password" name="password" value={formInputs.password} onChange={handleInputChange} />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="form-group left-align">
                    <input type="password" name="confirm" value={formInputs.confirm} onChange={handleInputChange} />
                    <label htmlFor="password">Confirm Password</label>
                </div>

                {formInputs.match ?
                    <Button className="login__btn" type="submit" modal="close" onClick={handleInputSubmit}>Submit</Button>
                    :
                    <Button disabled className="login__btn">Submit</Button>
                }
            </form>
        </Modal>
    )
}

export default SignUp;