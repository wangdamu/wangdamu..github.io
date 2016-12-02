function Cube(){
    return {
    	up:[1],
    	front:[],
    	left:[],
    	right:[],
    	bottom:[],
    	back:[],


    	up2front:function(index){
    		var ret = new Cube();
    		if(index == 0){
    			//最左边的
    			//修正left
    			ret.left = clockRotate(up);
    		}else if(index == front[0].length - 1){
    			//最右边 修正right
    			ret.right = clockReverseRotate(right);
    		}
    		ret.front = copy(front);
    		ret.up = copy(up);
    		ret.bottom = copy(bottom);
    		ret.back = copy(back);
    		_up2front(front, up, back, bottom, index);
    		return ret;
    	},

    	up2back:function(index){
    		
    	}
    };
}

function copy(towDimensionArray){
	var ret = [];
	for(var i = 0; i < towDimensionArray.length; i++){
		var row = [];
		for(var j = 0; j < towDimensionArray[i].length; j++){
			row.push(towDimensionArray[i][j]);
		}
		ret.push(row);
	}
	return ret;
}


function _up2front(front, up, back, bottom, index){
	for(var i = 0; i < front[index].length){
		var temp = front[index][i];
		front[index][i] = up[index][i];
		up[index][i] = back[index][i];
		back[index][i] = bottom[index][i];
		bottom[index][i] = temp;
	}
}

/*
	1 2 3		7 4 1
	4 5 6  ->   8 5 2
	7 8 9		9 6 3
*/
function clockRotate(face){
	var ret = [];
	for(var j = 0; j < face[0].length; j++){
		ret.push([]);
	}
	for(var i = 0; i < face.length; i++){
		for(var j = 0; j < face[i].length; j++){
			ret[j][i] = face[i][j];
		}
	}

	for(var i = 0; i < face.length / 2; i++){
		for(var j = 0; j < face[i].length; j++){
			var temp = ret[j][i];
			ret[j][i] = ret[j][face.length - i - 1];
			ret[j][face.length - i - 1] = temp;
		}
	}
	return ret;
}

/*
	1 2 3		3 6 9
	4 5 6  ->   2 5 8
	7 8 9		1 4 7
*/
function clockReverseRotate(face){
	var ret = [];
	for(var j = 0; j < face[0].length; j++){
		ret.push([]);
	}
	for(var i = 0; i < face.length; i++){
		for(var j = 0; j < face[i].length; j++){
			ret[j][i] = face[i][j];
		}
	}

	for(var i = 0; i < ret.length / 2; i++){
		for(var j = 0; j < ret[i].length; j++){
			var temp = ret[i][j];
			ret[i][j] = ret[ret.length - i - 1][j];
			ret[ret.length - i - 1][j] = temp;
		}
	}
	return ret;
}


var face = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
console.log(clockReverseRotate(face));

var cube = new Cube();

