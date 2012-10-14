class Blob
  constructor: (@x, @y, @app)->
    @xAcceleration = Math.random() - 0.5
    @yAcceleration = Math.random() - 0.5
  
  draw: =>
    @x += @xAcceleration
    @y += @yAcceleration
    @x = -5 if @x > @app.width + 5
    @x = @app.width + 5 if @x < -5
    @y = -5 if @y > @app.height + 5
    @y = @app.height + 5 if @y < -5
    @app.ctx.fillRect Math.round(@x), Math.round(@y), 5, 5

class Blobs
  constructor: (@app)->
    @collection = []
    @new() for i in [1..26]

  draw: =>

    @app.ctx.fillStyle = '#333'
    obj.draw() for obj in @collection 

  new: ->
    @collection.push new Blob Math.round(Math.random() * @app.width), Math.round(Math.random() * @app.height), @app

class App
  constructor: ->
    @canvas = $ 'canvas' 
    @ctx = @canvas[0].getContext '2d'
    @height = @canvas.height()
    @canvas[0].height = @height
    $(window).resize @resize
    @calculateWidth()
    @blobs = new Blobs @
    @animate()
 
  animate: =>
    @ctx.fillStyle = 'white'
    @ctx.fillRect 0, 0, @width, @height
    @blobs.draw()
    requestAnimationFrame @animate

  resize:=>
    @calculateWidth()
  
  calculateWidth: ->
    @width = @canvas.width() - 1
    @canvas[0].width = @width


$ ->
  window.app = new App
  