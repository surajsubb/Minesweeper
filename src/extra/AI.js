
const inBounds = (r,c,m,n) => {
    if( r >= 0 && r < m && c >= 0 && c < n){
      return true
    }
    return false
}
const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const containsObject = (obj, list) => {
    var i;
    for(i=0;i<list.length; i++){
        if(list[i].row == obj.row && list[i].column == obj.column){
            return list[i].color;
        }
    }
    return '#';
}
const tankSolver = (arr) => {
    let ans = []
    let m = arr.length
    let n = arr[0].length
    for(let i=0; i<m; i++){
        for(let j=0; j<n; j++){
            if(arr[i][j] == -1 || arr[i][j] == 'F'){
                continue;
            }
            else{
                let temp = getBorderTiles(i,j,m,n,arr,ans)
                if(temp!=null){
                    ans = ans.concat(temp)
                }
            }
        }
    }
    return ans;
}
const getBorderTiles = (i, j, rows, cols, arr, ans) => {
    i--
    j--
    let borderTiles = []
    let newBorder = true
    let newColor = getRandomColor()
    var isColor
    for(let l=0; l<3; l++){
        for(let m=0; m<3; m++){
            if(l == 1 && m == 1){
                continue;
            }
            else{
                if(inBounds(i+l,j+m,rows,cols)){
                    if(arr[i+l][j+m] == -1){
                        let temp = {
                            row: i+l,
                            column: j+m,
                            flag: 2,
                            color: newColor,
                        }
                        isColor = containsObject(temp, ans)
                        if(newBorder && !(isColor === '#')){
                            newBorder = false
                            newColor = isColor
                            for(let i=0; i<borderTiles.length; i++){
                                borderTiles[i].color = newColor
                            }
                        }
                        if(isColor === '#'){
                            borderTiles.push(temp)
                        }
                    }
                }

            }
        }
    }
    return borderTiles;
    
}
const threeByThreeSearch = (i, j, rows, cols, arr) => {
    i--
    j--
    let ans = []
    let count = 0
    let flagCount = 0
    for(let l=0; l<3; l++){
        for(let m=0; m<3; m++){
            if(l == 1 && m == 1){
                continue;
            }
            else{ 
                if(inBounds(i+l,j+m,rows,cols)){
                    if(arr[i+l][j+m] == -1){
                        count++;
                        ans.push({
                            row: i+l,
                            column: j+m,
                            flag: 1
                        })
                    }
                    else if(arr[i+l][j+m] == 'F'){
                        flagCount++;
                    }
                }
            }
        }
    }
    if(flagCount == arr[i+1][j+1]){
        for(let i=0; i<ans.length; i++){
            ans[i].flag = 0;
        }
        return ans;
    }
    if(count == arr[i+1][j+1]-flagCount){
        return ans
    }
    else{
        return null
    }
}
const simpleAlgo = (arr) => {
    let ans = []
    let m = arr.length
    let n = arr[0].length
    for(let i=0; i<m; i++){
        for(let j=0; j<n; j++){
            if(arr[i][j] == -1 || arr[i][j] == 0){
                continue;
            }
            else{
                let temp = threeByThreeSearch(i,j,m,n,arr)
                if(temp!=null){
                    ans = ans.concat(temp);
                }
            }
        }
    }
    return ans;
}

function nextMoveToMake(childData) {
    var ans = simpleAlgo(childData.playerBoard)
    // if(ans.length == 0){
    //     ans = tankSolver(childData.playerBoard)
    // }
    return ans;



    return [
        {
            row: 0,
            column: 0,
            flag: true
        }
    ]
}

exports.nextMoveToMake = nextMoveToMake