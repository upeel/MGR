/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    initializeDatePicker("startDate");
    initializeDatePicker("endDate");
    initializeDataTableEventForMgrDestroyAndBuild("dtSalesOverview");
    bindChosenDDLMulitpleSelectEvent("ddlEntity");
    bindChosenDDLMulitpleSelectEvent("reportType");
    bindCountTotal();
    reportTypeOnChange();
    bindCountTotalSalesItem();
    bindFilterOnClickEventMgr();
    $('#dtSalesOverview_wrapper').css('margin-top','10px');
    $('#dtSalesOverview_paginate').css('margin-top','20px');
    $('#dtSalesOverview_info').css('margin-top','20px');
});

function bindFilterOnClickEventMgr(){
    $("#btnFilter").on('click', function (){
        
       var frmForFilter = $("#frm");
       document.location.href = 'SalesOverviewReport?' + frmForFilter.serialize();
    });
}

function bindCountTotalSalesItem(){
    var rows = $(".salesOverviewItemList");
    var salesAmt = $(".salesAmt");
    var resultSalesAmt = parseFloat(0);
    
    $.each (rows, function (index){
        var getSalesAmt = salesAmt[index].textContent;
        
        resultSalesAmt = parseFloat(resultSalesAmt) + Number(removeNumberFormat(getSalesAmt));
        
        $("#salesAmt").text(getPriceFormattedNumber(resultSalesAmt, 2));
    });
}

function bindCountTotal(){
    var getCustSlaesReportList = $(".salesOverviewList");
    
    var getSubTotalList = $(".subTotalInfo");
    var getGstTotalList = $(".gstInfo");
    var getGrandTotalList = $(".grandTotalInfo");
    
    var resultSubTotal = parseFloat(0);
    var resultGst = parseFloat(0);
    var resultGrandTotal = parseFloat(0);
    
    $.each (getCustSlaesReportList, function (index){
        var getSTL = getSubTotalList[index].textContent;
        var getGST = getGstTotalList[index].textContent;
        var getGT = getGrandTotalList[index].textContent;
        
        resultSubTotal = parseFloat(resultSubTotal) + Number(removeNumberFormat(getSTL));
        resultGst = parseFloat(resultGst) + Number(removeNumberFormat(getGST));
        resultGrandTotal = parseFloat(resultGrandTotal) + Number(removeNumberFormat(getGT));
        
        $("#subTotal").text(getPriceFormattedNumber(resultSubTotal, 2));
        $("#gstTotal").text(getPriceFormattedNumber(resultGst, 2));
        $("#grandTotal").text(getPriceFormattedNumber(resultGrandTotal, 2));
    });
}

function reportTypeOnChange(){
    var reportType = $('#reportType').children('option:selected').text().trim().toUpperCase();
    if(reportType === 'BY ITEM') {
        initializeDataTableEventForMgrDestroyAndBuild("dtSalesOverviewItem");
        $('#dtSalesOverview_wrapper').hide();
        $('#dtSalesOverviewItem_wrapper').css('margin-top','10px');
        $('#dtSalesOverviewItem_paginate').hide();
        $('#dtSalesOverview').hide();
        $('#dtSalesOverviewItem').show();
    } else {
        $('#dtSalesOverviewItem').hide();
        $('#dtSalesOverview').show();
        $('#dtSalesOverview_paginate').hide();
    }
}

function initializeDataTableEventForMgrDestroyAndBuild(dataTableElementId)
{
    var $datatable = $('#' + dataTableElementId).DataTable({
        "dom": '<"toolbar">frBtip',
        "aLengthMenu": [[10, 25, 50, 75, -1], [10, 25, 50, 75, "All"]],
        "iDisplayLength": -1,
        "buttons": [
            //'colvis',
            {
                extend: 'copy',
                filename: $('#' + dataTableElementId)[0].getAttribute("name"),
                footer: true
            },
            {
                extend: 'csv',
                filename: $('#' + dataTableElementId)[0].getAttribute("name"),
                footer: true
            },
            {
                extend: 'print',
                filename: $('#' + dataTableElementId)[0].getAttribute("name"),
                footer: true
            },
            {
                extend: 'excel',
                filename: $('#' + dataTableElementId)[0].getAttribute("name"),
                footer: true
            },
            {
                extend: 'pdfHtml5',
                filename: $('#' + dataTableElementId)[0].getAttribute("name"),
                footer: true,
                orientation: 'landscape'
            }
        ],
        //"responsive": true,
        "colReorder": false,
        "aoColumnDefs": [{ "bSortable": false, "aTargets": ["disabledSort"] }], 
        //Disabled table sorting, need add 'disabledSort' class for each table head element
        
        "initComplete": function (settings, json) {
            //show the datatable after initializing
            //In cases where the data to load into the datatable is huge, 
            //it will cause the browser to incur an expensive rendering time
            //only after the data is completely loaded, then show the datatable.
            $('#' + dataTableElementId).show();
        }
    });
    
    $('#' + dataTableElementId + '_filter').find('input[type="search"]')[0].className = 'dtSalesOverview';
    
    //make sure that the datatable is scaled correctly
    $('#' + dataTableElementId).css("width", "100%");
    $(".sorting_asc")[0].classList.remove("sorting_asc");
}