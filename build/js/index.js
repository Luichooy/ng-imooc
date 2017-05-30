var app = angular.module('app',['ui.router']);

app.config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state('home',{
        url:'/home',
        templateUrl:'view/home.html',
        controller:'homeCtrl'
    })
    .state('search',{
        url:'/search',
        templateUrl:'view/search.html',
        controller:'searchCtrl'
    })
    .state('my',{
        url:'/my',
        templateUrl:'view/my.html',
        controller:'myCtrl'
    });

    $urlRouterProvider.otherwise('home');
});

app.controller('homeCtrl',['$scope',function($scope){

}]);

app.controller('myCtrl',['$scope',function($scope){

}]);

app.controller('searchCtrl',['$scope',function($scope){

}]);

app.directive('appFooter',function(){
    return {
        restrict:'E',
        replace:true,
        templateUrl:'view/template/footer.html'
    };
});

app.directive('appHeader',function(){
    return {
        restrict:'E',
        replace:true,
        templateUrl:'view/template/header.html'
    }
});
