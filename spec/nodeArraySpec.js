describe('NodeArray', function() {
    var GR = require('../src/graph_theory');
    var Node = GR.Node;
    var NodeArray = GR.NodeArray;
    var myNode, myArray, myAltArray, n1, n2, n3, n4;
    beforeAll(function() {
        console.log('\n.........NodeArray Spec.........');
    });
    beforeEach(function() {
        n1 = new Node("n1", 0);
        n2 = new Node("n2", 1);
        n3 = new Node("n3", 2);
        n4 = new Node("n4", 3);
        myNode = new Node("NYC", {
            name: "NYC"
        });
        myArray = new NodeArray(myNode);
        myArray.push(n3);
        myArray.push(n4);
        myAltArray = new NodeArray(n1);
        myAltArray.push(n2);
        myAltArray.push(n3);
    });
    describe('init', function() {
        it('is a typeof Array', function() {
            expect(myArray instanceof Array).toBeTrue();
        });
    });
    describe('return type @@species', () => {
        var myMutable;
        beforeEach(function() {
            myMutable = new NodeArray();
            for (let i = 0; i < 10; i++) {
                let newNode = new Node(`n${i}`, i);
                myMutable.push(newNode);
            }
        });
        describe('#filter', () => {
            it('returns a new nodeArray', function() {
                fArr = myMutable.filter(currEdge => myArray.contains(currEdge) === true);
                expect(fArr instanceof NodeArray).toBeTrue();
            });
        });
        describe('#slice', () => {
            it('returns a new nodeArray', function() {
                firstFour = myMutable.slice(0, 4);
                expect(firstFour instanceof NodeArray).toBeTrue();
            });
        });
        describe('#splice', () => {
            it('returns a new nodeArray', function() {
                firstFour = myMutable.splice(0, 4);
                expect(firstFour instanceof NodeArray).toBeTrue();
            });
        });
        describe('#concat', () => {
            it('returns a new nodeArray', function() {
                firstFour = myMutable.splice(0, 4);
                let newArr = myMutable.concat(firstFour);
                expect(newArr instanceof NodeArray).toBeTrue();
            });
        });
    });
    describe('contains()', () => {
        it('checks if any of the elements are equivalent to that provided', function() {
            expect(myArray.contains(myNode)).toBeTrue();
        });
    });
    describe('#removeElement(nArg)', () => {
        it('removes a node from the array', function() {
            myArray.removeElement(n3);
            expect(myArray.contains(n3)).toBeFalse();
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
    describe('isValid(argNode', () => {
        it('returns true if argNode is an instanceof Node', function() {
            expect(myArray.isValid(myNode)).toBeTrue();
        });
    });
    describe('push(argNode) ', () => {
        describe('when argNode is an instanceof Node', () => {
            it('calls super [Array.push] and returns modified array', function() {
                var currLength = myArray.length;
                let newNode = new Node('newNode');
                var newLength = currLength + 1;
                expect(myArray.push(newNode)).toEqual(myArray);
            });
        });
        describe('when argNode is not an instanceof Node', () => {
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
    describe('intersection(altArray)', function() {
        it('retuns an array of nodes shared by two nodeArrays', function() {
            expect(myArray.intersection(myAltArray)).toBeArray();
        });
    });
    describe('intersects', function() {
        it('determines if two arrays share any nodes', function() {
            expect(myArray.intersects(myAltArray)).toBeTrue();
        });
    });
    describe('difference', function() {
        it('returns an array of nodes contained in the caller but not in the argument', function() {
            expect(myArray.difference(myAltArray)).toBeArray();
        });
    });
    describe('hasDistinctElements', function() {
        it('determines if caller has nodes that argument does not', function() {
            expect(myArray.hasDistinctElements(myAltArray)).toBeTrue();
        });
    });
    describe('#isEquivalent', function() {
        it('returns true if arrays are of same size and are subsets of each other', function() {
            let subArray = new NodeArray(myNode);
            let subArray2 = new NodeArray(myNode);
            expect(subArray2.isEquivalent(subArray)).toBeTrue();
        });
    });
    describe('#isSubset', () => {
        it('returns true if every node in the callers is in the argument', function() {
            let subArray = new NodeArray(myNode);
            expect(subArray.isSubset(myArray)).toBeTrue();
        });
    });
    describe('#hasSameSize', () => {
        it('returns if the arrays share length', function() {
            expect(myArray.hasSameSize(myAltArray)).toBeTrue();
        });
    });
    describe('union', function() {
        it('returns an array of all nodes between two array', function() {
            expect(myArray.union(myAltArray)).toBeArray();
        });
    });
    describe('unionize', function() {
        it('combines the nodes of both arrays', function() {
            myArray.unionize(myAltArray);
            var nodeUnion = myArray.union(myAltArray);
            expect(myArray).toEqual(nodeUnion);
        });
        it('retuns the modified array', function() {
            let uArr = myArray.unionize(myAltArray);
            var nodeUnion = myArray.union(myAltArray);
            expect(uArr).toBeArray();
        });
    });
});