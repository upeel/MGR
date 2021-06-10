/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    bindChosenDDLMulitpleSelectEvent('ddlEntityId');
    bindImportMyobCustomerOnClick();
    bindValidateFileTypeOnChange();
});

function bindValidateFileTypeOnChange() {
    $('#file').change(function() {
        var fileValue = $(this).val();
       var fileType = fileValue.substring(fileValue.lastIndexOf("."), fileValue.length);
       if(fileType !== ".txt") {
           alert('Please Choose .txt type file!');
           $(this).val("");
           return false;
       }
    });
}

function bindImportMyobCustomerOnClick() {
    $('#btnImport').click(function() {
        $('#frm').submit();
    });
}