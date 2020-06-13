import React, { Component } from 'react';

class MyInfo extends Component {
  render() {
    return(
      <div>
        <div>
          <h1>MyInfo</h1>
        </div>
        <div id="container">
          <div id="content">
            <div className="column">
              <div className="sh_group">
                <div className="sh_header">
                  <h3>개인정보</h3>
                </div>
                <div className="sh_content">
                  <dl className="sh_lst">
                    <dt className="blind">프로필사진</dt>
                    <dd className="pic_desc">프로필사진</dd>
                    <dt className="blind">&nbsp;</dt>
                    <dd className="intro_desc">&nbsp;</dd>
                    <dt className="nic_tit">이름</dt>
                    <dd className="nic_desc">원동훈</dd>
                  </dl>
                </div>
                <p className="btn_area_btm"></p>
              </div>
              <div className="sh_group">
                혈액형
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