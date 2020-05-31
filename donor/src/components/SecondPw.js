import React, { Component } from 'react';

class SecondPw extends Component {
  state = {
      password: null
    };

  input_check = (e, pw1, pw2) => {
    if (!pw1.trim()){
      alert('비밀번호를 입력하시오');
    }
    else if (!pw2.trim()){
      alert('비밀번호가 일치하지 않습니다');
    }
    else {
      this.setState({
        password: pw1
      }, this.props.secondPassword(e, this.state));
    }
  }

  render(){
    return(
      <header>
        <h2>2차 비밀번호</h2>
        <form
          onSubmit={(e) => {
                e.preventDefault();
                this.input_check(
                  e,
                  e.target.pw1.value,
                  e.target.pw2.value
                )
          }}>
          <div>
            <div>
              <input type='password' name='pw1' className='ps_box' placeholder='2차 비밀번호'></input>
            </div>
            <div>
              <input type='password' name='pw2' className='ps_box' placeholder='2차 비밀번호 확인'></input>
            </div>   
            <div>
              <button type='submit' className='btn btn_type'>2차 비밀번호 설정</button>
            </div>
          </div>
        </form>
      </header>
    );
  }
}

export default SecondPw;
