export default class ToolsStars{
    constructor() {}
    randomNumber(positionStart, positionEnd)
    {// сделать привязку значения наоборот
        const rand = positionStart - 0.5 + Math.random() * (positionEnd - positionStart + 1);
        return rand;
    }
    speed(size)
    {// принеобходимости сделать параметры скорости через каррирование
        let speed = 0;
        if(size <= 3){
            speed = this.randomNumber(0.5,1)
        }else{
            speed = this.randomNumber(1,2)
        }
        return speed;
    }
    shine(fading,timeStart, timeEnd,intervalStartEnd,timeEndShine)
    {
        const intervalShineEnd = timeEndShine - intervalStartEnd;
        const timeFadingDistance = timeEnd - timeStart;
        timeFadingDistance > 0 && timeFadingDistance < intervalStartEnd?fading +=0.1:'';
        timeFadingDistance > intervalStartEnd && timeFadingDistance < intervalShineEnd?fading = 1:'';
        timeFadingDistance > intervalShineEnd?fading -=0.1:'';
        return fading;
    }
    colorStar(fading)
    {
        const positionStart = 120 * fading;
        const positionEnd   = 255 * fading;

        const r = this.randomNumber(positionStart, positionEnd);
        const g = this.randomNumber(positionStart, positionEnd);
        const b = this.randomNumber(positionStart, positionEnd);

        return [r,g,b];
    }
    timeStamp()
    {return new Date().getTime()}
}