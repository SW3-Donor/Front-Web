import React, { Component } from 'react';

class Join extends Component {
  state = {
    email: null,
    name: null,
    phone: null,
    password: null
  };

  input_check = (e, id, name, phone, pw1, pw2) => {
    if (!id.trim()){
      alert('아이디를 입력하시오');
    }
    else if (!name.trim()){
      alert('이름을 입력하시오');
    }
    else if (!phone.trim()){
      alert('전화번호를 입력하시오');
    }
    else if (!pw1.trim()){
      alert('비밀번호를 입력하시오');
    }
    else if (!pw2.trim()){
      alert('비밀번호가 일치하지 않습니다');
    }
    else {
      this.setState({
        email: id,
        name: name,
        phone: phone,
        password: pw1
      }, this.props.onSignup(e, this.state));
    }
  }

  render(){
    return(
      <header>
        <div>
          <h2>회원가입</h2>
        </div>
        <form
          onSubmit={(e) => {
                e.preventDefault();
                this.input_check(
                  e,
                  e.target.id.value,
                  e.target.name.value,
                  e.target.phone.value,
                  e.target.pw1.value,
                  e.target.pw2.value
                )
        }}>
          <div>
            <div>
            <input type='text' name='id' className='ps_box' placeholder='아이디(이메일)'></input>
            </div>
            <div>
            <input type='text' name='name' className='ps_box' placeholder='이름'></input>
            </div>
            <div>
              <input type='text' name='phone' className='ps_box' placeholder='전화번호'></input>
            </div>
            <div>
              <input type='password' name='pw1' className='ps_box' placeholder='비밀번호'></input>
            </div>
            <div>
              <input type='password' name='pw2' className='ps_box' placeholder='비밀번호 확인'></input>
            </div>   
            <div>
              <button type='submit' className='btn btn_type'>회원가입</button>
            </div>
          </div>
        </form>
      </header>
    );
  }
}

export default Join;
