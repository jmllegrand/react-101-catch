/**
 * Created by jmlegrand on 03/05/16.
 */

import React from 'react';
import autobind from 'autobind-decorator';


class FishEditForm extends React.Component {
  @autobind
  removeFish() {
    console.log('JM - FishEditForm.removeFish()');
    this.props.removeFishFromFishesState(this.props.index);
  }

  render() {
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
        <button type="button" onClick={this.props.removeFishFromFishesState.bind(null, this.props.index)}> Remove Fish
        </button>
      </form>
    )
  }
}

export default FishEditForm;