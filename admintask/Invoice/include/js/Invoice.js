/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global invoiceType, paramId, type*/

var listOfAutoCompleteCustomerNames = [];
var selectorToBeUsed = null;

$(document).ready(function() {
    setDropdownChosen();
    entityDropDownOnChange();
    // push to get auto complete list of customer name
    $('#ddlBusinessEntityId').change();
    getCustomerDataByCustomerName();
    getShippingInfoByShipNameAndCustId();
    bindOpenItemListWindow();
    bindChangeReferenceNoContract();
    btnConfirmOnClickEvent();
    btnSaveOnClickEvent();
    btnPdfOnClick();
    setEntityOnFirstLoad();
    $(window).unload(function() {
       window.opener.location.reload(); 
    });
    setClientReferenceNoForInvReferenceNo();
    bindSetDDLClientReferenceNoOnGoingFase();
    btnCancelOnClickEvent();
    reserMgrItemDetail();
    deleteAllItemDetail();
    formByOrderProcessing();
    setShipToEnabledAutoCompleteIfCustomerIdExist();
    setFormDisplayOnlyWhenCompleterOrCancelInvoice();
    btnPrintDisplayed();
    chkInclusiveGSTEvent();
    formCanBeEditableOrNot();
    setInvoiceOnGoingFromServiceCallForm();
    setShipToChecked();
    setCheckGst();
//    bindHideButtonPrint();
//    $("#btnPrint : button").prop($(param.inv_id !== null && param.inv_id !=="" ? 'hidden' : ''), true);
//    $(param.inv_id !== null && param.inv_id !=="" ? 'display : none' : '');
    
    if(type !== null && type !== ""){
        $("#btnPrint").hide();
        $("#chkInclusiveGST").prop('disabled', true);
    }
    
});

//function bindHideButtonPrint(){
//    $("#btnPrint")
// $(param.inv_id !== null && param.inv_id !=="" ? 'hidden' : '');   
//}

// when invoice not ready to confirm
function formCanBeEditableOrNot() {
    var can_confirm_invoice = $('#txt_invoice_can_confirm').val();
    var service_call_id = $('#txtServiceCallId').val();
    if(can_confirm_invoice !== '2' && service_call_id !== '0') {
        $('input.invoiceRdy, textarea.invoiceRdy, select.invoiceRdy').prop('disabled', true);
        $('.invoiceRdy').trigger('chosen:updated');
        $('span.mandatory, img.invoiceRdy').hide();        
        $('input[type=button].invoiceRdy').hide();
        $('.checkBoxMgrContainer').hover(function() {
            $(this).css('cursor', 'context-menu');
            var chkSpan = $('.checkmarkMgr');
            var chkGSTS = $('input[type=checkbox].invoiceRdy');
            if(chkGSTS[0].hasAttribute('checked')) {
                chkSpan.css('background-color', '#197b30');
            } else {
                chkSpan.css('background-color', '#eee');
            }
        });
        
    }
}


function setEntityOnFirstLoad() {
    var orderId = $('#txtOrderEntryId').val();
    var doId = $('#txtDeliveryOrderId').val();
    var entity = $('#ddlBusinessEntityId');
    if(orderId === '0' || doId === '0')
    {
        entity.val(2);
        entity.trigger('chosen:updated');
        var entityId = entity.val();
       
       var jqXHR = $.ajax({
          url: "../AjaxServlet/GetListOfCustomerNameByEntityId",
          data: {entityId},
          method: "GET"
       });
       
       jqXHR.done(function(data) {
           listOfAutoCompleteCustomerNames = [];
           for(var value of data) {
               listOfAutoCompleteCustomerNames.push(value);
           }
           // call set auto complete
           setAutoCompleteCustomerName();
       });
       
       jqXHR.fail(function(data) {
           alert('Error, Need Maintenance!');
       });
   }
}

// function set if order type need to set autocomplete for reference no (contract reference no)
function setClientReferenceNoForInvReferenceNo() {
    $('#ddlInvoiceTypeId').change(function() {
        var type = $('#ddlInvoiceTypeId option')[this.selectedIndex].text;
          if(type === 'Meter Reading'){
            $("#uomTh").hide();
            $("#bwTh").show();
        } else {
            $("#uomTh").show();
            $("#bwTh").hide();
       }
        
        var customer_id = $('#txtCustomerId');
        var txtReferenceNo = $('#txtClientReferenceNo');
        // for div chosen
        var ddlReferenceNo = $('#ddlReferenceNo_chosen');
        var contractType = $('#txtContractType');
        var invoice_type = $(this).children('option:selected').text().trim().toUpperCase();
        var clientRFMandatory = $('#clientRFMandatory');
        if((customer_id.val() === "" || customer_id.val() === "0") && (invoice_type === 'CONTRACT' || invoice_type === 'METER READING')) {
            alert('Please Input Valid Customer Name First!');
            $(this).next().removeClass('chosen-container-active');
            $('#ddlInvoiceTypeId').val($('#ddlInvoiceTypeId option:first').val());
            ddlReferenceNo.hide();
            txtReferenceNo.show();
            $('#ddlInvoiceTypeId').trigger('chosen:updated');
            scrollTo('txtCustomerName');
            setTimeout(function() {
              $('#txtCustomerName').focus(); 
            }, 0);
                        
        } else {            
            if(invoice_type === 'CONTRACT' || invoice_type === 'METER READING') {                
                txtReferenceNo.hide();
                ddlReferenceNo.show();
                getClientReferenceNoAjax();
                txtReferenceNo.val('');
                contractType.val('1');
                clientRFMandatory.show();
            } else {
                txtReferenceNo.show();
                ddlReferenceNo.hide();
                if(contractType.val() !== '0') {
                    txtReferenceNo.val('');
                }                
                contractType.val('0');
                clientRFMandatory.hide();
            }
        }        
    });
}

// function set autocomplete reference no
function getClientReferenceNoAjax() {
    var customer_id = $('#txtCustomerId').val();
           
    var jqXHR = $.ajax({
        url: "../AjaxServlet/GetClientReferenceNoContractByCustomerId",
        method: "GET",
        data: {customer_id}
    });

    jqXHR.done(function(data) {
        var customerSalesInformationDetail = data;
        var ddlReferenceNo = $('#ddlReferenceNo');
        ddlReferenceNo.children('option').remove();
        ddlReferenceNo.append('<option value="0" selected disabled>-- Please Select Client Reference No --</option>');

        for(var index in customerSalesInformationDetail) {
            ddlReferenceNo.append('<option value="'+customerSalesInformationDetail[index].id+'">'
                    +customerSalesInformationDetail[index].contract_reference_no+'</option>');
        }
        ddlReferenceNo.trigger('chosen:updated');
    });

    jqXHR.fail(function(data) {
        alert('Err, Need Maintanance!');
    });  
}

