/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    initializeDatePicker("startDate");
    initializeDatePicker("endDate");
    initializeDataTableEvent("dtServiceOverview");
    bindChosenDDLMulitpleSelectEvent("ddlEntity");
    bindChosenDDLMulitpleSelectEvent("reportType");
    hideTheSearchBarTheadDataTable();
    reportTypeOnChange();
    $('#dtServiceOverview_wrapper').css('margin-top','10px');
    $('#dtServiceOverview_paginate').hide();
    $('#dtServiceOverview_info').hide();
    $('#dtServiceOverview_length').hide();
    btnFilterOnClick();
});

function btnFilterOnClick() {
    $("#btnFilter").on('click', function (){
        
       var frmForFilter = $("#frm");
       document.location.href = 'ServiceOverviewReport?' + frmForFilter.serialize();
    });
}

function reportTypeOnChange(){
    var reportType = $('#reportType').children('option:selected').text().trim().toUpperCase();
    if(reportType === 'BY ITEM') {
        $('#dtServiceOverview').hide();
        $('#dtServiceOverviewTech').hide();
        $('#dtServiceOverviewItem').show();
    } else if(reportType === 'BY CUSTOMER'){
        $('#dtSalesOverviewItem').hide();
        $('#dtServiceOverviewTech').hide();
        $('#dtSalesOverview').show();
    } else {
        $('#dtServiceOverview').hide();
        $('#dtSalesOverviewItem').hide();
        $('#dtServiceOverviewTech').show();
    }
}
