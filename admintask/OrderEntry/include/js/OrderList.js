/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    initializeDataTableEvent("dtOrderListList");
    bindChosenDDLMulitpleSelectEvent('ddlEntity');
    bindOpenPopUpOrderEntryForm();   
    bindbtnFilterOnClick();
    hideTheSearchBarTheadDataTable();
    initializeDatePicker("startDate");
    initializeDatePicker("endDate");
//    keyPressForResettingRowNumber();
});

//function keyPressForResettingRowNumber() {
//    $('.dataTables_filter input[type="search"]').bind('keydown', function() {
//       var number = 1;
//       $('#dtOrderListList tbody tr').each(function() {
//           $(this).find('td:eq(1)').text(number+'.');
//           number++;
//       });
//    });
//    
//    $('th.sorting_asc, th.sorting_desc, th.sorting').click(function() {
//       var number = 1;
//       $('#dtOrderListList tbody tr').each(function() {
//           $(this).find('td:eq(1)').text(number+'.');
//           number++;
//       });
//    });
//}

/* open pop up contract detail form */
function bindOpenPopUpOrderEntryForm() {
    $('#btnAddNewOrderList').click(function() {
        fnOpenPopUpWindow('OrderEntryFormAdd', 'OrderEntry');
    });
}

function bindbtnFilterOnClick() {
    $('#btnFilterOrderList').click(function() {
        showLoading();
        $('#frm').submit();
    });
}


