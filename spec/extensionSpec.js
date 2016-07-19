// describe('Graph', function() {
//     var GR = require('../src/graph_theory');
//     var Node = GR.Node;
//     var Edge = GR.Edge;
//     var NodeArray = GR.NodeArray;
//     var EdgeArray = GR.EdgeArray;
//     var ComponentArray = GR.ComponentArray;
//     var Graph = GR.Graph;
//     var SubNode, SubEdge, SubNodeArray, SubEdgeArray, SubComponentArray, SubGraph;
//     beforeAll(function() {
//         console.log('\n.........Extensions Spec.........');
//         SubNode = class SubNode extends Node {}
//         SubNodeArray = class SubNodeArray extends NodeArray {}
//         SubComponentArray = class SubComponentArray extends ComponentArray {}
//         SubEdge = class SubEdge extends Edge {}
//         SubEdgeArray = class SubEdgeArray extends EdgeArray {}
//         SubGraph = class SubGraph extends Graph {}
//     });
//     describe('#assign[dependency]', function() {
//         beforeAll(function() {
//             SubNodeArray.assignNode(SubNode);
//             SubComponentArray.assignNodeArray(SubNodeArray);
//             SubEdge.assignNodeArray(SubNodeArray);
//             SubEdgeArray.assignEdge(SubEdge);
//             SubGraph.assignEdgeArray(SubEdgeArray);
//         });
//         describe('[Sub]Graph ', () => {
//             it('sets EdgeArray onto protoype', function() {
//                 expect(SubGraph.prototype.EdgeArray).toBe(SubEdgeArray);
//                 expect(SubGraph.prototype.EdgeArray).not.toBe(EdgeArray);
//             });
//             describe('[Sub]EdgeArray ', () => {
//                 it('sets Edge onto protoype', function() {
//                     expect(SubEdgeArray.prototype.Edge).toBe(SubEdge);
//                     expect(SubGraph.prototype.Edge).toBe(SubEdge);
//                     expect(SubEdgeArray.prototype.Edge).not.toBe(Edge);
//                     expect(SubGraph.prototype.Edge).not.toBe(Edge);
//                 });
//                 it('sets NodeArray onto protoype', function() {
//                     expect(SubEdge.prototype.NodeArray).toBe(SubNodeArray);
//                     expect(SubComponentArray.prototype.NodeArray).toBe(SubNodeArray);
//                     expect(SubEdgeArray.prototype.NodeArray).toBe(SubNodeArray);
//                     expect(SubGraph.prototype.NodeArray).toBe(SubNodeArray);
//                     expect(SubGraph.prototype.NodeArray).not.toBe(NodeArray);
//                 });
//                 it('sets Node property onto protoype', function() {
//                     expect(SubNodeArray.prototype.Node).toBe(SubNode);

//                     expect(SubEdge.prototype.NodeArray).toBe(SubNodeArray);
//                     expect(SubComponentArray.prototype.NodeArray).toBe(SubNodeArray);
//                     expect(SubEdgeArray.prototype.NodeArray).toBe(SubNodeArray);
//                     expect(SubGraph.prototype.NodeArray).toBe(SubNodeArray);
//                     expect(SubGraph.prototype.Node).toBe(SubNodeArray.prototype.Node);
//                     expect(SubGraph.prototype.Node).not.toBe(Node);
//                 });
//             });
//         });
//     });
// });