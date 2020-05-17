import React, { Component } from 'react';

class Join extends Component {

  input_check = (nickname, id, pw1, pw2) => {
    if (nickname === ''){
      alert('닉네임을 입력하시오')
    }
    else if (id === ''){
      alert('아이디를 입력하시오')
    }
    else if (pw1 === ''){
      alert('비밀번호를 입력하시오')
    }
    else if (pw1 !== pw2){
      alert('비밀번호가 일치하지 않습니다')
    }
  }

  render(){
    return(
      <header>
        <h2>회원가입</h2>
        <form action='' method='post'
          onSubmit={(e) => {
                e.preventDefault();
                this.input_check(
                  e.target.nickname.value,
                  e.target.id.value,
                  e.target.pw1.value,
                  e.target.pw2.value
                )
        }}>
          <div>
            <div>
              <input type='text' name='nickname' className='ps_box' placeholder='닉네임'></input>
            </div>
            <div>
            <input type='text' name='id' className='ps_box' placeholder='아이디(이메일)'></input>
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
