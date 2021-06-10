/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var listOfAutoCompleteCustomerNames = [];
var selectorToBeUsed = null;

$(document).ready(function()
{
    bindInitializeDropDownChosen();
    setDatePickerRequireDate();
    entityDropDownOnChange();
    // for making customer name got auto complete
    $('#ddlBusinessEntityId').change();
    setEntityOnFirstLoad();
    getCustomerDataByCustomerName();
    getShippingInfoByShipNameAndCustId();
    setClientReferenceNoForOrderReferenceNo();
    bindOpenItemListWindow();
    bindChangeReferenceNoContract();
    btnSubmitOnClick();
    btnSaveOnClick();
    btnCancelOnClick();
    inclusiveGST();
    deleteAllItemDetail();
    reserMgrItemDetail();
    setFormForDisplayOnly();
    bindSetClientReferenceNoOnGoingFase(); 
    shipToEnabledIfCustomerIdExist();
    setOrderEntryOngoingFromServiceCallForm();
    setCollectionMode();
    setShipToChecked();
    setCheckGst();
    
    $(window).unload(function() {
       window.opener.location.reload(); 
    });
});

// 1. set dropdown to be chosen
// if get order type on first load value, order status, is contract type value
// 1. if order type not contract and order status is complete or cancel is not contract type and dropdown of contract sales will be hide
// 2. if contract will display the dropdown and textbox of input reference will be hidden
// 3. else the dropdown will be hide by default
function bindInitializeDropDownChosen() {
    bindChosenDDLMulitpleSelectEvent('ddlOrderType');
    bindChosenDDLMulitpleSelectEvent('ddlDeliveryPeriod');
    bindChosenDDLMulitpleSelectEvent('ddlDriver'); 
    bindChosenDDLMulitpleSelectEvent('ddlBusinessEntityId');
    bindChosenDDLMulitpleSelectEvent('ddlReferenceNo');
    bindChosenDDLMulitpleSelectEvent('ddlCollectionModeName');
    bindChosenDDLMulitpleSelectEvent('ddlPaymentMode');
    
    // for reference no client contract displayed
    var orderType = $('#ddlOrderType').children('option:selected').text().trim().toUpperCase();
    var orderStatus = $('#txtOrderEntryStatus').val();
    var isContractType = $('#txtContractType');
    var clientRFMandatory = $('#clientRFMandatory');
//    orderStatus === 'Ongoing' ||     
    if(orderType !== 'CONTRACT' && (orderStatus === 'Complete' || orderStatus === 'Cancel')) {
        isContractType.val('0');
        clientRFMandatory.hide();
        $('#ddlReferenceNo_chosen').hide();
    } else if(orderType === 'CONTRACT'){
        isContractType.val('1');
        clientRFMandatory.show();
        $('#txtReferenceNo').hide();
    } else {
        clientRFMandatory.hide();
        $('#ddlReferenceNo_chosen').hide();
    }
}

function colModeChange() {
    var colName = $('#ddlCollectionModeName').val();
    var driveMandatory = $('#driverMandatory');
    
     if(colName === 'Self Collect')
    {
        driveMandatory.hide();
        $('#driverAdmin').show();
        $('#chkShipToTr').hide();
        $('#ddlDriver_chosen').hide();
        $('#txtShipTo').val('MGR');
        $('#txtAddressShipTo').html('5 Upper Aljunied Link, #05-03 Quartz Industrial Building');
        $('#txtPostalCodeShipTo').val('367903');
    }
    else if(colName === 'Delivery')
    {
        driveMandatory.show();
        $('#driverAdmin').hide();
        $('#ddlDriver_chosen').show();
        $('#chkShipToTr').show();
        $('#txtShipTo').val('');
        $('#txtAddressShipTo').html('');
        $('#txtPostalCodeShipTo').val('');
    }
}

