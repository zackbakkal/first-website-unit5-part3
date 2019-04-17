/**
 * File Name: addblacksoap.js
 * Author: Zakaria Bakkal
 * Version: 3
 * Date: April 07, 2019
 * Description: This script handles adding Black Soap item to the cart
 */

// Instantiate an object of Product type
var soap = new Product("Exfoliating Soap", 19.99);

/*
* This function loads after the page finishes loading
*/
function start() {

	if (localStorage.getItem("mycart") == null) {
		localStorage.setItem("mycart", JSON.stringify((new Cart()).data));
		document.getElementById("carttotalqty").append(document.createTextNode("0"));
	} else {
		var qty = localStorage.getItem("carttotalqty");
		document.getElementById("carttotalqty").innerHTML = qty;
	}

	// Retrieve the addarganoil element amd add an event listner when it is clicked
	var addBlackSoapButton = document.getElementById("addblacksoap");
	addBlackSoapButton.addEventListener("click", addBlackSoap, false);

}

/*
* Add black soap item to the localStorage
*/
function addBlackSoap() {
	var myCart = new Cart();
	myCart.loadCart(JSON.parse(localStorage.getItem("mycart")));

	myCart.addProduct(soap);

	// used to show cart total quantity next to the cart icon
	localStorage.setItem("carttotalqty", myCart.totalQty);

	document.getElementById("carttotalqty").innerHTML = myCart.totalQty;
}

window.addEventListener("load", start, false);