import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Topbar extends Component {
  render() {
    return(
      <div>
        <div className="group">
            <div className="group group-title">
              <h1>DONOR</h1>
            </div>
          <div className="group group-nav">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/board">게시판</a>
              </li>
              <li>
                <a href="/blood/register">헌혈증 등록</a>
              </li>
              <li>
                <a href="/myinfo">마이페이지</a>
              </li>
              <li>
                <a href="/login">로그인</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Topbar;