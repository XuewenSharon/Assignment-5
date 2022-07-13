"use strict";

const calculateDiscount = (customer, subtotal) => {
    if (customer == "reg") {
        if (subtotal >= 100 && subtotal < 250) {
            return .1;
        } else if (subtotal >= 250 && subtotal < 500) {
            return  .25;
        } else if (subtotal >= 500) {
            return .3;
        } else {
            return 0;
        }        
    }
    else if (customer == "loyal") {
        return .3;        
    }
    else if (customer == "honored") {
        if (subtotal < 500) {
            return .4;
        }
        else {
            return .5;
        }    
    }
};

function formatDate (dateTime) {
    var date = new Date(dateTime);
    return (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString();
}

function parseDate (dateString) {
    const splits = dateString.split("/");
    if (splits.length != 3) {
        return new Date();
    }
    
    const month = parseInt(splits[0],10) - 1;
    const date = parseInt(splits[1], 10);
    const year = parseInt(splits[2], 10);
    return new Date(year, month, date);
}

$( document ).ready( () => {

    $("#calculate").click( () => {
        const customerType = $("#type").val();
        let subtotal = $("#subtotal").val();
        subtotal = parseFloat(subtotal);
        if ( isNaN(subtotal) || subtotal <= 0) {
            alert("Subtotal must be a number greater than zero.");
            $("#clear").click();
            $("#subtotal").focus();
            return;
        }

        var invoiceDate = new Date();
        const invoiceDateString = $("#invoice_date").val();
        if (invoiceDateString == "") {
            $("#invoice_date").val(formatDate(invoiceDate));
        } else {
            invoiceDate = parseDate(invoiceDateString);
            var compareString = formatDate(invoiceDate);
            if ( invoiceDateString != compareString) {
                alert("Invoice date must be valid.");
                $("#clear").click();
                $("#invoice_date").focus();
                return;
            }
        }

        const discountPercent = calculateDiscount(customerType, subtotal);
        const discountAmount = subtotal * discountPercent;
        const invoiceTotal = subtotal - discountAmount;
        const dueDate = new Date(invoiceDate.getTime() + 1000 * 60 * 60 * 24 * 30);
        
        $("#subtotal").val( subtotal.toFixed(2) );
        $("#percent").val( (discountPercent * 100).toFixed(2) );
        $("#discount").val( discountAmount.toFixed(2) );
        $("#total").val(  invoiceTotal.toFixed(2) );
        $("#due_date").val(formatDate(dueDate));

        // set focus on type drop-down when done  
        $("#type").focus();

    });
    
    $("#clear").click( () => {

        $("#type").val("reg");
        $("#subtotal").val("");
        $("#invoice_date").val("");
        $("#percent").val("");
        $("#discount").val("");
        $("#total").val("");
        $("#due_date").val("");

        // set focus on type drop-down when done
        $("#type").focus();
    })

    // set focus on type drop-down on initial load
    $("#type").focus();
});

