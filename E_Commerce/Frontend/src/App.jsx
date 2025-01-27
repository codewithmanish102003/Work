import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Main/Home';
import Login_Register from './Components/Dashboard/Login&Register';
import Owner_Register from './Components/Auth/Owner_Register';
import Customer from './Components/Dashboard/Customer';
import Cart from './Components/Customer/Cart';
import Products from './Components/Shop/Products';
import NavigationBar from './Components/Partials/NavigationBar';

const App = () => {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login_Register />} />
                <Route path="/login/owner_register" element={<Owner_Register />} />
                <Route path="/profile" element={<Customer />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </Router>
    );
};

export default App;