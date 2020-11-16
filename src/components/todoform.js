import { useState } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../redux/actions'

function TodoFrom({ addTodo }) {

  const [todoInput, setTodoInput] = useState('')
  const [ touched, setTouched ] = useState(false)

  function handleClick(e){
    e.preventDefault()
    addTodo(todoInput)
    setTodoInput('')
    setTouched(false)
  } 

  function handleChange(e){
    setTodoInput(e.target.value)
    setTouched(true)
  }


  const classes = touched? (todoInput === '')? 'is-invalid':'is-valid' : ""

  return (
    <form>
      <div className="form-group">
        <label>Todo Text</label>
        <input className={`form-control ${classes}`} type="text" placeholder="Write todo here." value={todoInput} onChange={handleChange} />
        <div className="valid-feedback">
          This seems Alright
        </div>
        <div className="invalid-feedback">
          Please write something !
        </div>
      </div>
      <button className="btn btn-primary" 
      onClick={handleClick}
      >Add Todo</button>
  </form>
  )
}

export default connect(
  null,
  {
    addTodo
  }
)(TodoFrom)