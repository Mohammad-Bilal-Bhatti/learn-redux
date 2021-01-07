# Learning REDUX

> Note Started on: Sunday 13, Dec. 2020 | 09:00 AM

## Getting Started

---

- Redux is the state management library that can be use with: angular, react, vue, vinilla js.
- Redux is popular due to its simplitity and single store architecture.
- Redux is inspired by 'Fulx' - an architectural pattern by facebook in 2014 to solve state management issue.
- Redux store is like memory-database for the font end - a centralize store where the application state resides eg. Menu state, Auth state, Theme/setting state etc...
- Mobx is an alternate to redux.

### Why state management library?

- It is complex to sync different independent components of UI when some data chages in one component.
- Write alot of code.
- Unable to identify where the data came from.
- State lifting is very complex.

### Beneficial

- For higher level components not to maintain global state, since the state is managed by redux.
- Redux also helps to track how, why, when, and where the data is came from.

### Summary

- Centralize the application state.
- Makes dataflow transparent and predictable.

---

## Pros and cons

### Pros

- Identifing actions.
- Time travel debugging.
- 'Log Rocket' tool for debugging when client report error of state updating.
- Predictable state changes.
- Centralized store.
- Cash or preserve page state
- undo/redo feature.
- Great eco-system of addons

### Cons

- Increases Complaxity.
- Based on functional programming principles.
- Boiler plate code repetition --verbosity.

---

## Is redux for you?

- You know redux that doesn't mean you apply it to every project you work on
- First identify what problem you are solving.

### When not to use.

- Tight budget
- Small to medium sized apps.
- Simple UI and dataflow.
- Static data.

> MOSH: Don't use any framework or library in your project due to its popularity or someone tells about it. First identiry is it fits to your project or not

> MOSH: If all you have is a hammer, every thing looks like a nail.

---

## Setting up development environment

```json
// Dev dependencies
{
  ...
  "devDependencies":{
    "webpack": "4.41.6",
    "webpack-cli": "3.3.11",
    "webpack-dev-server": "3.10.3"
  }
}

```

```js
// webpack.config.js

const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
  },
  mode: "development",
};
```

### What is webpack?

Webpack a is module bundler. It searches for all of the javascript files/modules and combine them to single module.

Using webpack we can split our javascript code to multiple files and have web-pack combine them into a bundle.

---

## Functional Programming in Javascript.

- Redux is build upon functional programming principles.
- It will be a great to cover functional programming principles.

### What is functional programming.

#### Programming Paradigms

- Functional programming.
- Object oriented programming.
- Procedural programming.
- Event driven programming.

Each of these paradigms have their own rules, guidelines, and code structure to follow when solving the problem.

Functional programming is invented in 1950s where the program is divided into small and resuable functions that takes input and produce some output.

In functional programming paradigm we can not mutate data.

#### Benefits of Functional programming.

- More concise.
- Easier to debug.
- Easier to test.
- More scalable.

---

## Funcations as first class citizens.

### First class citizens means we can.

- Assign them to a variable.
- Pass as an arguments.
- Return them form another functions.

```js
// Pass function as argurment
function sayHello(fn) {
  return console.log(fn());
}

// Return as function
function greet() {
  return function () {
    return "Hello";
  };
}

// Assign them to variables.
const fn = greet();

console.log(fn());
```

---

## Higher Order Functions.

In context of functional programming an higher order function is a function that:

- takes argument as a function
- return something as a function
- or both.

##### Some builtin Higher order functions.

- Array.map()
- Array.reduce()
- Array.filter()
- windows.setTimeout()

---

## Function Composition

The idea of functional programming is to write a bunch of small and resuable functions and then compose them to build more complex function for solving problems.

Following is the example.

```js
const input = "  hello javascript  ";

const trimmer = (str) => str.trim();
const wrapInDiv = (str) => `<div>${str}</div>`;
const toLower = (str) => str.toLowerCase();

// Functional Compoistion.
const result = wrapInDiv(toLower(trimmer(input)));

console.log(result);
```

---

## Composition and Piping

### Lodash

