import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BoardItem_up extends Component {
  constructor(){
    super()
    this.state = {}
    this.inputForHandler = this.inputForHandler.bind(this);
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

  input_check = (e) => {
    e.preventDefault();
    if (!this.props.data.token){
      alert('로그인을 먼저하시오');
    }
    else if (!e.target.title.value.trim()){
      alert('제목을 입력하시오');
    }
    else if (!e.target.count.value.trim()){
      alert('수량을 입력하시오');
    }
    else if (!e.target.content.value.trim()){
      alert('내용을 입력하시오');
    }
    else {
      console.log('1빠다')
      this.updateHandler(e, this.props.data)

    }
  }

  inputForHandler(e){
    this.setState({[e.target.name]:e.target.value});
  }

  updateHandler = (event, data) => {
    event.preventDefault();
    console.log('2빠따')
    console.log(this.state)
    console.log(data.token)
    console.log(`${data.url}/board/post${this.state.postId}`)
    fetch(`${data.url}/board/post${this.state.postId}`, {
      method: "put",
      headers: {
        Authorization: "Bearer " + data.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
        count: this.state.count
      }),
    })
      .then(res => res.json())
      .then(resData => {
        console.log('너냐?',resData)
      })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.input_check}>
          <table>
            <caption>게시글 수정</caption>
            <tbody>
              <tr>
                <td>제 목</td>
                <td><input type='text' name="title" value={this.state.title} onChange={this.inputForHandler}/></td>
              </tr>
              <tr>
                <td>작성자</td>
                <td>{this.state.name}</td>
              </tr>
              <tr>
                <td>수 량</td>
                <td>{this.state.received} / <input type='number' name="count" min='0' value={this.state.count} onChange={this.inputForHandler}/></td>
              </tr>
              <tr>
                <td>내 용</td>
                <td><textarea rows="10" cols="100" name="content" value={this.state.content} onChange={this.inputForHandler}/></td>
              </tr>
              <tr>
                <td colSpan="2">
                  <div align="center">
                    <input type="submit" value="저장" />
                    <Link to={`/board/list/${this.state.postId}`}><input type="button" value="뒤로" /></Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default BoardItem_up;