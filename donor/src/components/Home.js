import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import blood_img from '../img/blood.png'

class Home extends Component {
  render(){
    return(
        <header>
          <div className='img-box'>
            <img src={blood_img} alt="이미지" title="헌혈하세요" className='blood'/>
          </div>
          <div>
            {/* 게시글 */}
          </div>
        </header>
    );
  }
}

export default Home;
