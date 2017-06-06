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
