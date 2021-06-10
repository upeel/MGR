/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*global paramId*/

$(document).ready(function() {
    initializeDataTableEventForMgrDestroyAndBuild("dtItemSalesReport");
    initializeDatePicker("startDate");
    initializeDatePicker("endDate");
//    initializeDataTableEvent("dtItemSalesReport");
    bindChosenDDLMulitpleSelectEvent("ddlEntity");
    bindChosenDDLMulitpleSelectEvent("ddlCustomer");
    bindChosenDDLMulitpleSelectEvent("ddlItem");
    bindChosenDDLMulitpleSelectEvent("ddlItemGroup");
    hideTheSearchBarTheadDataTable();
    $('#dtItemSalesReport_wrapper').css('margin-top','10px');
    
    bindFilterOnClickEventMgr();
//    initializeDateFromOnChanges();
    bindCountTotal();
    bindGetIdCustomer();
    
    if($(paramId.inv_id !== null && paramId.inv_id !== "")){
        document.getElementById("btnPrint").style.display = 'none';
        document.getElementById("chkInclusiveGST").disabled= true;
    }
});

function openOrderCollectionForms(element){
    var thisIndex = $(".salesInvoice").index(element);
    var salesId = $(".salesID")[thisIndex].innerText.trim();
    fnOpenPopUpWindow('Invoice', '../Invoice/Invoice?inv_id='+salesId+'&report=1');
    ;
}

function bindGetIdCustomer(){
    $("#ddlCustomer").on('change', function (){
         
    var indexs = $("#ddlCustomer")[0].selectedIndex;
    var custId = $($("#ddlCustomer")[0].options[indexs]).attr("customerId");

    });
}

function bindCountTotal(){
    var getItemSalesReportList = $(".amtTotalList");
    
    var getAmoutTotalList = $(".amountTotal");
    
    var resultAmount = parseFloat(0);
    
     $.each(getItemSalesReportList, function (index, object){
         var getAT = getAmoutTotalList[index].textContent;
         
         resultAmount = parseFloat(resultAmount) + Number(removeNumberFormat(getAT));
         
         getAmoutTotalList[index].textContent = getPriceFormattedNumber(Number(removeNumberFormat(getAT)), 2);
         $("#AmountTotals").text(getPriceFormattedNumber(resultAmount, 2));
     });
    
}

function bindSearchKey(){
    $("[type='search']").on('keyup', function(){
       bindCountTotal();
    });
}

//var dateNow;
//function initializeDateFromOnChanges() {
//    $('#startDate').change(function() {
//        var fromDate = this.value;
//        var toDate = $('#endDate').val();
//        var splitFDate = fromDate.split("/");
//        var splitTDate = toDate.split("/");
//        var buildStringFrom = splitFDate[1]+"/"+splitFDate[0]+"/"+splitFDate[2];
//        var buildStringTo = splitTDate[1]+"/"+splitTDate[0]+"/"+splitTDate[2];
//        var fromDates = new Date(buildStringFrom);
//        var toDates = new Date(buildStringTo);
//        if(fromDates > toDates){
//            $('#endDate').val("");
//        }
//
//        dateNow = $('#startDate').val();
//        initializeRangeDatePicker();
//        
//        if($('#endDate').val() === ""){
//            var currentDate = convertDateToString(new Date());
//            $('#endDate').val(currentDate);
//        }
//    });
//}
//
//function initializeRangeDatePicker() {
//    $('#endDate').datepicker("option", "minDate", dateNow);
//    var dates = $('#endDate').datepicker({
//       dateFormat: "dd/mm/yy", 
//       changeMonth: true,
//       numberOfMonths: 1,
//       minDate: dateNow,
//       onSelect: function(selectedDate) {
//           var option = this.id === "startDate" ? "minDate" : "",
//               instance = $(this).data("datepicker"),
//               date = $.datepicker.parseDate(instance.settings.dateFormat || 
//               $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
//               dates.not(this).datepicker("option", option, date);
//       }
//    });
//}

function bindFilterOnClickEventMgr(){
    $("#btnFilter").on('click', function (){
       var frmForFilter = $("#frm");
       document.location.href = 'ItemSalesReport?' + frmForFilter.serialize();
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