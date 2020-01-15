// // // import React, { Component } from "react";
// // // import React from "react";
// import React from "react";
// // import { Query } from "@apollo/react-components";
// import gql from 'graphql-tag';
// import { Mutation } from '@apollo/react-components';

// const ADD_TODO = gql`
//   mutation AddTodo($title: String!) {
//     addTodo(title: $title) {
//       id
//     title
//     completed
//     }
//   }
// `;

// // function Todostate(completed) {
// //     if (completed == true) {
// //         return <button type="button" class="btn btn-success">Success</button>

// //     } else {
// //         <button type="button" class="btn btn-danger">Danger</button>
// //     }
// // }
// export class AddTodo extends React.Component {
//     render() {
//         let input;
//         return (
//             <div>
//                 <Mutation mutation={ADD_TODO}>
//                     {(addTodo, { data }) => (
//                         <div>
//                             <form
//                                 onSubmit={e => {
//                                     e.preventDefault();
//                                     addTodo({ variables: { title: input.value } });
//                                     input.value = '';
//                                 }}
//                             >
//                                 <input
//                                     ref={node => {
//                                         input = node;
//                                     }}
//                                 />
//                                 <button type="submit">Add Todo</button>
//                             </form>
//                         </div>
//                     )}
//                 </Mutation>
//             </div>
//         );
//     }
// }
// export default Todostate;
