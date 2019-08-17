import React from 'react'
import ListItem from './ListItem'


class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentItem: '',
      todoList: [
        { id: 1, title: 'teste1', done: false },
        { id: 2, title: 'teste2', done: false },
        { id: 3, title: 'teste3', done: true },
        { id: 4, title: 'teste4', done: false }
      ]
    }
  }

  updateCurrentItem = (event) => {
    this.setState({ currentItem: event.target.value })
  }

  addCurrentItem = () => {
    this.setState((oldState) => {
      return {
        currentItem: '',
        todoList: oldState.todoList.concat({ title: oldState.currentItem, done: false })
      }
    })
  }

  toggleDone = (itemId) => {
    let newList = this.state.todoList.slice();
    let itemIndex = newList.findIndex(x => x.id === itemId)

    newList[itemIndex].done = !(newList[itemIndex].done)
    this.setState({todoList: newList})
  }

  render() {
    return (
      <div>
        <h2>Todo</h2>
        <div id="todoInput">
          <input 
            type="text" 
            name="todoInput" 
            id="todoInput" 
            placeholder="New item" 
            value={this.state.currentItem}
            onChange={this.updateCurrentItem} 
            onBlur={this.addCurrentItem}
            />
          <button onClick={this.addCurrentItem}>Add item</button>
        </div>
        <ul id="todoList">
          {
            this.state.todoList.map((listItem) => {
              return (
                <div 
                  key={listItem.id} 
                  onClick={() => this.toggleDone(listItem.id)}> 
                  <ListItem
                    done={listItem.done}
                    title={listItem.title}
                  />
                </div>
             )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Todo;
