/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    initializeDataTableEvent("dtMeterReadingList");
    bindChosenDDLMulitpleSelectEvent("ddlStatus");
    bindChosenDDLMulitpleSelectEvent("ddlTechnician");
    initializeDatePicker("startDate");
    initializeDatePicker("endDate");
    $('#dtMeterReadingList_info').css('margin-top', '20px');
    $('#dtMeterReadingList_paginate').css('margin-top', '20px');
    hideTheSearchBarTheadDataTable();
    btnCreate();
    filterClick();
});

function btnCreate(){
    $('#btnCreate').click(function(){
        fnOpenPopUpWindow('Create Meter Reading', '../MeterReading/CreateMeterReading?'); 
    });
}

function filterClick(){
    $('#btnFilter').click(function(){
       document.location.href = 'MeterReadingList?'+$('#frm').serialize(); 
    });
}