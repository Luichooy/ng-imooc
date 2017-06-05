app.controller('loginCtrl',['$scope',function($scope){
    $scope.user = {
        username: '',
        password: ''
    };

    $scope.submit = function(){
        console.log($scope.user);
    }
}]);
