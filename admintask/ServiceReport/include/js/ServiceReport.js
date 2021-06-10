/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global listOfItemEntitesJson */
var item_uom_id = 0;
var item_id;
var uom, quantity, part_no;
var listOfItemIdThatAreUsed = [];
$(document).ready(function(){
    setServiceDatePicker();
    updateTotalServicePartUsed();
    addPartUsed();
    setWhenFirstRetireve();
    bindQuantityOnInput();
    bindMeterReadingOnInput();
    bindBwMeterReadingValidation();
    bindColorMeterReadingValidation();
    bindValidateServicePeriodTimes();
    bindOnChangeCallStatus();
    initializeSignaturePad();
    setEmailCheckBox();
    setFormBasedOnLogin();
    btnSubmitServiceReportOnClickEvent();
    $('#txtSignature').val('');
});

function setServiceDatePicker() {
    var date = $('#date').val().split('/');
    var day = parseInt(date[0]);
    var month = parseInt(date[1]);
    var year = parseInt(date[2]);
    $('#txtServiceDate').datepicker({
       dateFormat: "dd/mm/yy",
       minDate: new Date(year, month-1, day)
    });
}

function initializeSignaturePad() {
    var api = $('.sigPad').signaturePad();
    var sig = api.getSignatureString();
    api.clearCanvas();
    var options = {
        drawOnly: true, lineWidth: 0,
        validateFields: true,
        onFormError: function(errors, context, settings) {
            
        }
    };
    
    $('#frm').signaturePad(options).regenerate(sig);
}

window.onunload = function(){
  window.opener.location.reload();
};

function btnSubmitServiceReportOnClickEvent() {
    $('#btnReportSubmit').click(function() {
        var ddlTechnician = $('#ddlTechnician');
        if(ddlTechnician.children('option:selected').val() === '0') {
            alert('Please Select Technician!');
            scrollTo(ddlTechnician.attr('id'));
            ddlTechnician.focus();
            return false;
        }
        
        var service_date = $('#txtServiceDate');
        if(service_date.val() === '') {
            alert('Please Select Service Date!');
            scrollTo(service_date.attr('id'));
            service_date.focus();
            return false;
        }
        
        var ddlServiceStartTime = $('#ddlServiceStartTime');
        if(ddlServiceStartTime.children('option:selected').val() === '0') {
            alert('Please Select Service Start Time!');
            scrollTo(ddlServiceStartTime.attr('id'));
            ddlServiceStartTime.focus();
            return false;
        }
        
        var ddlServiceEndTime = $('#ddlServiceEndTime');
        if(ddlServiceEndTime.children('option:selected').val() === '0') {
            alert('Please Select Service End Time!');
            scrollTo(ddlServiceEndTime.attr('id'));
            ddlServiceEndTime.focus();
            return false;
        }
        
        var txtServiceJobDoneRemarks = $('#txtServiceJobDoneRemarks');
        if(txtServiceJobDoneRemarks.val() === '') {
            alert('Please Enter Job Done Remark!');
            scrollTo(txtServiceJobDoneRemarks.attr('id'));
            txtServiceJobDoneRemarks.focus();
            return false;
        }
        
        var txtTotalServicePartUsed = $('#txtTotalServicePartUsed');
        var totalPartUsed = parseInt(txtTotalServicePartUsed.val());
//        if(totalPartUsed === 0) {
//            alert('Please Add The Part At Least 1 That Will Be Using!');
//            return false;
//        } 
        
        for(var i = 1; i <= totalPartUsed; i++) 
        {
           var item_id = $('#txtItemId_'+i);
           var part_no = $('#txtPartNo_'+i);
           if(item_id.val() === '') {
                alert('Please Enter Correct Part No!');
                scrollTo(part_no.attr('id'));
                part_no.focus();
                return false;
           }
           
           var ddlItemUomId_ = $('#ddlItemUomId_'+i);
           if(ddlItemUomId_.children('option:selected').val() === '0') {
               alert('Please Select Uom On Part Used Row ' + i);
               scrollTo(ddlItemUomId_.attr('id'));
               ddlItemUomId_.focus();
               return false;
           }
           
           var txtQuantity_ = $('#txtQuantity_'+i);
           if(txtQuantity_.val() === '0') {
               alert('Please Enter Quantity On Part Used Row ' + i + ', Cannot Zero!');
                scrollTo(txtQuantity_.attr('id'));
                txtQuantity_.focus();
               return false;
           }
        }
        
        var ddlCallStatus = $('#ddlCallStatus');
        if(ddlCallStatus.children('option:selected').val() === '') {
            alert('Please Select Service Call Status!');
            scrollTo(ddlCallStatus.attr('id'));
            ddlCallStatus.focus();
            return false;
        }
        
        if($('#txtFlwUp').prop('hidden') === false) {
            var txtFollowUpRemark = $('#txtFollowUpRemark');
            if(txtFollowUpRemark.val() === '') {
                alert('Please Enter Follow Up Remark!');
                scrollTo(txtFollowUpRemark.attr('id'));
                txtFollowUpRemark.focus();
                return false;
            }
        }
        
        var txtVerifiedBy = $('#txtVerifiedBy');
        if(txtVerifiedBy.val() === '') {
            alert('Please Enter Who Verified This Report!');
            scrollTo(txtVerifiedBy.attr('id'));
            txtVerifiedBy.focus();
            return false;
        }
        
        var txtSignature = $('#txtSignature');
        if(txtSignature.val() === '') {
            alert('Please Make Sure Customer Signature This Report!');
            scrollTo(txtSignature.attr('id'));
            txtSignature.focus();
            return false;
        }
        
        if($('#cbEmailCustomer').attr('checked', true) === true)
        {
            if($('#email').val() === '' || $('#email').val() === 'undefined')
            {
                alert('Please enter customer email address');
                scrollTo(txtSignature.attr('id'));
                $('#email').focus();
                return false;
            }
        }
        
        var comfirmation = window.confirm("Are You Sure Wanna Submit This Service Report?");
        if(!comfirmation) {
            return false;
        }
        
        $('#frm').submit();
        window.opener.location.reload();
    });
}

