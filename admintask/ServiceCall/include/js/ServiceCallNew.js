/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global listOfContractMdsMachineInfoJson */

$(document).ready(function() {
    bindSetAutoCompleteSerial();
    bindSerialOnChange();
    bindIssueOnChange();
    bindBtnSubmitOnClick();
});

/*function submit*/
function bindBtnSubmitOnClick()
{
    $('#btnSubmitServiceCall').click(function() {
        var issueSelector = $('#txtIssue');
        var submittedSelector = $('#txtSubmittedBy');
        var contactSelector = $('#txtContact');
        var contactPSelector = $('#txtContactP');
        
        if(issueSelector.children('option:selected').val() === '') {
            alert('Please Select Issue.');
            scrollTo(issueSelector.attr('id'));
            issueSelector.focus();
            return false;
        }
        
        if(submittedSelector.val() === '') {
            alert('Please Enter Submitted By!');
            scrollTo(submittedSelector.attr('id'));
            submittedSelector.focus();
            return false;
        }
        
        if(contactSelector.val() === '') {
            alert('Please fill in Contact No.!');
            scrollTo(contactSelector.attr('id'));
            contactSelector.focus();
            return false;
        }
        
        if(contactPSelector.val() === '') {
            alert('Please fill in Contact Person!');
            scrollTo(contactPSelector.attr('id'));
            contactPSelector.focus();
            return false;
        }
        
        if($('#txtSerial').val() === '') {
            alert('Please Enter Serial No.!');
            scrollTo($('#txtSerial').attr('id'));
            $('#txtSerial').focus();
            return false;
        }
        
        var confirmation = confirm("Are you sure wanna submit this service call ?");
        if(!confirmation) {
            return false;
        }
        
        showLoading();
        injectIntentionInputElementIntoForm('SUBMIT');
        $('#frm').submit();
    });    
}

window.onunload = function(){
  window.opener.location.reload();
};

function bindIssueOnChange() {
    $('#txtIssue').change(function() {
        var issue = $('#txtIssue').children('option:selected').text().trim();
        if(issue === 'Error Code (specify in remarks)' || issue === 'Others (specify in remarks)') {
            $('#show').show();
        } else {
            $('#show').hide();
        }
    });
}

var current;

document.addEventListener("keyup", function(event){
   if(event.keyCode === 39)
   {
       var currentImg = $('#img01').attr('src');
       var lastImg = $('#imgs img:last').attr('src');
       if(currentImg !== lastImg)
       {
           $(".next").click();
       }       
   }
   else if(event.keyCode === 37)
   {
       var currentImg = $('#img01').attr('src');
       var firstImg = $('#imgs img:first').attr('src');
       if(currentImg !== firstImg)
       {
           $('.previous').click();
       }        
   }
   else if(event.keyCode === 27)
   {
        zoomOut();
   }
});

function zoomOut(){
    $('.modal img').removeClass('zoomIn');
    $('.modal img').addClass('zoomOut');
    $('.modal').fadeOut();
    $('.next').removeClass('zoomIn');
    $('.next').addClass('zoomOut');
    $('.previous').removeClass('zoomIn');
    $('.previous').addClass('zoomOut');    
    $('.next').fadeOut('fast');
    $('.previous').fadeOut('fast');
    $('.close').removeClass('zoomIn');
    $('.close').addClass('zoomOut');
    $('.close').fadeOut();
}

function zoomin(){
    $('.modal img').removeClass('zoomOut');
    $('.modal img').addClass('zoomIn');
    $('.modal').fadeIn('fast');
    $('.next').removeClass('zoomOut');
    $('.next').addClass('zoomIn');
    $('.previous').removeClass('zoomOut');
    $('.previous').addClass('zoomIn');    
    $('.next').fadeIn('fast');
    $('.previous').fadeIn('fast');
    $('.close').removeClass('zoomOut');
    $('.close').addClass('zoomIn');
    $('.close').fadeIn();
}

function hidePrev(){
    $('.previous').removeClass('zoomIn');
    $('.previous').addClass('zoomOut');
    $('.previous').fadeOut('fast');
}

function showPrev(){
    $('.previous').removeClass('zoomOut');
    $('.previous').addClass('zoomIn');
    $('.previous').fadeIn('fast');
}

