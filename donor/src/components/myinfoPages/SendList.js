import React from 'react';
import Moment from 'react-moment';

function SendList({date, receiver}){
  return(
    <div className='sh_lst'>
      <div className='sh_lst_items lst_items'><Moment format="YYYY-MM-DD">{date}</Moment></div>
      <div className='sh_lst_items lst_item'>{receiver}</div>
    </div>
  );
}

export default SendList;