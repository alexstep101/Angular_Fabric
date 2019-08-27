import { OrderData } from "../shared//models/order-data"
/*
export const TEST_ORDER_DATA: OrderData = [
  {
    serialNum: '277712',
    placedOn: 'Order Date: July 12, 2019',
    batch: '96280700391',
    fullName: 'Jennifer Pettit',
    title: 'RAHASYA',
    massage: 'Secret\nDepth\nIntoxication',
    initials: 'JP',
    waftWord: 'WAFT',
    printCode: 'JP99',   
    images: 'image_url_1,image_url_2',
    address: '652 Broadway, Apt 11R New York NY 10012',
    orderSize: '100ML',
    placements: 'L1 - A92L, R1 - A97R, R2 - A105R',
    personalization: 'JT92, JT97, JT105'    
  }

  ]

  https://picsum.photos/id/670/2000/1250
  */

  
export const TEST_ORDER_DATA: OrderData = {
    serialNum: '277712',  // serialNum = orderId
    placedOn: 'Order Date: July 12, 2019',
    batch: '96280700391',
    fullName: 'Jennifer Pettit',
    initials:"",
    address: '652 Broadway, Apt 11R New York NY 10012',
    placements: 'L1 - A92L, R1 - A97R, R2 - A105R',
    personalization: 'JT92, JT97, JT105',    
    orderItems: [
       {
        id: '1',
        orderType: 'CUSTOMER',
        orderSize: '100ML',
        bottleSize: '100ML ',
        imageId:'R1-image',
        imageName: "689",
        imageUrl: 'https://picsum.photos/id/689/2000/1250',
        "x": 0, "y": 0, "width": 0, "height": 0,"zoom":1,
        "borderWidth":1,"orientation":0,"paperFormat":"A4","measure":"","groupId":"","dataId":"","description":"",
        printData: [
         {
           "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"image",
           "type":"image",
           "desingId":"center-line","status":"Adjusted","description":"",
           "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
           "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
           "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
           "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
           "warehouse":"us"
         },
         {
            "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"title",
            "type":"text",
            "desingId":"center-line","status":"Adjusted","description":"",
            "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
            "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
            "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
            "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
            "warehouse":"us"
         },
         {
            "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"message",
            "type":"text",
            "desingId":"center-line","status":"Adjusted","description":"",
            "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
            "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
            "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
            "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
            "warehouse":"us"
         },
         {
            "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"waft",
            "type":"text",
            "desingId":"center-line","status":"Adjusted","description":"",
            "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
            "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
            "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
            "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
            "warehouse":"us"
         },
         {
            "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"initials",
            "type":"text",
            "desingId":"center-line","status":"Adjusted","description":"",
            "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
            "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
            "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
            "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
            "warehouse":"us"
         }
        ]
       },
       {
        id: '2', 
        orderType: 'CUSTOMER',
        orderSize: '50ML',
        bottleSize: '50ML ',
        imageId:'R2-image',
        imageName: "635",
        imageUrl: 'https://picsum.photos/id/635/2000/1250',
        "x": 0, "y": 0, "width": 0, "height": 0,"zoom":1,
        "borderWidth":1,"orientation":0,"paperFormat":"A4","measure":"","groupId":"","dataId":"","description":"",
        printData: [
         {
            "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"image",
            "type":"image",
            "desingId":"center-line","status":"Adjusted","description":"",
            "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
            "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
            "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
            "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
            "warehouse":"us"
          },
          {
             "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"title",
             "type":"text",
             "desingId":"center-line","status":"Adjusted","description":"",
             "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
             "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
             "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
             "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
             "warehouse":"us"
          },
          {
             "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"message",
             "type":"text",
             "desingId":"center-line","status":"Adjusted","description":"",
             "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
             "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
             "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
             "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
             "warehouse":"us"
          },
          {
             "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"waft",
             "type":"text",
             "desingId":"center-line","status":"Adjusted","description":"",
             "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
             "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
             "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
             "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
             "warehouse":"us"
          },
          {
             "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"initials",
             "type":"text",
             "desingId":"center-line","status":"Adjusted","description":"",
             "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
             "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
             "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
             "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
             "warehouse":"us"
          }
         ]
          },
          {
             id: '3', 
             orderType: 'CUSTOMER',
             orderSize: '15ML',
             bottleSize: '15ML ',
             imageId:'R3-image',
             imageName: "631",
             imageUrl: 'https://picsum.photos/id/631/2000/1250',
             "x": 0, "y": 0, "width": 0, "height": 0,"zoom":1,
             "borderWidth":1,"orientation":0,"paperFormat":"A4","measure":"","groupId":"","dataId":"","description":"",
             printData: [
          { 
            "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"image",
            "type":"image",
            "desingId":"center-line","status":"web-adjusted","description":"",
            "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
            "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
            "orientation":0,
            "x":223.17,"y":90.00,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
            "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
            "warehouse":"us"
          },
          {
            "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"title",
            "type":"text",
            "desingId":"center-line","status":"web-adjusted","description":"RAHASYA",
            "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
            "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
            "orientation":0,
            "x":220.66,"y":207.00,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
            "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
            "warehouse":"us"
          },
          {
            "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"message",
            "type":"text",
            "desingId":"center-line","status":"web-adjusted","description":"Secret\nDepth\nIntoxication",
            "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
            "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
            "orientation":0,
            "x":223.66,"y":254.00,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
            "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
            "warehouse":"us"
          },
          {
            "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"waft",
            "type":"text",
            "desingId":"center-line","status":"web-adjusted","description":"WAFT",
            "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
            "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
            "orientation":335.32,
            "x":352.33 ,"y":314.96,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
            "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
            "warehouse":"us"
          },
           {
            "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"initials",
            "type":"text",
            "desingId":"center-line","status":"web-adjusted","description":"JP99",
            "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
            "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
            "orientation":270.0,
            "x":432.66,"y":160.05,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
            "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
            "warehouse":"us"
          }
         ]
         },
         {
             id: '4', 
             orderType: 'SAMPLES',
             orderSize: '5ML',
             bottleSize: '5ML ',
             imageId:'R6-image',
             imageName: "63",
             imageUrl: 'https://picsum.photos/id/63/2000/1250',    
             "x": 0, "y": 0, "width": 0, "height": 0,"zoom":1,
             "borderWidth":1,"orientation":0,"paperFormat":"A4","measure":"","groupId":"","dataId":"","description":"",
             printData: [
               {
                  "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"image",
                  "type":"image",
                  "desingId":"center-line","status":"Adjusted","description":"",
                  "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
                  "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
                  "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
                  "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
                  "warehouse":"us"
                },
                {
                   "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"title",
                   "type":"text",
                   "desingId":"center-line","status":"Adjusted","description":"",
                   "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
                   "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
                   "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
                   "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
                   "warehouse":"us"
                },
                {
                   "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"message",
                   "type":"text",
                   "desingId":"center-line","status":"Adjusted","description":"",
                   "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
                   "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
                   "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
                   "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
                   "warehouse":"us"
                },
                {
                   "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"waft",
                   "type":"text",
                   "desingId":"center-line","status":"Adjusted","description":"",
                   "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
                   "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
                   "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
                   "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
                   "warehouse":"us"
                },
                {
                   "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"initials",
                   "type":"text",
                   "desingId":"center-line","status":"Adjusted","description":"",
                   "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
                   "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
                   "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
                   "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
                   "warehouse":"us"
                }
              ]
          },
          {
             id: '5', 
             orderType: 'SAMPLES',
             orderSize: '5ML',
             bottleSize: '5ML ',
             imageId:'R7-image',
             imageName: "655",
             imageUrl: 'https://picsum.photos/id/655/2000/1250',
             "x": 0, "y": 0, "width": 0, "height": 0,"zoom":1,
             "borderWidth":1,"orientation":0,"paperFormat":"A4","measure":"","groupId":"","dataId":"","description":"",
        printData: [
         {
            "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"image",
            "type":"image",
            "desingId":"center-line","status":"Adjusted","description":"",
            "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
            "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
            "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
            "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
            "warehouse":"us"
          },
          {
             "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"title",
             "type":"text",
             "desingId":"center-line","status":"Adjusted","description":"",
             "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
             "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
             "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
             "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
             "warehouse":"us"
          },
          {
             "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"message",
             "type":"text",
             "desingId":"center-line","status":"Adjusted","description":"",
             "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
             "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
             "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
             "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
             "warehouse":"us"
          },
          {
             "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"waft",
             "type":"text",
             "desingId":"center-line","status":"Adjusted","description":"",
             "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
             "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
             "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
             "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
             "warehouse":"us"
          },
          {
             "id":"center-line-image-100","orderId":"","bottleSize":"100ML","name":"initials",
             "type":"text",
             "desingId":"center-line","status":"Adjusted","description":"",
             "fontFamily":"Times","fontSize":20,"fontStyle":"normal","fontWeight":"normal","fontColor":"black",
             "paperFormat":"A4","paperColor":"white","orderSize":"","textAlignment":"","measure":"",
             "orientation":0,"x":0,"y":0,"height":0,"width":0,"lineHeight":0,"borderWidth":0,"charSpacing":0,"zoom":0,
             "tlX":0,"tlY":0, "trX":0,"trY":0, "brX":0,"brY":0, "blX":0,"blY":0,
             "warehouse":"us"
          }
        ]
       }
     ]
  }
