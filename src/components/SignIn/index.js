import React, { useState } from 'react';
import { Modal, Button } from 'react-materialize';
import API from "../../utils/API"
import "./style.css";

const trigger = <Button>Sign In</Button>;

function SignIn({ setUserState, setDisplay, display }) {

    const [formInputs, setFormInputs] = useState({
        username: "",
        password: ""
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setFormInputs({ ...formInputs, [name]: value })
    }

    const handleInputSubmit = e => {
        e.preventDefault();
        API.login(formInputs).then(res => {
            localStorage.setItem("token", res.data.token)
            setUserState({
                id: res.data.user.id,
                username: res.data.user.email,
                token: res.data.token,
                isLoggedIn: true
            })
            setFormInputs({ username: "", password: "" })
        }).catch(err => {
            console.log(err);
            localStorage.removeItem("token");
        })

        //mock successful login
        setUserState({ username: formInputs.username, isLoggedIn: true })
        setDisplay({ ...display, loading: true })

        setTimeout(() => {
            setDisplay({ ...display, loading: false, audioPlayer: true, logout: true })
        }, 3000);

    }


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

                {formInputs.username && formInputs.password ?
                    <Button className="login__btn" type="submit" modal="close" onClick={handleInputSubmit} >Submit</Button>
                    :
                    <Button disabled className="login__btn" type="submit">Submit</Button>
                }
            </form>
        </Modal >
    )
}

export default SignIn;