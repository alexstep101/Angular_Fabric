import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { OrderData } from "../shared/models/order-data";
// import { DieCutData } from "../shared/models/die-cut-data";
import { Rectangle, FontData } from "../shared//models/canvas-data";
import { FONT_DATA } from "../data/fonts";
import { DIE_CUT_DATA } from "../data/die-cut-config";
import { TEST_ORDER_DATA } from "../data/test-order";
import { TEST_MARIE_BOX } from "../data/images/marie-box-b64";

@Injectable({providedIn: "root"})
export class LocalDataService {

  private serviceUrl = "/aws/api/-users.json";
    private redirectUrl = "";
    public token: string = "";
    public userName: string = "";
    public tokenExpiration: Date;
    public expirationTime: number = 0;
    //
    private imageUrls: Map<string, string>;

     constructor(private http: HttpClient) {
        // this.orderData = TEST_ORDER_DATA;
    }

    public getDieCutData(): Observable<Rectangle[]> {
         return of(DIE_CUT_DATA);
    }

    public getOrderData(orderId: string = ""): Observable<OrderData> {
         return of(TEST_ORDER_DATA);
    }

    public getFontData(): Observable<string[]> {
         return of(FONT_DATA);
    }

    public getImageData(): Observable<string> {
         return of(TEST_MARIE_BOX);
    }

    public postToServer(data: string) {
        let url: string = "https://q1ss94id69.execute-api.us-east-1.amazonaws.com/v1/";

        return this.http.post<string>(url, data, {
            headers: new HttpHeaders({ "Content-Type": "application/json"})
        });
     }

    public saveImageUrl(key: string = "", value: string = ""): void {
        if(!this.imageUrls) {
             this.imageUrls = new Map<string, string>();
        }
        if(!this.imageUrls.has(key)) {
             this.imageUrls.set(key, value);
        }
    }
}