/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    bindBtnConfirmOnClick();
    bindBtnCloseOnClick();
    
});

window.onunload = function(){
  window.opener.location.reload();
};

function bindBtnConfirmOnClick() {
    $('#btnConfirm').click(function() {
        showLoading();
        injectIntentionInputElementIntoForm('CONFIRM');
        var confirmation = window.confirm('Are you sure want to confirm this service call?');
        if(!confirmation)
        {
        $("#dvLoading").hide();
        $("#overlay").hide();
        return false;
        }
        $('#frm').submit();
    });
}

function bindBtnCloseOnClick() {
    $('#btnClose').click(function() {
        showLoading();
        injectIntentionInputElementIntoForm('CLOSE');
        var confirmation = window.confirm('Are you sure want to terminate this service call?');
        if(!confirmation)
        {
        $("#dvLoading").hide();
        $("#overlay").hide();
        return false;
        }
        $('#frm').submit();
    });
}