function setWhenFirstRetireve() {
    var i = 1;
    $('#tbodyPartUsed tr').each(function() {
        var part_no = $(this).find('td input#txtPartNo_' + i).val();
        var item_id = $(this).find('td input#txtItemId_' + i).val();
        listOfItemIdThatAreUsed.push(parseInt(item_id));
        var elementId = $(this).find('td select#ddlItemUomId_' + i);
        var item_uom_id = $(this).find('td input#txtItemUomIdHidden_' + i).val();
        setEachPartUsedUom(part_no, elementId, item_uom_id);
        bindSetPartNoUsedAutoComplete(i);
        i++;
    });;
}

function setEachPartUsedUom(part_no, elementId, item_uom_id) {
    item_uom_id = parseInt(item_uom_id);
    var jqXHR = $.ajax({
        url: "../AjaxServlet/GetListOfUomByPartNo",
        data: {part_no},
        method: "GET"        
    });
    
    jqXHR.done(function(data) {
        var listOfUoms = data;
        for(var i = 0; i < listOfUoms.length; i++) {
            if(item_uom_id === listOfUoms[i].id) {
                elementId.append('<option value="'+listOfUoms[i].id+'" selected>'+listOfUoms[i].uom+'</option>');
            } else {
                elementId.append('<option value="'+listOfUoms[i].id+'">'+listOfUoms[i].uom+'</option>');
            }            
        }
    });
    
    jqXHR.fail(function(data) {
        alert('need to maintanance this portion');
    });
}

