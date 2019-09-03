import SimpleApolloClient from "apollo-boost";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

const APIRequests = authToken => {
  authToken = authToken || "unauthenticated";

  const apolloClient = new SimpleApolloClient({
    // uri: 'http://localhost:3000/graphql',
    uri: "https://rails-graphql-todo.herokuapp.com/graphql"
  });

  const httpLink = createHttpLink({
    // uri: 'http://localhost:3000/todo/graphql',
    uri: "https://rails-graphql-todo.herokuapp.com/todo/graphql"
  });

  const authLink = () =>
    setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${authToken}`
        }
      };
    });

  const todoApolloClient = new ApolloClient({
    link: authLink().concat(httpLink),
    cache: new InMemoryCache()
  });

  const MUTATION_SIGNUP = gql`
    mutation userSignup(
      $clientId: String!
      $clientSecret: String!
      $email: String!
      $password: String!
      $passwordConfirmation: String!
    ) {
      userSignup(
        clientId: $clientId
        clientSecret: $clientSecret
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      ) {
        user {
          id
          email
        }

        token
        errors
      }
    }
  `;

  const MUTATION_LOGIN = gql`
    mutation userLogin(
      $clientId: String!
      $clientSecret: String!
      $email: String!
      $password: String!
    ) {
      userLogin(
        clientId: $clientId
        clientSecret: $clientSecret
        email: $email
        password: $password
      ) {
        user {
          id
          email
        }

        token
        errors
      }
    }
  `;

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
  `;

  const MUTATION_TOGGLE_TASK = gql`
    mutation toggleDone($taskId: ID!) {
      toggleTask(taskId: $taskId) {
        task {
          id
          title
          done
        }
      }
    }
  `;

  const MUTATION_CREATE_TASK = gql`
    mutation createTask($title: String!) {
      createTask(title: $title) {
        task {
          id
          title
          done
        }
      }
    }
  `;
  const MUTATION_DELETE_TASK = gql`
    mutation deleteTask($taskId: ID!) {
      deleteTask(taskId: $taskId) {
        task {
          id
          title
          done
        }
      }
    }
  `;

  // const serverUrl = 'http://localhost:3000/graphql',
  const serverUrl = "https://rails-graphql-todo.herokuapp.com/graphql",
    doorkeeperApp = {
      clientId: "S7aN6PMOUhrdFxWTS4ke2hif4C6o4H3nFqAV6uciCss",
      clientSecret: "pSURYFc4sr6HnQ_bt2Yqevhy8VGNb8xyrUZDE2w6gjM"
    };

  const wakeHerokuServer = async () => {
    return fetch(serverUrl.replace("/graphql", ""))
      .then(() => {
        console.log("server is awake!");
      })
      .catch(error => console.log(error));
  };

  const signup = async (email, password, passwordConfirmation) => {
    const params = { ...doorkeeperApp, email, password, passwordConfirmation };

    return apolloClient
      .mutate({ mutation: MUTATION_SIGNUP, variables: params })
      .then(res => {
        let errors = res["data"]["userSignup"]["errors"];

        if (errors) {
          throw new Error(errors);
        }

        return res["data"]["userSignup"]["token"];
      })
      .catch(errors => {
        throw new Error(errors);
      });
  };

  const login = async (email, password) => {
    const params = { ...doorkeeperApp, email, password };

    return apolloClient
      .mutate({ mutation: MUTATION_LOGIN, variables: params })
      .then(res => {
        let errors = res["data"]["userLogin"]["errors"];

        if (errors) {
          throw new Error(errors);
        }

        return res["data"]["userLogin"]["token"];
      })
      .catch(errors => {
        throw new Error(errors);
      });
  };

  const getAllTasks = async () => {
    return todoApolloClient
      .query({ query: QUERY_TASKS })
      .then(res => {
        console.log(res["data"]["me"]["tasks"]);
        return res["data"]["me"]["tasks"];
      })
      .catch(errors => {
        throw new Error(errors.response.data.error);
      });
  };

  const createTask = async task => {
    return todoApolloClient
      .mutate({
        mutation: MUTATION_CREATE_TASK,
        variables: { title: task }
      })
      .then(res => {
        return res["data"]["createTask"]["task"];
      })
      .catch(errors => {
        throw new Error(errors.response.data.error);
      });
  };

  const toggleTaskStatus = async task => {
    return todoApolloClient
      .mutate({
        mutation: MUTATION_TOGGLE_TASK,
        variables: { taskId: task.id }
      })
      .then(res => {
        return res["data"]["toggleTask"]["task"];
      })
      .catch(errors => {
        throw new Error(errors.response.data.error);
      });
  };

  const deleteTask = async task => {
    return todoApolloClient
      .mutate({
        mutation: MUTATION_DELETE_TASK,
        variables: { taskId: task.id }
      })
      .then(res => {
        return res["data"]["deleteTask"]["task"];
      })
      .catch(errors => {
        throw new Error(errors.response.data.error);
      });
  };

  return {
    wakeHerokuServer,
    signup,
    login,
    getAllTasks,
    createTask,
    toggleTaskStatus,
    deleteTask
  };
};

export default APIRequests;