Lodash is pupular library that includes commonly used utility functions written as functions.

```js
import { compose, pipe } from "lodash/fp";

//...

// we will read compose fn from right to left
const transform = compose(wrapInDiv, toLower, trimmer);

// and will read pipe fn from left to right as ordinary
const pipeline = pipe(trimmer, toLower, wrapInDiv);

const resultA = transform(input);
const resultB = pipeline(input);

console.log(resultA);
console.log(resultB);
```

---

## Currying

Currying is the technique that converts 'n' arguments function to function with single argment.

```js
import { pipe } from "lodahs/fp";

function add(a, b) {
  return a + b;
}

// curring...
function _add(a) {
  return function (b) {
    return a + b;
  };
}

console.log(_add(2)(5));

// curring solves problem...
const wrap = (type) => (string) => `<${type}>${string}</${type}>`;

const mpipe = pipe(toLower, wrap("span"));
```

---

## Pure functions

- A pure function is the function which can not modify or read the global values - values out side the scope of the function.
- A pure function is the function which follows this rule sameArgs => sameResult - When ever we pass same arguments it produces same result everytime - predictable.

#### Following are not pure functions.

- Date.now()
- Math.random()

### Rule of pure function

A function is said to be pure if it follows following rules.

- No use random values.
- No use current date or time.
- Read or Modify any global values(state, DOM, db...)
- No mutation of paramerters

### Benefits

- Easier to test.
- Self documenting.
- Concurrency
- Cashable.

---

## Immutability

Immutability says once we create an object we cannot change/modify/mutate it. To do so first we take a copy of that file and then change it accordingly.

String are 'immutable' but Arrays and Objects are 'mutable'.

> Note: const cannot forces immutability ~ it prevents reassignment

### Why immutability?

- Increase predictability.
- Faster change detection.
- Concurrency

### Cons

- Performance - when making copy
- Memory overhead

> NOTE: When using functional programming principles we should take care of immutability

---

## Immutability and js Objects

```js
const person = {
  name: "Mosh",
  age: 27,
};

// First, way
const updated = Object.assign({}, person, { name: "Mosh Hamadani" });
// Second, way using spread operator
const _updated = { ...person, name: "Mosh Hamadani" };
```

### Problem with spread operator

```js
const person = {
  name: "Mosh",
  address: {
    country: "Australia",
    city: "Sydney",
  },
};

const copy = { ...person, name: "Mosh Hamadani" };

copy.address.country = "Karachi";

// you would see the original person's address modified too. Because it create swallow copy.

// Solution A: deep copy
const _copy = { ...person, address: { ...person.address } };

// Solution B: use library: immer
```

## Immutability and arrays

```js

const numbers = [1, 2, 3, 4]

// [ADDING] at index 2
const index = 2
const added = [...numbers.slice(0, index), 5, ...numbers.slice(index))]
// [UPDATING] 3 with 30
const updated = numbers.map(n => n === 3? 30: n )

// [DELETING] 2
const deleted = numbers.filter( n => n !== 2 )
```

---

## Working with immutable libraries

### Libraries

- Immutable | Developed by facebook
- Immer | Developed by creator of Mobx
- Mori

### Immutable.js

Immutable provides bunch of immutable data-structures like: Map, HashMap...

```bash
$ npm i immutable
```

```js
import { Map } from "immutable";
const book = Map({
  name: "Hero",
  author: "Rhonda Byrin",
});

console.log("name of the book: " + book.get("name"));
console.log("book: " + book);
console.log("js :" + book.toJS());
```

The proble with the immutable library is that we have to learn the whole new api and it adds new properties to our book object as well.

### Immer.js

```bash
$ npm i immer
```

```js
import { produce } from "immer";

let book = { title: "Hero" }
function publish(book){
  produce(book, draftBook => {
    draftBook.isPublished: true
  })
}

let published = publish(book)
console.log(book)
console.log(published)
```

## Redux Fundamentals

### Redux Architecture.

As we know in redux we only have one store that is the single source of truth. The way we design our store is entirly up to us we can use arrays, objects, booleans, and numbers to represent anything in our store.

