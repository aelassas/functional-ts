/**
 * set.common.js 
 * Author: Akram El Assas
 * License: CPOL
*/

/* functors
****************************************/

/**
 * Empty set
*/
export const empty = <T>() => (_: T) => false

/**
 * Set All
*/
export const all = <T>() => (_: T) => true

/**
 * Singleton set
*/
export const singleton = <T>(x: T) => (y: T) => x === y 