function setEntityOnFirstLoad() {
    var orderId = $('#txtOrderEntryId').val();
    var entity = $('#ddlBusinessEntityId');
    if(orderId === '0')
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

// 2. set required date
// require date will not less then order date
function setDatePickerRequireDate() {
    var status = $('#txtOrderEntryStatus').val();
    if(status !== 'Cancel' && status !== 'Complete') {
        var orderDate = $('#txtOrderDate').val().split('/');
        var day = parseInt(orderDate[0]);
        var month = parseInt(orderDate[1]);
        var year = parseInt(orderDate[2]);
        $('#txtRequiredDate').datepicker({
           dateFormat: "dd/mm/yy",
           minDate: new Date(year, month-1, day)
        });
    }    
}

// 3. set auto complete on customer name base entity id
// when entity selected will make a new list of autocomplete to customer name text box
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

// 4. function set auto complete list of customer name
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
                var sPaymentModeName = $('#txtPaymentModeName');
                var ddlPaymentMode = $('#ddlPaymentMode');
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
            var a = $('#ddlOrderType option')[this.selectedIndex].text;
            if(a === 'Item Sales'){
            $('.gg').show();
        } else if(a !== 'Item Sales'){
            $('.gg').hide();
        }
        
        var customer_id = $('#txtCustomerId');
        var txtReferenceNo = $('#txtReferenceNo');
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

function setCustomerSalesInformationDetailId(){
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
        var orderType = $('#ddlOrderType');
        var customerSalesInformationDetailId = $('#txtContractSalesInfoId').val();
        var orderTypeId = orderType.children('option:selected').val();
        var orderTypes = orderType.children('option:selected').text().trim();
        var refNo = $('#ddlReferenceNo');
        var refNoId = refNo.children('option:selected').val();
        var entityId = sBusinessEntityId.children('option:selected').val(); 
        var order_id = $('#txtOrderEntryId').val();
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
        
        if(order_id === '0' && orderTypes === 'Contract') {
            fnOpenPopUpWindow('itemList', '../ItemEntityList/ItemEntityList?entity_id='+entityId+'&&customerSalesInformationDetailId='+customerSalesInformationDetailId+'&&type=order');
        } else if (orderTypes === 'Contract') {
            fnOpenPopUpWindow('itemList', '../ItemEntityList/ItemEntityList?order_id='+order_id+'&&entity_id='+entityId+'&&customerSalesInformationDetailId='+customerSalesInformationDetailId+'&&type=order');
        } else if (order_id === '0'){
            fnOpenPopUpWindow('itemList', '../ItemEntityList/ItemEntityList?entity_id='+entityId+'&&order_type='+orderTypes+'&&type=order');
        } else {
            fnOpenPopUpWindow('itemList', '../ItemEntityList/ItemEntityList?order_id='+order_id+'&&entity_id='+entityId+'&&order_type='+orderTypes+'&&type=order');
        }
        
    });
}

// 11. function client reference contract on change event
// when selected will set the input text client reference value as the curren selected one
function bindChangeReferenceNoContract() {
    $('#ddlReferenceNo').change(function() {
       var value = $(this).children('option:selected').text();
       $('#txtReferenceNo').val(value);
    });
}

// 12. submit form
function btnSubmitOnClick() {
    $('#btnSubmit').on('click', function() {
       var validateSuccess = validateOrderEntryForm();
       if(!validateSuccess) {
           return false;
       } else {
           var confirm = window.confirm("Are You Sure Wanna Submit This Form ?");
           if(!confirm) {
               return false;
           }
            injectIntentionInputElementIntoForm('Submit');
           $('#frm').submit();
       }
    });
}

// 13. save form
function btnSaveOnClick() {
    $('#btnSave').on('click', function() {               
//        var order_additional_remarks = $('#txtOrderEntryAdditionalRemarks');
//        if(order_additional_remarks.val() === '') {
//            alert('Please Enter Order Additional Remarks!');
//            scrollTo(order_additional_remarks.attr('id'));
//            order_additional_remarks.focus();
//            return false;
//        }
        
        var confirm = window.confirm('Are You Sure Wanna Save This Form ?');
        if(!confirm) {
            return false;
        }
        
       injectIntentionInputElementIntoForm('Save');
       $('#frm').submit();
    });
}

// 14. cancel form
function btnCancelOnClick() {
    $('#btnCancel').on('click', function() {
        var orderEntryId = $('#txtOrderEntryId');
        var orderEntryStatus = $('#txtOrderEntryStatus');
        
        if(orderEntryId.val() !== '0' && orderEntryStatus.val() === 'Ongoing') {
//            var order_additional_remarks = $('#txtOrderEntryAdditionalRemarks');
//            if(order_additional_remarks.val() === '') {
//                alert('Please Enter Order Additional Remarks!');
//                scrollTo(order_additional_remarks.attr('id'));
//                order_additional_remarks.focus();
//                return false;
//            }
            var confirm = window.confirm('Are You Sure Wanna Cancel This Form ?');
            if(!confirm) {
                return false;
            }
            injectIntentionInputElementIntoForm('Cancel');
            $('#frm').submit();
        } else if(orderEntryId.val() === '0') {
            var confirm = window.confirm('Are You Sure Wanna Cancel This Form ?');
            if(!confirm) {
                return false;
            }
            window.close();
        }        
    });
}