```js

const store = {

  categories: [],
  products: [],
  cart: {}
  user:{},

}

```

The point to note that redux is build on top of functional programming paradigm, so mutating state is not allowed here. So, we have to design reducers that take current store and return the updated store.

For that we should have to clone the previous state either by using spread operator or by using one the library immer.js and so on...

```js
function reducer(store) {
  // const updated = { ...store }
  // return update store
}

function reducer(store, action) {
  // actions defines what to do...
}
```

Now reducer don't know which property should it have to update? shoppingcart, products, or user info. For that we use the next parameter as 'action'

Action describes what happened to the store eg. User logged-in, Item added to cart etc... Based on the type of the action reducer is able to recognize which property to update.

Generally, we design our store in such a way that we deligate the responsibility of changing property of the store to different reducers, we call them slices - Analogy: Think this design as a company of different departments and every depertment have manager that is responsible for every activity in that department.

#### Building Blocks of Redux.

- Actions | plain javascript objects that represents what just happened. ~ events
- Store | javascript object thats holds the application state.
- Reducers | Managers which are responsible for updating the slice of the redux store. ~ event-handlers | reducers are pure functions. They can not mutate anything, cannot change global values, and have not any side effects.

### How these building blocks works together.

1. We generally creates an action and dispatch it to the store.
2. store takes that action and forward it to the reducer.
3. reducer then acts upon that action and return resolved state back to the store
4. store get the new computed state and notifies the ui.

### Steps to follow to build redux application.

- Design the Store.
- Define the actions.
- Create reducers. (one or more)
- Setup the store based on reducers.

### Installing redux

```bash
npm i redux@4.0
```

### Designing redux store.

You can go with any possible structure that you can think of array of strings, array of objects, object of values, objects of objects.

```js

[ { id: 1, name: "", resolved: false }, {}...]
{
  bugs: [...],
  currentUser: {
    id: 1,
    name: ""
  }
}

```

### Defining the actions.

Defining the actions is the brain stroming step. You can come up the actions when you think the application from user point of view or functional point of view. what your app is going to perform. eg. user add someting, user tries to edit something, deleting something, sorting, filtering, etc...

#### Structure of an action

In redux actions are just simple javascript objects that have type property.

```js
const action = {
  type: "bugAdded",
  payload: {
    id: 1,
    description: "",
    resolved: false,
  },
};

const anotherAction = {
  type: "ADD_BUG",
  payload: {
    id: 1,
    description: "",
    resolved: false,
  },
};

const removeBugAction = {
  type: "bugRemoved",
  payload: {
    id: 1,
  },
};
```

the type property is mendetory but not its value, you can choose any naming convention that you like. The payload pattern is inspired by flux(by facebook). You can make or folow your own too. Its entirly depends upon you.

In payload you need minimum information you need about the action.

### Defining our reducers.

As we know that reducers is a function with two parameters: state and action. The job of this reducer is to return the new state based on the action.

```js
// reducer.js

let nextId = 1;

const INIT_STATE = [];

// implemented using if-else structure.
export default function reducer(state = INIT_STATE, action) {
  if (action.type === "bugAdded") {
    const { description } = action.payload;
    return [
      ...state,
      { id: ++nextId, description: description, resolved: false },
    ];
  } else if (action.type === "bugRemoved") {
    const { id } = action.payload;
    return state.filter((bug) => bug.id !== id);
  } else if (action.type === "bugResolved") {
    const { id } = action.payload;
    const bugIndex = state.findIndex((bug) => bug.id === id);

    const bugResolved = { ...state[bugIndex], resolved: true };

    return [
      ...state.slice(0, bugIndex),
      bugResolved,
      ...state.slice(bugIndex + 1),
    ];
  }
}

// implemented using switch-case.
export default function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "bugAdded": {
      // compute new state based on old state or action's payload.
    }
    case "bugRemoved": {
      // compute new state and return the newly computed state.
    }
    default: {
      return state;
    }
  }
}
```

### Creating the Store.

Store is an object with following properties.

- dispatch(action) fn()
- subscribe fn(listener)
- getState fn()
- replaceReducer fn(nextReducer)
- Symbol fn() :observable

