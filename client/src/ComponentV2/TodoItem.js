import React, {useState} from "react";
import "./Checkbox.css";
import EditTitle from "./EditTitle.js";
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const TODOLIST_QUERY = gql`
    query TodoListQuery($sort: String) {
        getTodoList(sort: $sort) {
            id
            title
            completed
            
        }
    }
`;
function TodoItem(props){
  const [new_Title, setNew_Title] = useState("");
  const [count_Display, setCount_Display] = useState(false);

  const handleChangeTitle= (event) =>{
    setNew_Title(event.target.value);
  };
  const handleEnterPressed = (event) => {
    if (event.key === "Enter") {
      console.log("Submit");
      event.currentTarget.value = "";
      setCount_Display(true );
    }
  };

    const {editStatus,editTitle,reverseList,removeTodo} = props;
    const { loading, error, data } = useQuery(TODOLIST_QUERY, {
      variables: { sort: reverseList },});

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

          return  data.getTodoList.map(({id, title, completed}) => {
            const handleUpdateStatus = event => {
              event.preventDefault();

              editStatus({variables: {id, completed: event.target.checked}});
            };
            const handleUpdateTitle = event => {
              event.preventDefault();
              editTitle({variables: {id, title: new_Title}});
            };
            const handleRemoveTodo = event => {
              event.preventDefault();
              removeTodo({variables: {id: id}}).then(() =>  console.log("detele") );
            };
            return (
              <div className="row" key={id}>
                  <input
                    type="checkbox" className="hidden-box" id={id} checked={completed}
                    onChange={handleUpdateStatus}
                  />
                  <label htmlFor={id} className="check--label">
                    <span className="check--label-box"/>
                    <span className="check--label-text">{title}</span>
                        <form
                          onSubmit={handleUpdateTitle}>
                          <EditTitle count_Display={count_Display} handleChangeTitle={handleChangeTitle} handleEnterPressed={handleEnterPressed} />
                        </form>
                    <div className="todo-icon justify-content-end ">
                          <form onSubmit={handleRemoveTodo}>
                      <button type="submit" className="mx-2 bg-danger text-white border-danger"><i className="fas fa-trash" /></button>
                            </form>
                    </div>
                  </label>
              </div>

            );
          })
            ;
}

export default TodoItem;
