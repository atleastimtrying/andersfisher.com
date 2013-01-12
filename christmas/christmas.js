// Generated by CoffeeScript 1.3.3
(function() {
  var Display, Scenery, Snow, SnowFlake, Xmas, messages,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  messages = {
    'pandr': 'Merry Christmas Pete, Rob and Matt, I have thoroughly enjoyed working with you guys. Have a great new year!<br> Anders',
    'kaldor': 'Merry Christmas to all of you guys at Kaldor, I really hope your next year will be as successful as this one!<br> Anders',
    'agentivity': "Merry Christmas Riaan and Edd, I'm excited to see what you guys come up with in the new year!<br> Anders",
    'measured': "Merry Christmas Max and Sam, I'm amazed at how far you've come in such a short time! Looking forward to seeing some exciting projects in the new year.<br> Anders",
    'blurtit': "To all at Blurtit, you've been very gracious hosts and I'm hoping I get a chance to know you all better next year! Merry Christmas!<br> Anders",
    'sync': "Thanks for such a warm welcome to the Sync Events. Merry Christmas!<br> Anders",
    'dan': "DAN! IT'S CHRISTMAS! Have a good one mate!<br> Anders",
    'tom': "Merry Christmas Tom, Jo, Milly and Dexter! Hope you have a great time together!<br> Anders",
    'kl': "To all at Kingsland Linassi, Merry Christmas and a Happy New Year!<br> Anders",
    'rtc': "To all at Real Time Content, Merry Christmas and a Happy New Year!<br> Anders",
    'crafted': "To all at Crafted, Merry Christmas and a Happy New Year!<br> Anders",
    'fesuffolk': "Thanks so much to you all for attending FESuffolk. Looking forward to seeing you next year! Merry Christmas<br> Anders",
    'iprug': "Merry Christmas IPRUG! You've made a wayward JS Dev feel very at home!<br> Anders",
    'default': "<h2>Merry Christmas</h2><br> from Anders!"
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

  Scenery = (function() {

    function Scenery(xmas) {
      this.xmas = xmas;
      this.resize = __bind(this.resize, this);

      this.moon = $('.moon');
      this.big = $('.big');
      this.little = $('.little');
      this.house = $('.house');
      $(this.xmas).bind('resize', this.resize);
      this.resize();
    }

    Scenery.prototype.resize = function() {
      this.moon.css({
        width: "" + (this.xmas.width / 10) + "px",
        height: "" + (this.xmas.width / 10) + "px"
      });
      this.big.css({
        bottom: "-" + (this.xmas.width / 12) + "px",
        height: "" + (this.xmas.width / 6) + "px"
      });
      this.little.css({
        bottom: "-" + (this.xmas.width / 16) + "px",
        height: "" + (this.xmas.width / 8) + "px"
      });
      return this.house.css({
        bottom: "" + (this.xmas.width / 17) + "px"
      });
    };

    return Scenery;

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
      return this.textBox.css('font-size', "" + (this.xmas.width / 30) + "px");
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
      return this.yAcceleration = (Math.random() * 1.3) + 0.2;
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
      return this.xmas.context.fillRect(this.x, this.y, 2, 2);
    };

    return SnowFlake;

  })();

  Snow = (function() {

    function Snow(xmas) {
      var i, _i;
      this.xmas = xmas;
      this.flakes = [];
      for (i = _i = 0; _i <= 34; i = ++_i) {
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

      this.animate = __bind(this.animate, this);
      this.canvas = $('canvas');
      this.resize();
      this.snow = new Snow(this);
      this.display = new Display(this);
      this.scenery = new Scenery(this);
      this.hashReader = new HashReader(this);
      this.context = this.canvas[0].getContext('2d');
      this.animate();
      $(window).bind('resize', this.resize);
    }

    Xmas.prototype.clear = function() {
      this.context.fillStyle = '#222';
      return this.context.fillRect(0, 0, this.width, this.height);
    };

    Xmas.prototype.animate = function() {
      this.clear();
      this.context.fillStyle = 'white';
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