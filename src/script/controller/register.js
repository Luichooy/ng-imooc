app.controller('registerCtrl',['$scope','$http','$interval',function($scope,$http,$interval){
    $scope.submit = function(){
        console.log($scope.user);
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
