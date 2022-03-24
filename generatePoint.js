import ToolsStars from "./tools.js";

export class GeneratePoint extends ToolsStars
{
    constructor(col,row,density)
    {
        super();
        this._col = col;
        this._row = row;
        this._density = density;
    }
    get col(){ return this._col; }
    get row(){ return this._row; }
    get density(){ return this._density; }

    getPosition(positionStart, positionEnd)
    {
        return Math.round(super.randomNumber(positionStart, positionEnd));
    }

    enumeration()
    {
        const col = this.col,
              row = this.row,

              arrCol = new Array(),
              arrRow = new Array();
        for (const rowKey in row)
        {
            const lineRow = row[rowKey];
            for (const colKey in col)
            {
                const lineCol = col[colKey],
                      positionRow = this.getPosition(lineRow[0],lineRow[1]),
                      positionCol = this.getPosition(lineCol[0],lineCol[1]);
                arrRow.push(positionRow);
                arrCol.push(positionCol);
            }
        }
        return [arrCol,arrRow];
    }

    dotsPerLayot(i = 0)
    {
        const density = this.density,
              result  = new Array();
        do{
            i++;
            result.push(this.enumeration());
        }
        while( i < density)
        return result;
    }
    varErr(variable) //TODO new class object
    {
        throw "Ошибка, не определено содержимое переменной, должен быть массив типа [[1,2],[1,2]]";
    }
}