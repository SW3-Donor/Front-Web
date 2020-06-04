import React, { Component } from "react";

class Trade extends Component {
  input_check = (e) => {
    e.preventDefault();
    if (!e.target.re_email.value.trim()){
      alert('받는 사람의 이메일을 입력하시오');
    }
    else if (!e.target.blood_count.value.trim()){
      alert('헌혈증 개수를 입력하시오');
    }
    else if (!e.target.pw2.value.trim()){
      alert('2차 비밀번호를 입력하시오');
    }
    else{
      this.props.tradeBlood(e, {
        password: e.target.pw2.value,
        receiver: e.target.re_email.value,
        count: e.target.blood_count.value
      })
    }
  }
  render(){
    return(
      <div>
        <form onSubmit={this.input_check}>
          <div>
            <input type='email' name='re_email' className='ps_box' placeholder='받는 사람 이메일'></input>
          </div>
          <div>
            <input type='number' name='blood_count' className='ps_box' placeholder='헌혈증 개수'></input>
          </div>
          <div>
            <input type='password' name='pw2' className='ps_box' placeholder='2차 비밀번호를 입력하시오'></input>
          </div>
          <div>
            <button type='submit' className='btn btn_type'>보내기</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Trade;