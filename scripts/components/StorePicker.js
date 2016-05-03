/**
 * Created by jmlegrand on 03/05/16.
 */


import React from 'react';
import {browserHistory} from 'react-router';
import utils from '../helpers';


export default  React.createClass({
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