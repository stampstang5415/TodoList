import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  background-color: white;
  width: 210px;
  height: 50px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
`;
const Label = styled.label`
  margin-right: auto;
  position: relative;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  & {
    > p {
      line-height: 40px;
      font-family: Georgia, serif;
      margin-top: auto;
      margin-bottom: auto;
      text-decoration: ${props => props.textstyle ? "line-through" : "initial"};
    }
  }
`;
const Input = styled.input`
  position: absolute;
  opacity: 0;
  & {
    + ${Label}:before {
      content: "";
      margin-right: 10px;
      display: inline-block;
      vertical-align: text-top;
      width: 40px;
      height: 40px;
      background: cornflowerblue;
      border-radius: 50%;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
    }
  }
  &:hover {
    + ${Label}:before {
      background-color: whitesmoke;
    }
  }

  &:focus {
    + ${Label}:before {
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
    }
  }
  &:checked {
    + ${Label}:before {
      background: orangered;
    }
  }
  &:checked {
    + ${Label}:after {
      content: "";
      position: absolute;
      left: 11px;
      background: white;
      width: 2px;
      height: 2px;
      box-shadow: 1px 0 0 white, 2px 0 0 white, 3px 0 0 white, 4px 0 0 white,
        5px 0 0 white, 6px 0 0 white, 7px 0 0 white, 8px 0 0 white,
        0px 1px 0 white, 1px 1px 0 white, 1px 1px 0 white, 2px 1px 0 white,
        3px 1px 0 white, 4px 1px 0 white, 5px 1px 0 white, 6px 1px 0 white,
        7px 1px 0 white, 8px 1px 0 white, 7px -1px 0 white, 7px -2px 0 white,
        7px -3px 0 white, 7px -4px 0 white, 7px -5px 0 white, 7px -6px 0 white,
        7px -7px 0 white, 7px -8px 0 white, 7px -9px 0 white, 7px -10px 0 white,
        7px -11px 0 white, 7px -12px 0 white, 7px -13px 0 white,
        7px -14px 0 white, 7px -15px 0 white, 7px -16px 0 white,
        8px -1px 0 white, 8px -2px 0 white, 8px -3px 0 white, 8px -4px 0 white,
        8px -5px 0 white, 8px -6px 0 white, 8px -7px 0 white, 8px -8px 0 white,
        8px -9px 0 white, 8px -10px 0 white, 8px -11px 0 white,
        8px -12px 0 white, 8px -13px 0 white, 8px -14px 0 white,
        8px -15px 0 white, 8px -16px 0 white;
      transform: rotate(45deg);
    }
  }
`;
// const TodoListTitle = styled.p`
//     margin-top: auto;
//     margin-bottom: auto;
// `;

function Checkbox(props) {
  const {checked, handleUpdateStatus,title,id} = props;
  return (
    <div>
      <Wrapper>
        <Input id={id} type="checkbox" checked={checked} onChange={handleUpdateStatus}/>
        <Label textstyle={checked} htmlFor={id}>
          <p>{title}</p>
        </Label>
      </Wrapper>
    </div>
  )
}

export default Checkbox
