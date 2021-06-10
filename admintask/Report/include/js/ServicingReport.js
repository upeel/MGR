/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    initializeDatePicker("startDate");
    initializeDatePicker("endDate");
    initializeDataTableEventForMgrDestroyAndBuild("dtServicingReport");
    bindChosenDDLMulitpleSelectEvent("ddlEntity");
    bindChosenDDLMulitpleSelectEvent("ddlCustomer");
    bindChosenDDLMulitpleSelectEvent("ddlModel");
    bindChosenDDLMulitpleSelectEvent("ddlTech");
    bindChosenDDLMulitpleSelectEvent("ddlIssue");
    bindChosenDDLMulitpleSelectEvent("ddlSerial");
    hideTheSearchBarTheadDataTable();
    bindFilterOnClickEventMgr();
    $('#dtServicingReport_wrapper').css('margin-top','10px');
    $('#dtServicingReport_paginate').css('margin-top','20px');
    $('#dtServicingReport_info').css('margin-top','20px');
});

function bindFilterOnClickEventMgr(){
    $("#btnFilter").on('click', function (){
        
       var frmForFilter = $("#frm");
       document.location.href = 'ServicingReport?' + frmForFilter.serialize();
    });
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
    
    $('#' + dataTableElementId + '_filter').find('input[type="search"]')[0].className = 'dtItemSalesReport';
    
    //make sure that the datatable is scaled correctly
    $('#' + dataTableElementId).css("width", "100%");
    $(".sorting_asc")[0].classList.remove("sorting_asc");
}