
const repeatChar = (count, ch) => {
    if (count == 0) {
        return "";
    }
    var count2 = count / 2;
    var result = ch;

    while (result.length <= count2) {
        result += result;
    }
    return result + result.substring(0, count - result.length);
};
const dec2bin = (dec, len) => {
    var suffix = (dec >>> 0).toString(2);
    let prefix = repeatChar(len-suffix.length, '0')
    //console.log(prefix)
    return prefix+suffix
}
const binary1ToN = (n, len) => {
    var sequence = []
    for(let i=1; i<n; i++){
        sequence.push(dec2bin(i,len))
    }
    return sequence
}
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
const compare = (a, b) => {
    if(a.borderNum > b.borderNum){
        return 1
    }
    else if(a.borderNum == b.borderNum){
        if(a.row > b.row){
            return 1
        }
        else if(a.row == b.row){
            if(a.column > b.colum){
                return 1
            }
            else{
                return -1
            }
        }
        else{
            return -1
        }
    }
      return -1
}
const containsObject = (obj, list) => {
    var i;
    for(i=0;i<list.length; i++){
        if(list[i].row == obj.row && list[i].column == obj.column){
            return {
                    isColor: list[i].color,
                    borderNum: list[i].borderNum
                }
        }
    }
    return null;
}
const tankSolver = (arr) => {
    let ans = []
    let borderAssociatedTiles = []

    let m = arr.length
    let n = arr[0].length

    for(let i=0; i<m; i++){
        for(let j=0; j<n; j++){
            if(arr[i][j] == -1 || arr[i][j] == 'F'){
                continue;
            }
            else{
                let data = getBorderTiles(i,j,m,n,arr,ans, borderAssociatedTiles)
                if(data.borderTiles != null){
                    ans = ans.concat(data.borderTiles)
                }
                if(data.borderAssociatedTiles != null){
                    borderAssociatedTiles = borderAssociatedTiles.concat(data.borderAssociatedTiles)
                }
            }
        }
    }
    ans.sort(compare)
    borderAssociatedTiles.sort(compare)
    var borderNums = []
    if(ans.length > 0)
        borderNums.push(ans[0].borderNum)
    for(let i=0; i<ans.length-1; i++){
        if(ans[i].borderNum != ans[i+1].borderNum){
            borderNums.push(ans[i+1].borderNum)
        }
    }

    var sequences = [];
    var borderAssociateSequences = []
    var segregate = [];
    var borderAssociateSegregate = []

    for(let i=0; i<borderNums.length; i++){
        sequences = []
        borderAssociateSequences = []
        for(let j=0; j<ans.length; j++){
            if(ans[j].borderNum == borderNums[i]){
                sequences.push(ans[j])
            }
        }
        for(let j=0; j<borderAssociatedTiles.length; j++){
            if(borderAssociatedTiles[j].borderNum == borderNums[i]){
                borderAssociateSequences.push(borderAssociatedTiles[j])
            }
        }
        segregate.push(sequences);
        borderAssociateSegregate.push(borderAssociateSequences)

    }
    
    sequences = []
    var Ans = []
    for(let i=0; i<segregate.length; i++){
        sequences = []
        if(segregate[i].length > 23){
            continue;
        }
        sequences = binary1ToN(2**segregate[i].length,segregate[i].length)

        Ans = Ans.concat(allPossibilities(sequences, segregate[i], borderAssociateSegregate[i], arr, m, n))
        
    }
    return Ans
}
const allPossibilities = (sequences, segregate, borderAssociateSegregate, arr, m, n) => {
    let len = sequences.length
    let raisedto = segregate.length
    var bool
    var flag=0;
    let ansSequences = []
    for(let i=0; i<len; i++){
        flag=0;
        for(let j=0; j<raisedto; j++){
            if(sequences[i][j] == 0){
                arr[segregate[j].row][segregate[j].column] = -1
            }
            else{
                arr[segregate[j].row][segregate[j].column] = 'F'
            }
        }
        for(let k=0; k<borderAssociateSegregate.length; k++){
            bool = checkPossibility(borderAssociateSegregate[k].row,
                                    borderAssociateSegregate[k].column,
                                    arr, m, n
                                    )
            if(!bool){
                flag = 1;
                break;
            }
        }
        if(flag == 0){
            ansSequences.push(sequences[i])
        }
    }
    for(let j=0; j<raisedto; j++){
        arr[segregate[j].row][segregate[j].column] = -1
    }
    var ans = []
    let ansLen = ansSequences.length
    if(ansLen > 0){
        let count0 = 0
        let count1 = 0
        for(let i=0; i<raisedto; i++){
            count0 = 0
            count1 = 0
            for(let j=0; j<ansLen; j++){
                if(ansSequences[j][i] == 0){
                    count0++;
                }
                else{
                    count1++;
                }
            }
            if(count0 == ansLen){
                ans.push({  row: segregate[i].row,
                            column: segregate[i].column,
                            flag: 0
                        })
            }
            else if(count1 == ansLen){
                ans.push({  row: segregate[i].row,
                    column: segregate[i].column,
                    flag: 1
                })
            }
            // else{
            //     if(count0/ansLen > 0.7){
            //         ans.push({  row: segregate[i].row,
            //             column: segregate[i].column,
            //             flag: 0
            //         })
            //     }
            //     if(count1/ansLen > 0.6){
            //         ans.push({  row: segregate[i].row,
            //             column: segregate[i].column,
            //             flag: 1
            //         })
            //     }
            // }
        }
    }

    return ans
}
const checkPossibility = (i, j, arr, rows, cols) => {
    i--
    j--
    let count = 0
    let flagCount = 0
    for(let l=0; l<3; l++){
        for(let m=0; m<3; m++){
            if(l == 1 && m == 1){
                continue;
            }
            else{ 
                if(inBounds(i+l,j+m,rows,cols)){
                    if(arr[i+l][j+m] == 'F'){
                        flagCount++;
                    }
                }
            }
        }
    }
    if(flagCount == arr[i+1][j+1]){
        return true;
    }
    return false;
}

