app.filter('filterByObj',[function(){
    return function(list,obj){
        var result = [];
        angular.forEach(list,function(item){

            var isEqual = true;
            for(var attr in obj){
                if(item[attr] !== obj[attr]){
                    isEqual = false;
                }
            }
            if(isEqual){
                result.push(item);
            }
        });
        return result;
    };
}]);
