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
import fishesDatas from '../sample-fishes';
import reactMixins from 'react-mixin';
import autobind from 'autobind-decorator';

var Base = Rebase.createClass('https://jml-catch-of-the-day.firebaseio.com/');

@autobind
class App extends React.Component {

  constructor() {
    console.log("JM - App.constructor()");
    super();
    this.state = {
      fishes: [],
      order: {}
    }
  }

  componentDidMount() {
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
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("JM - App.componentWillUpdate()");
    console.log(JSON.stringify(nextState));
    localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
  }

  renderFish(key) {
    return (
      <Fish
        key={key} index={key}
        details={this.state.fishes[key]}
        addFishToOrderState={this.addFishToOrderState}/>
    )
  }

  loadSampleFishes() {
    this.setState({
      fishes: fishesDatas
    });
  }

  addFishToFishesState(fish) {
    var timestamp = (new Date()).getTime();
    // update the state object
    this.state.fishes['fish-' + timestamp] = fish;
    // set the state
    this.setState({
      fishes: this.state.fishes
    });
  }

  removeFishFromFishesState(key) {
    if (confirm('Are you sure you want to remove the fish')) {
      // update the state object
      delete this.state.fishes[key];
      // trigger the re-render
      this.setState({
        fishes: this.state.fishes
      });
    }
  }

  addFishToOrderState(key) {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    // required to update html
    this.setState({
      order: this.state.order
    });
  }

  removeFishFromOrderState(key) {
    delete this.state.order[key];
    // required to update html
    this.setState({
      order: this.state.order
    });
  }

  render() {
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
          linkState={this.linkState.bind(this)}
          fishes={this.state.fishes}
          addFish={this.addFishToFishesState}
          loadSampleFishes={this.loadSampleFishes}/>
      </div>
    )
  }
}

reactMixins.onClass(App, Catalyst.LinkedStateMixin);


export default App;