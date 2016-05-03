
#### Session 1
Build system using gulp 

2 choices

- webpack
- browserify via gulp

babel

- transpile jsx into regular js (to write html in js)
- transpile es6 into es5


#### Session 2

react: approach close to web components 

everything in react is a component

a component has:

- state
- props

virtual DOM : anytime you change the data associated to component, it immedially refresh the dom wo 
reloading the whole page



#### Session 3

react first component using 

- React.createClass
```
var StorePicker = React.createClass({
  render : function() {
    return (
      <p>hello</p>
    )
  }
});
```

- ReactDOM to decouple the specifics browser (& the manipulation of the DOM) from the react library

```
ReactDOM.render(<StorePicker/>, document.querySelector('#main'));
```


#### Sessions 4 & 5
Create react components (with static content)

##### JSX syntax
```
  render : function() {
    return (
      <p>hello</p>
    )
  }
```

##### is equivalent in JS into 
```
  render : function() {
    return React.createElement('p', 'hello');
  }
```
Create application layout 

##### Tips & Good practices 

- Adjacent JSX elements must be wrapped in an enclosing tag 

```
  render: function () {
    return (
      <form className="store-selector">
        <input type="text" ref="storeId" required/>
        <input type="Submit"/>
      </form>
    )
  }
  ```
  
- Have expected corresponding JSX closing tag for <input> 
- Use className instead of class in JSX
```
    <form className="store-selector">
```
- Use required to specify the field is mandatory 
```
   <input type="text" ref="storeId" required/>
```

- Use of variable name in the component (interpolation)
```
  render : function() {
    var name = "JM";
    return (
      <form className="store-selector">
        <h2>{name}, please enter a store ID</h2>
      </form>
    )
  }
```

- Use of comments in JSX
```
  render : function() {
    return (
      <form className="store-selector">
        {/* comment goes in it */}
        <input type="text" ref="storeId" required/>
        <input type="Submit" />
      </form>
    )
  }
```

#### Session 6
To create the component dynamic, use of  props

Props are equivalent to attributes in html tags elements

- To define the props
```
  render: function () {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
        </div>
      </div>
    )
  }
```

- To acesss the props
```
var Header = React.createClass({
  render: function () {
    return (
      <div>
        <p>Welcome to {this.props.tagline}</p>
      </div>
    )
  }
});
```

*this* refers to the constructor, ie the Header function
*this.props* is an object referring to all the props defined for the given component
```
{
    tagline: "Fresh Seafood Market"
}
```
To come: 

- *spread* is a technique used to pass all the properties from a parent level to the child components
- *proptype* is a technique to validate the properties are of the right types


#### Session 7: Routing

Use case : 

- when hitting http://localhost:3000/, display StorePicker
- when hitting http://localhost:3000/store/storeName, display App dedicated to the storeName (wo page reload)
- when hitting 404 url, display a 404 page

Expectations: routing is done in client side 

react-router is the industry standard


Components needed from react-router
- Router
- Route
- Navigation : allows us to change the url wo reloading the page 

You declare Routes with JSX

You supply each Route 

- with a path that should matched
- the component that should be displayed when the path is matched 
```
    <Route path="/" component={StorePicker}/>
```
##### Notes

*Notion of ?_k in the url*

react-router is trying to maintain state to let the user use the back & forward button. 
Technically, we are not changing the page but only the url
```
http://localhost:3000/#/?_k=ofeyrj
```
*Notion of push state*
Regarding the hash #, all the browsers don't support push state. It lets update the URL bar wo reloading the page


#### Session 8: Utility

To get utility function

```
var utils = require('./helpers');
```

##### Tips & Good practices

- Avoid using value for a mutable field 

Bad
```
<input type="text" value={utils.getFunName()} required/>
```

Good
```
<input type="text" defaultValue={utils.getFunName()} required/>
```

- any use of curly bracket in JSX will run a Javascript expressions
```
<input type="text" defaultValue={utils.getFunName()} required/>
```

- to execute tests via npm

```
npm test
```

- to execute tests via gulp 
```
gulp test
```


#### Session 9: Events

Specifics about react: you handle events inline 

