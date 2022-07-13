"use strict";

$(document).ready( () => {
	$("#submit").click(function() { 
		const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
		var isValid = true;
	
		var arrivalDate = $("#arrival_date").val().trim();
		if (arrivalDate == "") {
			$("#arrival_date").next().text("This field is required.");
			isValid = false;
		} else {
			$("#arrival_date").next().text("");
		}
		$("#arrival_date").val(arrivalDate);

		var nights = $("#nights").val().trim();
		if (nights == "" || isNaN(nights)) {
			$("#nights").next().text("Must be numeric.");
			isValid = false;
		} else {
			$("#nights").next().text("");
		}
		$("#nights").val(nights);

		var name = $("#name").val().trim();
		if (name == "") {
			$("#name").next().text("This field is required.");
			isValid = false;
		} else {
			$("#name").next().text("");
		}
		$("#name").val(name);

		var email = $("#email").val().trim();
		if (!email.match(emailPattern)) {
			$("#email").next().text("Must be a valid email address.");
			isValid = false;
		} else {
			$("#email").next().text("");
		}
		$("#email").val(email);

		var phone = $("#phone").val().trim();
		if (phone == "") {
			$("#phone").next().text("This field is required.");
			isValid = false;
		} else {
			$("#phone").next().text("");
		}
		$("#phone").val(phone);

		if (!isValid) {
			$("#arrival_date").select();
			return false;
		}
	})
}); // end ready