(function () {
'use strict';

	angular.module('LunchCheck', [])

	.controller('LunchCheckController', lunchChecker);

	lunchChecker.$inject = ['$scope'];

	function lunchChecker($scope) {
		$scope.outputMessage = "I don't consider empty item as item on the list (upgraded version) :)!"
		$scope.inputText = "";



		$scope.inputChange = function () {
			//$scope.outputMessage = $scope.inputText;
		}

		$scope.checkInput = function () {
			var inputString = $scope.inputText;
			var inputArray = inputString.split(",");
			var numOfItems = inputArray.length;
			var temp = '';

			for (var i = 0; i < inputArray.length; i++) {
				temp = inputArray[i].split("");
				var temp2 = 0;

				for(var j = 0; j < temp.length; j++)
				{
					if (temp[j] != " ")
						temp2 = 1;

				}

				if (temp2 == 0)
				{
					numOfItems--;
				}
			}	

			if (numOfItems == 0){
				$scope.textColor = "red";
				$scope.outputMessage = "Please enter data first!";
				$scope.border = "solid 1px red";
			}
			else if (numOfItems > 3){
				$scope.outputMessage = "Too much!";
				$scope.textColor = "green";
				$scope.border = "solid 1px green";
			}
			else{
				$scope.outputMessage = "Enjoy!";
				$scope.textColor = "green";
				$scope.border = "solid 1px green";
			}
		}
	}

})();