import TodoViewer from './components/todoviewer'
import Jumbotron from "./components/jumbotron"
import TodoForm from './components/todoform'

import { connect } from 'react-redux'
import { getTodos } from './redux/selector'

function TodoApp() {

  return (
    <div className="App">
      <header>
        <Jumbotron title="Welcome To TODO App" 
        subtitle="Manage your daily task like a pro..."
        />
      </header>
      <div className="container">

        <div className="row">
          <div className="col-md-6">
            <TodoForm />
          </div>
          <div className="col-md-6">
            <TodoViewer />
          </div>
        </div>
      </div>

    </div>
  );
}

export default connect((store, ownProps)=>{
    return {
      todos: getTodos(store)
    }
  }
)(TodoApp)
