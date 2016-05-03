/**
 * Created by jmlegrand on 03/05/16.
 */

import React from 'react';


export default React.createClass({
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
  },
  propTypes: {
    //addFishToFishesState: React.PropTypes.func.isRequired
  }
});
