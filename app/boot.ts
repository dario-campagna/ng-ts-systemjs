import {MyController} from './my-controller'
import {MyService} from "./my-service";

angular.module('myApp', [])
    .controller('MyController', ['MyService', MyController])
    .service('MyService', MyService);

angular.element(document).ready(function () {
    angular.bootstrap(document, ['myApp']);
});