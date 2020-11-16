import { connect } from 'react-redux'
import { triggerTodo, deleteTodo } from '../redux/actions'
import { getTodos } from '../redux/selector'

function TodoViewer({ todos, triggerTodo, deleteTodo }) {

  let style = { cursor: 'pointer' }

  return (
    <ul class="list-group">
      {todos.map(
        todo=>{
          const {key, content, done} = todo;
          return (
          <li 
            key={key}
            style={style}
            className="list-group-item"
            onClick={()=>triggerTodo(todo)}
            onDoubleClick={()=>deleteTodo(todo)}
            >
              {content}
              { done 
              && <i className="fa fa-check mx-1 p-1 text-primary"></i>
              }
          </li>)
        }
      )}      
    </ul>
  )
}

export default connect(
  (store, ownProps) => {
    return {
      ...ownProps,
      todos: getTodos(store)
    }
  },
  {
    triggerTodo,
    deleteTodo 
  }
)(TodoViewer)