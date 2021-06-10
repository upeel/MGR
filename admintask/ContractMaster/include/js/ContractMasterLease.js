/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global listOfShippingByCustomerJson */

// lease tab id
var leaseTab = $('label[for="tab2"]');

// global variable for dropdown shipping array
var listOfCustomerDropShipperLease = [];

/* supported global variable for contract lease date section */
var leasePeriodCurrent, leasePeriodStart, leasePeriodEnd, lastUpdatedLeasePeriod;

// index machine mds detail
var index_lease = 0;

$(document).ready(function() {
    bindMandatoryInputLeaseOnChange();
    bindFirstLoadSalesTypeIsLeaseOrNot();    
    // just user for first retrieve only
    bindSetCustomerShippingToOnFirstLoad();
    bindInitializeDatePickerOnDateInput();
    bindLeasePeriodMonthOnEdit();
    bindSetTotalLeaseMachineDetailCount();
    bindAppendLeaseMachineDetailInformationRow();
    // reset ship to display value because another method set empty, and set each datepicker to be initialize
    setLeaseShipToValueAndInitiateDatePicker();
});

// model no validate
// when model on change that serial not empty event
//function bindLeaseModelOnChangeEvent(model) {
//    // use when lease id is not existing yet
//    var contract_lease_id = $('#txtContractLeaseId').val();
//    if(contract_lease_id === '') {
//        contract_lease_id = 0;
//    }
//    
//    var modelSelector = model;
//    var serialSelector = model.parent().next().find('.txtLeaseSerial');
//    var modelValue = null, serialValue = null;
//    
//    if(modelSelector !== null) {
//        modelValue = modelSelector.val();
//        serialValue = serialSelector.val();
//        if(modelValue !== '' && serialValue !== '') {
//            var jqXHR = $.ajax({
//               method: "GET",
//               url: "../AjaxServlet/CheckModelSerialContractExisting",
//               data: {
//                   contract_lease_id,
//                   contract_section: "LEASE",
//                   model_no: modelValue,
//                   serial_no: serialValue
//               }
//            });
//            
//            jqXHR.done(function(data) {
//                if(data === 'YES') {
//                    alert('This Machine Model And Serial No Already Used!');
////                    serialSelector.val('');
////                    serialSelector.focus();
//                    return false;
//                }
//                
//                var tblLeaseMachineDetailInformationBody = $('#dtLeaseMachineDetails tbody tr');
//                var leaseMachineDetailLength = tblLeaseMachineDetailInformationBody.length;
//                var arrayModelSerial = [];
//                for(var number = 0; number < leaseMachineDetailLength; number++) 
//                {
//                    var sModel = tblLeaseMachineDetailInformationBody.eq(number).find('input.txtLeaseModel');
//                    var sSerial = tblLeaseMachineDetailInformationBody.eq(number).find('input.txtLeaseSerial');
//                    var modelSerialObject = {
//                      model: sModel.val(),
//                      serial: sSerial.val()
//                    };
//                    
//                    for(var i = 0; i < arrayModelSerial.length; i++) 
//                    {
//                        var modelPrv = arrayModelSerial[i].model;
//                        var serialPrv = arrayModelSerial[i].serial;
//                        var modelCur = modelSerialObject.model;
//                        var serialCur = modelSerialObject.serial;
//                        if(modelCur === modelPrv && serialCur === serialPrv) {
//                            alert('This Serial No With This Machine Model No Already Used By Another Mds Machine Detail Line!');
////                            sSerial.val('');
////                            sSerial.focus();
//                            return false;
//                        }
//                    }
//                    
//                    // push to the array for next row to be validate with previous row
//                    arrayModelSerial.push(modelSerialObject);
//                }
//            });
//            
//            jqXHR.fail(function(data) {
//                alert('Err, Need To check on function bindLeaseModelOnChangeEvent');
//            });
//        }
//    }
//}

