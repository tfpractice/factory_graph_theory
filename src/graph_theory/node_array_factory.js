var Node = require('./node');
var RobustArray = require('./robust_array_factory');

/**
 * Constructs [A NodeArray Class]{@link module:GraphTheory.NodeArray} by dependencies
 * @memberOf! module:GraphTheory
 * @param  {Function} NodeClass      [The Node Class]{@link module:GraphTheory.Node}
 * @return {Function}                [The resulting NodeArray Class]{@link module:GraphTheory.NodeArray}
 */
function NodeArrayFactory(NodeClass) {
    let Node = NodeClass;
    /**
     * represents a set of Nodes
     * @exports NodeArray
     * @constructor
     * @extends {RobustArray}
     * @memberOf! module:GraphTheory
     */
    class NodeArray extends RobustArray.SetifyType(Node) {}

    /**
     * [A NodeArray]{@link module:GraphTheory.NodeArray}
     * @typedef {module:GraphTheory.NodeArray} NodeArray
     */
    return NodeArray;
}
/**
 * [An NodeArrayFactory]{@link module:GraphTheory.NodeArrayFactory}
 * @typedef {module:GraphTheory.NodeArrayFactory} NodeArrayFactory
 * @exports NodeArrayFactory
 */
module.exports = NodeArrayFactory;