```js
// store.js

import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

export default store;
```

### Dispatching Actions.

The final step it to test the application by dispatching actions.

```js
// index.js

import store from "./store";

console.log("init state: ", store.getState());

store.dispatch({
  type: "bugAdded",
  payload: { description: "High priority bug." },
});
console.log("state after bugAdded: ", store.getState());

console.log("Removing the bug");
store.dispatch({ type: "bugRemoved" });

console.log("state after bugRemoved: ", store.getState());
```

### Subscribing to the Store.

The point of subscribing to the store is that when any action changes the state of the store, different components of our appliaction will automatically notified.

```js
function onStoreChange(store) {
  console.log("store changed: ", store);
}

// onStoreChange will be called anytime the store is changed.
const unsubscribe = store.subscribe(onStoreChange);

store.dispatch({ type: "bugAdded", payload: { description: "Major bug." } });

// it is important to note that when user navigates to some other page you should have to unscribe it inorder to avoid memory leakes.
unsubscribe();

store.dispatch({ type: "bugRemoved", payload: { id: 1 } });
```

### Action Types

Generally we keep out actions or actionTypes at single place to keep our application more maintainable.

```js
// actions.js | actionTypes.js

export const BUG_ADDED = "bugAdded";
export const BUG_REMOVED = "bugRemoved";

export const BUG_RESOLVED = "bugResolved";
```

### Action Creators.

In above example when we are dispatching an action we are creating an object and setting its type attribute, this techinque is ok but very prone to errors. What if developer forgots the action type and puts different one. To eliminate this we come up with the concept of 'action creators'

```js
// actionCreators.js

import { BUG_ADDED, BUG_REMOVED, BUG_RESOLVE } from "./actionTypes";

export const addBug = (description) => {
  return {
    type: BUG_ADDED,
    payload: {
      description: description,
    },
  };
};

export const removeBug = (id) => {
  return {
    type: BUG_REMOVED,
    payload: {
      id: id,
    },
  };
};

export const resolveBug = (id) => {
  return {
    type: BUG_RESOLVED,
    payload: {
      id: id,
    },
  };
};
```

## Building Redux From scratch.

Redux is a simple and light weight library with just few function. You can build your own redux library from scratch.

- store
  - dispatch
  - getState
  - subscribe

```js

class Store{
  private state = {}
  private rootReducer
  private subscribers = []
  constructor( reducer ){
    this.rootReducers = reducer
  }

  getState() { return this.state }

  dispatch( action ) {
    this.state = rootReducer( this.state, action )
    notifyAll()
  }

  notifyAll(){
    forEach( this.subscribers )
      .then( listener => listener( this.state ) )
  }

  subscribe( listener ) {
    this.subscribers.push( listener )
  }
}

```

## Debugging Redux Applications.

### Installing redux devtools

Find the extenstion with the name redux devtools from extention store and install it.

Tracing is one of the beautiful featue of the redux applications, you can enable it by installing redux-devtool-extension package and pass it when creating the store. The tracking will show you lines of code from where your action is dispatched. You can configure the webpack to produce mapping of source code and by changing the redux devtools settings.

Another important feature of the redux application is Log-rocket that enables the remote degugging of our application. you can download the actions.json file and can upload it to get straight to the error without going through all the steps required to produce bug.

## Writing Clean Redux Code.

### Structuring files and folders.

As we know so far that redux is all about state management. It is better to split the UI and state at different location of the project. Because these two's absolutely different concerns.

It is better not to use the library name as the directory eg. redux. Then naming conventions of the directores should based upon roles.

> Name the artifacts based on their roles.

```
feature name could be auth, menu, user etc...

src/
  store/
    features/
      actions.js
      actionTypes.js
      reducer.js

# Ducks pattern of maintaining redux code.

src/
  store/
    auth.js | all actions, action creators and reducer in the same file.
    user.js
    menu.js

# Ducks pattern rules
1. reducer has to be the default export.
2. export all the action creators as simple export. Don't need to export actionTypes.

```

### Introduction to redux toolkit.

