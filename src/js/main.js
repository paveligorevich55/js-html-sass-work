var myApp = angular.module('myApp', []);

myApp.controller('CommentsCtrl', function($scope, $http) {

//This is a GET request for getting data from API server
    
    $http({
        method : "GET",
        url : "http://frontend-test.pingbull.com/pages/paveligorevich55@icloud.com/comments",
        params : {
            'count' : 99999999,
            'offset' : 0
        }
    }).then(function (response) {
        $scope.data = response.data;
        $scope.n = 5;
        $scope.loadMore = function(){
            $scope.n = $scope.n + 5;
        }; 
        console.log($scope.n);
    });



//This is function for Delete a Comment from Page

    $scope.deleteComment = function(_id){
    $http({
        method : "DELETE",
        url : "http://frontend-test.pingbull.com/pages/paveligorevich55@icloud.com/comments/" + _id
    }).then(function(response){
        $scope.data.shift(_id);
        console.log($scope.data.shift());
        alert("Success!");
    }, function(response){
        alert("Try Again");
    });
};

//This is function for Posting a new Comment on Page

    $scope.addComment = function(comment){
        console.log(comment);
        $http({
            method : "POST",
            url : "http://frontend-test.pingbull.com/pages/paveligorevich55@icloud.com/comments",
            headers: {
            'Content-Type': 'application/json'
            },
            params : {
                'parent' : comment.id,
                'content' : comment.content
            }
        }).then(function(response){
            $scope.data.push(comment.content);
            $scope.comment.content = null;
            alert("Success addint comment");
        }, function(response){
            alert("Failed adding");
        });
    };

//This is function for Reply to comment with parent ID

    $scope.addReply = function(_id){
        console.log(_id);
        $http({
            method : "POST",
            url : "http://frontend-test.pingbull.com/pages/paveligorevich55@icloud.com/comments/",
            headers: {
            'Content-Type': 'application/json'
            },
            params : {
                'parent' : _id.id,
                'content' : _id.children.content
            }
        }).then(function(response){
            alert("Success REPLY!");
        }, function(response){
            alert("Failed REPLY!");
        });
    };

//This is function for editing Comments

    $scope.editComment = function(edit){
        $http({
            method : "PUT",
            url : "http://frontend-test.pingbull.com/pages/paveligorevich55@icloud.com/comments/" + edit.id,
            headers: {
            'Content-Type': 'application/json'
            },
            params : {
                'content' : edit.content
            }
        }).then(function(response){
            alert("Success Edit!");
        }, function(response){
            alert("Failed Edit!");
        });
    };



});