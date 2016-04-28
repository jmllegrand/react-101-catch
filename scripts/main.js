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
var fishes = require('./sample-fishes');

var App = React.createClass({
  getInitialState:function() {
    return {
      fishes: {},
      order: {}
    }
  },
  addFish : function(fish) {
    var timestamp = (new Date()).getTime();
    // update the state object
    this.state.fishes['fish-'+ timestamp] = fish;
    // set the state
    this.setState({fishes: this.state.fishes});
  },
  render: function () {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
        </div>
        <Order/>
        <Inventory addFish = {this.addFish} />
      </div>
    )
  }
});

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
  },
  render: function() {
    console.log('AddFishForm.render()');
    return (
      <form className="fish-edit" ref="fishForm" onSubmit={this.addFish}>
        <input type="text" ref="name" placeholder="Fish Name"  />
        <input type="text" ref="price" placeholder="Fish Price"  />
        <select ref="status">
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Description"  />
        <input type="text" ref="url" placeholder="URL to image"  />
        <button type="submit" > Add Item </button>
      </form>
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
  loadSampleFishes: function() {
    console.log('Inventory.loadSampleFishes()');
    console.log("fishes length", fishes.length);
    for (var fish in fishes) {
      console.log("fishes" + fish + " = " + JSON.stringify(fishes[fish]));
      this.props.addFish(fishes[fish]);
    }
  },
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

var StorePicker = React.createClass({
  handleSubmit: function(event) {
    console.log('in handleSubmit()');
    console.log('this', this);
    event.preventDefault();

    // get the data from the input
    var storeId = this.refs.storeId.value;

    // transition from StorePicker to App
    browserHistory.push('/store/' + storeId);
  },
  render: function () {
    var name = "JM";
    return (
      <form className="store-selector" onSubmit={this.handleSubmit}>
        {/* comment goes in it */}
        <h2>{name}, please enter a store ID</h2>
        <input type="text" ref="storeId" defaultValue={utils.getFunName()} required/>
        <input type="Submit" />
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

