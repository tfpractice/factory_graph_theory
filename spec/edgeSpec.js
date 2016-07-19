describe('Edge', function() {
    var GR = require('../src/graph_theory');
    var Node = GR.Node;
    var NodeArray = GR.NodeArray(Node);
    var Edge = GR.Edge(NodeArray, Node);

    var myEdge, altEdge, la, nyc, dc;
    beforeAll(function() {
        console.log('\n.........Edge Spec.........');
    });
    beforeEach(function() {
        la = new Node("LA");
        nyc = new Node("NYC");
        dc = new Node("DC");
        myEdge = new Edge(nyc, la, 10);
        altEdge = new Edge(nyc, dc, 10);
    });
    // describe('#assignNodeArray(NAClass)', function() {
    //     describe('when given a new class dependency ', () => {
    //         class tempNodeArray extends NodeArray {}
    //         tempNodeArray.assignNode();
    //         class SubEdge extends Edge {}
    //         SubEdge.assignNodeArray(tempNodeArray);
    //         it('sets NodeArray onto protoype', function() {
    //             expect(SubEdge.prototype.NodeArray).toBe(tempNodeArray);
    //         });
    //         it('sets Node property onto protoype', function() {
    //             expect(SubEdge.prototype.Node).toBe(tempNodeArray.prototype.Node);
    //         });
    //         it('modifies all dependent methods to use the proper NodeArray class', function() {
    //             myEdge.establishNodes(nyc, la);
    //             expect(myEdge.nodes instanceof NodeArray).toBeTrue();
    //             let mySubEdge = new SubEdge(nyc, la);
    //             let sNodes = mySubEdge.nodes;
    //             expect(sNodes instanceof tempNodeArray).toBeTrue();
    //         });
    //     });
    // });
    describe('init', function() {
        it('initializes with a nodes array[NodeArray]', function() {
            expect(myEdge.nodes instanceof NodeArray).toBeTrue();
        });
        it('initializes with a label[String]', function() {
            expect(myEdge.label).toBeString();
        });
        it('initializes with a weight', function() {
            expect(myEdge.weight).toEqual(10);
        });
        describe('when initialized without params', () => {
            var dEdge;
            beforeEach(function() {
                dEdge = new Edge();
            });
            it('initializes with anonymous nodes ', function() {
                expect(dEdge.nodes[0].label).toBeUndefined();
            });
            it('initializes with label "undefined_undefined" dest', function() {
                expect(dEdge.label).toBeString();
            });
            it('initializes with default weight 0', function() {
                expect(dEdge.weight).toBe(0);
            });
        });
    });
    describe('#establishNodes(n1,n2)', function() {
        it('sets the nodes attribute to a NodeArray of the arguments', function() {
            myEdge.establishNodes(nyc, la);
            expect(myEdge.nodes).toContain(nyc, la);
        });
    });
    describe('isEquivalent(edgeArg)', () => {
        it('returns true if the edgeArg shares a label with the edgeArg', function() {
            expect(myEdge.isEquivalent(altEdge)).toBeFalse();
        });
    });
    describe('#setLabel()', function() {
        it('sets the label to a combination of the node labels', function() {
            var myLabel = myEdge.nodes[0].label + '_' + myEdge.nodes[1].label;
            // console.log(myLabel);
            expect(myEdge.label).toEqual(myLabel);
        });
    });
    describe('#hasSameNodes', () => {
        it('checks if there are no distinct nodes between each edges NodeArray', function() {
            let identical = new Edge(la, nyc, 10);
            expect(myEdge.hasSameNodes(identical)).toBeTrue();
        });
    });
    describe('containsNode', function() {
        it('retuns true if the specified node is in this edge', function() {
            expect(myEdge.containsNode(la)).toBeTrue();
        });
    });
    describe('getNeighbor', function() {
        it('returns the edges alternate endpoint ', function() {
            expect(myEdge.getNeighbor(la)).toEqual(nyc);
        });
    });
    describe('#nabeArray', function() {
        it('returns the neighboring node as a NodeArray ', function() {
            expect(myEdge.nabeArray(nyc)).toBeArray();
            expect(myEdge.nabeArray(nyc)).toContain(la);
        });
    });
});