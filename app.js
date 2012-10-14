(function() {
  var App, Blob, Blobs;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Blob = (function() {

    function Blob(x, y, app) {
      this.x = x;
      this.y = y;
      this.app = app;
      this.draw = __bind(this.draw, this);
      this.xAcceleration = Math.random() - 0.5;
      this.yAcceleration = Math.random() - 0.5;
    }

    Blob.prototype.draw = function() {
      this.x += this.xAcceleration;
      this.y += this.yAcceleration;
      if (this.x > this.app.width + 5) this.x = -5;
      if (this.x < -5) this.x = this.app.width + 5;
      if (this.y > this.app.height + 5) this.y = -5;
      if (this.y < -5) this.y = this.app.height + 5;
      return this.app.ctx.fillRect(Math.round(this.x), Math.round(this.y), 5, 5);
    };

    return Blob;

  })();

  Blobs = (function() {

    function Blobs(app) {
      var i;
      this.app = app;
      this.draw = __bind(this.draw, this);
      this.collection = [];
      for (i = 1; i <= 26; i++) {
        this["new"]();
      }
    }

    Blobs.prototype.draw = function() {
      var obj, _i, _len, _ref, _results;
      this.app.ctx.fillStyle = '#333';
      _ref = this.collection;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        _results.push(obj.draw());
      }
      return _results;
    };

    Blobs.prototype["new"] = function() {
      return this.collection.push(new Blob(Math.round(Math.random() * this.app.width), Math.round(Math.random() * this.app.height), this.app));
    };

    return Blobs;

  })();

  App = (function() {

    function App() {
      this.resize = __bind(this.resize, this);
      this.animate = __bind(this.animate, this);      this.canvas = $('canvas');
      this.ctx = this.canvas[0].getContext('2d');
      this.height = this.canvas.height();
      this.canvas[0].height = this.height;
      $(window).resize(this.resize);
      this.calculateWidth();
      this.blobs = new Blobs(this);
      this.animate();
    }

    App.prototype.animate = function() {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.blobs.draw();
      return requestAnimationFrame(this.animate);
    };

    App.prototype.resize = function() {
      return this.calculateWidth();
    };

    App.prototype.calculateWidth = function() {
      this.width = this.canvas.width() - 1;
      return this.canvas[0].width = this.width;
    };

    return App;

  })();

  $(function() {
    return window.app = new App;
  });

}).call(this);