function addPartUsed(){
    $('#imgAddPartUsed').click(function() 
    {
        var number = parseInt($('.trPart').length) +1;
        var row = '<tr id="trPart_" name="trPart_'+number+'" class="trPart">';
        // delete sectiopn
        row+= '<td class="underline mgrPaddingLeft20 paddingTop paddingTopBottom">';
        row+= '<img onclick="removeRow($(this))" id="remove_'+number+' class="remove" style="width: 20px;vertical-align: middle;cursor: pointer;" src="../../include/mgr/include/images/MGR-LOGO/Remove mgr.png"/>';
        row+= '</td>';
        // no
        row+= '<td class="mgrPaddingLeft20 underline paddingTop paddingTopBottom">'+number+'.</td>';
        // part no
        row+= '<td class="underline mgrPaddingLeft20 paddingTop paddingTopBottom">';
        row+= '<input style="width: 150px;" maxlength="50" type="text" id="txtPartNo_'+number+'" name="txtPartNo_'+number+'" class="mgrFormDesign txtPartNo" value=""/>';
        row+= '<input type="hidden" id="txtItemId_'+number+'" name="txtItemId_'+number+'" class="txtItemId" readonly>';
        row+= '</td>';
        // uom
        row+= '<td class="underline mgrPaddingLeft20 paddingTop paddingTopBottom">';
        row+= '<select id="ddlItemUomId_'+number+'" style="width: 80px;" class="ddlMgr ddlItemUomId" name="ddlItemUomId_'+number+'"><option value="0" selected disabled>-- Please Select UOM --</option></select>';
        row+= '<input id="txtItemUomIdHidden_'+number+'" name="txtItemUomIdHidden_'+number+'" class="txtItemUomIdHidden" value="" type="hidden" readonly>';
        row+= '</td>';
        // quantity
        row+= '<td class="underline mgrPaddingLeft20 mgrPaddingRight20 paddingTop paddingTopBottom">';
        row+= '<input style="text-align: right; width: 50px;" type="number" id="txtQuantity_'+number+'" name="txtQuantity_'+number+'" class="mgrFormDesign txtQuantity" value="0"/>';
        row+= '</td>';
        row+= '</tr>';        
        $('#tbodyPartUsed').append(row);
        $('#ddlItemUomId_'+number+', #txtQuantity_'+number).hide();
        // bind set auto complete
        bindSetPartNoUsedAutoComplete(number);
        updateTotalServicePartUsed();
        bindQuantityOnInput();
    });
}

function removeRow(row){
    var value = row.parent().parent().find('td input.txtItemId').val();
    if(value !== '') {
        var index = listOfItemIdThatAreUsed.indexOf(parseInt(value));
        if(index !== -1) {
            listOfItemIdThatAreUsed.splice(index, 1);
        }
    }    
    row.parent().parent().remove();
    refresh();
    updateTotalServicePartUsed();
}

function refresh(){
    var i=1;
    $('.trPart').each(function(){
        $(this).attr({id:'trPart_'+i, name:'trPart_'+i});
        $(this).find('td:eq(1)').text(i+'.');
        $(this).find('.remove').attr({id:'remove_'+i});
        $(this).find('.txtPartNo').attr({id:'txtPartNo_'+i, name:'txtPartNo_'+i});
        $(this).find('.txtItemId').attr({id:'txtItemId_'+i, name:'txtItemId_'+i});
        $(this).find('.ddlItemUomId').attr({id: 'ddlItemUomId_'+i, name:'ddlItemUomId_'+i});
        $(this).find('.txtItemUomIdHidden').attr({id: 'txtItemUomIdHidden_'+i, name: 'txtItemUomIdHidden_'+i});
        $(this).find('.txtQuantity').attr({id:'txtQuantity_'+i,name:'txtQuantity_'+i});
        
        // reinitialize again auto complete 
        bindSetPartNoUsedAutoComplete(i);
        i++;
    });    
}

function updateTotalServicePartUsed(){
    var trManagement = $('.trPart').length;
    $('#txtTotalServicePartUsed').val(trManagement);
}

function bindSetPartNoUsedAutoComplete(number) {
    $('#txtPartNo_'+number).autocomplete({
        source: listOfItemEntitesJson,
        autofocus: true,
        change: bindOnChangePartNoUsed(number) // when auto complete on change event
    });
}

