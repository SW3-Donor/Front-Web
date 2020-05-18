import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {

  input_check = (e, id, pw) => {
    if (!id.trim()){
      alert('아이디를 입력하시오');
    }
    else if (!pw.trim()){
      alert('비밀번호를 입력하시오');
    }
    else{
      this.props.onLogin(e, {
        email: id,
        password: pw
      })
    }
  }

  render(){
    return(
      <header>
        <h2>DONOR</h2>
        <div>
          <form method='post'
            onSubmit={(e) => {
              e.preventDefault();
              this.input_check(e, e.target.id.value, e.target.pw.value)
            }}
            >
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
      </header>
    );
  }
}

export default Login;