Use case: when a user click on the Submit of the StorePicker 

- Define the event watched
```
  render: function () {
    var name = "JM";
    return (
      <form className="store-selector" onSubmit={this.handleSubmit}>
        <h2>{name}, please enter a store ID</h2>
        <input type="text" defaultValue={utils.getFunName()} required/>
        <input type="Submit" />
      </form>
    )
   
```

*this* refers to the component


- Implement the event

```
  handleSubmit: function() {
    console.log('in handleSubmit()');
  }
```


- Get data from the input (need to get out of the DOM!)

We need to add the ref attribute on the input to reference the input anywhere in the component

```
      <form className="store-selector" onSubmit={this.handleSubmit}>
        <input type="text" ref="storeId" defaultValue={utils.getFunName()} required/>
        <input type="Submit" />
      </form>
```

To access the data, we use this.refs

```
    //get the data from the input
    var storeId = this.refs.storeId.value;
    
```


Use case: programatically, force the change of the url


##### Tips & Good practices

For a form, by default, it reloads the page 

To avoid this behavior, we need to prevent the form from being submitting
```
  handleSubmit: function(event) {
    event.preventDefault();
    console.log('in handleSubmit()');
  }
```

#### Session 10 : State

State is a fundamental concept in react (and all the fwks)

- a representation of the components data, the master copy of the data 
- in react, all the data is stored in an object not in html/dom (like jquery)

The approach is the opposite: you don't modify the dom to change the description of a given item. 
Instead, the state object changed. react will update to the change done
whenever there is a reference to the state in the application, it will be automatically updated


State for the application

- Order 
- List of fishes

Use Cases: 

- Add a fish object to the state 
- Display the contents of the state (list of fish)


##### Add an object to the state 

The state is defined at the root application level (App level)
We need a initial state (a blank object) on which we will add to it
```
var App = React.createClass({
  getInitialState:function() {
    return {
      fishes: {},
      order: {}
    }
});
```

It will run getInitialState() before the component is created


We need a function addFish() to update the state
```
  addFish : function(fish) {
    var timestamp = (new Date()).getTime();
    // update the state object
    this.state.fishes['fish-'+ timestamp] = fish;
    // set the state
    this.setState({fishes: this.state.fishes});
  }
 ```
 This updates the state object. It is NOT sufficient for react to re-render the components
 
 
```
this.state.fishes['fish-'+ timestamp] = fish;

```
This will do the job, passing only the part of the object that has changed. You don't want to pass the 
entire state.
setState() is the primary method you use to trigger UI updates from event handlers and server request callbacks.
```
this.setState({fishes: this.state.fishes});
```

To invoke the addFish(), this will not work 

```
    App.addFish(fish);
```
To access addFish() defined in the App, we use props passing the method from its parents (App) to its children 
(Inventory and AddFishForm)


At the App level, addFish is declared as a props
```
var App = React.createClass({
  getInitialState:function() {
  },
  addFish : function(fish) {
  },
  render: function () {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
        </div>
        <Order/>
        *<Inventory addFish = {this.addFish} />*
      </div>
    )
  }
});
```

At the Inventory level, addFish is (again) declared as a props

```
var Inventory = React.createClass({
  render: function () {
    return (
      <div>
        <h2>Inventory</h2>
        <AddFishForm addFish = {this.props.addFish} ></AddFishForm>
      </div>
    )
  }
});
```
At the AddFishForm, we invoke the function

```
var AddFishForm = React.createClass({
  addFish: function(event) {
    console.log('AddFishForm.addFish()');

    // 1- stop the form from submitting
    event.preventDefault();

    // 2- Take the data from the form and create an object
    var fish = {
      name: this.refs.name.value,
      price: this.refs.price.value,
      status: this.refs.status.value,
      desc: this.refs.desc.value,
      url: this.refs.url.value
    };
    console.log('fish', JSON.stringify(fish));

    // 3- Add the fish to the application state (the tricky part)
    // not concerned about the state of the AddFishForm but the state of the application
    // how to get the data from AddFishForm to Inventory to App
    this.props.addFish(fish);
    this.refs.fishForm.reset();
  }
    
```

