var Node = require('./node');
var NodeArray = require('./nodeArray');
var Edge = require('./directedEdge');
var EdgeArray = require('./edgeArray');

class EdgeComponent {
    constructor(e1) {
        this.edges = new EdgeArray(e1);
        this.arity = this.edges.length;
    }
    resetArity() {
        this.arity = this.edges.length;
    }
    containsEdge(edgeArg) {
        return this.edges.contains(edgeArg);
    }
    // containsEdge(edgeArg) {
    // return this.edges.contains(edgeArg);
    // }
    addEdge(edgeArg) {
        this.edges.push(edgeArg);
    }
    getNodes() {
        var result = this.edges.map(currEdge => currEdge.nodes);
        // var sRes = (...result);
        return result;
    }
    // connected(n1, n2) {
    // return (this.containsEdge(n1) && this.containsEdge(n2));
    // }

    // methods
}
module.exports = EdgeComponent;