// ajax call for check model or serial no exist or not
function bindAjaxValidateModelAndSerialUsed(serial)
{
    index_lease = serial.parent().parent().index();
    // use when lease_id is not existing yet
    var contract_lease_id = $('#txtContractLeaseId').val();
    if(contract_lease_id === '') {
        contract_lease_id = 0;
    }
    
    var modelSelector = serial.parent().parent().find('.txtLeaseModel');
    var serialSelector = serial;
    var modelValue = null, serialValue = null;
    
    if(serialSelector !== null) {
        serialValue = serialSelector.val();
        
        if(serialValue !== '') {
//            if(modelSelector !== null) {
//                modelValue = modelSelector.val();
//                if(modelValue === '') {
//                    modelSelector.focus();
//                    alert('Please Fill Machine Model First Before Enter Serial Number!');
//                    return false;
//                }
//            }
            
            var jqXHR = $.ajax({
               method: "GET",
               url: "../AjaxServlet/CheckModelSerialContractExisting",
               data: {
                   contract_lease_id,
                   contract_section: "LEASE",
                   model_no: modelValue,
                   serial_no: serialValue
               }
            });
            
            jqXHR.done(function(data) {
                var serialUsed = serialSelector.prev('.txtLeaseSerialUsed');                
                if(data === 'YES') {
                    alert('This Serial No Already Used!');
                    serialSelector.val('');
//                    // hide purpose because when wanna focus again the date picker div ui displayed
                    $('#ui-datepicker-div').hide();
                    serialSelector.focus();
                    serialUsed.val('YES');
                    return false;
                }
                serialUsed.val('NO');
                
                // do check each row must be unique
                var tblLeaseMachineDetailInformationBody = $('#dtLeaseMachineDetails tbody tr');
                var leaseMachineDetailLength = tblLeaseMachineDetailInformationBody.length;
                var arrayModelSerial = []; 
                for(var number = 0; number < leaseMachineDetailLength; number++) {
                    var sModel = tblLeaseMachineDetailInformationBody.eq(number).find('input.txtLeaseModel');
                    var sSerial = tblLeaseMachineDetailInformationBody.eq(number).find('input.txtLeaseSerial');
                    var modelSerialObject = {
                      model: sModel.val(),
                      serial: sSerial.val()
                    };
                    
                    for(var i = 0; i < arrayModelSerial.length; i++) {
                        var modelPrv = arrayModelSerial[i].model;
                        var serialPrv = arrayModelSerial[i].serial;
                        var modelCur = modelSerialObject.model;
                        var serialCur = modelSerialObject.serial;
                        if(number === index_lease && serialCur === serialPrv) {
                            alert('This Serial No Already Used By Another Lease Detail Line!');
                            sSerial.val('');
//                            // hide purpose because when wanna focus again the date picker div ui displayed
                            $('#ui-datepicker-div').hide();
                            sSerial.focus();
                            return false;
                        }
                    }
                    
                    // push to the array for next row to be validate with previous row            
                    arrayModelSerial.push(modelSerialObject);      
                }
            });
            
            jqXHR.fail(function(data) {
               alert('Err, Need to look on function bindAjaxValidateModelAndSerialUsed'); 
            });
        }
    }
}

/***** first load validate sales type is leasing or not *****/
function bindFirstLoadSalesTypeIsLeaseOrNot() {
    var salesTypeSelected = $('#ddlSalesType').children('option:selected').text().trim().toUpperCase();
    var leasingInput = $('#txtLeaseMandatory');
    if(salesTypeSelected === 'HIRE PURCHASE' || salesTypeSelected === 'LEASE') {
        leasingInput.val(1);
        $('#txtLeaseMandatory').change();
        $('#logoNewLeaseMachineDetail').css('cursor', 'pointer');
    } else {
        leasingInput.val(0);
        $('#txtLeaseMandatory').change();
        $('#logoNewLeaseMachineDetail').css('cursor', 'default');
    }
}
/***** end section *****/

function residual(selector) {
    if(selector.val() === '' || selector.val() === '.') {
        selector.val('0');
    }
    var residual = $(selector).parent().parent().find('.residualCharge');
    var residualVal = $(selector).val(getPriceFormattedNumber($(selector).val(), 2));
    monthlyVal = removeNumberFormat(monthlyVal.val());
    residual.val(residualVal);
}

