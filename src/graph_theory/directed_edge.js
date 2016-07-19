var Node = require('./node');
var NodeArray = require('./node_array_factory');
var Edge = require('./edge_factory');

/**
 * represents a connection between nodes
 * @exports DirectedEdge
 * @constructor
 * @memberOf! module:GraphTheory
 */
class DirectedEdge extends Edge {
    constructor(src = new Node(), dest = new Node(), weight = 0) {
        super(src, dest, weight);
        this.source = src;
        this.dest = dest;

    }
    isEquivalent(edgeArg) {
        return (edgeArg instanceof DirectedEdge) ? super.isEquivalent(edgeArg) : false;
    }
}
/**
 * [A DirectedEdge]{@link module:GraphTheory.DirectedEdge}
 * @typedef {module:GraphTheory.DirectedEdge} DirectedEdge
 */
module.exports = DirectedEdge;