var app = angular.module('app',['ui.router']);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider.state('home',{
        url: '/home',
        templateUrl: 'view/home.html',
        controller: 'homeCtrl'
    })
    .state('search',{
        url: '/search',
        templateUrl: 'view/search.html',
        controller: 'searchCtrl'
    })
    .state('my',{
        url: '/my',
        templateUrl: 'view/my.html',
        controller: 'myCtrl'
    })
    .state('position',{
        url: '/position/:id',
        templateUrl: 'view/position.html',
        controller: 'positionCtrl'
    })
    .state('company',{
        url: '/company/:id',
        templateUrl: 'view/company.html',
        controller: 'companyCtrl'
    });

    $urlRouterProvider.otherwise('home');
}]);

app.controller('companyCtrl',['$scope',function($scope){

}]);

app.controller('homeCtrl',['$scope','$http',function($scope,$http){
    $http.get('/data/positionList.json')
        .success(function(res){
            $scope.list = res;
        })
        .error(function(res){
            console.log(res);
        });
}]);

app.controller('myCtrl',['$scope',function($scope){

}]);

app.controller('positionCtrl',['$scope','$http','$state',function($scope,$http,$state){
    $scope.isLogin = true;

    $http.get('/data/position.json?id=' + $state.params.id)
        .success(function(res){
            $scope.position = res;
        })
        .error(function(res){
            console.log(res);
        });
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

app.directive('posClass',[function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'view/template/posClass.html'
    };
}]);

app.directive('posCompany',[function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'view/template/posCompany.html'
    };
}]);

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
        templateUrl: 'view/template/posInfo.html',
        scope: {
            isActive:'=',
            isLogin: '=',
            position: '='
        },
        link: function($scope){
            $scope.imagePath = $scope.isActive ? 'image/star-active.png' : 'image/star.png';
        }
    };
}]);
