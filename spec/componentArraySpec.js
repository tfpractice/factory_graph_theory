describe('ComponentArray', function() {
    var GR = require('../src/graph_theory');
    var Node = GR.Node;
    var NodeArray = GR.NodeArray;
    var Edge = GR.Edge;
    var ComponentArray = GR.ComponentArray;
    var EdgeArray = GR.EdgeArray;
    const Graph = GR.Graph;
    let myGraph, gNodes, n0, nabe0, e0, e1, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12;
    let nabes1, nabes2, nabes3, nabes6, nabes7, comp1, comp6, comp7;
    let myComponents;
    beforeAll(function() {
        console.log('\n.........ComponentArray Spec.........');
    });
    describe('connected components', function() {
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
            nabes1 = myGraph.getNeighbors(v1);
            nabes1.push(v1);
            nabes2 = myGraph.getNeighbors(v2);
            nabes3 = myGraph.getNeighbors(v3);
            nabes6 = myGraph.getNeighbors(v6);
            // nabes7 = myGraph.getNeighbors(v7);
            myComponents = new ComponentArray();
        });
        // describe('#assignNodeArray(NAClass)', function() {
        //     describe('when given a new class dependency ', () => {
        //         class tempNodeArray extends NodeArray {}
        //         tempNodeArray.assignNode();
        //         class SubCompArray extends ComponentArray {}
        //         SubCompArray.assignNodeArray(tempNodeArray);
        //         it('sets NodeArray onto protoype', function() {
        //             expect(SubCompArray.prototype.NodeArray).toBe(tempNodeArray);
        //         });
        //         it('sets Node property onto protoype', function() {
        //             expect(SubCompArray.prototype.Node).toBe(tempNodeArray.prototype.Node);
        //         });
        //         it('returns the augmented function', function() {
        //             expect(SubCompArray.assignNodeArray(tempNodeArray)).toBe(SubCompArray);
        //         });
        //     });
        // });
        describe('#push', () => {
            describe('when there is no intersecting component', () => {
                it('pushes a NodeArray to the components array', function() {
                    myComponents.push(nabes1);
                    myComponents.push(nabes6);
                    expect(myComponents.length).toEqual(2);
                });
                it('returns the ComponentArray', function() {
                    expect(myComponents.push(nabes1)).toBe(myComponents);
                });
            });
            describe('when there is an intersecting component', () => {
                it('integrates the component with the intersecting component', function() {
                    myComponents.push(nabes1);
                    myComponents.push(nabes2);
                    expect(myComponents.length).toEqual(1);
                });
                it('returns the ComponentArray', function() {
                    expect(myComponents.push(nabes1)).toBe(myComponents);
                });
            });
        });
        describe('#contains()', function() {
            it('returns a boolean checking for presence of equivalent component', function() {
                myComponents.push(nabes1);
                expect(myComponents.contains(nabes1)).toBeTrue();
            });
        });
        describe('#removeElement', () => {
            it('splices a NodeArray from the components array', function() {
                myComponents.push(nabes1);
                myComponents.removeElement(nabes1);
                expect(myComponents).not.toContain(nabes1);
            });
        });
        describe('hasIntersectingComponent(compArg)', () => {
            it('returns a boolean regarding any DISTINCT components already present', function() {
                myComponents.push(nabes1);
                expect(myComponents.hasIntersectingComponent(nabes2)).toBeTrue();
            });
        });
        describe('findIntersectingComponent(compArg)', function() {
            describe('when there is an intersecting component', () => {
                it('returns the component intersecting with the specified compArg', function() {
                    myComponents.push(nabes1);
                    expect(myComponents.findIntersectingComponent(nabes2)).toEqual(nabes1);
                });
            });
            describe('when there is no intersecting component', () => {
                it('returns undefined', function() {
                    expect(myComponents.findIntersectingComponent(nabes2)).toBeUndefined();
                });
            });
        });
        describe('mergeComponents)origComp, newComp)', function() {
            beforeEach(function() {
                myComponents.push(nabes1);
                myComponents.mergeComponents(nabes1, nabes2);
            });
            it('unionizes the two components ', function() {
                expect(nabes2.isSubset(nabes1)).toBeTrue();
            });
            it('removes the newComp arg', function() {
                expect(myComponents).not.toContain(nabes2);
            });
            it('returns the augmented component', function() {
                expect(myComponents.mergeComponents(nabes1, nabes2)).toBe(nabes1);
            });
        });
        describe('#integrateComponent(compArg)', function() {
            describe('when there is no intersecting component', () => {
                it('returns false', function() {
                    myComponents.integrateComponent(nabes6);
                    expect(myComponents.integrateComponent(nabes6)).toBeFalse();
                });
            });
            describe('when there is an intersecting component', () => {
                it('find an intersecting component and merges it with compArg', function() {
                    myComponents.push(nabes1);
                    myComponents.integrateComponent(nabes2);
                    expect(myComponents.length).toEqual(1);
                });
            });
        });
    });
});