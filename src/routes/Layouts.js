// routes/home.js
import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className="app flex flex-col">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layout;