function chkInclusiveGSTEvent()
{
    $('#chkInclusiveGST').click(function() 
    {
        var sSBTotal = $('#txtSubTotal');
        var total = $('#total');
        var chkSelector = $(this);
        var sGstHidden = $('#txtGST');        
        var sGstDisplay = $('#txtInvoiceGST');
        var sGTotalDisplay = $('#grandTotalDisplay');
        var sSubTotalDisp = $('#subTotalPreview');
        var sGTotalHidden = $('#txtGrandTotal');
        var tblInvoiceItemDt = $('#tblInvoiceItemDetail tbody tr');
        var invType = $('#ddlInvoiceTypeId').children('option:selected').text().trim();
        
        if(tblInvoiceItemDt.length > 0) {
            if(chkSelector[0].hasAttribute('checked'))
            {
                chkSelector.removeAttr('checked');
                if(parseInt(sGstHidden.data('current')) === 0) 
                {
                    if(invType === 'Meter Reading') {
                        var gst = parseFloat(0.07);
                        var gstAmount = parseFloat((parseFloat(total.val()) * gst).toFixed(2));
                        // grand total
                        var grandTotal = parseFloat(total.val()) + gstAmount;
                        sGTotalDisplay.text(getPriceFormattedNumber(grandTotal, 4));
                        sGTotalHidden.val(grandTotal);
                        sSBTotal.val(total.val());
                        sSubTotalDisp.text(getPriceFormattedNumber(total.val(), 4));
                        // gst
                        sGstDisplay.val(getPriceFormattedNumber(gstAmount, 4));
                        sGstHidden.val(gstAmount);
                        sGstHidden.data('current', gst);   
                    } else {
                        var gst = parseFloat(0.07);
                        var gstAmount = parseFloat((parseFloat(total.val()) * gst).toFixed(2));
                        // grand total
                        var grandTotal = parseFloat(total.val()) + gstAmount;
                        sGTotalDisplay.text(getPriceFormattedNumber(grandTotal, 2));
                        sGTotalHidden.val(grandTotal);
                        sSBTotal.val(total.val());
                        sSubTotalDisp.text(getPriceFormattedNumber(total.val(), 2));
                        // gst
                        sGstDisplay.val(getPriceFormattedNumber(gstAmount, 2));
                        sGstHidden.val(gstAmount);
                        sGstHidden.data('current', gst);
                    }
                } 
                else
                {
                    if(invType === 'Meter Reading') {
                    var gstFloat = parseFloat(sGstHidden.data('current'));
                    // gst
                    sGstDisplay.val(getPriceFormattedNumber(gstFloat, 4));
                    if(parseInt(sGstHidden.val()) !== 0) {
                        var value = parseFloat(sGstHidden.val());
                        sGstDisplay.val(getPriceFormattedNumber(value, 4));
                        sGstHidden.data('current', value);
                    } else {
                        sGstHidden.val(gstFloat);
                        sGstHidden.data('current', gstFloat);
                    }                

                    // grand total
                    var grandTotal = parseFloat(total.val()) + gstFloat;
                    sGTotalDisplay.text(getPriceFormattedNumber(grandTotal, 4));
                    sGTotalHidden.val(grandTotal);    
                    sSBTotal.val(total.val());
                    sSubTotalDisp.text(getPriceFormattedNumber(total.val(), 4));
                } else {
                    var gstFloat = parseFloat(sGstHidden.data('current'));
                    // gst
                    sGstDisplay.val(getPriceFormattedNumber(gstFloat, 2));
                    if(parseInt(sGstHidden.val()) !== 0) {
                        var value = parseFloat(sGstHidden.val());
                        sGstDisplay.val(getPriceFormattedNumber(value, 2));
                        sGstHidden.data('current', value);
                    } else {
                        sGstHidden.val(gstFloat);
                        sGstHidden.data('current', gstFloat);
                    }                

                    // grand total
                    var grandTotal = parseFloat(total.val()) + gstFloat;
                    sGTotalDisplay.text(getPriceFormattedNumber(grandTotal, 2));
                    sGTotalHidden.val(grandTotal);    
                    sSBTotal.val(total.val());
                    sSubTotalDisp.text(getPriceFormattedNumber(total.val(), 2));
                }
            }
                sGstDisplay.prop('readonly', false);        
            }
            else
            {
                if(invType === 'Meter Reading') {
                    chkSelector.attr('checked', true);
                    var gst = parseFloat(0.07);
                    var gstAmount = parseFloat((parseFloat(total.val()) * gst).toFixed(4));
                    sGstDisplay.val(getPriceFormattedNumber(gstAmount, 4));
                    sGstHidden.data('current', parseFloat(sGstHidden.val()));
                    sGstHidden.val(gstAmount);
        //            sGstHidden.val(gst);
                    var grand_total = parseFloat(total.val()) - gstAmount;
                    sSubTotalDisp.text(getPriceFormattedNumber(grand_total, 4));
                    sSBTotal.val(grand_total);
                    sGTotalDisplay.text(getPriceFormattedNumber(total.val(), 4));
                    sGTotalHidden.val(total.val());
                    sGstDisplay.prop('readonly', true);
                } else {
                    chkSelector.attr('checked', true);
                    var gst = parseFloat(0.07);
                    var gstAmount = parseFloat((parseFloat(total.val()) * gst).toFixed(2));
                    sGstDisplay.val(getPriceFormattedNumber(gstAmount, 2));
                    sGstHidden.data('current', parseFloat(sGstHidden.val()));
                    sGstHidden.val(gstAmount);
        //            sGstHidden.val(gst);
                    var grand_total = parseFloat(total.val()) - gstAmount;
                    sSubTotalDisp.text(getPriceFormattedNumber(grand_total, 2));
                    sSBTotal.val(grand_total);
                    sGTotalDisplay.text(getPriceFormattedNumber(total.val(), 2));
                    sGTotalHidden.val(total.val());
                    sGstDisplay.prop('readonly', true);
                }
            }
        }        
    });
}

function btnPrintDisplayed() {
    var status = $('#txtInvoiceStatus').val();
    var url = $('#txtURLIN').val();
    if(status === 'Complete')
    {
        $('#btnPrint').show();
        $('#btnPrint').prop('disabled', false);
        $('#btnPrint').css('cursor', 'pointer');
    }
    
    $('#btnPrint').click(function() {
        window.open('../../GetAttachmentFile?attachmentFilePath=' + url, '_blank', getWindowsArgument());
    });
}

function setDropdownChosen() {
    bindChosenDDLMulitpleSelectEvent('ddlBusinessEntityId');
    bindChosenDDLMulitpleSelectEvent('ddlInvoiceTypeId');
    bindChosenDDLMulitpleSelectEvent('ddlPaymentModeId');
    bindChosenDDLMulitpleSelectEvent('ddlDriverOrTechnicianId');
    bindChosenDDLMulitpleSelectEvent('ddlReferenceNo');
    bindChosenDDLMulitpleSelectEvent('ddlPaymentModeId');
    
    var invType = $('#ddlInvoiceTypeId').children('option:selected').text().trim().toUpperCase();
    
    var isContractType = $('#txtContractType');
    var clientRFMandatory = $('#clientRFMandatory');
//    orderStatus === 'Ongoing' ||     
    if(invType !== 'CONTRACT') {
        isContractType.val('0');
        clientRFMandatory.hide();
        $('#ddlReferenceNo_chosen').hide();
    } else if(invType === 'CONTRACT'){
        isContractType.val('1');
        clientRFMandatory.show();
        $('#txtClientReferenceNo').hide();
    } else {
        clientRFMandatory.hide();
        $('#ddlReferenceNo_chosen').hide();
    }
}

