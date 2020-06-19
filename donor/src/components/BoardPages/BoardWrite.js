import React, { Component } from 'react';

class BoardWrite extends Component {

  input_check = (e) => {
    e.preventDefault();
    if (!this.props.token){
      alert('아이디를 입력하시오');
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
      this.props.onBoardWrite(e, {
        title: e.target.title.value,
        content: e.target.content.value,
        count: e.target.count.value
      });
    }
  }

  render(){
    return(
      <div>
        <form onSubmit={this.input_check}>
          <table>
            <caption>게시판 글쓰기</caption>
            <tbody>
              <tr>
                <td>제 목</td>
                <td><input type='text' name="title" /></td>
              </tr>
              <tr>
                <td>수 량</td>
                <td><input type='number' name="count" /></td>
              </tr>
              <tr>
                <td>내 용</td>
                <td><textarea rows="10" cols="100" name="content" /></td>
              </tr>
              <tr>
                <td colSpan="2">
                  <div align="center">
                    <input type="submit" value="등록" />
                    <input type="button" value="뒤로" />
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

export default BoardWrite;