import React from "react";
import NavigationBar from "../layouts/navbars/navbar.js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from 'axios';

export default function Register() {


    const [data, setData] = React.useState({
        email: "",
        name: "",
        lastName: "",
        password: "",
    });

    


    const tryRegister = async () => {
        if (data.email === "" || data.name === "" || data.lastName === "" || data.password === "") return window.alert("Please fill all fields!");

        try {
          const response = await axios.post("http://localhost:3001/api/register", data);
          const { data: datas } = response;

          if (datas.success === false) {
              window.alert(datas.message);
              window.history.href = "/register";

              return;
          }

          if (datas.success === true) {
              window.alert(datas.message);

              window.location.href = "/login";
              return;
          }

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
                      <Form.Control required type="email" placeholder="Enter email" onChange={(e) => setData({ ...data, email: e.target.value })} />

                      <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control required type="name" placeholder="Name" onChange={(e) => setData({ ...data, name: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLastname">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control required type="lastname" placeholder="Last Name" onChange={(e) => setData({ ...data, lastName: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control required type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />
                    </Form.Group>
                    
                    <Button variant="primary" onClick={tryRegister}>Register</Button>
                </Form>
            </div>

      </div>
    );
}
