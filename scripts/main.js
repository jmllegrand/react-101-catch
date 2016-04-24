/**
 * Created by jmlegrand on 23/04/16.
 */

var React = require('react');
var ReactDOM = require('react-dom');


var App = React.createClass({
  render: function () {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header/>
        </div>
        <Order/>
        <Inventory/>
      </div>
    )
  }
});


var Header = React.createClass({
  render: function () {
    return (
      <div>
        <p>This is the Header component</p>
      </div>
    )
  }
});

var Order = React.createClass({
  render: function () {
    return (
      <div>
        <p>This is the Order component</p>
      </div>
    )
  }
});

var Inventory = React.createClass({
  render: function () {
    return (
      <div>
        <p>This is the Inventory component</p>
      </div>
    )
  }
});

var StorePicker = React.createClass({
  render: function () {
    var name = "JM";
    return (
      <form className="store-selector">
        {/* comment goes in it */}
        <h2>{name}, please enter a store ID</h2>
        <input type="text" ref="storeId" required/>
        <input type="Submit"/>
      </form>
    )
  }
});


ReactDOM.render(<App/>, document.querySelector('#main'));

