import {MyController} from "../app/my-controller";
import '../app/boot';
import 'angular';
import 'angular-mocks';

describe('my-controller', () => {

    var myController:MyController;

    beforeEach(angular.mock.module('myApp'));

    beforeEach(angular.mock.inject(($controller) => {
        myController = $controller('MyController');
    }));

    it('should return title', () => {
        expect(myController.getTitle()).toBe('Title from controller');
    })

});