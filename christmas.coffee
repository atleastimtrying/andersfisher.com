messages = 
  'pandr': 'Merry Christmas Pete, Rob and Matt, I have thoroughly enjoyed working with you guys, have a great new year!<br> Anders'
  'kaldor': 'Merry Christmas to All of your guys at Kaldor, I really hope your next year will be as successful as this one!<br> Anders'
  'agentivity': "Merry Christmas Riaan and Edd, I'm excited to see what you guys come up with in the new year!<br> Anders"
  'measured': "Merry Christmas Max and Sam, I'm amazed at how far you've come in such a short time! Looking forward to exciting projects in the new year.<br> Anders"
  'blurtit': "To all at blurtit, you've been very gracious hosts and I'm hoping I get a chance to know you all better next year! Merry Christmas!<br> Anders"
  'sync': "Thanks for such a warm welcome to the Sync Events. Very Excited about the new year, looking like the tech community in East Anglia has a good year ahead of it!<br> Anders"
  'default': "Merry Christmas from Anders!"

class window.HashReader
  constructor: (@xmas)->
    @updateMessage()
    $(window).bind 'hashchange', @updateMessage
  
  updateMessage: =>
    if messages[window.location.hash.substring 1]
      @message = messages[window.location.hash.substring 1]
    else
      @message = messages['default']
    $(@xmas).trigger 'newmessage', @message

class Display
  constructor: (@xmas)->
    @textBox = $ '.display'
    $(@xmas).bind 'newmessage', @newmessage
    $(@xmas).bind 'resize', @resize
    @resize()
    @message = '?'

  resize: =>
    @textBox.css 'font-size', "#{@xmas.width / 40}px"

  newmessage: (event, message)=>
    @message = message
    @textBox.html @message


class SnowFlake
  constructor: (@xmas)->
    $(@xmas).bind 'draw', @draw
    @resetVariables()

  resetVariables: ->
    @x = Math.random() * @xmas.width
    @y = Math.random() * @xmas.height
    @xAcceleration = Math.random() - 0.5
    @yAcceleration = Math.random() * 1.5

  draw: =>
    @move()
    @check()
    @display()

  move: ->
    @x += @xAcceleration
    @y += @yAcceleration

  check: ->
    if @x > @xmas.width or @y > @xmas.height or @x < 0 or @y < 0
      @resetVariables()

  display: ->
    @xmas.context.fillStyle = 'white'
    @xmas.context.fillRect @x, @y, 2, 2

class Snow 
  constructor: (@xmas)->
    @flakes = []
    @newFlake() for i in [0..34]
  
  newFlake: ->
    @flakes.push new SnowFlake @xmas

class Xmas
  constructor: ->
    @canvas = $ 'canvas'
    @resize()
    @snow = new Snow @
    @display = new Display @
    @hashReader = new HashReader @
    @context = @canvas[0].getContext '2d'
    @animate()
    $(window).bind 'resize', @resize
  
  clear: ->
    @context.fillStyle = 'gray'
    @context.fillRect 0, 0, @width, @height

  animate: =>
    @clear()
    $(@).trigger 'draw'
    requestAnimationFrame @animate
  
  resize: =>
    @width = @canvas.width()
    @height = @canvas.height()
    @canvas[0].width = @width
    @canvas[0].height = @height
    $(@).trigger 'resize'

$ ->
  window.xmas = new Xmas()