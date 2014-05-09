(function (root) {
  var S = root.S= (root.S || {});

  var Board = S.Board = function(){
    this.snake = new S.Snake();
    this.grid = _makeGrid();
    // this.intervalID = null;

  }

  _makeGrid = function(){
    var grid = [];
    for (var i = 0; i < 15; i++) {
  		var row = new Array(15);
  		grid.push(row);
  	}
    return grid;
  }

  Board.prototype.updateBoard = function(){
    for (var i = 0; i < 15; i++){
      for (var j = 0; j < 15; j++){
        this.grid[i][j] = null;
      }
    }
    for (var k = 0; k < this.snake.segments.length; k++){
      this.grid[this.snake.segments[k][0]][this.snake.segments[k][1]] = "S";
    }
    for (var i = 0; i < 15; i++){
      for (var j = 0; j < 15; j++){
        if (this.grid[i][j] !== "S") {
          this.grid[i][j] = null;
        }
      }
    }
  }

  Board.prototype.render = function(){
    this.updateBoard();
    return this.grid;
  }

  Board.prototype.checkLoss = function() {
    //Snake runs out of bounds
    if (S.Coord.outOfBounds(this.snake.headPos)) {
      return true;
    }
  }
})(this);