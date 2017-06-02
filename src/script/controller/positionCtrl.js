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
