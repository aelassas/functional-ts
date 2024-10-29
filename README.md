[![build](https://github.com/aelassas/functional-ts/actions/workflows/build.yml/badge.svg)](https://github.com/aelassas/functional-ts/actions/workflows/build.yml)

![Image](https://github.com/aelassas/functional-ts/blob/main/img/Article.PNG?raw=true)

## Contents

1.  [Introduction](#intro)
2.  [TypeScript Environment](#env)
3.  [Representing Data Through Functions](#rep-data)
    1.  [Sets](#sets)
    2.  [Binary Operations](#bin-op)
    3.  [Go Further](#func-go-further)
4.  [Euclidean Plane](#plane)
    1.  [Drawing a Disk](#disk)
    2.  [Drawing Horizontal and Vertical Half-planes](#half-plane)
    3.  [Functions](#func)
    4.  [Go Further](#plane-further)
5.  [Fractals](#fractals)
    1.  [Complex Numbers and Drawing](#fractals-draw)
    2.  [Mandelbrot Fractal](#fractals-mondlebrot)
    3.  [Go Further](#fractals-further)

## <a id="intro" name="intro">Introduction</a>

In TypeScript, functions are nothing but objects. Hence, functions can be constructed, passed as parameter, returned from functions or assigned into variables. Thus, TypeScript has [first-class functions](http://en.wikipedia.org/wiki/First-class_function). More precisely, TypeScript supports the following:

*   Higher-order functions arguments
*   Higher-order functions results
*   Nested functions
*   Anonymous functions
*   Closures
*   Partial application (ECMAScript 5)

This article will not discuss the basics of functional programming, as you can find numerous resources on this topic on the Internet. Instead, it will talk about functional programming in TypeScript applied to algebra, numbers, the Euclidean plane, and fractals. The examples provided in this article will start from simple to more complex but always illustrated in a simple, straightforward and easy-to-understand manner.

## <a id="env" name="env">TypeScript Environment</a>

To run the source code, you'll need to install [Node.js](https://nodejs.org/en). Once Node.js is installed, download the source code archive, unzip it, go to the source code folder you unzipped on a terminal, set up TypeScript environment and install all necessary dependencies with the following command:

```bash
npm install
```

To run numbers' demo, run the following command:

```bash
npm run numbers
```

To run Euclidean plane's demo, run the following command:

```bash
npm run plane
```

To run fractals' demo, run the following command:

```bash
npm run fractals
```

## <a id="rep-data" name="rep-data">Representing Data Through Functions</a>

Let `S` be any set of elements `a`, `b`, `c` ... (for instance, the books on the table or the points of the Euclidean plane) and let `S'` be any subset of these elements (for instance, the green books on the table or the points in the circle of radius 1 centered at the origin of the Euclidean plane).

The [Characteristic Function](http://en.wikipedia.org/wiki/Indicator_function) `S'(x)` of the set `S'` is a function which associates either `true` or `false` with each element `x` of `S`.

```
S'(x) = true if x is in S'
S'(x) = false if x is not in S'
```

Let `S` be the set of books on the table and let `S'` be the set of green books on the table. Let `a` and `b` be two green books, and let `c` and `d` be two red books on the table. Then:

```
S'(a) = S'(b) = true
S'(c) = S'(d) = false
```

Let `S` be the set of the points in the Euclidean plane and let `S'` be the set of the points in the circle of radius 1 centered at the origin of the Euclidean plane (0, 0) (unit circle). Let `a` and `b` be two points in the unit circle, and let `c` and `d` be two points in a circle of radius 2 centered at the origin of the Euclidean plane. Then:

```
S'(a) = S'(b) = true
S'(c) = S'(d) = false
```

Thus, any set `S'` can always be represented by its _Characteristic Function_. A function that takes as argument an element and returns `true` if this element is in `S'`, `false` otherwise. In other words, a set (abstract data type) can be represented through a function in TypeScript.

```
type Set<T> = (x: T) => boolean
```

In the next sections, we will see how to represent some fundamental sets in the algebra of sets through TypeScript in a functional way, then we will define generic binary operations on sets. We will then apply these operations on numbers then on subsets of the Euclidean plane. Sets are abstract data structures, the subsets of numbers and the subsets of the Euclidean plane are the representation of abstract data-structures, and finally the binary operations are the generic logics that works on any representation of the abstract data structures.

### <a id="sets" name="sets">Sets</a>

This section introduces the representation of some fundamental sets in the algebra of sets through TypeScript.

### Empty set

![Image](https://github.com/aelassas/functional-ts/blob/main/img/EmptySet.png?raw=true)

Let `E` be the empty set and `Empty` its _Characteristic function_. In algebra of sets, `E` is the unique set having no elements. Therefore, `Empty` can be defined as follows:

```
Empty(x) = false if x is in E
Empty(x) = false if x is not in E
```

Thus, the representation of `E` in TypeScript can be defined as follows:

```js
const empty = <T>() => (e: T) => false
```

In algebra of sets, `Empty` is represented as follows:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/EmptySetCharacteristicFunction.png?raw=true)

Thus, running the code below:

```js
console.log('\nEmpty set:')
console.log('Is 7 in {}?', common.empty<number>()(7))
```

gives the following results:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/EmptySetDemo.PNG?raw=true)

### Set All

![Image](https://github.com/aelassas/functional-ts/blob/main/img/AllSet.png?raw=true)

Let `S` be a set and `S'` be the subset of `S` that contains all the elements and `All` its _Characteristic function_. In algebra of sets, `S'` is the full set that contains all the elements. Therefore, `All` can be defined like this:

```
All(x) = true if x is in S
```

Thus, the representation of `S'` in TypeScript can be defined as follows:

```js
const all = <T>() => (e: T) => true
```

In algebra of sets, `All` is represented as follows:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/AllSetCharacteristicFunction.png?raw=true)

Thus, running the code below:

```js
console.log('\nSet All:')
console.log('Is 7 in integers set?', common.all<number>()(7))
```

gives the following results:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/AllSetDemo.png?raw=true)

### Singleton Set

Let `E` be the Singleton set and `Singleton` its _Characteristic function_. In algebra of sets, `E` also known as unit set, or 1-tuple is a set with exactly one element `e`. Therefore, `Singleton` can be defined as follows:

```
Singleton(x) = true if x is e
Singleton(x) = false if x is not e
```

Thus, the representation of `E` in TypeScript can be defined as follows:

```js
const singleton = <T>(x: T) => (y: T) => x === y
```

Thus, running the code below:

```js
console.log('\nSingleton set:')
console.log('Is 7 in the singleton set {0}?', common.singleton(0)(7))
console.log('Is 7 in the singleton set {7}?', common.singleton(7)(7)
```

gives the following results:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/SingletonSetDemo.png?raw=true)

### Other Sets

This section presents subsets of the integers set.

#### Even Numbers

Let `E` be the set of even numbers and `Even` its _Characteristic function_. In mathematics, an even number is a number which is a multiple of two. Therefore, `Even` can be defined as follows:

```
Even(x) = true if x is a multiple of 2
Even(x) = false if x is not a multiple of 2
```

Thus, the representation of `E` in TypeScript can be defined as follows:

```js
const even = (x: number) => x % 2 === 0
```

Thus, running the code below:

```js
console.log('\nEven numbers set:')
console.log('Is 99 in even numbers set?', numbers.even(99))
console.log('Is 998 in even numbers set?', numbers.even(998))
```

gives the following results:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/EvenSetDemo.PNG?raw=true)

#### Odd Numbers

Let `E` be the set of odd numbers and `Odd` its _Characteristic function_. In mathematics, an odd number is a number which is not a multiple of two. Therefore, `Odd` can be defined as follows:

```
Odd(x) = true if x is not a multiple of 2
Odd(x) = false if x is a multiple of 2
```

Thus, the representation of `E` in TypeScript can be defined as follows:

```js
const odd = (x: number) => x % 2 === 1
```

Thus, running the code below:

```js
console.log('\nOdd numbers set:')
console.log('Is 99 in odd numbers set?', numbers.odd(99))
console.log('Is 998 in odd numbers set?', numbers.odd(998))
```

gives the following results:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/OddSetDemo.PNG?raw=true)

#### Multiples of 3

Let `E` be the set of multiples of 3 and `MultipleOfThree` its _Characteristic function_. In mathematics, a multiple of 3 is a number divisible by 3\. Therefore, `MultipleOfThree` can be defined as follows:

```
MultipleOfThree(x) = true if x is divisible by 3
MultipleOfThree(x) = false if x is not divisible by 3
```

Thus, the representation of `E` in TypeScript can be defined as follows:

```jsconst multipleOfThree = (x: number) => x % 3 === 0```

Thus, running the code below:

```js
console.log('\nMultiples of 3 set:')
console.log('Is 99 in multiples of 3 set?', numbers.multipleOfThree(99))
console.log('Is 998 in multiples of 3 set?', numbers.multipleOfThree(998))
```

gives the following results:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/MultiplesOf3SetDemo.PNG?raw=true)

#### Multiples of 5

Let `E` be the set of multiples of 5 and `MultipleOfFive` its _Characteristic function_. In mathematics, a multiple of 5 is a number divisible by 5\. Therefore, `MultipleOfFive` can be defined as follows:

```
MultipleOfFive(x) = true if x is divisible by 5
MultipleOfFive(x) = false if x is not divisible by 5
```

Thus, the representation of `E` in TypeScript can be defined as follows:

```jsconst multipleOfFive = (x: number) => x % 5 === 0```

Thus, running the code below:

```js
console.log('\nMultiples of 5 set:')
console.log('Is 15 in multiples of 5 set?', numbers.multipleOfFive(15))
console.log('Is 998 in multiples of 5 set?', numbers.multipleOfFive(998))
```

gives the following results:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/MultiplesOf5SetDemo.PNG?raw=true)

#### Prime Numbers

A long time ago, when I was playing with [Project Euler](http://projecteuler.net/) problems, I had to resolve the following one:

```
By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, 
we can see that the 6th prime is 13.
What is the 10 001st prime number?
```

To resolve this problem, I first had to write a fast algorithm that checks whether a given number is prime or not. Once the algorithm written, I wrote an iterative algorithm that iterates through primes until the 10 001st prime number was found.

Let `E` be the set of primes and `Prime` its _Characteristic function_. In mathematics, a prime is a natural number greater than 1 that has no positive divisors other than 1 and itself. Therefore, `Prime` can be defined as follows:

```
Prime(x) = true if x is prime
Prime(x) = false if x is not prime
```

Thus, the representation of `E` in TypeScript can be defined as follows:

```js
const prime = (x: number) => {
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
```

Thus, running the code below to resolve our problem:

```js
console.log('\nPrimes set:')
console.log('Is 2 in primes set?', numbers.prime(2))
console.log('Is 4 in primes set?', numbers.prime(4))
console.log('The 10 001st prime number is', numbers.getPrime(10001))
```

where `getPrime` is defined below:

```js
const getPrime = (p: number) => {
  for (let i = 1, count = 0; ; i++) {
    if (prime(i)) count++
    if (count === p) return i
  }
}
```

gives the following results:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/PrimesSetDemo.PNG?raw=true)

### <a id="bin-op" name="bin-op">Binary Operations</a>

This section presents several fundamental operations for constructing new sets from given sets and for manipulating sets. Below the [Ven diagram](http://en.wikipedia.org/wiki/Venn_diagram) in the algebra of sets.

![Image](https://github.com/aelassas/functional-ts/blob/main/img/Logical_connectives_Hasse_diagram.png?raw=true)

### Union

![Image](https://github.com/aelassas/functional-ts/blob/main/img/UnionOperation.png?raw=true)

Let `E` and `F` be two sets. The _union_ of `E` and `F`, denoted by `E U F` is the set of all elements which are members of either `E` and `F`.

Let `Union` be the _union_ operation. Thus, the `Union` operation can be implemented as follows in TypeScript:

```js
const union = <T>(e: Set<T>, f: Set<T>) => (x: T) => e(x) || f(x)
```

Running the code below:

```js
console.log('\nUnion:')
console.log('Is 7 in the union of Even and Odd Integers Set?', core.union(numbers.even, numbers.odd)(7))
```

gives the following results:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/UnionOperationDemo.png?raw=true)

### Intersection

![Image](https://github.com/aelassas/functional-ts/blob/main/img/IntersectionOperation.png?raw=true)

Let `E` and `F` be two sets. The _intersection_ of `E` and `F`, denoted by `E n F` is the set of all elements which are members of both `E` and `F`.

Let `Intersection` be the _intersection_ operation. Thus, the `Intersection` operation can be implemented as follows in TypeScript:

```jsconst intersection = <T>(e: Set<T>, f: Set<T>) => (x: T) => e(x) && f(x)```

Running the code below:

```js
console.log('\nIntersection:')
const multiplesOfThreeAndFive = core.intersection(numbers.multipleOfThree, numbers.multipleOfFive)
console.log('Is 15 a multiple of 3 and 5?', multiplesOfThreeAndFive(15))
console.log('Is 10 a multiple of 3 and 5?', multiplesOfThreeAndFive(10))
```

gives the following results:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/IntersectionOperationDemo.png?raw=true)

### Cartesian Product

![Image](https://github.com/aelassas/functional-ts/blob/main/img/CartesianProductOperation.png?raw=true)

Let `E` and `F` be two sets. The _cartesian product_ of `E` and `F`, denoted by `E × F` is the set of all ordered pairs `(e, f)` such that `e` is a member of `E` and `f` is a member of `F`.

Let `CartesianProduct` be the _cartesian product_ operation. Thus, the `CartesianProduct` operation can be implemented as follows in TypeScript:

```js
const cartesianProduct = <T1, T2>(e: Set<T1>, f: Set<T2>) => (x: T1, y: T2) => e(x) && f(y)
```

Running the code below:

```js
console.log('\nCartesian Product:')
const cp = core.cartesianProduct(numbers.multipleOfThree, numbers.multipleOfFive)
console.log('Is (9, 15) in MultipleOfThree x MultipleOfFive? ', cp(9, 15))
```

gives the following results:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/CartesianProductOperationDemo.PNG?raw=true)

### Complements

![Image](https://github.com/aelassas/functional-ts/blob/main/img/ComplementOperation.png?raw=true)

Let `E` and `F` be two sets. The _relative complement_ of `F` in `E`, denoted by `E \ F` is the set of all elements which are members of `E` but not members of `F`.

Let `Complement` be the _relative complement_ operation. Thus, the `Complement` operation can be implemented as follows in TypeScript:

```js
const complement = <T>(e: Set<T>, f: Set<T>) => (x: T) => e(x) && !f(x)```

Running the code below:

```js
console.log('\nComplement:')
const c = core.complement(numbers.multipleOfThree, numbers.multipleOfFive)
console.log('Is 15 in MultipleOfThree \\ MultipleOfFive set? ', c(15))
console.log('Is 9 in MultipleOfThree \\ MultipleOfFive set? ', c(9))
```

gives the following results:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/ComplementOperationDemo.PNG?raw=true)

### Symmetric Difference

![Image](https://github.com/aelassas/functional-ts/blob/main/img/SymetricDifference.png?raw=true)

Let `E` and `F` be two sets. The _symmetric difference_ of `E` and `F`, denoted by `E Δ F` is the set of all elements which are members of either `E` and `F` but not in the intersection of `E` and `F`.

Let `SymmetricDifference` be the _symmetric difference_ operation. Thus, the `SymmetricDifference` operation can be implemented in two ways in TypeScript. A trivial way is to use the union and complement operations as follows:

```js
const symmetricDifferenceWithoutXor = <T>(e: Set<T>, f: Set<T>) => 
      (x: T) => union(complement<T>(e, f), complement(f, e))(x)
```

Another way is to use the `XOR` binary operation as follows:

```js
const symmetricDifferenceWithXor = <T>(e: Set<T>, f: Set<T>) => (x: T) => e(x) !== f(x)
```

Running the code below:

```js
console.log('\nSymmetricDifference without XOR:')
const sdWithoutXor = core.symmetricDifferenceWithoutXor(numbers.prime, numbers.even)
console.log('Is 2 in the symetric difference of prime and even Sets? ', sdWithoutXor(2))
console.log('Is 4 in the symetric difference of prime and even Sets? ', sdWithoutXor(4))
console.log('Is 7 in the symetric difference of prime and even Sets? ', sdWithoutXor(7))

console.log('\nSymmetricDifference with XOR:')
const sdWithXor = core.symmetricDifferenceWithXor(numbers.prime, numbers.even)
console.log('Is 2 in the symetric difference of prime and even Sets? ', sdWithXor(2))
console.log('Is 4 in the symetric difference of prime and even Sets? ', sdWithXor(4))
console.log('Is 7 in the symetric difference of prime and even Sets? ', sdWithXor(7))
```

gives the following results:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/SymetricDifferenceDemo.png?raw=true)

### Other Operations

This section presents other useful binary operations on sets.

#### Contains

Let `Contains` be the operation that checks whether or not an element is in a set. This operation is a function that takes as parameter an element and returns `true` if the element is in the set, `false` otherwise.

Thus, this operation is defined as follows in TypeScript:

```js
const contains = <T>(e: Set<T>, x: T) => e(x)
```

Therefore, running the code below:

```js
console.log('\nContains:')
console.log('Is 7 in the singleton {0}? ', core.contains(common.singleton(0), 7))
console.log('Is 7 in the singleton {7}? ', core.contains(common.singleton(7), 7))
```

gives the following result:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/ContainsOperationDemo.PNG?raw=true)

#### Add

Let `Add` be the operation that adds an element to a set. This operation is a function that takes as parameter an element and adds it to the set.

Thus, this operation is defined as follows in TypeScript:

```js
const add = <T>(e: Set<T>, y: T) => (x: T) => x === y || e(x)
```

Therefore, running the code below:

```js
console.log('\nAdd:')
console.log('Is 7 in {0, 7}? ', core.add<number>(common.singleton(0), 7)(7))
console.log('Is 0 in {1, 0}? ', core.add<number>(common.singleton(1), 0)(0))
console.log('Is 7 in {19, 0}? ', core.add<number>(common.singleton(19), 0)(7))
```

gives the following result:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/AddOperationDemo.PNG?raw=true)

#### Remove

Let `Remove` be the operation that removes an element from a set. This operations is a function that takes as parameter an element and removes it from the set.

Thus, this operation is defined as follows in TypeScript:

```js
const remove = <T>(e: Set<T>, y: T) => (x: T) => x !== y && e(x)
```

Therefore, running the code below:

```js
console.log('\nRemove:')
console.log('Is 7 in {}? ', core.remove<number>(common.singleton(0), 0)(7))
console.log('Is 0 in {}? ', core.remove<number>(common.singleton(7), 7)(0))
```

gives the following result:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/RemoveOperationDemo.PNG?raw=true)

### <a id="func-go-further" name="func-go-further">For Those Who Want To Go Further</a>

You can see how easy we can do some algebra of sets in TypeScript through _Functional Programming_. In the previous sections was shown the most fundamental definitions. But, If you want to go further, you can think about:

*   Relations over sets
*   Abstract algebra, such as monoids, groups, fields, rings, K-vectorial spaces and so on
*   Inclusion-exclusion principle
*   Russell's paradox
*   Cantor's paradox
*   Dual vector space
*   Theorems and Corollaries

## <a id="plane" name="plane">Euclidean Plane</a>

In the previous section, the fundamental concepts on sets were implemented in TypeScript. In this section, we will practice the concepts implemented on the Euclidean plane.

### <a id="disk" name="disk">Drawing a Disk</a>

![Image](https://github.com/aelassas/functional-ts/blob/main/img/Disk.png?raw=true)

A disk is a subset of a plane bounded by a circle. There are two types of disks. _Closed_ disks which are disks that contain the points of the circle that constitutes its boundary, and _Open_ disks which are disks that do not contain the points of the circle that constitutes its boundary.

In this section, we will set up the _Characterstic function_ of the _Closed_ disk and draw it in a HTML5 page.

To set up the _Characterstic function_, we first need a function that calculates the _Euclidean Distance_ between two points in the plane. This function is implemented as follows:

```js
function distance(p1: Point, p2: Point) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}
```

where `Point` is defined below:

```js
class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}
```

This formula is based on Pythagoras' Theorem.

![Image](https://github.com/aelassas/functional-ts/blob/main/img/Pythagorean_theorem_abc.png?raw=true)

where `c` is the _Euclidean distance_, `a²` is `(p1.X - p2.X)²` and `b²` is `(p1.Y - p2.Y)²`.

Let `Disk` be the _Characteristic function_ of a closed disk. In algebra of sets, the definition of a closed disk in the reals set is as follows:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/ClosedDiskDefinition.PNG?raw=true)

where `a` and `b` are the coordinates of the center and `R` the radius.

Thus, the implementation of `Disk` in TypeScript is as follows:

```js
const disk = (center: Point, radius: number) => (p: Point) => distance(p, center) <= radius
```

In order to view the set in a HTML5 page, I decided to implement a function `draw` that draws a set in the _Euclidean plane_. I chose _HTML5_ and thus used the `canvas` element for drawing.

Thus, I've built the _Euclidean plane_ illustrated below through the method `draw`.

![Image](https://github.com/aelassas/functional-ts/blob/main/img/EuclideanPlane.png?raw=true)

Below the implementation of the plane.

```js
class Plane {
  width: number
  height: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  draw(set: PlaneSet, canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    if (!canvas) throw new Error(`Canvas with id ${canvasId} not found`)
    canvas.width = this.width
    canvas.height = this.height
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const semiWidth = this.width / 2
    const semiHeight = this.height / 2
    const xMin = -semiWidth
    const xMax = semiWidth
    const yMin = -semiHeight
    const yMax = semiHeight
    for (let x = 0; x < this.width; x++) {
      const xp = xMin + (x * (xMax - xMin)) / this.width
      for (let y = 0; y < this.height; y++) {
        const yp = yMax - (y * (yMax - yMin)) / this.height
        if (set(new Point(xp, yp))) context.fillRect(x, y, 1, 1)
      }
    }
  }

  clear(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    if (!canvas) throw new Error(`Canvas with id ${canvasId} not found`)
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    context.clearRect(0, 0, this.width, this.height)
  }
}
```

In the `draw` function, a `canvas` having the same width and the same height as the _Euclidean plane_ container is created. Then each point in pixels `(x,y)` of the `canvas` is replaced by a black point if it belongs to the `set`. `xMin`, `xMax`, `yMin` and `yMax` are the bounding values illustrated in the figure of the _Euclidean plane_ above.

Running the code below:

```js
euclideanPlane = new Plane(200, 200)
euclideanPlane.draw(disk(new Point(0, 0), 50), 'disk')
```

where `disk` is the `id` of the canvas:

```html
<canvas id="disk"></canvas>
```

gives the following result:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/ClosedDiskDemo.PNG?raw=true)

### <a id="half-plane" name="half-plane">Drawing Horizontal and Vertical Half-planes</a>

![Image](https://github.com/aelassas/functional-ts/blob/main/img/Half-Plane.jpg?raw=true)

A _horizontal_ or a _vertical_ half-plane is either of the two subsets into which a plane divides the Euclidean space. A _horizontal_ half-plane is either of the two subsets into which a plane divides the Euclidean space through a line perpendicular with the _Y axis_ like in the figure above. A _vertical_ half-plane is either of the two subsets into which a plane divides the Euclidean space through a line perpendicular with the _X axis_.

In this section, we will set up the _Characteristic functions_ of the _horizontal_ and _vertical_ half-planes, draw them in a HTML5 page and see what we can do if we combine them with the _disk_ subset.

Let `HorizontalHalfPlane` be the _Characteristic function_ of a _horizontal_ half-plane. The implementation of `HorizontalHalfPlane` in TypeScript is as follows:

```js
const horizontalHalfPlane = (y: number, isLowerThan: boolean) => 
      (p: Point) => (isLowerThan ? p.y <= y : p.y >= y)
```

Thus, running the code below:

```js
euclideanPlane.draw(horizontalHalfPlane(0, true),'hhp')
```

where `hhp` is the `id` of the canvas:

```html
<canvas id="hhp"></canvas>
```

gives the following result:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/HorizentalHalfPlaneDemo.PNG?raw=true)

Let `VerticalHalfPlane` be the _Characteristic function_ of a _vertical_ half-plane. The implementation of `VerticalHalfPlane` in TypeScript is as follows:

```jsconst verticalHalfPlane = (x: number, isLowerThan: boolean) => 
      (p: Point) => (isLowerThan ? p.x <= x : p.x >= x)```

Thus, running the code below:

```js
euclideanPlane.draw(verticalHalfPlane(0, false),'vhp')
```

where `vhd` is the `id` of the canvas:

```html
<canvas id="vhd"></canvas>
```

gives the following result:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/VerticalHalfPlaneDemo.PNG?raw=true)

In the first section of the article, we set up basic binary operations on sets. Thus, by combining the intersection of a `disk` and a `half-plane` for example, we can draw the half-disk subset.

Therefore, running the sample below:

```js
euclideanPlane.draw(set.intersection(disk(new Point(0, 0), 50), 
                    verticalHalfPlane(0, false)), 'hd')
```

where `hd` is the `id` of the canvas:

```html
<canvas id="hd"></canvas>
```

gives the following result:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/HalfDiskDemo.PNG?raw=true)

### <a id="func" name="func">Functions</a>

This section presents functions on the sets in the Euclidean plane.

### Translate

![Image](https://github.com/aelassas/functional-ts/blob/main/img/TranslateFunction.png?raw=true)

Let `translatePoint` be the function that translates a point in the plane. In Euclidean geometry, `translatePoint` is a function that moves a given point a constant distance in a specified direction. Thus the implementation in TypeScript is as follows:

```js
const translatePoint = (deltax: number, deltay: number) => 
                       (p: Point) => new Point(p.x + deltax, p.y + deltay)
```

where `(deltax, deltay)` is the constant vector of the translation.

Let `translate` be the function that translates a set in the plane. This function is simply implemented as follows in TypeScript:

```js
const translate = (e: PlaneSet, deltax: number, deltay: number) => 
                  (p: Point) => e(translatePoint(-deltax, -deltay)(p))
```

`translate` takes as parameters `deltax` which is the delta distance in the first Euclidean dimension and `deltay` which is the delta distance in the second Euclidean dimension. If a point _P (x, y)_ is translated in a set _S_, then its coordinates will change to _(x', y') = (x, delatx, y, deltay)_. Thus, the point _(x' - delatx, y' - deltay)_ will always belong to the set _S_. In set algebra, `translate` is called isomorph, in other words, the set of all translations forms the _translation group T_, which is isomorphic to the space itself. This explains the main logic of the function.

Thus, running the code below in our HTML5 page:

```js
let translate_timer: ReturnType<typeof setInterval>
function translate_op() {
  let deltay = 0
  clearTimeout(scale_timer)
  clearTimeout(rotate_timer)
  translate_timer = setInterval(() => {
    deltay = deltay <= euclideanPlane.height ? deltay + 20 : 0
    euclideanPlane.draw(translate(disk(new Point(0, -50), 50), 0, deltay), 'ep_op')
  }, 1000)
}
```

where `ep_op` is the `id` of the canvas:

```html
<canvas id="ep_op"></canvas>
```

gives the following result:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/TranslationDemo.gif?raw=true)

### Homothety

![Image](https://github.com/aelassas/functional-ts/blob/main/img/ScaleFunction.gif?raw=true)

Let `scalePoint` be the function that sends any point _M_ to another point _N_ such that the segment _SN_ is on the same line as _SM_, but scaled by a factor λ. In algebra of sets, `Scale` is formulated as follows:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/ScaleFormula.PNG?raw=true)

Thus the implementation in TypeScript is as follows:

```js
const scalePoint = (lambdax: number, lambday: number, deltax: number, deltay: number) 
      => (p: Point) => new Point(lambdax * p.x + deltax, lambday * p.y + deltay)
```

where `(deltax, deltay)` is the constant vector of the translation and `(lambdax, lambday)` is the lambda vector.

Let `scale` be the function that applies an homothety on a set in the plan. This function is simply implemented as follows in TypeScript:

```js
const scale = (e: PlaneSet, lambdax: number, lambday: number, deltax: number, 
               deltay: number) => (p: Point) => e(scalePoint(1 / lambdax, 1 / lambday, 
               -deltax / lambdax, -deltay / lambday)(p))
```

`scale` takes as parameters `deltax` which is the delta distance in the first Euclidean dimension, `deltay` which is the delta distance in the second Euclidean dimension and `(lambdax, lambday)` which is the constant factor vector λ. If a point _P (x, y)_ is transformed through `scale` in a set _S_, then its coordinates will change to _(x', y') = (lambdax * x, delatx, lambday * y, deltay)_. Thus, the point _((x'- delatx)/lambdax, (y' - deltay)/lambday)_ will always belong to the set _S_, If lambda is different from the vector 0, of course. In algebra of sets, `scale` is called isomorph, in other words, the set of all homotheties forms the _Homothety group H_, which is isomorphic to the space itself \ {0}. This explains the main logic of the function.

Thus, running the code below in our HTML5 page:

```js
let scale_timer: ReturnType<typeof setInterval>
function scale_op() {
  let deltay = 0
  let lambday = 0.05
  clearTimeout(translate_timer)
  clearTimeout(rotate_timer)
  scale_timer = setInterval(() => {
    deltay = deltay <= euclideanPlane.height ? deltay + 20 : 0
    lambday = deltay <= euclideanPlane.height ? lambday + 0.05 : 0.05
    euclideanPlane.draw(scale(disk(new Point(0, -50), 50), 1, lambday, 0, deltay), 'ep_op')
  }, 1000)
}
```

gives the following result:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/ScaleDemo.gif?raw=true)

### Rotate

![Image](https://github.com/aelassas/functional-ts/blob/main/img/RotionFunction.png?raw=true)

Let `rotatePoint` be the function that rotates a point with an angle θ. In matrix algebra, `rotatePoint` is formulated as follows:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/RotionFormula1.png?raw=true)

where _(x', y')_ are the co-ordinates of the point after rotation, and the formula for _x'_ and _y'_ is as follows:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/RotionFormula2.png?raw=true)

The demonstration of this formula is very simple. Have a look at this rotation.

![Image](https://github.com/aelassas/functional-ts/blob/main/img/RotationDemonstration1.png?raw=true)

Below the demonstration:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/RotationDemonstration2.png?raw=true)

Thus the implementation in TypeScript is as follows:

```js
const rotatePoint = (theta: number) => (p: Point) => new Point(p.x * Math.cos(theta) 
      - p.y * Math.sin(theta), p.x * Math.sin(theta) + p.y * Math.cos(theta))
```

Let `rotate` be the function that applies a rotation on a set in the plane with the angle θ. This function is simply implemented as follows in TypeScript.

```js
const rotate = (e: PlaneSet, theta: number) => (p: Point) => e(rotatePoint(-theta)(p))
```

`rotate` is a function that takes as parameter `theta` which is the angle of the rotation. If a point _P (x, y)_ is transformed through `rotate` in a set _S_, then its coordinates will change to _(x', y') = (x * cos(theta) - y * sin(theta), x * sin(theta), y * cos(theta))_. Thus, the point _(x' * cos(theta), y' * sin(theta), y' * cos(theta) - x' * sin(theta))_ will always belong to the set _S_. In algebra of sets, `rotate` is called isomorph, in other words, the set of all rotations forms the _Rotation group R_, which is isomorphic to the space itself. This explains the main logic of the function.

Thus, running the code below in our HTML5 page:

```js
let rotate_timer: ReturnType<typeof setInterval>
function rotate_op() {
  let theta = 0
  clearTimeout(translate_timer)
  clearTimeout(scale_timer)
  rotate_timer = setInterval(() => {
    euclideanPlane.draw(rotate(horizontalHalfPlane(-90, true), theta), 'ep_op')
    theta = (theta + Math.PI / 2) % (2 * Math.PI)
  }, 1000)
}
```

gives the following result:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/RotationDemo.gif?raw=true)

### <a id="plane-further" name="plane-further">For Those Who Want to Go Further</a>

Very simple, isn't it? For those who want to go further, you can explore these:

*   Ellipse
*   Three-dimensional Euclidean space
*   Ellipsoide
*   Paraboloid
*   Hyperboloid
*   Spherical harmonics
*   Superellipsoid
*   Haumea
*   Homoeoid
*   Focaloid

## <a id="fractals" name="fractals">Fractals</a>

![Image](https://github.com/aelassas/functional-ts/blob/main/img/Mandelbrot_zoom.gif?raw=true)

Fractals are sets that have a fractal dimension that usually exceeds their topological dimension and may fall between the integers. For example, the _Mandelbrot_ set is a fractal defined by a family of complex quadratic polynomials:

```
Pc(z) = z^2 + c
```

where `c` is a complex. The _Mandelbrot_ fractal is defined as the set of all points `c` such that the above sequence does not escape to infinity. In algebra of sets, this is formulated as follows:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/MandlebrotRelation.PNG?raw=true)

Fractals (abstract data type) can always be represented as follows in TypeScript:

```js
type Fractal = (z: Complex, c: Complex) => Complex
```

### <a id="fractals-draw" name="fractals-draw">Complex Numbers and Drawing</a>

In order to be able to draw fractals, I needed to manipulate _Complex_ numbers. Thus, I created the `Complex` class below:

```js
class Complex {
    x: number
    y: number
    static zero = new Complex(0, 0)

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    abs() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    toString() {
        return this.x + ' + i * ' + this.y
    }
}

function add(z1: Complex, z2: Complex) {
    return new Complex(z1.x + z2.x, z1.y + z2.y)
}

function substract(z1: Complex, z2: Complex) {
    return new Complex(z1.x - z2.x, z1.y - z2.y)
}

function multiply(z1: Complex, z2: Complex) {
    return new Complex(z1.x * z2.x - z1.y * z2.y, z1.x * z2.y + z1.y * z2.x)
}
```

### <a id="fractals-mondlebrot" name="fractals-mondlebrot">Mandelbrot Fractal</a>

I created a _Mandelbrot Fractal_ (abstract data type representation) `P(z) = z^2 + c` that is available below.

```js
const mandelbrot = (z: Complex, c: Complex) => add(multiply(z, z), c)
```

In order to be able to draw _Complex_ numbers, I created a `ComplexPlane` class. Below is the implementation in TypeScript.

```js
class ComplexPlane {
  width: number
  height: number
  real_min: number
  real_max: number
  imaginary_min: number
  imaginary_max: number
  boundary: number
  fractalIterationsPerPixel: number
  canvasId: string

  constructor(
    width: number,
    height: number,
    real_min: number,
    real_max: number,
    imaginary_min: number,
    imaginary_max: number,
    boundary: number,
    fractalIterationsPerPixel: number,
    canvasId: string,
  ) {
    this.width = width
    this.height = height
    this.real_min = real_min
    this.real_max = real_max
    this.imaginary_min = imaginary_min
    this.imaginary_max = imaginary_max
    this.boundary = boundary
    this.fractalIterationsPerPixel = fractalIterationsPerPixel
    this.canvasId = canvasId
  }

  draw(fractal: Fractal) {
    const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement
    canvas.width = this.width
    canvas.height = this.height
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    context.fillStyle = 'white'
    for (let x = 0; x < this.width; x++) {
      const xp = this.real_min + (x * (this.real_max - this.real_min)) / this.width
      for (let y = 0; y < this.height; y++) {
        const yp = this.imaginary_max - (y * (this.imaginary_max - this.imaginary_min)) / this.height
        const c = new Complex(xp, yp)
        let z = Complex.zero
        for (let k = 0; k < this.fractalIterationsPerPixel; k++) z = fractal(z, c)
        if (z.abs() < this.boundary) context.fillRect(x, y, 1, 1)
      }
    }
  }

  /*
   * Display 'Please wait...' at the center of the canvas
   *
  */
  pleaseWait() {
    const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement
    canvas.width = this.width
    canvas.height = this.height
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    context.fillStyle = 'white'
    context.fillText('Please wait...', this.width / 2 - 30, this.height / 2)
  }
}
```

Thus, running the code below:

```js
const complexPlane = new ComplexPlane(300, 300, -1.5, 1.5, -1.5, 1.5, 1.5, 20, 'fractal')

const mandelbrot = (z: Complex, c: Complex) => add(multiply(z, z), c)

complexPlane.pleaseWait()

setTimeout(() => complexPlane.draw(mandelbrot), 500)
```

where `fractal` is the `id` of the canvas:

```html
<canvas id="fractal"></canvas>
```

gives the following result:

![Image](https://github.com/aelassas/functional-ts/blob/main/img/FractalDemo.PNG?raw=true)

### <a id="fractals-further" name="fractals-further">For Those Who Want to Go Further</a>

For those who want to go further, you can explore these:

*   Newton Fractals
*   Julia Fractals
*   Other Fractals

That's it! I hope you enjoyed reading.