function entityDropDownOnChange() {
    $('#ddlBusinessEntityId').change(function() {
       var entityId = $(this).val();
       
       var jqXHR = $.ajax({
          url: "../AjaxServlet/GetListOfCustomerNameByEntityId",
          data: {entityId},
          method: "GET"
       });
       
       jqXHR.done(function(data) {
           listOfAutoCompleteCustomerNames = [];
           for(var value of data) {
               listOfAutoCompleteCustomerNames.push(value);
           }
           // call set auto complete
           setAutoCompleteCustomerName();
       });
       
       jqXHR.fail(function(data) {
           alert('Error, Need Maintanance!');
       });
    });
}

function setAutoCompleteCustomerName() {
    $('#txtCustomerName').autocomplete({
        source: listOfAutoCompleteCustomerNames,
        change: getCustomerDataByCustomerName
    });
}

// 5. get customer data by customer name
function getCustomerDataByCustomerName() {
    $('#txtCustomerName').unbind('change').on('change',function() {
        var sBusinessEntityId = $('#ddlBusinessEntityId');
        if(sBusinessEntityId.children('option:selected').val() !== '0') {
            var customer_name = $(this).val();
            var jqXHR = $.ajax({
                url: "../AjaxServlet/GetCustomerDataByName",
                method: "GET",
                data: {customer_name}
            });

            jqXHR.done(function(data) {
                var customer_id = '';
                var customer_code = '';
                var payment_mode_id = '', payment_mode_name = ''; 

                var bill_attention_to = '';
                var bill_address = '';
                var bill_postal_code = '';

                var ship_to = '';
                var ship_address = '';
                var ship_postal_code = '';
                var listOfShipping = [];

                /* selector section */
                var sCustomerId = $('#txtCustomerId');
                var sCustomerCode = $('#txtCustomerCode');
                var sPaymentModeId = $('#txtPaymentModeId');
                var ddlPaymentModeId = $('#ddlPaymentModeId');
                var sPaymentModeName = $('#txtPaymentModeName');
                var sBillAttentionTo = $('#txtAttentionTo');
                var sBillAddress = $('#txtAddressAttentionTo');
                var sBillPostal = $('#txtPostalCodeAttentionTo');

                var sShipTo = $('#txtShipTo');
                var sShipAddress = $('#txtAddressShipTo');
                var sShipPostal = $('#txtPostalCodeShipTo');
                
                // contract client section

                if(data !== null) {
                    customer_id = data.id;
                    customer_code = data.customerCode;
                    payment_mode_id = data.payment_terms_id;
                    payment_mode_name = data.payment_terms_name;
                    bill_attention_to = data.contactPerson;
                    bill_address = data.full_address;
                    bill_postal_code = data.postal;

                    for(var object of data.listOfCustomerMasterShippingDetails) {
                        listOfShipping.push(object.ship_to_location);
                    }

                    if(listOfShipping.length !== 0) {
                        sShipTo.prop('readonly', false); 
                    } else {
                        alert('This Customer Don\'t have a shipping yet!');
                        sShipTo.prop('readonly', true);
                    }
                }
                                
                sCustomerId.val(customer_id);
                sCustomerCode.val(customer_code);
                ddlPaymentModeId.val(payment_mode_id);
                ddlPaymentModeId.trigger('chosen:updated');
                sPaymentModeName.val(payment_mode_name);

                sBillAttentionTo.val(bill_attention_to);
                sBillAddress.html(bill_address);
                sBillPostal.val(bill_postal_code);

                sShipTo.val(ship_to);
                sShipAddress.html(ship_address);
                sShipPostal.val(ship_postal_code);

                setAutoCompleteShipTo(listOfShipping);
                
                //trigger dropdown on change
                $('#ddlInvoiceTypeId').change();
            });

            jqXHR.fail(function(data) {
                alert('Err, Need Maintanance!');
            });
        } else {
            $(this).val('');
            alert('Please Choose Business Enttiy First!');            
            scrollTo(sBusinessEntityId.next().attr('id'));
            sBusinessEntityId.next().addClass('chosen-container-active');
            setTimeout(function() {
              $('.inputText').blur();  
            }, 0);
            
            sBusinessEntityId.focus();            
        }        
    });
}

function setAutoCompleteShipTo(listShipping) {
    $('#txtShipTo').autocomplete({
        source: listShipping,
        autoFocus: true,
        change: getShippingInfoByShipNameAndCustId
    });
}

// 7. get shipping detail by ship to was choose and customer id
function getShippingInfoByShipNameAndCustId() {
    $('#txtShipTo').change(function() {
        var customer_id = $('#txtCustomerId').val();
        var ship_to = $(this).val();
        
        var jqXHR = $.ajax({
           url: "../AjaxServlet/GetCustomerShipToDetailByShipToAndCustId",
           method: "GET",
           data: {customer_id, ship_to}
        });
        
        jqXHR.done(function(data) {
            var shipToAddress = '';
            var shipToPostalCode = '';
            
            if(data !== null) {
                shipToAddress = data.full_address;
                shipToPostalCode = data.postal;
            }

            $('#txtAddressShipTo').html(shipToAddress);
            $('#txtPostalCodeShipTo').val(shipToPostalCode);
        });
        
        jqXHR.fail(function(data) {
            alert('Err, Need Maintanance!');
        });
    });
}

function setCustomerSalesInformationDetailId(){
    var id = $('#ddlReferenceNo').val();
        var body = $('#txtContractSalesInfoId');
        body.val(id);
        
    }

