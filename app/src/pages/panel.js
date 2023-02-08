import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

import Cookie from 'js-cookie';
import axios from 'axios';

import NavigationBarAdmin from '../layouts/navbars/a_navbar.js';



export default function Panel() {

    const [admin, setAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const [data, setData] = useState({
        email: "",
        name: "",
        lastName: "",
        password: "",
    });


    //getCookie;
    const cookie = Cookie.get("auth");

    const checkCookie = async () => {
        const fetchCookie = await axios.post("http://localhost:3001/api/profile", { cookie: cookie });
        const { data: response } = fetchCookie;

        //if user is not an admin redirect to home page
        (response.admin === false) ? window.location.href = "/" : setAdmin(true);
        //if cookie is valid and success is true set isLoggedIn to true
        (response.success === true && cookie) ? setIsLoggedIn(true) : setIsLoggedIn(false);
    }

    const fetchUsers = async () => {
        const fetchUsers = await axios.post("http://localhost:3001/api/users");
        const { data: response } = fetchUsers;

        setUsers(response.users);
    }


    const addUser = async () => {

        console.log(data);
        if (data.email === "" || data.name === "" || data.lastName === "" || data.password === "") return window.alert("Please fill all fields!");
        

        try {
            const response = await axios.post("http://localhost:3001/api/register", data);
            const { data: datas } = response;

            if (datas?.success === false) {
                window.alert(datas.message);
            }

            if (datas?.success === true) {
                window.alert(datas.message);
            }

            window.location.href = "/panel";

        } catch (err) {
            console.log(err);
        } 
    }

    const deleteUser = async (email) => {
        //make sure user wants to delete account by asking for confirmation with window.confirm

        const confirm = window.confirm("Are you sure you want to delete this user?");
        if (confirm === false) return;

        try {
            const response = await axios.post("http://localhost:3001/api/delete", { email: email });
            const { data: datas } = response;

            if (datas?.success === false) {
                window.alert(datas.message);
            }

            if (datas?.success === true) {
                window.alert(datas.message);
            }

            window.location.href = "/panel";

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        checkCookie();
        fetchUsers();

        setTimeout(() => setLoading(false), 500);

    }, []);


    return (
        <div className="App">

            { loading ? (
                <h1>Loading...</h1>
            ) : (
                isLoggedIn && admin ? <NavigationBarAdmin /> : <h1>Not logged in</h1>
            )}


            { loading ? (
                <h1>Loading...</h1>
            ) : ( 
                <Table striped bordered hover className='container'>
                <thead>

                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Adress</th>
                        <th>Action</th>
                    </tr>

                    {users.length > 0 ? users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            {/* <td><button onClick={deleteUser}>Delete</button></td> */}
                            <td><button onClick={() => deleteUser(user.email)}>Delete</button></td>
                        </tr>
                    )) : <tr></tr> }

                </thead>
            </Table>
            )}


            {/* make option to add new user */}

            <Table striped bordered hover  className='container'>
                <thead>

                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Adress</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>

                    <tr>
                        <td>1</td>
                        <td>
                            <Form.Control  required type="name" placeholder="Name" onChange={(e) => setData({ ...data, name: e.target.value })} />
                        </td>
                        <td>
                            <Form.Control  required type="lastName" placeholder="Last Name" onChange={(e) => setData({ ...data, lastName: e.target.value })} />
                        </td>
                        <td>
                            <Form.Control  required type="email" placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value }) } />
                        </td>
                        <td>
                            <Form.Control  required type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />
                        </td>
                        <td>
                            <button onClick={addUser}>Add User</button>
                        </td>
                    </tr>

               </thead>
            </Table>

        </div>


    )
}