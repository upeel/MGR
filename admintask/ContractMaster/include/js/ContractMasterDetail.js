/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global listOfCustomerMastersJson */

$(document).ready(function() {
    bindOnClickActiveTabs();
    setTab1OnCheckWhenFirstLoad();
    bindSetDropDownStatusChosen();
    bindSetAutoCompleteCustomerName();
    bindCustomerNameOnChange();
    bindBtnSubmitContractDetailOnClick();
    bindBackContractDetailOnClick();
//    alertMessageUnSavedData(); // for now not use first
    dropdownStatusContractSalesRemarks();
    
    $(window).unload(function () {
        window.opener.location.reload();
    });
});

// function for dropdown if terminated sales remarks is required
function dropdownStatusContractSalesRemarks() {
    $('#ddlStatus').change(function() {
        var ddlStatus = $(this).children('option:selected').val();
        var txtAreaSales = $('#salesMandatory');
        if(ddlStatus === 'Terminated') {
            txtAreaSales.prop('hidden', false);
            $('#txtSalesRemarks').val('');
        } else {
            txtAreaSales.prop('hidden', true);
        }
    });    
    
    if($('#ddlStatus').children('option:selected').val() === 'Terminated') {
        $('#salesMandatory').prop('hidden', false);
    }
}

// set dropdown chosen if contract form is existing one
function bindSetDropDownStatusChosen() {    
    if($('#ddlStatus').length) {
        bindChosenDDLMulitpleSelectEvent('ddlStatus');
    }
}

// bind auto complete list of customer name
function bindSetAutoCompleteCustomerName() {
    var listOfCustomerMasters = listOfCustomerMastersJson;
    
    var listOfCustomers = [];
    for(var index in listOfCustomerMasters) {
        listOfCustomers.push({
           id: listOfCustomerMasters[index].id,
           value: listOfCustomerMasters[index].customerName
        });
    }
    
    $('#txtCustomerName').autocomplete({
       source: listOfCustomers,
       autoFocus: true,
       change: bindCustomerNameOnChange
    });
}

// when auto complete is selected
function bindCustomerNameOnChange() {
    $('#txtCustomerName').change(function() {
        var jqXHR = $.ajax({
           url: "../AjaxServlet/GetCustomerDataByName",
           data: {customer_name: $(this).val()}
        });
        
        jqXHR.done(function(data) {
            // auto populate base customer id
            var customerId = '';
            var customerCode = '';
            var customerAddress1 = '';
            var customerAddress2 = '';
            var customerAddress3 = '';
            var customerAddress4 = '';
//            var customerContactPerson = '';
//            var customerTel = '';
            var customerPostalCode = '';
//            var customerEmail = '';
            var listOfCustomerShipping = [];
            
            if(data !== null) {
                customerId = data.id;
                customerCode = data.customerCode;
                customerAddress1 = data.addressLine1;
                customerAddress2 = data.addressLine2;
                customerAddress3 = data.addressLine3;
                customerAddress4 = data.addressLine4;
//                customerContactPerson = data.contactPerson;
//                customerTel = data.tel;
                customerPostalCode = data.postal;
//                customerEmail = data.email;
                listOfCustomerShipping = data.listOfCustomerMasterShippingDetails;
            } 
            
            $('#txtCustomerId').val(customerId);
            $('#txtCustomerCode').val(customerCode);
            $('#txtCustomerAddress1').val(customerAddress1);
            $('#txtCustomerAddress2').val(customerAddress2);
            $('#txtCustomerAddress3').val(customerAddress3);
            $('#txtCustomerAddress4').val(customerAddress4);
//            $('#txtCustomerContactPerson').val(customerContactPerson);
//            $('#txtCustomerTel').val(customerTel);
            $('#txtCustomerPostalCode').val(customerPostalCode);
//            $('#txtCustomerEmail').val(customerEmail); 
            
            // call method for setting mds and lease shipping global variable array
            bindPushDataToGlobalListShippingLease(listOfCustomerShipping);
            bindPushDataToGlobalListShippingMds(listOfCustomerShipping);
        });
        
        jqXHR.fail(function() {
            console.log('error please check');
        });
        
        jqXHR.always(function() {
            
        });
    });
}