function bindOnChangePartNoUsed(number) {
    
    var part_no = $('#txtPartNo_'+number);    
    
    part_no.change(function() {
       item_id = $(this).parent().find('input.txtItemId');
       uom = $(this).parent().parent().find('td select.ddlItemUomId'); 
       quantity = $(this).parent().parent().find('td input.txtQuantity');
       part_no = $(this);
       var jqXHR = $.ajax({
            url: "../AjaxServlet/GetItemWithListOfUOMs",
            data: {part_no: $(this).val()},
            method: "GET" 
       });
       
       jqXHR.done(function(data) {
           var item_id_value = '';
           uom.hide();
           quantity.hide();
           uom.empty();
           uom.append('<option value="0" selected disabled>-- Please Select UOM --</option>');
           var itemWithUomsJson = data;
           if(itemWithUomsJson !== null) {
               item_id_value = itemWithUomsJson.id;
               for(var i = 0; i < itemWithUomsJson.listOfItemUoms.length; i++) {
                   uom.append('<option value="'+itemWithUomsJson.listOfItemUoms[i].id+'">'+itemWithUomsJson.listOfItemUoms[i].uom+'</option>');
               }
               uom.show();
               quantity.show();
           } 
           
           var previousItemId = item_id.val();
           if(previousItemId !== '') {
                var index = listOfItemIdThatAreUsed.indexOf(parseInt(previousItemId));
                if(index !== -1) {
                    listOfItemIdThatAreUsed.splice(index, 1);
                }
           }
           
           item_id.val(item_id_value);
           if(item_id.val() !== '') {
               var item_id_number = parseInt(item_id.val());
                if(listOfItemIdThatAreUsed.includes(item_id_number)) {
                    part_no.val('');
                    item_id.val('');
                    alert('This Part No Has Been Added. Please Enter Another!');
                    scrollTo(part_no.attr('id'));
                    part_no.focus();
                    uom.hide();
                    quantity.hide();
                    uom.empty();
                    return false;
                } else {
                    listOfItemIdThatAreUsed.push(item_id_number);
                }
           }
           
       });
       
       jqXHR.fail(function(data) {
           alert('Err, Need To Check This Code.');
       });
    });
}

