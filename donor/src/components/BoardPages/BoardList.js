import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BoardList extends Component {
  render(){
    return(
      <tr>
        <td>{this.props.num}</td>
        <td><Link to={`/board/list/${this.props.id}`}>{this.props.title}</Link></td>
        <td>{this.props.received} / {this.props.count}</td>
        <td>{this.props.name}</td>
        <td>작성일</td>
    </tr>
    );
  }
}


export default BoardList;