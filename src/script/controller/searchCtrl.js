app.controller('searchCtrl',['$scope','$http','dict',function($scope,$http,dict){

    $http.get('data/positionList.json').then(function(res){
        $scope.list = res.data;
    },function(err){
        console.log(err);
    });

    $scope.search = function(){
        var searchKey = $scope.searchKey;

        $http.get('data/positionList.json?name='+searchKey).then(function(res){
            $scope.list = res.data;
        },function(err){
            console.log(err);
        });
    };

    $scope.cancel = function(){
        $scope.searchKey = '';
        $scope.search();
    };

    $scope.searchList = [
        {
            id: 'city',
            name: '城市'
        },
        {
            id: 'salary',
            name: '薪资'
        },
        {
            id: 'scale',
            name: '公司规模'
        }
    ];
    $scope.sheet = {};
    $scope.showSheet = function(id,name){
        // console.log(id);
        // console.log(dict);
        $scope.sheet.data = dict[id];
        $scope.sheet.visible = true;
    };
    $scope.sselect = function(id,name){
        console.log(id+name)
    };
}]);
