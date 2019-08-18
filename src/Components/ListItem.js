import React from 'react'


function ListItem(props) {
  return (
    <li className={props.done ? 'done' : ''} onClick={props.handleClick}>{props.title}</li>
  );
}

export default ListItem;
