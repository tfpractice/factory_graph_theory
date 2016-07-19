describe('EdgeArray', function() {
    var GR = require('../src/graph_theory');
    var Node = GR.Node;
    var NodeArray = GR.NodeArray(Node);
    var Edge = GR.Edge(NodeArray, Node);

    var EdgeArray = GR.EdgeArray(Edge, NodeArray, Node);
    var myEdge, altEdge, la, nyc, dc, myArray;
    var e0, e1, e2, e3, e4, n00, n01, n10, n11, n20, n21, n30, n31, bArray, cArray;
    beforeAll(function() {
        console.log('\n.........EdgeArray Spec.........');
    });
    beforeEach(function() {
        la = new Node("LA");
        nyc = new Node("NYC");
        dc = new Node("DC");
        myEdge = new Edge(nyc, la, 10);
        altEdge = new Edge(nyc, dc, 10);
        myArray = new EdgeArray(myEdge);
    });
    // describe('#assignEdge', function() {
    //     describe('when given a new class dependency ', () => {
    //         class tempNodeArray extends NodeArray {}
    //         tempNodeArray.assignNode();
    //         class SubEdge extends Edge {}
    //         SubEdge.assignNodeArray(tempNodeArray);
    //         class SEA extends EdgeArray {}
    //         SEA.assignEdge(SubEdge);
    //         it('sets Edge onto protoype', function() {
    //             expect(SEA.prototype.Edge).toBe(SubEdge);
    //         });
    //         it('sets NodeArray onto protoype', function() {
    //             expect(SEA.prototype.NodeArray).toBe(tempNodeArray);
    //         });
    //         it('sets Node property onto protoype', function() {
    //             expect(SEA.prototype.Node).toBe(tempNodeArray.prototype.Node);
    //         });
    //     });
    // });
    describe('init', function() {
        it('is a typeof Array', function() {
            expect(myArray instanceof Array).toBeTrue();
        });
    });
    describe('contains()', () => {
        it('checks if any of the elements are equivalent to that provided', function() {
            expect(myArray.contains(myEdge)).toBeTrue();
        });
    });
    describe('isValid(argEdge', () => {
        it('returns true if argEdge is an instanceof Edge', function() {
            expect(myArray.isValid(myEdge)).toBeTrue();
        });
    });
    describe('push(argEdge) ', () => {
        describe('when argEdge is an instanceof Edge', () => {
            it('calls super [Array.push] and returns modified array', function() {
                var currLength = myArray.length;
                let newEdge = new Edge(dc, la);
                var newLength = currLength + 1;
                expect(myArray.push(newEdge)).toEqual(myArray);
            });
        });
        describe('when argEdge is not an instanceof Edge', () => {
            it('returns the unmodified array', function() {
                expect(myArray.push(2)).toBeArray();
            });
            it('does not increment length', function() {
                var currLength = myArray.length;
                myArray.push(2);
                expect(myArray.length).toEqual(currLength);
            });
        });
    });
    describe('#removeElement', () => {
        it('removes and Edge from the array', function() {
            myArray.removeElement(myEdge);
            expect(myArray.contains((myEdge))).toBeFalse();
        });
    });
    describe('#clear', function() {
        it('empties and returns the array ', function() {
            expect(myArray.clear()).toBeEmptyArray();
        });
    });
    describe('#copy', () => {
        it('returns a slices of the array from start to end', function() {
            expect(myArray.copy()).toEqual(myArray);
        });
    });
    describe('getNodes', () => {
        it('maps each of the edges nodes to a new nodeArray  ', function() {
            let theNodes = myArray.getNodes();
            let xEdges = new EdgeArray();
            expect(myArray.getNodes() instanceof NodeArray).toBeTrue();
        });
    });
    describe('#nodeMap', function() {
        describe('when the array is empty', () => {
            it('returns am empty NodeArray', function() {
                let xEdges = new EdgeArray();
                expect(xEdges.nodeMap() instanceof NodeArray).toBeTrue();

            });
        });
        describe('when array is not empty', () => {
            it('returns a native Array of each edges nodes', function() {
                expect(myArray.nodeMap() instanceof Array).toBeTrue();

            });
        });

    });
    describe('#getNeighbors(node)', function() {
        describe('when there are edges that contain the argument', () => {
            it('returns a NodeArray of neighboring nodes', function() {
                myArray.push(altEdge);
                expect(myArray.getNeighbors(nyc)).toContain(dc);
                expect(myArray.getNeighbors(nyc) instanceof NodeArray).toBeTrue();
            });
        });
        describe('when there are No edges that contain the argument', () => {
            it('returns an empty NodeArray', function() {
                let xArray = new EdgeArray();
                // myArray.push(altEdge);
                // expect(xArray.getNeighbors(nyc)).toContain(dc);
                expect(xArray.getNeighbors(nyc) instanceof NodeArray).toBeTrue();
            });
        });
    });
    describe('#edgeByNodes(n1, n2)', () => {
        it('retrieves an edge containing both nodes', function() {
            let nla = myArray.edgeByNodes(nyc, la);
            expect(nla).toBe(myEdge);
        });
    });
    describe('#edgesWithNode(node)', function() {
        it('returns all edges containing the specified node', function() {
            expect(myArray.edgesWithNode(nyc)).toContain(myEdge);
        });
    });

    describe('set and species methods', () => {
        beforeEach(function() {
            n00 = new Node("00");
            n01 = new Node("01");
            n10 = new Node("10");
            n11 = new Node("11");
            n20 = new Node("20");
            n21 = new Node("21");
            n30 = new Node("30");
            n31 = new Node("31");
            e0 = new Edge(n00, n01);
            e1 = new Edge(n10, n11);
            e2 = new Edge(n20, n21);
            e3 = new Edge(n30, n31);
            e4 = new Edge(n20, n01);
            bArray = new EdgeArray(e0);
            bArray.push(e1);
            cArray = new EdgeArray(e2);
            cArray.push(e3);
        });
        describe('set methods', function() {
            describe('intersection(altArray)', function() {
                it('retuns an array of edges shared by two nodeArrays', function() {
                    expect(bArray.intersection(cArray)).toBeArray();
                });
            });
            describe('intersects', function() {
                it('determines if two arrays share any edges', function() {
                    bArray.push(e3);
                    expect(bArray.intersects(cArray)).toBeTrue();
                });
            });
            describe('difference', function() {
                it('returns an array of edges in the caller not contained in the argument', function() {
                    expect(bArray.difference(cArray)).toBeArray();
                });
            });
            describe('hasDistinctElements', function() {
                it('determines if there are distinct nodes between arrays', function() {
                    expect(bArray.hasDistinctElements(cArray)).toBeTrue();
                });
            });
            describe('#isEquivalent', function() {
                it('returns true if arrays are of same size and are subsets of each other', function() {
                    let subArray = new EdgeArray(e0);
                    let subArray2 = new EdgeArray(e0);
                    expect(subArray2.isEquivalent(subArray)).toBeTrue();
                });
            });
            describe('#isSubset', () => {
                it('returns true if every node in the callers is in the argument', function() {
                    let subArray = new EdgeArray(e1);
                    expect(subArray.isSubset(bArray)).toBeTrue();
                });
            });
            describe('#hasSameSize', () => {
                it('returns if the arrays share length', function() {
                    expect(bArray.hasSameSize(cArray)).toBeTrue();
                });
            });
            describe('union', function() {
                it('returns an array of all nodes between two array', function() {
                    expect(bArray.union(cArray)).toBeArray();
                });
            });
            describe('unionize', function() {
                it('combines the nodes of both arrays', function() {
                    var edgeUnion = bArray.union(cArray);
                    bArray.unionize(cArray);
                    expect(bArray).toEqual(edgeUnion);
                });
                it('returns the modified array', function() {
                    let uArr = bArray.unionize(cArray);
                    expect(uArr).toBeArray();
                });
            });
        });
        describe('return type @@species', () => {
            var myMutable;
            beforeEach(function() {
                myMutable = new EdgeArray();
                myMutable.push(myEdge);
                myMutable.push(e1);
                myMutable.push(e2);
                myMutable.push(e3);
                myMutable.push(e4);
            });
            describe('#filter', () => {
                it('returns a new EdgeArray', function() {
                    fArr = myMutable.filter(currEdge => myArray.contains(currEdge) === true);
                    expect(fArr instanceof EdgeArray).toBeTrue();
                });
            });
            describe('#slice', () => {
                it('returns a new nodeArray', function() {
                    firstFour = myMutable.slice(0, 3);
                    expect(firstFour instanceof EdgeArray).toBeTrue();
                });
            });
            describe('#splice', () => {
                it('returns a new nodeArray', function() {
                    firstFour = myMutable.splice(0, 4);
                    expect(firstFour instanceof EdgeArray).toBeTrue();
                });
            });
            describe('#concat', () => {
                it('returns a new nodeArray', function() {
                    firstFour = myMutable.splice(0, 4);
                    let newArr = myMutable.concat(firstFour);
                    expect(newArr instanceof EdgeArray).toBeTrue();
                });
            });
            describe('#edgesByArray', () => {
                it('returns all edges which contain each of the nodes in the array', function() {
                    myMutable.push(e0);
                    let myNarr = NodeArray.of(n01, n21);
                    let mySubSet = myMutable.edgesByArray(myNarr);
                    expect(mySubSet.length).toEqual(3);
                });
            });
        });
    });
});