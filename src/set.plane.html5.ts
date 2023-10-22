/**
 * set.plane.html5.ts
 * Author: Akram El Assas
 * License: CPOL
*/

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
