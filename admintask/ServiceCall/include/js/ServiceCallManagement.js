/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    initializeDataTableEvent("dtServiceCall");
//    bindStartFilter();
    bindChosenDDLMulitpleSelectEvent('ddlStatus');  
    bindChosenDDLMulitpleSelectEvent('ddlTech');
    hideTheSearchBarTheadDataTable();    
    initializeDatePicker("startDate");
    initializeDatePicker("endDate");
    bindbtnFilterOnClick();
    bindbtnNewOnClick();
    bindBtnNewServiceROnClick();
});

//function bindStartFilter(){
//    $("#ddlStatus").on("change", function(){
//        
//        var getStatus = document.getElementById("ddlStatus");
//        if(getStatus.value !== null || getStatus.value !== ""){
//            $("#frm").submit();
//        }
//        
//    });
//}

function bindbtnFilterOnClick() {
    $('#btnFilterServiceCallList').click(function() {
        showLoading();
        $('#frm').submit();
    });
}
function bindbtnNewOnClick() {
    $('#btnNewServiceCall').click(function() {
        fnOpenPopUpWindow('New Service Call', 'ServiceCallNew');
    });
}
function bindBtnNewServiceROnClick() {
    $('#btnNewServiceR').click(function() {
        fnOpenPopUpWindow('New Service Report', '../ServiceReport/ServiceReportManual');
    });
}
