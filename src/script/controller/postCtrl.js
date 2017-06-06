app.controller('postCtrl',['$scope','$http',function($scope,$http){
    $scope.searchList = [
        {
            id:'all',
            name:'全部'
        },
        {
            id:'pass',
            name:'面试邀请'
        },
        {
            id:'fail',
            name:'不合适'
        }
    ];

    $http.get('data/myPost.json').then(function(res){
        $scope.list = res.data;
    },function(err){
        console.log(res);
    });

    $scope.filterObj = {};
    $scope.showSheet = function(id,name){
        switch(id){
            case 'all':
                delete $scope.filterObj.state;
                break;
            case 'pass':
                $scope.filterObj.state = '1';
                break;
            case 'fail':
                $scope.filterObj.state = '-1';
                break;
            default:
        }
    };
}]);
