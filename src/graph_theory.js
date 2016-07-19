/**
 * @module GraphTheory
 */
var Injector = require('./graph_theory/dependency_injector')();
var Node = require('./graph_theory/node');
var RobustArray = require('./graph_theory/robust_array_factory');
var NodeArray = require('./graph_theory/node_array_factory');
var DirectedEdge = require('./graph_theory/directed_edge');
var Edge = require('./graph_theory/edge_factory');
var EdgeArray = require('./graph_theory/edge_array_factory');
var ComponentArray = require('./graph_theory/component_array_factory');
var Graph = require('./graph_theory/graph_factory');

Injector.register('NodeClass', Node);
Injector.register('RobustArray', RobustArray);
Injector.factory('NodeArray', NodeArray);
Injector.factory('ComponentArray', ComponentArray);
Injector.factory('Edge', Edge);
Injector.factory('EdgeArray', EdgeArray);
Injector.factory('Graph', Graph);

Injector.retrieve('Graph');

exports.Node = Injector.retrieve("NodeClass");
exports.NodeArray = Injector.retrieve('NodeArray');
exports.RobustArray = Injector.retrieve("RobustArray");
exports.NodeArray = Injector.retrieve("NodeArray");
exports.Edge = Injector.retrieve("Edge");
exports.EdgeArray = Injector.retrieve("EdgeArray");
exports.ComponentArray = Injector.retrieve("ComponentArray");
exports.Graph = Injector.retrieve("Graph");