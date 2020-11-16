import { ADD_TODO, TRIGGER_TODO, DELETE_TODO} from './actionTypes'

function* idMaker(start = 1) {
  let id = start 
  while (true)
    yield id++
}

const maker = idMaker()

export const addTodo = content => {
  return {
    type: ADD_TODO,
    payload: {
      key: maker.next().value,
      content,
      done: false      
    }
  }
}

export const triggerTodo = ({key}) => {
  return {
    type: TRIGGER_TODO,
    payload: {
      key
    }
  }
}



export const deleteTodo = ({key}) => {
  return {
    type: DELETE_TODO,
    payload:{
      _id: key
    }
  }
}