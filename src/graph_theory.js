/**
 * @module GraphTheory
 */
var Injector = require('./graphTheory/dependency_injector')();
var Node = require('./graphTheory/node');
var RobustArray = require('./graphTheory/robust_array');
var NodeArray = require('./graphTheory/node_array');
var DirectedEdge = require('./graphTheory/directed_edge');
var Edge = require('./graphTheory/edge');
var EdgeArray = require('./graphTheory/edge_array');
var ComponentArray = require('./graphTheory/component_array');
var Graph = require('./graphTheory/graph');

Injector.register('NodeClass', Node);
Injector.register('RobustArray', RobustArray);
Injector.factory('NodeArray', NodeArray);
Injector.factory('ComponentArray', ComponentArray);
Injector.factory('Edge', Edge);
Injector.factory('EdgeArray', EdgeArray);
Injector.factory('Graph', Graph);

Injector.retrieve('Graph');
exports.NodeArray = Injector.retrieve('NodeArray');

exports.Node = Injector.retrieve("NodeClass");
exports.RobustArray = Injector.retrieve("RobustArray");
exports.NodeArray = Injector.retrieve("NodeArray");
// exports.DirectedEdge = Injector.retrieve("DirectedEdge");
exports.Edge = Injector.retrieve("Edge");
exports.EdgeArray = Injector.retrieve("EdgeArray");
exports.ComponentArray = Injector.retrieve("ComponentArray");
exports.Graph = Injector.retrieve("Graph");