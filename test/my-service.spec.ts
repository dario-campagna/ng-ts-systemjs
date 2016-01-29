import {MyService} from "../app/my-service";

describe('my-service', () => {

    var myService:MyService;

    beforeEach(() => {
        myService = new MyService();
    });

    it('should return message', () => {
        expect(myService.getMessage()).toBe('Hello World!');
    })

});