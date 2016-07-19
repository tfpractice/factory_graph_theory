describe('Graph', function() {
    var GR = require('../src/graph_theory');
    var Node = GR.Node;
    var NodeArray = GR.NodeArray;
    var Edge = GR.Edge;
    var ComponentArray = GR.ComponentArray;
    var EdgeArray = GR.EdgeArray;
    const Graph = GR.Graph;
    beforeAll(function() {
        console.log('\n.........Graph Spec.........');
    });
    describe('delegated to subarray', () => {
        let laV, nyV, bostonV, tampaV, myGraph;
        beforeEach(function() {
            myGraph = new Graph();
            bostonV = new Node("boston");
            nyV = new Node("ny");
            laV = new Node("la");
            tampaV = new Node("tampa");
            myGraph.addNode(bostonV);
            myGraph.addNode(tampaV);
            myGraph.addNode(nyV);
            myGraph.addNode(laV);
            myGraph.createEdge(nyV, laV);
            myGraph.createEdge(nyV, tampaV);
        });
        describe('NodeArray', function() {
            describe('addNode', function() {
                it('appends a vertex to the nodes array', function() {
                    let newNode = new Node("anon");
                    myGraph.addNode(newNode);
                    expect(myGraph.nodes).toContain(newNode);
                });
            });
            describe('containsNode()', () => {
                it('checks if any of the elements are equivalent to that provided', function() {
                    expect(myGraph.containsNode(bostonV)).toBeTrue();
                });
            });
            describe('#clearNodes', function() {
                it('clears the nodes arrays', function() {
                    myGraph.clearNodes();
                    expect(myGraph.nodes).toBeEmptyArray();
                });
            });
            describe('#removeNode(nArg)', () => {
                it('removes all edges attached to specified node ', function() {
                    let ela = myGraph.edgesWithNode(nyV);
                    myGraph.removeNode(laV);
                    expect(myGraph.edgesWithNode(nyV).length).toEqual(ela.length - 1);
                });
                it('removes a node from the array', function() {
                    myGraph.removeNode(laV);
                    expect(myGraph.containsNode(laV)).toBeFalse();
                });
            });
        });
        describe('edge mutations', () => {
            let tempEdge, xn0, xn1, xEdge;
            beforeEach(function() {
                xn0 = new Node('xn0');
                xn1 = new Node('xn1');
            });
            beforeEach(function() {
                tempEdge = new Edge(bostonV, tampaV, 10);
                xEdge = myGraph.createEdge(xn0, xn1);

            });

            describe('#addEdge', function() {
                it('imports the edges nodes', function() {
                    myGraph.addEdge(xEdge);
                    expect(myGraph.nodes).toContain(xn0);
                });
                it('and adds the new edge ', function() {
                    myGraph.addEdge(xEdge);
                    expect(myGraph.edges).toContain(xEdge);
                });
            });
            describe('createEdge', function() {
                it('creates and appends a new edge to the edges array', function() {
                    myGraph.createEdge(bostonV, tampaV, 10);
                    expect(myGraph.edges).toContain(tempEdge);
                });
            });
            describe('#containsEdge(earg)', () => {
                it('checks if an equivalent egde is present in the graph', function() {
                    myGraph.createEdge(bostonV, tampaV, 10);
                    expect(myGraph.containsEdge(tempEdge)).toBeTrue();
                });
            });
            describe('#removeEdge()', () => {
                it('removes the edge from the edges array', function() {
                    myGraph.createEdge(bostonV, tampaV, 10);
                    myGraph.removeEdge(tempEdge);
                    expect(myGraph.edges).not.toContain(tempEdge);
                });
            });
            describe('#clearEdges', function() {
                it('clears the edges arrays', function() {
                    myGraph.createEdge(bostonV, tampaV);
                    myGraph.clearEdges();
                    expect(myGraph.edges).toBeEmptyArray();
                });
            });
            describe('edgesWithNode ', function() {
                it('returns all edges with a particular source Node ', function() {
                    let nytam = new Edge(nyV, tampaV);
                    expect(myGraph.edgesWithNode(nyV)).toContain(nytam);
                });
            });
            describe('getNeighbors', function() {
                it('returns all nodes adjacent to a given vertex', function() {
                    expect(myGraph.getNeighbors(nyV)).toContain(tampaV);
                });
            });
        });
    });
    describe('major functions', function() {
        let myGraph, gNodes, n0, nabe0, e0, e1, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12;
        beforeEach(function() {
            v1 = new Node("v1");
            v2 = new Node("v2");
            v3 = new Node("v3");
            v4 = new Node("v4");
            v5 = new Node("v5");
            v6 = new Node("v6");
            v7 = new Node("v7");
            v8 = new Node("v8");
            v9 = new Node("v9");
            v10 = new Node("v10");
            v11 = new Node("v11");
            v12 = new Node("v12");
            gNodes = NodeArray.of(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12);
            myGraph = new Graph(gNodes);
            myGraph.createEdge(v1, v2, 2);
            myGraph.createEdge(v2, v3, 4);
            myGraph.createEdge(v3, v4, 6);
            myGraph.createEdge(v4, v5, 8);
            myGraph.createEdge(v5, v1, 10);
            myGraph.createEdge(v6, v9, 10);
            myGraph.createEdge(v5, v10, 10);
            myGraph.createEdge(v10, v11, 10);
            myGraph.createEdge(v11, v12, 10);
            n0 = myGraph.nodes[0];
            nabe0 = myGraph.getNeighbors(n0)[0];
            e0 = myGraph.edges[0];
            e1 = myGraph.edges[1];
        });
        describe('establishNodes()', () => {
            it('sets the #edges attribute to a new EdgeArray', function() {
                let oldNodes = myGraph.nodes;
                myGraph.establishNodes(oldNodes);
                expect(myGraph.nodes instanceof NodeArray).toBeTrue();
            });

        });
        describe('establishEdges()', () => {
            it('sets the #edges attribute to a new EdgeArray', function() {
                myGraph.establishEdges();
                expect(myGraph.edges).toBeEmptyArray();
                expect(myGraph.edges instanceof EdgeArray).toBeTrue();
            });
        });
        describe('#establishComponents()', function() {
            it('sets the components attribute to a  new ComponentArray', function() {
                myGraph.establishComponents();
                expect(myGraph.components instanceof ComponentArray).toBeTrue();

            });
        });

        describe('setEdges()', () => {
            it('sets the edges array', function() {
                let firstFour = myGraph.edges.slice(0, 3);
                let newGraph = new Graph([new Node(), new Node(), new Node()]);
                newGraph.setEdges(firstFour);
                expect(newGraph.edges).toEqual(firstFour);
            });
        });
        describe('copyEdges()', () => {
            it('adds each edge to the edges array', function() {
                let firstEdge = myGraph.edges.slice(0, 1);
                let lastTwo = myGraph.edges.slice(-2);
                let newGraph = new Graph();
                newGraph.setEdges(firstEdge);
                newGraph.copyEdges(lastTwo);
                expect(newGraph.edges).toContain(...lastTwo);
            });
        });
        describe('setNodes()', () => {
            it('sets the nodes array', function() {
                let firstFour = myGraph.nodes.slice(0, 3);
                let newGraph = new Graph();
                newGraph.setNodes(firstFour);
                expect(newGraph.nodes).toEqual(firstFour);
            });
        });
        describe('copyNodes()', () => {
            it('adds each edge to the edges array', function() {
                let firstEdge = myGraph.nodes.slice(0, 1);
                let lastTwo = myGraph.nodes.slice(-2);
                let newGraph = new Graph();
                newGraph.setNodes(firstEdge);
                newGraph.copyNodes(lastTwo);
                expect(newGraph.nodes).toContain(...lastTwo);
            });
        });
        describe('subGraph', () => {
            it('returns an instance of the current graph class', function() {
                let cGraph = myGraph.subGraph();
                expect(cGraph instanceof Graph).toBeTrue();
            });
            describe('when passed an array of nodes', () => {
                it('returns an graph of the selected nodes[no edges]', function() {
                    let oddNodes = myGraph.nodes.filter(function(el, id) {
                        return id % 2 === 1;
                    });
                    let newGraph = myGraph.subGraph(oddNodes);
                    expect(newGraph instanceof Graph).toBeTrue();
                    expect(newGraph.nodes).toEqual(oddNodes);
                });
            });
        });
        describe('subGraphByEdges(eArr)', () => {
            it('returns a graph of all the nodes connected by a set of Edges', function() {
                let oddEdges = myGraph.edges.filter(function(el, id) {
                    return id % 2 === 1;
                });
                let newGraph = myGraph.subGraphByEdges(oddEdges);
                expect(newGraph instanceof Graph).toBeTrue();
                expect(newGraph.edges).toEqual(oddEdges);
            });
        });
        describe('connected components', function() {
            let nabes1, nabes2, nabes3, nabes6, nabes7, comp1, comp6, comp7;
            beforeEach(function() {
                nabes1 = myGraph.getNeighbors(v1);
                nabes1.push(v1);
                nabes2 = myGraph.getNeighbors(v2);
                nabes3 = myGraph.getNeighbors(v3);
                nabes6 = myGraph.getNeighbors(v6);
                nabes7 = myGraph.getNeighbors(v7);
            });
            describe('#containsComponent()', function() {
                it('returns a boolean checking for presence of equivalent component', function() {
                    myGraph.addComponent(nabes1);
                    expect(myGraph.containsComponent(nabes1)).toBeTrue();
                });
            });
            describe('#addComponent', () => {
                describe('when there is no intersecting component', () => {
                    it('pushes a NodeArray to the components array', function() {
                        myGraph.addComponent(nabes1);
                        expect(myGraph.components).toContain(nabes1);
                    });
                });
                describe('when there is an intersecting component', () => {
                    it('integrates the component with the intersecting component', function() {
                        myGraph.addComponent(nabes1);
                        myGraph.addComponent(nabes2);
                        expect(myGraph.components.length).toEqual(1);
                    });
                });
            });
            describe('#removeComponent', () => {
                it('splices a NodeArray from the components array', function() {
                    myGraph.addComponent(nabes1);
                    myGraph.removeComponent(nabes1);
                    expect(myGraph.components).not.toContain(nabes1);
                });
            });
            describe('hasIntersectingComponent(compArg)', () => {
                it('returns a boolean regarding any DISTINCT connecting components already present', function() {
                    myGraph.addComponent(nabes1);
                    expect(myGraph.hasIntersectingComponent(nabes2)).toBeTrue();
                });
            });
            describe('findIntersectingComponent(compArg)', function() {
                it('returns the component intersecting with the specified compArg', function() {
                    myGraph.addComponent(nabes1);
                    expect(myGraph.findIntersectingComponent(nabes2)).toEqual(nabes1);
                });
            });
            describe('mergeComponents)origComp, newComp)', function() {
                beforeEach(function() {
                    myGraph.addComponent(nabes1);
                    myGraph.mergeComponents(nabes1, nabes2);
                });
                it('unionizes the two components ', function() {
                    expect(nabes2.isSubset(nabes1)).toBeTrue();
                });
                it('removes the newComp arg', function() {
                    expect(myGraph.components).not.toContain(nabes2);
                });
                it('returns the augmented component', function() {
                    expect(myGraph.mergeComponents(nabes1, nabes2)).toEqual(nabes1);
                });
            });
            describe('integrateComponent(compArg)', function() {
                describe('when there is no intersecting component', () => {
                    it('doesnt change the components array', function() {
                        myGraph.addComponent(nabes1);
                        myGraph.integrateComponent(nabes6);
                        expect(myGraph.components.length).toEqual(1);
                    });
                });
                describe('when there is an intersecting component', () => {
                    it('find an intersecting component and merges it with compArg', function() {
                        myGraph.addComponent(nabes1);
                        myGraph.integrateComponent(nabes2);
                        expect(myGraph.components.length).toEqual(1);
                    });
                });
            });
            describe('getUnvisitedNeighbors(nodeArg,compArg)', function() {
                it('returns all neighbors not yet included in the given component', function() {
                    myGraph.addComponent(nabes1);
                    let unarr = myGraph.getUnvisitedNeighbors(v3, nabes1);
                    expect(myGraph.getUnvisitedNeighbors(v3, nabes1)).toContain(v4);
                });
            });
            describe('getUnvisitedEgdes(nodeArg,compArg)', function() {
                it('returns all edges not yet included in the given component', function() {
                    expect(myGraph.getUnvisitedEdges(v3, nabes1)).toBeArray();
                });
            });
        });
        describe('hasPath', function() {
            it('determines if a path exists between to nodes in a graph', function() {
                let result = myGraph.hasPath(v1, v3);
                expect(myGraph.hasPath(v1, v3)).toBeTrue();
            });
        });
        describe('traversals', () => {
            beforeEach(function() {
                myGraph.createEdge(v2, v3, 4);
                myGraph.createEdge(v2, v4, 6);
                myGraph.createEdge(v2, v5, 8);
                myGraph.createEdge(v2, v1, 10)
            });
            describe('dfs(initNode)', () => {
                it('returns a path[Map] containing all nodes reachable via initNode', function() {
                    let tVal = myGraph.dfs(v2);
                    expect(tVal instanceof Map).toBeTruthy();
                });
                describe('retun values', () => {
                    let dfsKeys;
                    beforeEach(function() {
                        dfsKeys = myGraph.dfs(v2).get(v1);
                    });
                    it('maps the values to an object with keys for predecessor(pred), edgeCount, and pathWeight', function() {
                        expect(dfsKeys).toBeObject();
                    });
                    it('has a pred[Node/null] value', function() {
                        expect(dfsKeys.pred instanceof Node).toBeTrue();
                    });
                    it('has a edgeCount[Number] value', function() {
                        expect(dfsKeys.edgeCount).toBeNumber();
                    });
                    it('has a pathWeight[Number] value', function() {
                        expect(dfsKeys.pathWeight).toBeNumber();
                    });
                });
                it('augments or adds a component to the array', function() {
                    myGraph.dfs(v2);
                    expect(myGraph.components.length).toEqual(1);
                });
                describe('#pathNodes(path)', function() {
                    it('returns the path keys as a node array', function() {
                        let path = myGraph.dfs(v2);
                        let pkey = myGraph.pathNodes(path);
                        expect(pkey instanceof NodeArray).toBeTrue();
                    });
                });
            });
            describe('visitPath(pathArg)', () => {
                it('returns a path[Map] containing all nodes reachable from the last appended node', function() {
                    let p3 = new Map();
                    p3.set(v3, {
                        pred: null,
                        edgeCount: 0,
                        pathWeight: 0
                    });
                    let visitVal = myGraph.visitPath(p3);
                    expect(visitVal instanceof Map).toBeTrue();
                });
            });
            describe('bfs(initNode)', () => {
                it('returns a path[Map] of nodes reachable in BreadthFirstSearch', function() {
                    expect(myGraph.bfs(v1) instanceof Map).toBeTrue();
                });
                describe('retun values', () => {
                    let bfsKeys;
                    beforeEach(function() {
                        bfsKeys = myGraph.bfs(v1).get(v2);
                    });
                    it('maps the values to an object with keys for predecessor(pred), edgeCount, and pathWeight', function() {
                        expect(bfsKeys).toBeObject();
                    });
                    it('has a pred[Node/null] value', function() {
                        expect(bfsKeys.pred instanceof Node).toBeTrue();
                    });
                    it('has a edgeCount[Number] value', function() {
                        expect(bfsKeys.edgeCount).toBeNumber();
                    });
                    it('has a pathWeight[Number] value', function() {
                        expect(bfsKeys.pathWeight).toBeNumber();
                    });
                });
            });
        });
        describe('dijkstra', function() {
            it('returns the shortest path[Map] from initNode to all nodes reachable from initNode', function() {
                expect(myGraph.dijkstra(v1, v2) instanceof Map).toBeTrue();
            });
            describe('retun values', () => {
                let dijkKeys;
                beforeEach(function() {
                    dijkKeys = myGraph.dijkstra(v1, v2).get(v5);
                });
                it('maps the values to an object with keys for predecessor(pred), edgeCount, and pathWeight', function() {
                    expect(dijkKeys).toBeObject();
                });
                it('has a pred[Node/null] value', function() {
                    expect(dijkKeys.pred instanceof Node).toBeTrue();
                });
                it('has a edgeCount[Number] value', function() {
                    expect(dijkKeys.edgeCount).toBeNumber();
                });
                it('has a pathWeight[Number] value', function() {
                    expect(dijkKeys.pathWeight).toBeNumber();
                });
            });
        });
        describe('shortestPath(initNode,termNode)', () => {
            it('reutns the dijkstra entry for the termNode', function() {
                expect(myGraph.shortestPath(v1, v2) instanceof Object).toBeTrue();
            });
        });
    });
});