import React from 'react';
import NavigationBar from "../layouts/navbars/navbar.js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
import Cookie from 'js-cookie';


export default function Login() {

    const [data, setData] = React.useState({
        email: "",
        password: "",
    });

    const tryLogin = async () => {
        try {

            const fetchLogin = await axios.post("http://localhost:3001/api/login", data);
            const { data: response } = fetchLogin;

            //save cookie that expires in 1 day
            Cookie.set("auth", response.cookie, { expires: 1 });

            //redirect to profile with navigation
            window.location.href = "/";

        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="App">
            <NavigationBar />
            
            <div className="container" style={{marginTop: 80}}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setData({ ...data, email: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />
                    </Form.Group>

                    <Button variant="primary" onClick={tryLogin}>Login</Button>
                </Form>
            </div>

        </div>
    );
}

