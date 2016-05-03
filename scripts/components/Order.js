/**
 * Created by jmlegrand on 03/05/16.
 */

import React from 'react';
import utils from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';


export default React.createClass({
  displayOrderItem: function (item) {
    var orderItems = this.props.orderItems;
    var fishes = this.props.fishes;
    var removeButton = <button onClick={this.props.removeFishFromOrderState.bind(null, item)}>&times;</button>;

    // TODO 1: externalize the component when available
    // TODO 2: create a component 'sorry fish no longer available'
    return (
      <li key={item} index={item}>
        <span>
          <CSSTransitionGroup
            component="span"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}>
            <span key={orderItems[item]}> {orderItems[item]} </span>
          </CSSTransitionGroup>
          <span> lb(s) {fishes[item].name} {removeButton}</span>
        </span>
        <span className="price">{utils.formatPrice(orderItems[item] * fishes[item].price)}</span>
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
        <h2 className="order-title">Your Order</h2>
        <CSSTransitionGroup
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {ordersId.map(this.displayOrderItem)}
          <li className="total">
            <strong>Total:</strong>
            {utils.formatPrice(totalAmount)}
          </li>
        </CSSTransitionGroup>
      </div>
    )
  },
  propTypes: {
    fishes: React.PropTypes.array.isRequired,
    orderItems: React.PropTypes.object.isRequired,
    removeFishFromOrderState: React.PropTypes.func.isRequired
  }
});