function bindOpenItemListWindow() {
    $('#btnEditItemDetails').click(function() {
        var sBusinessEntityId = $('#ddlBusinessEntityId');
        var entityId = sBusinessEntityId.children('option:selected').val(); 
        var invType = $('#ddlInvoiceTypeId');
        var invTypeId = invType.children('option:selected').val();
        var refNo = $('#ddlReferenceNo');
        var refNoId = refNo.children('option:selected').val();
        var customerSalesInformationDetailId = $('#txtContractSalesInfoId').val();
        var invoiceType = invType.children('option:selected').text().trim();
        var serviceCall = $('#txtServiceCallId').val();
        var invoice_id = $('#txtInvoiceId').val();
        var from = $('#MRStartDate').val();
        var to = $('#MREndDate').val();
        
        if(entityId === '0') {
            alert('Please Choose Business Entity First!');
            scrollTo(sBusinessEntityId.next().attr('id'));
            sBusinessEntityId.next().addClass('chosen-container-active');
            return false;
        } else if(invTypeId === '0') {
            alert('Please choose invoice type!');
            scroolTo(invTypeId.next().attr('id'));
            invTypeId.next().addClass('chosen-container-active');
            return false;
        } else if(invoiceType === 'Contract' && (refNoId === '' || refNoId === '0')) {
            alert('Please choose contract reference no.!');
            scroolTo(refNo.next().attr('id'));
            refNo.next().addClass('chosen-container-active');
            return false;
        }
        
        if(invoice_id === '0' && invoiceType === 'Contract') {
            fnOpenPopUpWindow('itemList', '../ItemEntityList/ItemEntityList?entity_id='+entityId+'&&customerSalesInformationDetailId='+customerSalesInformationDetailId+'&&type=invoice');
        } else if(invoiceType === 'Contract') {
            fnOpenPopUpWindow('itemList', '../ItemEntityList/ItemEntityList?invoice_id='+invoice_id+'&&entity_id='+entityId+'&&customerSalesInformationDetailId='+customerSalesInformationDetailId+'&&serviceCall='+serviceCall+'&&type=invoice');
        } else if(invoice_id === '0' && invoiceType === 'Meter Reading' && from === null && to === null) {
            fnOpenPopUpWindow('itemList', '../ItemEntityList/ItemEntityList?entity_id='+entityId+'&&customerSalesInformationDetailId='+customerSalesInformationDetailId+'&&inv_type='+invoiceType+'&&type=invoice');
        }  else if(invoice_id === '0' && invoiceType === 'Meter Reading' && from !== null && to !== null) {
            fnOpenPopUpWindow('itemList', '../ItemEntityList/ItemEntityList?entity_id='+entityId+'&&customerSalesInformationDetailId='+customerSalesInformationDetailId+'&&inv_type='+invoiceType+'&&from='+from+'&&to='+to+'&&type=invoice');
        } else if(invoiceType === 'Meter Reading' && from === null && to === null) {
           fnOpenPopUpWindow('itemList', '../ItemEntityList/ItemEntityList?invoice_id='+invoice_id+'&&entity_id='+entityId+'&&customerSalesInformationDetailId='+customerSalesInformationDetailId+'&&serviceCall='+serviceCall+'&&inv_type='+invoiceType+'&&type=invoice');
        } else if(invoiceType === 'Meter Reading' && from !== null && to !== null) {
           fnOpenPopUpWindow('itemList', '../ItemEntityList/ItemEntityList?invoice_id='+invoice_id+'&&entity_id='+entityId+'&&customerSalesInformationDetailId='+customerSalesInformationDetailId+'&&serviceCall='+serviceCall+'&&inv_type='+invoiceType+'&&from='+from+'&&to='+to+'&&type=invoice');
        }
        else if(invoice_id === '0'){
            fnOpenPopUpWindow('itemList', '../ItemEntityList/ItemEntityList?entity_id='+entityId+'&&inv_type='+invoiceType+'&&type=invoice');
        }
        else {
            fnOpenPopUpWindow('itemList', '../ItemEntityList/ItemEntityList?invoice_id='+invoice_id+'&&entity_id='+entityId+'&&inv_type='+invoiceType+'&&service_call='+serviceCall+'&&type=invoice');
        }
        
    });
}

// btn confirm on click event
function btnConfirmOnClickEvent() {
    $('#btnConfirm').click(function() {
        var invId = $('#txtInvoiceId').val();
        var confirm = $('#txt_invoice_can_confirm');
        if(invId === '' || invId === '0'){
            confirm.val(3);
        }
        var can_confirm_invoice = $('#txt_invoice_can_confirm').val();
        if(can_confirm_invoice === '2' || can_confirm_invoice === '3') {
            var validateSuccess = bindValidateInvoice();
            if(!validateSuccess) {
                return false;
            } else {
     //           var in_additional_remarks = $('#txtInvoiceAdditionalRemarks');
     //            if(in_additional_remarks.val() === '') {
     //                alert('Please Enter Invoice Additional Remark Before Confirm!');
     //                scrollTo(in_additional_remarks.attr('id'));
     //                in_additional_remarks.focus();
     //                return false;
     //            }
                 var confirmation = window.confirm("Are You Sure Wanna Confirm This Invoice!");
                 if(!confirmation) {
                     return false;
                 }
                 $('input.fromDO, select.fromDO, textarea.fromDO').attr('disabled', false);
                 // for change gst hidden value base on display setting invoice gst element
                 var invoiceGstDisplay = removeNumberFormat($('#txtInvoiceGST').val());
                 var gstHidden = $('#txtGST');
                 gstHidden.val(parseFloat(invoiceGstDisplay));
     //            alert(gstHidden.val());

                 injectIntentionInputElementIntoForm('Confirm');
                 injectIntentionInputElementIntoFormForConfirmIN('GO');
                 $('#frm').submit();
            }
        } else {
            var confirm_message = 'Invoice Cannot Be Confirm, ';
            if(can_confirm_invoice === '0') {
                alert(confirm_message + 'Delivery Acknowledgment Has Not Been Made.');
            } else if(can_confirm_invoice === '1') {
                alert(confirm_message + 'Service Report Has Not Been Made.');
            }            
            return false;
        }       
    });
}

function injectIntentionInputElementIntoFormForConfirmIN(intention)
{
    //clear existing intention
    $("#txtConfirm").remove();

    //define the intention
    var $intentionInput = $("<input>")
            .attr("id", "txtConfirm")
            .attr("name", "txtConfirm")
            .attr("type", "text")
            .attr("hidden", true)
            .val(intention);

    //attach the intention to the form element, so that server side knows which operation to perform
    $intentionInput.appendTo("#frm");
}

// btn save on click event
function btnSaveOnClickEvent() {
    $('#btnSave').click(function() {
//        var in_additional_remarks = $('#txtInvoiceAdditionalRemarks');
//        if(in_additional_remarks.val() === '') {
//            alert('Please Enter Invoice Additional Remark Before Save!');
//            scrollTo(in_additional_remarks.attr('id'));
//            in_additional_remarks.focus();
//            return false;
//        }
        
        var confirm = window.confirm('Are You Sure Wanna Save This Form?');
        if(!confirm) {
            return false;
        }
         $('input.fromDO, select.fromDO, textarea.fromDO').attr('disabled', false);
        // for change gst hidden value base on display setting invoice gst element
        var invoiceGstDisplay = removeNumberFormat($('#txtInvoiceGST').val());
        var gstHidden = $('#txtGST');
        gstHidden.val(parseFloat(invoiceGstDisplay));
       // alert(gstHidden.val());
        
        injectIntentionInputElementIntoForm('Save');
        $('#frm').submit();
    });
}

function btnPdfOnClick() {
    $('#pdfBtn').click(function() {
        var validateSuccess = bindValidateInvoice();
            if(!validateSuccess) {
                return false;
            } else {
        var confirm = window.confirm('Are you sure want to generate PDF?');
        if(!confirm) {
            return false;
        }
        $('input.fromDO, select.fromDO, textarea.fromDO').attr('disabled', false);
        injectIntentionInputElementIntoForm('GENERATE_PDF');
        injectIntentionInputElementIntoFormForPDFIN('GO');
        $('#frm').submit();
        }
    });
}

function injectIntentionInputElementIntoFormForPDFIN(intention)
{
    //clear existing intention
    $("#txtPdf").remove();

    //define the intention
    var $intentionInput = $("<input>")
            .attr("id", "txtPdf")
            .attr("name", "txtPdf")
            .attr("type", "text")
            .attr("hidden", true)
            .val(intention);

    //attach the intention to the form element, so that server side knows which operation to perform
    $intentionInput.appendTo("#frm");
}

