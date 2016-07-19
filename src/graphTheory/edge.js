var Node = require('./node');
var NodeArray = require('./node_array');

module.exports = function(NodeArray, NodeClass) {
    // let NodeArray = NodeArray;
    let Node = NodeClass;
    /**
     * represents a connection between nodes
     * @exports Edge
     * @constructor
     * @memberOf! module:GraphTheory
     */
    class Edge {

        /**
         * creates an edge connecting two nodes
         * @param  {Node}   n1
         * @param  {Node}   n2
         * @param  {Number} [weight=0] the value associated with the edge
         * @return {Edge} the new edge
         */
        constructor(n1 = new Node(), n2 = new Node(), weight = 0) {
            /**
             * the weight of the edge
             * @type {Number}
             */
            this.weight = weight;
            this.establishNodes(n1, n2);
            this.setLabel();
        }

        establishNodes(n1, n2) {
            /**
             * an array of nodes
             * @type {NodeArray}
             */
            this.nodes = NodeArray.of(n1, n2);
        }
        setLabel() {
            /**
             * an identifier for the Edge
             * @type {String}
             */
            this.label = `${this.nodes[0].label}_${this.nodes[1].label}`;
        }
        /**
         * checks the equivalence (by nodes) of this edge against another
         * @param  {Edge}  edgeArg edge to be checked
         * @return {Boolean}
         */
        isEquivalent(edgeArg) {
            return this.hasSameNodes(edgeArg);
        }

        /**
         * checks the equivalence of this edge's label against another
         * @param  {Edge}  edgeArg edge to be checked
         * @return {Boolean}
         */
        hasSameName(edgeArg) {
            return (this.label) ? this.label === edgeArg.label : false;
        }
        /**
         * checks the equivalence of this edges nodes against another
         * @param  {Edge}  edgeArg edge to be checked
         * @return {Boolean}
         */
        hasSameNodes(edgeArg) {
            return this.nodes.isEquivalent(edgeArg.nodes);
        }
        /**
         * Checks for the presence of a node in this edge
         * @param  {Node} nodeArg
         * @return {Boolean}
         */
        containsNode(nodeArg) {
            return this.nodes.contains(nodeArg);
        }
        /**
         * @param  {Node} nodeArg
         * @return {Node} the neighbor
         */
        getNeighbor(nodeArg) {
            return this.nodes.find(currNode => currNode != nodeArg);
        }
        /**
         * typecasts the neighboring node as a NodeArray with a single element (for method chaining)
         * @param  {Node} nodeArg
         * @return {NodeArray}         an Array of the neighboring node
         */
        nabeArray(nodeArg) {
            return this.nodes.excludeElement(nodeArg);
        }

    }
    /**
     * [An Edge]{@link module:GraphTheory.Edge}
     * @typedef {module:GraphTheory.Edge} Edge
     */
    return Edge;
}