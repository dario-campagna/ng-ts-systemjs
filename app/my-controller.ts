import {MyService} from "./my-service";

export class MyController {

    constructor(private _myService:MyService) {
    }

    getTitle() {
        return this._myService.getTitle();
    }

}