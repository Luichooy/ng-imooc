app.controller('searchCtrl',['$scope','$http',function($scope,$http){
    $http.get('data/positionList.json').then(function(res){
        $scope.list = res.data;
    },function(err){
        console.log(err);
    });
}]);