/* first open from set sales tab to be checked first */
function setTab1OnCheckWhenFirstLoad() {
    $('input#tab1').prop('checked', true);
    $('img#sales').attr('src', '../../include/mgr/include/images/MGR-LOGO/Sales Info Green.png');
}

/* tabs on click to set image */
function bindOnClickActiveTabs() {
    $('label.tabs').click(function() {
        var dataValue = $(this).find('span').data('value');
        if(dataValue === 'sales') {
            $('img#sales').attr('src', '../../include/mgr/include/images/MGR-LOGO/Sales Info Green.png');
            $('img#lease').attr('src', '../../include/mgr/include/images/MGR-LOGO/Lease Info.png');
            $('img#mds').attr('src', '../../include/mgr/include/images/MGR-LOGO/MDS Info.png');
        } else if(dataValue === 'lease') {
            $('img#sales').attr('src', '../../include/mgr/include/images/MGR-LOGO/Sales Info.png');
            $('img#lease').attr('src', '../../include/mgr/include/images/MGR-LOGO/Lease Info Green.png');
            $('img#mds').attr('src', '../../include/mgr/include/images/MGR-LOGO/MDS Info.png');
        } else if(dataValue === 'mds') {
            $('img#sales').attr('src', '../../include/mgr/include/images/MGR-LOGO/Sales Info.png');
            $('img#lease').attr('src', '../../include/mgr/include/images/MGR-LOGO/Lease Info.png');
            $('img#mds').attr('src', '../../include/mgr/include/images/MGR-LOGO/MDS Info Green.png');
        }        
    });
}

/* contract detail btn submit on click event */
function bindBtnSubmitContractDetailOnClick() {
    $('#btnSubmitContractDetail').click(function() {
        var contractMasterId = $('#txtContractMasterId').val();
        
        var updateContractForm = false;
        
        if(contractMasterId !== '0') {
            updateContractForm = true;
        }
        
        // call function validate contract header and return status value
        var contractStatus = bindValidateContractDetailHeaderForm(updateContractForm);
        
        // set submit false first, set true when validation done!
        var submission = false;
        var mdsFill = false;
        // execute statement when validation header contract valid
        if(contractStatus !== false && updateContractForm === false) {
            // call function validate sales information form and return submission ready or not
            submission = bindValidateContractSalesInformationForm(contractStatus);            
            // if ready to submit then trigger
            if(submission) {
                // call mds validation if user fill the form
                mdsFill = validateMdsMachineIsFillOrNot();
                if(mdsFill) {
                    bindSubmitContractDetailForm();
                }
                
            }
        } // end if
        // start else if(validation header valid && is update)-> for updating contract form
        else if(contractStatus !== false && updateContractForm === true)
        {
            // check status is terminated or not
            var ddlStatus = $('#ddlStatus').children('option:selected').val();
            if(ddlStatus === 'Terminated') {                                
                // if status terminated sales remark is mandatory
                if($('#txtSalesRemarks').val() === '') {
                    alert('Please Enter Sales Remarks While Wanna Terminating The Contract!');
                    $('label[for="tab1"]').click();
                    scrollTo('txtSalesRemarks');
                    $('#txtSalesRemarks').focus();
                    return false;
                }                
                submission = true; // set submission to true for update the contract status
                mdsFill = true; // set manually true for change contract status worked
            } else { // else do check mandatory field cannot be empty
                // call function validate sales information form and return submission ready or not
                submission = bindValidateContractSalesInformationForm(contractStatus);
                
                if(submission) {
                    mdsFill = validateMdsMachineIsFillOrNot();
                }
            }
            
            // when submit is ready
            if(submission === true && mdsFill === true) {
                bindUpdateContractDetailForm();
            }
        }         
    });
}

/* method update form */
function bindUpdateContractDetailForm() {
    showLoading();
    injectIntentionInputElementIntoForm('UPDATE');
    var confirmation = window.confirm("Are You Sure Want To Update This Contract Form?");
    if(!confirmation) {
        // stop display the loading gif
        $("#dvLoading").hide();
        $("#overlay").hide();
        return false;
    }
    $('#frm').submit();
}

