class Blob
  constructor: (@app)->
    @x = @app.roundom @app.width
    @y = @app.roundom @app.height 
    @xAcceleration = Math.random() + 0.1
    @yAcceleration = Math.random() - 0.5
  
  animate: =>
    @motion()
    @edgeDetection()
    @line point for point in @app.points
  
  line: (point)->
    if @app.dist(@, point) < 50
      @app.ctx.beginPath()
      @app.ctx.moveTo @x, @y
      @app.ctx.lineTo point.x, point.y
      @app.ctx.closePath()
      @app.ctx.stroke()
  
  motion: ->
    @x += @xAcceleration
    @y += @yAcceleration

  edgeDetection: ->
    @x = -5 if @x > @app.width + 5
    @x = @app.width + 5 if @x < -5
    @y = -5 if @y > @app.height + 5
    @y = @app.height + 5 if @y < -5

class Blobs
  constructor: (@app)->
    @collection = []
    @new() for i in [1..26]

  animate: =>
    obj.animate() for obj in @collection 

  new: ->
    @collection.push new Blob @app

class App
  constructor: ->
    @canvas = $ 'canvas' 
    @ctx = @canvas[0].getContext '2d'
    @height = @canvas.height()
    @canvas[0].height = @height
    $(window).resize @resize
    @calculateWidth()
    @blobs = new Blobs @
 
  animate: =>
    @clear()
    @blobs.animate()
    requestAnimationFrame @animate

  clear: ->
    @ctx.fillStyle = 'rgba(255,255,255,0.2)'
    @ctx.strokeStyle = '#d5d5d5'
    @ctx.fillRect 0, 0, @width, @height

  resize:=>
    @calculateWidth()
  
  calculateWidth: ->
    @width = @canvas.width() - 1
    @canvas[0].width = @width
    @points = @calculatePoints()

  calculatePoints: ->
    points = []
    for x in [0 .. @width / 50]
      for y in [0 .. @height / 50]
        points.push
          x: x * 50
          y: y * 50
    points

  dist: (object1, object2)->
    [a,b] = [object1.x - object2.x, object1.y - object2.y]
    Math.sqrt Math.pow(a,2) + Math.pow(b,2)

  roundom: (int)->
    Math.round Math.random() * int

$ ->
  window.app = new App
  window.app.animate()
  