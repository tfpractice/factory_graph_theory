var Node = require('./node');
var NodeArray = require('./node_array_factory');
var Edge = require('./edge_factory');
// var DirectedEdge = require('./directedEdge');
var RobustArray = require('./robust_array_factory');


/**
 * Constructs [an EdgeArray]{@link module:GraphTheory.EdgeArray} Class by dependencies
 * @memberOf! module:GraphTheory
 * @param  {Function} Edge           [The Edge Class]{@link module:GraphTheory.Edge}
 * @param  {Function} NodeArray      [The NodeArray Class]{@link module:GraphTheory.NodeArray}
 * @param  {Function} NodeClass      [The Node Class]{@link module:GraphTheory.Node}
 * @return {Function}                [The resulting EdgeArray class]{@link module:GraphTheory.EdgeArray}
 */
function EdgeArrayFactory(Edge, NodeArray, NodeClass) {

    let Node = NodeClass;
    /**
     * represents a set of Edges
     * @exports EdgeArray
     * @constructor
     * @memberOf! module:GraphTheory
     * @extends {RobustArray}
     */
    class EdgeArray extends RobustArray.SetifyType(Edge) {
        /**
         * Filters the edges by those which contain the specified node
         * @param  {Node} nArg the node in question
         * @return {EdgeArray} the filtered array
         */
        edgesWithNode(nArg) {
            return this.filter(e => e.containsNode(nArg));
        }
        /**/
        edgeByNodes(n1, n2) {
            return this.find(e => (e.containsNode(n1) && e.containsNode(n2)));
        }
        /**
         *
         * @param  {NodeArray} nArr the nodes to be matched against
         * @return {EdgeArray}      the edges intersecting nArr
         */
        edgesByArray(nArr) {
            return nArr.reduce((eArr, nNode) => eArr.unionize(this.edgesWithNode(nNode)), new this.constructor());
        }
        /**
         * @return {NodeArray}      all of the nodes in this array of edges
         */
        getNodes() {
            return this.nodeMap().reduce((pred, succ) => pred.unionize(succ), new NodeArray);
        }
        /**
         * @param  {NodeArray} nArg the node to be matched against
         * @return {NodeArray}      all of the nodes contained in this array
         */
        getNeighbors(nArg) {
            let sharedEdges = this.edgesWithNode(nArg);
            return (!sharedEdges.isEmpty() && sharedEdges.map(e => e.nabeArray(nArg)).reduce((pred, succ) => pred.unionize(succ))) || new NodeArray;
        }
        /**
         * @return {NodeArray[]} an array of all the nodes in this collection od edges
         */
        nodeMap() {
            return ((!this.isEmpty()) && this.map(e => e.nodes)) || new NodeArray;
        }

    }
    /**
     * [An EdgeArray]{@link module:GraphTheory.EdgeArray}
     * @typedef {module:GraphTheory.EdgeArray} EdgeArray
     */
    return EdgeArray;
}
/**
 * [An EdgeArrayFactory]{@link module:GraphTheory.EdgeArrayFactory}
 * @typedef {module:GraphTheory.EdgeArrayFactory} EdgeArrayFactory
 * @exports EdgeArrayFactory
 */
module.exports = EdgeArrayFactory;