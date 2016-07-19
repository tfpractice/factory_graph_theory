var Node = require('./node');
var RobustArray = require('./robust_array_factory');

/**
 * Constructs the NodeArray crom dependencies
 * @param  {Function} NodeClass dpeendency
 * @return {Function}           The resulting NodeArray
 */
module.exports = function(NodeClass) {
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