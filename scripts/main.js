/**
 * Created by jmlegrand on 23/04/16.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;
var Rebase = require('re-base');
var Base = Rebase.createClass('https://jml-catch-of-the-day.firebaseio.com/');
var Catalyst = require('react-catalyst');


var utils = require('./helpers');
var fishesDatas = require('./sample-fishes');

var App = React.createClass({
  mixins: [Catalyst.LinkedStateMixin],
  getInitialState: function () {
    console.log("JM - App.getInitialState()");
    return {
      fishes: {},
      order: {}
    }
  },
  componentDidMount: function () {
    console.log("JM - App.componentDidMount()");
    Base.syncState(this.props.params.storeId + '/fishes', {
      context: this,
      state: 'fishes',
      asArray: true
    });

    var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);
    if (localStorageRef) {
      // need to update the state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  },
  componentWillUpdate: function (nextProps, nextState) {
    console.log("JM - App.componentWillUpdate()");
    console.log(JSON.stringify(nextState));
    localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
  },
  renderFish: function (key) {
    return (
      <Fish key={key} index={key} details={this.state.fishes[key]} addFishToOrderState={this.addFishToOrderState}/>
    )
  },
  loadSampleFishes: function () {
    this.setState({fishes: fishesDatas});
  },
  addFishToFishesState: function (fish) {
    var timestamp = (new Date()).getTime();
    // update the state object
    this.state.fishes['fish-' + timestamp] = fish;
    // set the state
    this.setState({
      fishes: this.state.fishes
    });
  },
  removeFishFromFishesState: function (key) {
    if(confirm('Are you sure you want to remove the fish')) {
      // update the state object
      delete this.state.fishes[key];
      // trigger the re-render
      this.setState({
        fishes: this.state.fishes
      });
    }
  },
  addFishToOrderState: function (key) {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    // required to update html
    this.setState({
      order: this.state.order
    });
  },
  removeFishFromOrderState: function (key) {
    delete this.state.order[key];
    // required to update html
    this.setState({
      order: this.state.order
    });
  },
  render: function () {
    console.log('JM - App.render()');
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <h6>this is the list of the fishes loaded</h6>
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          orderItems={this.state.order}
          removeFishFromOrderState = {this.removeFishFromOrderState}
        />
        <Inventory
          removeFishFromFishesState={this.removeFishFromFishesState}
          linkState={this.linkState}
          fishes={this.state.fishes}
          addFish={this.addFishToFishesState}
          loadSampleFishes={this.loadSampleFishes}/>
      </div>
    )
  }
});

var Fish = React.createClass({

  onClickAddToOrderEvent: function () {
    this.props.addFishToOrderState(this.props.index);
  },
  render: function () {
    console.log('JM - Fish.render()');
    var details = this.props.details;
    var isAvailable = details.status === 'available' ? true : false;
    var btnText = isAvailable ? 'Add To Order' : 'Sold Out!';
    return (
      <li className="menu-fish">
        <img src={details.image} alt=""/>
        <h3 className="fish-name">
          {details.name}
          <span className="price">{utils.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={this.onClickAddToOrderEvent}>{btnText}</button>
      </li>
    )
  }
});

var AddFishForm = React.createClass({
  addFish: function (event) {
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
    console.log('JM - fish', JSON.stringify(fish));

    // 3- Add the fish to the application state (the tricky part)
    // not concerned about the state of the AddFishForm but the state of the application
    // how to get the data from AddFishForm to Inventory to App
    this.props.addFishToFishesState(fish);
    this.refs.fishForm.reset();
  },
  render: function () {
    console.log('JM - AddFishForm.render()');
    return (
      <form className="fish-edit" ref="fishForm" onSubmit={this.addFish}>
        <input type="text" ref="name" placeholder="Fish Name"/>
        <input type="text" ref="price" placeholder="Fish Price"/>
        <select ref="status">
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Description"/>
        <input type="text" ref="url" placeholder="URL to image"/>
        <button type="submit"> Add Item</button>
      </form>
    )
  }
});

var Header = React.createClass({
  render: function () {
    console.log('JM - Header.render()');
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
  displayOrderItem: function (item) {
    var orderItems = this.props.orderItems;
    var fishes = this.props.fishes;
    var removeButton = <button onClick={this.props.removeFishFromOrderState.bind(null, item)}>&times</button>;

    // TODO 1: externalize the component when available
    // TODO 2: create a component 'sorry fish no longer available'
    return (
      <li key={item} index={item}>
        <span>{orderItems[item]} lb(s)</span>
        <span>{fishes[item].name}</span>
        <span className="price">{utils.formatPrice(orderItems[item] * fishes[item].price)}</span>
        {removeButton}
      </li>
    )
  },
  render: function () {

    var ordersId = Object.keys(this.props.orderItems);
    var orderItems = this.props.orderItems;
    var fishes = this.props.fishes;

    var totalAmount;

    //TODO: handle the 0 & 1 situations within the reduce()
    if (ordersId.length === 0) {
      totalAmount = 0
    } else if (ordersId.length === 1) {
      totalAmount = orderItems[ordersId[0]] * fishes[ordersId[0]].price
    } else if (ordersId.length > 1) {
      totalAmount = ordersId.reduce(function (previousValue, currentValue) {
        return (previousValue + orderItems[currentValue] * fishes[currentValue].price);
      }, 0);
    }
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {ordersId.map(this.displayOrderItem)}
          <li className="total">
            <strong>Total:</strong>
            {utils.formatPrice(totalAmount)}
          </li>
        </ul>
      </div>
    )
  }
});

var Inventory = React.createClass({
  renderEditFishForm: function (key) {
    return <FishEditForm
      removeFishFromFishesState={this.props.removeFishFromFishesState}
      linkState={this.props.linkState}
      key={key} index={key}
      fishes={this.props.fishes}/>
  },
  render: function () {
    console.log('JM - Inventory.render()');
    return (
      <div>
        <h2>Inventory</h2>
        <ul className="list-of-fishes">
          {Object.keys(this.props.fishes).map(this.renderEditFishForm)}
        </ul>
        <AddFishForm addFish={this.props.addFishToFishesState}/>
        <button onClick={this.props.loadSampleFishes}>Load Sample fishes !</button>
      </div>
    )
  }
});


var FishEditForm = React.createClass({
  removeFish: function () {
    console.log('JM - FishEditForm.removeFish()');
    this.props.removeFishFromFishesState(this.props.index);
  },
  render: function () {
    console.log('JM - FishEditForm.render()');
    return (
      <form className="fish-edit" ref="fishForm">
        <input type="text" valueLink={this.props.linkState('fishes.' + this.props.index + '.name')}/>
        <input type="text" valueLink={this.props.linkState('fishes.' + this.props.index + '.price')}/>
        <select valueLink={this.props.linkState('fishes.' + this.props.index + '.status')}>
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea type="text" valueLink={this.props.linkState('fishes.' + this.props.index + '.desc')}/>
        <input type="text" valueLink={this.props.linkState('fishes.' + this.props.index + '.image')}/>
        <button type="button" onClick={this.props.removeFishFromFishesState.bind(null, this.props.index)}> Remove Fish</button>
      </form>
    )
  }
});


var StorePicker = React.createClass({
  handleSubmit: function (event) {
    console.log('JM - StorePicker.handleSubmit()');
    event.preventDefault();

    // get the data from the input
    var storeId = this.refs.storeId.value;

    // transition from StorePicker to App
    browserHistory.push('/store/' + storeId);
  },
  render: function () {
    console.log('JM - StorePicker.render()');
    var name = "JM";
    return (
      <form className="store-selector" onSubmit={this.handleSubmit}>
        {/* comment goes in it */}
        <h2>{name}, please enter a store ID</h2>
        <input type="text" ref="storeId" defaultValue={utils.getFunName()} required/>
        <input type="Submit"/>
      </form>
    )
  }
});

var NotFound = React.createClass({
  render: function () {
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

