(function () {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
		.controller('ToBuyShoppingController', ToBuyShoppingController)
		.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
		.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


	ToBuyShoppingController.$inject('ShoppingListCheckOffService');
	function ToBuyShoppingController(ShoppingListCheckOffService){
		var ToBuy = this;

		ToBuy.items = ShoppingListCheckOffService.getToBuyItems();

		ToBuy.bought = function(index){
			ShoppingListCheckOffService.buyItem(index);
		}
	}

	AlreadyBoughtShoppingController.$inject('ShoppingListCheckOffService');
	function AlreadyBoughtShoppingController(ShoppingListCheckOffService){
		var Bought = this;

		Bought.items = ShoppingListCheckOffService.getBoughtItems();
	}

	function ShoppingListCheckOffService(){
		var service = this;

		var toBuyItems = [
		{
			name: 'item1',
			quantity: 10
		},
		{
			name: 'item2',
			quantity: 10
		},
		{
			name: 'item3',
			quantity: 10
		},
		{
			name: 'item4',
			quantity: 10
		},
		{
			name: 'item5',
			quantity: 10
		}];

		var boughtItems = [];

		service.getToBuyItems = function(){
			return toBuyItems;
		}

		service.getBoughtItems = function(){
			return boughtItems;
		}

		service.buyItem = function(index){
			boughtItems.push(toBuyItems[index]);
			toBuyItems.splice(index, 1);
		}
	}

})();