import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import injectContext from "./store/appContext";
import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";

import { Navbar } from "./component/navbar";
// import { Footer } from "./component/footer";

import UserProfile from "./views/UserProfile";
import { Login } from "./views/Login";
import { Register } from "./views/Register";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/component/person/:index" element={<Demo />} />
            <Route path="/component/planet/:index" element={<Demo />} />
            <Route path="/component/vehicle/:index" element={<Demo />} />
            <Route path="/single/:theid" element={<Single />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<h1>Not found!</h1>} />
            <Route element={<UserProfile />} path="/userProfile" />
            {/* Can we delete these? */}
            {/* <Route element={<Single />} path="/single/:theid" />
            <Route element={<Demo />} path="/demo" /> */}
          </Routes>
          {/* <Footer /> */}
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
