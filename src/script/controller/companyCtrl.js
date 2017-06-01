app.controller('companyCtrl',['$scope','$http','$state',function($scope,$http,$state){
    $http.get('data/company.json?id='+$state.params.id)
        .success(function(res){
            $scope.company = res;
        })
        .error(function(err){
            console.log(err);
        });
}]);
