import React from 'react';
import Moment from 'react-moment';

function BloodList({date, number}) {
  return (
    <div>
      <div><Moment format="YYYY-MM-DD">{date}</Moment></div>
      <div>{number}</div>
    </div>
  );
}

export default BloodList;