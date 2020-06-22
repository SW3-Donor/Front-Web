import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class BoardItem extends Component {
  constructor(){
    super()
    this.state = {}
  }
  // 게시판 id, 토큰, 몇개
  componentDidMount(){
    this.boardItemHandler(this.props.data, this.props.match.params.id)
    .then(resData => {
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

  boardItemHandler = (data, postId) => {
    return fetch(`${data.url}/board/post${postId}`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + data.token,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
  }


  // 기부하기
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
        alert("기부해주셔서 감사합니다.");
        window.location.reload();
      })
  }


  // 삭제하기
  boardItemDelHandler = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if(!token){
      return alert('로그인을 하세요')
    }
    fetch(`${this.props.data.url}/board/post${this.state.postId}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + token,
      }
    })
      .then((res) => res.json())
      .then(resData => {
        this.setState({
          success: true
        })
      })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.donationHandler}>
        <table>
          <caption>게시글 상세보기</caption>
          <tbody>
            <tr>
              <td>
                <input type='number' name='receive' min='0' placeholder="헌혈증 개수" />
              </td>
              <td>
                <input type='password' name='pw' placeholder="2차 비밀번호" />
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
                  <Link to={`/board/update/${this.state.postId}`}><input type="button" value="수정"/></Link>
                  <Link to="/board"><input type="button" value="뒤로" /></Link>
                  <input type="button" value="삭제" onClick={this.boardItemDelHandler}/>
                  {this.state.success ? <Redirect to="/board" /> : false}
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