Note that is there are N functions properties to be passed from one to 3-4 levels in the components hierarchy,
you can use *spread*

```
var Inventory = React.createClass({
  render: function () {
    return (
      <div>
        <h2>Inventory</h2>
        <AddFishForm addFish = {...this.props} ></AddFishForm>
      </div>
    )
  }
});
```
##### Tips & Good practices (form)
To reset a form, use reset()
```
    this.refs.fishForm.reset();
```


#### Session 11 : Loading data
 
 USe Case: load data in the state based on the action of a button
 
 
 Create a button with the onClick handler
 
 ```
 var Inventory = React.createClass({
   render: function () {
     return (
       <div>
         <h2>Inventory</h2>
         <AddFishForm addFish = {this.props.addFish} ></AddFishForm>
         <button onClick={this.loadSampleFishes}>Load Sample fishes !</button>
       </div>
     )
   }
 });
 
 ```
Implement loadSampleFishes()

 ```
    loadSampleFishes: function() {
      console.log('Inventory.loadSampleFishes()');
      for (var fish in fishes) {
        console.log("fishes." + fish + " = " + JSON.stringify(fishes[fish]));
        this.props.addFish(fishes[fish]);
      }
    }
   
 ```
 
 A better approach would be to directly invoke setState() at the App level
```
  loadSampleFishes : function() {
    this.setState({
        fishes: require('./sample-fishes')
    });
  }
 ```
 
This would required to pass loadSampleFishes() at App level via props 

- at Inventory level 
- at AddFishForm level



#### Session 12 : Display data from the state

  
To loop over a list of items, jsx has no equivalent of ng-repeat a-la-angular but plain with using map()
In our case, we have an object with properties
We use Object.keys() to return an array of the object's properties
```
 <ul className="list-of-fishes">
  {Object.keys(this.state.fishes)}
 </ul>
```
From the arrray of keys, we will use map() to get an arrays of components
```
<ul className="list-of-fishes">
  {Object.keys(this.state.fishes).map(this.renderFish)}
</ul>
```

```
renderFish: function(key) {
 return (
   <li>welcome {key} </li>
 )
}
```
A Fish component will be created to respect the modular approach 
```
  renderFish: function (key) {
    return (
      <Fish key={key} index={key} details={this.state.fishes[key]}/>
    )
  }
```

##### Tips & Good practices (for list)
Whenever you are rendering a component in react, you need to pass a unique key property.
The index property is required since you can't access the key property inside the component.


You need to self close the img dedicated react element
```
 <img src={details.image} alt="" />
```

To simplify templating, you should create object 

```
var details = this.props.details;
```

You can to refer to it in the template
```
      <li className="menu-fish">
        <img src={details.image} alt="" />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{utils.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
      </li>
    )
  }
});
```


#### Session 13 : Add a element (Fish reference) to a state property (Order)

The same mechanism are used 

- a event is triggered from an event handler

```
   <button disabled={!isAvailable} onClick={this.onClickAddToOrderEvent}>{btnText}</button>
```
- Definition of the event handler in the component itself
```
  onClickAddToOrderEvent: function() {
    this.props.addFishToOrderState(this.props.index);
  }
```  
- addFishToOrderState() has be defined at App level. The method is *exposed* to child components trough props

```
  renderFish: function (key) {
    return (
      <Fish key={key} index={key} details={this.state.fishes[key]} addFishToOrderState ={this.addFishToOrderState}/>
    )
  },
```  
 

##### Tips & Good practices (vanilla js)
If this.state.order[key] is undefined, the foloowing expressin wil result in a NaN
```
this.state.order[key] = this.state.order[key] + 1 || 1 ;
```

The fix is the following 
```
this.state.order[key] = this.state.order[key] + 1 || 1 ;
```

#### Session 14 : Display a element (Fish reference) from a state property (Order)
TODO

#### Session 15 : Using firebase to persist data


Use cases:
- Save & fetch data
- Update components data based on changes done on the backend

Firebase (from google) features:

- store data in the cloud
- handle authentification / security
- easy to use to sync react single state object with firebase object  
- using web-socket combined with pub/sub model


