import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {

  input_check = (e) => {
    e.preventDefault();
    if (!e.target.id.value.trim()){
      alert('아이디를 입력하시오');
    }
    else if (!e.target.pw.value.trim()){
      alert('비밀번호를 입력하시오');
    }
    else{
      this.props.onLogin(e, {
        email: e.target.id.value,
        password: e.target.pw.value
      });
    }
  }

  render(){
    return(
      <div>
          <h2>로그인</h2>
        <div>
          <form onSubmit={this.input_check}>
            <div>
              <div>
                <input type='text' name='id' className='ps_box' placeholder='아이디(이메일)'></input>
              </div>
              <div>
                <input type='password' name='pw' className='ps_box' placeholder='비밀번호'></input>
              </div>
            </div>
            <div>
              <button type='submit' className='btn btn_type'>로그인</button>
            </div>
          </form>
          <div>
            <Link to='Join'>
              <button className="btn">회원가입</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;