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

app.config(['$provide',function($provide){
    $provide.decorator('$http',['$delegate','$q',function($delegate,$q){
        $delegate.post = function(url,data,config){
            var def = $q.defer();
            $delegate.get(url).success(function(res){
                def.resolve(res)
            }).error(function(err){
                def.reject(err);
            });
            return {
                success: function(cb){
                    def.promise.then(cb);
                },
                error: function(cb){
                    def.promise.then(null,cb);
                }
            };
        };
        return $delegate;
    }]);
}]);

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
        },
        required: function(value){
            return !!value;
        }
    };

    var defaultMsg = {
        mobile:{
            success:'',
            error:'必须是11位手机号'
        },
        password:{
            success:'',
            error:'密码长度至少6位'
        },
        required: {
            success: '',
            error: '不能为空'
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

app.controller('favoriteCtrl',['$scope','$http',function($scope,$http){
    $http.get('data/myFavorite.json').then(function(res){
        $scope.list = res.data;
    },function(err){
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

app.controller('loginCtrl',['$scope','$http','$state','cache',function($scope,$http,$state,cache){

    $scope.submit = function(){
        $http.post('data/login.json',$scope.user).success(function(res){
            // $scope.user.id = res.id;
            // $scope.user.name = res.name;
            // $scope.user.image = res.image;
            // cache.put('user',$scope.user);

            cache.put('id',res.id);
            cache.put('name',res.name);
            cache.put('image',res.image);
            $state.go('home');
        });
    }
}]);

app.controller('myCtrl',['$scope','$state','cache',function($scope,$state,cache){
    $scope.name = cache.get('name');
    $scope.image = cache.get('image');

    $scope.logout = function(){
        cache.remove('id');
        cache.remove('name');
        cache.remove('image');
        $state.go('home');
    };
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

app.controller('postCtrl',['$scope','$http',function($scope,$http){
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

    $http.get('data/myPost.json').then(function(res){
        $scope.list = res.data;
    },function(err){
        console.log(res);
    });

    $scope.filterObj = {};
    $scope.showSheet = function(id,name){
        switch(id){
            case 'all':
                delete $scope.filterObj.state;
                break;
            case 'pass':
                $scope.filterObj.state = '1';
                break;
            case 'fail':
                $scope.filterObj.state = '-1';
                break;
            default:
        }
    };
}]);

app.controller('registerCtrl',['$scope','$http','$state','$interval',function($scope,$http,$state,$interval){
    $scope.submit = function(){
        $http.post('data/regist.json',$scope.user).success(function(res){
            $state.go('login');
        });
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

app.directive('mainList',['$http',function($http){
    return {
        restrict:'E',
        replace:true,
        templateUrl:"view/template/mainList.html",
        scope: {
            data: '=',
            filterObj: '=',
            isFavorite: '='
        },
        link: function($scope,$http){

            $scope.select = function(item,$event){

                // $http.post('data/favorite.json',{
                //     id: item.id,
                //     select: !item.select
                // }).then(function(res){
                //     console.log(res);
                //     item.select = !item.select;
                // },function(err){
                //     console.log(err)
                // });
                item.select = !item.select;
                $event.stopPropagation();
            };
        }
    };
}]);

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
