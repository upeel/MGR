/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    setDropdownChosenAndDatePickerAndDataTable();
    btnFilterOnClick();
});

// 1. set dropdown chosen
function setDropdownChosenAndDatePickerAndDataTable() {
    bindChosenDDLMulitpleSelectEvent('ddlBusinessEntityId');
    bindChosenDDLMulitpleSelectEvent('ddlDriverOrTechnicianId');
    initializeDatePicker('txtRequiredDate');
    // data table section
    initializeDataTableEvent('dtPickingListSummary');
    hideTheSearchBarTheadDataTable();  
}

// function for filtering picking list
function btnFilterOnClick()
{
    $('#btnFilterPickingList').click(function() {
        $('#dvLoading').show();
        $('#overlay').show();
        var requiredDate = $("#txtRequiredDate").val();    
        if("" === requiredDate || "undefined" === requiredDate)
        {
            alert("Please select required date");
            return false;
        }        
        $('#frm').submit();       
    });        
}