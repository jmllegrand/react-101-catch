
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


#### Session 4
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

*Good practices* : 

- Adjacent JSX elements must be wrapped in an enclosing tag 
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

- Use of commments in JSX
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