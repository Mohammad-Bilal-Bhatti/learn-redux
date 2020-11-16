import { connect } from 'react-redux'
import { getTodos } from '../redux/selector'

function Jumbotron(props) {
  const { title, subtitle, todos } = props
  return (
    <div className="jumbotron">
    <h1 className="display-4 text-center">{title}</h1>
    <p className="lead text-center">{subtitle}</p>
    <hr className="mt-5 mb-2"/>

    <p className="lead">
      Remaning Tasks
      <strong className="text-muted mx-2">
      {todos.reduce((acc,cur)=>{
      if (cur.done === false) return acc + 1
      return acc
      }, 0)}
    </strong>              
    </p>
  </div>
  )
}

export default connect(
  (store, ownProps) =>{
    return {...ownProps, todos: getTodos(store)}
  }
)(Jumbotron)