Tooling 

- the standard default firebase tool is reactFire, not the best option when working with the flux pattern
- Re-base (https://github.com/tylermcginnis/re-base) you only have to manage the state changes and re-base will handle the rest on firebase 


To make it works (asssuming the library has been loaded)


- define a reference to the firebase database

```
var base = Rebase.createClass('https://jml-catch-of-the-day.firebaseio.com/');

```

- sync the firebase database with the state fishes in the App component using syncState()
```
  componentDidMount: function() {
    console.log("JM - App.componentDidMount()");
    base.syncState(this.props.params.storeId + 'fishes', {
      context: this,
      state: 'fishes',
      asArray: true
    });
  },
```
If anyone od the 2 changes, the other will get updated

##### Tips & Good practices (react lifecycle)

React lifecycle methods, "various methods executed at specific points in a component's lifecycle"

componentDidMount() is "invoked once, only on the client (not on the server), immediately after the initial rendering occurs"

This is the sequence of actions once the user clicks on the submit of the storePicker
```
JM - StorePicker.handleSubmit()
JM - App.getInitialState()
JM - Header.render()
JM - AddFishForm.render()
JM - App.componentDidMount()
```

##### Tips & Good practices (react router)

The parameter of the url passed is available in props
```
this.props.params.storeId
```

#### Session 16 : Using localstorage to persist data
localStorage can be an option to persist data tied to a user

Use case: 
1) - any time the order is updated, the localStorage will be updated
2) - bring localStorage content to the components when reloading the page

For 1), we will used componentWillUpdate(), a method "invoked immediately before rendering when new props or state are being received"

For 2), we use componentDidMount()

##### Tips & Good practices (local storage)

by default, localStorage i sbasic: you can only store string data
```
orderlong-jealous-knives	[object Object]
```
You need to use JSON.stringify
```
    localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
```

This will result in the following
```
order-long-jealous-knives {"1":1,"3":2,"5":1}
```


#### Session 17 : bidirectionnal data flow using react catalyst

by default, react is one way: you can only edit the state ; when the state changes, the components update

you usually don't do bidirectionnal data management. IN the context of an inventory management sstem, it is useful
 
Tool provided by react:  

-linkState

Limitation : it only works at the top level of the state object 

- React Catalyst supports for deep path-based state access.
                
Use of mixins (an array)


#### Session 18 : Update & Delete state items

 CRUD (Create / Read / Update / Delete) Principle
 
 Last Use Case to cover: 
 
 - Delete a fish
 - Delete a item from the Order
 

##### Tips & Good practices (form)

Approach 1 - classical
Define the event hadler 
```
        <button type="button" onClick={this.removeFish}> Remove Fish</button>
```
Create the implementation that invoke a function pass through props from App to Inventory to FishEditForm
```
  removeFish: function () {
    console.log('JM - FishEditForm.removeFish()');
    this.props.removeFishToFishesState(this.props.index);
  }
```  

Approach 2 - classical

Directly invoke the function on the event handler
```
        <button type="button" onClick={this.props.removeFishToFishesState.bind(null, this.props.index)}> Remove Fish</button>
```

##### Tips & Good practices (form)

To avoid a page reload when using the onClick event handler, you need to pass *button* as the type

```
        <button type="button" onClick={this.removeFish}> Remove Fish</button>
```

The default value of "type" for a button is "submit", which self posts the form in your case and makes 
it look like a refresh.
            
#### Session 19 : CSS & Animation

use of stylus, equivalent to SAAS wo coluns & semi colons


#### Session 20 : proptypes

Proptypes are validation for the resilient components

It validates any property type

To ensure that the user of the component will use string tor the tagline (and not number nor function)
```
           <Header tagline="Fresh Seafood Market"/>
```
we define the following propTypes
```
  propTypes : {
    tagline: React.PropTypes.string.isRequired
  }
```

If no tagline is provided, the following error is shown

```
Failed propType: Required prop `tagline` was not specified in `Header`. Check the render method of `App`.
```


##### Tips & Good practices (react)

For any prop created at a component, have the corresponding propType
