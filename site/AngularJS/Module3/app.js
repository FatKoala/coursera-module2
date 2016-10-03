(function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
		.service('MenuSearchService', MenuSearchService)
		.factory('ShoppingListFactory', ShoppingListFactory)
		.directive('foundItems', FoundItemsInList);



	NarrowItDownController.$inject = ['ShoppingListFactory'];
	function NarrowItDownController(ShoppingListFactory){
		var narrowItCtrl = this;
		narrowItCtrl.found = [];

		var list = ShoppingListFactory();

		narrowItCtrl.button = function(searchTerm){
			console.log(1);
			var promise = list.getMatchedMenuItems(searchTerm);
			
			promise.then(function (response) {
				var foundItems = [];
				var length = 0;
				console.log(response);

				if(response.data.menu_items.length !== undefined)
					length = response.data.menu_items.length;
				
				for(var i = 0; i < length; i++)
				{
					if(response.data.menu_items[i].name === searchTerm)
					{
						foundItems.push(response.data.menu_items[i]);

					}
				}
				console.log(foundItems);
				narrowItCtrl.found = foundItems;
			});
			

		};

		narrowItCtrl.remove = function (index){
			list.remove(index);
		}
	}

	MenuSearchService.$inject('$http');
	function MenuSearchService($http){
		var service = this;

		service.getMatchedMenuItems = function(){

			var response = $http({
				method: "GET",
				url: "https://davids-restaurant.herokuapp.com/menu_items.json"
			});

			return response;
		};

		service.removeItem = function (itemIndex) {
    		items.splice(itemIndex, 1);
  		};
	}

	function FoundItemsInList(){
  		var ddo = {
    		templateUrl: 'temp.html',
	    	scope: {
	      	items: '<',
	      	onRemove: '&'
	    	},
	    	controller: ShoppingListDirectiveController,
	    	controllerAs: 'list',
	    	bindToController: true
  		};

 	 	return ddo;
	}


function ShoppingListDirectiveController() {
  var list = this;

  list.a = function () {
    
  };
}


function ShoppingListFactory() {
  var factory = function ($http) {
    return new MenuSearchService();
  };

  return factory;
}

})();