/**
 * Created by jmlegrand on 03/05/16.
 */

import React from 'react';
import Rebase from 're-base';
import Catalyst from 'react-catalyst';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

var Base = Rebase.createClass('https://jml-catch-of-the-day.firebaseio.com/');
var fishesDatas = require('../sample-fishes');


export default React.createClass({
  mixins: [Catalyst.LinkedStateMixin],
  getInitialState: function () {
    console.log("JM - App.getInitialState()");
    return {
      fishes: [],
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
      <Fish
        key={key} index={key}
        details={this.state.fishes[key]}
        addFishToOrderState={this.addFishToOrderState}/>
    )
  },
  loadSampleFishes: function () {
    this.setState({
      fishes: fishesDatas
    });
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
    if (confirm('Are you sure you want to remove the fish')) {
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
          removeFishFromOrderState={this.removeFishFromOrderState}
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