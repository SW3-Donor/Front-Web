import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/myinfoPages/modalPages';
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
      sendtrade: [],
      isModalOpen: false,
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
    // Modal.setAppElement('body');
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
      if(index>=4){
        return true
      }
      return <ReceiveList
        sender = {item.sender}
        date = {item.createdAt}
        key = {index + 1}
      />
    })
    console.log(receivelist)
    return receivelist;
  }

  // modal
  openModal = (event) => {
    event.preventDefault();
    this.setState({
      isModalOpen: true, 
      modalTitle: event.target.name,
    })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    return(
      <div>
        <div id="container">
          <div className="column">
            <div className="sh_group">
              <div className="sh_header">
                <h3>개인정보</h3>
              </div>
              <div className="sh_content">
                <div className='sh_lst'>
                  <div className='sh_lst_items lst_items'>이름</div>
                  <div className='sh_lst_items lst_item'>{this.state.name}</div>
                </div>
                <div className='sh_lst'>
                  <div className='sh_lst_items lst_items'>이메일</div>
                  <div className='sh_lst_items lst_item'>{this.state.email}</div>
                </div>
                <div className='sh_lst'>
                  <div className='sh_lst_items lst_items'>전화번호</div>
                  <div className='sh_lst_items lst_item'>{this.state.phone}</div>
                </div>
                <div className='sh_lst'>
                  <div className='sh_lst_items lst_items'>2차 비밀번호</div>
                  <Link to="/secondpw" className='sh_lst_items link_btn'>수정</Link>
                </div>
              </div>
            </div>
            <div className="sh_group">
              <div className="sh_header">
                <h3>거래기록(받기)</h3>
              </div>
              <div className="sh_content">
                {console.log(this.state.receivetrade)}
                {this.getReceiveList(this.state.receivetrade)}
              </div>
              <button name='거래기록(받기)'className="modal_btn" onClick={this.openModal}>+</button>
              <Modal 
                isOpen={this.state.isModalOpen} 
                close={this.closeModal}
                title={this.state.modalTitle}
                content={this.state.receivetrade}
              />
            </div>
          </div>
          <div className="column">
            <div className="sh_group">
              <div className="sh_header">
                <h3>헌혈증 {this.state.count}개</h3>
              </div>
              {this.getBlood(this.state.myblood)}
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
    );
  }
}

export default MyInfo;