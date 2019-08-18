import React from 'react'


function ListItem(props) {
  return (
    <div className="listItem">
      <li className={props.done ? 'done' : ''} onClick={props.handleClick}>{props.title}</li>
      <span onClick={props.deleteTask}>DEL</span>
    </div>
  );
}

export default ListItem;