function bindQuantityOnInput() {
    $('.txtQuantity').bind('input', function() {
       var sel = $(this);
       if(sel.val() === '') {
           sel.val(0);
           sel.data('current', 0);
       } else {
           sel.val(parseInt(sel.val()));
           sel.data('current', sel.val());
       }
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

function bindMeterReadingOnInput() {
    $('.txtMeterReading').bind('input', function() {
       var sel = $(this);
       if(sel.val() === '') {
           sel.val(0);
           sel.data('current', 0);
       } else {
           sel.val(parseInt(sel.val()));
           sel.data('current', sel.val());
       }
    });
}

function bindBwMeterReadingValidation() {    
    $('#txtServiceBWBefore').change(function() {
        var bwNow = $('#txtServiceBWNow');
        var bwUsed = $('#txtServiceBWUsed');
        var bwBeforeVal = parseInt($(this).val());
        var bwNowVal = parseInt(bwNow.val());
        var bwUsedVal = 0;
        if(bwNowVal >= bwBeforeVal) {
            bwUsedVal = bwNowVal - bwBeforeVal;
            bwUsed.val(bwUsedVal);            
        } else {
            scrollTo($(this).attr('id'));
            $(this).focus();
            $(this).val(0);
            $(this).data('current', 0);
            bwNow.val(0);
            bwUsed.val(0);
            alert('BW(Before) cannot be higher than BW(Now)!');
            return false;
        }
    });
    
    $('#txtServiceBWNow').change(function() {
        var bwBefore = $('#txtServiceBWBefore');
        var bwUsed = $('#txtServiceBWUsed');
        var bwBeforeVal = parseInt(bwBefore.val());
        var bwNowVal = parseInt($(this).val());
        var bwUsedVal = 0;
        if(bwNowVal >= bwBeforeVal) {
            bwUsedVal = bwNowVal - bwBeforeVal;
            bwUsed.val(bwUsedVal);      
        } else {
            scrollTo(bwBefore.attr('id'));
            bwBefore.focus();
            $(this).val(0);
            $(this).data('current', 0);
            bwBefore.val(0);
            bwUsed.val(0);
            alert('BW(Now) cannot be lower than BW(Before)!');
            return false;
        }
    });
}

function bindColorMeterReadingValidation() {
    $('#txtServiceColorBefore').change(function() {
       var colorNow = $('#txtServiceColorNow');
       var colorUsed = $('#txtServiceColorUsed');
       var colorBeforeVal = parseInt($(this).val());
       var colorNowVal = parseInt(colorNow.val());
       var colorUsedVal = 0;
       if(colorNowVal >= colorBeforeVal) {
           colorUsedVal = colorNowVal - colorBeforeVal;
           colorUsed.val(colorUsedVal);
       } else {
            scrollTo($(this).attr('id'));
            $(this).focus();
            $(this).val(0);
            $(this).data('current', 0);
            colorNow.val(0);
            colorUsed.val(0);
            alert('Colour(Before) cannot be greater than Colour(Now)!');
            return false;
       }
    });
    
    $('#txtServiceColorNow').change(function() {
        var colorBefore = $('#txtServiceColorBefore');
        var colorUsed = $('#txtServiceColorUsed');
        var colorBeforeVal = parseInt(colorBefore.val());
        var colorNowVal = parseInt($(this).val());
        var colorUsedVal = 0;
        if(colorNowVal >= colorBeforeVal) {
            colorUsedVal = colorNowVal - colorBeforeVal;
            colorUsed.val(colorUsedVal);
        } else {
            scrollTo(colorBefore.attr('id'));
            colorBefore.focus();
            $(this).val(0);
            $(this).data('current', 0);
            colorBefore.val(0);
            colorUsed.val(0);
            alert('Colour(Now) cannot be lesser than Colour(Before)!');
            return false;
        }
    });
} 

// validate service period times
// index for validation which greater
function bindValidateServicePeriodTimes() {
    $('#ddlServiceStartTime').change(function() {
        var ddlServiceEndTime = $('#ddlServiceEndTime');
        var indexStartTime = $(this).children('option:selected').data('index');
        var indexEndTime = ddlServiceEndTime.children('option:selected').data('index');
        if(indexEndTime !== 'NO') {
            indexStartTime = parseInt(indexStartTime);
            indexEndTime = parseInt(indexEndTime);
            if(indexStartTime > indexEndTime) {
                $(this).find('option:eq(0)').prop('selected', true);
                alert('Start Time Cannot More Then End Time!');
                scrollTo($(this).attr('id'));
                $(this).focus();
                return false;
            }
        }
    });
    
    $('#ddlServiceEndTime').change(function() {
        var ddlServiceStartTime = $('#ddlServiceStartTime');
        var indexStartTime = ddlServiceStartTime.children('option:selected').data('index');
        var indexEndTime = $(this).children('option:selected').data('index');
        if(indexStartTime !== 'NO') {
            indexStartTime = parseInt(indexStartTime);
            indexEndTime = parseInt(indexEndTime);
            if(indexStartTime > indexEndTime) {
                $(this).find('option:eq(0)').prop('selected', true);
                alert('End Time Must Be Equal With Start Time or After Start Time!');
                scrollTo($(this).attr('id'));
                $(this).focus();
                return false;
            }
        }
    });
}

// for call status to display mandatory follow up remark text box
function bindOnChangeCallStatus() {
    $('#ddlCallStatus').change(function() {
       var element = $(this);
       var flwMdtry = $('#txtFlwUp');
       if(element.children('option:selected').val() === 'Follow Up Required') {
           flwMdtry.prop('hidden', false);
       } else {
           flwMdtry.prop('hidden', true);
       }
    });
}

function setEmailCheckBox() {
    $('#cbEmailCustomer').click(function() {
        var chkSelector = $(this);
        //var email = $('#txtEmail');
        
       if(chkSelector[0].hasAttribute('checked'))
       {
           chkSelector.removeAttr('checked');
           //email.hide();
       }
       else 
       {
           chkSelector.attr('checked', true);
           //email.show();
       }
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

function setFormBasedOnLogin() {
    var orgunit = $('#orgunit').val();
    
    if(orgunit === 'Admin') {
        $('select.admin, textarea.admin, input.admin, canvas.admin').prop('disabled', true);
        $('.admin').trigger('chosen:updated');
        $('span.mandatory, img.admin, a.admin').hide();
        $('input[type=button].admin').hide();
    }
}