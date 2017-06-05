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
    });

    $urlRouterProvider.otherwise('home');
}]);
