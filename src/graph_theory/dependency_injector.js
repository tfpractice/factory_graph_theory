var argsList = require('args-list');
/**
 * [An Injector]{@link module:GraphTheory.Injector}
 * @typedef {module:GraphTheory.Injector} Injector
 */
/**
 *
 * @return {Injector} a container managing dependencies for each of the classes
 */
module.exports = function Injector() {
    /**
     * a key value store of all classes
     * @type {Object}
     */
    var dependencies = {};
    /**
     * the facotries creating each type
     * @type {Object}
     */
    var factories = {};
    /**
     * the containter object that will build the dependency tree
     * @type {Object}
     */
    var container = {};
    /**
     * sets the factory module given name
     * @param  {String} name the name of the factory producing the class
     * @param  {Function} fMod the function/module that produces the class
     */
    container.factory = function setFactory(name, fMod) {
        factories[name] = fMod;

    };
    /**
     * registers a dependency with a module
     * @param  {Stinrg} name the name of the dependency
     * @param  {Fucntion} dep  the source file/function of the dependency
     */
    container.register = function register(name, dep) {
        dependencies[name] = dep;
    }
    /**
     * calls the factory method on the specified module and retrieves all depenencues before returning the requested class
     * @param  {Sting} name The name of the class to be returned
     * @return {Function}      the class requested
     */
    container.retrieve = function retrieve(name) {
        if (!dependencies[name]) {
            let factory = factories[name];
            dependencies[name] = factory && container.inject(factory);
            if (!dependencies[name]) {
                throw new Error('Cannot find module: ' + name);
            }
        }
        return dependencies[name];
    }
    /**
     * injects the dependencies of each module via calling it's method
     * @param  {Function} factory The class creating factory
     * @return {Function}         the class requested
     */
    container.inject = function inject(factory) {
        let fArgs = argsList(factory).map(depArg => container.retrieve(depArg));
        return factory.apply(null, fArgs);
    };
    return container;
};