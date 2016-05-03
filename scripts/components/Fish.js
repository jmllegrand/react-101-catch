/**
 * Created by jmlegrand on 03/05/16.
 */


import React from 'react';
import utils from '../helpers';

export default React.createClass({

  onClickAddToOrderEvent: function () {
    this.props.addFishToOrderState(this.props.index);
  },
  render: function () {
    console.log('JM - Fish.render()');
    var details = this.props.details;
    var isAvailable = details.status === 'available';
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
  },
  propTypes: {
    index: React.PropTypes.string.isRequired,
    details: React.PropTypes.object.isRequired,
    addFishToOrderState: React.PropTypes.func.isRequired
  }
});
