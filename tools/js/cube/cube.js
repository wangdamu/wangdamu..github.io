function Cube(){}

Cube.prototype.up2front = function(index){
	var ret = new Cube();
	if(index == 0){
		//最左边的
		//修正left
		ret.left = rotate90(this.left, true);
		ret.right = this.right.dup();
	}else if(index == this.up.cols() - 1){
		//最右边 修正right
		ret.left = this.left.dup();
		ret.right = rotate90(this.right, false);
	}else{
		ret.left = this.left.dup();
		ret.right = this.right.dup();
	}

	ret.front = replaceCol(this.front, this.up.col(index + 1), index);
	ret.up = replaceCol(this.up, this.back.col(this.back.cols() - index), index);
	ret.back = replaceCol(this.back, this.bottom.col(this.bottom.cols() - index), (this.back.cols() -index - 1));
	ret.bottom = replaceCol(this.bottom, this.front.col(index + 1), this.bottom.cols() - index - 1);
	return ret;
};

Cube.prototype.up2back = function(index){
	var ret = new Cube();
	if(index == 0){
		//最左边的
		//修正left
		ret.left = rotate90(this.left, false);
		ret.right = this.right.dup();
	}else if(index == this.up.cols() - 1){
		//最右边 修正right
		ret.left = this.left.dup();
		ret.right = rotate90(this.right, true);
	}else{
		ret.left = this.left.dup();
		ret.right = this.right.dup();
	}

	ret.front = replaceCol(this.front, this.bottom.col(this.bottom.cols() - index), index);
	ret.up = replaceCol(this.up, this.front.col(index + 1), index);
	ret.back = replaceCol(this.back, this.up.col(index + 1), (this.back.cols() -index - 1));
	ret.bottom = replaceCol(this.bottom, this.back.col(this.back.cols() - index), this.bottom.cols() - index - 1);

	return ret;
}

Cube.prototype.up2left = function(index){
	var ret = new Cube();
	if(index == 0){
		//最左边的
		//修正left
		ret.front = rotate90(this.front, false);
		ret.back = this.back.dup();
	}else if(index == this.up.rows() - 1){
		//最右边 修正right
		ret.front = this.front.dup();
		ret.back = rotate90(this.back, true);
	}else{
		ret.front = this.front.dup();
		ret.back = this.back.dup();
	}

	ret.up = replaceRow(this.up, reverseVector(this.right.col(index + 1)), index);
	ret.left = replaceCol(this.left, this.up.row(index + 1), this.left.cols() - index - 1);
	ret.bottom = replaceRow(this.bottom, reverseVector(this.left.col(this.left.cols() - index)), this.bottom.rows() - index - 1);
	ret.right = replaceCol(this.right, this.bottom.row(this.bottom.rows() - index), index);

	return ret;
}

Cube.prototype.up2right = function(index){
	var ret = new Cube();
	if(index == 0){
		//最左边的
		//修正left
		ret.front = rotate90(this.front, true);
		ret.back = this.back.dup();
	}else if(index == this.up.rows() - 1){
		//最右边 修正right
		ret.front = this.front.dup();
		ret.back = rotate90(this.back, false);
	}else{
		ret.front = this.front.dup();
		ret.back = this.back.dup();
	}

	ret.up = replaceRow(this.up, this.left.col(this.left.cols() - index), index);
	ret.left = replaceCol(this.left, reverseVector(this.bottom.row(this.bottom.rows() - index)), this.left.cols() - index - 1);
	ret.bottom = replaceRow(this.bottom, this.right.col(index + 1), this.bottom.rows() - index - 1);
	ret.right = replaceCol(this.right, reverseVector(this.up.row(index + 1)), index);

	return ret;
}

Cube.prototype.front2left = function(index){
	var ret = new Cube();
	if(index == 0){
		//最左边的
		//修正left
		ret.bottom = rotate90(this.bottom, false);
		ret.up = this.up.dup();
	}else if(index == this.front.rows() - 1){
		//最右边 修正right
		ret.bottom = this.bottom.dup();
		ret.up = rotate90(this.up, true);
	}else{
		ret.bottom = this.bottom.dup();
		ret.up = this.up.dup();
	}

	ret.front = replaceRow(this.front, this.right.row(index + 1), index);
	ret.left = replaceRow(this.left, this.front.row(index + 1), index);
	ret.back = replaceRow(this.back, reverseVector(this.left.row(index + 1)), this.back.rows() - index - 1);
	ret.right = replaceRow(this.right, reverseVector(this.back.row(this.back.rows() - index)), index);

	return ret;
}

