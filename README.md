
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
 
This would required to make public the loadSampleFishes at App level 

- at Inventory level 
- at AddFishForm level