Redux is the recommended official library by the redux team in order to structure your redux code. Another feature of redux toolkit is it provides mechanism to allow api calls in the form of middlewares. Redux toolkit function configureStore and facilitates to auto configure redux-devtool-extension.

```bash
# https://redux-toolkit.js.org for further details.

npm i @reduxjs/toolkit@1.2.5
```

```js
// store.js

import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer.js";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
```

### Creating Actions.

```js

// slices.js

import { createAction } from "@reduxjs/toolkit"

// Eliminates the following statements.
// - const BUG_ADDED = "bugAdded"
// - const BUG_RESOLVED = "bugResolved"
// - const BUG_REMOVED = "bugRemoved"

// Also eliminates the manual actionCreators.
// - export const bugAdded = description => ( { type: BUG_ADDED, payload: { description } } )
// - export const bugResolved = id => ( { type: BUG_RESOLVED, payload: { id } } )
// - export const bugRemoved = id => ( { type: BUG_REMOVED, payload: { id } } )

// with, createAction function will return the actionCreator object.
export const bugResolved = createAction("bugResolved")
export const bugAdded = createAction("bugAdded")
export const bugRemoved = createAction("bugRemoved")

const INIT_STATE = []

export default ( state = INIT_STATE, action ){
  switch(action.type){
    case ( bugResolved.type ): {
      state = { ... }
    }
    case ( bugAdded.type ): {
      state = { ... }
    }
    case ( bugRemoved.type ): {
      state = { ... }
    }
    default: {
      return state;
    }
  }
}

```

Alot of developers don't like immutable redux pattern in reducers, to get rid of that they will use popular libiaries such as immer.js or immutable.js ...

```js
import { createReducer } from "@reduxjs/toolkit"

...

const INIT_STATE = []

// key: value
// metaphor -> action: function  ( event => event-handler )
export default createReducer(INIT_STATE, {
  [bugAdded.type]:  ( bugs, action ) => {
    // we can write mutable code here...
    const { description } = action.payload
    bugs.push( {
      id: 1,
      description,
      resolved: false
    })
  },
  [bugResolved.type]: (bugs, action) => {
    const index = bugs.findIndex( bug => bug.id === action.payload.id )
    bugs[index].resolved = true
  }
})


```

### Creating Slices

In redux-toolkit documentation their is the concept of creating slices. createSlice is the function which eliminates the createAction step defined previously. All you have to do is just pass configuration of that slice.

```js
// bugs.slice.js

import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "bugs",
  initialState: [],
  resucers: {
    bugAdded: (bugs, action) => {
      // ...
    },
    bugResolved: (bugs, action) => {
      // ...
    },
  },
});

export const { bugAdded, bugResolved } = slice.actions;

export default slice.reducer;
```

## Designing the store.

### Redux state vs local state

It is ok to use local state if the state is only limited to that component only, but if the state is shared among different components the it is recomended to use global state that components can share.

Rule of thumb: store global state in redux...

```js
const reduxStore = {
  cart: {},
  user: {},
};
```

#### Storing Global state.

- Easy to implement.

#### Store All state.

- Unified data access.
- Cacheability
- Easier Debugging.
- More testable code.

It is recomended to store all state in redux, this makes you slow but at the end your application states will be more maintainable.

#### Exception in storing form state in redux.

- because they holds temporary values.
- Too many dispatches( on every key stoke ).
- Harder to debug.

> Note: The more state we put in the store, the more we can get out of redux. - That doesn't mean you put all states in redux.

Local state is fine we should use when it make sense. If use store data that other parts of the application doesn't care about, there is no need to store it in redux. For example if you are creating the form there is no need to store its state in the redux.

### Structuring Redux store.

```js

const state = [{id: 1, description: "", resolved: false}, ...]

// fast retrival.
const another = [ 1:{ id: 1, description: "", resolved: false }, ... ]
// down falls...
// 1. sorting is problem

// if we want fast retrival and sorting too at same time...
const both = {
  byid: {
    1: {...},
    2: {...},
    3: {...}
  },
  allid: [3,2,1]
}

const appStructure = {
  // entity slice
  entities: {
    bugs: [],
    projects: [],
    tags: []
  },
  // auth slice
  auth: { userid: 1, name: "" },
  // ui slice
  ui: {
    bugs: { query: "", filter: "" }
    ...
  }
}


```

