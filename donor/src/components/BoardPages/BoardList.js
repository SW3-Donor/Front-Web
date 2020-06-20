import React, { Component } from 'react';

class BoardList extends Component {
  render(){
    return(
      <tr>
        <td>{this.props.num}</td>
        <td>{this.props.title}</td>
        <td>{this.props.count}</td>
        <td>나다</td>
        <td>작성일</td>
    </tr>
    );
  }
}


export default BoardList;