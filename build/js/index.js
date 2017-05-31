var app = angular.module('app',['ui.router']);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
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
    })
    .state('position',{
        url:'/position/:id',
        templateUrl:'view/position.html',
        controller:'positionCtrl'
    });

    $urlRouterProvider.otherwise('home');
}]);

app.controller('homeCtrl',['$scope',function($scope){
     $scope.list = [
         {
             id: 1,
             name: '销售',
             imgSrc: './image/company-3.png',
             company: '千度',
             city: '上海',
             industry: '互联网',
             time:'2016-06-01 11:05'
         },
         {
             id: 2,
             name: 'WEB前端',
             imgSrc: './image/company-1.png',
             company: '慕课网',
             city: '北京',
             industry: '互联网',
             time:'2016-06-01 01:05'
         }
     ]
}]);

app.controller('myCtrl',['$scope',function($scope){

}]);

app.controller('positionCtrl',['$scope',function($scope){

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

app.directive('mainList',function(){
    return {
        restrict:'E',
        replace:true,
        templateUrl:"view/template/mainList.html",
        scope: {
            data: '='
        }
    };
});

app.directive('posHeader',[function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'view/template/posHeader.html',
        scope: {
            title: '@'
        },
        link: function(scope,element,attr){
            scope.back = function(){
                window.history.back();
            };
        }
    };
}]);

app.directive('posInfo',[function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'view/template/posInfo.html'
    };
}]);
