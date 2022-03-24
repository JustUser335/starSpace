export default class Layot {
    constructor(size, countCol)
    {
        this.size   = size;
        this.col    = countCol;
    }
    gridСoordinates()
    {
        const size = this.size, col = this.col;
        const colSize = size / col, arr = [0];
        let colPoint = 0;
        for (let i = 0; i < col; i++) {
            colPoint +=colSize;
            arr.push(colPoint);
        }
        return arr;
    }
    pairCoordinates()
    {
        const arrLine = this.gridСoordinates();
        const iterator = arrLine[Symbol.iterator]();
        const arrCoordTwoPoint = [];
        for (let i = 0; i < arrLine.length; i++) {
            let arrTwoPoint = [];
            let ob = iterator.next();
            const arrLen = arrLine.length - 1;
            if(i < arrLen){
                arrTwoPoint.push(ob.value,arrLine[i+1]);
                arrCoordTwoPoint.push(arrTwoPoint)
            }
        }
        return arrCoordTwoPoint;
    }
}