var Node = require('./node');
var RobustArray = require('./robust_array');


module.exports = function(NodeClass) {
    let Node = NodeClass;
    // class NodeArray extends RobustArray.SetifyType(Node) {};

    /**
     * represents a set of Nodes
     * @exports NodeArray
     * @constructor
     * @extends {RobustArray}
     * @memberOf! module:GraphTheory
     */
    class NodeArray extends RobustArray.SetifyType(Node) {
        /**
         * defines NodeClass  on the Prototype chain for runtime extension
         * @param  {Function} NClass the Node function this class depends upon
         * @return {Function}  the updated NodeArray class
         */
        // static assignNode(nClass = Node) {
        // this.prototype.Node = nClass;
    }

    // NodeArray.assignNode();
    return NodeArray;
}
/**
 * [A NodeArray]{@link module:GraphTheory.NodeArray}
 * @typedef {module:GraphTheory.NodeArray} NodeArray
 */
// module.exports = NodeArray;