import {MyController} from './my-controller'

declare var angular:any;
angular.module('myApp', [])
    .controller('MyController', MyController);

angular.element(document).ready(function(){
    angular.bootstrap(document, ['myApp']);
});