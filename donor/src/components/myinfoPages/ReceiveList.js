import React from 'react';
import Moment from 'react-moment';

function ReceiveList({date, sender}){
  return(
    <div>
      <div><Moment format="YYYY-MM-DD">{date}</Moment></div>
      <div>{sender}</div>
  </div>
  );
}

export default ReceiveList;