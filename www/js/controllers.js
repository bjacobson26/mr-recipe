angular.module('starter.controllers', [])

.controller('RecipeCtrl', function($scope, $stateParams, Recipe){
  var query = Recipe.query();
  query.$promise.then(function(data) {
    $scope.recipes = data;
    $scope.recipe = $scope.recipes[$stateParams.recipeId - 1];
  })

  $scope.recipeName = '';
  $scope.recipeDirections = '';
  $scope.recipeIngredient = '';
  $scope.recipeIngredients = [];
  $scope.recipePostData= {};

  $scope.newPost = function() {
    var post = new Post($scope.recipePostData);
    post.$save();
  }

  $scope.submit = function(){
    $scope.recipePostData.name = $scope.recipeName;
    $scope.recipePostData.ingredients = $scope.recipeIngredients;
    $scope.recipePostData.directions = $scope.recipeDirections;
    var recipe = new Recipe($scope.recipePostData);
    recipe.$save();
    reset();
  }

  var reset = function(){
    $scope.recipeName = '';
    $scope.recipeDirections = '';
    $scope.recipeIngredient = '';
    $scope.recipeIngredients = [];
    $scope.recipePostData = {};
  }

  $scope.addIngredient = function(){
    if ($scope.recipeIngredient.length > 0) {
      $scope.recipeIngredients.push($scope.recipeIngredient);
      $scope.recipeIngredient = '';
    }
  }
  $scope.removeIngredient = function(index){
    $scope.recipeIngredients.pop(index);
  }

})


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
