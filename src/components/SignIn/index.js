import React, { useState } from 'react';
import { Modal, Button } from 'react-materialize';
import API from "../../utils/API"
import "./style.css";


function SignIn({ setUserState, display, setDisplay }) {

    const [formInputs, setFormInputs] = useState({
        username: "",
        password: "",
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setFormInputs({ ...formInputs, [name]: value })
    }

    const handleInputSubmit = e => {
        e.preventDefault();
        setFormInputs({ username: "", password: "" })
        setDisplay({ ...display, signInBtns: false, loading: true })

        // mimicking a 3 second loading time / waiting for API response
        setTimeout(() => {

            API.login(formInputs).then(res => {
                console.log(res.data)
                localStorage.setItem("token", res.data.token)
                setDisplay({ ...display, signInBtns: false, loading: false, search: true, logout: true })
                setUserState({
                    id: res.data.user.id,
                    username: res.data.user.username,
                    token: res.data.token,
                    isLoggedIn: true
                })
            }).catch(err => {
                console.log(err);
                localStorage.removeItem("token");
            })
        }, 2000);
    }


    const trigger = <Button>Sign In</Button>

    return (
        <Modal className="center-align" header="Sign In" trigger={trigger}>

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

                {formInputs.username && formInputs.password
                    ? <Button className="login__btn" type="submit" modal="close" onClick={handleInputSubmit} >Submit</Button>
                    : <Button disabled className="login__btn" type="submit">Submit</Button>
                }
            </form>
        </Modal >
    )
}

export default SignIn;