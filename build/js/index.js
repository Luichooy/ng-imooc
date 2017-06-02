var app = angular.module('app',['ui.router','ngCookies']);

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

app.controller('companyCtrl',['$scope','$http','$state',function($scope,$http,$state){
    $http.get('data/company.json?id='+$state.params.id)
        .success(function(res){
            $scope.company = res;
        })
        .error(function(err){
            console.log(err);
        });
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

app.controller('positionCtrl',['$scope','$q','$http','$state',function($scope,$q,$http,$state){
    $scope.isLogin = true;

    $http.get('/data/position.json?id=' + $state.params.id).then(function(res){
        $scope.position = res.data;

        $http.get('data/company.json?id='+$scope.position.companyID).then(function(res){
            $scope.company = res.data;
        },function(err){
            console.log(err);
        });

    },function(err){
        console.log(err);
    });
}]);

app.controller('searchCtrl',['$scope','$http',function($scope,$http){
    $http.get('data/positionList.json').then(function(res){
        $scope.list = res.data;
    },function(err){
        console.log(err);
    });
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
        templateUrl: 'view/template/posClass.html',
        link: function($scope){
            $scope.showPositionList = function(index){
                $scope.isActive = index;

                $scope.positionList = $scope.company.positionClass[index].positionList;
            };

            //此时$scope对象中的company属性还没有建立起来，因此通过$watch来检测$scope.company。
            $scope.$watch('company',function(newVal,oldVal){
                console.log(newVal);
                if(newVal){
                    $scope.showPositionList(0);
                }
            });
        }
    };
}]);

app.directive('posCompany',[function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'view/template/posCompany.html',
        scope:{
            company: '='
        }
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

app.directive('searchTab',[function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'view/template/searchTab.html'
    };
}]);

app.directive('sheet',[function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'view/template/sheet.html'
    };
}]);

// app.service('cache',['$cookies',function($cookies){
//       this.put = function(key,value){
//           $cookies.put(key,value);
//       };
//       this.get = function(key){
//           return $cookies.get(key);
//       };
//       this.remove = function(key){
//           $cookies.remove(key);
//       }
// }]);

app.factory('cache',['$cookies',function($cookies){
    return {
        put: function(key,value){
            $cookies.put(key,value);
        },
        get: function(key){
            return $cookies.get(key);
        },
        remove: function(key){
            $cookies.remove(key);
        }
    };
}]);
