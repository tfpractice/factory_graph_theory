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
    nodeMap() {
        return this.edges.map(currEdge => currEdge.nodes);
    }
    getNodes() {
        var eAN = this.edges.getNodes();
        console.log(eAN);
        var compNodes = new NodeArray();
        // console.log(compNodes);
        // compNodes.push(this.nodes[0][0]);
        var result = [...this.nodeMap()];
        var r2 = this.nodeMap();
        var r3 = result.reduce((nArray, nextArray) => {
            // nArray.push(...nextArray);
            // nArray.push(nextArray);
        }, compNodes);
        console.log(result);
        // console.log('***********');

        // console.log(r2);

        // console.log('***********');

        // console.log(r3);
        return result;
    }
    // connected(n1, n2) {
    // return (this.containsEdge(n1) && this.containsEdge(n2));
    // }

    // methods
}
module.exports = EdgeComponent;