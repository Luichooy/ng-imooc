app.controller('positionCtrl',['$scope','$q','$http','$state',function($scope,$q,$http,$state){
    $scope.isLogin = true;

    function getPosition(){
        var defered = $q.defer();
        $http.get('/data/position.json?id=' + $state.params.id)
            .success(function(res){
                $scope.position = res;
                defered.resolve(res);
            })
            .error(function(err){
                console.log(err);
                defered.reject(err);
            });
        return defered.promise;
    }

    getPosition().then(function(obj){
        getCompany(obj.companyID);
    },function(obj){
        console.log(obj)
    });

    function getCompany(id){
        $http.get('data/company.json?id='+id)
            .success(function(res){
                $scope.company = res;
            })
            .error(function(err){
                console.log(err);
            });
    }
}]);
