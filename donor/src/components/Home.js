import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
    render(){
        return(
                <header>
                    <h1>DONOR</h1>
                    <Link to='login'>
                        <button name='login'>로그인</button>
                    </Link>
                    <Link to='blood/register'>
                        <button name='b_register'>헌혈증 등록</button>
                    </Link>
                </header>
        );
    }
}

export default Home;
