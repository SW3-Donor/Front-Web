import React, { Component } from 'react';
import BloodList from './myinfoPages/BloodList';
import SendList from './myinfoPages/SendList';
import ReceiveList from './myinfoPages/ReceiveList';

class MyInfo extends Component {
  constructor(){
    super()
    this.state = {
      count: 0,
      email: null,
      myblood: [],
      name: null,
      phone: null,
      receivetrade: [],
      sendtrade: []
    }
  }
  componentDidMount(){
    this.myinfoHandler(this.props.data)
    .then(resData => {
      this.setState({
        count: resData.count,
        email: resData.email,
        myblood: resData.myblood.reverse(),
        name: resData.name,
        phone: resData.phone,
        receivetrade: resData.receivetrade.reverse(),
        sendtrade: resData.sendtrade.reverse()
      })
    })
  }

  // 유저 정보 api
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

  getBlood = (items) => {
    const bloodlist = items.map((item, index) => (
      <BloodList
        date = {item.updatedAt}
        number = {item.validnumber}
        key = {index + 1}
      />
    ))
    return bloodlist;
  }

  getSendList = (items) => {
    const sendlist = items.map((item, index) => {
      return <SendList
        receiver = {item.receiver}
        date = {item.createdAt}
        key = {index + 1}
      />
    })
    return sendlist;
  }

  getReceiveList = (items) => {
    const receivelist = items.map((item, index) => {
      return <ReceiveList
        sender = {item.sender}
        date = {item.createdAt}
        key = {index + 1}
      />
    })
    return receivelist;
  }

  render() {
    return(
      <div>
        <div id="container">
          <div id="content">
            <div className="column">
              <div className="sh_group">
                <div className="sh_header">
                  <h3>개인정보</h3>
                </div>
                <div className="sh_content">
                  <dl className="sh_lst2">
                    <dt>이름</dt>
                    <dd>{this.state.name}</dd>
                    <dt>이메일</dt>
                    <dd>{this.state.email}</dd>
                    <dt>전화번호</dt>
                    <dd>{this.state.phone}</dd>
                  </dl>
                </div>
              </div>
              <div className="sh_group">
                <div className="sh_header">
                  <h3>거래기록(받기)</h3>
                </div>
                <div className="sh_content">
                  {this.getReceiveList(this.state.receivetrade)}
                </div>
              </div>
            </div>
            <div className="column">
              <div className="sh_group">
                <div className="sh_header">
                  <h3>헌혈증 {this.state.count}개</h3>
                </div>
                <div className="sh_content">
                  {this.getBlood(this.state.myblood)}
                </div>
              </div>
              <div className="sh_group">
                <div className="sh_header">
                  <h3>거래기록(보내기)</h3>
                </div>
                <div className="sh_content">
                  {this.getSendList(this.state.sendtrade)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyInfo;