import { Component, OnInit} from "@angular/core";
import "fabric";

import { LocalDataService } from "./shared/local-data.service";
import { DieCutData } from "./shared/models/die-cut-data";
import { OrderData, OrderItem, PrintData } from "./shared/models/order-data";
import { CanvasType, TextType } from "./shared/enums";
import { PaperColor, Rectangle, Point, Size, ImageData } from "./shared/models/canvas-data";

declare const fabric: any;
declare var $:any; // jQuery

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: [ "./app.component.css" ]
})
export class AppComponent implements OnInit {
  public appName = "WAFT Admin";
  public counter: number = 1;
  public orderId: string;
  public orderData: OrderData;
  public orderImages: ImageData[];
  public printDataNames: string[] = ["image","title","message","waft","initials"];
  public message: string = "";
  // private visibility: string = "hidden";
  // private messageLines: string[] = [];
  //
  private fontSizeMax: number = 36;
  public fontSize: number = 12;  // deffault
  private fontSizes: number[] = [];
  private moveStep: number = 5;   // for moving coordinate x and y
  //
  public itemSizes: string[] = ["100ML","50ML","15ML","5ML","BOX"];
  public paperColors: PaperColor[] = [];
  // private paperColorData: string = "White=#ffffff,Natural White=#f7f7ed,Black=#000000"
  public fontFamily: string[] = ["Times Roman","Helvetica","Courier","Symbol","ZapfDingbats","Tangerine"];
  public textAlignment: string[] = ["left", "center", "right" , "justify"];
  //
  public textAngle: number;
  public imageX: number;
  public imageY: number;
  public imageWidth: number;
  public imageHeight: number;
  public imageAngle: number;
  //
  public textTitle: string = "";
  public titleX: number;
  public titleY: number;
  public titleAngle: number;
  //
  public messageX: number;
  public messageY: number;
  public messageAngle: number;
  //
  public textWaft: string = "";
  public waftX: number;
  public waftY: number;
  public waftAngle: number;
  //  
  public textInitials: string = "";
  public initialsX: number;
  public initialsY: number; 
  public initialsAngle: number;

  public WIDTH: number = 0;
  public HEIGHT: number = 0;

  public currentRect: Rectangle;
  // private currentRectImage: ImageData;  //NOT USED, could use to avoid redrawing the details rect
  // private currentImage: ImageData;  //NOT USED, could use to avoid redrawing the an image on the details rect
  public savedRectangles: Rectangle[] = [];  // keep data after the save button clicked
  public paperDieCutPatterns: DieCutData[] = [];
  // private paperDieCutPatterns2: Map<string, Rectangle>;
  public savedDetailRectangles = new Map<string, string>();
  public dataPoints: Map<string, Point>;
  // Canvas 
  public canvas: any;
  public canvasDetails: any;
  //private props: CanvasConfig;

  public errorMessage: string;
  public url: string = "";
  public size: Size = {
      width: 595,
      height: 842
  };

  private selectedObject: any; // not used

  constructor(private dataService: LocalDataService) { 
      //console.log("Text Type", TextType.Title);
  }

  ngOnInit() {
    //console.log("Text Type", TextType.Title);
    //object:added — fired after object has been added
    this.setCanvas();
    this.loadFontFamily();
    this.setPaperDieCutLayout();
    this.addDieCutRectangles();
    //this.testEvent(null);
    this.getOrderDataById("1"); //TODO: Remove after test
  }

  private setCanvas() {
      this.canvas = new fabric.Canvas("canvas1", {
        // hoverCursor: "pointer",
        // selection: true,
        // selectionBorderColor: "blue"        
      });
      this.canvasDetails = new fabric.Canvas("canvas2");
      //new fabric.Canvas("c", { preserveObjectStacking:true });
      this.canvasDetails.preserveObjectStacking = true; // 
      //this.canvas.setBackgroundColor("rgba(255, 73, 64, 0.6)");
      //this.canvas.setWidth(this.size.width);
      //this.canvas.setHeight(this.size.height);
      //
      
      // this.canvas.on("mouse:down", (e) => {
      //    this.handleCanvasClick(e);    
      // });
      //this.addEventHandlers(); // Slow performace

      this.canvasDetails.on("object:moving", (e) => {
         this.handleObjectMoving(e);    
      });
      this.canvasDetails.on("object:rotating", (e) => {
         this.handleObjectRotating(e);    
      });
      //TODO: Use the service to get data
      this.paperColors.push(new PaperColor("White","#ffffff"));
      this.paperColors.push(new PaperColor("Natural White","#f7f7ed"));
      this.paperColors.push(new PaperColor("Black","#000000"));
      
  }

  //
  private loadFontFamily() {
     this.dataService.getFontData()
          .subscribe(result => {
            this.fontFamily = result;
  //console.log(`DEBUG Inside getDieCutData method: rows = ${JSON.stringify(array)}`);          
          }, ex => {       
              this.errorMessage = ex.error.error;
        console.log(`ERROR Inside getDieCutData method: ${this.errorMessage}`);
          });         
  }

  //
  private handleObjectMoving(event) {
       let id = event.target.id;         
       let x = event.target.left.toFixed(2);
       let y = event.target.top.toFixed(2);       
       let p = new Point(x, y);    
       p.id = id;   
      
       this.setHtmlTextCoordinates(id, p);
      
   console.log(`DEBUG In handleObjectMoving: target.x=${event.target.left}, target.y=${event.target.top}`);
  }
  //A negative value means counter-clockwise, and a positive value means clock-wise
  private handleObjectRotating(event) {
       let id = event.target.id;
       let x = event.target.left.toFixed(2);
       let y = event.target.top.toFixed(2);         
       let p = new Point(x, y);      
       p.id = id; 
       p.angle = event.target.get("angle");
        
       this.setHtmlTextCoordinates(id, p);
 
    console.log(`DEBUG In handleObjectRotating: target.x=${event.target.left}, target.y=${event.target.top}`);
    
  }

  // Display the Details canvas in html
  public showDetails() {
      //need to set the border color of the active(clicked on) rectangular, redraw the canvas 
      //this.visibility = "hidden";
      this.WIDTH = 100;
      this.HEIGHT = 100;
      //document.getElementById("canvas-details").style.height = "100%";
       console.log(`DEBUG In showDetails: `);
      this.addDetailRectangle(this.currentRect);
  }

  // Used to clear and hide the Details canvas
  public clearDetails() {
      this.WIDTH = 0;
      this.HEIGHT = 0;
      //let c = this.canvasDetails.toJSON();
console.log(`DEBUG In clearDetails: JSON.stringify(canvasDetails):\n ${JSON.stringify(this.canvasDetails)}`);
// console.log(`DEBUG In clearDetails: JSON.stringify(canvas):\n ${JSON.stringify(this.canvas)}`);
      //document.getElementById("canvas-details").style.height = "0%";
      this.canvasDetails.clear();     
      //this.canvas.deactivateAllWithDispatch().renderAll();
  }

  public saveDetailRectData() {
      // Update currentRec Print Data with the latest html values
      this.updateCurrentRectPrintData();   
      // Save, if Need to undo or review. Let's say u saved it, but then decided to update
      if(!this.savedDetailRectangles) this.savedDetailRectangles = new Map<string, string>();
      this.savedDetailRectangles.set(this.currentRect.id, JSON.stringify(this.currentRect));
      //Update an orderItem Id to the this.currentRect.id
      let index = this.orderData.orderItems.findIndex((item) => 
                                item.imageUrl == this.currentRect.imageUrl);                            
      if(index > -1) {         
          this.orderData.orderItems[index].id = this.currentRect.id;          
          // Adjust coordinates - updates this.orderData.orderItems
          this.adjustCoordinates(this.currentRect, index);
      }
      

      //this.savedRectangles.push(this.currentRect);
      //let data = this.currentRect.printData.find(item => item.name.indexOf("title") > -1);
    console.log(`DEBUG In saveDetailObjectData: orderData = ${JSON.stringify(this.orderData)}`);  
      //console.log(`DEBUG In saveDetailObjectData: JSON.stringify(canvas):\n ${JSON.stringify(this.canvasDetails)}`);

    this.sendRequestToServer(); // remove after test 
  }

  // This method could be called right before sending json to the server
  // It removes data that has not been adjusted via the web form
  public saveAdjustedItemsOnly() {
    //   let index = this.orderData.orderItems.findIndex((item) => 
    //                             item.imageUrl == this.currentRect.imageUrl);
    //  if(index > -1) {   
      let adjustedItems = this.orderData.orderItems.filter(item => 
                          item.printData[0].status.indexOf("web-adjusted") > -1);
  //console.log(`DEBUG In saveAdjustedItemsOnly: adjustedItems = ${JSON.stringify(adjustedItems)}`); 
          this.orderData.orderItems = adjustedItems;
     //}
  }

  // Double action: sends numeric string to get OrderData Json
  // or sends the adjusted OrderData Json to the server
  public sendRequestToServer(data: string = "") {
    data = "123"; 
    //if(parseInt(data, 10))
    // if(isNaN(data))
    let isNumber: boolean;
    //Number.isInteger("123");
    if(data && /^\d+$/.test(data)) {
      isNumber = true;
    } else if(!data) {
        this.saveAdjustedItemsOnly();
        let replacer: any = (key, value) => typeof value === "undefined" ? null : value;
        data = JSON.stringify(this.orderData, replacer);
    }

    this.dataService.postToServer(data).subscribe((serverData) => {
          let result = serverData;
         console.log(`DEBUG In sendRequestToServer: result = ${JSON.stringify(result)}`);
          //let index = this.users.findIndex(u => u.UserId == this.currentUser.UserId);
          if (result){
             //if(Number.isInteger(data)) { 
             if(isNumber) {                  
                try {
                    this.orderData = JSON.parse(result);
                } catch (ex) {
                      return false;
                }
             }
          }
      }, ex => {
          this.errorMessage = ex.error;
          console.log(`ERROR In sendRequestToServer: result = ${JSON.stringify(ex)}`);
      });        
  }

  //
  private setHtmlTextCoordinates(id: string = "", point: Point = null) {
      id = (!id && point.id) ? point.id : id;
      if(id.indexOf("title") > -1) {
         this.titleX = point.x;
         this.titleY = point.y;
         this.titleAngle = point.angle;
       } else if(id.indexOf("message") > -1) {
         this.messageX = point.x;
         this.messageY = point.y;
         this.messageAngle = point.angle;
       } else if(id.indexOf("waft") > -1) {
         this.waftX = point.x;
         this.waftY = point.y;
         this.waftAngle = point.angle;
       } else if(id.indexOf("initials") > -1) {
         this.initialsX = point.x;
         this.initialsY = point.y;
         this.initialsAngle = point.angle;
       } else if(id.indexOf("image") > -1) {
         this.imageX = point.x;
         this.imageY = point.y;
         //this.imageAngle = point.angle;
       }
       this.textAngle = point.angle; // display in the html form
  }

  // Convert pixels to points. Fabric uses pixels and has a util method
  // to convert to pixels fabric.util.parseUnit("50mm"). This method does the reverse
  private pixels2Points(pixels: number, dpi: number): number {
      dpi = (!dpi || dpi <= 0) ? 96: dpi;
      //points: number = pixels * 72 / 96;
      let points: number = pixels * 72 / dpi;
      return points;
  }

  //update the currentRect.printData update2LatestHtmlData
  private updateCurrentRectPrintData(point: Point = null) {
      // for JSON.stringify - not to drop null properties
      let replacer = (key, value) => typeof value === "undefined" ? null : value;

      if(point) { // could use to update in real time b calling it from setHtmlTextCoordinates
        let i = this.currentRect.printData.findIndex(data => 
                              data.name.indexOf(point.id) > -1);
        this.currentRect.printData[i].x = point.x;
        this.currentRect.printData[i].y = point.y;
        this.currentRect.printData[i].orientation = point.angle;
      } else {
      // Udate to the latest values, when saving current data     
//console.log(`DEBUG In updateCurrentRectPrintData: this.currentRect.printData = ${JSON.stringify(this.currentRect.printData)}`); 
      // let canvasObjects = this.canvasDetails.getObjects();
      // for(let o of canvasObjects) {
      // console.log(`DEBUG In updateCurrentRectPrintData: Loop canvasObjects = ${o.id}, ${o.name}`);
      // }
      for(let data of this.currentRect.printData) {
console.log(`DEBUG In updateCurrentRectPrintData: Loop data = ${JSON.stringify(data)}`);
          let object = this.canvasDetails.getObjects().find(o => o.id.indexOf(data.name) > -1);
          let coords = object.calcCoords(); // get coordinates for all 4 corners
          data.x = object.left;
          data.y = object.top;
          data.width = object.width;
          data.height = object.height;
          data.orientation =  object.angle | 0;
          data.fontFamily = object.fontFamily;
          data.fontSize = object.fontSize;
          data.charSpacing = object.charSpacing;
          data.fontStyle = object.fontStyle;
          data.fontWeight = object.fontWeight;
          data.fontColor = (!object.stroke) ? data.fontColor : object.stroke;
          data.lineHeight = object.lineHeight;
          data.borderWidth = object.strokeWidth;
          data.measure = "px";
          data.textAlignment = object.textAlign;
          // set corner coordinates Top left, Top Right, Bottom Right, Bottom Left
          data.tlX = coords.tl.x;
          data.tlY = coords.tl.y;
          data.trX = coords.tr.x;
          data.trY = coords.tr.y;
          data.brX = coords.br.x;
          data.brY = coords.br.y;
          data.blX = coords.bl.x;
          data.blY = coords.bl.y;

  console.log(`DEBUG In updateCurrentRectPrintData: canvas object = ${JSON.stringify(object)}`);

          // The code below is redundant, because values set directly from canvas objects in code above
          if(data.name.indexOf("title") > -1) {
              data.x = this.titleX;
              data.y = this.titleY;
              data.orientation =  this.titleAngle | data.orientation;
          } else if(data.name.indexOf("message") > -1) {
              data.x = this.messageX;
              data.y = this.messageY;
              data.orientation = this.messageAngle | data.orientation;
          } else if(data.name.indexOf("waft") > -1) {
              data.x = this.waftX;
              data.y = this.waftY;
              data.orientation = this.waftAngle | data.orientation;
          } else if(data.name.indexOf("initials") > -1) {
              data.x = this.initialsX;
              data.y = this.initialsY;
              data.orientation = this.initialsAngle | data.orientation;
          } else if(data.name.indexOf("image") > -1) {
              data.x = (!this.imageX) ? data.x : this.imageX;
              data.y = (!this.imageY) ? data.y : this.imageY;
            //data.orientation = this.imageAngle;
          } 
  console.log(`DEBUG In updateCurrentRectPrintData: UPDATED Loop data = ${JSON.stringify(data)}`);
      }
      }
      // let index = this.currentRect.printData.findIndex(data => data.name.indexOf("image") > -1);
      // this.currentRect.printData[index].x = this.imageX;
     console.log(`DEBUG In updateCurrentRectPrintData: UPDATED currentRect.printDat = ${JSON.stringify(this.currentRect.printData)}`);
  }

  // Die Cut Layout Pattern
  private setPaperDieCutLayout() {
      let x: number;
      let y: number;

      if(!this.paperDieCutPatterns) this.paperDieCutPatterns = [];
      let array: Rectangle[] = this.getDieCutData();
  //let rect = array[1];
  //console.log(`DEBUG In setPaperDieCutLayout: ${JSON.stringify(rect)} "x":${rect.x}, "y":${rect.y.toFixed(2)}`);
      for(let rect of array) {
          // rect.text = `${rect.width}mm x ${rect.height}mm`;  // 96mm x 96mm
          rect.text = rect.id; // for displaying text inside the rect
          if(rect.measure == "mm") {
              rect  = this.convertMM2Pixel(rect);
          }
          rect.canvasId = "1";
          rect.groupId = "G"+rect.id;
  console.log(`DEBUG In setPaperDieCutLayout: after mm convert ${JSON.stringify(rect)}`);
          this.paperDieCutPatterns.push(rect);
      }
  }

  private addDieCutRectangles() {
    for(let rect of this.paperDieCutPatterns) {
      // console.log(`DEBUG In addDieCutRectangles: after mm convert ${JSON.stringify(rect)}`);
        let r = this.getCanvasRectangleObject(rect);
        r.set({"selectable": false});
        r.on("mousedown", (e) => {  // add a click event handler
        this.handleCanvasClick(e);
        // console.log("rect event");
        });
        if(rect.id !== "0") this.canvas.add(r);
    console.log(`DEBUG In addDieCutRectangles: canvasRect = ${JSON.stringify(r)}`);

    // console.log(`DEBUG In addDieCutRectangles: AFTER ADD canvasRect = ${JSON.stringify(r)}`);
        this.addText2DieCutRectangle(rect, false);
    }
  }

  private addText2DieCutRectangle(rect: any = null, selectable: boolean = true) {
      if(rect && rect.id !== "0") {
        let x = rect.x + rect.width / 2;
        let y = rect.y + 30;
  //console.log("TEST text: "+JSON.stringify(rect));
        let text: any = this.getCanvasTextObject(rect);
        text.set({"left": x});
        text.set({"top": y});
        text.set({"selectable": selectable});

        this.canvas.add(text);
      }
  }

  private getCanvasTextObject(rect: any = null, id: string = ""): any {
      if(!id) id = rect.id;
      var text = new fabric.Text("", {
                  id: id,
                  fontSize: 20,
                  fontFamily: "Arial",
                  fill: "gray",
                  //textAlign: "center",
                  originX: "center",
                  // selectable: selectable,
                  // texttype : 0,
                  left: rect.x,
                  top: rect.y
                    });
        if(rect.text) text.set("text", rect.text);
      return text;
  }

  private getCanvasRectangleObject(rect: any = null): any {
      let rectangle: any = new fabric.Rect({
          id: rect.id,
          top : rect.y,
          left : rect.x,
          width : rect.width,
          height : rect.height,
          selectable: false,
          stroke : "gray",
          fill: this.canvas.backgroundColor
       });
       return rectangle;
  }

  /*
 fabric.Image.fromURL(src, (image) => {
      canvas.add(image.set({
            id : "abc",
            alt : "xyz",
            selectable: false
        }));
    });

  fabric.Image.fromURL("2.jpg", (image) => {
	image.set(
    {left: 0, top: 400, angle: 0, selectable: false, hoverCursor: "default"}
    ).scaleToWidth(600); 
	canvas.add(image);
});
  */
  private getCanvasImageObject(rect: any = null): any {
      let url: string = "";
      let image: any;
      if(rect && rect.imageUrl) {
          //url = rect.imageUrl;
          let image1 = new Image();
          image1.src = rect.imageUrl;
  
console.log(`DEBUG In getCanvasImageObject:height=${image1.height} ${rect.imageUrl}}`)
      
      //image.setSrc(data.url);
      //fabric.Image.initialize(i)
      image = new fabric.Image(image1); // ok
      image.set({
              id: `${rect.id}-image`,
              left: rect.x + 10,
              top: rect.y + 10,
              lockSkewingX: true,
              lockSkewingY: true,
              // lockRotation: true,
              selectable: true
          });
          
 // REURNS NULL         
//  image = fabric.Image.fromURL(rect.imageUrl, (img) => {
//     img.set({id: `${rect.id}-image`,left: rect.x + 10, top: rect.y + 10, lockSkewingX: true, 
//     lockSkewingY: true, crossOrigin: "anonymous"});
//     //console.log("DEBUG In getCanvasImageObject:"+JSON.stringify(img.getElement()));
//     return img;
// });
console.log(`DEBUG In getCanvasImageObject: image = ${JSON.stringify(image.id)}}`)
         /*
          image1.onload = () => {  // still width and heigh = 0

              image = new fabric.Image(image1);
              image.set({
              id: `${rect.id}-image`, 
              left: rect.x + 10,
              top: rect.y + 10,
              lockSkewingX: true,
              lockSkewingY: true,
              selectable: true
              });
          };*/

          /*return fabric.Image.fromURL(url, (img) => {
              img.set({
              left: rect.x + 10,
              top: rect.y + 10,
              lockSkewingX: true,
              lockSkewingY: true,
              selectable: true
              });
              image = img;
          });
          */

         /*
          image = new fabric.Image();
          image.set({
              left: rect.x + 10,
              top: rect.y + 10,
              lockSkewingX: true,
              lockSkewingY: true,
              selectable: true
          }); 
          */
      return image;

      }
  }

  // pixels = mm / 25.4 * dpi; or pixels = (mm * dpi) / 25.4
  private convertMM2Pixel(rect: Rectangle, dpi: number = 72, round: number = 0): Rectangle  {
      // let width: number = 59.5;
      // let height: number = 96; // 96mm x 96mm    
      // dpi = 96;  // 72,96
      rect.x = rect.x / 25.4 * dpi;
      rect.y = rect.y / 25.4 * dpi;      
      rect.width = rect.width / 25.4 * dpi;
      rect.height = rect.height / 25.4 * dpi;
      if(round !== 0) {
          rect.width = +rect.width.toFixed(round);
          rect.height = +rect.height.toFixed(round)
      }
      // console.log(`DEBUG In convertMM2Pixel: width=${rect.width}, height=${rect.height}`); 
      return rect;
      // pix = +pix.toFixed(2);
  }

  /*
  //  canvas.on("mouse:down", handleCanvasClick);
//canvas.off("mouse:down", eventHandler)
function handleCanvasClick(event) {
   alert(JSON.stringify(event));
   let o = canvas.getActiveObject();
    alert("test: "+o.id);
}
  //Get X,y
  canvas.on("object:modified", function(options) {
    var x = options.target.left;
    var y = options.target.top;
});
// Disable chaching
fabric.Object.prototype.objectCaching = false;
    fabric.Object.prototype.statefullCache = false;
    fabric.Object.prototype.noScaleCache = true;
    fabric.Object.prototype.needsItsOwnCache = false;
  */
  private handleCanvasClick(event) {
    // let o = this.canvas.getActiveObject(); // Error, because selectable = false
    if(event.target.type == "rect") {
      let id = event.target.id;
      // console.log("DEBUG In handleCanvasClick: \n"+JSON.stringify(id)+"\n");
      // let o = this.canvas.getActiveObject(); // null object
      if (id !== "0") {
          let x = event.pointer.x;
          let y = event.pointer.y;
          let rect = this.paperDieCutPatterns.find(o => o.id == id);
          this.setCurrentRectangle(rect);
          this.showDetails();
          console.log("DEBUG In handleCanvasClick:"+ id + "width="+rect.width);
          this.changeBorderColor(id);
      }

      // check if context exist: if (this.canvas && this.context)
      // console.log("ANG CANVAS Click: x=" + event.offsetX + ", y=" + event.offsetY); 

      // this.getClickedRectangle(event.offsetX, event.offsetY);
      // this.reloadPaperDieCutLayout(); // change the border color for the selected rect
      /*
      let rect1 = this.canvas.getActiveObject();
      if (rect1.id !== "0") {
         rect1.set({"stroke": "green"});
      }
      */
    }
  }

  private setCurrentRectangle(rect: any = null) {
       if(rect) {
           if(!this.currentRect) { // if null
               this.currentRect = new Rectangle(rect.x, rect.y, rect.width, rect.height);
           } else {
           this.currentRect.x = rect.x;
           this.currentRect.y = rect.y;
           this.currentRect.width = rect.width;
           this.currentRect.height = rect.height;
           }
           this.currentRect.id = rect.id;
           this.currentRect.zoom = rect.zoom;
           this.currentRect.showDetails = true; 
           // add order data when this.orderId is not null
           if(this.orderId) {
               // this.setPrintData();
               // this.setCurrentRectangleData();
               // add text to a canvas object
           }

       }
  }
  /* this.currentRect
   {"x":161.43700787401573,"y":30,"width":326.55118110236225,"height":326.55118110236225,
   "id":"R1","zoom":1.2,"showDetails":true,"titleData":{"name":"printcode","description":"JP"},
   "texteData":{"name":"message","description":"Secret\nDepth\nIntoxication"},
   "waftWord":{"name":"waft","description":"WAFT"},"dataLoaded":true}

   text Object: "lineHeight":1.16(default)

   let size = rect.titleData.fontFamily;
    let font = rect.titleData.fontFamily;
    let color = rect.titleData.fontColor;
   */
  private addText2CurrentRectangle(textValue: string = "") {
    // console.log("DEBUG In addText2CurrentRectangle: orderId="+this.orderId+"\n"+JSON.stringify(this.currentRect));
       if(this.currentRect && this.orderId) {
           let x = 0, y = 0;
           let text: any;
           let textAlignment: string = "left";
           if(textValue) { // any single text value
               text = this.getCanvasTextObject(this.currentRect);
               text.set({"left": this.currentRect.x + 10});
               text.set("top", this.currentRect.y + 10);
               text.set("text", textValue);
               text.set("originX", "left");
               text.set("textAlign", textAlignment);
               text.set("lockScalingX", true); // prevent horizontal scaling
               text.set("lockScalingY", true); // prevent vertical scaling
               this.canvasDetails.add(text);
           } else { // for html form text boxes
               // let allText: string[] = [this.textTitle,this.message,this.textWaft,this.textInitials];
               for(let data of this.currentRect.printData) {
                  if(data.type == "text") {
                      text = this.getCanvasTextObject(this.currentRect);
                      if(data.textAlignment) textAlignment = data.textAlignment;
                      if(data.fontSize && data.fontSize > 0) {
                        text.set("fontSize", data.fontSize);
                      }
                      text.set("id", data.name);
                      text.set("originX", "left");
                      text.set("textAlign", textAlignment);
                      text.set("lockScalingX", true);
                      text.set("lockScalingY", true);
                      // just to place all within the rectangle
                      let point = this.getCoordinates(data.x, data.y);
                      if(data.orientation > 0) { text.set("angle", data.orientation); }
                      text.set("text", data.description);
                      text.set({"left": point.x});
                      text.set("top", point.y);
          console.log("DEBUG In addText2CurrentRectangle: "+JSON.stringify(text)+"\n");
                      this.canvasDetails.add(text);
                   }
               }
           }
       }
  }

  // returns X,Y Coordinates from order item"s Print data or generates random within the rectangle
  private getCoordinates(x: number = 0, y: number = 0): Point {
      let point = new Point();

      if(x + y > 0) {
          point.x = x;
          point.y = y;
      } else {
          let min = this.currentRect.x + 10;
          let max = this.currentRect.x + this.currentRect.width;
          x = Math.floor(Math.random() * (max - min) ) + min;
           min = this.currentRect.y + 10;
           max = this.currentRect.y + this.currentRect.height;
           y = Math.floor(Math.random() * (max - min) ) + min;
           point.x = x;
           point.y = y;
      }
      return point;
  }

  // change the border color of the clicked on die cut rectangle
  private changeBorderColor(objectId: string = "", canvasType: CanvasType = 0) {
      if(objectId && objectId !== "0") {
        if(canvasType == CanvasType.Layout) {
    // this.context.fillText(rect.text, rect.x + rect.width / 2, rect.y + 30);
          this.canvas.getObjects().forEach( (o) => {
              o.set({"stroke": "gray"});
              if(o.id == objectId) {
                  o.set({"stroke": "green"});
              } // change border color for the selected object
          });
        }
      }
  }

  // object.hasControls = object.hasBorders = false;
  //
  private addDetailRectangle(rect: Rectangle) {
    console.log(`DEBUG In addDetailRectangle: ${rect.id} rect.showDetails=${rect.showDetails}, img loaded=${rect.imageLoaded}`);
     console.log(`DEBUG In addDetailRectangle:Detail Rectangle.x=(${rect.x}), y=${rect.y}; width=${rect.width}, height=${rect.height}`);
    let r = this.paperDieCutPatterns.find(r => r.id == rect.id);
    console.log(`DEBUG In addDetailRectangle: Die Cut(${r.id}) Rect.width = ${r.width} H= ${r.height}`);
      if(rect && rect.showDetails) {
          // rect.x = (this.canvasDetails.width/ 2) - rect.width;
          rect.x = (this.canvasDetails.width - rect.width) / 2;
          rect.y = 80;
          rect.width = rect.width * rect.zoom;
          rect.height = rect.height * rect.zoom;
    // console.log(`DEBUG In addDetailRectangle: rect.width * zoom ${rect.zoom} = ${rect.width}`);
          let canvasRect = this.getCanvasRectangleObject(rect);
          canvasRect.set({"selectable": false});
          canvasRect.set({"left": rect.x});
          canvasRect.set({"top": rect.y});
          // canvasRect.set({"width": rect.width * rect.zoom});
          // canvasRect.set({"height": rect.height * rect.zoom});
          if(rect.id == "R9") {  // horizontal 15ML, make it rotatable only
              //  canvasRect.set("selectable", true);
              //  canvasRect.set("lockMovementX", true); // prevent horizontal movement
              //  canvasRect.set("lockMovementY", true); // prevent vertical movement
              //  canvasRect.set("lockScalingX", true); // prevent horizontal scaling
              //  canvasRect.set("lockScalingY", true); // prevent vertical scaling
          }
    // canvasRect.scale(rect.zoom);

          this.canvasDetails.add(canvasRect);

        // canvasRect.scale(rect.zoom);
    // console.log(`DEBUG In addDetailRectangle: AFTER ADD canvasRec = ${canvasRect.width} H= ${canvasRect.height}`);
      }
  }

  // handles input type="text" of html form
  public readText(event, name) {
      let value: string = event.target.value;
      let data = new PrintData();
      data.description = value;
      console.log(`DEBUG In readText: event=${value}, name=${name}`);

      if(name == "text-title") {
          data.name = "title";
          data.width = 10; // predefined size per business rule
          // this.addPrintDataTitle(data);
      }
  }
  // nOT USED
  private addRectangle(rect: Rectangle = null) {
      // let ctx = this.canvas.getContext("2d");
      // ctx.rect(40, 40, 220, 220);
      if(rect) {
          let x = rect.x;
          let y = rect.y;
          // if(rect.groupId) {
          //   let group = new fabric.Group([rect], {
          //   left: 50,
          //   top: 50
          //   });
          //   this.canvas.add(group);
          // }
         /*
         */
          var object = new fabric.Rect({
                        id: rect.id,
                        width: rect.width,
                        height: rect.height,
                        // fill: "blue", // inside the border, this.canvas.backgroundColor
                        opacity: 1,
                        left: x,
                        top: y,
                        selectable: rect.showDetails,  // not movable
                        hasControls: rect.showDetails, // remove resizing, rotation
                        // stroke: "rgba(34,177,76,1)", // green
                        stroke: "gray", // just the border
                        strokeWidth: rect.borderWidth
                        // enableRetinaScaling : true //for hi res screens
          });
  // console.log("DEBUG In addRectangle: can.bg"+"\n"+JSON.stringify(object));
          // this.canvas.add(object);
          // this.selectItemAfterAdded(object); // ERROR: 07:29/2019 12:27PM
          // this.canvas.deactivateAllWithDispatch is not a function
      }
  }

  /* Triggered by clicking on an html image
  Each image should maintain its aspect ratio to the die cut rectangle(bounding box)
  Image id should be updated with the currentRect.id set to "R1-image" where R1 is the currentRect.id
  and this.currentRect PrintData should be updated
  */
  public addImage2Rectangle(event, fitToParent: boolean = false) {
    console.log(`DEBUG In addImage2Rectangle:${event.target.src}}`);
      if(this.currentRect) {
          let dataUrl = (event) ? event.target.src : this.currentRect.imageUrl;
           this.currentRect.imageUrl = dataUrl;
           let image = this.getCanvasImageObject(this.currentRect); // fabric Image

  console.log(`DEBUG In addImage2Rectangle:${JSON.stringify(image)}}`);
  // console.log(`DEBUG In addImage2Rectangle:${JSON.stringify(image)}}`)
          // image.scale(this.currentRect.zoom); // for 100ML image is bigger then Detail rect when applying the zoom ratio
          // image.setSrc(this.currentRect.imageUrl).setCoords();
          //
          // image.set("crossOrigin", "anonymous"); // for different domain sites
          // image.set("width", 200);
          // image.set("height", 200);
          if(image) {
              if(fitToParent) {
                  image.scaleToHeight(this.currentRect.height);
                  image.scaleToWidth(this.currentRect.width);
              }
              // remove previously added objects to avoid overlapping
              this.removeCanvasObjectsByType(["image", "text"], CanvasType.Details);
              this.canvasDetails.add(image);
              // check if the image is added to the canvas collection
  // let i = this.canvasDetails.getObjects().find(o => o.id == image.id);
  // console.log(`canvasDetails.getObjects():AFTER \n${JSON.stringify(i)}`);
              if(this.canvasDetails.contains(image)) { this.currentRect.imageLoaded = true; }
    // console.log(`DEBUG In addImage2Rectangle:${this.currentRect.id}{imageId: ${image.id}}`);
              // update currentRect PrintData
              this.setCurrentRectangleData();
          }
      }
  }

  // used in Image slider
  public showSlider(): boolean {
      return (this.orderImages && this.orderImages.length > 0);
  }
  // used in Image slider
  private isActive(id: string): boolean {
      return id === this.orderImages[0].id;
  }

  //
  private getXYData4Html(data: PrintData): Point {
       let p = new Point();
       if(data) {
           p.id = data.name;
           p.x = (data.x && data.x > 0) ? data.x : null;
           p.y = (data.y && data.y > 0) ? data.y : null;
           p.angle = (data.orientation && data.orientation > 0) ? data.orientation : null;
           // this.setHtmlTextCoordinates(id, p, a);
       }
       return p;
  }

  // set variable for html text boxes
  private setHtmlFormData(printData: PrintData[]) {
       if(printData) {
            let p = new Point();
            for(let data of printData) {
                if(data.name.indexOf("title") > -1 ) {
                    this.textTitle = data.description;
                    let p = this.getXYData4Html(data);
                    this.setHtmlTextCoordinates(data.name, p);
                } else if(data.name.indexOf("message") > -1 ) {
                    this.message = data.description;
                    let p = this.getXYData4Html(data);
                    this.setHtmlTextCoordinates(data.name, p);
                } else if(data.name.indexOf("waft") > -1 ) {
                    this.textWaft = data.description;
                    let p = this.getXYData4Html(data);
                    this.setHtmlTextCoordinates(data.name, p);
                } else if(data.name.indexOf("initials") > -1 ) {
                    this.textInitials = data.description;
                    let p = this.getXYData4Html(data);
                    this.setHtmlTextCoordinates(data.name, p);
                }
              }
       }
  }
  // assign order item data to the current Rectangle on the canvas
  // image.set("angle", 45); id: `image-${rect.id}` R1-image
  private setCurrentRectangleData() {
      // set data only ater the image has been added to the Rectangle on the canvas
      if(this.orderData && this.currentRect.imageLoaded) {
           // tODO: could use a unique image name instead of url
           let index = this.orderData.orderItems.findIndex((item) =>
                                   item.imageUrl === this.currentRect.imageUrl);
console.log(`DEBUG In setCurrentRectangleData method: found index=${index}`);
           if (index > -1) { // update the image id to match the die cut rectangle
               this.orderData.orderItems[index].imageId = `${this.currentRect.id}-image`;
               let orderItem = this.orderData.orderItems[index];
               // update the currentRect.printData to have related text values
               if(orderItem) {
                   this.currentRect.printData = orderItem.printData;
                   // assign values to html form bound variables
                   this.setHtmlFormData(orderItem.printData);
                   this.currentRect.dataLoaded = true;
                   // add text to canvas
                   this.addText2CurrentRectangle();
               }
           }
           // old version
          //  let orderItem = this.orderData.orderItems.find
          //                  (item => item.imageUrl == this.currentRect.imageUrl);
      }
  }

  // load variables from remote data via service
  private setImageData() {
    if(this.orderData) {
        if(!this.currentRect) { this.currentRect = new Rectangle(); }
        if(!this.orderImages) { this.orderImages = []; }

        // initialize a subset of data for the html image slider
        for(let item of this.orderData.orderItems) {
            let image = new ImageData(item.imageId, item.imageUrl, item.bottleSize, item.imageName);
            // console.log(`DEBUG In setImageData: image = ${JSON.stringify(image)}`);
            this.orderImages.push(image);
        }

        // console.log(`DEBUG In setPrintData2 method: images.loaded=${this.showSlider()}`);
    }
  }

  // gets data from a remote server
  private getOrderDataById(orderId: string = ""): void {
      if(orderId) {
          this.dataService.getOrderData(orderId)
          .subscribe(result => {
            this.orderData = result;
            this.orderId = orderId;
            this.setImageData();
 //        let item = this.orderData.orderItems[0];
 // console.log(`DEBUG Inside getOrderDataById method: rows = ${JSON.stringify(item)}`);
          }, ex => {
              this.errorMessage = ex.error.error;
        console.log(`ERROR Inside getOrderDataById method: ${this.errorMessage}`);
          });
      }
  }

  // handles html form click event
  public getOrderData(event): void {
      let orderId: any = event;
       console.log(`DEBUG Inside getOrderData method: ${JSON.stringify(event)}`);
       this.getOrderDataById(orderId);
  }

  private getDieCutData(): Rectangle[] {
      let array: Rectangle[];
      this.dataService.getDieCutData()
          .subscribe(result => {
            array = result;
  // console.log(`DEBUG Inside getDieCutData method: rows = ${JSON.stringify(array)}`);
          }, ex => {
              this.errorMessage = ex.error.error;
        console.log(`ERROR Inside getDieCutData method: ${this.errorMessage}`);
          });
          return array;
  }

/*
Convert this.currentRect to Json:
Stote it in a detailRectangles: Map<string, string>;
OR
Save the this.canvasDetails.toJSON(); Then i need to go back to that
Should be a different logic to go back to the previous Detailed Rectangle

NOW: save the Print Data to a Map or directly update the OrderData ?
Assuming the orderData was received empty with just the order info and no PrintData
then it makes sense to update directly.
And when the "Send to S3" button clicked just use JSON.stringify(this.OrderData))
pass it as a parameter to the service.Post method

currentOffsetX = ObjectX - currentRectX; percentage = currentOffsetX * 100 / currentRectWidth;
  */
  private getCoordinates4DieCut(data: PrintData = null, dieCutPoint: Point = null): Point {
      let x: number = this.currentRect.x;
      let y: number = this.currentRect.y;
      let w: number  = this.currentRect.width;
      let h: number = this.currentRect.height;
      let z: number = this.currentRect.zoom;
      let point: Point = new Point();
      if(data && dieCutPoint) {
          // let point = new Point();
//console.log(`DEBUG In getCoordinates4DieCut: id = ${dieCutPoint.id}, name = ${data.name }`);
          // point.id = data.name;
          // point.angle = data.orientation;
          // x
          let currentOffsetX = data.x - this.currentRect.x;
//console.log(`DEBUG In getCoordinates4DieCut: currentOffsetX = data.x(${data.x}) - curr.x(${x}) = ${currentOffsetX}`);
          // get percentage of the current width
          let percentage = currentOffsetX * 100 / this.currentRect.width;
//console.log(`DEBUG In getCoordinates4DieCut: percentage = currentOffsetX(${currentOffsetX}) * 100 / curr.width(${w}) = ${percentage}`);
          let newRectWidth = this.currentRect.width / this.currentRect.zoom;
//console.log(`DEBUG In getCoordinates4DieCut: newRectWidth = curr.width(${w}) / zoom(${z}) = ${newRectWidth}`);
          // convert persantage to points
          let newOffsetX = newRectWidth * percentage / 100;
//console.log(`DEBUG In getCoordinates4DieCut: newOffsetX = newRectWidth(${newRectWidth}) * percentage(${percentage}) / 100 = ${newOffsetX}`);

          let newItemX = dieCutPoint.x + newOffsetX;
//console.log(`DEBUG In getCoordinates4DieCut: newItemX = dieCutPoint.x(${dieCutPoint.x}) + newOffsetX(${newOffsetX}) = ${newItemX}`);
          // point.x = newItemX;
          data.x = newItemX; // mutate the object
          // y
          let currentOffsetY = data.y - this.currentRect.y;
//console.log(`DEBUG In getCoordinates4DieCut: currentOffsetY = data.y(${data.y}) - curr.y(${y}) = ${currentOffsetY}`);
          percentage = currentOffsetY * 100 / this.currentRect.height;
//console.log(`DEBUG In getCoordinates4DieCut: percentage = currentOffsetY(${currentOffsetY}) * 100 / curr.height(${h}) = ${percentage}`);
          let newRectHeight = this.currentRect.height / this.currentRect.zoom;
//console.log(`DEBUG In getCoordinates4DieCut: newRectHeight = curr.height(${h}) / zoom(${z}) = ${newRectHeight}`);
          // convert persantage to dataPoints
          let newOffsetY = newRectHeight * percentage / 100;
//console.log(`DEBUG In getCoordinates4DieCut: newOffsetY = newRectHeight(${newRectHeight}) * percentage(${percentage}) / 100 = ${newOffsetY}`);
          let newItemY = dieCutPoint.y + newOffsetY;
//console.log(`DEBUG In getCoordinates4DieCut: newItemY = dieCutPoint.y(${dieCutPoint.y}) + newOffsetX(${newOffsetX}) = ${newItemY}`);
          // point.y = newImageY;
          data.y = newItemY;
      }
      data.status = "web-adjusted";
      return point;
  }
  /* When the "Save" button is clicked
  NEED TO Calculate Coordinates from the Details object back to the original
  - get detail rect x,y, width, height (already known)
  - get an object coordinates x,y, width, height
  - get the difference from detailRect.X => object.X - detailRect.X;  object.Y - detailRect.Y
  - get the scaling = object.X / detailRect.X and the same for the Y
  - reverse X,Y(use die cut rectangle)
  - then devide by the "zoom" both width and height
  - add the (X diffference * scaling) to the dieCutRect.X, same for the Y

  Create a Map to hold values
  */
  private adjustCoordinates(rect: any = null, index: number = 0): void {
      if(this.currentRect && index > 0) {
          // get the diecut rectangle from the Array
          let dieCutRect: any = this.paperDieCutPatterns.filter(o => o.id === rect.id)[0];
          // dieCutRect.X = 10,dieCutRect.Y = 10,"width":272.13,"height":272.13
          // currentRec.X = 161.44,Y = 30,"width":391.86,"height":391.86
          if(!rect) { rect = this.currentRect; }
          let dieCutPoint: Point = new Point(dieCutRect.x, dieCutRect.y);
          dieCutPoint.id = dieCutRect.id;
          // rect.width = rect.width / rect.zoom;
          // rect.height = rect.height / rect.zoom;

          // modify each object in a collection, because it's a reference collection will be mutated
          for(let data of this.currentRect.printData) {
              let point: Point = this.getCoordinates4DieCut(data, dieCutPoint);
              // let printData = new PrintData();
              // let printData = JSON.parse(JSON.stringify(data)); // imutable deep copy
          }
          this.orderData.orderItems[index].printData = this.currentRect.printData;
          this.orderData.orderItems[index].x = dieCutRect.x;
          this.orderData.orderItems[index].y = dieCutRect.y;
          this.orderData.orderItems[index].width = dieCutRect.width;
          this.orderData.orderItems[index].height = dieCutRect.height;
          this.orderData.orderItems[index].measure = "px";
          this.orderData.orderItems[index].borderWidth = this.currentRect.borderWidth;
      // for JSON.stringify - not to drop null properties
      let replacer = (key, value) => typeof value === "undefined" ? null : value;
console.log(`DEBUG In adjustCoordinates: ADJUSTED currentRect.printData = \n`);    
console.log(JSON.stringify(this.orderData.orderItems[index], replacer));
          /*
          // X
          this.imageX; this.imageY;
          let currentOffsetX = this.imageX - this.currentRect.x;
          let percentage = currentOffsetX * 100 / this.currentRect.width;
          let newRectWidth = this.currentRect.width / rect.zoom;
          // convert persantage to points
          let newOffsetX = newRectWidth * percentage / 100;
          let newImageX = dieCutRect.x + newOffsetX;
          // Y
          let currentOffsetY = this.imageY - this.currentRect.y;
          percentage = currentOffsetY * 100 / this.currentRect.height;
          let newRectHeight = this.currentRect.height / rect.zoom;
          // convert persantage to dataPoints
          let newOffsetY = newRectHeight * percentage / 100;
          let newImageY = dieCutRect.y + newOffsetY;

          let imageXratio = this.currentRect.width / this.imageX;
          let imageYratio = this.currentRect.height / this.imageY;
          newImageX = this.currentRect.width / rect.zoom / imageXratio;
          newImageY = this.currentRect.height / rect.zoom / imageYratio;
          */
          // find the difference in X,Y from the currentRect top left corner
          // find the image left top corner from the currentRect top left corner

           // project that point onto the dieCutRect relative to it's top left corner

           // width and Height should be the original image size

           // update the OrderData

           // widthRatio = object.X / detailRect.X


           // tODO: FOR TEST Copy the dieCutRect, Add Image,Text, Display on canvasDetails
          //  let index = this.orderData.orderItems.findIndex((item) =>
          //                       item.imageUrl == this.currentRect.imageUrl);
          //  let orderItem = this.orderData.orderItems[index];
          //  let printData = orderItem.printData.find(data => data.name.indexOf("image") > -1);

          // title

          // message

          // waft

          // initials

          // calculate coordinates for the die cut rect

          // or devide by zoom all
      }
  }

  // removes all present objects
  private removeCanvasObjectsAll(canvasType: CanvasType = 1) {
       if (canvasType === CanvasType.Details) {
           let objects = this.canvasDetails.getObjects();
           this.canvasDetails.remove(...objects);
       } else if (canvasType === CanvasType.Layout)  {
           let objects = this.canvasDetails.getObjects();
           this.canvas.remove(...objects);
       }
  }

  // removes all present objects of a specific type("text","image","rect")
  private removeCanvasObjectsByType(types: string[] = [], canvasType: CanvasType = 1) {
      if(types && types.length > 0) {
          for(let type of types) {
          if (canvasType === CanvasType.Details) {
              let objects = this.canvasDetails.getObjects(type);
              this.canvasDetails.remove(...objects);
          } else if (canvasType === CanvasType.Layout)  {
              let objects = this.canvasDetails.getObjects(type);
              this.canvas.remove(...objects);
          }
          // let objects = this.canvasDetails.getObjects().filter(o => o.type == type);
          // this.canvasDetails.remove(...objects);
          }
      }
  }

  //
  private removeCanvasSelected(id: string = "", canvasType: CanvasType = 1) {
      let activeObject = this.canvas.getActiveObject();
      let activeGroup = this.canvas.getActiveGroup();

      if (activeObject) {
          if (canvasType === CanvasType.Details) {
              this.canvasDetails.remove(activeObject);
          } else if (canvasType === CanvasType.Layout) {
              this.canvas.remove(activeObject);
               }
      } else if (activeGroup) {
          let activeObjects = activeGroup.getObjects();
          for (let object of activeObjects) {
              if (canvasType === CanvasType.Details) {
                  this.canvasDetails.remove(object);
              } else if (canvasType === CanvasType.Layout) {
                  this.canvas.remove(object);
                   }
          }
          this.canvas.discardActiveGroup();
          // this.canvas.renderAll();
      }
  }

  public moveSelected(type: string = "h", value: number = 0) {
      let o = this.canvasDetails.getActiveObject();
      if(type.toLowerCase() === "h") {
          o.left += value;
      } else if(type.toLowerCase() === "v") {
          o.top += value;
      }
      this.canvasDetails.renderAll();
      let p = new Point(o.left, o.top);
      p.id = o.id;
      p.angle = o.angle;
  console.log(`DEBUG In rotateSelected: id=${JSON.stringify(p)}`);
      this.setHtmlTextCoordinates("", p);
  }

  public rotateSelected(degree: number = 0) {
      let o = this.canvasDetails.getActiveObject();
      let angle = o.angle + degree;
      this.textAngle = angle.toFixed(2);
      o.rotate(angle);
      // o.straighten(); //
      o.setCoords();
      this.canvasDetails.renderAll();

      this.canvasDetails.renderAll();
      let p = new Point(o.left, o.top);
      p.id = o.id;
      p.angle = o.angle;
  console.log(`DEBUG In rotateSelected: id=${JSON.stringify(p)}`);
      this.setHtmlTextCoordinates("", p);
  }

  public fixRotation() {
       let o = this.canvasDetails.getActiveObject();
       o.straighten();
       this.canvasDetails.renderAll();
       this.textAngle = o.angle;
  }

  public selectTextAlignment(value: string = "0") {
      this.canvasDetails.getActiveObject().set("textAlign", value);
      //this.canvasDetails.getActiveObject().textAlign = value;
      this.canvasDetails.renderAll();
    console.log(`DEBUG In selectTextAlignment selected: ${value}`);
  }

  public selectFontFamily(value: string = "0") {
      let family = value !== "0" ? value : "NULL";
      // this.printData.fontFamily = family;
      // this.fontSizes.unshift(): Add items to the beginning of an array
      // push(): Add items to the end of an array
      this.canvasDetails.getActiveObject().set("fontFamily", value);
      // this.canvasDetails.getActiveObject().fontFamily = value;
      this.canvasDetails.renderAll();
      console.log(`DEBUG In selectFontFamily selected: ${family}`);

      // this.updateText();
  }
  private setFontFamily() {
      //this.setActiveProp("fontFamily", this.fontFamily[0], CanvasType.Details);
      // this.setActiveProp("fontFamily", this.props.fontFamily, CanvasType.Details);

  }
  private setTextProperty(name: string = "", value: string = "") {

  }

  public selectFontColor(value: string = "0") {
      let color = value !== "0" ? value : "NULL";
      console.log(`DEBUG In selectFontColor: ${color}`);
      this.canvasDetails.getActiveObject().set("fill", value);
      // this.canvasDetails.getActiveObject().setColor(value);
      // this.printData.fontColor = color;
      this.canvasDetails.renderAll();
  }

  public selectFontStyle(value: string = "0") {
      let style = value !== "0" ? value : "NULL";
      // this.printData.fontStyle = style;
      this.canvasDetails.getActiveObject().set("fontStyle", value);
      // console.log(`DEBUG In selectFontStyle: ${style}`);
      this.canvasDetails.renderAll();
  }

  public selectFontWeight(value: string = "0") {
      let weight = value !== "0" ? value : "NULL";
      // this.printData.fontWeight = weight;
      this.canvasDetails.getActiveObject().set("fontWeight", value);
      // console.log(`DEBUG In selectFontWeight: ${weight}`);
      this.canvasDetails.renderAll();
  }

  // set fontSize
  public setFontSize(value: number = 0) {
      this.fontSize = value;
      this.canvasDetails.getActiveObject().set("fontSize", value);
      console.log(`DEBUG In setFontSize: ${value}`);
      // this.printData.fontSize = value;
      this.canvasDetails.renderAll();
  }

  // change the background color
  public setCanvasBgColor(value: string = "0", canvasType: CanvasType = 1) {
      if(canvasType === CanvasType.Details) {
          // this.canvasDetails.set("backgroundColor", value);
          this.canvasDetails.setBackgroundColor(value,
          this.canvasDetails.renderAll.bind(this.canvasDetails));
        // console.log(`DEBUG In setFontSizes: ${i}`); canvas{background-color:#ccc;}
        // canvas.setBackgroundColor("rgba(255, 73, 64, 0.6)", canvas.renderAll.bind(canvas));
      }
  }




  // iMAGE PROPERTIES
  // properties: top, left, angle, width, height, scaleX, scaleY,
      // cornerSize: 2 - object"s controlling corners (in pixels),Default Value:13
      // image.setOptions(optionsopt);
      // image.set("angle", 45);
      // image.set("lockScalingX", true);  // horizontal scaling is locked
      // image.set("lockScalingY", true);
      // image.set("objectCaching", false);  // object is cached on an additional canvas
      // image.set("crossOrigin", "anonymous");
      // image.set({
      //   left: rect.x + 10,
      //   top: rect.y + 10,
      // }).scale(rect.zoom);  //
      // this.canvasDetails.add(image);
      // image.scale(0.2)  // Scales an object (equally by x and y)
      // image.getSrc();   getSrc(false) // true/false - indicates if the src is needed for svg
      // image.setSrc(data.url);
      // image.get('type') = 'image'
      // image.calcCoords(); // Calculates and returns the .coords of an object
      // image.getCoords();
      // image.getElement(); // Returns image element
      // image.getObjectScaling() // Returns an object with scaleX and scaleY
      // image.isContainedWithinRect(pointTL, pointBR) top left, bottom right
      // image.isType('image')
      // image.rotate(45)
      // image.setCrossOrigin()
      // image.setElement(ImageElement, optionsopt); // call `canvas.renderAll` and `object.setCoords` after
      // image.toDataURL(options); // options = {format: 'png' or 'jpeg'}
      // image.toJSON();

  private addText4Html(clearCanvas: boolean = false, addText: boolean = true, textType: TextType = 0) {
      // let w = this.canvasDetails.contextContainer.measureText(allText[i]).width;
// console.log(`DEBUG In addText2CurrentRectangle: allText[${i}]=${allText[i]} ctx.w=${w} text.width=${text.width}`);
              /*
               for(let i = 0; i < allText.length; i++) {
                    if(i == 0) text.set('id', 'title');
                    if(i > 0) {
                        text = this.getCanvasTextObject(this.currentRect);
                        if(i == 1) text.set('id', 'message');
                        if(i == 2) text.set('id', 'waft');
                        if(i == 3) text.set('id', 'initials');
                        text.set('originX', 'left');
                        text.set('textAlign', 'left');
                        text.set('lockScalingX', true);
                        text.set('lockScalingY', true);
                    }
                    //TODO: Could use a random number using rect width and height
                    x = this.currentRect.x + (i*5)+10; // just to place all within the rectangle
                    text.set('text', allText[i]);
                    text.set({'left': x});
                    text.set('top', x + 10);
                    this.canvasDetails.add(text);
               } */
  }

  public confirmClear(): void {
    if (confirm("Are you sure?")) {
      this.canvas.clear();
    }
  }
  // let object = this.canvas.getActiveObject();
  // if (!object) return;
  //

//   setActiveProp(name, value, canvasType: CanvasType = 0) {
//       var object = this.canvas.getActiveObject();
//       if (!object) { return; }
//       object.set(name, value).setCoords();
//       if(canvasType === CanvasType.Layout) {
//           this.canvas.renderAll();
//       } else if(canvasType === CanvasType.Details) {
//           this.canvasDetails.renderAll();
//            }
//   }

//   getActiveProp(name) {
//       let object = this.canvas.getActiveObject();
//       if (!object) { return ""; }

//       return object[name] || "";
//   }



//   setFontStyle() {
//     this.props.fontStyle = !this.props.fontStyle;
//     this.setActiveStyle('fontStyle', this.props.fontStyle ? 'italic' : '', null);
//   }

//   private selectItemAfterAdded(obj) {
//     // this.canvas.deactivateAllWithDispatch().renderAll();
//     this.canvas.setActiveObject(obj);
//   }


//   private RemoveObect() {
//       this.canvas.getActiveObject().remove();
//       // this.canvas.remove(object);
//   }

//   private removeSelected2() {
//     let activeObject = this.canvas.getActiveObject(),
//     activeGroup = this.canvas.getActiveGroup();

//     if (activeObject) {
//       this.canvas.remove(activeObject);
//       // this.textString = '';
//     } else if (activeGroup) {
//       let objectsInGroup = activeGroup.getObjects();
//       this.canvas.discardActiveGroup();
//       let self = this;
//       objectsInGroup.forEach( (object) => {
//         self.canvas.remove(object);
//       });
//     }
//   }

//   private cleanSelect() {
//       // this.canvas.deactivateAllWithDispatch().renderAll();
//   }


  // nOT USED - get height from titleData.fontSize
  // this.contextDetails.font = "15px Arial"
  // private getFontHight(font: string = ''): number {
  //     font = this.currentRect.titleData.fontFamily;
  //     let numbers = font.match(/\d+/g).map(Number);
  //     console.log(`font=${numbers[0]}`);
  //     return numbers[0];
  // }

   // nOT USED
  // private startImageSlider() {
  //     $('.carousel').carousel();
  // }
}
