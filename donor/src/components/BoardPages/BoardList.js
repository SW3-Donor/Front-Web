import React from 'react';

function BoardList({title, count, key}){
  return(
    <tr>
      <td>{key}</td>
      <td>{title}</td>
      <td>{count}</td>
      <td>나다</td>
      <td>작성일</td>
    </tr>
  )
}

export default BoardList;