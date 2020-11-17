# Learning REDUX

## Outline

- [What is redux](#What-is-REDUX "Define redux")
- [File Architecture](#Architecture "Redux Architecture")
- [Terminology](#Terminology "Technical terms")
  - [actions](#Actions "Actions")
  - [actions-creators](#Action-Creators "Actions Creators")
  - [reducers](#Reducers "Reducers")
  - [selectors](#Selectors "Selectors")
  - [store](#Store "Store")
- [Analogy](#Analogy "Analogy")
- [Work-flow](#Workflow "Workflow")
- [Concepts](#Concepts "Concepts")
- [Using-react-redux](#Using-React-Redux "Using react redux")
- [Connecting-components](#Connecting-Component "Connecting components")
  - [Different-combination-of-connect](#Different-combination-of-connect-function "Diffenent combination of connect")

## What-is-REDUX?

Redux is a state management library using single store.

## Architecture

- redux
  - reducers
    - reducer_n.js
  - actionTypes.js
  - actions.js
  - store.js
  - selectors.js

> 'React-Redux': is react binding with redux.

## Terminology

### Actions

Actions are plain javascript objects that have property named 'type'

```js
{
  "type": "ACTION_NAME",
  "payload":{

  }
}
```

### Actions-Creators

Action creators are those functions which creates action object

```js
function createAction(parms) {
  return {
    type: "ACTION_NAME",
    payload: {
      ...parms,
    },
  };
}
```

### Reducers

Reducers are pure functions. Pure functions are those functions that doesnot alter or change objects outside of its scope. They basically are functions that recieves currentState and action.

```js
const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ACTION_NAME":
      return newState;
    default:
      return state;
  }
}
```

### Selectors

Selectors are helper functions that lets us to get the desired value from 'store' or 'reducer'.

```js
const titleSelector = (state) => state.article.title;
```

### Store

Store wraps all the reducers within it.

```js
import { createStore } from "redux";
import rootReducer from "./reducers";

export default createStore(rootReducer);
```

## Analogy

- ActionsType are like 'events' eg. onClick, onScroll, onChange...
- Reducers are like 'event handlers' eg. onClickListener, onChangeListener, onKeyPressListener...
- Selectors are those functions which helps out in retriving complex object from store | To aviod repetation.
- Store holds the state of the application.

## Workflow

- Add Provider to the root of your app.
- Define actions and group them by components.
- Define actionCreators with actionType and payload.
- Define reducers.
- Connect components using 'use'.
- Consume store.

## Concepts

- Store | holds set of reducers
- Reducer | pure js functions that depends on actionType
- ActionTypes | contains set of constants
- Actions | defines action with property 'type' and 'payload'

## Using-React-Redux

- Wrap application Component by 'Provider' from 'react-redux' - It will enable your components to access store object

## Connecting-Component

```js
// This is called when ever your state object will change
const mapStateToProps = (state, ownProps) => {};

/*
 * This contains list of 'actions creators' that the component will trigger
 * This will be auto binded to props object - we generally access actions creators by 'props'.
 *
 */
const mapDispatchToProps = {};

const connectedComponent = use(mapStateToProps, mapDispatchToProps)(Component);
```

### Different-combination-of-connect-function

|                               |        Do Not Subscribe to the Store         |                                  Subscribe to the Store |
| ----------------------------- | :------------------------------------------: | ------------------------------------------------------: |
| Do Not Inject Action Creators |             connect()(Component)             |                     connect(mapStateToProps)(Component) |
| Inject Action Creators        | connect(null, mapDispatchToProps)(Component) | connect(mapStateToProps, mapDispatchToProps)(Component) |
