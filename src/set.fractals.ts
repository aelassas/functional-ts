/**
 * set.fractals.js 
 * Author: Akram El Assas
 * License: CPOL
*/

/**
 * Complex
 */
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
