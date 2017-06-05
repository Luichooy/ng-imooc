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
    $scope.filterObj = {};
    var tabId = '';
    $scope.showSheet = function(id,name){
        // console.log(id);
        // console.log(dict);
        tabId = id;
        $scope.sheet.data = dict[id];
        $scope.sheet.visible = true;
    };
    $scope.sselect = function(id,name){
        // 初始化filterObj;
        if(id){
            angular.forEach($scope.searchList,function(item){
                if(item.id === tabId){
                    item.name = name;
                }
            });
            $scope.filterObj[tabId + 'Id'] = id;
        }else{
            delete $scope.filterObj[tabId + 'Id'];
            angular.forEach($scope.searchList,function(item){
                if(item.id === tabId){
                    switch(item.id){
                        case 'city':
                            item.name = '城市';
                            break;
                        case 'salary':
                            item.name='薪资';
                            break;
                        case 'scale':
                            item.name='公司规模';
                            break;
                        default:
                    }
                }
            });
        }
        $scope.sheet.visible = false;
    };
}]);