// btn cancel on click event
function btnCancelOnClickEvent() {
    $('#btnCancel').click(function() {
        var can_cancel_invoice = $('#txt_invoice_can_cancel').val();
//        alert(can_cancel_invoice);
        // when on load and delivery order is pending delivery can be cancel
        if(can_cancel_invoice === '3') {
            var invoice_id = $('#txtInvoiceId');
            var invoice_status = $('#txtInvoiceStatus');            
            if(invoice_id.val() !== '0' && invoice_status.val() === 'Ongoing') {
    //            var in_additional_remarks = $('#txtInvoiceAdditionalRemarks');
    //            if(in_additional_remarks.val() === '') {
    //                alert('Please Enter Invoice Additional Remark Before Cancel!');
    //                scrollTo(in_additional_remarks.attr('id'));
    //                in_additional_remarks.focus();
    //                return false;
    //            }

                var confirm = window.confirm('Are You Sure Wanna Cancel This Form ?');
                if(!confirm) {
                    return false;
                }
                injectIntentionInputElementIntoForm('Cancel');
                $('#frm').submit();
            } else if(invoice_id.val() === '0') {
                var confirm = window.confirm('Are You Sure Wanna Cancel This Form ?');
                if(!confirm) {
                    return false;
                }
                window.close();
            }
        } else {
            var cancelMessage = 'Invoice Cannot Be Cancel, ';
//            if(can_cancel_invoice === '0') {
//                alert(cancelMessage + ' Ordered Item Are On Load.');
//            } else 
            if(can_cancel_invoice === '1') {
                alert(cancelMessage + ' Delivery Has Been Acknowledge.');
            } else if(can_cancel_invoice === '2') {
                alert(cancelMessage + ' Service Report Has Been Made.');
            }
            return false;
        }        
    });
}

// reset invoice item detail function
function reserMgrItemDetail() {
    var tbodySelector = $('#tblInvoiceItemDetail tbody tr');
    $('#txtTotalItemDetail').val(tbodySelector.length);
    var number = 1;
    var total = $('#total');
    var sub_total = parseFloat(0);
    $(tbodySelector).each(function() {
        $(this).find('td:eq(0)').text(number+'.');
        $(this).find('td input.invoiceUnitPrice').attr({id: 'txtInvoiceUnitPrice_'+number, name: 'txtInvoiceUnitPrice_'+number});
        $(this).find('td input.txtItemSKU').attr({id: 'txtItemSKU_'+number, name: 'txtItemSKU_'+number});
        $(this).find('td input.txtPartNo').attr({id: 'txtPartNo_'+number, name: 'txtPartNo_'+number});
        $(this).find('td input.txtItemName').attr({id: 'txtItemName_'+number, name: 'txtItemName_'+number});
        $(this).find('td input.txtItemRemark').attr({id: 'txtItemRemark_'+number, name: 'txtItemRemark_'+number});
        $(this).find('td input.txtUomName').attr({id: 'txtUomName_'+number, name: 'txtUomName_'+number});
        $(this).find('td input.txtQuantity').attr({id: 'txtQuantity_'+number, name: 'txtQuantity_'+number});
        $(this).find('td input.txtUnitPrice').attr({id: 'txtUnitPrice_'+number, name: 'txtUnitPrice_'+number});
        $(this).find('td input.txtTotalPrice').attr({id: 'txtTotalPrice_'+number, name: 'txtTotalPrice_'+number});
        $(this).find('td input.txtUomId').attr({id: 'txtUomId_'+number, name: 'txtUomId_'+number});
        $(this).find('td input.startMeter').attr({id: 'startMeter_'+number, name: 'startMeter_'+number});
        $(this).find('td input.endMeter').attr({id: 'endMeter_'+number, name: 'endMeter_'+number});
        sub_total += parseFloat($(this).find('td input.txtTotalPrice').val());
        number++;
    });
    var cbGstInclusive = $('#chkInclusiveGST');
    var invType = $('#ddlInvoiceTypeId').children('option:selected').text().trim();
    var gst = $('#txtGST');
    total.val(sub_total);
    if(sub_total !== parseFloat(0)) {
        if(invType === 'Meter Reading') {
            $('#txtSubTotal').val(sub_total);
            $('#subTotalPreview').text(getPriceFormattedNumber(sub_total, 4));
            var gst = $('#txtGST');
            gst.val(parseFloat((parseFloat(0.07) * parseFloat($('#txtSubTotal').val()))));
            gst.data('current', parseFloat((parseFloat(0.07) * parseFloat($('#txtSubTotal').val()))));
            var gstValue = parseFloat(0);
            if(!cbGstInclusive.is(':checked')) {
                $('#txtSubTotal').val(sub_total);
                $('#subTotalPreview').text(getPriceFormattedNumber(sub_total, 4));
                gst.val(parseFloat((parseFloat(0.07) * parseFloat($('#txtSubTotal').val())).toFixed(4)));
                gst.data('current', parseFloat((parseFloat(0.07) * parseFloat($('#txtSubTotal').val())).toFixed(4)));
                gstValue = parseFloat((parseFloat(0.07) * parseFloat($('#txtSubTotal').val())).toFixed(4));
                $('#txtInvoiceGST').val(getPriceFormattedNumber(gstValue, 4));

                var grand_total = parseFloat(sub_total) + parseFloat(gstValue);
                $('#grandTotalDisplay').text(getPriceFormattedNumber(grand_total, 4));
                $('#txtGrandTotal').val(grand_total);
            } else {
                $('#txtGrandTotal').val(total.val());
                $('#grandTotalDisplay').text(getPriceFormattedNumber(total.val(), 4));
                gst.val(parseFloat((parseFloat(0.07) * parseFloat(total.val())).toFixed(4)));
                gst.data('current', parseFloat((parseFloat(0.07) * parseFloat(total.val())).toFixed(4)));
                gstValue = parseFloat((parseFloat(0.07) * parseFloat(total.val())).toFixed(4));
                $('#txtInvoiceGST').val(getPriceFormattedNumber(gstValue, 4));
                var subTotal = parseFloat(total.val()) - parseFloat(gstValue);
                $('#txtSubTotal').val(subTotal);
                $('#subTotalPreview').text(getPriceFormattedNumber(subTotal, 4));
            }
        } else {
            $('#txtSubTotal').val(sub_total);
            $('#subTotalPreview').text(getPriceFormattedNumber(sub_total, 2));
            var gst = $('#txtGST');
            gst.val(parseFloat((parseFloat(0.07) * parseFloat($('#txtSubTotal').val())).toFixed(2)));
            gst.data('current', parseFloat((parseFloat(0.07) * parseFloat($('#txtSubTotal').val())).toFixed(2)));
            var gstValue = parseFloat(0);
            if(!cbGstInclusive.is(':checked')) {
                $('#txtSubTotal').val(sub_total);
                $('#subTotalPreview').text(getPriceFormattedNumber(sub_total, 2));
                gst.val(parseFloat((parseFloat(0.07) * parseFloat($('#txtSubTotal').val())).toFixed(2)));
                gst.data('current', parseFloat((parseFloat(0.07) * parseFloat($('#txtSubTotal').val())).toFixed(2)));
                gstValue = parseFloat((parseFloat(0.07) * parseFloat($('#txtSubTotal').val())).toFixed(2));
                $('#txtInvoiceGST').val(getPriceFormattedNumber(gstValue, 2));

                var grand_total = parseFloat(sub_total) + parseFloat(gstValue);
                $('#grandTotalDisplay').text(getPriceFormattedNumber(grand_total, 2));
                $('#txtGrandTotal').val(grand_total);
            } else {
                $('#txtGrandTotal').val(total.val());
                $('#grandTotalDisplay').text(getPriceFormattedNumber(total.val(), 2));
                gst.val(parseFloat((parseFloat(0.07) * parseFloat(total.val())).toFixed(2)));
                gst.data('current', parseFloat((parseFloat(0.07) * parseFloat(total.val())).toFixed(2)));
                gstValue = parseFloat((parseFloat(0.07) * parseFloat(total.val())).toFixed(2));
                $('#txtInvoiceGST').val(getPriceFormattedNumber(gstValue, 2));
                var subTotal = parseFloat(total.val()) - parseFloat(gstValue);
                $('#txtSubTotal').val(subTotal);
                $('#subTotalPreview').text(getPriceFormattedNumber(subTotal, 2));
            }
        }
    } else {
        $('#txtSubTotal').val(0);
        $('#subTotalPreview').text('');
        $('#txtGrandTotal').val(0);
        $('#grandTotalDisplay').text('');
        
        // gst
        $('#txtInvoiceGST').val(getPriceFormattedNumber(0, 2));
        $('#txtInvoiceGST').prop('readonly', true);
        $('#txtGST').val(0);
        $('#txtGST').data('current', 0);
        $('#btnDeleteAllItem').hide();
    }
}

