import React, { Component } from 'react';

class MyInfo extends Component {
  constructor(){
    super()
    this.state = {
      count: null,
      email: null,
      myblood: null,
      name: null,
      phone: null,
      receivetrade: null,
      sendtrade: null
    }
  }
  componentDidMount(){
    console.log('myinfo컴포넌트')
    this.myinfoHandler(this.props.data)
    .then(resData => {
      this.setState({
        count: resData.count,
        email: resData.email,
        myblood: resData.myblood,
        name: resData.name,
        phone: resData.phone,
        receivetrade: resData.receivetrade,
        sendtrade: resData.receivetrade
      })
    })
  }

  // 이메일, 이름, 전화번호, 헌혈증 개수
  // 유저 정보
  myinfoHandler = (data) => {
    return fetch(`${data.url}/profile/user`, {
      method: "post",
      headers: {
        Authorization: "Bearer " + data.token,
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
  };

  render() {
    return(
      <div>
        <div id="container">
          <div id="content">
            <div className="column">
              <div className="sh_group">
                <div className="sh_header">
                  <h3>개인정보</h3>
                  <div></div>
                </div>
                <div className="sh_content">
                  <dl className="sh_lst">
                    <dt className="blind">프로필사진</dt>
                    <dd className="pic_desc">프로필사진</dd>
                    <dt className="blind">&nbsp;</dt>
                    <dd className="intro_desc">&nbsp;</dd>
                    <dt className="nic_tit">이름</dt>
                    <dd className="nic_desc">{this.state.name}</dd>
                  </dl>
                </div>
                <p className="btn_area_btm"></p>
              </div>
              <div className="sh_group">
                <div className="sh_header">
                  <h3>헌혈증</h3>
                </div>
                <div className="sh_content">
                  <dl className="sh_lst2">
                    <dt>이메일</dt>
                    <dd>qwer1234@naver.com</dd>
                    <dt>전화번호</dt>
                    <dd>{this.state.phone}</dd>
                  </dl>
                </div>
                <p className="btn_area_btm"></p>
              </div>
            </div>
            <div className="column">
              <div className="sh_group">
                <div className="sh_header">
                  <h3>연락처</h3>
                </div>
                <div className="sh_content">
                  <dl className="sh_lst2">
                    <dt>이메일</dt>
                    <dd>qwer1234@naver.com</dd>
                    <dt>전화번호</dt>
                    <dd>010-9999-8888</dd>
                  </dl>
                </div>
                <p className="btn_area_btm"></p>
              </div>
              <div className="sh_group">
                거래목록
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyInfo;