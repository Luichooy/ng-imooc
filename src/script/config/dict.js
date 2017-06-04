app.value('dict',{});

app.run(['$http','dict',function($http,dict){
    $http.get('data/city.json').then(function(res){
        dict.city = res.data;
    },function(err){
        console.log(err);
    });

    $http.get('data/salary.json').then(function(res){
        dict.salary = res.data;
    },function(err){
        console.log(err);
    });

    $http.get('data/scale.json').then(function(res){
        dict.scale = res.data;
    },function(err){
        console.log(err);
    });
}]);

// app.run(['$scope','$http',function($scope,$http){
//     $http.get('data/city.json').then(function(res){
//         dict.city = res.data;
//     },function(err){
//         console.log(err);
//     });
//
//     $http.get('data/salary.json').then(function(res){
//         dict.salary = res.data;
//     },function(err){
//         console.log(err);
//     });
//
//     $http.get('data/scale.json').then(function(res){
//         dict.scale = res.data;
//     },function(err){
//         console.log(err);
//     });
// }]);
