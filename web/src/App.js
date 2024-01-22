import logo from './logo.svg';
import './App.css';
import React, { lazy, Suspense, Component } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Provider } from "react-redux"

import Header from "./pages/includes/Header"
import Footer from "./pages/includes/Footer"
import store from "./constants/store"

const Home = lazy(function () {
  return import('./pages/Home')
})

const About = lazy(function () {
  return import ("./pages/About")
})

const Login = lazy(function () {
  return import ("./pages/Login")
})

const Signup = lazy(function () {
  return import ("./pages/Signup")
})

const UpdateProfile = lazy(function () {
  return import ("./pages/UpdateProfile")
})

const ChangePassword = lazy(function () {
  return import ("./pages/ChangePassword")
})

const AddStory = lazy(function () {
  return import ("./pages/AddStory")
})

const ViewStory = lazy(function () {
  return import ("./pages/ViewStory")
})

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="theme-layout">
          <Header />

          <Suspense fallback={<h3>Loading....</h3>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about.html" element={<About />} />
              <Route path="/login.html" element={<Login />} />
              <Route path="/signup.html" element={<Signup />} />
              <Route path="/update-profile.html" element={<UpdateProfile />} />
              <Route path="/change-password.html" element={<ChangePassword />} />
              <Route path="/add-story.html" element={<AddStory />} />
              <Route path="/view-story.html" element={<ViewStory />} />
            </Routes>
          </Suspense>

          <Footer />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
