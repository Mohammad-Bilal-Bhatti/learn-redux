import { ADD_TODO, TRIGGER_TODO, DELETE_TODO } from '../actionTypes'

const initialState = {
  todos: []
};

export default function(state = initialState, action){
  switch (action.type){
    case ADD_TODO:
      const { key, content, done } = action.payload
      const _todo = {key, content, done}
      return {...state, todos: [...state.todos, _todo ] }
    case TRIGGER_TODO:
      const { key: id } = action.payload
      const itemIndex = state.todos.findIndex( item => item.key === id )
      if (itemIndex >= 0) {
        const originalItem = state.todos[itemIndex]
        const _newItem = {...originalItem, done: !originalItem.done}
        return {...state, 
          todos: [...state.todos.slice(0, itemIndex), _newItem, ...state.todos.slice(itemIndex + 1, state.todos.length)]
        }
      }
      return state
    case DELETE_TODO:
      const { _id } = action.payload
      return {...state, todos: [...state.todos.filter(todo=>todo.key !== _id)]}

    default:
      return state   

  }
}