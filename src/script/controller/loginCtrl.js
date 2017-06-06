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
