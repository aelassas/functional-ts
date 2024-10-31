import * as core from '../src/set.core'
import * as common from '../src/set.common'
import * as numbers from '../src/set.numbers'

describe('Test empty set', () => {
  it('should test empty set', () => {
    expect(common.empty<number>()(7)).toBeFalsy()
  })
})

describe('Test set all', () => {
  it('should test set all', () => {
    expect(common.all<number>()(7)).toBeTruthy()
  })
})

describe('Test singleton set', () => {
  it('should test singleton set', () => {
    expect(common.singleton(0)(7)).toBeFalsy()
    expect(common.singleton(7)(7)).toBeTruthy()
  })
})

describe('Test even numbers set', () => {
  it('should test even numbers set', () => {
    expect(numbers.even(99)).toBeFalsy()
    expect(numbers.even(998)).toBeTruthy()
  })
})

describe('Test odd numbers set', () => {
  it('should test odd numbers set', () => {
    expect(numbers.odd(99)).toBeTruthy()
    expect(numbers.odd(998)).toBeFalsy()
  })
})

describe('Test Multiples of 3 set', () => {
  it('should test Multiples of 3 set', () => {
    expect(numbers.multipleOfThree(99)).toBeTruthy()
    expect(numbers.multipleOfThree(998)).toBeFalsy()
  })
})

describe('Test Multiples of 5 set', () => {
  it('should test Multiples of 5 set', () => {
    expect(numbers.multipleOfFive(15)).toBeTruthy()
    expect(numbers.multipleOfFive(998)).toBeFalsy()
  })
})

describe('Test Primes set', () => {
  it('should test Primes set', () => {
    expect(numbers.prime(2)).toBeTruthy()
    expect(numbers.prime(4)).toBeFalsy()
    expect(numbers.getPrime(10001)).toBe(104743)
  })
})

describe('Test union', () => {
  it('should test union', () => {
    expect(core.union(numbers.even, numbers.odd)(7)).toBeTruthy()
  })
})

describe('Test intersection', () => {
  it('should test intersection', () => {
    const multiplesOfThreeAndFive = core.intersection(numbers.multipleOfThree, numbers.multipleOfFive)
    expect(multiplesOfThreeAndFive(15)).toBeTruthy()
    expect(multiplesOfThreeAndFive(10)).toBeFalsy()
  })
})

describe('Test Cartesian product', () => {
  it('should test Cartesian product', () => {
    const cp = core.cartesianProduct(numbers.multipleOfThree, numbers.multipleOfFive)
    expect(cp(9, 15)).toBeTruthy()
    expect(cp(10, 15)).toBeFalsy()
    expect(cp(9, 10)).toBeTruthy()
  })
})

describe('Test Complement', () => {
  it('should test Complement', () => {
    const c = core.complement(numbers.multipleOfThree, numbers.multipleOfFive)
    expect(c(15)).toBeFalsy()
    expect(c(9)).toBeTruthy()
  })
})

describe('Test Symetric difference without Xor', () => {
  it('should test Symetric difference without Xor', () => {
    const sdWithoutXor = core.symmetricDifferenceWithoutXor(numbers.prime, numbers.even)
    expect(sdWithoutXor(2)).toBeFalsy()
    expect(sdWithoutXor(4)).toBeTruthy()
    expect(sdWithoutXor(7)).toBeTruthy()
  })
})

describe('Test Symetric difference with Xor', () => {
  it('should test Symetric difference with Xor', () => {
    const sdWithXor = core.symmetricDifferenceWithXor(numbers.prime, numbers.even)
    expect(sdWithXor(2)).toBeFalsy()
    expect(sdWithXor(4)).toBeTruthy()
    expect(sdWithXor(7)).toBeTruthy()
  })
})

describe('Test Contains', () => {
  it('should test Contains', () => {
    expect(core.contains(common.singleton(0), 7)).toBeFalsy()
    expect(core.contains(common.singleton(7), 7)).toBeTruthy()
  })
})

describe('Test Add', () => {
  it('should test Add', () => {
    expect(core.contains(common.singleton(0), 7)).toBeFalsy()
    expect(core.add<number>(common.singleton(0), 7)(7)).toBeTruthy()
    expect(core.add<number>(common.singleton(1), 0)(0)).toBeTruthy()
    expect(core.add<number>(common.singleton(19), 0)(7)).toBeFalsy()
  })
})

describe('Test Remove', () => {
  it('should test Remove', () => {
    expect(core.remove<number>(common.singleton(0), 0)(7)).toBeFalsy()
    expect(core.remove<number>(common.singleton(7), 7)(0)).toBeFalsy()
    expect(core.remove<number>(common.all<number>(), 0)(0)).toBeFalsy()
    expect(core.remove<number>(common.all<number>(), 0)(7)).toBeTruthy()
  })
})
