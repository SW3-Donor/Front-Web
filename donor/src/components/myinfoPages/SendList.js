import React from 'react';
import Moment from 'react-moment';

function SendList({date, receiver}){
  return(
    <div>
      <div><Moment format="YY-MM-DD">{date}</Moment></div>
      <div>{receiver}</div>
    </div>
  );
}

export default SendList;