import TodoApp from './TodoApp'
import { Fragment } from 'react';

import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <Fragment>
      <Provider store={store} >
        <TodoApp />
      </Provider>
    </Fragment>
  );
}

export default App;
