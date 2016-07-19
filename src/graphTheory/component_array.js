var NodeArray = require('./node_array');
var RobustArray = require('./robust_array');
module.exports = function(NodeArray, NodeClass) {
    let Node = NodeClass;
    /**
     * represents a set of NodeArrays
     * @exports ComponentArray
     * @constructor
     * @memberOf! module:GraphTheory
     * @extends {RobustArray}
     */
    class ComponentArray extends RobustArray.SetifyType(NodeArray) {
        /**
         * adds a component to the graph if not present
         * @param {Component} compArg
         */
        push(compArg) {
            return this.integrateComponent(compArg) || super.push(compArg);
        }
        /**
         * checks if any components (excluding the argument) share nodes with the argument
         * @param  {Component}  compArg
         * @return {Boolean}
         */
        hasIntersectingComponent(compArg) {
            return this.excludeElement(compArg).some(currComp => currComp.intersects(compArg));
        }
        /**
         * returns the first component (excluding the argument) which intersect with compArg
         * @param  {Component} compArg the component to be checked
         * @return {Component} the first intersecting component
         */
        findIntersectingComponent(compArg) {
            return this.excludeElement(compArg).find(currComp => currComp.intersects(compArg));
        }
        /**
         * combines the nodes of two intersecting components into orrgComp, and removes newComp
         * @param  {Component} origComp the component taking precedence
         * @param  {Component} newComp the component to be removed
         */
        mergeComponents(origComp, newComp) {
            this.removeElement(newComp);
            return origComp.unionize(newComp);
        }
        /**
         * integrates a component into any of the arrays intersecting components
         * @param  {Component} compArg
         */
        integrateComponent(compArg) {
            let iComp = this.findIntersectingComponent(compArg);
            return (!!iComp) && this.mergeComponents(iComp, compArg);
        }

    };
    /**
     * [An Set of mutually exclusive NodeArrays]{@link module:GraphTheory.ComponentArray}
     * @typedef {module:GraphTheory.ComponentArray} ComponentArray
     */
    return ComponentArray;
};