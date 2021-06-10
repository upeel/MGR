/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    initializeDataTableEvent('dtDeliveryList');
    setDropdownChosen();
    hideTheSearchBarTheadDataTable();
    bindOpenPopUpOrderEntryForm();
    bindbtnFilterOnClick();
    initializeDatePicker("startDate");
    initializeDatePicker("endDate");
});

function setDropdownChosen() {
    bindChosenDDLMulitpleSelectEvent('ddlEntity');
}

/* open pop up contract detail form */
function bindOpenPopUpOrderEntryForm() {
    $('#btnAddNewDelivery').click(function() {
        fnOpenPopUpWindow('Delivery Order Form Add', 'DeliveryOrder');
    });
}

function bindbtnFilterOnClick() {
    $('#btnFilterDeliveryList').click(function() {
        showLoading();
        $('#frm').submit();
    });
}