// validate invoice header
function bindValidateInvoice() {
    // header
    var business_entity_id_selector = $('#ddlBusinessEntityId');
    if(business_entity_id_selector.children('option:selected').val() === '0') {
        alert('Please Choose Business Entity!');
        scrollTo(business_entity_id_selector.next().attr('id'));
        business_entity_id_selector.next().addClass('chosen-container-active');
        return false;
    }
    
    var customer_id_selector = $('#txtCustomerId');
    if(customer_id_selector.val() === '0') {
        alert('Please Fill Customer Data!');
        return false;
    }
    
    var payment_mode_selector = $('#ddlPaymentModeId');
    if(payment_mode_selector.children('option:selected').val() === '0') {
        alert('Please Select Payment Mode!');
        scrollTo(payment_mode_selector.next().attr('id'));
        payment_mode_selector.next().addClass('chosen-container-active');
        return false;
    }
    
    var invoice_type_id_selector = $('#ddlInvoiceTypeId');
    if(invoice_type_id_selector.children('option:selected').val() === '0') {
        alert('Please Choose Invoice Type!');
        scrollTo(invoice_type_id_selector.next().attr('id'));
        invoice_type_id_selector.next().addClass('chosen-container-active');
        return false;
    }    
    
    var driver_or_tech_id_selector = $('#ddlDriverOrTechnicianId');
    if(driver_or_tech_id_selector.val() === '0') {
        alert('Please Choose Driver/Technician!!');
        scrollTo(driver_or_tech_id_selector.next().attr('id'));
        driver_or_tech_id_selector.next().addClass('chosen-container-active');
        return false;
    }
    
    // bill ship
    var bill_attention_to_selector = $('#txtAttentionTo');
    if(bill_attention_to_selector.val() === '') {
        alert('Please Enter Bill Attention To!');
        scrollTo(bill_attention_to_selector.attr('id'));
        bill_attention_to_selector.focus();
        return false;
    }
    
    var bill_address_selector = $('#txtAddressAttentionTo');
    if(bill_address_selector.val() === '') {
        alert('Please Enter Bill Address!');
        scrollTo(bill_address_selector.attr('id'));
        bill_address_selector.focus();
        return false;
    }
    
    var bill_postal_selector = $('#txtPostalCodeAttentionTo');
    if(bill_postal_selector.val() === '') {
        alert('Please Enter Bill Postal!');
        scrollTo(bill_postal_selector.attr('id'));
        bill_postal_selector.focus();
        return false;
    }
    
    var ship_to_selector = $('#txtShipTo');
    if(ship_to_selector.val() === '') {
        alert('Please Enter Ship To!');
        scrollTo(ship_to_selector.attr('id'));
        ship_to_selector.focus();
        return false;
    }
    
    var ship_address_selector = $('#txtAddressShipTo');
    if(ship_address_selector.val() === '') {
        alert('Please Enter Ship Address!');
        scrollTo(ship_address_selector.attr('id'));
        ship_address_selector.focus();
        return false;
    }
    
    
    var ship_postal_selector = $('#txtPostalCodeShipTo');
    if(ship_postal_selector.val() === '') {
        alert('Please Enter Ship Postal!');
        scrollTo(ship_postal_selector.attr('id'));
        ship_postal_selector.focus();
        return false;
    }
    
    var tbodyLengthItemInvoice = $('#tblInvoiceItemDetail tbody tr');
    if(tbodyLengthItemInvoice.length === 0) {
        alert('Please At Least 1 Item Detail!');
        return false;
    } else {
        for(var i = 1; i <= tbodyLengthItemInvoice.length; i++) 
        {
            var invoicePrice = $('#txtInvoiceUnitPrice_'+i);
            if(invoicePrice.val() === '') {
                alert('Please Enter Item Price At Item Details Line '+i);
                scrollTo(invoicePrice.attr('id'));
                invoicePrice.focus();
                return false;
            }
        }
    }
    
    var sub_total_selector = $('#txtSubTotal');
    if(sub_total_selector.val() === '') {
        alert('Please Check Sub Total Code!');
        return false;
    }
    var gst_selector = $('#txtGST');
    if(gst_selector.val() === '') {
        alert('Please Check Gst Code!');
        return false;
    }
    var grand_total_selector = $('#txtGrandTotal');
    if(grand_total_selector.val() === '') {
        alert('Please Check Grand Total Code!');
        return false;
    }    
    
    return true;
}


// 18. delete selected item
function deleteSelectedItem(selector) {
    var confirmation = window.confirm('Are You Sure Want Delete This Item ?');
    if(!confirmation) {
        return false;
    }
    showLoading();
    var part_no = selector.parent().parent().find('td input.txtPartNo').val();
    var invoice_id = $('#txtInvoiceId').val();
    selectorToBeUsed = selector.parent().parent();
    var type = 'invoice';
    var jqXHR = $.ajax({
       url: "../AjaxServlet/DeleteSessionItem",
       method: "GET",
       data: {
           part_no, 
           id: invoice_id, 
           type
       }
    });
    
    jqXHR.done(function(data) {
        selectorToBeUsed.remove();        
        reserMgrItemDetail();
        setSTGstGTInvoice();
    });
    
    jqXHR.always(function(data) {
        selectorToBeUsed = null; 
        hideLoading();
    });
    
    jqXHR.fail(function(data) {
        alert('Err, Need Maintanance!');
    });
}

