app.controller('postCtrl',['$scope',function($scope){
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

    $scope.showSheet = function(id,name){
        console.log(id+name);
    };
}]);