// 15. validation order entry form
function validateOrderEntryForm() {
    // header form
    var service_call_id = $('#txtServiceCallId');
    var business_entity_id = $('#ddlBusinessEntityId');
    var customer_name = $('#txtCustomerName');
    var required_date = $('#txtRequiredDate');
    var order_type = $('#ddlOrderType');
    var ordrType = order_type.children('option:selected').text().trim();
    var collection_mode = $('#ddlCollectionModeName');
    var is_contract = $('#txtContractType');
    var ddl_reference_no = $('#ddlReferenceNo');
    var txt_reference_no = $('#txtReferenceNo');
    var delivery_period = $('#ddlDeliveryPeriod');
    var payment_mode = $('#ddlPaymentMode');
    var driver = $('#ddlDriver');
    
    if(business_entity_id.children('option:selected').val() === '0') {
        alert('Please Select Business Entity!');
        scrollTo(business_entity_id.next().attr('id'));
        business_entity_id.next().addClass('chosen-container-active');
        return false;
    }
    
    if(customer_name.val() === '') {
        alert('Please Enter Customer Name!');
        scrollTo(customer_name.attr('id'));
        customer_name.focus();
        return false;
    } 
    
    if(required_date.val() === '') {
        alert('Please Fill Required Date!');
        scrollTo(required_date.attr('id'));
        required_date.focus();
        return false;
    }
    
    if(order_type.children('option:selected').val() === '0') {
        alert('Please Select Order Type!');
        scrollTo(order_type.next().attr('id'));
        order_type.next().addClass('chosen-container-active');
        return false;
    }
    
    if(service_call_id.val() === '0' || ordrType === 'Item Sales'){
    if(collection_mode.children('option:selected').val() === '') {
        alert('Please Select Collection Mode!');
        scrollTo(collection_mode.next().attr('id'));
        collection_mode.next().addClass('chosen-container-active');
        return false;
    }
    }
    
    // this for purpose checking
    if(is_contract.val() === '1') {
        if(ddl_reference_no.children('option:selected').val() === '0') {
            alert('Please Choose Contract Reference No!');
            scrollTo(ddl_reference_no.next().attr('id'));
            ddl_reference_no.next().addClass('chosen-container-active');
            return false;
        }
    } else if(is_contract.val() === '0') {
        
    } else {
        alert('need to check this code, err!');
        return false;
    }
    // end checking
    
//    if(txt_reference_no.val() === '' && is_contract.val() === '0') {
//        alert('Please Enter Reference No!');        
//        scrollTo(txt_reference_no.attr('id'));
//        txt_reference_no.focus();
//        return false;
//    } else 
    if(txt_reference_no.val() === '' && is_contract.val() === '1') {
        alert('Please Select Reference No!');
        scrollTo(ddl_reference_no.next().attr('id'));
        ddl_reference_no.next().addClass('chosen-container-active');
        return false;
    }
    
    if(delivery_period.children('option:selected').val() === '0') {
        alert('Please Select Delivery Period!');
        scrollTo(delivery_period.next().attr('id'));
        delivery_period.next().addClass('chosen-container-active');
        return false;
    }
    
    if(payment_mode.children('option:selected').val() === '0') {
        alert('Please Select Payment Mode!');
        scrollTo(payment_mode.next().attr('id'));
        payment_mode.next().addClass('chosen-container-active');
        return false;
    }
    
    if(collection_mode.val() === 'Delivery'){
    if(driver.children('option:selected').val() === '0') {
        alert('Please Select Driver/Technician!');
        scrollTo(driver.next().attr('id'));
        driver.next().addClass('chosen-container-active');
        return false;
    }
    }
        
    // bill to and ship to section
    var billAttentionTo = $('#txtAttentionTo');
    var billAddress = $('#txtAddressAttentionTo');
    var billPostal = $('#txtPostalCodeAttentionTo');
    var shipTo = $('#txtShipTo');
    var shippAddress = $('#txtAddressShipTo');
    var shipPostal = $('#txtPostalCodeShipTo');
    var orderType = $('#ddlOrderType').children('option:selected').text().trim();
    
    if(shipTo.val() === '') {
        alert('Please Enter Ship To!');
        scrollTo(shipTo.attr('id'));
        shipTo.focus();
        return false;
    }
    
    var notException = validateItemDetail();
    if(!notException) {
        return false;
    }
    
    if(orderType !== 'Contract') {
    // validate footer section
    var sub_total = $('#txtOrderSubTotal').val();
    if(sub_total === '') {
        alert('Please maintain code for sub total!');
        return false;
    }
    
    var gst = $('#txtOrderGST').val();
    if(gst === '') {
        alert('Please maintain code for gst!');
        return false;
    }
    
    var grand_total = $('#txtOrderGrandTotal').val();
    if(grand_total === '') {
        alert('Please maintain code for grand total!');
        return false;
    }
    
//    var order_additional_remarks = $('#txtOrderEntryAdditionalRemarks');
//    if(order_additional_remarks.val() === '') {
//        alert('Please Enter Order Additional Remarks!');
//        scrollTo(order_additional_remarks.attr('id'));
//        order_additional_remarks.focus();
//        return false;
//    }
    }
    return true;
}