function setSTGstGTInvoice() {
    var jqXHR = $.ajax({
       url: "../AjaxServlet/updateSTGSTGTInvoice",
       method: "GET",
       data: {            
           id: $('#txtInvoiceId').val(), 
           sub_total: $('#txtSubTotal').val(),
           gst: $('#txtGST').val(),
           grand_total: $('#txtGrandTotal').val()
       }
    });
    
    jqXHR.done(function(data) {
        

    });
    
    jqXHR.always(function(data) {

    });
    
    jqXHR.fail(function(data) {
        alert('Err update invoice, Need Maintanance!');
    });
}

function deleteAllItemDetail() {
    $('#btnDeleteAllItem').click(function() {
        var invoice_id = $('#txtInvoiceId').val();
        var type = 'invoice';
        var confirmation = window.confirm('Are You Sure Want Delete All The Item ?');
        if(!confirmation) {
            return false;
        }
        
        showLoading();
        var jqXHR = $.ajax({
            url: "../AjaxServlet/DeleteAllItemSessionAjaxServlet",
            method: "GET",
            data: {
                id: invoice_id, 
                type
            }
        });
       
        jqXHR.done(function(data) {
            $('#tblInvoiceItemDetail tbody tr').remove();
            reserMgrItemDetail();
            setSTGstGTInvoice();
        });
       
        jqXHR.always(function(data) {
            hideLoading(); 
        });
        
        jqXHR.fail(function(data) {
            alert('Err, Need Maintanance!');
        });
    });
}

function formByOrderProcessing() 
{
    var order_id_selector = $('#txtOrderEntryId');
    var delivery_order_id_selector = $('#txtDeliveryOrderId');
    if(order_id_selector.val() !== '0' || delivery_order_id_selector.val() !== '0')
    {
        $('input.fromDO, select.fromDO, textarea.fromDO').attr('disabled', true);
        $('select.fromDO').trigger('chosen:updated');
        $('#chkShipToTr').hide();
//        $('img.fromDO').hide();
    }
}

// invoice unit price on change
function invoiceUnitPriceOnChange(selector) 
{
    if(selector.val() === '' || selector.val() === '.') {
        selector.val('0');
    }
    var invType = $('#ddlInvoiceTypeId').children('option:selected').text().trim();
    var selectorUnitPrice = $(selector).parent().parent().find('.txtUnitPrice');
    var selectorSellingPrice = $(selector).parent().find('.sellingPrice');
    var unitPrice = selectorUnitPrice.val();
//    if(selectorSellingPrice.val() === '') {
//    selectorSellingPrice.val(unitPrice);
//    }
    if(invType === 'Meter Reading') {
        var selectorValue = $(selector).val(getPriceFormattedNumber($(selector).val(), 4));
    } else {
        var selectorValue = $(selector).val(getPriceFormattedNumber($(selector).val(), 2));
    }
    selectorValue = removeNumberFormat(selectorValue.val());    
    var number = $(selector).attr('id').split('_')[1]-1;
    if(parseFloat(selectorValue) < parseFloat(selectorSellingPrice.val())) {
        $(selector).css('color', 'red');
        alert('The edited price is below the selling price!');
    }
    selectorUnitPrice.val(selectorValue);
    
    var quantity = $(selector).parent().parent().find('.txtQuantity').val();
    var total_price = selectorUnitPrice.val() * quantity;
    var selectorTotalPrice = $(selector).parent().parent().find('.txtTotalPrice'); 
    var displayTotalPrice = $(selector).parent().next();
    if(invType === 'Meter Reading') {
        displayTotalPrice.text(getPriceFormattedNumber(total_price, 4));
    } else {
        displayTotalPrice.text(getPriceFormattedNumber(total_price, 2));
    }
    selectorTotalPrice.val(total_price);
    
    var row = 0;
    var sub_total_value = parseFloat(0);
    var sub_total = $('#txtSubTotal');
    var total = $('#total');
    var sub_total_preview = $('#subTotalPreview');
    var number = 1;
    $('#tblInvoiceItemDetail tbody tr').each(function() {
        var price = removeNumberFormat($(this).find('input#txtTotalPrice_'+number).val());

        sub_total_value += parseFloat(price);
        row++;
        number++;
    });
    total.val(sub_total_value);
    
    // set grand total
    if(invType === 'Meter Reading') {
        var newGst = (parseFloat(sub_total_value) * parseFloat(0.07)).toFixed(4);
        $('#txtGST').val(newGst);
        $('#txtInvoiceGST').val(getPriceFormattedNumber(newGst, 4));
    } else {
        var newGst = (parseFloat(sub_total_value) * parseFloat(0.07)).toFixed(2);
        $('#txtGST').val(newGst);
        $('#txtInvoiceGST').val(getPriceFormattedNumber(newGst, 2));
    }
//    if(!cbInclusiveGST.is(':checked')) {
        
//    }    
    $('#txtGST').data('current', newGst);    
    var gst = $('#txtGST').val();
    gst = parseFloat(gst);
    
    var cbInclusiveGST = $('#chkInclusiveGST');
    var grandTotal = $('#txtGrandTotal');
    var grandTotalDisplay = $('#grandTotalDisplay');
    if(invType === 'Meter Reading') {
        if(!cbInclusiveGST.is(':checked')) {
            sub_total_preview.text(getPriceFormattedNumber(sub_total_value, 4));
            sub_total.val(sub_total_value);
            var newGrandTotal = parseFloat(sub_total_value) + gst;
            grandTotal.val(newGrandTotal);
            grandTotalDisplay.text(getPriceFormattedNumber(newGrandTotal, 4));
        } else {
            grandTotalDisplay.text(getPriceFormattedNumber(sub_total_value, 4));
            grandTotal.val(sub_total_value);
            var subTotalnew = parseFloat(sub_total_value) - gst;
            sub_total.val(subTotalnew);
            sub_total_preview.text(getPriceFormattedNumber(subTotalnew, 4));
        }
    } else {
        if(!cbInclusiveGST.is(':checked')) {
            sub_total_preview.text(getPriceFormattedNumber(sub_total_value, 2));
            sub_total.val(sub_total_value);
            var newGrandTotal = parseFloat(sub_total_value) + gst;
            grandTotal.val(newGrandTotal);
            grandTotalDisplay.text(getPriceFormattedNumber(newGrandTotal, 2));
        } else {
            grandTotalDisplay.text(getPriceFormattedNumber(sub_total_value, 2));
            grandTotal.val(sub_total_value);
            var subTotalnew = parseFloat(sub_total_value) - gst;
            sub_total.val(subTotalnew);
            sub_total_preview.text(getPriceFormattedNumber(subTotalnew, 2));
        }
    }
  
}

