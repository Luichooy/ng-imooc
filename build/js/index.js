var app = angular.module('app',['ui.router','ngCookies','validation']);

app.value('dict',{});

app.run(['$http','dict',function($http,dict){
    $http.get('data/city.json').then(function(res){
        dict.city = res.data;
    },function(err){
        console.log(err);
    });

    $http.get('data/salary.json').then(function(res){
        dict.salary = res.data;
    },function(err){
        console.log(err);
    });

    $http.get('data/scale.json').then(function(res){
        dict.scale = res.data;
    },function(err){
        console.log(err);
    });
}]);

// app.run(['$scope','$http',function($scope,$http){
//     $http.get('data/city.json').then(function(res){
//         dict.city = res.data;
//     },function(err){
//         console.log(err);
//     });
//
//     $http.get('data/salary.json').then(function(res){
//         dict.salary = res.data;
//     },function(err){
//         console.log(err);
//     });
//
//     $http.get('data/scale.json').then(function(res){
//         dict.scale = res.data;
//     },function(err){
//         console.log(err);
//     });
// }]);


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
    })
    .state('login',{
        url: '/login',
        templateUrl: 'view/login.html',
        controller: 'loginCtrl'
    })
    .state('register',{
        url: '/register',
        templateUrl: 'view/register.html',
        controller: 'registerCtrl'
    })
    .state('favorite',{
        url: '/favorite',
        templateUrl: 'view/favorite.html',
        controller: 'favoriteCtrl'
    })
    .state('post',{
        url: '/post',
        templateUrl: 'view/post.html',
        controller: 'postCtrl'
    })
    .state('collect',{
        url:'/collect',
        templateUrl:'view/collect.html',
        controller:'collectCtrl'
    });

    $urlRouterProvider.otherwise('home');
}]);

app.config(['$validationProvider',function($validationProvider){
    var expression = {
        mobile: /^1[\d]{10}$/,
        password:function(value){
            var str = value + '';
            return str.length > 5;
        }
    };

    var defaultMsg = {
        mobile:{
            success:'',
            error:'必须是11位手机号'
        },
        password:{
            success:'',
            error:'长度至少6位'
        }
    };

    $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
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

app.controller('favoriteCtrl',['$scope',function($scope){

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

app.controller('loginCtrl',['$scope',function($scope){
    $scope.user = {
        username: '',
        password: ''
    };

    $scope.submit = function(){
        console.log($scope.user);
    }
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

app.controller('postCtrl',['$scope',function($scope){
    $scope.searchList = [
        {
            id:'all',
            name:'全部'
        },
        {
            id:'pass',
            name:'面试邀请'
        },
        {
            id:'fail',
            name:'不合适'
        }
    ];

    $scope.showSheet = function(id,name){
        console.log(id+name);
    };
}]);

app.controller('registerCtrl',['$scope','$http','$interval',function($scope,$http,$interval){
    $scope.submit = function(){
        console.log($scope.user);
    };

    $scope.sendCode = function(){
        $http.get('data/code.json').then(function(res){
            var data = res.data;
            
            if(data.state === 1){
                var count = 60;
                $scope.time = '60s';
                var interval = $interval(function(){
                    if(count <= 0){
                        $interval.cancel(interval);
                        $scope.time = '';
                        return;
                    }
                    count --;
                    $scope.time = count + 's';
                },1000);
            }
        },function(err){
            console.log(err);
        });
    }
}]);

app.controller('searchCtrl',['$scope','$http','dict',function($scope,$http,dict){

    $http.get('data/positionList.json').then(function(res){
        $scope.list = res.data;
    },function(err){
        console.log(err);
    });

    $scope.search = function(){
        var searchKey = $scope.searchKey;

        $http.get('data/positionList.json?name='+searchKey).then(function(res){
            $scope.list = res.data;
        },function(err){
            console.log(err);
        });
    };

    $scope.cancel = function(){
        $scope.searchKey = '';
        $scope.search();
    };

    $scope.searchList = [
        {
            id: 'city',
            name: '城市'
        },
        {
            id: 'salary',
            name: '薪资'
        },
        {
            id: 'scale',
            name: '公司规模'
        }
    ];
    $scope.sheet = {};
    $scope.filterObj = {};
    var tabId = '';
    $scope.showSheet = function(id,name){
        // console.log(id);
        // console.log(dict);
        tabId = id;
        $scope.sheet.data = dict[id];
        $scope.sheet.visible = true;
    };
    $scope.sselect = function(id,name){
        // 初始化filterObj;
        if(id){
            angular.forEach($scope.searchList,function(item){
                if(item.id === tabId){
                    item.name = name;
                }
            });
            $scope.filterObj[tabId + 'Id'] = id;
        }else{
            delete $scope.filterObj[tabId + 'Id'];
            angular.forEach($scope.searchList,function(item){
                if(item.id === tabId){
                    switch(item.id){
                        case 'city':
                            item.name = '城市';
                            break;
                        case 'salary':
                            item.name='薪资';
                            break;
                        case 'scale':
                            item.name='公司规模';
                            break;
                        default:
                    }
                }
            });
        }
        $scope.sheet.visible = false;
    };
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
            data: '=',
            filterObj: '='
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
        templateUrl: 'view/template/searchTab.html',
        scope: {
            list: '=',
            tabClick: '&'
        },
        link: function($scope){
            $scope.activeId = $scope.list[0].id;

            $scope.clickTab = function(tab){
                $scope.activeId = tab.id;
                $scope.tabClick(tab);
            }
        }
    };
}]);

app.directive('sheet',[function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'view/template/sheet.html',
        scope: {
            data: '=',
            visible: '=',
            select: '&'
        },
        link: function($scope){
            $scope.hideSheet = function(){
                $scope.visible = false;
            };
        }
    };
}]);

app.filter('filterByObj',[function(){
    return function(list,obj){
        var result = [];
        angular.forEach(list,function(item){

            var isEqual = true;
            for(var attr in obj){
                if(item[attr] !== obj[attr]){
                    isEqual = false;
                }
            }
            if(isEqual){
                result.push(item);
            }
        });
        return result;
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
