import React from 'react'


function ListItem(props) {
  return (
    <li className={props.done ? 'done' : ''}>{props.title}</li>
  );
}

export default ListItem;