const getBorderTiles = (i, j, rows, cols, arr, ans, borderAssociate) => {
    i--
    j--
    let borderTiles = []
    let borderAssociatedTiles = []

    let addedAssociatedBorder = false
    let newColor = getRandomColor()
    var data
    let bordernum = 0
    if(ans.length != 0){
        bordernum = ans[ans.length-1].borderNum+1
    }
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
                            borderNum: bordernum,
                        }


                        data = containsObject(temp, ans)
                        if(!(data == null)){

                            for(let i=0; i<ans.length; i++){
                                if(ans[i].borderNum == data.borderNum){
                                    ans[i].color = newColor
                                    ans[i].borderNum = bordernum
                                }
                            }

                            for(let i=0; i<borderAssociate.length; i++){
                                if(borderAssociate[i].borderNum == data.borderNum){
                                    borderAssociate[i].borderNum = bordernum
                                }
                            }
                        }
                        if(!addedAssociatedBorder){
                            addedAssociatedBorder = true
                            borderAssociatedTiles.push({
                                                        row: i+1,
                                                        column: j+1,
                                                        borderNum: bordernum,
                                                        })
                        }

                        if(data == null){
                            borderTiles.push(temp)
                        }
                    }
                }

            }
        }
    }
    if(borderTiles.length == 0){
        borderTiles = null
    }
    if(borderAssociatedTiles.length == 0){
        borderAssociatedTiles = null
    }
    return { borderTiles: borderTiles, borderAssociatedTiles: borderAssociatedTiles};
    
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
    if(ans.length == 0){
        ans = tankSolver(childData.playerBoard)
    }
    return ans;

}


exports.nextMoveToMake = nextMoveToMake