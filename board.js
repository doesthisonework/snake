(function (root) {
  var S = root.S= (root.S || {});

  var Board = S.Board = function(){
    this.snake = new S.Snake();
    this.grid = _makeGrid();
    this.generateApple();
  };

  function _makeGrid(){
    var grid = [];
    for (var i = 0; i < 20; i++) {
  		var row = new Array(20);
  		grid.push(row);
  	}
    return grid;
  }

  Board.prototype.updateBoard = function(){
    for (var i = 0; i < 20; i++){
      for (var j = 0; j < 20; j++){
        this.grid[i][j] = null;
      }
    }

    this.placeApple();
    this.placeSnake();
  };

  Board.prototype.placeSnake = function(){
    for (var i = 0; i < this.snake.segments.length; i++){
      var pos = [this.snake.segments[i][0], this.snake.segments[i][1]];
      if(this.grid[pos[0]][pos[1]] === "A"){
        this.generateApple();
      }
      this.grid[pos[0]][pos[1]] = "S";
    }
  };

  Board.prototype.placeApple = function(){
    var pos = this.applePos;
    this.grid[pos[0]][pos[1]] = "A";
  };

  Board.prototype.generateApple = function(){
    var x = Math.floor(Math.random() * 20);
    var y = Math.floor(Math.random() * 20);
    this.applePos = [x,y];
  };

  Board.prototype.render = function(){
    this.updateBoard();
    return this.grid;
  };

  Board.prototype.checkLoss = function() {
    if (S.Coord.outOfBounds(this.snake.headPos)) {
      return true;
    }
    for(var i = 0; i < this.snake.segments.length -1; i++){
      for(var j = i + 1; j < this.snake.segments.length; j++){
        var seg1 = this.snake.segments[i];
        var seg2 = this.snake.segments[j];
        if(seg1[0] === seg2[0] && seg1[1] === seg2[1]){
          return true;
        }
      }
    }
  };
})(this);