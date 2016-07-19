var Node = require('./node');
var NodeArray = require('./node_array_factory');
var Edge = require('./edge_factory');
var EdgeArray = require('./edge_array_factory');
var ComponentArray = require('./component_array_factory');

/**
 * Constructs a Graph Class by dependencies
 * @param  {Function} EdgeArray      THe EdgeArray class
 * @param  {Function} Edge           The Edge Class
 * @param  {Fucntion} ComponentArray dependency
 * @param  {Function} NodeArray      dependency
 * @param  {Function} NodeClass      dependency
 * @return {Function}                The resulting Graph class
 */
module.exports = function(EdgeArray, Edge, ComponentArray, NodeArray, NodeClass) {
    let Node = NodeClass;
    /**
     * represents a Graph
     * @exports Graph
     * @constructor
     * @memberOf! module:GraphTheory
     */
    class Graph {
        /**
         * creates a Graph object
         * @param  {NodeArray} nodes the graph's nodes
         * @return {Graph}
         */
        constructor(nodes) {
            this.establishNodes(nodes);
            this.establishEdges();
            this.establishComponents();
        }
        /**
         * assigns/typecasts the nodes attibute
         * @param  {?NodeArray} nArr
         */
        establishNodes(nArr) {
            /**
             * the graph's nodes
             * @type {NodeArray}
             */
            this.nodes = nArr ? NodeArray.from(nArr) : new NodeArray;
        }
        /**
         * assigns/typecasts the edges attibute
         */
        establishEdges() {
            /**
             * the graph's edges
             * @type {EdgeArray}
             */
            this.edges = new EdgeArray;
        }
        /**
         * assigns/typecasts the components attibute
         */
        establishComponents() {
            /**
             * the graph's components
             * @type {ComponentArray}
             */
            this.components = new ComponentArray();
        }
        /**
         * @see [delegated to NodeArray#push] {@link module:GraphTheory.NodeArray#push}
         */
        addNode(node) {
            this.nodes.push(node);
            return this;
        }
        /**
         * @see [delegated NodeArray#contains] {@link module:GraphTheory.NodeArray#contains}
         */
        containsNode(argNode) {
            return this.nodes.contains(argNode);
        }
        /**
         * removes all edges associated with the argument, then calls removes the node
         * @see [delegated NodeArray#push] {@link module:GraphTheory.NodeArray#removeElement}
         * @see [remove edge] {@link module:GraphTheory.Graph#removeEdge}
         */
        removeNode(nodeArg) {
            this.edgesWithNode(nodeArg).forEach(e => this.removeEdge(e));
            this.nodes.removeElement(nodeArg);
            return this;
        }
        /**
         * removes all edges associated with the argument, then removes all nodes the node
         * @see [delegated NodeArray#push] {@link module:GraphTheory.NodeArray#clear}
         * @see [remove edge] {@link module:GraphTheory.Graph#removeEdge}
         * @return {Graph} the current graph
         */
        clearNodes() {
            this.nodes.forEach(n => this.removeNode(n));
            this.nodes.clear();
            return this;
        }
        /**
         * clears the nodes and reassigns them to narr
         * @param {NodeArray} nArr
         * @return {Graph} the current graph
         */
        setNodes(nArr) {
            this.clearNodes();
            this.nodes = nArr;
            return this;
        }
        /**
         * merges the nodes from the argument into the current graphs nodes
         * @param  {NodeArray} nArr nodes to merge
         * @return {Graph}      the current graph
         */
        copyNodes(nArr) {
            this.nodes.unionize(nArr);
            return this;
        }
        /**
         * @param  {Node} nodeArg source node
         * @return {EdgeArray} the edges connected to source
         */
        edgesWithNode(nodeArg) {
            return this.edges.edgesWithNode(nodeArg);
        }
        /**
         * creates a new edge given two nodes
         * @param {Node} sNode source node
         * @param {Node} dNode destination node
         * @param {Number} weight weight of new edge
         * @return {Edge} the newly added edge
         */
        createEdge(sNode, dNode, weight) {
            this.addEdge(new Edge(sNode, dNode, weight));
            return this.edges.edgeByNodes(sNode, dNode);
        }
        /**
         * copies the nodes from the edge, then adds it to the edges array
         * @param {Edge} edgeArg
         * @see [delegated NodeArray#push] {@link module:GraphTheory.NodeArray#removeElement}
         * @return {Graph} the current graph
         */
        addEdge(edgeArg) {
            this.copyNodes(edgeArg.nodes);
            this.edges.push(edgeArg);
            return this;
        }
        /**      
         *  @see [delegated to EdgeArray#push] {@link module:GraphTheory.EdgeArray#push}
         */
        containsEdge(argEdge) {
            return this.edges.contains(argEdge);
        }
        /**      
         *  @see [delegated to EdgeArray#removeElement] {@link module:GraphTheory.EdgeArray#removeElement}
         */
        removeEdge(argEdge) {
            this.edges.removeElement(argEdge);
        }
        /**      
         *  @see [delegated to EdgeArray#clear] {@link module:GraphTheory.EdgeArray#clear}
         * @return {Graph} the current graph
         */
        clearEdges() {
            this.edges.clear();
            return this;
        }
        /**
         * clears and reassigns nodes to those of the edge array, and sets the edges
         * functions basically as a graph reset, an easy way to explore a graph from different angles
         * @see [calls EdgeArray#getNodes] {@link module:GraphTheory.EdgeArray#getNodes}
         * @param {EdgeArray} eArr
         * @return {Graph} the modified graph
         */
        setEdges(eArr) {
            let eNodes = eArr.getNodes();
            this.setNodes(eNodes);
            this.edges = eArr;
            return this;
        }
        /**
         * copies and merges the nodes from the edgeArray, then merges the edges into the current graph
         * @param  {EdgeArray} eArr
         * @return {Graph}  the modified graph
         */
        copyEdges(eArr) {
            let eNodes = eArr.getNodes();
            this.copyNodes(eNodes);
            this.edges.unionize(eArr);
            return this;
        }
        /**
         * creates a new graph
         * @param  {?NodeArray} nArr a potential inital set of Nodes
         * @return {Graph}      a new Graph instance
         */
        subGraph(nArr) {
            return new this.constructor(nArr);
        }
        /**
         * creates a new graph, and sets its edges,
         * useful for exploring a graph based on different connections
         * @param  {EdgeArray} [eArr = this.edges] a potential inital set of Edges
         * @return {Graph}      a new Graph instance
         */
        subGraphByEdges(eArr = this.edges) {
            return this.subGraph().copyEdges(eArr);
        }
        /**
         *
         * @param  {Node} nodeArg the source node
         * @return {NodeArray} the neighboring nodes
         */
        getNeighbors(nodeArg) {
            return this.edges.getNeighbors(nodeArg);
        }
        /**
         * typecasts a path to a NodeArray
         * @param  {Map} pathArg an ordered sequence of nodes with predecessors and path weights
         * @return {NodeArray} An array of the nodes
         */
        pathNodes(pathArg) {
            return NodeArray.from([...pathArg.keys()]);
        }
        /**
         * returns all of the Edges connected to a node whose neighbors have yet to be visited
         * @param  {Node} nodeArg the node
         * @param  {NodeArray} compArg the component being explored
         * @return {EdgeArray}         the edges with unexplored nodes
         */
        getUnvisitedEdges(nodeArg, compArg) {
            let unArr = this.getUnvisitedNeighbors(nodeArg, compArg);
            return this.edgesWithNode(nodeArg).edgesByArray(unArr);
        }
        /**
         * returns all of the nodes neighbors not yet part explored in the component
         * @param  {Node} nodeArg
         * @param  {NodeArray} compArg the explored component
         * @return {NodeArray}     unexplored nodes
         */
        getUnvisitedNeighbors(nodeArg, compArg) {
            return this.getNeighbors(nodeArg).difference(compArg);
        }
        /**
         * adds all unvisited nodes in the path to the specified component
         * @param  {Map} pathArg  the path to be explored
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
         * depth first search, initializes a new component of reachable nodes,
         * and constructs a path to each of those node from the initNode
         * @param  {Node} initNode the source node
         * @return {Map} a key-value store of nodes and edge distances
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
         * @param {NodeArray} compArg
         */
        addComponent(compArg) {
            this.components.push(compArg);
        }
        removeComponent(compArg) {
            this.components.removeElement(compArg);
        }
        /**
         * returns any current components which intersect with the specified component
         * @param  {NodeArray} compArg the component to be checked
         * @return {NodeArray} the first intersecting component
         */
        findIntersectingComponent(compArg) {
            return this.components.findIntersectingComponent(compArg);
        }
        /**
         * combines the nodes of two intersecting components
         * @param  {NodeArray} origComp
         * @param  {NodeArray} newComp
         */
        mergeComponents(origComp, newComp) {
            return this.components.mergeComponents(origComp, newComp);
        }
        /**
         * integrates a component into any of the graphs intersectung components
         * @param  {NodeArray} compArg
         */
        integrateComponent(compArg) {
            return this.components.integrateComponent(compArg);
        }
        /**
         * checks if any current components share nodes with the argument
         * @param  {NodeArray}  compArg
         * @return {Boolean}
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
            var bQueue = NodeArray.of(initNode);
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
         * @return {Boolean} does a path exist between the two nodes
         */
        hasPath(initNode, termNode) {
            return this.bfs(initNode).has(termNode);
        }
        /**
         * performs dijkstras algorithm for shortest paths to all nodes reachable from initNode
         * @param  {Node}  initNode the initial node
         * @return {Map} a sequence of nodes and their distances
         */
        dijkstra(initNode = this.nodes[0]) {
            var reachables = this.bfs(initNode);
            var inspectionQueue = NodeArray.of(initNode);
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
         * composes the shortest path between two nodes by backtracing from dijkstra
         * @param  {Node} initNode
         * @param  {Node} termNode
         * @return {?Map}  path of nodes
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

    /**
     * [A Graph]{@link module:GraphTheory.Graph}
     * @typedef {module:GraphTheory.Graph} Graph
     */
    return Graph;
}