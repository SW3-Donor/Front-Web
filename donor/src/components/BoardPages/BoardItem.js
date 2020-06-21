import React, { Component } from 'react';

class BoardItem extends Component {
  constructor(){
    super()
    this.state = {}
  }
  // 게시판 id, 토큰, 몇개
  componentDidMount(){
    this.boardItemHandler(this.props.data, this.props.match.params.id)
    .then(resData => {
      console.log('뭦',resData)
      this.setState({
        postId: resData.post._id,
        title: resData.post.title,
        count: resData.post.count,
        received: resData.post.received,
        content: resData.post.content,
        name: resData.post.name
      })
    })
  }

  boardItemHandler = (data, userid) => {
    return fetch(`${data.url}/board/post${userid}`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + data.token,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
  }

  donationHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if(!token){
      return alert('로그인을 하세요')
    }
    fetch(`${this.props.data.url}/blood/send`, {
      method: "post",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: this.state.postId,
        secondpassword: event.target.pw.value,
        count: event.target.receive.value
      })
    })
      .then((res) => res.json())
      .then(resData => {
        alert(resData.message);
        window.location.reload();
      })
  }


  render(){
    return(
      <div>
        <form onSubmit={this.donationHandler}>
        <table>
          <caption>게시판 상세보기</caption>
          <tbody>
            <tr>
              <td>
                <input type='number' name='receive' min='0' />
              </td>
              <td>
                <input type='password' name='pw' />
              </td>
            </tr>
            <tr>
              <td>제 목</td>
              <td>{this.state.title}</td>
            </tr>
            <tr>
              <td>수 량</td>
              <td>{this.state.received} / {this.state.count}</td>
            </tr>
            <tr>
              <td>내 용</td>
              <td>{this.state.content}</td>
            </tr>
            <tr>
              <td colSpan="2">
                <div align="center">
                  <input type="submit" value="보내기" />
                  <input type="button" value="뒤로" />
                  <input type="button" value="삭제" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        </form>
      </div>
    )
  }
}


export default BoardItem;