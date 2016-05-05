/**
 * Created by jmlegrand on 03/05/16.
 */

import React from 'react';
import AddFishForm from './AddFishForm';
import FishEditForm from './FishEditForm';
import autobind from 'autobind-decorator';


class Inventory extends React.Component {
  @autobind
  renderEditFishForm(key) {
    return <FishEditForm
      removeFishFromFishesState={this.props.removeFishFromFishesState}
      linkState={this.props.linkState}
      key={key} index={key}
      fishes={this.props.fishes}/>
  }

  render() {
    console.log('JM - Inventory.render()');
    return (
      <div>
        <h2>Inventory</h2>
        <ul className="list-of-fishes">
          {Object.keys(this.props.fishes).map(this.renderEditFishForm)}
        </ul>
        <AddFishForm addFishToFishesState={this.props.addFishToFishesState}/>
        <button onClick={this.props.loadSampleFishes}>Load Sample fishes !</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  removeFishFromFishesState: React.PropTypes.func.isRequired,
  linkState: React.PropTypes.func.isRequired,
  fishes: React.PropTypes.array.isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSampleFishes: React.PropTypes.func.isRequired
};

export default Inventory;
