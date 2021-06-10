/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    initializeDataTableEvent('dtContractMDSQRCodeList'); 
    hideTheSearchBarTheadDataTable();
    keyPressForResettinRowNumber();
});

function keyPressForResettinRowNumber() {
    $('.dataTables_filter input[type="search"]').keydown(function() {
        var number = 1;
        $('#dtContractMDSQRCodeList tbody tr').each(function() {
            $(this).find('td:eq(0)').text(number+'.');
            number++;
        });
    });
    
    $('th.sorting_asc, th.sorting_desc, th.sorting').click(function() {
        var number = 1;
        $('#dtContractMDSQRCodeList tbody tr').each(function() {
            $(this).find('td:eq(0)').text(number+'.');
            number++;
        });
    });
}