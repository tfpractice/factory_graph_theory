var Node = require('./node');
var RobustArray = require('./robust_array_factory');


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

    return NodeArray;
}
/**
 * [A NodeArray]{@link module:GraphTheory.NodeArray}
 * @typedef {module:GraphTheory.NodeArray} NodeArray
 */
// module.exports = NodeArray;