/**
 * Complex
 */
export class Complex {
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
        return `${this.x} + i * ${this.y}`
    }
}

export function add(z1: Complex, z2: Complex) {
    return new Complex(z1.x + z2.x, z1.y + z2.y)
}

export function substract(z1: Complex, z2: Complex) {
    return new Complex(z1.x - z2.x, z1.y - z2.y)
}

export function multiply(z1: Complex, z2: Complex) {
    return new Complex(z1.x * z2.x - z1.y * z2.y, z1.x * z2.y + z1.y * z2.x)
}
