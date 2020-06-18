import React, { Component } from 'react';
import BoardList from './BoardList';

class Board extends Component {
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
        <table border="1">
          <tbody>
            <tr align='center'>
              <td width="100">번호</td>
              <td width="300">제목</td>
              <td width="100">수량</td>
              <td width="100">작성자</td>
              <td width="100">작성일</td>
            </tr>
            <BoardList />
          </tbody>
        </table>
        <br></br>
        <button>등록</button>
      </div>
    );
  }
}

export default Board;