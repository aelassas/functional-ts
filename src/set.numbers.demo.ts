/**
 * set.numbers.demo.ts
 * Author: Akram El Assas
 * License: CPOL
 *
*/

/*
 * Load set.core, set.common and set.numbers to perfom the demo.
 *
*/
import * as core from './set.core'
import * as common from './set.common'
import * as numbers from './set.numbers'

/**
 * Empty set
*/
console.log('\nEmpty set:')
console.log('Is 7 in {}? ', common.empty<number>()(7))

/**
 * Set All
*/
console.log('\nSet All:')
console.log('Is 7 in integers set? ', common.all<number>()(7))

/**
 * Singleton set
*/
console.log('\nSingleton set:')
console.log('Is 7 in the singleton set {0}? ', common.singleton(0)(7))
console.log('Is 7 in the singleton set {7}? ', common.singleton(7)(7))

/**
 * Even numbers set
*/
console.log('\nEven numbers set:')
console.log('Is 99 in even numbers set? ', numbers.even(99))
console.log('Is 998 in even numbers set? ', numbers.even(998))

/**
 * Odd numbers set
*/
console.log('\nOdd numbers set:')
console.log('Is 99 in odd numbers set? ', numbers.odd(99))
console.log('Is 998 in odd numbers set? ', numbers.odd(998))

/**
 * Multiples of 3 set
*/
console.log('\nMultiples of 3 set:')
console.log('Is 99 in multiples of 3 set? ', numbers.multipleOfThree(99))
console.log('Is 998 in multiples of 3 set? ', numbers.multipleOfThree(998))

/**
 * Multiples of 5 set
*/
console.log('\nMultiples of 5 set:')
console.log('Is 15 in multiples of 5 set? ', numbers.multipleOfFive(15))
console.log('Is 998 in multiples of 5 set? ', numbers.multipleOfFive(998))

/**
 * Primes set
*/
console.log('\nPrimes set:')
console.log('Is 2 in primes set? ', numbers.prime(2))
console.log('Is 4 in primes set? ', numbers.prime(4))
console.log('The 10 001st prime number is ', numbers.getPrime(10001))

/**
 * Union
 *
*/
console.log('\nUnion:')
console.log('Is 7 in the union of Even and Odd Integers Set? ', core.union(numbers.even, numbers.odd)(7))

/**
 * Intersection
 *
*/
console.log('\nIntersection:')
const multiplesOfThreeAndFive = core.intersection(numbers.multipleOfThree, numbers.multipleOfFive)
console.log('Is 15 a multiple of 3 and 5? ', multiplesOfThreeAndFive(15))
console.log('Is 10 a multiple of 3 and 5? ', multiplesOfThreeAndFive(10))

/**
 * Cartesian product
 *
*/
console.log('\nCartesian Product:')
const cp = core.cartesianProduct(numbers.multipleOfThree, numbers.multipleOfFive)
console.log('Is (9, 15) in MultipleOfThree x MultipleOfFive? ', cp(9, 15))

/**
 * Compelemnt
 *
*/
console.log('\nComplement:')
const c = core.complement(numbers.multipleOfThree, numbers.multipleOfFive)
console.log('Is 15 in MultipleOfThree \\ MultipleOfFive set? ', c(15))
console.log('Is 9 in MultipleOfThree \\ MultipleOfFive set? ', c(9))

/**
 * Symetric difference without Xor
 *
*/
console.log('\nSymmetricDifference without XOR:')
const sdWithoutXor = core.symmetricDifferenceWithoutXor(numbers.prime, numbers.even)
console.log('Is 2 in the symetric difference of prime and even Sets? ', sdWithoutXor(2))
console.log('Is 4 in the symetric difference of prime and even Sets? ', sdWithoutXor(4))
console.log('Is 7 in the symetric difference of prime and even Sets? ', sdWithoutXor(7))

/**
 * Symetric difference with Xor
 *
*/
console.log('\nSymmetricDifference with XOR:')
const sdWithXor = core.symmetricDifferenceWithXor(numbers.prime, numbers.even)
console.log('Is 2 in the symetric difference of prime and even Sets? ', sdWithXor(2))
console.log('Is 4 in the symetric difference of prime and even Sets? ', sdWithXor(4))
console.log('Is 7 in the symetric difference of prime and even Sets? ', sdWithXor(7))

/**
 * Contains
 *
*/
console.log('\nContains:')
console.log('Is 7 in the singleton {0}? ', core.contains(common.singleton(0), 7))
console.log('Is 7 in the singleton {7}? ', core.contains(common.singleton(7), 7))

/**
 * Add
 *
*/
console.log('\nAdd:')
console.log('Is 7 in {0, 7}? ', core.add<number>(common.singleton(0), 7)(7))
console.log('Is 0 in {1, 0}? ', core.add<number>(common.singleton(1), 0)(0))
console.log('Is 7 in {19, 0}? ', core.add<number>(common.singleton(19), 0)(7))

/**
 * Remove
 *
*/
console.log('\nRemove:')
console.log('Is 7 in {}? ', core.remove<number>(common.singleton(0), 0)(7))
console.log('Is 0 in {}? ', core.remove<number>(common.singleton(7), 7)(0))
