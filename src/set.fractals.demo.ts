/**
 * set.fractals.demo.js 
 * Author: Akram El Assas
 * License: CPOL
*/

const complexPlane = new ComplexPlane(300, 300, -1.5, 1.5, -1.5, 1.5, 1.5, 20, 'fractal')

const mandelbrot = (c: Complex, z: Complex) => add(multiply(z, z), c)

complexPlane.pleaseWait()

setTimeout(() => complexPlane.draw(mandelbrot), 500)
