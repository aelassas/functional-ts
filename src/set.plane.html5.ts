/**
 * set.plane.html5.js 
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
    canvas.width = this.width
    canvas.height = this.height
    const context = canvas.getContext('2d') as CanvasRenderingContext2D,
      semiWidth = this.width / 2, semiHeight = this.height / 2,
      xMin = -semiWidth, xMax = semiWidth,
      yMin = -semiHeight, yMax = semiHeight
    for (var x = 0; x < this.width; x++) {
      var xp = xMin + x * (xMax - xMin) / this.width
      for (var y = 0; y < this.height; y++) {
        var yp = yMax - y * (yMax - yMin) / this.height
        if (set(new Point(xp, yp))) context.fillRect(x, y, 1, 1)
      }
    }
  }
}
