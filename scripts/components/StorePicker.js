/**
 * Created by jmlegrand on 03/05/16.
 */


import React from 'react';
import {browserHistory} from 'react-router';
import utils from '../helpers';
import autobind from 'autobind-decorator'


class StorePicker extends React.Component {
  @autobind
  handleSubmit(event) {
    console.log('JM - StorePicker.handleSubmit()');
    event.preventDefault();

    console.log('JM - This in handleSubmit() ', this);
    // get the data from the input
    var storeId = this.refs.storeId.value;

    // transition from StorePicker to App
    browserHistory.push('/store/' + storeId);
  }

  render() {
    console.log('JM - StorePicker.render()');
    console.log('JM - This in render() ', this);
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
}

export default StorePicker;