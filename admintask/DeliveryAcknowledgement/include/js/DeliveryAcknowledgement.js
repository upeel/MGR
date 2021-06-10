/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    bindBtnLoadOnClick();
    bindBtnConfirmOnClick();
    initializeSignaturePad();
    bindOnInputQuantity();
    
    if($('#txtAcknowledgementSignature') !== 'undefined') {
        $('#txtAcknowledgementSignature').val('');
    }
});

function bindOnInputQuantity() {    
    $('.receiveQty').bind('input', function() {
        var sel = $(this);
        var selDel = $(this).next();
        if(sel.val() === '') {
            sel.val(0);
            sel.data('current', 0);
        } else {
            if(parseInt(sel.val()) > parseInt(selDel.val())) {
                alert('Receive Quantity Cannot More Then Delivery Quantity!');
                sel.val(sel.data('current'));
                sel.focus();
                return false;
            } else {
                sel.val(parseInt(sel.val()));
                sel.data('current', sel.val());
            }            
        }
        
    });
}

// signature pad
function initializeSignaturePad() {
    var api = $('.sigPad').signaturePad();
    var sig = api.getSignatureString();
    api.clearCanvas();
    var options = {
        drawOnly: true, lineWidth: 0,
        validateFields : true
                  , onFormError : function (errors, context, settings) {
//                      alert("Customer Signature is required.");
                  }
    };

    $('#frm').signaturePad(options).regenerate(sig);
}

// trigger load delivery acknowledgment
function bindBtnLoadOnClick() {
    $('#btnLoad').click(function() {
       var confirm = window.confirm('Are You Sure Wanna Load This Delivery ?');
       if(!confirm) {
           return false;
       }
       submitForm('LOAD');
    });
}

// trigger confirm delivery acknowledgement
function bindBtnConfirmOnClick() {
    $('#btnConfirm').click(function() {
        var signatureValue = $('#txtAcknowledgementSignature').val();
        if(signatureValue !== '' && signatureValue !== '[]') {
            var confirm = window.confirm('Are You Sure Wanna Confirm This Delivery ?');
            if(!confirm) {
                return false;
            }
            
            submitForm('CONFIRM');
            return true;
        }
        alert('Customer Signature Is Required!');
        return false;                   
    });
}

function submitForm(intention) {
    injectIntentionInputElementIntoForm(intention);
    showLoading();
    $('#frm').submit();
}
