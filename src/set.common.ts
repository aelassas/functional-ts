/**
 * set.common.ts
 * Author: Akram El Assas
 * License: CPOL
*/

/* functors
****************************************/

/**
 * Empty set
*/
export const empty = <T>() => (e: T) => false

/**
 * Set All
*/
export const all = <T>() => (e: T) => true

/**
 * Singleton set
*/
export const singleton = <T>(x: T) => (y: T) => x === y
