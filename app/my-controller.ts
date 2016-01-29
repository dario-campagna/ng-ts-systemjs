import {MyService} from "./my-service";

export class MyController {

    constructor(private _myService:MyService) {
    }

    public getMessage() {
        return this._myService.getMessage();
    }

}