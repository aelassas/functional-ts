/**
 * set.fractals.html5.ts
 * Author: Akram El Assas
 * License: CPOL
*/

type Fractal = (c: Complex, z: Complex) => Complex

/**
 * Complex plane
 */
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
    canvasId: string
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
      const xp = this.real_min + x * (this.real_max - this.real_min) / this.width
      for (let y = 0; y < this.height; y++) {
        const yp = this.imaginary_max - y * (this.imaginary_max - this.imaginary_min) / this.height
        const c = new Complex(xp, yp)
        let z = Complex.zero
        for (let k = 0; k < this.fractalIterationsPerPixel; k++) z = fractal(c, z)
        if (z.abs() < this.boundary) context.fillRect(x, y, 1, 1)
      }
    }
  }

  /*
   * Displays 'Please wait...' at the center of the canvas
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
