(function (root) {
  var S = root.S= (root.S || {});

  var Snake = S.Snake = function(){
    this.dir = "S";
    this.headPos = [0,2];
    this.segments = [[0,0], [0,1], [0,2]];
  };

  Snake.prototype.move = function(applePos){
    var newSegPos = S.Coord.plus(this.headPos, this.dir);
    this.headPos = newSegPos;
    this.segments.push(newSegPos);
    if(newSegPos[0] !== applePos[0] || newSegPos[1] !== applePos[1]){
      this.segments.shift();
    }
  };

  Snake.prototype.turn = function(dir){
    if(dir !== S.Coord.oppositeDir(this.dir)){
      this.dir = dir;
    }
  };
})(this);