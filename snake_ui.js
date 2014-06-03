(function (root) {
  var S = root.S= (root.S || {});
  var View = S.View = function(rootEl){
    this.$el = rootEl;
    this.board = new S.Board();
    this.intervalID = null;
    this.allReadyMoved = false;
  };

  View.prototype.start = function() {
    $(window).keydown(function(e) {
      if(this.allReadyMoved === false){
        if (e.which == 37) {
          this.board.snake.turn("W");
          this.allReadyMoved = true
        } else if (e.which == 38) {
          this.board.snake.turn("N");
          this.allReadyMoved = true
        } else if (e.which == 39) {
          this.board.snake.turn("E");
          this.allReadyMoved = true
        } else if (e.which == 40) {
          this.board.snake.turn("S");
          his.allReadyMoved = true
        }
      }
    }.bind(this));

    this.renderFirstTime();

    this.run();
  };

  View.prototype.run = function(){
    this.intervalID = window.setInterval(function(){
      this.step();
    }.bind(this), 200);
  };

  View.prototype.step = function(){ 
    this.allReadyMoved = false
    this.board.snake.move(this.board.applePos);
    if (this.board.checkLoss()) {
      this.$el.empty().html("<h1 class='board-text'>YOUR SNAKE DIED.</h1>");
      window.clearInterval(this.intervalID);
      return;
    }
    this.render();
  };

  View.prototype.renderFirstTime = function() {
    var html = "";
    _.times(15, function(rowNum){
      html += "<div class='row'>";
      _.times(15, function(colNum){
        var pos = rowNum + "_" + colNum; 
        html += "<div class='square' id='" + pos + "'></div>";
      });
      html += "</div";
    });
    this.$el.html(html);
  }

  View.prototype.render = function(){
    var board = this.board.render();
    for(var i = 0; i < board.length; i++){
      for(var j = 0; j < board[i].length; j++){
        var $square = $("#" + i + "_" + j);
        board[i][j] === "S" ? $square.addClass("snake") : $square.removeClass("snake");
        board[i][j] === "A" ? $square.addClass("apple") : $square.removeClass("apple");
      }
    }
  };
})(this);
