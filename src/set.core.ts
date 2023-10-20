/**
 * set.core.js  
 * Author: Akram El Assas
 * License: CPOL
*/

/* functors
****************************************/

type Set<T> = (x: T) => boolean

/**
 * Union
 *
*/
export const union = <T>(e: Set<T>, f: Set<T>) => (x: T) => e(x) || f(x)

/**
 * Intersection
 *
*/
export const intersection = <T>(e: Set<T>, f: Set<T>) => (x: T) => e(x) && f(x)

/**
 * Cartesian product
 *
*/
export const cartesianProduct = <T1, T2>(e: Set<T1>, f: Set<T2>) => (x: T1, y: T2) => e(x) && f(y)

/**
 * Compelemnt
 *
*/
export const complement = <T>(e: Set<T>, f: Set<T>) => (x: T) => e(x) && !f(x)

/**
 * Symetric difference without Xor
 *
*/
export const symmetricDifferenceWithoutXor = <T>(e: Set<T>, f: Set<T>) => (x: T) => union(complement<T>(e, f), complement(f, e))(x)

/**
 * Symetric difference with Xor
 *
*/
export const symmetricDifferenceWithXor = <T>(e: Set<T>, f: Set<T>) => (x: T) => e(x) !== f(x)

/**
 * Contains
 *
*/
export const contains = <T>(e: Set<T>, x: T) => e(x)

/**
 * Add
 *
*/
export const add = <T>(e: Set<T>, y: T) => (x: T) => x === y || e(x)

/**
 * Remove
 *
*/
export const remove = <T>(e: Set<T>, y: T) => (x: T) => x !== y && e(x) 
