import React from 'react';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag'

import ListItem from './ListItem'


const httpLink = createHttpLink({
  uri: 'http://localhost:3000/todo/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = "lVcXWSv6i0F8Inj7eTtnorFzGZcovBCSLL2ZVQ8fjnI"
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
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


class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentItem: '',
      loading: true,
      todoList: [
        // { id: 1, title: 'teste1', done: false },
        // { id: 2, title: 'teste2', done: false },
        // { id: 3, title: 'teste3', done: true },
        // { id: 4, title: 'teste4', done: false }
      ]
    }
  }

  componentDidMount() {
    client.query({query: QUERY_TASKS}).then(res => 
      this.setState({ todoList: res['data']['me']['tasks'], loading: false })
    )
  }

  updateCurrentItem = (event) => {
    this.setState({ currentItem: event.target.value })
  }

  addCurrentItem = () => {
    client.mutate({mutation: MUTATION_CREATE_TASK, variables: { 'title': this.state.currentItem }}).then(res => {
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

    client.mutate({mutation: MUTATION_TOGGLE_TASK, variables: { 'taskId': itemId }}).then(res => 
      console.log(res['data']['toggleTask']['task'])
    )
  }

  render() {
    return (
      <ApolloProvider client={client}>
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
                      done={listItem.done}
                      title={listItem.title}
                    />
                )
                })
              }
            </ul>
          }
        </div>
      </ApolloProvider>
    );
  }
}

export default Todo;
