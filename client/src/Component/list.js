import React, { Component } from "react";
import { Query } from "@apollo/react-components";
import gql from "graphql-tag";

const TODOLIST_QUERY = gql`
  query TodoListQuery {
    getTodoList {
      id
      title
      completed
    }
  }
`;
// const ExchangeRates = () => (
//   <Query query={TODOLIST_QUERY}>
//     {({ loading, error, data }) => {
//       if (loading) return <p>Loading...</p>;
//       if (error) return <p>Error :(</p>;

//       return data.getTodoList.map(({ id, title, completed }) => (
//         <div key={id}>
//           <p>
//             ID: {id}
//             <br></br>
//             Title: {title}
//             <br></br>
//             Completed: {completed}
//           </p>
//         </div>
//       ));
//     }}
//   </Query>
// );
export class list extends React.Component {
  render() {
    return (
      <div>
        <Query query={TODOLIST_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            // console.log(data);
            // return <h1>test</h1>;
            return data.getTodoList.map(({ id, title, completed }) => (
              <div key={id}>
                <p>
                  ID: {id}
                  <br></br>
                  Title: {title}
                  <br></br>
                  Completed: {completed}
                </p>
              </div>
            ));
          }}
        </Query>
      </div>
    );
  }
}
export default list;
