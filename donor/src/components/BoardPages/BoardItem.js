import React, { Component } from 'react';

class BoardItem extends Component {

  componentDidMount(){
    console.log(this.props.match)
    this.boardItemHandler(this.props.data, this.props.match.params.id)
    .then(resData => {
      console.log(resData)
    })
  }

  boardItemHandler = (data, userid) => {
    console.log('매매',userid)
    return fetch(`${data.url}/post:${userid}`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + data.token,
        "Content-Type": "application/json"
      },
      params: {
        postId: userid
      }
    })
      .then(res => res.json())
  }

  render(){
    return(
      <div>
        ???
      </div>
    )
  }
}


export default BoardItem;