import React from 'react';

import { ApolloClient } from 'apollo-client';
// import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag'

import ListItem from './ListItem'


const httpLink = createHttpLink({
  uri: 'http://localhost:3000/todo/graphql',
});

const authLink = (token) => setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    }
  }
});


const QUERY_TASKS = gql`
  {
    me {
      tasks {
        id
        title
        done
      }
    }
  }
`

const MUTATION_TOGGLE_TASK = gql`
  mutation toggleDone($taskId: ID!){
    toggleTask(taskId: $taskId) {
      task {
        id
        title
        done
      }
    }
  }
`

const MUTATION_CREATE_TASK = gql`
  mutation createTask($title: String!){
    createTask(title: $title) {
      task {
        id
        title
        done
      }
    }
  }
`
const MUTATION_DELETE_TASK = gql`
  mutation deleteTask($taskId: ID!){
    deleteTask(taskId: $taskId) {
      task {
        id
        title
        done
      }
    }
  }
`


class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apolloClient: new ApolloClient({
        link: authLink(props.authToken).concat(httpLink),
        cache: new InMemoryCache()
      }),

      currentItem: '',
      loading: true,
      todoList: []
    }
  }

  componentDidMount() {
    this.state.apolloClient.query({query: QUERY_TASKS}).then(res => 
      this.setState({ todoList: res['data']['me']['tasks'], loading: false })
    )
  }

  updateCurrentItem = (event) => {
    this.setState({ currentItem: event.target.value })
  }

  addCurrentItem = () => {
    this.state.apolloClient.mutate({mutation: MUTATION_CREATE_TASK, variables: { 'title': this.state.currentItem }}).then(res => {
      const task = res['data']['createTask']['task']

      this.setState((oldState) => {
        return {
          currentItem: '',
          todoList: oldState.todoList.concat(task)
        }
      })
    })
  }

  toggleDone = (itemId) => {
    let newList = this.state.todoList.slice();
    let itemIndex = newList.findIndex(x => x.id === itemId)

    newList[itemIndex].done = !(newList[itemIndex].done)
    this.setState({todoList: newList})

    this.state.apolloClient.mutate({mutation: MUTATION_TOGGLE_TASK, variables: { 'taskId': itemId }}).then(res => 
      console.log(res['data']['toggleTask']['task'])
    )
  }

  deleteTask = (itemId) => {
    let newList = this.state.todoList.slice();
    let itemIndex = newList.findIndex(x => x.id === itemId)
    newList.splice(itemIndex, 1)
    

    this.setState({todoList: newList})

    this.state.apolloClient.mutate({mutation: MUTATION_DELETE_TASK, variables: { 'taskId': itemId }}).then(res => 
      console.log(res['data']['deleteTask']['task'])
    )
  }

  render() {
    return (
      // <ApolloProvider client={this.state.apolloClient}>
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
              // onBlur={this.addCurrentItem}
              />

            {
              this.state.loading ? 
              <button onClick={this.addCurrentItem} disabled>Loading...</button> :
              <button onClick={this.addCurrentItem}>Add item</button>
            }
          </div>
          {
            this.state.loading ?
            'Loading...' :
            <ul id="todoList">
              {
                this.state.todoList.map((listItem) => {
                  return (
                    <ListItem
                      key={listItem.id} 
                      handleClick={() => this.toggleDone(listItem.id)} 
                      deleteTask={() => this.deleteTask(listItem.id)}
                      done={listItem.done}
                      title={listItem.title}
                    />
                )
                })
              }
            </ul>
          }
        </div>
      // </ApolloProvider>
    );
  }
}

export default Todo;