function validateItemDetail() {
    var totalItem = parseInt($('#txtTotalItemDetail').val());
    var orderType = $('#ddlOrderType').children('option:selected').text().trim();
    if(totalItem === 0) {
        alert('Please Add Item For Order!');
        return false;
    }
    
    if(orderType !== 'Contract') {
    for(var i = 1; i <= totalItem; i++) {
         var item_sku = $('#txtItemSKU_' + i);
         var part_no = $('#txtPartNo_' + i);
         var item_name = $('#txtItemName_' + i);
//         var item_remark = $('#txtItemRemark_' + i);
         var uom_name = $('#txtUomName_' + i);
         var quantity = $('#txtQuantity_' + i);
         var unit_price = $('#txtUnitPrice_' + i);
         var total_price = $('#txtTotalPrice_' + i);
         var uom_id = $('#txtUomId_' + i);
         
//         if(item_sku.val() === '') {
//             alert('Please Check Item SKU Item Is Stored Or Not!');
//             return false;
//         }
         
//         if(part_no.val() === '') {
//             alert('Please Check part no is stored or not!');
//             return false;
//         }
         
         if(item_name.val() === '') {
             alert('please check item name is stored or not!');
             return false;
         }
         
//         if(item_remark.val() === '') {
//             alert('Please check item remark is stored or not!');
//             return false;
//         }
         
         if(uom_name.val() === '') {
             alert('Please check uom name is stored or not!');
             return false;
         }
         
         if(quantity.val() === '') {
             alert('Please check quantity is stored or not!');
             return false;
         }
         
         if(unit_price.val() === '') {
             alert('Please check unit price is stored or not!');
             return false;
         }
         
         if(total_price.val() === '') {
             alert('please check total price is stored or not!');
             return false;
         }
         
         if(uom_id.val() === '') {
             alert('please check item uom id is stored or not!');
             return false;
         }
    }    
    }
    return true;

}

// 16. on check gst
function inclusiveGST() {
    $('#chkInclusiveGST').click(function() {
        var tdGst = $('td#gstTd');
        var txtOrderGst = $('#txtOrderGST');
        var total = $('#total');
        var tdSubTotal = $('#subTotal');
        var orderSubTotal = $('#txtOrderSubTotal');        
        var orderGrandTotal = $('#txtOrderGrandTotal');
        var tdGrandTotal = $('td#grandTotal');
        if(orderSubTotal.val() === '') {
            orderSubTotal.val('0');
            orderGrandTotal.val('');
            tdGrandTotal.text('');
        } 
        var gstValue = parseFloat(0);
        var tbodyLength = $('#tblOrderItemDetail tbody tr').length;
        if($(this)[0].hasAttribute('checked')) {
            $(this).removeAttr('checked');
            gstValue = (0.07 * parseFloat(total.val())).toFixed(2);
            tdGst.text(getPriceFormattedNumber(gstValue, 2));
            txtOrderGst.val(gstValue);
            var grandTotal = parseFloat(total.val());            
            grandTotal += parseFloat(gstValue);            
            orderGrandTotal.val(grandTotal);
                if(parseInt(orderGrandTotal.val()) === 0) {
                tdGrandTotal.text('');
                } else {
                tdGrandTotal.text(getPriceFormattedNumber(grandTotal, 2));
                }
            tdSubTotal.text(getPriceFormattedNumber(total.val(), 2));
            orderSubTotal.val(total.val());
        } else {
            $(this).attr('checked', true);
            gstValue = (0.07 * parseFloat(total.val())).toFixed(2);
            tdGst.text(getPriceFormattedNumber(gstValue, 2));
            txtOrderGst.val(gstValue);
            var grandTotal = parseFloat(total.val()) - gstValue;         
            orderSubTotal.val(grandTotal);
                if(parseInt(orderSubTotal.val()) === 0) {
                tdSubTotal.text('');
                } else {
                tdSubTotal.text(getPriceFormattedNumber(grandTotal, 2));
                }
            tdGrandTotal.text(getPriceFormattedNumber(total.val(), 2));
            orderGrandTotal.val(total.val());
        }
        
        if(tbodyLength === 0) {
            tdGst.text('');
        }
        
//        var grandTotal = parseFloat(orderSubTotal.val());            
//        grandTotal += parseFloat(gstValue);            
//        orderGrandTotal.val(grandTotal);
//        if(parseInt(orderGrandTotal.val()) === 0) {
//            tdGrandTotal.text('');
//        } else {
//            tdGrandTotal.text(getPriceFormattedNumber(grandTotal, 2));
//        }
    });
}

