/**
 * Created by jmlegrand on 03/05/16.
 */

import React from 'react';

export default React.createClass({
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
  },
  propTypes: {
    tagline: React.PropTypes.string.isRequired
  }
});
