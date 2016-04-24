/**
 * Created by jmlegrand on 23/04/16.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var StorePicker = React.createClass({
  render : function() {
    var name = "JM";
    return (
      <form className="store-selector">
        {/* comment goes in it */}
        <h2>{name}, please enter a store ID</h2>
        <input type="text" ref="storeId" required/>
        <input type="Submit" />
      </form>
    )
  }
});


ReactDOM.render(<StorePicker/>, document.querySelector('#main'));