function hideNext(){
    $('.next').removeClass('zoomIn');
    $('.next').addClass('zoomOut');
    $('.next').fadeOut('fast');
}

function showNext(){
    $('.next').removeClass('zoomOut');
    $('.next').addClass('zoomIn');
    $('.next').fadeIn('fast');
}

function imgClick(id){ 
        var firstImage = $('#imgs img:first').attr('src');
        var lastImage = $('#imgs img:last').attr('src');
        var wow = $('#myImg_'+id);  
        $('#img01').removeAttr('src');        
        $('#img01').attr('src', $(wow).attr('src'));
        zoomin();
        
        if($(wow).attr('src') === lastImage)
            {
                $('.next').hide();
            }
            
        else if($(wow).attr('src') === firstImage)
            {
                $('.previous').hide();
            }
            current = id;
            onClick();
}

function onClick(){
     $('#next_1').on('click', function(event){
            showPrev();
            var lastImage = $('#imgs img:last').attr('src');            
            var wow = $('img#myImg_' + current).next();            
            current++;
            $('#img01').removeAttr('src');        
            $('#img01').attr('src', wow.attr('src'));    
            if($('#img01').attr('src') === lastImage)
            {
                hideNext();                
            }
            event.stopImmediatePropagation();
        });
        
        $('.previous').on('click', function(event){
            showNext();
            
            var firstImage = $('#imgs img:first').attr('src');
            var wow = $('img#myImg_' + current).prev();         
            current--;
            $('#img01').removeAttr('src');            
            $('#img01').attr('src', wow.attr('src'));
            if($('#img01').attr('src') === firstImage)
            {
                hidePrev();
            }
            event.stopImmediatePropagation();
        });
        
        $('.close').click(function(){
            zoomOut();
        });
        
        $('#myModal').click(function(){
            zoomOut();
        });
}

// bind auto complete for serial no
function bindSetAutoCompleteSerial() {
    var listOfContractMdsMachine = listOfContractMdsMachineInfoJson;
    
    var listOfSerials = [];
    for(var index in listOfContractMdsMachine) {
        listOfSerials.push({
            id: listOfContractMdsMachine[index].id,
            value: listOfContractMdsMachine[index].serial
        });
    }
    $('#txtSerial').autocomplete({
        source: listOfSerials,
        autoFocus: true,
        change: bindSerialOnChange
    });
}

// after autocomplete selected
function bindSerialOnChange() {
    $('#txtSerial').change(function() {
        var serial_no = $(this).val();
        var jqXHR = $.ajax({
            url: "../AjaxServlet/GetMDSDataBySerialNo",
            method: "GET",
            data: {serial_no}
        });
        
        jqXHR.done(function(data) {
            var contract_mds_machine_id = '';
            var contract_mds_info_id = '';
            var machine_model = '';
            
            if(data !== null){
                contract_mds_machine_id = data.id;
                machine_model = data.model;
                contract_mds_info_id = data.contract_mds_information_id;
                var jqXHRR = $.ajax({
                    url: "../AjaxServlet/GetCompanyName",
                    method: "GET",
                    data: {contract_mds_info_id}
                });
                jqXHRR.done(function(data) {
                    var compName = '';
                    if(data !== null){
                        compName = data;
                    }
                    $('#txtCompanyName').val(compName);
                });
                jqXHRR.fail(function(data) {
                    alert('Error er!');
                });
                
                var jqXHRRR = $.ajax({
                    url: "../AjaxServlet/GetReferenceNoAjaxServlet",
                    method: "GET",
                    data: {contract_mds_info_id}
                });
                jqXHRRR.done(function(data) {
                    var refNo = '';
                    if(data !== null) {
                        refNo = data;
                    }
                    $('#txtReferenceNo').val(refNo);
                });
                jqXHRRR.fail(function(data) {
                    alert('Error wak!');
                });
            }
        $('#txtMachineModel').val(machine_model);
        $('#contractMdsMachineId').val(contract_mds_machine_id);
        });
        
        jqXHR.fail(function(data) {
            alert('Error!');
        });
        
    });
}

function emailValidation(id){
    var emil = true;
    var em =  $(id).val();
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(em)) {
     emil = false;
    }
    
    if (!emil)
    {
        alert('email must be formatted example@mail.com');
        $(id).val('');
        $(id).focus();
    }
}