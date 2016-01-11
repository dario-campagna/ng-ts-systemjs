import {MyService} from "../app/my-service";

describe('my-service', () => {

    var myService:MyService;

    beforeEach(() => {
        myService = new MyService();
    });

    it('should return title', () => {
        expect(myService.getTitle()).toBe('Title from controller');
    })

});