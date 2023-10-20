/**
 * set.numbers.js 
 * Author: Akram El Assas
 * License: CPOL
*/

/**
 * Even numbers set
*/
export const even = function (x: number) { return x % 2 === 0 }

/**
 * Odd numbers set
*/
export const odd = function (x: number) { return x % 2 === 1 }

/**
 * Multiples of 3 set
*/
export const multipleOfThree = function (x: number) { return x % 3 === 0 }

/**
 * Multiples of 5 set
*/
export const multipleOfFive = function (x: number) { return x % 5 === 0 }

/**
 * Primes set
*/
export const prime = function (x: number) {
  if (x <= 1) return false
  if (x < 4) return true
  if (x % 2 === 0) return false
  if (x < 9) return true
  if (x % 3 === 0) return false
  const sqrt = Math.sqrt(x)
  for (let i = 5; i <= sqrt; i += 6) {
    if (x % i === 0) return false
    if (x % (i + 2) === 0) return false
  }
  return true
}

/**
 * Primes generator
 *
*/
export const getPrime = function (p: number) {
  for (let i = 1, count = 0; ; i++) {
    if (prime(i)) count++
    if (count === p) return i
  }
}
