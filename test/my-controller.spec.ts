import {MyController} from "../app/my-controller";

describe('my-controller', () => {

    var myController:MyController;

    beforeEach(() => {
        myController = new MyController();
    });

    it('shuld return title', () => {
        expect(myController.getTitle()).toBe('Title from controller');
    })

});