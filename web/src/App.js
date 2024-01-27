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

const PostDetail = lazy(function () {
  return import ("./pages/PostDetail")
})

const User = lazy(function () {
  return import ("./pages/User")
})

const CreatePage = lazy(function () {
  return import ("./pages/CreatePage")
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
              <Route path="/About" element={<About />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/UpdateProfile" element={<UpdateProfile />} />
              <Route path="/ChangePassword" element={<ChangePassword />} />
              <Route path="/AddStory" element={<AddStory />} />
              <Route path="/ViewStory" element={<ViewStory />} />
              <Route path="/PostDetail" element={<PostDetail />} />
              <Route path="/User" element={<User />} />
              <Route path="/CreatePage" element={<CreatePage />} />
            </Routes>
          </Suspense>

          <Footer />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
