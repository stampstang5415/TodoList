import React, {useState} from 'react'
import styled, {css} from "styled-components";

function EditTitle(props) {
  const [show_Display, setShow_Display] = useState(false);

  const Hide_and_Show = () => {
    setShow_Display(!show_Display)
  };

  const {handleChangeTitle, handleEnterPressed} = props;

  return (
    <div>
      {show_Display ? <InputEditText size="12" onChange={handleChangeTitle} onKeyDown={handleEnterPressed}/> :
        <EditButton type="button" onClick={Hide_and_Show}><i className="fas fa-pen"/></EditButton>}
      {show_Display ?
        <EditButton close type="button" onClick={Hide_and_Show}><i className="fas fa-times"/></EditButton> : null}
    </div>
  )
}

const EditButton = styled.button`
    background-color: #28a745!important;
    border-radius: 20px;
    color: #fff!important;
    margin-top: 7px;
    margin-left: .5rem!important;
    margin-right: .5rem!important;
    border-color: green;
    ${props => props.close && css`
    background-color: #dc3545!important;
    border-color: brown;
  `}
`;
const InputEditText = styled.input`
    border-radius: .25rem;
    border: 1px solid #ced4da;
`;

export default EditTitle