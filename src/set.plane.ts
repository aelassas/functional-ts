/**
 * PlaneSet.plane.ts
 * Author: Akram El Assas
 * License: CPOL
*/

/*
 * Point
 *
*/
class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

/*
 * Euclidean distance
 *
*/
function distance(p1: Point, p2: Point) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}

/*
 * Disk
 *
*/
const disk = (center: Point, radius: number) => (p: Point) => distance(p, center) <= radius

/*
 * Horizontal half plane
 *
*/
const horizontalHalfPlane = (y: number, isLowerThan: boolean) => (p: Point) => (isLowerThan ? p.y <= y : p.y >= y)

/*
 * Vertical half plane
 *
*/
const verticalHalfPlane = (x: number, isLowerThan: boolean) => (p: Point) => (isLowerThan ? p.x <= x : p.x >= x)

type PlaneSet = (p: Point) => boolean

/*
 * Translate
 *
*/
const translatePoint = (deltax: number, deltay: number) => (p: Point) => new Point(p.x + deltax, p.y + deltay)
const translate = (e: PlaneSet, deltax: number, deltay: number) => (p: Point) => e(translatePoint(-deltax, -deltay)(p))

/*
 * Scale
 *
*/
const scalePoint = (lambdax: number, lambday: number, deltax: number, deltay: number) => (p: Point) => new Point(lambdax * p.x + deltax, lambday * p.y + deltay)
const scale = (e: PlaneSet, lambdax: number, lambday: number, deltax: number, deltay: number) => (p: Point) => e(scalePoint(1 / lambdax, 1 / lambday, -deltax / lambdax, -deltay / lambday)(p))

/*
 * Rotate
 *
*/
const rotatePoint = (theta: number) => (p: Point) => new Point(p.x * Math.cos(theta) - p.y * Math.sin(theta), p.x * Math.sin(theta) + p.y * Math.cos(theta))
const rotate = (e: PlaneSet, theta: number) => (p: Point) => e(rotatePoint(-theta)(p))
