## Changelog
## 0.0.0-alpha – 2016-07-18 
### Added
* modules each export a function that takes a list of dependencies and return the appropriate class
* removes .assign[Dependency] from each class
### Changed
### Removed

## 4.0.0-alpha – 2016-07-18 
### Added
* Prototypal dependency assignment via static .assign[ClassName] for greater extensibility
* RobustArray module acts as a mixin for set theory methods
* RobustArray#SetifyType(BaseType) creates a set of out a base type of elements
* RobustArray#filter, #splice, #slice, #concat and #union leverage this.constructor to return an instance of the proper subclass.
* Node, Edge, and Graph constructors call instance methods cleaner extensibility, looser coupling 
* NodeArray extends RobustArray with Node class
* Node constructor now calls #setData and #setLabel with args
* Edge#constructNodes sets the #nodes attribute to NodeArray
* Edge#constructor delegates to #constructNodes
* Edge#nabeArray returns the neighboring node as a NodeArray with single element
* EdgeArray extends RobustArray with Edge class
* EdgeArray#getNeighbors leverages Edge#nabeArray to return proper NodeArray
* EdgeArray#edgesByArray uses this.constructor to infer proper EdgeArray
* ComponentArray implements RobustArray with NodeArray to group separate sets of nodes
* Graph delegates component management to the components array
* ComponentArray#hasIntersectingComponent, #findIntersectingComponent, #mergeComponents, #integrateComponent
* Graph#constructNodes to establish #nodes as NodeArray
* Graph#constructEdges to establish #edges as EdgeArray
* Graph#subGraph returns a dynamic instance (via this.constructor) with an optional set of nodes
* * Graph#subGraphByEdges returns a new instance with an optional set of edges

###Changed
* Graph#subGraphByNodes -> #SubGraph

## 3.0.1-alpha – 2016-07-03 
### Added
* Graph#containsComponent checks for equivalent components
* Graph#createEdge creates a new Edge between nodes

###Changed
* Graph#addComponent checks for components are not equivalent
* Graph#addEdge imports nodes and then pushes the edge
* Graph#clearNodes removes all edges first then clears node array


## 3.0.0-alpha – 2016-07-02
### Added
* Node#setlabel with random number
* Node#isEquivalent checks label
* NodeArray#hasSameSize
* NodeArray#isEquivalent
* NodeArray#filter, #slice, #splice, #concat coerce return type to NodeArray
* NodeArray#removeNode, #copy
* Edge#setLabel for more flexible subclassing
* EdgeArray#filter, #slice, #splice, and #concat return subclass
* EdgeArray#edgeByNodes retrives an edge containing both nodes
* EdgeArray#edgeByArray retrives all edges containing the specified nodes
* EdgeArray#edgesWithNode retrives all edge containing a specific node
* EdgeArray#removeEdge, #copy
* Graph#add, #contains, #remove, and #clear for both edges and nodes
* Graph#pathNodes to retrieve NodeArray from path keys
* Graph#depthFirstSearch -> #dfs
* Graph#visitPath
* Graph#subGraphByEdges for multiple explorations of a set of node connections
* Graph#subGraphByNodes for connectionless explorations of a set of nodes

### Changed
* Graph class delegates many methods to Arrayv subclasses
* Graph#getUnvisitedNeighbors refactored to use NodeArray#difference
* Edge#isEquivalent now checks by nodeArray instead of label
* Node#isIdentical -> isEquivalent
* NodeArray#difference no longer returns symmetrical difference
* NodeArray#unionize utilizes new difference
* NodeArray#isSubSet, #hasSameSize, #isEquivalent
* EdgeArray#isSubSet, #hasSameSize, #isEquivalent
* NodeArray#unionize returns modified nodeArray
* NodeArray#push returns the array object
* NodeArray#nodeComplement returns a nodearray without specified node
* EdgeArray#difference no longer returns symmetrical difference
* EdgeArray#unionize utilizes new difference
* EdgeArray#excludeNode returns the neighbor as an array
* EdgeArray#push returns the array object


### Deprecated

### Removed
* Graph#visitComponent
* Graph#depthTraverse
* Component and EdgeComponent classes completely replaced by NodeArray


## 2.1.0-alpha – 2016-06-16
### Added
* Graph.dijkstra() now assembles shortest path to all nodes
* Graph.shortestPath() via 
* Graph.bfs & depthTraverse methods
* Component classes to check dynamic connectivity.

### Changed
* methods to use es6 syntax

### Deprecated
* Graph.depthSearch

### Removed
* Graph.depthSearch(),depthVisit(), and breadthSearch()
* Vertex class
