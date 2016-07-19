/**
 * represent a Node
 * @exports Node
 * @constructor
 * @memberOf module:GraphTheory
 * @param {String} label  [label property]{@link module:GraphTheory.Node#label}
 * @param {Object} data the nodes data
 */
class Node {
    constructor(label, data) {
        this.setLabel(label);
        this.setData(data);
    }
    /**
     * sets the node's label attribute
     * @param {String} lbl
     */
    setLabel(lbl) {
        /**
         * the node identifier
         * @type {String}
         */
        return this.label = lbl;
    }
    /**
     * sets the node's data attribute
     * @param {Object} d
     */
    setData(d) {
        /**
         * the node data
         * @type {Object}
         */
        return this.data = d || {};
    }
    /**
     * Checks for identity via label attribute
     * @param  {Node}  newNode the node to be compared
     * @return {Boolean}
     */
    isEquivalent(newNode) {
        return this.label === newNode.label;
    }
}

/**
 * [A Node]{@link module:GraphTheory.Node}
 * @typedef {module:GraphTheory.Node} Node
 */
module.exports = Node;