/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var listOfAutoCompleteCustomerNames = [];
var selectorToBeUsed = null;

$(document).ready(function() {
    setDropdownChosen();
    setDatePickerDeliveryDate();
    entityDropDownOnChange();
    // for making customer name got auto complete
    $('#ddlBusinessEntityId').change();
    getCustomerDataByCustomerName();
    getShippingInfoByShipNameAndCustId();
    setClientReferenceNoForOrderReferenceNo();
    bindOpenItemListWindow();
    setEntityOnFirstLoad();
    bindChangeReferenceNoContract();
    btnConfirmOnClickEvent();
    btnSaveOnClickEvent();
    btnCancelOnClickEvent();
    deleteAllItemDetail();
    reserMgrItemDetail();
    formByOrderProcessing();
    setStatusWhenDOAreCompleted();
    bindSetDDLClientReferenceNoOnGoingFase();
    setShipToEnabledAutoCompleteIfCustomerIdExist();
    setFormDisplayOnlyWhenAlreadyCompleteOrCancel();
    btnPrintDisplayed();
    setDeliveryOrderOnGoingFromServiceCallForm();
    setShipToChecked();
    
    $(window).unload(function() {
       window.opener.location.reload(); 
    });
});

function btnPrintDisplayed() {
    var status = $('#txtDeliveryOrderStatus').val();
    var url = $('#txtURLDO').val();
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

// 1. set dropdown to be chosen
function setDropdownChosen() {
    bindChosenDDLMulitpleSelectEvent('ddlBusinessEntityId');
    bindChosenDDLMulitpleSelectEvent('ddlReferenceNo');
    bindChosenDDLMulitpleSelectEvent('ddlOrderType');
    bindChosenDDLMulitpleSelectEvent('ddlDeliveryPeriod');
    bindChosenDDLMulitpleSelectEvent('ddlPaymentMode');
    bindChosenDDLMulitpleSelectEvent('ddlDriver');
    bindChosenDDLMulitpleSelectEvent('ddlPaymentMode');
    
    // for reference no client contract displayed
    var orderType = $('#ddlOrderType').children('option:selected').text().trim().toUpperCase();
    var doStatus = $('#txtDeliveryOrderStatus').val();
    var isContractType = $('#txtContractType');
    var orderEntryId = $('#txtOrderEntryId');
    var clientRFMandatory = $('#clientRFMandatory');
    
    if(orderType === 'CONTRACT' && orderEntryId.val() !== '0') {
        $('#ddlReferenceNo_chosen').hide();
        clientRFMandatory.hide();
    } else if(orderType !== 'CONTRACT' && orderEntryId.val() === '0' && (doStatus === 'Complete' || doStatus === 'Cancel')) {
        isContractType.val('0');
        $('#ddlReferenceNo_chosen').hide();
        clientRFMandatory.hide();
    } else if(orderType === 'CONTRACT') {
        isContractType.val('1');
        $('#txtClientReferenceNo').hide();
        clientRFMandatory.show();
    } else {
        $('#ddlReferenceNo_chosen').hide();
        clientRFMandatory.hide();
    }
}

// 2. set require date
function setDatePickerDeliveryDate() {
    var status = $('#txtDeliveryOrderStatus').val();
    if(status !== 'Cancel' && status !== 'Complete') {
        var orderDate = $('#txtDODate').val().split('/');
        var day = parseInt(orderDate[0]);
        var month = parseInt(orderDate[1]);
        var year = parseInt(orderDate[2]);
        $('#txtDODeliveryDate').datepicker({
           dateFormat: "dd/mm/yy",
           minDate: new Date(year, month-1, day)
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
    }   
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

// 3. set auto complete on customer name base entity id
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

// 4. function set auto complete
function setAutoCompleteCustomerName() {
    $('#txtCustomerName').autocomplete({
        source: listOfAutoCompleteCustomerNames,
        change: getCustomerDataByCustomerName
    });
}

// 5. get customer data by customer name
function getCustomerDataByCustomerName() {
    $('#txtCustomerName').change(function() {
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
                var ddlPaymentMode = $('#ddlPaymentMode');
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
                ddlPaymentMode.val(payment_mode_id);
                ddlPaymentMode.trigger('chosen:updated');
                sPaymentModeName.val(payment_mode_name);

                sBillAttentionTo.val(bill_attention_to);
                sBillAddress.html(bill_address);
                sBillPostal.val(bill_postal_code);

                sShipTo.val(ship_to);
                sShipAddress.html(ship_address);
                sShipPostal.val(ship_postal_code);

                setAutoCompleteShipTo(listOfShipping);
                
                // trigger drop down onchange
                $('#ddlOrderType').change();
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

// 6. function set auto complete ship to
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

// 8. function set if order type need to set autocomplete for reference no (contract reference no)
function setClientReferenceNoForOrderReferenceNo() {
    $('#ddlOrderType').change(function() {
        
//        var a = $('#ddlOrderType option')[this.selectedIndex].text;
//        if(a === 'Contract'){
//            $("#partNo").hide();
//            $("#itemSKU").hide();
//            $("#desc").attr("colspan", "3");
//        } else if (a !== 'Contract'){
//            $("#partNo").show();
//            $("#itemSKU").show();
//            $("#desc").attr("colspan", "1");
//        }
           
        var customer_id = $('#txtCustomerId');
        var txtReferenceNo = $('#txtClientReferenceNo');
        // for div chosen
        var ddlReferenceNo = $('#ddlReferenceNo_chosen');
        var contractType = $('#txtContractType');
        var order_type = $(this).children('option:selected').text().trim().toUpperCase();
        var clientRFMandatory = $('#clientRFMandatory');

        if((customer_id.val() === "" || customer_id.val() === "0") && order_type === 'CONTRACT') {
            alert('Please Input Valid Customer Name First!');
            $(this).next().removeClass('chosen-container-active');
            $('#ddlOrderType').val($('#ddlOrderType option:first').val());
            ddlReferenceNo.hide();
            txtReferenceNo.show();
            $('#ddlOrderType').trigger('chosen:updated');
            scrollTo('txtCustomerName');
            setTimeout(function() {
              $('#txtCustomerName').focus(); 
            }, 0);
                        
        } else {            
            if(order_type === 'CONTRACT') {                
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

//9. function set autocomplete reference no
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

// function onchange ddlReferenceNo
function setCustomerSalesInformationDetailId() {
    var id = $('#ddlReferenceNo').val();
        var body = $('#txtContractSalesInfoId');
        body.val(id);
}

function orderTypeOnChange() {
    var orderType = $('#ddlOrderType').children('option:selected').text().trim();
    var body = $('#txtContractSalesInfoId');
    if(orderType !== 'Contract'){
        body.val('0');
    }
}

//10. function open pop up window for item list
function bindOpenItemListWindow() {
    $('#btnEditItemDetails').click(function() {
        var sBusinessEntityId = $('#ddlBusinessEntityId');
        var entityId = sBusinessEntityId.children('option:selected').val();
        var orderType = $('#ddlOrderType');
        var orderTypeId = orderType.children('option:selected').val();
        var refNo = $('#ddlReferenceNo');
        var refNoId = refNo.children('option:selected').val();
        var customerSalesInformationDetailId = $('#txtContractSalesInfoId').val();
        var orderTypes = orderType.children('option:selected').text().trim(); 
        var do_id = $('#txtDeliveryOrderId').val();
        if(entityId === '0') {
            alert('Please Choose Business Entity First!');
            scrollTo(sBusinessEntityId.next().attr('id'));
            sBusinessEntityId.next().addClass('chosen-container-active');
            return false;
        } else if(orderTypeId === '0') {
            alert('Please choose order type!');
            scroolTo(orderType.next().attr('id'));
            orderType.next().addClass('chosen-container-active');
            return false;
        } else if(orderTypes === 'Contract' && (refNoId === '' || refNoId === '0')) {
            alert('Please choose contract reference no.!');
            scroolTo(refNo.next().attr('id'));
            refNo.next().addClass('chosen-container-active');
            return false;
        }
        
        if(do_id === '0' && orderTypes === 'Contract') {
            fnOpenPopUpWindow('itemList', '../ItemEntityList/ItemEntityList?entity_id='+entityId+'&&customerSalesInformationDetailId='+customerSalesInformationDetailId+'&&type=do');
        } else if(orderTypes === 'Contract')  {
            fnOpenPopUpWindow('itemList', '../ItemEntityList/ItemEntityList?do_id='+do_id+'&&entity_id='+entityId+'&&customerSalesInformationDetailId='+customerSalesInformationDetailId+'&&type=do');
        }
        else if(do_id === '0')
        {
            fnOpenPopUpWindow('itemList', '../ItemEntityList/ItemEntityList?entity_id='+entityId+'&&order_type='+orderTypes+'&&type=do');
        }
        else {
            fnOpenPopUpWindow('itemList', '../ItemEntityList/ItemEntityList?do_id='+do_id+'&&entity_id='+entityId+'&&order_type='+orderTypes+'&&type=do');
        }        
    });
}

// 11. function client reference contract on change event
function bindChangeReferenceNoContract() {
    $('#ddlReferenceNo').change(function() {
       var value = $(this).children('option:selected').text();
       $('#txtClientReferenceNo').val(value);
    });
}

// 12. confirm form
function btnConfirmOnClickEvent() {
    $('#btnConfirm').click(function() {
        
        var validateSuccess = validateDOHeader();
        if(!validateSuccess) {
            return false;
        }
        else if(!checkAvailableQtyAtConfirmAjax()){
            return false;
        }
        else {
//            var do_additional_remarks = $('#txtDOAdditionalRemarks');
//            if(do_additional_remarks.val() === '') {
//                alert('Please Enter Delivery Order Additional Remark Before Confirm!');
//                scrollTo(do_additional_remarks.attr('id'));
//                do_additional_remarks.focus();
//                return false;
//            }
            var confirmation = window.confirm("Are You Sure Wanna Confirm This Delivery Order!");
            if(!confirmation) {
                return false;
            }
            injectIntentionInputElementIntoForm('Confirm');
            injectIntentionInputElementIntoFormForConfirm('GO');
            $('#frm').submit();
        }
    });    
}

function injectIntentionInputElementIntoFormForConfirm(intention)
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

// 13. save form
function btnSaveOnClickEvent() {
    $('#btnSave').click(function() {
//        var do_additional_remarks = $('#txtDOAdditionalRemarks');
//        if(do_additional_remarks.val() === '') {
//            alert('Please Enter Delivery Order Additional Remark!');
//            scrollTo(do_additional_remarks.attr('id'));
//            do_additional_remarks.focus();
//            return false;
//        }
        
        var confirm = window.confirm('Are You Sure Wanna Save This Form?');
        if(!confirm) {
            return false;
        }
        
        injectIntentionInputElementIntoForm('Save');
        $('#frm').submit();
    });
}

// 14. cancel form
function btnCancelOnClickEvent() {
    $('#btnCancel').click(function() {
        var delivery_order_id = $('#txtDeliveryOrderId');
        var delivery_order_status = $('#txtDeliveryOrderStatus');
        
        if(delivery_order_id.val() !== '0' && delivery_order_status.val() === 'Ongoing') {
//            var do_additional_remarks = $('#txtDOAdditionalRemarks');
//            if(do_additional_remarks.val() === '') {
//                alert('Please Enter Delivery Order Additional Remark!');
//                scrollTo(do_additional_remarks.attr('id'));
//                do_additional_remarks.focus();
//                return false;
//            }
            var confirm = window.confirm('Are You Sure Wanna Cancel This Form ?');
            if(!confirm) {
                return false;
            }
            injectIntentionInputElementIntoForm('Cancel');
            $('#frm').submit();
        } else if(delivery_order_id.val() === '0') {
            var confirm = window.confirm('Are You Sure Wanna Cancel This Form ?');
            if(!confirm) {
                return false;
            }
            window.close();
        }
    });
}

// 15. print pdf

// 16. validation delivery order header
function validateDOHeader() {
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
    
    var delivery_date_selector = $('#txtDODeliveryDate');
    if(delivery_date_selector.val() === '') {
        alert('Please Choose Delivery Date!');
        scrollTo(delivery_date_selector.attr('id'));
        delivery_date_selector.focus();
        return false;
    }
        
    var order_type_selector = $('#ddlOrderType');
    if(order_type_selector.children('option:selected').val() === '0') {
        alert('Please Choose Order Type!');
        scrollTo(order_type_selector.next().attr('id'));
        order_type_selector.next().addClass('chosen-container-active');
        return false;
    }
    
    var is_contract_type_selector = $('#txtContractType');
    var droddown_reference_no_selector = $('#ddlReferenceNo');
    var client_reference_no_selector = $('#txtClientReferenceNo');
    if(is_contract_type_selector.val() === '1' && droddown_reference_no_selector.children('option:selected').val() === '0') {
        alert('Please Choose Client Reference No!');
        scrollTo(droddown_reference_no_selector.next().attr('id'));
        droddown_reference_no_selector.next().addClass('chosen-container-active');
        return false;
    } 
    
    // comment this portion because if not contract not mandatory text box
//    else if(client_reference_no_selector.val() === '') {
//        alert('Please Enter Client Reference No!');
//        scrollTo(client_reference_no_selector.attr('id'));
//        client_reference_no_selector.focus();
//        return false;
//    }    
    
    var delivery_period_selector = $('#ddlDeliveryPeriod');
    if(delivery_period_selector.children('option:selected').val() === '0') {
        alert('Please Select Delivery Period!');
        scrollTo(delivery_period_selector.next().attr('id'));
        delivery_period_selector.next().addClass('chosen-container-active');
        return false;
    }
    
    var payment_mode_selector = $('#ddlPaymentMode');
    if(payment_mode_selector.children('option:selected').val() === '0') {
        alert('Please Select Payment Mode!');
        scrollTo(payment_mode_selector.next().attr('id'));
        payment_mode_selector.next().addClass('chosen-container-active');
        return false;
    }
    
    var driver_technician_selector = $('#ddlDriver');
    if(driver_technician_selector.children('option:selected').val() === '0') {
        alert('Please Select Driver/Technician!');
        scrollTo(driver_technician_selector.next().attr('id'));
        driver_technician_selector.next().addClass('chosen-container-active');
        return false;
    }
    
    // bill-ship
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
    
    // call validate item detail section
    var order_entry_id = $('#txtOrderEntryId');
    var doFromOrderNotDelivery = 0;
    var orderType = $('#ddlOrderType').children('option:selected').text().trim();
    var itemDetailRow = parseInt($('#txtTotalItemDetail').val());
    if(order_entry_id.val() !== '0') {        
        // for delivery order from order processing only            
        for(var num = 1; num <= itemDetailRow; num++) 
        {
            var sDOQuantity = $('#txtDeliveryQuantityByOrder_'+num);
            if(sDOQuantity.val() === '') {
                alert('Please Enter Delivery Order Quantity On Item Detail Line ' + num);
                sDOQuantity.focus();
                scrollTo(sDOQuantity.attr('id'));
                return false;
            } else if(sDOQuantity.val() === '0') {
                doFromOrderNotDelivery++;
            }
        }
    } else {
        var notException = validateDOItemDetail();
        if(!notException) {
            return false;
        }
    }
    
    // check if from order do no item to be delivery
    if(order_entry_id.val() !== '0' && doFromOrderNotDelivery === itemDetailRow) {
        alert('Please At Least 1 Item To Be Delivered!');
        return false;
    }
    
    if(orderType !== 'Contract'){
    // footer section
    var sub_total_selector = $('#txtSubTotal');
    if(sub_total_selector.val() === '') {
        alert('Please Check Sub Total Issue!');
        return false;
    }

    var gst_selector = $('#txtGst');
    if(gst_selector.val() === '') {
        alert('Please Check Gst Issue!');
        return false;
    }
    
    var grand_total_selector = $('#txtGrandTotal');
    if(grand_total_selector.val() === '') {
        alert('Please Check Grand Total Issue!');
        return false;
    }
    }
  return true;
}

// 17. validate delivery order item detail
function validateDOItemDetail() {
    var itemDetailRow = parseInt($('#txtTotalItemDetail').val());
    var isOrder = $('#txtOrderEntryId').val();
    for(var i = 1; i <= itemDetailRow; i++) 
    {        
//        var item_sku_selector = $('#txtItemSKU_'+i);
//        if(item_sku_selector.val() === '') {
//            alert('Please Enter Item SKU!');
//            return false;
//        }
        
//        var part_no_selector = $('#txtPartNo_'+i);
//        if(part_no_selector.val() === '') {
//            alert('Please Enter Part No!');
//            return false;
//        }
        
        var item_name_selector = $('#txtItemName_'+i);
        if(item_name_selector.val() === '') {
            alert('Please Enter Item Name!');
            return false;
        }
        
//        var item_remark_selector = $('#txtItemRemark_'+i);
//        if(item_remark_selector.val() === '') {
//            alert('Please Enter Item Remark!');
//            return false;
//        }
        
        var uom_name_selector = $('#txtUomName_'+i);
        if(uom_name_selector.val() === '') {
            alert('Please Enter UOM!');
            return false;
        }
        
        var delivery_quantity_selector = $('#txtDeliveryQuantity_'+i);
        if(delivery_quantity_selector.val() === '' && isOrder === 0) {
            alert('Please Enter Delivered Quantity!');
            return false;
        }
        
        var deliveryQuantityByOrder_selector = $('#txtDeliveryQuantityByOrder_'+i);
        if(deliveryQuantityByOrder_selector.val() === '' && isOrder !== 0) {
            alert('Please Enter Order Delivered Quantity!');
            return false;
        }
        
        var unit_price_selector = $('#txtUnitPrice_'+i);
        if(unit_price_selector.val() === '') {
            alert('Please Check Unit Price!');
            return false;
        }
        
        var total_price_selector = $('#txtTotalPrice_'+i);
        if(total_price_selector.val() === '') {
            alert('Please Check Total Price!');
            return false;
        }
        
        var item_uom_id_selector = $('#txtUomId_'+i);
        if(item_uom_id_selector.val() === '') {
            alert('Please Check Item Uom Id!');
            return false;
        }
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
    var do_id = $('#txtDeliveryOrderId').val();
    selectorToBeUsed = selector.parent().parent();
    var type = 'do';
    var jqXHR = $.ajax({
       url: "../AjaxServlet/DeleteSessionItem",
       method: "GET",
       data: {
           part_no, 
           id: do_id, 
           type
       }
    });
    
    jqXHR.done(function(data) {
        selectorToBeUsed.remove();
        reserMgrItemDetail();
    });
    
    jqXHR.always(function(data) {
        selectorToBeUsed = null; 
        hideLoading();
    });
    
    jqXHR.fail(function(data) {
        alert('Err, Need Maintanance!');
    });
}

// 19. reset mgr detail
function reserMgrItemDetail() {
    var tbodySelector = $('#tblDeliverOrderItemDetail tbody tr');
    $('#txtTotalItemDetail').val(tbodySelector.length);
    var number = 1;
    var sub_total = parseFloat(0);
    $(tbodySelector).each(function() {
        $(this).find('td:eq(0)').text(number+'.');
        $(this).find('td input.doByOrder').attr({id: 'txtDeliveryQuantityByOrder_'+number, name: 'txtDeliveryQuantityByOrder_'+number});
        $(this).find('td input.txtItemSKU').attr({id: 'txtItemSKU_'+number, name: 'txtItemSKU_'+number});
        $(this).find('td input.txtPartNo').attr({id: 'txtPartNo_'+number, name: 'txtPartNo_'+number});
        $(this).find('td input.txtItemName').attr({id: 'txtItemName_'+number, name: 'txtItemName_'+number});
        $(this).find('td input.txtItemRemark').attr({id: 'txtItemRemark_'+number, name: 'txtItemRemark_'+number});
        $(this).find('td input.txtUomName').attr({id: 'txtUomName_'+number, name: 'txtUomName_'+number});
        $(this).find('td input.txtQuantity').attr({id: 'txtQuantity_'+number, name: 'txtQuantity_'+number});
        $(this).find('td input.txtUnitPrice').attr({id: 'txtUnitPrice_'+number, name: 'txtUnitPrice_'+number});
        $(this).find('td input.txtTotalPrice').attr({id: 'txtTotalPrice_'+number, name: 'txtTotalPrice_'+number});
        $(this).find('td input.txtUomId').attr({id: 'txtUomId_'+number, name: 'txtUomId_'+number});
        sub_total += parseFloat($(this).find('td input.txtTotalPrice').val());
        number++;
    });
    
    if(sub_total !== parseFloat(0)) {
//        $('#txtSubTotal').val(sub_total);
        var gst = $('#txtGst').val();
//
//        var grandTotal = parseFloat($('#txtSubTotal').val());
//        if(parseInt(gst) === '7') {
//            grandTotal = 0.07 * grandTotal;
//        }
//        $('#txtGrandTotal').val(grandTotal);
    } else {
//        $('#txtSubTotal').val('');
//        $('#txtGrandTotal').val('');
//        $('#txtGst').val('0');
//        $('#btnDeleteAllItem').hide();
    }    
}

// 20. function delete all item
function deleteAllItemDetail() {
    $('#btnDeleteAllItem').click(function() {
        var do_id = $('#txtDeliveryOrderId').val();
        var type = 'do';
        var confirmation = window.confirm('Are You Sure Want Delete All The Item ?');
        if(!confirmation) {
            return false;
        }
        
        showLoading();
        var jqXHR = $.ajax({
            url: "../AjaxServlet/DeleteAllItemSessionAjaxServlet",
            method: "GET",
            data: {
                id: do_id, 
                type
            }
        });
       
        jqXHR.done(function(data) {
            $('#tblDeliverOrderItemDetail tbody tr').remove();
            reserMgrItemDetail();
        });
       
        jqXHR.always(function(data) {
            hideLoading(); 
        });
        
        jqXHR.fail(function(data) {
            alert('Err, Need Maintanance!');
        });
    });
}

// 21. set form to be specific not editable on delivery order created by order
// from order class
function formByOrderProcessing() 
{
    var order_entry_id_selector = $('#txtOrderEntryId');
    if(order_entry_id_selector.val() !== '0')
    {
        $('input.fromOrder, select.fromOrder, textarea.fromOrder').attr('disabled', true);
        $('select.fromOrder').trigger('chosen:updated');
        $('img.fromOrder').hide();
        $('#chkShipToTr').hide();
    }
}

// 22. for quantity key press
// key press section
function deliveryQuantityKeyPress(event) {
    var key = window.event ? event.keyCode : event.which;
    if(event.keyCode === 8 || event.keyCode === 46) {
        return false;
    } else if(key < 48 || key > 57) {
        return false;
    } else {
        return true;
    }
}

// 23. for total amount delivery
function calculateNewTotalAmountForDelivery(selector)
{
    var sDOQty = selector;
    var sUnitPrice = sDOQty.parent().next().find('input.txtUnitPrice');
    var sTotalPrice = sDOQty.parent().next().find('input.txtTotalPrice');
    
    // set unit total price each item value
    var calculate = parseFloat(selector.val()) * parseFloat(sUnitPrice.val());
    sTotalPrice.val(calculate);
    // set subtotal, gst, grandtotal
    var totalRowItemDetail = parseInt($('#txtTotalItemDetail').val());
    var subTotal = 0;
    for(var num = 1; num <= totalRowItemDetail; num++)
    {
        subTotal += parseFloat($('input#txtTotalPrice_'+num).val());
    }    
    var sSubTotal = $('#txtSubTotal');
    sSubTotal.val(subTotal);
    
    var gst = $('#txtGst');
    var calculated = 0;
    if(parseInt(gst.val()) !== 0) {
        calculated = parseFloat((parseFloat(0.07) * parseFloat(subTotal)).toFixed(2));
    }
    gst.val(calculated);
    
    var sGrandTotal = $('#txtGrandTotal');
    sGrandTotal.val(subTotal + calculated);
}

// 24. function for set form disabled all when status is completed
function setStatusWhenDOAreCompleted() 
{
    var status = $('#txtDeliveryOrderStatus');
//    var order_entry_id = $('#')
    if(status.val().toUpperCase() === 'COMPLETE') {
        $('input.completedDO').attr('disabled', true);
        $('select.completedDO').attr('disabled', true);
//        var value = $('input.doByOrderDisplay').val();
//        $('input.doByOrderDisplay').hide();
//        $('input.doByOrderDisplay').parent().text(value);
        $('select.completedDO').trigger('chosen:updated');
        $('textarea.completedDO').attr('disabled', true);
        $('span.mandatory').hide();
    }
}

function bindSetDDLClientReferenceNoOnGoingFase() {
    var customerId = $('#txtCustomerId').val();
    var ddlOrderType = $('#ddlOrderType').children('option:selected').text().trim().toUpperCase();
    
    if(customerId === '0' && ddlOrderType === 'CONTRACT') {
        alert('Please Enter Customer Information First For Client Reference No!');
    } else if(customerId !== '0') {
        getClientReferenceNoAjaxWhenOnGoingFaseFirstLoad();
    } 
}

function getClientReferenceNoAjaxWhenOnGoingFaseFirstLoad()
{
    var customer_id = $('#txtCustomerId').val();
           
    var jqXHR = $.ajax({
        url: "../AjaxServlet/GetClientReferenceNoContractByCustomerId",
        method: "GET",
        data: {customer_id}
    });
    
    jqXHR.done(function(data) {
        var contract_sales_information_id = $('#txtContractSalesInfoId').val();
//        alert(contract_sales_information_id);
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

// for when on going fase auto complete ship to enabled
function setShipToEnabledAutoCompleteIfCustomerIdExist() 
{
    var customer_id = $('#txtCustomerId').val();
    var status = $('#txtDeliveryOrderStatus').val();
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

// for completed form and cancelled form only
function setFormDisplayOnlyWhenAlreadyCompleteOrCancel()
{
    var status = $('#txtDeliveryOrderStatus');
    var statusVal = status.val();
    
    if(statusVal === 'Complete' || statusVal === 'Cancel')
    {
        $('input, select, textarea').attr({readonly: true, disabled: true});
        $('select').trigger('chosen:updated');    
        $('.bye, .notPrintPDF').css('display', 'none');
    }
    
    if(statusVal === 'Complete') {
        $('#btnPrint').css('display', 'block');
    }
}

// set form of delivery order that are from service call fase
function setDeliveryOrderOnGoingFromServiceCallForm() {
    var service_call_id = $('#txtServiceCallId');
    var delivery_order_status = $('#txtDeliveryOrderStatus');
    
    if(service_call_id.val() !== '0') {
        $('.serviceCallNotDisp').hide();
        $('select.serviceCallNotDisp').trigger('chosen:updated');
        var clientReferenceNo = $('#txtClientReferenceNo').val();
        var serviceCallLink = '<a id="removeGarbage" onclick="openPopUpWindowServicePrintPageDO('+parseInt(service_call_id.val())+')">' + clientReferenceNo + '</a>';
        $('#parentServiceCallLink').append(serviceCallLink);
        
        if(delivery_order_status.val() === 'Ongoing') {
            $('input[type=text].fromServiceCall, select.fromServiceCall, textarea.fromServiceCall').attr({disabled: true, readonly: true});            
            $('select.fromServiceCall').trigger('chosen:updated');
        }
        $('#ddlReferenceNo').next().hide();        
    }
}
//function setUpItemDetailForContractType(){
//    if($('#ordrtype').val() === 'Contract'){
//            $("#partNo").hide();
//            $("#itemSKU").hide();
//            $("#desc").attr("colspan", "3");
//            var totalItem = $('#txtTotalItemDetail').val();
//        for(var i=1; i<=totalItem;i++){    
//            $("#sku_" +i).hide();
//            $("#part_" +i).hide();
//            $("#itmName_" +i).attr("colspan", "3");
//        }
//        }
//}

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
            $('#chkShipTo').val(0);
        }
        else {
            shipTo.val('');
            addrShp.html('');
            posShp.val('');
            $('#chkShipTo').val(1);
        }
    });
}
function checkAvailableQtyAtConfirmAjax(){
    var rowCount = $('#tblDeliverOrderItemDetail tbody tr').length;
    var status = true;
    for(var i = 1; i <= rowCount; i++){
        status = bindCheckAvailableQty(i);   
    }
    return status;
}
function bindCheckAvailableQty(number) {
       var status = true;
       var qty;
       var qtyforOrderEntry = $('#txtDeliveryQuantityByOrder_'+number).val();
       var qtyNotOrderEntry = $('.checkStock_'+number).text();
       if(qtyforOrderEntry === undefined){
           qty = parseInt(qtyNotOrderEntry.trim());
      
       }else{
           qty = parseInt(qtyforOrderEntry);
       }
       var jqXHR = $.ajax({
           url: "../AjaxServlet/CheckAvailableQty",
           async: false,
           data: {itemSKU: $('#sku_'+ number).text()},
           success: function(data) {
                //var stockAtHand = '';
                var stockStatus = '';
                var inventoryStatus = '';
                var availableQty = '';

                if(data !== null) {
                    stockStatus = data.StockAtHandStatus;
                    //stockAtHand = data.StockAtHand;
                    inventoryStatus = data.ItemNotInventory;
                    availableQty = data.AvailableQty;
                }

                //check min stock level
//                 if(stockStatus === 'No'){
//                    alert('Stock at item row '+number+' is empty');
//                    status = false;
//                 }
//                 else if(stockAtHand < qty){
//                    alert('item at row '+number+' is exceed the Stock At Hand qty');
//                    status = false;
//                 }else{
//                    status = true;
//                 }
       
           }
       });
       
       jqXHR.fail(function(data) {
          console.log('failed getting data!'); 
       });
       return status;
}
