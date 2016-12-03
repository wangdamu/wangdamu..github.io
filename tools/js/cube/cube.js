function Cube(){
	return {up2front:function(index){
		var ret = new Cube();
		if(index == 0){
			//最左边的
			//修正left
			ret.left = rotate90(left, true);
		}else if(index == front[0].length - 1){
			//最右边 修正right
			ret.right = rotate90(right, false);
		}
		ret.front = front.dup(); //copy(front);
		ret.up = up.dup();
		ret.bottom = bottom.dup(); //copy(bottom);
		ret.back = back.dup(); //copy(back);
		_up2front(front, up, back, bottom, index);
		return ret;
	}
	}
}

function replaceRow(target, source, row){
	return target.map(function(e, i, j){
		if(i == row + 1){
			return source.e(i, j);
		}else{
			return e;
		}
	});
}

function replaceCol(target, source, col){
	return target.map(function(e, i, j){
		if(j == col + 1){
			return source.e(i, j);
		}else{
			return e;
		}
	});
}

function _up2front(front, up, back, bottom, index){
	var ret = [];
	for(var i = 0; i < front.length; i++){
		var temp = [];
		for(var j = 0; j < front[i].length; i++){
			if(i == j && j != index){
				temp.push(1);
			}else{
				temp.push(0);
			}
		}
		ret.push(temp);
	}



	for(var i = 0; i < front[index].length; i++){
		var temp = front.rows(index).e(i);
		front[index][i] = up[index][i];
		up[index][i] = back[index][i];
		back[index][i] = bottom[index][i];
		bottom[index][i] = temp;
	}
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
	console.log(ret);
	return $M(ret);
}

function rotate90(array, clock){
	var m = $M(array);
	var transpose = m.transpose();
	var antiDiagonal = createAntiDiagonal(array.length);
	if(clock){
		return transpose.x(antiDiagonal);
	}else{
		return antiDiagonal.x(transpose);
	}
}

var arr = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
var face = $M(arr);
var arr2 = [[-1, -2, -3, -4], [-5, -6, -7, -8], [-9, -10, -11, -12], [-13, -14, -15, -16]];

var face2 = $M(arr2);
console.log(replaceRow(face, face2, 1));

console.log(replaceCol(face, face2, 1));
/*
console.log(face.inverse());
var transpose = face.transpose();


console.log(rotate90(arr, true));
console.log(rotate90(arr, false));

var cube = new Cube();

console.log(createAntiDiagonal(4));
*/