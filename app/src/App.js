import React, { useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Cookie from 'js-cookie';
import axios from 'axios';

import NavigationBar from './layouts/navbars/navbar.js';
import NavigationBarUser from './layouts/navbars/p_navbar.js';
import NavigationBarAdmin from './layouts/navbars/a_navbar.js';


function App() {

    //getCookie;
    const cookie = Cookie.get("auth");
    const [loading, setLoading] = React.useState(true);
    const [admin, setAdmin] = React.useState(false);

    //Cheking if user is logged in
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);


    
  
    //check if cookie is valid
    useEffect(() => {
      //set loading to true
      setLoading(true);
  
      const checkCookie = async () => {
        const fetchCookie = await axios.post("http://localhost:3001/api/profile", { cookie: cookie });
        const { data: response } = await fetchCookie;

        console.log(response);

        //if cookie is valid and success is true set isLoggedIn to true
        if (response.success === true) {
            setIsLoggedIn(true);

            //if user is admin set admin to true
            if (response.admin === true) setAdmin(true);

        }

        //if cookie is not valid and success is false set isLoggedIn to false
        if (response.success === false || !cookie) {
            setIsLoggedIn(false);
        };

      }

      checkCookie();
      setTimeout(() => setLoading(false), 500);

    }, [cookie]);


  return (
    <div className="App">

      { loading ? ( 
        <h1>Loading...</h1>
      ) : (
        isLoggedIn ? ( admin ? <NavigationBarAdmin /> : <NavigationBarUser /> ) : <NavigationBar />
      ) }

    </div>
  );
}

export default App;
 