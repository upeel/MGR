/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    initializeDataTableEventForMgrDestroyAndBuild("dtCustSalesReport");
    initializeDatePicker("startDate");
    initializeDatePicker("endDate");
//    initializeDataTableEvent("dtCustSalesReport");
    bindChosenDDLMulitpleSelectEvent("ddlEntity");
    bindChosenDDLMulitpleSelectEvent("ddlCustomer");
    bindChosenDDLMulitpleSelectEvent("ddlShipTo");
    bindChosenDDLMulitpleSelectEvent("ddlInvoiceType");
    hideTheSearchBarTheadDataTable();
    $('#dtCustSalesReport_wrapper').css('margin-top','10px');
    
    bindAutomaticallyChangeShipToByCustomer();
    bindFilterOnClickEventMgr();
//    initializeDateFromOnChanges();
    bindCountTotal();
    
    $("#ddlCustomer").trigger('change');
    $("#ddlShipTo").trigger('chosen:updated');
});

function bindCountTotal(){
    var getCustSlaesReportList = $(".customerSalesReportList");
    
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
        
//        getSubTotalList[index].textContent = getPriceFormattedNumber(Number(removeNumberFormat(getSTL)), 2);
//        getGstTotalList[index].textContent = getPriceFormattedNumber(Number(removeNumberFormat(getGST)), 2);
//        getGrandTotalList[index].textContent = getPriceFormattedNumber(Number(removeNumberFormat(getGT)), 2);
        
        $("#subTotal").text(getPriceFormattedNumber(resultSubTotal, 2));
        $("#gstTotal").text(getPriceFormattedNumber(resultGst, 2));
        $("#grandTotal").text(getPriceFormattedNumber(resultGrandTotal, 2));
    });
}

function openOrderCollectionForms(element){
    var thisIndex = $(".salesInvoice").index(element);
    var salesId = $(".salesId")[thisIndex].innerText.trim();
    fnOpenPopUpWindow('Invoice', '../Invoice/Invoice?inv_id='+salesId+'&report=1');
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
        $("#ddlCustomer").trigger('change');
        $("#ddlShipTo").trigger('chosen:updated');
        
       var frmForFilter = $("#frm");
       document.location.href = 'CustomerSalesReport?' + frmForFilter.serialize();
    });
}

function bindAutomaticallyChangeShipToByCustomer(){
    $("#ddlCustomer").on('change', function(){
        var customerCode = $("#ddlCustomer").val();
        var getShipToOptionList = $("#ddlShipTo")[0].options;
        
        $.each(getShipToOptionList, function (index, object){
            if($(object).attr("customerCode") === customerCode ){
                $(object).show();
            }else if (customerCode === "" || customerCode === "All"){
                $(object).show();
            }else{
                $(object).hide();
            }
        });
        
        $(getShipToOptionList[0]).show();
        $("#ddlShipTo").trigger("chosen:updated");
        
        if($("#ddlShipTo")[0].selectedOptions[0].style.display === "none"){
            $($("#ddlShipTo")[0].selectedOptions[0]).attr("selected", false);
        }else{
            $($("#ddlShipTo")[0].selectedOptions[0]).attr("selected", true);
        }
        
        $("#ddlShipTo").trigger("chosen:updated");
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