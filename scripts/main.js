/**
 * Created by jmlegrand on 23/04/16.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;

var utils = require('./helpers');

var App = React.createClass({
  render: function () {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
        </div>
        <Order/>
        <Inventory/>
      </div>
    )
  }
});


var Header = React.createClass({
  render: function () {
    console.log('Header.render()');
    console.log('this', this);
    console.log('this.props', this.props);
    return (
      <header className="top">
        <h1> Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day
         </h1>
        <h3 className="tagline">
          <span>{this.props.tagline}</span>
        </h3>
      </header>
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
        <input type="text" defaultValue={utils.getFunName()} required/>
        <input type="Submit"/>
      </form>
    )
  }
});

var NotFound = React.createClass({
  render: function() {
    return (
      <h1>Not found! </h1>
    )
  }
});

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={StorePicker}/>
    <Route path="/store/:storeId" component={App}/>
    <Route path="*" component={NotFound}/>
  </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));