Cube.prototype.front2right = function(index){
	var ret = new Cube();
	if(index == 0){
		//最左边的
		//修正left
		ret.bottom = rotate90(this.bottom, true);
		ret.up = this.up.dup();
	}else if(index == this.front.rows() - 1){
		//最右边 修正right
		ret.bottom = this.bottom.dup();
		ret.up = rotate90(this.up, false);
	}else{
		ret.bottom = this.bottom.dup();
		ret.up = this.up.dup();
	}

	ret.front = replaceRow(this.front, this.left.row(index + 1), index);
	ret.left = replaceRow(this.left, reverseVector(this.back.row(this.back.rows() - index)), index);
	ret.back = replaceRow(this.back, reverseVector(this.right.row(index + 1)), this.back.rows() - index - 1);
	ret.right = replaceRow(this.right, this.front.row(index + 1), index);

	return ret;
}
/**
 *	魔方是否已经复原
 */
Cube.prototype.isFinished = function(){
	return isPureMatrix(this.front) && isPureMatrix(this.up) && isPureMatrix(this.back)
		 && isPureMatrix(this.bottom) && isPureMatrix(this.left) && isPureMatrix(this.right);
}

Cube.prototype.inspect = function(){
	console.log('front:' + this.front.inspect());
	console.log('up:' + this.up.inspect());
	console.log('back:' + this.back.inspect());
	console.log('bottom:' + this.bottom.inspect());
	console.log('left:' + this.left.inspect());
	console.log('right:' + this.right.inspect());
}

Cube.prototype.identity = function(){
	var scores = [this.calMatrixScore(this.front), this.calMatrixScore(this.up),
	         this.calMatrixScore(this.back), this.calMatrixScore(this.bottom),
	         this.calMatrixScore(this.left), this.calMatrixScore(this.right)];

	 //scores.sort(function(a, b){return a - b;});

	 var ret = 0;
	 for(var i = 0; i < scores.length; i++){
	 	var temp = 1;
	 	for(var j = 0; j < i; j++){
	 		temp *= 37;
	 	}
	 	ret += scores[i] * temp;
	 }

	return ret;
}

Cube.prototype.calMatrixScore = function(matrix){
	var ret = 0;
	matrix.map(function(x){
		ret += x;
		return x;
	});

	return ret;
}

/**
*	是否是纯的矩阵  元素的值都一样
*/
function isPureMatrix(matrix){
	var ret = true;
	var e;
	matrix.map(function(x){
		if(!e){
			e = x;
		}else if(e != x){
			ret = false;
		}
		return x;
	});
	return ret;
	/*
	var m = Matrix.I(matrix.rows()).x(-1);
	var minusMatrix = matrix.x(m);
	var plusMax = matrix.max();
	var minusMax = minusMatrix.max();
	return plusMax == -minusMax;
	*/
}

function replaceRow(target, sourceVector, row){
	return target.map(function(e, i, j){
		if(i == row + 1){
			return sourceVector.e(j);
		}else{
			return e;
		}
	});
}

function replaceCol(target, sourceVector, col){
	return target.map(function(e, i, j){
		if(j == col + 1){
			return sourceVector.e(i);
		}else{
			return e;
		}
	});
}

function reverseVector(vector){
	return vector.map(function(x, i){
		return vector.e(vector.dimensions() - i + 1);
	});
}

function createAntiDiagonal(len){
	var ret = [];
	for(var i = 0; i < len; i++){
		var row = [];
		for(var j = 0; j < len; j++){
			if(i + j == len - 1){
				row.push(1);
			}else{
				row.push(0);
			}
		}
		ret.push(row);
	}
	//console.log(ret);
	return $M(ret);
}

function rotate90(m, clock){
	var transpose = m.transpose();
	var antiDiagonal = createAntiDiagonal(m.rows());
	if(clock){
		return transpose.x(antiDiagonal);
	}else{
		return antiDiagonal.x(transpose);
	}
}


// ---------------------下面的是搜索解决魔方复原搜索------------------------
function CubeWrapper(cube){
	this.cube = cube;
	this.parent = undefined;
	this.operation = undefined;
	this.operationIndex = undefined;
	this.children = [];
}

CubeWrapper.prototype.getParent = function(){
	return this.parent;
}

CubeWrapper.prototype.getOperation = function(){
	return this.operation;
}

CubeWrapper.prototype.getOperationIndex = function(){
	return this.operationIndex;
}

var operations = ['up2back', 'up2front', 'up2left', 'up2right', 'front2left', 'front2right'];

//var operations = ['up2right'];
function CubeRestore(){}

CubeRestore.prototype.findSolution = function(rootCube){
	var cubeWrapper = new CubeWrapper(rootCube);
	var visited = {};
	var queue = [cubeWrapper];
	var solutionLeaf;
	var counterWapper = {count:0};
	while(queue.length > 0){
		console.log(queue.length);
		solutionLeaf = this._findSolution(queue, visited, counterWapper);
		if(solutionLeaf){
			break;
		}
	}
	
	if(solutionLeaf){
		var ret = [];
		var node = solutionLeaf;
		while(node.getOperation()){
			ret.push([node.getOperation(), node.getOperationIndex()]);
			node = node.parent;
		}

		for(var i = ret.length - 1; i >= 0; i--){
			console.log(ret[i]);
		}
	}
}

