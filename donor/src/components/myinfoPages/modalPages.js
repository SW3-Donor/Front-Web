import React from 'react';
import ReceiveList from './ReceiveList'
import './Modal.scss';

const Modal = ({ isOpen, close, title, content }) => {

  const getReceiveList = (items) => {
    const receivelist = items.map((item, index) => {
      // if(index >= 8){
      //   return true
      // }
      return <ReceiveList
        sender = {item.sender}
        date = {item.createdAt}
        key = {index + 1}
      />
    })
    return receivelist;
  }
  return (
    <React.Fragment>
    {
      isOpen ?
      <React.Fragment>
        <div className="Modal-overlay" onClick={close} />
        <div className="Modal">
          <p className="title">{title}</p>
          <div className="content">
            {getReceiveList(content)}
          </div>
          <div className="button-wrap">
            <button onClick={close}>Confirm</button>
          </div>
        </div>
      </React.Fragment>
      :
      null
    }
    </React.Fragment>
  )
}
export default Modal;