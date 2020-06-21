import React from 'react';
import Moment from 'react-moment';

function ReceiveList({date, sender}){
  return(
    <div className='sh_lst'>
        <div className='sh_lst_items lst_items'><Moment format="YY-MM-DD">{date}</Moment></div>
        <div className='sh_lst_items lst_item'>{sender}</div>
    </div>
  );
}

export default ReceiveList;