CubeRestore.prototype._findSolution = function(queue, visited, counterWapper){
	if(queue.length <= 0){
		return null;
	}
	var len = queue.length;
	for(var o = 0; o < len; o++){
		var cubeWrapper = queue[o];
		//if(!cubeWrapper.getOperation() || (cubeWrapper.getOperation() == 'up2right' && cubeWrapper.getOperationIndex() == 0)){
		//	console.log(cubeWrapper.getOperation() + '  ' + cubeWrapper.getOperationIndex());
		//	cubeWrapper.cube.inspect();
		//}

		var finished = cubeWrapper.cube.isFinished();
		if(finished){
			return cubeWrapper;
		}

		var identity = cubeWrapper.cube.identity();
		if(visited.hasOwnProperty(identity) || counterWapper.count > 1000000){
			continue;
		}
		visited[identity] = 1;
		counterWapper.count++;

		for(var i = 0; i < operations.length; i++){
			for(var j = 0; j < cubeWrapper.cube.up.rows(); j++){
				var newCube = cubeWrapper.cube[operations[i]](j);
				//newCube.inspect();
				var newCubeWrapper = new CubeWrapper(newCube);
				cubeWrapper.children.push(newCubeWrapper);
				newCubeWrapper.parent = cubeWrapper;
				newCubeWrapper.operation = operations[i];
				newCubeWrapper.operationIndex = j;

				queue.push(newCubeWrapper);
			}
		}
	}
	queue.splice(0, len);
}

var ORANGE = 0;
var BLUE = 1;
var WHITE = 2;
var GREEN = 3;
var RED = 4;
var YELLOW = 5;


var cube = new Cube();
/*
cube.front = $M([[RED, GREEN, GREEN], [ORANGE, RED, WHITE], [ORANGE, BLUE, WHITE]]);
cube.up = $M([[RED, YELLOW, ORANGE], [RED, YELLOW, ORANGE], [BLUE, YELLOW, WHITE]]);
cube.back = $M([[YELLOW, GREEN, BLUE], [YELLOW, WHITE, ORANGE], [BLUE, BLUE, WHITE]]);
cube.bottom = $M([[RED, RED, GREEN], [ORANGE, ORANGE, YELLOW], [GREEN, WHITE, YELLOW]]);
cube.left = $M([[ORANGE, WHITE, YELLOW], [RED, GREEN, GREEN], [RED, GREEN, GREEN]]);
cube.right = $M([[WHITE, WHITE, ORANGE], [BLUE, BLUE, RED], [BLUE, BLUE, YELLOW]]);
*/

cube.front = $M([[RED, RED], [RED, RED]]);
cube.up = $M([[YELLOW, YELLOW], [YELLOW, YELLOW]]);
cube.back = $M([[BLUE,BLUE], [BLUE,BLUE]]);
cube.bottom = $M([[ORANGE,ORANGE], [ORANGE,ORANGE]]);
cube.left = $M([[WHITE,WHITE], [WHITE,WHITE]]);
cube.right = $M([[GREEN,GREEN], [GREEN,GREEN]]);

cube = cube.up2left(0);
cube = cube.front2left(0);
//cube.inspect();
//console.log('=======================');
//cube.up2right(0).inspect();

var cubeRestore = new CubeRestore();
var ret = cubeRestore.findSolution(cube);





/*
var arr = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
var face = $M(arr);

var cube = new Cube();

for(var i = 0; i < 6; i++){
	var arr = [[i, i, i], [i, i, i], [i, i, i]];
	switch(i){
		case 0:
		cube.front = $M(arr);
		break;
		case 1:
		cube.up = $M(arr);
		break;
		case 2:
		cube.back = $M(arr);
		break;
		case 3:
		cube.bottom = $M(arr);
		break;
		case 4:
		cube.left = $M(arr);
		break;
		case 5:
		cube.right = $M(arr);
		break;
	}
}

console.log(isPureMatrix(cube.up));

var newCube = cube.front2left(0);
console.log(newCube);

console.log(isPureMatrix(newCube.up));

var newCube2 = newCube.front2right(0);
console.log(newCube2);

console.log(newCube2.isFinished());

console.log(newCube.identity() + "   " + newCube2.identity());

var v = Vector.create([6,2,9]);
console.log(reverseVector(v));
*/
//var arr2 = [[-1, -2, -3, -4], [-5, -6, -7, -8], [-9, -10, -11, -12], [-13, -14, -15, -16]];

//var face2 = $M(arr2);
//console.log(replaceRow(face, face2.row(1), 1));

//console.log(replaceCol(face, face2.col(1), 1));
/*
console.log(face.inverse());
var transpose = face.transpose();


console.log(rotate90(arr, true));
console.log(rotate90(arr, false));

var cube = new Cube();

console.log(createAntiDiagonal(4));
*/