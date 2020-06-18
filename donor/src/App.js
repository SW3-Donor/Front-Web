import React, { Component } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
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
  constructor(){
    super();
    this.state = {
      isAuth: false,
      token: null,
      userId: null,
      authLoading: false,
      error: null,
      url: "http://localhost:8080",
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

    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();

    this.setState({ token: token });
    this.setAutoLogout(remainingMilliseconds);
  }

  componentDidUpdate(){
    console.log('componentDidUpdate')
  }

  // 자동 로그아웃
  setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  // 로그아웃
  logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    alert('로그아웃 되었습니다.')
    this.setState({ token: null })
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
        if (res.status === 500){
          alert("등록된 회원정보가 없습니다.")
          throw new Error("등록된 회원정보가 없습니다.")
        }
        else if (res.status === 401){
          alert("이메일 또는 비밀번호가 일치하지 않습니다.")
          throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.")
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        alert(resData.message);
        this.setState({
          isAuth: true,
          token: resData.token,
          authLoading: false,
        });
        localStorage.setItem("token", resData.token);
        // 1시간 설정
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);
      })
      .catch((err) => {
        console.log("error", err);
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
        alert(resData.message);
        this.setState({
          isAuth: false,
          authLoading: false,
          userId: resData.userId,
        });
      })
      .catch((err) => {
        console.log("error", err);
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
        alert(resData.message);
        this.setState({ isAuth: false, authLoading: false });
        window.location.reload();
      })
      .catch((err) => {
        console.log("error", err);
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
    console.log('2차비번',authData.password)
    this.setState({ authLoading: true });
    fetch(`${this.state.url}/auth/password`, {
      method: "post",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secondpassword: authData.password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        alert(resData.message);
        this.setState({ isAuth: false, authLoading: false });
      })
      .catch((err) => {
        console.log("error", err);
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
        alert(`${resData.log[0].receiver}에게 보냈습니다.`);
        this.setState({ authLoading: false });
        window.location.reload();
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({
          error: err,
        });
        console.log("에러다",this.error);
      });
  };

  // 이메일, 이름, 전화번호, 헌혈증 개수
  // 유저 정보
  myinfoHandler = () => {
    return fetch(`${this.state.url}/profile/user`, {
      method: "post",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
  };

  render() {
    return (
      <div className="header">
        <Router>
          <Topbar token={this.state.token} onLogout={this.logoutHandler}/>

          <Route exact path="/" component={Home} />

          <Route exact path="/myInfo">
            {this.state.token ? <MyInfo data={{token: this.state.token, url:this.state.url}}/>
            : <Redirect to="/login" /> }
          </Route>

          <Route exact path="/login">
            {this.state.token ? <Redirect to="/" />
            : <Login onLogin={this.loginHandler} /> }
          </Route>

          <Route exact path="/join">
            {this.state.token ? <SecondPw secondPassword={this.pwHandler} />
            : <Join onSignup={this.signupHandler} /> }
          </Route>

          <Route exact path="/blood/register"
            render={() => <Blood onBlood={this.bloodHandler} token={this.state.token}/>}
          />

          <Route exact path="/board"
            render={() => <Board />}
          />

          <Route exact path="/blood/trade"
            render={() => <Trade tradeBlood={this.tradeHandler} token={this.state.token}/>}
          />
        </Router>
      </div>
    );
  }
}

export default App;