function monthly(selector) {
    if(selector.val() === '' || selector.val() === '.') {
        selector.val('0');
    }
    var monthly = $(selector).parent().parent().find('.monthlyRental');
    var monthlyVal = $(selector).val(getPriceFormattedNumber($(selector).val(), 2));
    residualVal = removeNumberFormat(residualVal.val());
    monthly.val(monthlyVal);
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

// ****** 1 date section for start, end, period *****//
 
// initialize date picker on start and end date only
// only when lease is mandatory can be used
function bindInitializeDatePickerOnDateInput() {
    //txtLeaseExpiryDate, txtLeaseStartDate
    var leaseStartDate = $('#txtLeaseStartDate');
    var leaseExpiryDate = $('#txtLeaseExpiryDate');
    var leasingStatus = $('#txtLeaseMandatory');

    if(leasingStatus.val() === '1') {
        // lease start date section
        leaseStartDate.datepicker({
           dateFormat: "dd/mm/yy",
           onClose: function() {
               var startDateArray = $(this).val().split('/');
               var day = parseInt(startDateArray[0]);
               var month = parseInt(startDateArray[1]);
               var year = parseInt(startDateArray[2]);
               leaseExpiryDate.datepicker("change", {
                  minDate: new Date(year, month-1, day) 
               });
           }
        }).on('change', function(e) {
            bindShowContractLeasePeriodMonths();
        });
        
        // lease expiry date section
        leaseExpiryDate.datepicker({
            dateFormat: "dd/mm/yy",
            onClose: function() {
                var expiryDateArray = $(this).val().split('/');
                var day = parseInt(expiryDateArray[0]);
                var month = parseInt(expiryDateArray[1]);
                var year = parseInt(expiryDateArray[2]);
                leaseStartDate.datepicker("change", {
                   maxDate: new Date(year, month-1, day) 
                });
            }
            
        }).on('change', function(e) {
            bindShowContractLeasePeriodMonths();
        });
    } else {
        // for destroy date picker
//        leaseStartDate.removeClass('calendarclass');
        leaseStartDate.removeClass('hasDatepicker');
        leaseStartDate.unbind();
        
        leaseExpiryDate.removeClass('hasDatepicker');
        leaseExpiryDate.unbind();
    }
}

// bind show contract lease period months base on start-expiry date
function bindShowContractLeasePeriodMonths() {
     //txtLeaseExpiryDate, txtLeaseStartDate
    var contractLeaseStartDate = $('#txtLeaseStartDate').val();
    var contractLeaseExpiryDate = $('#txtLeaseExpiryDate').val();
    var contractLeasePeriod = $('#txtLeasePeriod');
    
    if(contractLeaseStartDate !== '' && contractLeaseExpiryDate !== '') {
        var startDateSplit = contractLeaseStartDate.split('/');
        var startDay = parseInt(startDateSplit[0]);
        var startMonth = parseInt(startDateSplit[1]) - 1;
        var startYear = parseInt(startDateSplit[2]);
        
        var endDateSplit = contractLeaseExpiryDate.split('/');        
        var expiredDay = parseInt(endDateSplit[0]);
        var expiredMonth = parseInt(endDateSplit[1]) - 1;
        var expiredYear = parseInt(endDateSplit[2]);
        
        var dateStartContrant = new Date(startYear, startMonth, startDay);
        var dateEndContract = new Date(expiredYear, expiredMonth, expiredDay);
        
        var contractPeriod = bindCalculateLeaseMonth(dateStartContrant, dateEndContract);
        
        if(contractPeriod === 0) {
            leasePeriodStart = 1;
            contractPeriod = leasePeriodStart;
            leasePeriodEnd = 2;
            lastUpdatedLeasePeriod = leasePeriodStart;
        } else {
            leasePeriodStart = contractPeriod - 1;
            leasePeriodEnd = contractPeriod + 1;
            lastUpdatedLeasePeriod = contractPeriod;
        }
        contractLeasePeriod.val(contractPeriod);
        leasePeriodCurrent = contractPeriod;
    }
}

// lease period month on change events
function bindLeasePeriodMonthOnEdit() {
    $('#txtLeasePeriod').change(function() {
       // start date and end date contract lease
       var contractLeaseStartDate = $('#txtLeaseStartDate');
       var contractLeaseEndDate = $('#txtLeaseExpiryDate');
       var inputLeaseContractPeriod = parseInt($(this).val());
       
       // check start date and expiry date is choose first
       if(contractLeaseStartDate.val() === '' || contractLeaseEndDate.val() === '') {
           alert('Please Choose Contract Lease Start Date And Expired Date First!');
           $(this).val('');
           
           if(contractLeaseStartDate.val() === '') {
               contractLeaseStartDate.focus();
               return false;
           }
           
           if(contractLeaseEndDate.val() === '') {
               contractLeaseEndDate.focus();
               return false;
           }
       }
        // check cannot be empty, 0, less then period start, more then period end
        if(isNaN(inputLeaseContractPeriod) || inputLeaseContractPeriod === 0 || inputLeaseContractPeriod > leasePeriodEnd || inputLeaseContractPeriod < leasePeriodStart) {
            var periodStart = leasePeriodStart;
            if(leasePeriodStart === 0) {
                periodStart = 1;
            }
            alert('Lease Period Only Can Only Between ' + periodStart + ' - ' + leasePeriodEnd);
            $(this).val(lastUpdatedLeasePeriod);
            return false;
        }

        // set the new value
        lastUpdatedLeasePeriod = $(this).val();
    });
}

/* calculate month duration base on start date and end date*/
function bindCalculateLeaseMonth(startContractDate, endContractDate) {
    var months;
    months = (endContractDate.getFullYear() - startContractDate.getFullYear()) * 12;
    months -= startContractDate.getMonth() + 1;
    months += endContractDate.getMonth();
    // plus one because month is base on index
    months += 1;
    return months <= 0 ? 0 : months;
}



/***** 2. auto complete section for shipping to lease *****/
// set each input shipping to be list of customer shipping
function bindSetCustomerShippingToOnFirstLoad() {
    var listShippingFromServletJsp = listOfShippingByCustomerJson;
    
    bindPushDataToGlobalListShippingLease(listShippingFromServletJsp);
}

// bind json data to global list shipping variable to be used for each machine shipping dropdown
function bindPushDataToGlobalListShippingLease(data) {
    // clear first the array
    listOfCustomerDropShipperLease = [];
    // check data length is not 0
    if(typeof data !== 'undefined') {
        for(var index in data) {
            listOfCustomerDropShipperLease.push({
                id: data[index].id,
                value: data[index].ship_to_location
            });
        }
    } else {
        listOfCustomerDropShipperLease = [];
    }    
    
    // reset input auto complete data
    bindResetAutoCompleteShippingDataLease();
}

// function for if every time customer on change the global data and reset autocomplete to empty input
function bindResetAutoCompleteShippingDataLease() {
    var leaseMaching = $('#dtLeaseMachineDetails tbody tr');
    if(leaseMaching.length > 0) {
        var number = 1;
        leaseMaching.each(function() {
            var shippingInput = $('#txtLeaseShippingTo_'+number);
            shippingInput.val('');
            shippingInput.change();
            bindSetShippingAutoCompleteLease(number);
            number++;
        });
    }
}

// function to set auto complete for shipping to
function bindSetShippingAutoCompleteLease(number) {
    $('#txtLeaseShippingTo_'+number).autocomplete({
       source: listOfCustomerDropShipperLease,
       autofocus: true,
       change: bindOnChangeShippingForAddressLease(number) // when auto complete on change event event
    });
}

// auto complete on change shipping to be set on address too
function bindOnChangeShippingForAddressLease(number) {
    var leaseShip = $('#txtLeaseShippingTo_'+number);
    leaseShip.change(function() {
       var jqXHR = $.ajax({
           url: "../AjaxServlet/GetShipByCustomerIdAndShipTo",
           data: {customer_id: $('#txtCustomerId').val(), ship_to: leaseShip.val()}
       });
       
       jqXHR.done(function(data) {
           var shipping_id = '';
           var ship_to_address = '';
           var ship_postal = '';
           
           if(data !== null) {
               shipping_id = data.id;
               ship_to_address = data.full_address;
               ship_postal = data.postal;
           }

           $('#txtLeaseShippingId_'+number).val(shipping_id);
           $('#txtLeaseAddress_'+number).val(ship_to_address);
           $('#txtLeasePostal_'+number).val(ship_postal);
       });
       
       jqXHR.fail(function(data) {
          console.log('failed getting data!'); 
       });
    });
}

// function for prop lease form mandatory or not
function bindMandatoryInputLeaseOnChange() {
    $('#txtLeaseMandatory').change(function() {
        // make lease form editable
        bindTriggerLeaseEvent($(this));
        // date picker lease run lease start, expiry
        bindInitializeDatePickerOnDateInput();
    });
}

/* Trigger lease form mandatory */
function bindTriggerLeaseEvent(inputValue) {
    var leaseMandatoryInput = $(inputValue);
    var leaseFormMandatory = $('#tableLeaseMgr tr td span.mandatory, #tableLeaseRemarkMgr tr td span.mandatory');
    var leaseFormInput = $('#tableLeaseMgr tr td input, #tableLeaseRemarkMgr tr td textarea');
    // selector for logo can be click or not when append row by checking data-enabled value
    // 1 can 0 can't
    var logoAddLeaseMachine = $('#logoNewLeaseMachineDetail');
    if(leaseMandatoryInput.val() === '1') {
        leaseFormMandatory.prop('hidden', false);
        leaseFormInput.prop('readonly', false);
        // only for date input readonly
        $('#txtLeaseStartDate, #txtLeaseExpiryDate').prop('readonly', true);
        logoAddLeaseMachine.data('enabled', 1);
        // check first if empty row then append one row lease machine detail
        if($('#dtLeaseMachineDetails tbody tr').length === 0) {
            $('#logoNewLeaseMachineDetail').click();
        }        
        $('#logoNewLeaseMachineDetail').css('cursor', 'pointer');
    } else {
        leaseFormMandatory.prop('hidden', true);
        leaseFormInput.prop('readonly', true);
        leaseFormInput.val('');
        logoAddLeaseMachine.data('enabled', 0);
        // remove tbody content of lease details
        $('#dtLeaseMachineDetails tbody tr').remove();
        $('#logoNewLeaseMachineDetail').css('cursor', 'default');
    }
}




/***** append row section *****/
// function to append row new lease machine detail information
function bindAppendLeaseMachineDetailInformationRow() {
    $('#logoNewLeaseMachineDetail').click(function() {
        var leaseMachineDetailsBody = $('#dtLeaseMachineDetails tbody');
        var currentLength = leaseMachineDetailsBody.children('tr').length;
        var newNumber = currentLength + 1;
        var newNumberFormat = newNumber + '.';
        var thisLogo = $(this);
        var type = 2;
        // string append if logo data enable value is 1
        if(thisLogo.data('enabled') === 1) {
            var leaseMachineRow = '<tr>';
            leaseMachineRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 txtStyleSanRegularMgr">' + newNumberFormat + '</td>';
//            leaseMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtLeaseBusinessUnit_' + newNumber + '" name="txtLeaseBusinessUnit_' + newNumber + '" class="mgrFormDesign txtLeaseBusinessUnit" data-current="" maxlength="20"></td>';
            leaseMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtLeaseShippingId_' + newNumber + '" name="txtLeaseShippingId_' + newNumber + '" class="shippingId" readonly hidden><input type="text" id="txtLeaseShippingTo_' + newNumber + '" name="txtLeaseShippingTo_' + newNumber + '" class="mgrFormDesign txtLeaseShippingTo" onkeypress="return bindValidateCustomerAlreadyChoose();"></td>';
            leaseMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtLeaseModel_' + newNumber + '" name="txtLeaseModel_' + newNumber + '" class="mgrFormDesign txtLeaseModel" maxlength="15"></td>';
            leaseMachineRow += '<td class="mgrTdPadTopBot20"  style="padding-left: 5px;"><input type="text" id="txtLeaseSerial_' + newNumber + '" name="txtLeaseSerial_' + newNumber + '" class="mgrFormDesign txtLeaseSerial" maxlength="10" onchange="bindAjaxValidateModelAndSerialUsed($(this))"></td>';
            leaseMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtLeaseInstallDate_' + newNumber + '" name="txtLeaseInstallDate_' + newNumber + '" class="mgrFormDesign txtLeaseInstallDate" readonly></td>';
//            leaseMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtLeaseLocationAndDepartment_' + newNumber + '" name="txtLeaseLocationAndDepartment_' + newNumber + '" class="mgrFormDesign txtLeaseLocationAndDepartment" maxlength="50"></td>';
            leaseMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtLeaseAddress_' + newNumber + '" name="txtLeaseAddress_' + newNumber + '" class="mgrFormDesign txtLeaseAddress" readonly></td>';
            leaseMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtLeasePostal_' + newNumber + '" name="txtLeasePostal_' + newNumber + '" class="mgrFormDesign txtLeasePostal" maxlength="20" onkeypress="return isNumberUnit(event)" readonly></td>';
            leaseMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtLeasePIC_' + newNumber + '" name="txtLeasePIC_' + newNumber + '" class="mgrFormDesign txtLeasePIC" maxlength="50"></td>';
            leaseMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtLeaseContactNo_' + newNumber + '" name="txtLeaseContactNo_' + newNumber + '" class="mgrFormDesign txtLeaseContactNo" maxlength="50"></td>';
            leaseMachineRow += '<td class="mgrTdPadTopBot20 mgrPaddingRight20 txtAlignCenter"><img src="../../include/mgr/include/images/MGR-LOGO/Remove mgr.png" class="mgrFloatRight logoTbodyTableMgr" alt="logo Remove Row" onclick="bindDeleteSelectedLeaseMachineDetail($(this));"></td>';
            leaseMachineRow += '</tr>';
            
            leaseMachineDetailsBody.append(leaseMachineRow);
            
            // set auto complete
            bindSetShippingAutoCompleteLease(newNumber);
            // initialize date picker on install date
            initializeDatePicker('txtLeaseInstallDate_'+newNumber);
            
            // set max length validation function to be ready
            bindInputTextCharacterCountdownEvent();
            
            // set lease machine detail row count
            bindSetTotalLeaseMachineDetailCount();
            
            // for when click display the date picker UI
            // because when validating serial if exist force to hide the datepicker UI
            $('.hasDatepicker').click(function() {
               $('#ui-datepicker-div').show(); 
            });
        }
    });
}

// bind delete selected lease machine detail
function bindDeleteSelectedLeaseMachineDetail(imageSelected) {
    if($('#dtLeaseMachineDetails tbody tr').length === 1) {
        alert('At Least Add 1 Lease Machine Details!');
        return false;
    }
    
    $(imageSelected).closest('tr').remove();
    
    // reset row number
    bindResetLeaseMachineDetailsRowNumber();
    
    // set total row count after delete
    bindSetTotalLeaseMachineDetailCount();
}

// reset lease machine detail row number
function bindResetLeaseMachineDetailsRowNumber() {
    var leaseMachineBodyRow = $('#dtLeaseMachineDetails tbody tr');
    var rowNumber = 1;
    $(leaseMachineBodyRow).each(function() {
        $(this).find('td:eq(0)').text((rowNumber)+'.');
        $(this).find('td:eq(1) input.txtLeaseBusinessUnit').attr({id: 'txtLeaseBusinessUnit_'+rowNumber, name: 'txtLeaseBusinessUnit_'+rowNumber});
        $(this).find('td:eq(2) input.shippingId').attr({id: 'txtLeaseShippingId_'+rowNumber, name: 'txtLeaseShippingId_'+rowNumber});
        $(this).find('td:eq(2) input.txtLeaseShippingTo').attr({id: 'txtLeaseShippingTo_'+rowNumber, name: 'txtLeaseShippingTo_'+rowNumber});
        $(this).find('td:eq(3) input.txtLeaseModel').attr({id: 'txtLeaseModel_'+rowNumber, name: 'txtLeaseModel_'+rowNumber});
        $(this).find('td:eq(4) input.txtLeaseSerial').attr({id: 'txtLeaseSerial_'+rowNumber, name: 'txtLeaseSerial_'+rowNumber});
        $(this).find('td:eq(5) input.txtLeaseInstallDate').attr({id: 'txtLeaseInstallDate_'+rowNumber, name: 'txtLeaseInstallDate_'+rowNumber});
        $(this).find('td:eq(6) input.txtLeaseLocationAndDepartment').attr({id: 'txtLeaseLocationAndDepartment_'+rowNumber, name: 'txtLeaseLocationAndDepartment_'+rowNumber});
        $(this).find('td:eq(7) input.txtLeaseAddress').attr({id: 'txtLeaseAddress_'+rowNumber, name: 'txtLeaseAddress_'+rowNumber});
        $(this).find('td:eq(8) input.txtLeasePostal').attr({id: 'txtLeasePostal_'+rowNumber, name: 'txtLeasePostal_'+rowNumber});
        $(this).find('td:eq(9) input.txtLeasePIC').attr({id: 'txtLeasePIC_'+rowNumber, name: 'txtLeasePIC_'+rowNumber});
        $(this).find('td:eq(10) input.txtLeaseContactNo').attr({id: 'txtLeaseContactNo_'+rowNumber, name: 'txtLeaseContactNo_'+rowNumber});
        
        // reinitialize again the date picker
        var datePickerInput = $(this).find('td:eq(5) input.txtLeaseInstallDate');
        datePickerInput.removeClass('hasDatepicker');
        datePickerInput.unbind();
        initializeDatePicker(datePickerInput.attr('id'));
        
        // reinitialize again auto complete
        bindSetShippingAutoCompleteLease(rowNumber);
        rowNumber++;
    });
}

// set total row sales payment detail count row
function bindSetTotalLeaseMachineDetailCount() {
    var rowCount = $('#dtLeaseMachineDetails tbody tr').length;
    $('#txtLeaseMachineDetailCount').val(rowCount);
}
/***** end section *****/



/***** valitation section *****/
// active the page of lease information, to start validate lease info, machine detail
function bindGoToLeaseInformationTab() {
    var leaseCompletedFill = bindValidateContractLeaseInformationForm();
    
    if(leaseCompletedFill) {
//        alert('hai');
        var leaseMachindeDetailCompletedFill = bindValidateLeaseMachineInformationDetail();
        
        if(leaseMachindeDetailCompletedFill) {
            // after lease machine detail validate check lease remarks
            
            var leaseRemarks = $('#txtLeaseRemarks');
                            
            if(leaseRemarks.val() === '') {
                alert('Please Enter Contract Lease Remarks!');
                leaseTab.click();
                scrollTo(leaseRemarks.attr('id'));
                leaseRemarks.focus();
                return false;
            }        
        }
                
        // either true or false after try to validate lease machine detail completed fill
        return leaseMachindeDetailCompletedFill;
    }
    // for lease information throw validation
    return false;
}

// validate lease information mandatory is filled
function bindValidateContractLeaseInformationForm() {
    var leaseAgreementNo = $('#txtLeaseAgreementNo');
    var financeCompany = $('#txtFinanceCompany');
    var leaseStartDate = $('#txtLeaseStartDate');
//    var leaseSubsidiary = $('#txtLeaseSubsidiary');
    var leasePeriod = $('#txtLeasePeriod');
    var leaseExpiryDate = $('#txtLeaseExpiryDate');
    
    
    if(leaseAgreementNo.val() === '') {
        alert('Please Enter Contract Lease Agreement No!');
        leaseTab.click();
        scrollTo(leaseAgreementNo.attr('id'));
        leaseAgreementNo.focus();
        return false;
    }
    
    if(financeCompany.val() === '') {
        alert('Please Enter Contract Finance Company!');
        leaseTab.click();
        scrollTo(financeCompany.attr('id'));
        financeCompany.focus();
        return false;
    }
    
//    if(leaseSubsidiary.val() === '') {
//        alert('Please Enter Contract Lease Subsidiary!');
//        leaseTab.click();
//        scrollTo(leaseSubsidiary.attr('id'));
//        leaseSubsidiary.focus();
//        return false;
//    }
    
    if(leaseStartDate.val() === '') {
        alert('Please Enter Contract Lease Start Date!');
        leaseTab.click();
        scrollTo(leaseStartDate.attr('id'));
        leaseStartDate.focus();
        return false;
    }
    
    if(leaseExpiryDate.val() === '') {
        alert('Please Enter Contract Lease Expiry Date!');
        leaseTab.click();
        scrollTo(leaseExpiryDate.attr('id'));
        leaseExpiryDate.focus();
        return false;
    }
    
    if(leasePeriod.val() === '') {
        alert('Please Enter Contract Lease Period!');
        leaseTab.click();
        scrollTo(leasePeriod.attr('id'));
        leasePeriod.focus();
        return false;
    }
    
    return true;
}

// validate eash lease machine information detail 
function bindValidateLeaseMachineInformationDetail() {
    var leaseMachineDetailTbody = $('#dtLeaseMachineDetails tbody tr');
    for(var number = 1; number <= leaseMachineDetailTbody.length; number++) {
        var leaseBusinessUnit = $('#txtLeaseBusinessUnit_' + number);
        var leaseShippingId = $('#txtLeaseShippingId_' + number);
        var leaseModel = $('#txtLeaseModel_' + number);
        var leaseSerial = $('#txtLeaseSerial_' + number);
        var leaseInstallDate = $('#txtLeaseInstallDate_' + number);
        var leaseLocationAndDepartment = $('#txtLeaseLocationAndDepartment_' + number);
        var leasePostal = $('#txtLeasePostal_' + number);
        var leasePIC = $('#txtLeasePIC_' + number);
        var leaseContactNo = $('#txtLeaseContactNo_' + number);
        var leaseSerialExisted = $('#txtLeaseSerialUsed_' + number);
        
        // var lease text box
        var leaseShipping = $('#txtLeaseShippingTo_' + number);
        
        if(leaseBusinessUnit.val() === '') {
            alert('Please Enter Lease Machine Detail Unit On Line ' + number);
            leaseTab.click();
            scrollTo(leaseBusinessUnit.attr('id'));
            leaseBusinessUnit.focus();
            return false;
        }
        
        if(leaseShippingId.val() === '') {
            alert('Please Enter Correct Lease Machine Detail Shipping Address On Line ' + number + ' Base On Customer');
            leaseTab.click();
            
            scrollTo(leaseShipping.attr('id'));
            leaseShipping.focus();
            return false;
        }
        
        if(leaseModel.val() === '') {
            alert('Please Enter Lease Machine Detail Model On Line ' + number);
            leaseTab.click();
            scrollTo(leaseModel.attr('id'));
            leaseModel.focus();
            return false;
        }
        
        if(leaseSerial.val() === '') {
            alert('Please Enter Lease Machine Detail Serial On Line ' + number);
            leaseTab.click();
            scrollTo(leaseSerial.attr('id'));
            leaseSerial.focus();
            return false;
        } else if(leaseSerialExisted.val() === 'YES' && typeof $('#ddlStatus') !== undefined) {
            if($('#ddlStatus').children('option:selected').val() === 'Active') {
                alert('Lease Serial On Line ' + number + ' Already Used!');
                leaseTab.click();
                scrollTo(leaseSerial.attr('id'));
                leaseSerial.focus();
                return false;
            }            
        }
        
        if(leaseInstallDate.val() === '') {
            alert('Please Enter Lease Machine Detail Install Date On Line ' + number);
            leaseTab.click();
            scrollTo(leaseInstallDate.attr('id'));
            leaseInstallDate.focus();
            return false;
        } 
        
        if(leaseLocationAndDepartment.val() === '') {
            alert('Please Enter Lease Machine Detail Location And Department On Line ' + number);
            leaseTab.click();
            scrollTo(leaseLocationAndDepartment.attr('id'));
            leaseLocationAndDepartment.focus();
            return false;
        }
        
        if(leasePostal.val() === '') {
            alert('Please Enter Lease Machine Detail Postal On Line ' + number);
            leaseTab.click();
            scrollTo(leasePostal.attr('id'));
            leasePostal.focus();
            return false;
        }
        
        if(leasePIC.val() === '') {
            alert('Please Enter Lease Machine Detail PIC On Line ' + number);
            leaseTab.click();
            scrollTo(leasePIC.attr('id'));
            leasePIC.focus();
            return false;
        }
        
        if(leaseContactNo.val() === '') {
            alert('Please Enter Lease Machine Detail Contact No On Line ' + number);
            leaseTab.click();
            scrollTo(leaseContactNo.attr('id'));
            leaseContactNo.focus();
            return false;
        }
    }    
    return true;
}
/***** end section *****/



// set again ship to address value when first load
// becuase another method make it empty
// set date picker on input date
function setLeaseShipToValueAndInitiateDatePicker() {
    var number = 1;
    $('#dtLeaseMachineDetails tbody tr').each(function() {
//        var address = $(this).find('input#txtLeaseAddress_'+number).val();
        $(this).find('input#txtLeaseShippingTo_'+number).val($('input#txtLeaseShippingToHidden_'+number).val());
        var dateId = $(this).find('input#txtLeaseInstallDate_'+number).attr('id');
        initializeDatePicker(dateId);
        number++;
    });
}