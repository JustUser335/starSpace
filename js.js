import Create from './create_element.js';
import Layot from './layot.js';
import ToolsStars from './tools.js';
import {GeneratePoint} from './generatePoint.js';


document.addEventListener('DOMContentLoaded',function(){
    /*\
    |*| узел задаёт стили документа
    \*/
    const body   = document.querySelector('body');
    body.style.width  = '100vw';
    body.style.height = '100vh';
    body.style.margin = 0;

    const width  = body.clientWidth-0,
          height = body.clientHeight-0;
    /*\
    |*| узел создаёт элемент канвас, передаёт стили
    \*/
    const createCanvas = new Create('canvas','body'),
          canvas  = createCanvas.create();
    canvas.width  = width;
    canvas.height = height;
    canvas.style.background = '#000';


    /*\
    |*| ========= лист задач ==========
    |*| траектория перемещения к центру
    |*| круговая траектория перемещения
    |*| генерация одной "звезды" +
    |*| очистка за ней +
    |*| установить некоторую плотность звезд +
    |*| скорость перемещения +
    |*| случайный размер от 2х2 до 4x4 +
    |*| перезагрузку +
    |*| длительность протекания эффекта +
    |*| рандомный цвет +
    |*|
    |*| == оптимизация ресурсов скрипта ==
    |*| для удобства вынести управляющие переменные
    |*| вынести все определители классов
    |*| вопрос кеширования данных
    |*| определить несколько видов координат для создания видимости генерации, сейчас генерит онлайн
    |*| можно продолжить генерировать онлайн , но координаты нужно получить заранее несколько партий и гнать по ним
    |*| или отключить генерацию и гонять несколько партий координат, что удобнее
    \*/



    (function generatorStar(listCoordinate)
    {
        /*\
        |*| наборы базовых параметров, определение сетки
        \*/
        const setCountCell = 8;
        const setDensityStar = 2;
        const setStartSizeFrom = 2;
        const setStartSizeUpTo = 4;
        const setTimeRefreshStar = 2000;

        let countCell  = setCountCell; // управляющее число количество ячеек
        const layotCol = new Layot(width, countCell), // определение класса сеток
            layotRow = new Layot(height, countCell);
        const tools = new ToolsStars(); // инструменты 1мс
        const layotColPairCoordinates = layotCol.pairCoordinates(); //определение пары координат сетки
        const layotRowPairCoordinates = layotRow.pairCoordinates();

        const cntxt = canvas.getContext('2d'); // передача контекста

        //определение класса для получения координит звезд
        const getCoordinateStar = new GeneratePoint(layotColPairCoordinates,layotRowPairCoordinates,setDensityStar);

        listCoordinate = new Array();

        setInterval(function() // первая интервальная линия
        {
            // получение листа координат звезд (2) млсек в 3 || 6 раз
            const listCoordinate = getCoordinateStar.dotsPerLayot();

            for (const listCoordinateEl of listCoordinate)
            {
                const length     = listCoordinateEl[0].length;
                const listCEColl = listCoordinateEl[0];
                const listCERow  = listCoordinateEl[1];

                for (const listCECollKey in listCEColl)
                {
                    let position_X = listCEColl[listCECollKey];
                    let position_Y = listCERow[listCECollKey];
                    const getRandomSize = tools.randomNumber(setStartSizeFrom,setStartSizeUpTo);
                    const speed = tools.speed(getRandomSize);
                    let rectWidth  = getRandomSize;
                    let rectHeight = getRandomSize;

                    let start = timeStamp();
                    // 2к ходов потрачено  8 мс.
                    const timeStartShine = tools.timeStamp();
                    let end = timeStamp();
                    cl(end - start);
                    let shine = 0;
                    let timeEndShine = Math.round(tools.randomNumber(2,4));
                    timeEndShine = `${timeEndShine}000`;

                    const intervelShineStartEnd = timeEndShine / 5;


                    let interval = setInterval(function ()
                    {
                        const timeCurrentShine = new Date().getTime();
                        shine = tools.shine(shine, timeStartShine, timeCurrentShine, intervelShineStartEnd, timeEndShine);
                        const color = (tools.colorStar(shine)).join(',');
                        cntxt.fillStyle = `rgb(${color})`;
                        cntxt.clearRect(position_X-1, position_Y-4, rectWidth*2, rectHeight*4);
                        cntxt.fillRect(position_X+speed, position_Y, rectWidth, rectHeight);
                        position_X++;
                    },1000/30);
                    setTimeout(function ()
                    {
                        clearInterval(interval);
                        cntxt.clearRect((position_X+speed)-1, position_Y, rectWidth+2, rectHeight+2);
                    },timeEndShine)
                    //#для перезагрузки попробуй завернуть узел в интервал
                }
            }
        },setTimeRefreshStar);
    })()

});

function timeStamp() {
    return new Date().getTime();
}
function cl(el)
{
    console.log(el);
}
