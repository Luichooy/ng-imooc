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
