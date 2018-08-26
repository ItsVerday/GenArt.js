# GenArt.js
GenArt.js is a JavaScript library designed for easy creation of generative art.
It’s a project that I’ve been working on over the past few days, so it’s not perfect.

# How to Get Started
To get started, you’ll need to download the latest version of the library. Then, create a new .html file in your preferred text editor, and add the downloaded library to the html file. Next, create an empty .js file, and paste this code into it:

```JS
let canv = GA.canvas(1024, 1024);
canv.global();

function generate() {
   // your generation code here...
}
```

Once you reference the new file in your html file, you’re good to go!

# Examples

## Snowflakes - Generates geometric snowflakes 
[Link to code](../master/examples/snowflakes.js)

# Reference

## Shape Functions

### `circle(x, y, radius)` - Draw a circle

**x** - x position of the circle

**y** - y position of the circle

**radius** - radius of the circle

### `ellipse(x, y, radiusx, radiusy)` - Draw an ellipse

**x** - x position of the ellipse

**y** - y position of the ellipse

**radiusx** - x radius of the ellipse

**radiusy** - y radius of the ellipse

### `square(x, y, size)` - Draw a square

**x** - x position of the square

**y** - y position of the square

**size** - edge length of the square

### `rect(x, y, width, height)`- Draw a rectangle

**x** - x position of the rectangle

**y** - y position of the rectangle

**width** - width of the rectangle

**height** - height of the rectangle

### `line(x1, y1, x2, y2)` - Draw a line

**x1** - first x position of the line

**y1** - first y position of the line

**x2** - second x position of the line

**y2** - second y position of the line

### `polyline(pointArray)` - Draw a polyline (a set of lines connected to each other)

**pointArray** - The list of points that defines the lines of the polyline. Points can be in either the `[x, y]` format or the `{x: x, y: y}` format. You can even mix these formats together, in a single function call.

### `polygon(pointArray)` - Draw a closed polygon, in the same way a polyline is drawn

**pointArray** - The list of points that defines the lines of the polygon. Points can be in either the `[x, y]` format or the `{x: x, y: y}` format. You can even mix these formats together, in a single function call.

### `perfectPolygon(x, y, radius, vertices, [rotation])` - Draw a perfect polygon (a polygon where all edge lengths and angles are the same)

**x** - x position of the polgon

**y** - y position of the polygon

**radius** - radius of the polygon

**vertices** - number of vertices in the polygon

**rotation** (optional) - the rotation of the polygon, in degrees. Defaults to 0

### `bezierCurve(pointArray)` - Draw a quadratic or cubic bezier curve

**pointArray** - The list of points that defines the start, end, and control point(s) of the curve. Points can be in either the `[x, y]` format or the `{x: x, y: y}` format. You can even mix these formats together, in a single function call.

### `multiCurve(pointArray)` - Draw a smooth curve between a set of points of any size

**pointArray** - The list of points that defines the start, end, and control point(s) of the curve. Points can be in either the `[x, y]` format or the `{x: x, y: y}` format. You can even mix these formats together, in a single function call.

### `closedCurve(list of x/y points)` - Draw a closed smooth curve between a set of points of any size

**pointArray** - The list of points that defines the control point(s) of the curve. Points can be in either the `[x, y]` format or the `{x: x, y: y}` format. You can even mix these formats together, in a single function call.

## Style functions

### `background(color)` - Sets the background color

**color** - The color of the background. This parameter is very versatile, as it can be a hex code, rgb string, html color name, or list of rgb(a) values.

### `fill(color)` - Sets the fill color for future shapes

**color** - The new fill color. This parameter is very versatile, as it can be a hex code, rgb string, html color name, or list of rgb(a) values.

### `noFill()` - Removes the fill color, so that any future shapes will only be a stroke outline

### `stroke(color)` - sets the stroke color for future shapes

**color** - The new stroke color. This parameter is very versatile, as it can be a hex code, rgb string, html color name, or list of rgb(a) values.

### `noStroke()` - Remove the stroke around future shapes, leaving only the fill

### `strokeWeight(weight)` - Sets the stroke weight for future shapes

**weight** - the weight (width) of future strokes

### `pushStyle()` - Saves the current styling for later. The styling can be restored with the popStyle() function

### `popStyle()` - Restores the most recently saved style, and removes it from the list of saved styles. You must call pushStyle() before you call this

## Transformation/other functions

### `clear()` - Clears everything on the canvas

### `translate(x, [y])` - Translates (moves) all shapes

**x** - the amount for shapes to be translated on the X axis

**y** (optional) - the amount for shapes to be translated on the Y axis. Defaults to 0

### `rotate(angle, [x, y])` - Rotates all shapes

**angle** - angle in degrees for the shapes to be rotated

**x** (optional) - The center for the rotation on the X axis. Defaults to 0

**y** (optional, must be specified if x is) - The center for the rotation on the Y axis. Defaults to 0

### `scale(x, [y])` - Scales objects, making them larger or smaller

**x** - The amount to scale objects, on the X axis

**y** (optional) - The amount to scale objects, on the Y axis. Defaults to x if not specified.

### `skewX(angle)` - Skews objects on the X axis

**angle** - Angle to skew the objects at

### `skewY(angle)` - Skews objects on the Y axis

**angle** - Angle to skew the objects at

### `pushMatrix()` - Saves the current transformations for later. The transformations can be restored with the popMatrix() function

### `popMatrix()` - Restores the most recently saved transformations, and removes them from the list of saved transformations. You must call pushMatrix() before you call this
