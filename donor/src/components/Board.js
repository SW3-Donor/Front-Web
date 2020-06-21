import React, { Component } from 'react';
import BoardList from './BoardPages/BoardList';
import { Link } from 'react-router-dom';

class Board extends Component {
  constructor(){
    super()
    this.state = {
      data: []
    }
  }

  componentWillUnmount(){
    console.log("componentWillUnmount");
}

  componentDidMount(){
    this.boardHandler(this.props.data)
    .then(resData => {
      console.log(resData)
      this.setState({
        data: resData.posts.reverse()
      })
    })
  }

  // 게시글 목록 가져오기
  boardHandler = (data) => {
    return fetch(`${data.url}/board/posts`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + data.token,
        "Content-Type": "application/json",
      }
    })
    .then(res => res.json())
  };

  getBoardList = (items) => {
    const boardList = items.map((item, index) => (
      <BoardList 
        id = {item._id}
        title = {item.title}
        count = {item.count}
        num = {index + 1}
        key = {index + 1}
      />
    ))
    return boardList;
  }

  render() {
    return(
      <div>
        <div>
          <h1>게시판</h1>
        </div>
        <div>
          <span>개인</span>
          <span> / </span>
          <span>병원</span>
        </div>
        <Link to='/board/write'>등록</Link>
        <table border="1">
          <tbody>
            <tr align='center'>
              <td width="100">번호</td>
              <td width="300">제목</td>
              <td width="100">수량</td>
              <td width="100">작성자</td>
              <td width="100">작성일</td>
            </tr>
            {this.getBoardList(this.state.data)}
          </tbody>
        </table>
        <br></br>
      </div>
    );
  }
}

export default Board;