// set percentage format
function bindSetGst(selector) {
    if(selector.val() !== '') {
        selector.val(removeNumberFormat(selector.val()));
        
        if(selector.val() === '.') {           
            alert('Please Put Correct Gst Amount!');
            scrollTo(selector.attr('id'));
            selector.focus();
            selector.val(getPriceFormattedNumber(selector.data('current'), 2));
            return false;
        }
//        alert(selector.val());
        // set data to the current accepted value
        var gstHiddenSelector = $('#txtGST');
        gstHiddenSelector.data('current', parseFloat(selector.val()));
        gstHiddenSelector.val(selector.val());
        selector.val(getPriceFormattedNumber(selector.val(), 2));        
    } else {
        selector.val(getPriceFormattedNumber(0, 2));
        selector.data('current', selector.val());
    }
    
    var percentageFloat = parseFloat(removeNumberFormat(selector.val()));

    var subTotal = $('#txtSubTotal').val();
    var totalAmount = parseFloat((percentageFloat + parseFloat(subTotal)).toFixed(2));
    $('#grandTotalDisplay').text(getPriceFormattedNumber(totalAmount, 2));
    $('#txtGrandTotal').val(totalAmount);
}

// for percentage input selected
function isNumberPercentage(event, currentInputEntry) {
    var key = window.event ? event.keyCode : event.which;
    if(event.keyCode === 8 || event.keyCode === 46) {
        if(event.keyCode === 46 && currentInputEntry.val().indexOf('.') === -1) {
            currentInputEntry.data('dot', 1);
        } else {
            return false;
        }
    } else if(key < 48 || key > 57) {
        return false;
    } else {
        return true;
    }
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

// for when on going fase auto complete ship to enabled
function setShipToEnabledAutoCompleteIfCustomerIdExist() 
{
    var customer_id = $('#txtCustomerId').val();
    var status = $('#txtInvoiceStatus').val();
    if(customer_id !== '0' && (status !== 'Complete' && status !== 'Cancel')) {
        var customer_name = $('#txtCustomerName').val();
        
        var jqXHR = $.ajax({
           url: '../AjaxServlet/GetCustomerDataByName',
           method: 'GET',
           data: {customer_name}
        });
        
        jqXHR.done(function(data) {
            var listOfShipping = [];
            var sShipTo = $('#txtShipTo');
            for(var object of data.listOfCustomerMasterShippingDetails) {
                listOfShipping.push(object.ship_to_location);
            }
            
            if(listOfShipping.length !== 0) {
                sShipTo.prop('readonly', false);
            } else {
                alert('This Customer Don\'t have a shipping yet!');
                sShipTo.prop('readonly', true);
                return false;
            }
            
            setAutoCompleteShipTo(listOfShipping);
        });
    }
}

function bindSetDDLClientReferenceNoOnGoingFase() {
    var customerId = $('#txtCustomerId').val();
    var invType = $('#ddlInvoiceTypeId').children('option:selected').text().trim().toUpperCase();
    if(customerId === '0' && invType === 'CONTRACT') {
        alert('Please Enter Customer Information First For Client Reference No!');
    } else if(customerId !== '0') {
        getClientReferenceNoAjaxWhenOnGoingFaseFirstLoad();
    } 
}

function getClientReferenceNoAjaxWhenOnGoingFaseFirstLoad() {
    var customer_id = $('#txtCustomerId').val();
           
    var jqXHR = $.ajax({
        url: "../AjaxServlet/GetClientReferenceNoContractByCustomerId",
        method: "GET",
        data: {customer_id}
    });
    jqXHR.done(function(data) {
        var contract_sales_information_id = $('#txtContractSalesInfoId').val();
        var customerSalesInformationDetail = data;
        var ddlReferenceNo = $('#ddlReferenceNo');
        ddlReferenceNo.children('option').remove();
        ddlReferenceNo.append('<option value="0" selected disabled>-- Please Select Client Reference No --</option>');
        
        for(var index in customerSalesInformationDetail) {
            var option = '';
            if(parseInt(contract_sales_information_id) === customerSalesInformationDetail[index].id) {
                option = '<option value="'+customerSalesInformationDetail[index].id+'" selected>'+customerSalesInformationDetail[index].contract_reference_no+'</option>';
            } else {
                option = '<option value="'+customerSalesInformationDetail[index].id+'">'+customerSalesInformationDetail[index].contract_reference_no+'</option>';
            }
            ddlReferenceNo.append(option);
        }
        ddlReferenceNo.trigger('chosen:updated');
        });
        
        jqXHR.fail(function(data) {
        alert('Err, Need Maintanance!');
    });  
}

// when selected will set the input text client reference value as the current selected one
function bindChangeReferenceNoContract() {
    $('#ddlReferenceNo').change(function() {
       var value = $(this).children('option:selected').text();
       $('#txtClientReferenceNo').val(value);
    });
}

function setFormDisplayOnlyWhenCompleterOrCancelInvoice() 
{
    var status = $('#txtInvoiceStatus');
    var statusVal = status.val();
    var pdf = $('#pdf').val();
    
    if(statusVal === 'Complete' || statusVal === 'Cancel') {
        $('input, select, textarea').attr({readonly: true, disabled: true});
        $('select').trigger('chosen:updated');    
        $('.bye, .notPrintPDF').css('display', 'none');
    }
    
    if(statusVal === 'Complete') {
        $('#btnPrint').css('display', 'block');
    }
    
//    if(pdf === '1')
//    {
//    $('#btnPrint').css('display', 'block');
//    $('#pdfBtn').css('display', 'none');
//    }
}

// set form of invoice that are from service call fase
function setInvoiceOnGoingFromServiceCallForm() {
    var service_call_id = $('#txtServiceCallId');
    var invoice_status = $('#txtInvoiceStatus');
    
    if(service_call_id.val() !== '0') {
        $('.serviceCallNotDisp').hide();
        $('.serviceCallNoDisp').css('display', 'none');
        var clientReferenceNo = $('#txtClientReferenceNo').val();
        var serviceCallLink = '<a id="removeGarbage" onclick="openPopUpWindowServicePrintPageDO('+parseInt(service_call_id.val())+')">' + clientReferenceNo + '</a>';
        $('#parentServiceCallLink').append(serviceCallLink);
        
        if(invoice_status.val() === 'Ongoing') {
            $('input[type=text].fromServiceCall, select.fromServiceCall, textarea.fromServiceCall').attr({disabled: true, readonly: true});
            $('select.fromServiceCall').trigger('chosen:updated');
        }
        $('#ddlReferenceNo').next().hide();
    }
}

function openPopUpWindowServicePrintPageDO(service_call_id)
{
    fnOpenPopUpWindow('Service Call Print Page', '../ServiceCall/ServiceCallPrintPage?service_call_id=' + service_call_id);
}

function setShipToChecked() {
    var attTo = $('#txtAttentionTo');
    var shipTo = $('#txtShipTo');
    var addrAtt = $('#txtAddressAttentionTo');
    var addrShp = $('#txtAddressShipTo');
    var posAtt = $('#txtPostalCodeAttentionTo');
    var posShp = $('#txtPostalCodeShipTo');
    
    $('#chkShipTo').click(function() {
        if($(this).prop('checked')) {
            shipTo.val(attTo.val());
            addrShp.html(addrAtt.html());
            posShp.val(posAtt.val());
        }
        else {
            shipTo.val('');
            addrShp.html('');
            posShp.val('');
        }
    });
}

function setCheckGst() {
    var orderItem = $('#tblInvoiceItemDetail tbody tr');
    var cbGst = $('#chkInclusiveGST');
    
    if(orderItem.length<1) {
        cbGst.attr({disabled: true});
    } else {
        cbGst.attr({disabled: false});
    }
}