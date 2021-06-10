/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    initializeDataTableEvent('dtInvoiceList');
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
    $('#btnAddNewInvoice').click(function() {
        fnOpenPopUpWindow('Invoice Form Add', 'Invoice');
    });
}

function bindbtnFilterOnClick() {
    $('#btnFilterInvoiceList').click(function() {
        showLoading();
        $('#frm').submit();
    });
}