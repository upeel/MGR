/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    bindChosenDDLMulitpleSelectEvent('ddlEntityId');
    initializeDatePicker('txtInvoiceDate');
    btnExportClickEvent();
    promptExportedOrNot();
});

function promptExportedOrNot() {
    var promptExportedSelector = $('#txtPromptExported');
    if(promptExportedSelector.val() === 'false') {
        alert('No Sales Invoice To Be Exported By This Date!');
        return false;
    }
}

function btnExportClickEvent() {
    $('#btnExportInvoice').click(function() {
        var business_entity_selector = $('#ddlEntityId');
        var invoice_date_selector = $('#txtInvoiceDate');
        
        if(business_entity_selector.children('option:selected').val() === '0') {
            alert('Please Select Business Entity!');
            scrollTo(business_entity_selector.next().attr('id'));
            business_entity_selector.next().addClass('chosen-container-active');            
            return false;
        }
        
        if(invoice_date_selector.val() === '') {
            alert('Please Choose Invoice Date!');
            scrollTo(invoice_date_selector.attr('id'));
            invoice_date_selector.focus();
            return false;
        }
        
        injectIntentionInputElementIntoForm('DOWNLOAD'); 
        $('#frm').submit();
    });
}