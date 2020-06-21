import React from 'react';
import Moment from 'react-moment';

function BloodList({date, number}) {
  return (
    <div className='sh_lst'>
      <div className='sh_lst_items lst_items'><Moment format="YY-MM-DD">{date}</Moment></div>
      <div className='sh_lst_items lst_item'>{number}</div>
    </div>
  );
}

export default BloodList;