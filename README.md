
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
