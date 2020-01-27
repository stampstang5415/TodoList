import React, {Component} from "react";
// import "./TodoItem.css";
import "./Checkbox.css";
import {Mutation, Query} from "@apollo/react-components";
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
const REMOVE_TODO = gql`
    mutation EditStatus($id: ID!) {
        removeTodo(id: $id) {
            id
            title
            completed
        }
    }
`;
export class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {new_Title: "", show_Display: false, reverseCounter: 0};
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    // this.handleChangeStatus = this.handleChangeStatus.bind(this);
    // this.handleEditTitle = this.handleEditTitle.bind(this);
    this.myEdit = React.createRef();
    this.myEditButton = React.createRef();
  }

  handleChangeTitle(event) {
    this.setState({new_Title: event.target.value});
  }

  handleEnterPressed = event => {
    if (event.key === "Enter") {
      console.log("Submit");
      event.currentTarget.value = "";

    }
  }
  handleEditTitle = event => {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

    // if (this.state.show_Display === false) {
    //   // event.preventDefault();
    //   this.myEditButton.current.style.display = "none";
    //   this.myEdit.current.style.display = "";
    //   this.setState({show_Display: true});
    //   console.log(this.myEdit.current.style.display);
    // } else {
    //   // event.preventDefault();
    //   this.myEdit.current.style.display = "none";
    //   console.log(this.myEdit.current.style.display);
    // }
  }
  handleHiddenEdit= event => {
    event.preventDefault();
    this.myEdit.current.style.display = "";
  }
  componentDidMount() {
    // this.myEdit.current.style.display = "none";
  }


  render() {
    const {editStatus,editTitle,reverseCounter} = this.props

    return (
      <Query query={TODOLIST_QUERY}>
        {({loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          let reverseTodo = {}
           // console.log(data);
           // return <h1>test</h1>;
          if (reverseCounter !== "Oldest" ){
             reverseTodo = data.getTodoList.slice(0).reverse()
          }else {
             reverseTodo = data.getTodoList
          }
          return  reverseTodo.map(({id, title, completed}) => {
            const handleUpdateStatus = event => {
              event.preventDefault();
              editStatus({variables: {id, completed: event.target.checked}});
            }
            const handleUpdateTitle = event => {
              event.preventDefault();
              editTitle({variables: {id, title: this.state.new_Title}});
            }
            return (
              <div className="row" key={id}>
                <li id="list" className="list-item">

                  <input
                    type="checkbox" className="hidden-box" id={title} checked={completed}
                    onChange={handleUpdateStatus}
                  />
                  <label htmlFor={title} className="check--label">
                    <span className="check--label-box"/>
                    <span className="check--label-text">{title}</span>

                        <form

                          // className="inputEdit"
                          ref={this.myEdit}
                          onSubmit={handleUpdateTitle}
                        >
                          <input
                            onChange={this.handleChangeTitle}
                            onKeyDown={this.handleEnterPressed}
                          />
                          {/*<button type="submit" className="mx-2 text-success"><i className="fas fa-pen" /></button>*/}
                        </form>
                    <div className="todo-icon justify-content-end ">
              {/*<span className="mx-2 text-success">*/}
                        {/*  <i className="fas fa-pen" ref={this.myEditButton} onClick={this.handleEditTitle}/>*/}
                        {/*</span>*/}
                {/*        <span className="mx-2 text-danger">*/}
                {/*<i className="fas fa-trash"/>*/}
              {/*</span>*/}
                      <Mutation
                        mutation={REMOVE_TODO}
                        update={(cache, {data: {removeTodo}}) => {
                          const {getTodoList} = cache.readQuery({query: TODOLIST_QUERY});
                          cache.writeQuery({
                            query: TODOLIST_QUERY,
                            data: {getTodoList: getTodoList.filter(e => e.id !== id)},
                          });
                        }}
                      >
                        {removeTodo => (
                          <form onSubmit={e => {
                            e.preventDefault();
                            removeTodo({variables: {id: id}});

                          }}>
                      <button type="submit" className="mx-2 text-danger"><i className="fas fa-trash" /></button>
                            </form>
                        )}
                      </Mutation>
                    </div>
                  </label>
                </li>
              </div>

            );
          })
            ;
        }}
      </Query>
    );
  }
}

export default TodoItem;
