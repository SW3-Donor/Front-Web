import React, { Component } from 'react';

class Blood extends Component {

  input_check = (e, blood) => {
    if (!blood.trim()){
      alert('아이디를 입력하시오');
    }
    else{
      this.props.onBlood(e, {
        number: blood
      })
    }
  }

  render() {
    return(
      <header>
        <div>
          <form onSubmit={(e) => {
            e.preventDefault();
            this.input_check(e, e.target.blood_register.value)
          }}>
            <div>
              <input type='text' name='blood_register' className='ps_box' placeholder='헌혈증 번호'></input>
            </div>
            <div>
              <button type='submit' className='btn btn_type'>등록</button>
            </div>
          </form>
        </div>
      </header>
    );
  }
}

export default Blood;