### Combining reducers

```js
// rootReducer.js

import { combineReducers } from "redux";

import userReducer from "user/reducer";
import authReducer from "auth/reducer";

const rootReducer = combineReducer({
  user: userReducer,
  auth: authReducer,
});

const rootReducer = (state, action) => {
  return {
    auth: authReducer(state, action),
    user: userReducer(state, action),
  };
};

export default rootReducer;
```

### Normalizing Store.

Normalizing is about removing duplicated objects from our store. Because the cost of not to normalize, effects on the performance of our application when our application grows.

```js

const nestedSturcture = {
  bugs: [{id: 1, description: "", project: { id: 1, name: "" }}, ... ]
}

// referencing is better then nesting...
const flatStructure = {
  bugs: [{ id: 1, description: "", project: 1 }, ...]
}

const entities = {
  projects: [ {id: 1, name: ""}, ... ]
}

```

using normalization we eliminate repeated, redundant data from our store and connect related data using identifiers(references)

> Note for normalizing data user library called 'normalizer' click [here](https://github.com/paularmstrong/normalizr "normalizer link") to open

### Selectors.

When the time comes to drive the data from the store we came accross different selectors. Selectors help us to select particular data saved into our store.

```js

...

// before selector.
const unresolvedBugs = store.getState().entities.bugs.filter( bug => !bug.resolved )

// selector.
const unresolvedSelector store => store.entities.bugs.filter( bug => !bug.resolved )

const unresbugs = unresolvedSelector( store.getState() )


```

A selector is a function that takes the store or slice and returns computed state.

Naming convention: prefix with select**_
Other naming convention: posfix with _**selector
Other: get\_\_\_

### Memoization

Memoization is a technique for improving the performance of our application. used for optimizing expensive functions. Its working principle is similar to cache.

For memoization we don't have to create login by our own. Instead we can use reselect.

```bash
npm i reselect
```

```js

import { createSelector } from "reselect"

...

const unresolvedBugsSelector = createSelector(
  store => store.entities.bugs, // input
  bugs => bugs.filter( bug =>!bug.resolved ) // output
)

// can pass multiple selectors at once.
const example = createSelector(
  store => store.entities.bugs,
  store => store.entities.projects,
  (bugs, projects) => bugs.filter( bug => !bug.resolved )
)



```

## Introduction to middlewares in redux.

Middlewares are the used to run side-effects inorder to fetch data from server. They are building blocks of asynchronous programming with redux.

### What is middleware.

Analogy: middleware is like man in the middle (agent/broker) | something that sits in the middle.

By dispatching action we are actually sending them through a single entry point. on the other side of our entry point we have reducer, when we dispatch actions through this pipeline.

actions ✉ ✉ ✉ ✉ === pipeline === ⚙ rootReducer

we can add as many as middlewares attached to this pipeline, that will watch over those actions. We can add funtions to this pipeline that will get executed every time an action is dispatched.

Middleware is the piece of code that is executed after an action is dispatched and before it reaches the root reducer.

There are tons of available redux middlewares

- calling apis
- error reporting
- analytics
- authorization ...

actions ✉ ✉ ✉ ✉ === log == auth === ⚙ rootReducer

### Creating middleware.

```
redux\
  \middleware
    logger.js
```

```js
// logger.js

const logger = (store, next, action) => {};

// lets make this function curring function

const logger = (store) => (next) => (action) => {
  console.log("store: ", store);
  console.log("next: ", next);
  console.log("action: ", action);

  next(action); // call the next middleware...
};

export default logger;
```

In order to use this middleware we have to register this middleware to our redux...

```js
// configurestore.js

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";

import logger from "./middleware/logger";

export default configureStore({
  rootReducer,
  middleware: [logger],
});
```

```js
// configure.js

// configure middleware without using redux-toolkit.

import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/rootReducer";

import logger from "./middleware/logger";

const store = createStore(rootReducer, applyMiddleware(logger));
```

Apply middleware function is also called store enhancer

### Parameterizing middlewares

```js
//logger.js
const logger = (param) => (store) => (next) => (action) => {
  console.log("param", param);
  next(action); // call the next middleware...
};
```

```js

// configureStore.js
...

const store = createStore(
  rootReducer,
  applyMiddleware( logger({destination: "console"}) )
)


```

### Dispatching functions.

```js
const store = configureStore();

store.dispatch({}); // error

// here we can do interesting things...
store.dispatch(() => {
  // 1. calling APIs.
  // When a promise is resolved => dispatch()  // some action that indicated success.
  // if the promise is rejected => dispatch() // some action that indicates error
});
```

By dispatching function we can give redux the ability to call asynchronous logic. That we cann't do with the plain objects.

> Note: we can give store the ability to dispatch function by writing a middleware function.

```
redux/
  middleware/
    func.js
```

```js

// func.js

export default const func = store => next => action => {
  if ( typeof action === 'function'){
    action()
  }
  else{
    next(action)
  }
}

// ----------------------

export default const func = ({ dispatch, getState }) => next => action => {
  if ( typeof action === 'function'){
    action(dispatch, getState)
  }
  else{
    next(action)
  }
}

```

```js

// store.js

...

store.dispatch( (dispatch, getState) => {
  const loadingUserAction = { type: "LOADING_USER" }
  dispatch( loadingUserAction )

  // Call Api ... and get results...
  const results = [ {id: 1, name: 'amjad'}, {id: 2, name: 'rashid'} ]
  const saveUserAction = {
    type: "SAVE_USERS",
    payload: {
      users: result
    }
  }
  dispatch( saveUserAction )

  // if any error occurs: dispatch errorAction...
  const errorAction = { type: "ERROR_GET_USER" }
  dispatch( errorAction )

})

```

There is no need to write this middleware from scratch. you can import it from '@reduxjs-toolkit' or install it manually

```bash
npm i redux-thunk
```

```js
import { configureStore, getDefaultMiddleware } from "@reduxjs-toolkit";
import rootReducer from "./rootReducer";

import logger from "./middleware/logger";

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), logger],
});
```

```js
// middleware/error.js

const error = (store) => (next) => (action) => {
  const { type, payload } = action;
  if (type === "error")
    console.log("Tostify: Error has occured...", payload.message);
  else next(action);
};

export default error;
```

```js

// configurestore.js

// installing middleware...

import errorMiddleware from "./middleware/error"

...

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware(),
    errorMiddleware
  ]
})
```

## Calling Apis

With the thunk middleware we can dispatch functions and this allows us to execute code that couses side effects( like calling apis )

so where is the right place of middleware? answer: - in Action Creators.

```js

// actioncreator.js [NORMALLY]

function actionCreator(){
  return {
    type: "ACTION_NAME",
    payload: {
      // ...      
    }
  } 
}


// actioncreator.js [AFTER]

function actionCreator(){
  return function(dispatch, getState){
    // ...
  } 
}

// re-write... removing function syntax
const actionCreator = () => {
  return (dispatch, getState) => {

  } 
}

// re-write... removing return statement
const actionCreator = () => (dispatch, getState) => {
  // call apis.
  // resolved: dispatch(success)
  // rejected: dispatch(error)  
}
```

#### Common pattern
- Current
  - GET_BUGS_BEGIN
  - GET_BUGS_SUCCESS
  - GET_BUGS_ERROR
- Past
  - bugsRequested
  - bugsRecieved
  - bugsRequestedFailed  


> Note: The above pattern / approch is repeated boilerplate and timeconsuming. We have to write more...

### API Middleware.

```js

// middleware/api.js
const apiMiddelware = store => next => action => {

}

// after
const apiMiddleware = ({store, dispatch}) => next => action => {

}

// Our Api Action structure will generally look like this... 
const action = {
  type: "GET_BUGS_BEGIN", // ACTION-NAME
  payload: {
    url: "/bugs", // END-POINT
    method: "get", // METHOD-NAME
    data: {}, // DATA-WE-WANT-TO-PASS
    onSuccess: "GET_BUGS_SUCCESS", // SUCCESS-ACTION-NAME - will be executed on success response  
    onError: "GET_BUGS_FAILED" // FAILED-ACTION-NAME - will be executed on failed response
  }
}


// after...

const apiMiddleware = ({ dispatch }) => next => action => {
  if ( action.type !== 'apiCallBegin' )
    return next( action )

  // Don't swallow apiCallBegin action.
  next(action)

  const { url, method, data, onSuccess, onError } = action.payload
  axios.request({
    baseURL: "http://localhost:9001/api"
    url: url,
    method,
    data
  }).then( response => {

    // If every thing works well...
    dispatch( { type: onSuccess, payload: response.data } )

  }).catch( error => {

    // if encountered an error... 
    dispatch( { type: onError, payload: error } )
  })
}

// adding middleware

const store = configureStore({
  reducer: rootReducer,
  middleware: [ ...getDefaultMiddleware(), logger, apiMiddleware ]
})

// invoking middleware

store.dispatch({
  type: "apiCallBegin", // ACTION-NAME
  payload: {
    url: "/bugs", // END-POINT
    method: "get", // Default GET
    data: {}, // Optional
    onSuccess: "GET_BUGS_SUCCESS", // - will be executed on success response  
    onError: "GET_BUGS_FAILED" // - will be executed on failed response
  }
})


```

Mosh made this api middleware just to eliminate repetitive logic of dispatching actions on every action creator returning function [thunks-function]

### Action Createtor of Api Middleware

```js

// api-actions.js

import { createAction } from "@reduxjs/toolkit"

export const apiCallBegin = createAction('api/callBegin') 
export const apiCallSuccess = createAction('api/callSuccess') 
export const apiCallFailed = createAction('api/callFailed') 

// now, within apiMiddleware.js

import { apiCallBegin, apiCallSuccess, apiCallFailed } from "api-actions"

const apiMiddleware = ({dispatch, store}) => next => action => {
  if ( action.type !== apiCallBegin.type )
}

// now, when dispatching action we no longer have to use hardcoded strings... apiCallBegin

import { apiCallBegin, apiCallFailed } from "api-actions"

store.dispatch(
  apiCallBegin({
    url: "/bugs",
    method: "get",
    body: {},
    onSuccess: "GET_BUGS_SUCCESS",
    onFailed: apiCallFailed.type
  })
)
```
```js

// Success General dispatch
dispatch(apiCallSuccess({ data: response.data }))
// Specific
if (onSuccess) dispatch({ type: onSuccess, payload: response.data })


// Failure General dispatch
dispatch(apiCallFailed({ error }))
// Specific
if (onFailure) dispatch({ type: onFailure, payload: error })


```

### Restructring Store structure...
```js

const initialState = {
  list: [],
  loading: false,
  lastFetch: null // timestamp.
}

```

Using above structure we can limit api calls using implementing cashing.

> Note: Our UI layer should not have to know the url endpoints. They just have to know their mapped state in redux. eg. addBug, loadBugs ...

Inorder to avoid coupling in the system we should follow 'remote control' principle. 

## Automated Testing Redux Applications.

Automated testing is all about writing code to test our code. We can write test cases to see if our changes breaking our previous code base or not. There should be the nice blance between automated testing and manual testing. In every software development team there is always atleast one manual testing team member.

- Automated Testing Types
  - Unit Tests.
  - Integration Tests.
  - End to End Tests.

#### Unit testing.
Test the application without its external dependencies or resources ... excluding: databases, files, web-services. In order to test with dependencies we should mock the behaviour of our external resources.

Testing paramid
    
    /\      <- user acptance tests
   /--\     <- end 2 end tests  
  /----\    <- system tests
 /------\   <- integration tests
/--------\  <- unit tests

A unit may be single or multiple object, some people argues that if it touches other components then it is an integration test.

---

## REFERENCES

- You-might-not-need-redux [click here](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367 "You Might not need redux") to read.

---

