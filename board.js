(function (root) {
  var S = root.S= (root.S || {});

  var Board = S.Board = function(){
    this.snake = new S.Snake();
    this.grid = _makeGrid();
    this.generateApple();
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

    this.placeApple();
    
    for (var k = 0; k < this.snake.segments.length; k++){
      pos = [this.snake.segments[k][0], this.snake.segments[k][1]]
      if(this.grid[pos[0]][pos[1]] === "A"){
        this.generateApple();
      }
      this.grid[pos[0]][pos[1]] = "S";
    }
  }

  Board.prototype.placeApple = function(){
    pos = this.applePos;
    this.grid[pos[0]][pos[1]] = "A";
  }

  Board.prototype.generateApple = function(){
    pos = []
    while(pos.length === 0){
      x = Math.floor(Math.random() * 15);
      y = Math.floor(Math.random() * 15);

      if(this.grid[x][y] !== "S"){
        pos = [x,y];
      }
    }
    this.applePos = pos;
  }

  Board.prototype.render = function(){
    this.updateBoard();
    return this.grid;
  }

  Board.prototype.checkLoss = function() {
    if (S.Coord.outOfBounds(this.snake.headPos)) {
      return true;
    }
    for(var i = 0; i < this.snake.segments.length -1; i++){
      for(var j = i + 1; j < this.snake.segments.length; j++){
        seg1 = this.snake.segments[i];
        seg2 = this.snake.segments[j];
        if(seg1[0] === seg2[0] && seg1[1] === seg2[1]){
          return true;
        }
      }
    }
  }
})(this);