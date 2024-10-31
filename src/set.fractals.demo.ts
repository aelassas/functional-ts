import { Complex, add, multiply } from './set.fractals'
import { ComplexPlane } from './set.fractals.html5'

const complexPlane = new ComplexPlane(300, 300, -1.5, 1.5, -1.5, 1.5, 1.5, 20, 'fractal')

const mandelbrot = (z: Complex, c: Complex) => add(multiply(z, z), c)

complexPlane.pleaseWait()

setTimeout(() => complexPlane.draw(mandelbrot), 500)
