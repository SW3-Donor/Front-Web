import React, { Component } from "react";
import { Link, Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Join from "./components/Join";
import SecondPw from "./components/SecondPw";
import Blood from "./components/Blood";
import Topbar from "./components/Topbar";
import MyInfo from "./components/MyInfo";
import Board from "./components/Board";
import Trade from "./components/Trade";
import "./App.css";

class App extends Component {
  state = {
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
    url: "http://192.168.0.28:8080",
  };
  
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

    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    const userId = localStorage.getItem("userId");

    this.setState({ userId: userId, token: token });
    this.setAutoLogout(remainingMilliseconds);
  }

  // 자동 로그아웃
  setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  // 로그아웃
  logoutHandler = () => {
    this.setState({ isAuth: false, token: null, userId: null });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  // 로그인
  loginHandler = (event, authData) => {
    event.persist();
    this.setState({ authLoading: true });
    fetch(`${this.state.url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          isAuth: true,
          token: resData.token,
          authLoading: false,
          userId: resData.userId,
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        // 1시간 설정
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);
      })
      .catch((err) => {
        console.log("실행되냐?", err);
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
    fetch(`${this.state.url}/auth/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.email,
        name: authData.name,
        password: authData.password,
        phone: authData.phone,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log("resData",resData);
        this.setState({
          isAuth: false,
          authLoading: false,
          userId: resData.userId,
        });
        // localStorage.setItem("userId", resData.userId);
      })
      .catch((err) => {
        console.log("실행되냐?", err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  };

  // 헌혈증 등록
  bloodHandler = (event, blood) => {
    event.persist();
    this.setState({ authLoading: true });
    fetch(`${this.state.url}/blood/register`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number: blood.number,
        secondpassword: blood.password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({ isAuth: false, authLoading: false });
      })
      .catch((err) => {
        console.log("실행되냐?", err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  };

  // 2차 비밀번호 생성
  pwHandler = (event, authData) => {
    event.persist();
    this.setState({ authLoading: true });
    fetch(`${this.state.url}/auth/password`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secondpassword: authData.password,
        userId: this.state.userId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({ isAuth: false, authLoading: false });
      })
      .catch((err) => {
        console.log("실행되냐?", err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  };

  // 헌혈증 보내기
  tradeHandler = (event, authData) => {
    event.persist();
    this.setState({ authLoading: true });
    fetch(`${this.state.url}/blood/send`, {
      method: "post",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secondpassword: authData.password,
        receiver: authData.receiver,
        count: authData.count
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log('resData다',resData);
        this.setState({ authLoading: false });
      })
      .catch((err) => {
        console.log("실행되냐?", err);
        this.setState({
          error: err,
        });
        console.log("에러다",this.error);
      });
  };

  render() {
    return (
      <div className="header">
        <Router>
          <Topbar />

          <Route exact path="/" component={Home} />

          <Route exact path="/myInfo"
            render={(props) => <MyInfo /> }
          />

          <Route exact path="/login">
            {this.state.isAuth ? <Redirect to="/" />
            : <Login onLogin={this.loginHandler} /> }
          </Route>

          <Route exact path="/join">
            {this.state.userId ? <SecondPw secondPassword={this.pwHandler} />
            : <Join onSignup={this.signupHandler} /> }
          </Route>

          <Route exact path="/blood/register"
            render={(props) => <Blood onBlood={this.bloodHandler} />}
          />

          <Route exact path="/board"
            render={(props) => <Board />}
          />

          <Route exact path="/blood/trade"
            render={(props) => <Trade tradeBlood={this.tradeHandler}/>}
          />
        </Router>
      </div>
    );
  }
}

export default App;