// 17. delete selected item on session
function deleteSelectedItem(selector) {
    var confirmation = window.confirm('Are You Sure Want Delete This Item ?');
    if(!confirmation) {
        return false;
    }
    showLoading();
    var part_no = selector.parent().parent().find('td input.txtPartNo').val();
    var order_id = $('#txtOrderEntryId').val();
    selectorToBeUsed = selector.parent().parent();
    var type = 'order';
    var jqXHR = $.ajax({
       url: "../AjaxServlet/DeleteSessionItem",
       method: "GET",
       data: {
           part_no, 
           id: order_id, 
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

// 18. delete all order items
function deleteAllItemDetail() {
    $('#btnDeleteAllItem').click(function() {
        var order_id = $('#txtOrderEntryId').val();
        var type = 'order';
        var confirmation = window.confirm('Are You Sure Want Delete All The Item ?');
        if(!confirmation) {
            return false;
        }
        
        showLoading();
        var jqXHR = $.ajax({
            url: "../AjaxServlet/DeleteAllItemSessionAjaxServlet",
            method: "GET",
            data: {
                id: order_id, 
                type
            }
        });
       
        jqXHR.done(function(data) {
            $('#tblOrderItemDetail tbody tr').remove();
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

// 19. reset mgr detail
function reserMgrItemDetail() {
    var tbodySelector = $('#tblOrderItemDetail tbody tr');
    $('#txtTotalItemDetail').val(tbodySelector.length);
    var number = 1;
    var total = $('#total');
    var sub_total = parseFloat(0);
    $(tbodySelector).each(function() {
        $(this).find('td:eq(0)').text(number+'.');
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
        var gst = $('#txtOrderGST');
        var tdGst = $('#gstTd');
        total.val(sub_total);
        var gstValue = parseFloat(0);
        if(!$('#chkInclusiveGST').is(':checked')) {
            $('td#subTotal').text(getPriceFormattedNumber(sub_total, 2));
            $('#txtOrderSubTotal').val(sub_total);
            gstValue = parseFloat((parseFloat(0.07) * parseFloat(sub_total)).toFixed(2));
            gst.val(gstValue);
            tdGst.text(getPriceFormattedNumber(gstValue, 2));
            var grandTotal = parseFloat($('#txtOrderSubTotal').val());       
            grandTotal = grandTotal + gstValue;
            $('td#grandTotal').text(getPriceFormattedNumber(grandTotal, 2));
            $('#txtOrderGrandTotal').val(grandTotal);
        } else {
            $('td#grandTotal').text(getPriceFormattedNumber(total.val(), 2));
            $('#txtOrderGrandTotal').val(total.val());
            gstValue = parseFloat((parseFloat(0.07) * parseFloat(total.val())).toFixed(2));
            gst.val(gstValue);
            tdGst.text(getPriceFormattedNumber(gstValue, 2));
            var grandTotal = parseFloat(total.val()) - gstValue;
            $('td#subTotal').text(getPriceFormattedNumber(grandTotal, 2));
            $('#txtOrderSubTotal').val(grandTotal);
        }
    } else {
        $('td#subTotal').text('');
        $('#txtOrderSubTotal').val('');
        $('#gstTd').text('');
        $('#txtOrderGST').val('0');
        $('td#grandTotal').text('');
        $('#txtOrderGrandTotal').val('');
        $('#btnDeleteAllItem').hide();
    }    
}

// 20. reset form to be readonly when status is complete or cancel
function setFormForDisplayOnly() {
    var status = $('#txtOrderEntryStatus');
    var statusVal = status.val();
    
    if(statusVal === 'Complete' || statusVal === 'Cancel') 
    {
        $('input, select, textarea').attr({readonly: true, disabled: true});
        $('select').trigger('chosen:updated');
        $('.bye').css('display', 'none');
        $('input[type=button]').css('cursor', 'context-menu');
        $('span.mandatory').css('display', 'none');
        $('.checkBoxMgrContainer').hover(function() {
            $(this).css('cursor', 'context-menu');
            var chkSpan = $('.checkmarkMgr');
            var chkBx = $('#chkInclusiveGST');
            if(chkBx[0].hasAttribute('checked')) {
                chkSpan.css('background-color', '#197b30');
            } else {
                chkSpan.css('background-color', '#eee');
            }             
        });
        $('.formBtnMgr').css('display', 'none');
    }
}

// 21. function for set if is still ongoing order type is contract will display dropdown client reference no list of contract reference no need customer id too
// if no customer id just displayed dropdown with empty
function bindSetClientReferenceNoOnGoingFase() {
    var customer_id = $('#txtCustomerId').val();
//    var orderEntryId = $('#txtOrderEntryId').val();    
    var status = $('#txtOrderEntryStatus').val();
    var ddlOrderType = $('#ddlOrderType').children('option:selected').text().trim().toUpperCase();
    
    if(customer_id === '0' && ddlOrderType === 'CONTRACT') {
        alert('Please Enter Customer Information First For Client Reference No!');
    } else if(customer_id !== '0'){
        getClientReferenceNoAjaxWithSelectedAutoMatic();        
    }        
}

// 22. for retrieve client reference no and selected base on the selected
function getClientReferenceNoAjaxWithSelectedAutoMatic() {
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

// 23. set ship to enable in on going status is still on going
function shipToEnabledIfCustomerIdExist() {
    var customer_id = $('#txtCustomerId').val();
    var status = $('#txtOrderEntryStatus').val();
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
                alert('This Customer do not have a shipping yet!');
                sShipTo.prop('readonly', true);
                return false;
            }
            
            setAutoCompleteShipTo(listOfShipping);
        });
    }
}

// set order entry to be disabled cause is from service call form
function setOrderEntryOngoingFromServiceCallForm() {
    var service_call_id = $('#txtServiceCallId');
    var order_status = $('#txtOrderEntryStatus');
        
    if(service_call_id.val() !== '0') {
        $('.serviceCallNotDisp').hide();
        var clientReferenceNo = $('#txtReferenceNo').val();     
        var serviceCallLink = '<a id="removeGarbage" onclick="openPopUpWindowServicePrintPage('+parseInt(service_call_id.val())+')">'+clientReferenceNo+'</a>';
        $('#parentServiceCallLink').append(serviceCallLink);        
       
        if(order_status.val() === 'Ongoing') {
            $('input[type=text].fromServiceCall, select.fromServiceCall, textarea.fromServiceCall').attr({disabled: true, readonly: true});            
            $('select.fromServiceCall').trigger('chosen:updated');
        }
        $('#ddlReferenceNo').next().hide();
        $('#ddlCollectionModeName').trigger('chosen:updated');
        $('#chkShipToTr').hide();
    }
}

function openPopUpWindowServicePrintPage(service_call_id) {
    fnOpenPopUpWindow('Service Call Print Page', '../ServiceCall/ServiceCallPrintPage?service_call_id=' + service_call_id);
}

function setCollectionMode() {
    var colMode = $('#ddlCollectionModeName').val();
    if(colMode === 'Self Collect'){
        $('#driverAdmin').show();
        $('#ddlDriver_chosen').hide();
        $('#chkShipToTr').hide();
    }
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
    var orderItem = $('#tblOrderItemDetail tbody tr');
    var cbGst = $('#chkInclusiveGST');
    
    if(orderItem.length<1) {
        cbGst.attr({disabled: true});
    } else {
        cbGst.attr({disabled: false});
    }
}
