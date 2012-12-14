(function() {
  var Display, Snow, SnowFlake, Xmas, messages;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  messages = {
    'pandr': 'Merry Christmas Pete, Rob and Matt, I have thoroughly enjoyed working with you guys, have a great new year!<br> Anders',
    'kaldor': 'Merry Christmas to All of your guys at Kaldor, I really hope your next year will be as successful as this one!<br> Anders',
    'agentivity': "Merry Christmas Riaan and Edd, I'm excited to see what you guys come up with in the new year!<br> Anders",
    'measured': "Merry Christmas Max and Sam, I'm amazed at how far you've come in such a short time! Looking forward to exciting projects in the new year.<br> Anders",
    'blurtit': "To all at blurtit, you've been very gracious hosts and I'm hoping I get a chance to know you all better next year! Merry Christmas!<br> Anders",
    'sync': "Thanks for such a warm welcome to the Sync Events. Very Excited about the new year, looking like the tech community in East Anglia has a good year ahead of it!<br> Anders",
    'default': "Merry Christmas from Anders!"
  };

  window.HashReader = (function() {

    function HashReader(xmas) {
      this.xmas = xmas;
      this.updateMessage = __bind(this.updateMessage, this);
      this.updateMessage();
      $(window).bind('hashchange', this.updateMessage);
    }

    HashReader.prototype.updateMessage = function() {
      if (messages[window.location.hash.substring(1)]) {
        this.message = messages[window.location.hash.substring(1)];
      } else {
        this.message = messages['default'];
      }
      return $(this.xmas).trigger('newmessage', this.message);
    };

    return HashReader;

  })();

  Display = (function() {

    function Display(xmas) {
      this.xmas = xmas;
      this.newmessage = __bind(this.newmessage, this);
      this.resize = __bind(this.resize, this);
      this.textBox = $('.display');
      $(this.xmas).bind('newmessage', this.newmessage);
      $(this.xmas).bind('resize', this.resize);
      this.resize();
      this.message = '?';
    }

    Display.prototype.resize = function() {
      return this.textBox.css('font-size', "" + (this.xmas.width / 40) + "px");
    };

    Display.prototype.newmessage = function(event, message) {
      this.message = message;
      return this.textBox.html(this.message);
    };

    return Display;

  })();

  SnowFlake = (function() {

    function SnowFlake(xmas) {
      this.xmas = xmas;
      this.draw = __bind(this.draw, this);
      $(this.xmas).bind('draw', this.draw);
      this.resetVariables();
    }

    SnowFlake.prototype.resetVariables = function() {
      this.x = Math.random() * this.xmas.width;
      this.y = Math.random() * this.xmas.height;
      this.xAcceleration = Math.random() - 0.5;
      return this.yAcceleration = Math.random() * 1.5;
    };

    SnowFlake.prototype.draw = function() {
      this.move();
      this.check();
      return this.display();
    };

    SnowFlake.prototype.move = function() {
      this.x += this.xAcceleration;
      return this.y += this.yAcceleration;
    };

    SnowFlake.prototype.check = function() {
      if (this.x > this.xmas.width || this.y > this.xmas.height || this.x < 0 || this.y < 0) {
        return this.resetVariables();
      }
    };

    SnowFlake.prototype.display = function() {
      this.xmas.context.fillStyle = 'white';
      return this.xmas.context.fillRect(this.x, this.y, 2, 2);
    };

    return SnowFlake;

  })();

  Snow = (function() {

    function Snow(xmas) {
      var i;
      this.xmas = xmas;
      this.flakes = [];
      for (i = 0; i <= 34; i++) {
        this.newFlake();
      }
    }

    Snow.prototype.newFlake = function() {
      return this.flakes.push(new SnowFlake(this.xmas));
    };

    return Snow;

  })();

  Xmas = (function() {

    function Xmas() {
      this.resize = __bind(this.resize, this);
      this.animate = __bind(this.animate, this);      this.canvas = $('canvas');
      this.resize();
      this.snow = new Snow(this);
      this.display = new Display(this);
      this.hashReader = new HashReader(this);
      this.context = this.canvas[0].getContext('2d');
      this.animate();
      $(window).bind('resize', this.resize);
    }

    Xmas.prototype.clear = function() {
      this.context.fillStyle = 'gray';
      return this.context.fillRect(0, 0, this.width, this.height);
    };

    Xmas.prototype.animate = function() {
      this.clear();
      $(this).trigger('draw');
      return requestAnimationFrame(this.animate);
    };

    Xmas.prototype.resize = function() {
      this.width = this.canvas.width();
      this.height = this.canvas.height();
      this.canvas[0].width = this.width;
      this.canvas[0].height = this.height;
      return $(this).trigger('resize');
    };

    return Xmas;

  })();

  $(function() {
    return window.xmas = new Xmas();
  });

}).call(this);
