var Node = require('./node');
var NodeArray = require('./node_array');
var Edge = require('./edge');
var EdgeArray = require('./edge_array');
var ComponentArray = require('./component_array');
/**
 * represents a Graph
 * @exports Graph
 * @constructor
 * @memberOf! module:graphTheory
 */
class Graph {
    static assignEdgeArray(EAClass = EdgeArray) {
        this.prototype.EdgeArray = EAClass;
        this.prototype.Edge = EAClass.prototype.Edge;
        this.prototype.NodeArray = EAClass.prototype.NodeArray;
        this.prototype.Node = EAClass.prototype.Node;
        this.prototype.ComponentArray = ComponentArray;
        this.prototype.ComponentArray.assignNodeArray(EAClass.prototype.NodeArray);
    }
    constructor(nodes) {
        this.establishNodes(nodes);
        this.establishEdges();
        this.establishComponents();
        /**
         * the graph's components
         * @type {Component[]}
         */
    }
    establishNodes(nArr) {
        /**
         * the graph's nodes
         * @type {NodeArray}
         */
        this.nodes = nArr ? this.NodeArray.from(nArr) : new this.NodeArray;
    }
    establishEdges() {
        /**
         * the graph's edges
         * @type {EdgeArray}
         */
        this.edges = new this.EdgeArray;
    }
    establishComponents() {
        this.components = new this.ComponentArray();
    }
    /**
     * adds a node to the nodes array, if not already contained
     * @param {Node} node the new node
     */
    addNode(node) {
        this.nodes.push(node);
    }
    containsNode(argNode) {
        return this.nodes.contains(argNode);
    }
    removeNode(nodeArg) {
        this.edgesWithNode(nodeArg).forEach(e => this.removeEdge(e));
        this.nodes.removeElement(nodeArg);
    }
    clearNodes() {
        this.nodes.forEach(n => this.removeNode(n));
        this.nodes.clear();
        return this;
    }
    setNodes(nArr) {
        this.clearNodes();
        this.nodes = nArr;
        return this;
    }
    copyNodes(nArr) {
        this.nodes.unionize(nArr);
        return this;
    }
    /**
     * @param  {Node} nodeArg source node
     * @return {Edge[]} the edges connected to source
     */
    edgesWithNode(nodeArg) {
        return this.edges.edgesWithNode(nodeArg);
    }
    /**
     * creates a new edge given two nodes
     * @param {Node} sNode source node
     * @param {Node} dNode destination node
     * @param {Number} weight weight of new edge
     */
    createEdge(sNode, dNode, weight) {
        this.addEdge(new this.Edge(sNode, dNode, weight));
        return this.edges.edgeByNodes(sNode, dNode);
    }
    addEdge(edgeArg) {
        this.copyNodes(edgeArg.nodes);
        this.edges.push(edgeArg);
    }
    containsEdge(argEdge) {
        return this.edges.contains(argEdge);
    }
    removeEdge(argEdge) {
        this.edges.removeElement(argEdge);
    }
    clearEdges() {
        this.edges.clear();
        return this;
    }
    setEdges(eArr) {
        let eNodes = eArr.getNodes();
        this.setNodes(eNodes);
        this.edges = eArr;
        return this;
    }
    copyEdges(eArr) {
        let eNodes = eArr.getNodes();
        this.copyNodes(eNodes);
        this.edges.unionize(eArr);
        return this;
    }
    subGraph(nArr) {
        return new this.constructor(nArr);
    }
    subGraphByEdges(eArr = this.edges) {
        return this.subGraph().copyEdges(eArr);
    }
    /**
     *
     * @param  {Node} nodeArg the source node
     * @return {Node[]} the neighboring nodes
     */
    getNeighbors(nodeArg) {
        return this.edges.getNeighbors(nodeArg);
    }
    pathNodes(pathArg) {
        return this.NodeArray.from([...pathArg.keys()]);
    }
    /**
     * returns all of the nodes Edges which contain nodes not yet in the specified component
     * @param  {Node} nodeArg [description]
     * @param  {Component} compArg [description]
     * @return {EdgeArray}         [description]
     */
    getUnvisitedEdges(nodeArg, compArg) {
        let unArr = this.getUnvisitedNeighbors(nodeArg, compArg);
        return this.edgesWithNode(nodeArg).edgesByArray(unArr);
    }
    /**
     * returns all of the nodes neighbors not yet part od the component
     * @param  {Node} nodeArg [description]
     * @param  {Component} compArg [description]
     * @return {NodeArray}         [description]
     */
    getUnvisitedNeighbors(nodeArg, compArg) {
        return this.getNeighbors(nodeArg).difference(compArg);
    }
    /**
     * adds all unvisited nodes in the path to the specified component
     * adds each node connected to an edge to a (depth) path
     * @param  {Map} pathArg  the path to be explored
     * @param  {Component} compArg a key value store of node's and distances
     */
    visitPath(pathArg) {
        let pNodes = this.pathNodes(pathArg);
        let lastNode = pNodes.pop();
        let nextEdges = this.getUnvisitedEdges(lastNode, pNodes);

        if (nextEdges.length === 0) {
            return pathArg;
        } else {
            let predWeight = pathArg.get(lastNode).pathWeight;
            let predCount = pathArg.get(lastNode).edgeCount;
            nextEdges.forEach(currEdge => {
                let nabe = currEdge.getNeighbor(lastNode);
                pathArg.set(nabe, {
                    pred: lastNode,
                    edgeCount: predCount + 1,
                    pathWeight: predWeight + currEdge.weight
                });
                this.visitPath(pathArg);
            });
        }
        return pathArg;
    }
    /**
     * depth first search, initializes a new component of reachable nodes, and constructs a path to each of those node from the source
     * @param  {Node} initNode inital node
     * @return {Component} a key-value store of nodes and edge distances
     */
    dfs(initNode) {
        let path = new Map();
        path.set(initNode, {
            pred: null,
            edgeCount: 0,
            pathWeight: 0
        });
        this.visitPath(path);
        let pComp = this.pathNodes(path);
        this.addComponent(pComp);
        return path;
    }
    containsComponent(compArg) {
        return this.components.contains(compArg);
    }
    /**
     * adds a component to the graph if not present
     * @param {Component} compArg [description]
     */
    addComponent(compArg) {
        this.components.push(compArg);
    }
    removeComponent(compArg) {
        this.components.removeElement(compArg);
    }
    /**
     * returns any current components which intersect with the specified component
     * @param  {Component} compArg the component to be checked
     * @return {Component} the first intersecting component
     */
    findIntersectingComponent(compArg) {
        return this.components.findIntersectingComponent(compArg);
    }
    /**
     * combines the nodes of two intersecting components
     * @param  {Component} origComp
     * @param  {Component} newComp
     */
    mergeComponents(origComp, newComp) {
        return this.components.mergeComponents(origComp, newComp);
    }
    /**
     * integrates a component into any of the graphs intersectung components
     * @param  {Component} compArg [description]
     */
    integrateComponent(compArg) {
        return this.components.integrateComponent(compArg);
    }
    /**
     * checks if any current components share nodes with the argument
     * @param  {Component}  compArg [description]
     * @return {Boolean}         [description]
     */
    hasIntersectingComponent(compArg) {
        return this.components.some(currComp => currComp.intersects(compArg));
    }
    /**
     * breadth first search, recursively adds all immediate neighbors, to a component of nodes reachabe by a initial node
     * @param  {Node} initNode inital node
     * @return {Map} a key-value store of nodes and edge distances
     */
    bfs(initNode = this.nodes[0]) {
        var bPath = new Map().set(initNode, {
            pred: null,
            pathWeight: 0,
            edgeCount: 0
        });
        var bQueue = this.NodeArray.of(initNode);
        while (bQueue.length > 0) {
            let currN = bQueue.shift();
            var bNodes = this.pathNodes(bPath);
            let currEdges = this.getUnvisitedEdges(currN, bNodes);
            let prNode = bPath.get(currN);
            currEdges.forEach((nEdge) => {
                let nNode = nEdge.getNeighbor(currN);
                bPath.set(nNode, {
                    pred: currN,
                    edgeCount: prNode.edgeCount + 1,
                    pathWeight: prNode.pathWeight + nEdge.weight
                });
                bQueue.push(nNode);
            });
        }
        this.addComponent(bNodes);
        return bPath;
    }
    /**
     * check if a path exists between two nodes
     * @param  {Node}  initNode the initial node
     * @param  {Node}  termNode the terminal node
     * @return {Boolean} a path exists between the two nodes
     */
    hasPath(initNode, termNode) {
        return this.bfs(initNode).has(termNode);
    }
    /**
     * performs dijkstras algorithm for shortest paths to all nodes reachabe from initNode
     * @param  {Node}  initNode the initial node
     * @param  {Node}  termNode the terminal node
     * @return {Object} a shortest path between nodes
     */
    dijkstra(initNode = this.nodes[0]) {
        var reachables = this.bfs(initNode);
        var inspectionQueue = this.NodeArray.of(initNode);
        var solutionSet = new Map().set(initNode, {
            pred: null,
            edgeCount: 0,
            pathWeight: 0
        });
        while (inspectionQueue.length > 0) {
            var currN = inspectionQueue.shift();
            var currEdges = this.edgesWithNode(currN);
            currEdges.forEach((tempEdge) => {
                let nNode = tempEdge.getNeighbor(currN);
                var rNodeEntry = reachables.get(nNode);
                var currWeight = rNodeEntry.pathWeight;
                var sPred = solutionSet.get(currN);
                var dijkstraWeight = sPred.pathWeight + tempEdge.weight;
                let dMap = {
                    pred: currN,
                    edgeCount: sPred.edgeCount + 1,
                    pathWeight: dijkstraWeight
                };
                let sMap = (dijkstraWeight < currWeight) ? dMap : rNodeEntry;
                if (!solutionSet.has(nNode)) {
                    inspectionQueue.push(nNode);
                    solutionSet.set(nNode, sMap);
                }
            });
        }
        return solutionSet;
    }
    /**
     * composes the shortest path between two nodes by backtracing dijkstra's pred attirbute
     * @param  {Node} initNode [description]
     * @param  {Node} termNode [description]
     * @return {Map}  path of nodes
     */
    shortestPath(initNode, termNode) {
        if (!this.hasPath(initNode, termNode)) {
            return false;
        } else {
            let dijkMap = this.dijkstra(initNode);
            let currN = termNode;
            let currEntry = dijkMap.get(currN);
            let predN = currEntry.pred;
            let path = new Map();
            while (currN != initNode) {
                path.set(currN, currEntry);
                currN = predN;
                currEntry = dijkMap.get(currN);
                predN = currEntry.pred;
            }
            return path;
        }
    }
};
Graph.assignEdgeArray();
module.exports = Graph;
/**
 * [A Graph]{@link module:graphTheory.Graph}
 * @typedef {module:graphTheory.Graph} Graph
 */