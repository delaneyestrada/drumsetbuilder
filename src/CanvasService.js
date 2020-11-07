import {
    fabric
} from 'fabric';
import {
    v4 as uuidv4
} from 'uuid'
const scaleFactor = 4
class CanvasService {





    static resizeCanvas(canvas, initial = false, save = false) {
        const outerCanvasContainer = document.querySelector('.fabric-wrapper');
        const ratio = canvas.getWidth() / canvas.getHeight();
        var containerWidth = outerCanvasContainer.clientWidth;
        if (initial && containerWidth > 1000) {
            containerWidth = 1000
        } else if (save) {
            containerWidth = 1920
        } else if (containerWidth > 1000) {
            return true
        }

        // const containerHeight = outerCanvasContainer.clientHeight;

        const scale = containerWidth / canvas.getWidth();
        const zoom = canvas.getZoom() * scale;
        canvas.setDimensions({
            width: containerWidth,
            height: containerWidth / ratio
        })
        canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
    }

    static initCanvas(canvas, rugPattern) {
        let rug = new fabric.Rect({
            width: 84 * scaleFactor,
            height: 60 * scaleFactor,
            fill: '#ffffff'
        })
        canvas.add(rug)
        rug.borderColor = 'gray'
        rug.cornerColor = 'black'
        rug.center()
        fabric.util.loadImage(rugPattern, function (img) {
            rug.set('fill', new fabric.Pattern({
                source: img,
                repeat: 'repeat'
            }))
            canvas.renderAll()
        })
        this.resizeCanvas(canvas)

    }

    static convertToImage(canvas) {
        this.resizeCanvas(canvas, false, true)
        canvas.discardActiveObject().renderAll();
        // document.getElementById("scrnsht").src = canvas.toDataURL('png');
        let link = document.getElementById("scrnsht")
        link.href = canvas.toDataURL('png')
        link.click()
        this.resizeCanvas(canvas, true)
    }
    static addToCanvas(canvas, category, options) {
        var obj
        if (category == "drum") {
            if (options.type == 'Kick') {
                obj = new fabric.Rect({
                    fill: '#ffffff',
                    stroke: '#000000',
                    strokeWidth: 1.5,
                    height: options.depth * scaleFactor,
                    width: options.diameter * scaleFactor,

                })
            } else {
                obj = new fabric.Circle({
                    fill: 'rgba(255,255,255, 0.5)',
                    stroke: '#000000',
                    strokeWidth: 1.5,
                    radius: (options.diameter / 2) * scaleFactor,

                })
            }
        } else {
            obj = new fabric.Circle({
                fill: '#d0b17d',
                stroke: '#000000',
                strokeWidth: 1.5,
                radius: (options.diameter / 2) * scaleFactor,
            })
        }

        // let text = new fabric.Text(options.label, {
        //     fontSize: 15,
        //     originX: 'center',
        //     originY: 'center'
        // })
        // let text = new fabric.Text("", {
        //     fontSize: 15,
        //     originX: 'center',
        //     originY: 'center'
        // })
        // let group = new fabric.Group([obj, text], {
        //     left: 100,
        //     top: 100
        // })

        obj.setControlsVisibility({
            bl: false,
            br: false,
            mb: false,
            ml: false,
            mr: false,
            mt: false,
            tl: false,
            tr: false,
            mtr: true
        })

        obj.borderColor = 'gray'
        obj.cornerColor = 'black'
        if (options.depth) {
            obj.depth = options.depth
        }
        obj.diameter = options.diameter
        obj.label = options.label
        obj.brand = options.brand
        obj.model = options.model
        obj.objType = category
        obj.objInstrument = options.type
        obj.id = uuidv4()

        obj.on("mousedblclick", (e) => {
            const event = new CustomEvent('edit-object', {
                detail: e.target
            })
            document.getElementById("canvas").dispatchEvent(event)
        })

        canvas.add(obj)
        this.resizeCanvas(canvas)

        // canvas.forEachObject(function (obj) {
        //     if(obj.label){

        //     drumList.innerHTML += `<li class="drum-list-item">${obj.label} ${obj.userLabel}</li>`
        //     }
        // })
    }

    static canvasToJSON(canvas) {
        return canvas.toJSON(['brand', 'depth', 'diameter', 'label', 'model', 'objType', 'id', 'borderColor', 'cornerColor', '_controlsVisibility', 'objInstrument'])
    }

    static initTooltip(canvas) {
        console.log(canvas)
        // canvas.on('object:over', function (e) {
        //     e.target.set('fill', 'red')
        //     canvas.renderAll()
        // })
        // function showImageTools(e) {
        //     if (!document.querySelector('#imageDialog').length) {
        //         document.querySelector('body').append("<div id='imageDialog' style='position: absolute; top: 0; left: 0'><h1>Hello</h1></div>");
        //     }

        //     moveImageTools(e);

        // }

        // function moveImageTools(e) {
        //     var w = document.querySelector('#imageDialog').width();
        //     var h = document.querySelector('#imageDialog').height();
        //     //var e = canvas.getActiveObject();
        //     //var e = canvas._setCursorFromEvent();
        //     var coords = getObjPosition(e);
        //     console.log('coords', coords);
        //     // -1 because we want to be inside the selection body
        //     var top = coords.bottom - h - 1;
        //     var left = coords.right - w - 1;
        //     document.querySelector('#imageDialog').show();
        //     document.querySelector('#imageDialog').css({
        //         top: top,
        //         left: left
        //     });
        // }

        // function getObjPosition(e) {
        //     // Get dimensions of object
        //     var rect = e.getBoundingRect();
        //     // We have the bounding box for rect... Now to get the canvas position
        //     var offset = canvas.calcOffset();
        //     // Do the math - offset is from $(body)
        //     var bottom = offset._offset.top + rect.top + rect.height;
        //     var right = offset._offset.left + rect.left + rect.width;
        //     var left = offset._offset.left + rect.left;
        //     var top = offset._offset.top + rect.top;
        //     return {
        //         left: left,
        //         top: top,
        //         right: right,
        //         bottom: bottom
        //     };
        // }
    }


}

export default CanvasService