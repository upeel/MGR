/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    initializeDataTableEvent("dtContractMasterList");
    bindChosenDDLMulitpleSelectEvent('ddlStatus');  
    bindOpenPopUpContractDetailForm();   
    bindbtnFilterOnClick();
    hideTheSearchBarTheadDataTable();    
//    keyPressForResettingRowNumber();
});

/* open pop up contract detail form */
function bindOpenPopUpContractDetailForm() {
    $('#btnAddNewContract').click(function() {
        fnOpenPopUpWindow('ContractMasterDetailForm', 'ContractMasterDetail');
    });
}

function bindbtnFilterOnClick() {
    $('#btnFilterContract').click(function() {
        showLoading();
        $('#frm').submit();
    });
}

function keyPressForResettingRowNumber() {
    $('.dataTables_filter input[type="search"]').keydown(function() {
       var number = 1;
       $('#dtContractMasterList tbody tr').each(function() {
           $(this).find('td:eq(0)').text(number+'.');
           number++;
       });
    });
    
    $('th.sorting_asc, th.sorting_desc, th.sorting').click(function() {
       var number = 1;
       $('#dtContractMasterList tbody tr').each(function() {
           $(this).find('td:eq(0)').text(number+'.');
           number++;
       });
    });
}