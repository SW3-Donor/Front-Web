import React, { Component, useState, useEffect } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import Join from './components/Join'
import Blood from './components/Blood'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showBackdrop: false,
      showMobileNav: false,
      isAuth: false,
      token: null,
      userId: null,
      authLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId });
    // this.setAutoLogout(remainingMilliseconds);
  }

  // 로그아웃
  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  // 로그인
  loginHandler = (event, authData) => {
    event.preventDefault();
    
    this.setState({ authLoading: true });
    fetch("http://172.19.1.157:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
      }),
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({
          isAuth: true,
          token: resData.token,
          authLoading: false,
          userId: resData.userId,
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds,
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        // this.setAutoLogout(remainingMilliseconds);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  };

  // 회원가입
  signupHandler = (event, authData) => {
    event.persist();
    
    this.setState({ authLoading: true });
    fetch("http://172.19.1.157:8080/auth/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.email,
        name: authData.name,
        password: authData.password,
        phone: authData.phone
      }),
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!",
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Creating a user failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({ isAuth: false, authLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  }

  // 헌혈증 등록
  bloodHandler = (event, blood) => {
    event.persist();
    
    this.setState({ authLoading: true });
    fetch("http://172.19.1.157:8080/blood/register", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number: blood.number
      }),
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!",
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('res',res);
          
          console.log("Error!");
          throw new Error("Creating a user failed!");
        }
        
        return res.json();
      })
      .then(resData => {
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  };

  render() {

    return (
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' render={props => (<Login onLogin={this.loginHandler} />)} />
        <Route exact path='/join' render={props => (<Join onSignup={this.signupHandler} />)} />
        <Route exact path='/blood/register' render={props => (<Blood onBlood={this.bloodHandler} />)} />
      </Router>
    );
  }
}

export default App;