/**
 * Constructs [An Array Subclass]{@link module:GraphTheory.RobustArray}
 * @memberOf! module:GraphTheory
 * @param  {Function} BaseType the data type/Class of objects stored in this array
 * @return {Function}      [The resulting RobustArray Class]{@link module:GraphTheory.RobustArray}
 */
function RobustArrayFactory(BaseType) {
    /**
     * a type-specific array class implementing set theory
     * @exports RobustArray
     * @constructor
     * @memberOf! module:GraphTheory
     * @extends Array
     */
    let RobustArray = class extends Array {
        /**
         * @memberof!module: GraphTheory.RobustArray#
         * @inner
         * checks the data type of the new element
         * @param  {Object} argObj
         * @return {Boolean}
         */
        isValid(argObj) {
            return argObj instanceof BaseType;
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * @return {Boolean} is the array length 0
         */
        isEmpty() {
            return this.length === 0;
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * checks for presence of an element in this set
         * @param  {Object} argObj
         * @return {Boolean}
         */
        contains(argObj) {
            return this.some(el => el.isEquivalent(argObj));
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * appends an element to this array if passes the type validator and is not already present
         * @param  {Object} argObj
         * @return {RobustArray}  the current array
         */
        push(argObj) {
            if ((this.isValid(argObj) && !(this.contains(argObj)))) {
                super.push(argObj);
            }
            return this;
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * coerces return type to a RobustArray after delegating to Native Array#filter
         * @param  {...Object} args JS Native Array#filter arguments
         * @return {RobustArray}
         */
        filter(...args) {
            return this.constructor.from(super.filter(...args));
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * coerces return type to a RobustArray after delegating to Native Array#slice
         * @param  {...Object} args JS Native Array#slice arguments
         * @return {RobustArray}
         */
        slice(...args) {
            return this.constructor.from(super.slice(...args));
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * coerces return type to a RobustArray after delegating to Native Array#concat
         * @param  {...Object} args JS Native Array#concat arguments
         * @return {RobustArray}
         */
        concat(...args) {
            return this.constructor.from(super.concat(...args));
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * coerces return type to a RobustArray after delegating to Native Array#splice
         * @param  {...Object} args JS Native Array#splice arguments
         * @return {RobustArray}
         */
        splice(...args) {
            return this.constructor.from(super.splice(...args));
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * @param  {RobustArray}  altArray
         * @return {Boolean}   do the arrays have the same length
         */
        hasSameSize(altArray) {
            return this.length === altArray.length;
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * @param  {Object}  altArray
         * @return {Boolean} does the altArray contain every element of the receiver
         */
        isSubset(altArray) {
            return this.every(myObj => altArray.contains(myObj));
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * @param  {Object}  altArray
         * @return {Boolean}   do the argument nad receiver share length and elements
         */
        isEquivalent(altArray) {
            return (this.hasSameSize(altArray) && this.isSubset(altArray));
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * returns the first element which is equivalent to the argument
         * @param  {Object}  altArray
         * @return {?Object}
         */
        findEquivalentElement(argObj) {
            return this.find(el => el.isEquivalent(argObj));
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * removes the argument from the array
         * @param  {Object}  argObj
         * @return {(Object|Boolean)}
         */
        removeElement(argObj) {
            let eqIdx = this.findIndex(el => el.isEquivalent(argObj));
            return eqIdx > -1 && this.splice(eqIdx, 1);
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * removes all elements from the array
         * @param  {Object}  altArray
         * @return {RobustArray} the newly empty array
         */
        clear() {
            this.splice(0);
            return this;
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * @return {RobustArray} a copy of this array
         */
        copy() {
            return this.slice(0);
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * checks for presence of shared elements between two sets
         * @param  {RobustArray} altArray the array to check
         * @return {Boolean}
         */
        intersects(altArray) {
            return this.some(currEl => altArray.contains(currEl) === true);
        }

        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * returns an array shared elements between two sets
         * @param  {RobustArray} altArray the array to check
         * @return {RobustArray} the shared elements
         */
        intersection(altArray) {
            return this.filter(currEl => altArray.contains(currEl) === true);
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * @param  {RobustArray} altArray the array to check
         * @return {Boolean} does the caller have any element not included in the argument
         */
        hasDistinctElements(altArray) {
            return this.some(myObj => !altArray.contains(myObj));
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * returns an array elements in this array not included in the alternate array
         * @param  {RobustArray} altArray the array to check
         * @return {RobustArray} the unshared elements
         */
        difference(altArray) {
            return this.filter(n => !altArray.contains(n));
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * returns a combined array of elements contained in the receiver or altArray
         * @param  {RobustArray} altArray
         * @return {RobustArray}
         */
        union(altArray) {
            let uArray = new this.constructor();
            this.forEach(currEl => uArray.push(currEl));
            altArray.forEach(altElem => uArray.push(altElem));
            return uArray;
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * combines all the elements from altArray into the receiver
         * @param  {RobustArray} altArray
         * @return {RobustArray} the receiver
         */
        unionize(altArray) {
            altArray.difference(this).forEach(dNode => this.push(dNode));
            return this;
        }
        /**
         * @memberof! module:GraphTheory.RobustArray#
         * @inner
         * @param  {Object} exElem the element to exclude
         * @return {RobustArray} all of the elements in this object excluding exElem
         */
        excludeElement(exElem) {
            return this.filter(el => el != exElem);
        }

    };
    /**
     * [A RobustArray]{@link module:GraphTheory.RobustArray}
     * @typedef {module:GraphTheory.RobustArray} RobustArray
     */
    return RobustArray;
}
/**
 * [A RobustArrayFactory]{@link module:GraphTheory.RobustArrayFactory}
 * @typedef {module:GraphTheory.RobustArrayFactory} RobustArrayFactory
 * @exports RobustArray
 */
module.exports.SetifyType = RobustArrayFactory;