/* method submit form */
function bindSubmitContractDetailForm() {
    showLoading();
    injectIntentionInputElementIntoForm('SUBMIT');
    var confirmation = window.confirm("Are You Sure Want To Proceed This Contract Form?");
    if(!confirmation) {
        // stop display the loading gif
        $("#dvLoading").hide();
        $("#overlay").hide();
        return false;
    }
    $('#frm').submit();   
}

/* when back button are click */
function bindBackContractDetailOnClick() {
    $('#btnBackContractDetail').click(function() {
        window.close();
    });    
}

/* validate form contract detail header section and return current status value */
function bindValidateContractDetailHeaderForm() {
    // contract detail header section 
    var customerName = $('#txtCustomerName');
    var customerCode = $('#txtCustomerCode');
    var contractStatus = $('#ddlStatus').val();
    var customerAddress1 = $('#txtCustomerAddress1');
//    var customerContactPerson = $('#txtCustomerContactPerson');
//    var customerTel = $('#txtCustomerTel');
    var customerPostalCode = $('#txtCustomerPostalCode');
//    var customerEmail = $('#txtCustomerEmail');  
    
    // validation section
    if(customerName.val() === '') {
        alert('Please Enter Customer Name!');
        scrollTo(customerName.attr('id'));
        return false;
    }
    
    if(customerCode.val() === '') {
        alert('Please Enter Customer Code!');
        scrollTo(customerCode.attr('id'));
        return false;
    }
    
    if(customerAddress1.val() === '') {
        alert('Please Enter Customer Address!');
        scrollTo(customerAddress1.attr('id'));
        return false;
    }
    
    // Remove validation for Customer Contact Person as per changes on 23/10/2019
    // requested by rong shen after UAT
//    if(customerContactPerson.val() === '') {
//        alert('Please Enter Customer Contact Person!');
//        scrollTo(customerContactPerson.attr('id'));
//        customerContactPerson.focus();
//        return false;
//    }
//    
//    if(customerTel.val() === '') {
//        alert('Please Enter Customer Tel!');
//        scrollTo(customerTel.attr('id'));
//        customerTel.focus();
//        return false;
//    }
    
    if(customerPostalCode.val() === '') {
        alert('Please Enter Customer Postal Code!');
        scrollTo(customerPostalCode.attr('id'));
        return false;
    }
    
//    if(customerEmail.val() === '') {
//        alert('Please Enter Customer Email!');
//        scrollTo(customerEmail.attr('id'));
//        customerEmail.focus();
//        return false;
//    }
//    
    
//    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//    if(!regex.test(customerEmail.val())) {
//         alert('Please Enter Correct Customer Email Address!');
//         scrollTo(customerEmail.attr('id'));
//         customerEmail.focus();
//         return false;
//    }
    
    return contractStatus;
}

// only for numeric input 
function isNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    // 46 is dot
    if (event.keyCode === 8) {
        return true;
    } else if ( key < 48 || key > 57 ) {
        return false;
    } else {
        return true;
    }
}

// validate when shipping is key press make sure customer have been choosen
function bindValidateCustomerAlreadyChoose() {
    var customerId = $('#txtCustomerId');
    if(customerId.val() === '0' || customerId.val() === '') {        
        alert('Please Enter Customer Data First');        
        scrollTo('txtCustomerName');
        $('#txtCustomerName').focus();
        return false;
    }
    
    return true;
}

// validate business unit can't be zero for leasing and mds machine detail
function bindUnitNotZero(thisInput, number, type) {
    var inputValue = thisInput.val();
    var tabName = type === 2 ? 'Lease' : 'Mds';
    var inputValueNumber = parseInt(inputValue);
    if(inputValue !== '') {
        if(inputValueNumber <= 0) {
            alert('Unit Cannot Be 0 At ' + tabName + ' Machine Detail Line ' + number);
            thisInput.val(thisInput.data('current'));
            thisInput.focus();
        } else {
            thisInput.data('current', inputValueNumber);
            thisInput.val(inputValueNumber);
        }
    } else {
        thisInput.data('current', inputValue);
        thisInput.val(inputValue);
    }    
}

// on key press is quantity or not use for lease machine and mds machine detail
function isNumberUnit(event) {
    var key = window.event ? event.keyCode : event.which;
    if(event.keyCode === 8 || event.keyCode === 46) {
        return false;
    } else if(key < 48 || key > 57) {
        return false;
    } else {
        return true;
    }
}