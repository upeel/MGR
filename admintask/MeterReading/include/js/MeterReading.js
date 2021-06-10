/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global listContractId, tech_id */

$(document).ready(function(){
    setCheckBoxes();
    updateMeterReading();
    printMeterReading();
    duplicateTemplate();
    initializeDataTableEvent("dtMeterReading");
    hideTheSearchBarTheadDataTable();
    $('#dtMeterReading_info').css('margin-top', '15px');
    $('#dtMeterReading_paginate').css('margin-top', '15px');
});

window.onunload = function(){
  window.opener.location.reload();
};

function updateMeterReading(){
    $('#btnUpdate').click(function(){
        showLoading();
        injectIntentionInputElementIntoForm("Update");
        $('#frm').submit();
    });
}

function printMeterReading(){
    $('#btnPrint').click(function(){
       showLoading();
        injectIntentionInputElementIntoForm("Print");
        injectIntentionInputElementIntoFormPrint("Print");
        $('#frm').submit();
    });
}

function injectIntentionInputElementIntoFormPrint(intention)
{
    //clear existing intention
    $("#txtPrint").remove();

    //define the intention
    var $intentionInput = $("<input>")
            .attr("id", "txtPrint")
            .attr("name", "txtPrint")
            .attr("type", "text")
            .attr("hidden", true)
            .val(intention);

    //attach the intention to the form element, so that server side knows which operation to perform
    $intentionInput.appendTo("#frm");
}

function duplicateTemplate(){
    $('#btnDuplicate').click(function(){
        var str = ''; 
        var num = 1;
        var numb = 1;
        $('#dtMeterReading tbody #meter').each(function(){
            var serial = $('#serial_'+numb).val();
            var customer = $('#cust_'+numb).val();
            str += '&&ddlCustomer='+ customer +'&&serial='+ serial;
            numb++;
        });
        fnOpenPopUpWindow('CreateMeterReading', '../MeterReading/CreateMeterReading?tech_id='+tech_id+str);
    });
}

function setCheckBoxes() {
    var num = 1;
    $('#dtMeterReading tbody #meter').each(function(){
       var cbTaken = $('#taken_'+num);
       var cbVerified = $('#verified_'+num);
       cbTaken.click(function(){
          if(cbTaken[0].hasAttribute('checked'))
          {
              cbTaken.removeAttr('checked');
              cbTaken.val(0);
          } else {
              cbTaken.attr('checked', true);
              cbTaken.val(1);
          }
       });
       
       cbVerified.click(function(){
          if(cbVerified[0].hasAttribute('checked'))
          {
              cbVerified.removeAttr('checked');
              cbVerified.val(0);
          } else {
              cbVerified.attr('checked', true);
              cbVerified.val(1);
          }
       });
       
       var takenVal = $('#taken_'+num).val();
       var verifiedVal = $('#verified_'+num).val();
       if(takenVal === '1'){
           cbTaken.attr('checked', true);
       }
       if(verifiedVal === '1'){
           cbVerified.attr('checked', true);
       }
    num++;   
    });
}

function isNumberPlusComma(event, currentInputEntry) {
    var key = window.event ? event.keyCode : event.which;
//    alert(event.keyCode);
    // 46 is dot
    if (event.keyCode === 8 || event.keyCode === 46) {
        if(event.keyCode === 46 && currentInputEntry.val().indexOf('.') === -1) {
            currentInputEntry.data('dot', 1);
        } else {
            return false;
        }
        return true;
    } else if ( key < 48 || key > 57 ) {
        return false;
    } else {
        return true;
    }
}

function monoValidation(selector) {
    var colour = $(selector).parent().parent().find('.colour').val();
    var totalS = $(selector).parent().parent().find('.total');
    var total = parseInt(colour) + parseInt($(selector).val());
    totalS.val(total);
}

function colourValidation(selector) {
    var mono = $(selector).parent().parent().find('.mono').val();
    var totalS = $(selector).parent().parent().find('.total');
    var total = parseInt(mono) + parseInt($(selector).val());
    totalS.val(total);
}