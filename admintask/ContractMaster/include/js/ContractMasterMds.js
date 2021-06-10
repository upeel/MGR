/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global listOfShippingByCustomerJson */

// lease tab id
var mdsTab = $('label[for="tab3"]');

// global variable for dropdown shipping array
var listOfCustomerDropShipperMds = [];

// index machine mds detail
var index_mds = 0;

$(document).ready(function() {
    appendNewMdsMachineDetailRow();
    setCustomerShippingToOnFirstLoad();
    checkMdsFormIsFilledOrNot();
    setMdsShipToValueAndInitiateDatePicker();
    setTotalMdsMachineDetailCount();
    openWindowQRCodeListEvent();
});

// function for open qr code list windows
function openWindowQRCodeListEvent() 
{
    $('#btnQRCodeList').click(function() {
        var mdsMachineDetailBody = $('#tblMdsMachineDetailInformation tbody tr');
        var contractMdsId = $('#txtContractMdsId').val();
        var contractId = $('#txtContractMasterId').val();
        if(mdsMachineDetailBody.length > 0) {
            for(var index = 0; index < mdsMachineDetailBody.length; index++)
            {
                var number = index + 1;
                var modelSelector = mdsMachineDetailBody.eq(index).find('input#txtMdsModel_'+number);
                var serialSelector = mdsMachineDetailBody.eq(index).find('input#txtMdsSerial_'+number);
                
                if(modelSelector.data('current') === '' || serialSelector.data('current') === '') 
                {
                    alert('Please Submit The New MDS Machine Detail Added!');
                    return false;
                }
                
                if((modelSelector.val() != modelSelector.data('current')) || (serialSelector.val() != serialSelector.data('current')))
                {
                    alert('Please Submit Contract Form To View Machine Model ' + modelSelector.val() + ' With Serial ' + serialSelector.val()+ ' QR Code!');
                    return false;
                }                
            }
            fnOpenPopUpWindow('Contract MDS QR Code List', './ContractQRCodeList?contract_mds_id='+contractMdsId+'&&contract_id='+contractId);
        } else {
            alert('Sorry, Your Contract Doens\'t Have MDS!');
        }        
    });
}

// commenting because model can multiple
//function bindModelOnChangeEvent(model) {
//    // use when mds_id is not existing yet
//    var contract_mds_id = $('#txtContractMdsId').val();
//    if(contract_mds_id === '') {
//        contract_mds_id = 0;
//    }
//    
//    var modelSelector = model;
//    var serialSelector = model.parent().next().find('.txtMdsSerial');
//    var modelValue = null, serialValue = null;
//    
//    if(modelSelector !== null) {
//        modelValue = modelSelector.val();
//        serialValue = serialSelector.val();
//        if(modelValue !== '' && serialValue !== '') {
//            var jqXHR = $.ajax({
//                method: "GET",
//                url: "../AjaxServlet/CheckModelSerialContractExisting",
//                data: {
//                    contract_mds_id,
//                    contract_section: "MDS",
//                    model_no: modelValue,
//                    serial_no: serialValue
//                }        
//            }); 
//            
//            jqXHR.done(function(data) {
//                if(data === 'YES') {
//                    alert('This Machine Model And Serial No Already Used!');
//                    serialSelector.val('');
//                    serialSelector.focus();
//                    return false;
//                }
//                
//                var tblMdsMachineDetailInformationBody = $('#tblMdsMachineDetailInformation tbody tr');
//                var mdsMachineDetailLength = tblMdsMachineDetailInformationBody.length;
//                var arrayModelSerial = [];
//                for(var number = 0; number < mdsMachineDetailLength; number++)
//                {
//                    var sModel = tblMdsMachineDetailInformationBody.eq(number).find('input.txtMdsModel');
//                    var sSerial = tblMdsMachineDetailInformationBody.eq(number).find('input.txtMdsSerial');
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
//                            sSerial.val('');
//                            sSerial.focus();
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
//                alert('Err, Need to maintanance on function bindModelOnChangeEvent');
//            });
//        }
//    }
//}

// ajax call for check model or serial no exist or not
function bindAjaxCheckModelAndSerialExist(serial)
{
    index_mds = serial.parent().parent().index();
    // use when mds_id is not existing yet
    var contract_mds_id = $('#txtContractMdsId').val();
    if(contract_mds_id === '') {
        contract_mds_id = 0;
    }
    
    var modelSelector = serial.parent().parent().find('.txtMdsModel');
    var serialSelector = serial;
    var modelValue = null, serialValue = null;
    
    if(serialSelector !== null) {
        serialValue = serialSelector.val();
        
        if(serialValue !== '') {
            // request change no validate model 3/10/2019
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
                    contract_mds_id,
                    contract_section: "MDS",
                    model_no: modelValue,
                    serial_no: serialValue
                }        
            });

            jqXHR.done(function(data) {     
                var serialUsed = serialSelector.prev('.txtMdsSerialUsed');
                if(data === "YES") {
                    alert('This Serial No Already Used!');
                    // commenting out 
                    serialSelector.val('');            
//                    // hide purpose because when wanna focus again the date picker div ui displayed
                    $('#ui-datepicker-div').hide();
                    serialSelector.focus();
                    serialUsed.val('YES');
                    return false;
                } 
                serialUsed.val('NO');

                // do check each row must be unique
                var tblMdsMachineDetailInformationBody = $('#tblMdsMachineDetailInformation tbody tr');
                var mdsMachineDetailLength = tblMdsMachineDetailInformationBody.length;
                var arrayModelSerial = [];
                for(var number = 0; number < mdsMachineDetailLength; number++)
                {
                    var sModel = tblMdsMachineDetailInformationBody.eq(number).find('input.txtMdsModel');
                    var sSerial = tblMdsMachineDetailInformationBody.eq(number).find('input.txtMdsSerial');
                    var modelSerialObject = {
                      model: sModel.val(),
                      serial: sSerial.val()
                    };          

                    for(var i = 0; i < arrayModelSerial.length; i++) 
                    {
                        var modelPrv = arrayModelSerial[i].model;
                        var serialPrv = arrayModelSerial[i].serial;
                        var modelCur = modelSerialObject.model;
                        var serialCur = modelSerialObject.serial;
                        if(number === index_mds && serialCur === serialPrv) {
                            alert('This Serial No Already Used By Another Mds Machine Detail Line!');
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
                alert("Err, Need To Maintanance This Portion :(");
            });
        }
    }
    
    
    
        
    
}

// set again ship to address value when first load
// becuase another method make it empty
// set date picker on input date
function setMdsShipToValueAndInitiateDatePicker() {
    var number = 1;
    $('#tblMdsMachineDetailInformation tbody tr').each(function() {
//        var address = $(this).find('input#txtMdsAddress_'+number).val();
        $(this).find('input#txtMdsShippingTo_'+number).val($('#txtMdsShippingToHidden_'+number).val());
        var dateId = $(this).find('input#txtMdsInstallDate_'+number).attr('id');
        initializeDatePicker(dateId);
        number++;
    });
}

/***** append row mds machine section *****/
function appendNewMdsMachineDetailRow() {
    $('#logoAddMdsMachineDetail').click(function() {
       var mdsMachineDetailBody = $('#tblMdsMachineDetailInformation tbody');
       var currentLength = mdsMachineDetailBody.children('tr').length;
       var newNumber = currentLength + 1;
       var pic = $('#txtMdsITPersonnel').val();
       var contact = $('#txtMdsContactNo').val();
       var newNumberFormat = newNumber + '.';
       var type = 3;
       var mdsMachineRow = '<tr>';
       mdsMachineRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 txtStyleSanRegularMgr">' + newNumberFormat + '</td>';
//       mdsMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtMdsBusinessUnit_' + newNumber + '" name="txtMdsBusinessUnit_' + newNumber + '" class="mgrFormDesign txtMdsBusinessUnit" data-current="" maxlength="20"></td>';
       mdsMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtMdsShippingId_' + newNumber + '" name="txtMdsShippingId_' + newNumber + '" class="shippingId" readonly hidden><input type="text" id="txtMdsShippingTo_' + newNumber + '" name="txtMdsShippingTo_' + newNumber + '" class="mgrFormDesign txtMdsShippingTo" onkeypress="return bindValidateCustomerAlreadyChoose();"></td>';
       mdsMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtMdsModel_' + newNumber + '" name="txtMdsModel_' + newNumber + '" class="mgrFormDesign txtMdsModel" data-current="" maxlength="15"></td>';
       mdsMachineRow += '<td class="mgrTdPadTopBot20"  style="padding-left: 5px;"><input type="text" id="txtMdsSerial_' + newNumber + '" name="txtMdsSerial_' + newNumber + '" class="mgrFormDesign txtMdsSerial" data-current="" maxlength="20" onchange="bindAjaxCheckModelAndSerialExist($(this))"></td>';
       mdsMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtMdsInstallDate_' + newNumber + '" name="txtMdsInstallDate_' + newNumber + '" class="mgrFormDesign txtMdsInstallDate" readonly></td>';
//       mdsMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtMdsLocation_' + newNumber + '" name="txtMdsLocation_' + newNumber + '" class="mgrFormDesign txtMdsLocation" maxlength="50"></td>';
       mdsMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtMdsAddress_' + newNumber + '" name="txtMdsAddress_' + newNumber + '" class="mgrFormDesign txtMdsAddress" readonly></td>';
       mdsMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><select id="ddlOwnership_' + newNumber + '" name="ddlOwnership_' + newNumber + '" class="ddlMdsOwnership ddlMgr"><option value="Internal">Internal</option><option value="External">External</option></select></td>';
       mdsMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtMonoCopyCharge_'+newNumber+'" name="txtMonoCopyCharge_'+newNumber+'" class="mgrFormDesign monoCopyCharge" value="'+getPriceFormattedNumber(0, 4)+'" onchange="copyMonoOnChange($(this));" onkeypress="return isNumberPlusComma(event, $(this));"></td>';
       mdsMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtColorCopyCharge_'+newNumber+'" name="txtColorCopyCharge_'+newNumber+'" class="mgrFormDesign colorCopyCharge" value="'+getPriceFormattedNumber(0, 4)+'" onchange="copyColorOnChange($(this));" onkeypress="return isNumberPlusComma(event, $(this));"></td>';
       mdsMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtMdsStartMeter_' + newNumber +'" name="txtMdsStartMeter_' + newNumber +'" class="mgrFormDesign txtMdsStartMeter" onkeypress="return isNumberUnit(event);"></td>';
       mdsMachineRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><select id="ddlMdsStatus_' + newNumber + '" name="ddlMdsStatus_' + newNumber + '" class="ddlMdsStatus ddlMgr"><option value="Active">Active</option><option value="Inactive">Inactive</option></select></td>';
       mdsMachineRow += '<td class="mgrTdPadTopBot20 mgrPaddingRight20 txtAlignCenter"><img src="../../include/mgr/include/images/MGR-LOGO/Remove mgr.png"  class="mgrFloatRight logoTheadTableMgr" alt="logo Remove Row" onclick="deleteSelectedMdsMachineDetailRow($(this));"></td>';
       mdsMachineRow += '</tr>';
       
       mdsMachineDetailBody.append(mdsMachineRow);
       
       initializeDatePicker('txtMdsInstallDate_'+newNumber);
       
       bindSetShippingAutoCompleteMds(newNumber);
       
        // set max length validation function to be ready
        bindInputTextCharacterCountdownEvent(); 
       
       // set total row count after append
       setTotalMdsMachineDetailCount();
       
       // for when click display the date picker UI
       // because when validating serial if exist force to hide the datepicker UI
       $('.hasDatepicker').click(function() {
          $('#ui-datepicker-div').show(); 
       });
    });
}

// delete selected row mds machine detail
function deleteSelectedMdsMachineDetailRow(rowSelected) {
    rowSelected.closest('tr').remove();
    
    resetRowNumberAndAttributeNumber();
    
    setTotalMdsMachineDetailCount();
}

// reset row number and attribute unique number on mds
function resetRowNumberAndAttributeNumber() {
    var mdsMachineTbodyRow = $('#tblMdsMachineDetailInformation tbody tr');
    var rowNumber = 1;
    mdsMachineTbodyRow.each(function() {
        $(this).find('td:eq(0)').text((rowNumber)+'.');
        $(this).find('td:eq(1) input.txtMdsBusinessUnit').attr({id: 'txtMdsBusinessUnit_'+rowNumber, name: 'txtMdsBusinessUnit_'+rowNumber});
        $(this).find('td:eq(2) input.shippingId').attr({id: 'txtMdsShippingId_' + rowNumber, name: 'txtMdsShippingId_' + rowNumber});
        $(this).find('td:eq(2) input.txtMdsShippingTo').attr({id: 'txtMdsShippingTo_'+rowNumber, name: 'txtMdsShippingTo_'+rowNumber});
        $(this).find('td:eq(3) input.txtMdsModel').attr({id: 'txtMdsModel_'+rowNumber, name: 'txtMdsModel_'+rowNumber});
        $(this).find('td:eq(4) input.txtMdsSerial').attr({id: 'txtMdsSerial'+rowNumber, name: 'txtMdsSerial'+rowNumber});
        $(this).find('td:eq(5) input.txtMdsInstallDate').attr({id: 'txtMdsInstallDate_'+rowNumber, name: 'txtMdsInstallDate_'+rowNumber});
        $(this).find('td:eq(6) input.txtMdsLocation').attr({id: 'txtMdsLocation_'+rowNumber, name: 'txtMdsLocation_'+rowNumber});
        $(this).find('td:eq(7) input.txtMdsAddress').attr({id: 'txtMdsAddress_'+rowNumber, name: 'txtMdsAddress_'+rowNumber});
        $(this).find('td:eq(8) select.ddlMdsOwnership').attr({id: 'ddlOwnership_'+rowNumber, name: 'ddlOwnership_'+rowNumber});
        $(this).find('td:eq(9) input.monoCopyCharge').attr({id: 'txtMonoCopyCharge_'+rowNumber, name: 'txtMonoCopyCharge_'+rowNumber});
        $(this).find('td:eq(10) input.colorCopyCharge').attr({id: 'txtColorCopyCharge_'+rowNumber, name: 'txtColorCopyCharge_'+rowNumber});
        $(this).find('td:eq(11) input.txtMdsStartMeter').attr({id: 'txtMdsStartMeter_'+rowNumber, name: 'txtMdsStartMeter_'+rowNumber});
        $(this).find('td:eq(12) select.ddlMdsStatus').attr({id: 'ddlMdsStatus_'+rowNumber, name: 'ddlMdsStatus_'+rowNumber});
        
        // reinitialize again date picker
        var datePickerInput = $(this).find('td:eq(5) input.txtMdsInstallDate');
        datePickerInput.removeClass('hasDatepicker');
        datePickerInput.unbind();
        initializeDatePicker(datePickerInput.attr('id'));
        
        // reinitialize again auto complete
        bindSetShippingAutoCompleteMds(rowNumber);
        
        rowNumber++;
    });
}

function copyMonoOnChange(selector) {
    if(selector.val() === '' || selector.val() === '.') {
        selector.val('0');
    }
    var monoCopy = $(selector).parent().parent().find('.monoCopyCharge');
    var monoCopyVal = $(selector).val(getPriceFormattedNumber($(selector).val(), 4));
    colorCopyVal = removeNumberFormat(colorCopyVal.val());
    monoCopy.val(monoCopyVal);
}

function copyColorOnChange(selector) {
    if(selector.val() === '' || selector.val() === '.') {
        selector.val('0');
    }
    var colorCopy = $(selector).parent().parent().find('.colorCopyCharge');
    var colorCopyVal = $(selector).val(getPriceFormattedNumber($(selector).val(), 4));
    monoCopyVal = removeNumberFormat(monoCopyVal.val());
    colorCopy.val(colorCopyVal);
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

// set total mds machine detail row count
function setTotalMdsMachineDetailCount() {
    var mdsMachineCount = $('#tblMdsMachineDetailInformation tbody tr').length;
    $('#txtMdsMachineDetailCount').val(mdsMachineCount);
    if(mdsMachineCount > 0) {
        setMdsMandatoryField(false);
    } else {
        setMdsMandatoryField(true);
    }    
}

/***** end section *****/


/***** 2. auto complete section for shipping to lease *****/
// set each input shipping to be list of customer shipping
function setCustomerShippingToOnFirstLoad() {
    var listShippingFromServletJsp = listOfShippingByCustomerJson;
    
    bindPushDataToGlobalListShippingMds(listShippingFromServletJsp);
}

// bind json data to global list shipping variable to be used for each machine shipping dropdown
function bindPushDataToGlobalListShippingMds(data) {
    // clear first the array
    listOfCustomerDropShipperMds = [];
    // check data length is not 0
    if(typeof data !== 'undefined') {
        for(var index in data) {
            listOfCustomerDropShipperMds.push({
                id: data[index].id,
                value: data[index].ship_to_location
            });
        }
    } else {
        listOfCustomerDropShipperMds = [];
    }    
    
    // reset input auto complete data
    resetAutoCompleteShippingDataMds();
}

// function for if every time customer on change the global data and reset autocomplete to empty input
function resetAutoCompleteShippingDataMds() {
    var mdsMachine = $('#tblMdsMachineDetailInformation tbody tr');
    if(mdsMachine.length > 0) {
        var number = 1;
        mdsMachine.each(function() {
            var shippingInput = $('#txtMdsShippingTo_'+number);
            shippingInput.val('');
            shippingInput.change();
            bindSetShippingAutoCompleteMds(number);
            number++;
        });
    }
}

// function to set auto complete for shipping to
function bindSetShippingAutoCompleteMds(number) {
    $('#txtMdsShippingTo_'+number).autocomplete({
       source: listOfCustomerDropShipperMds,
       autofocus: true,
       change: bindOnChangeShippingForAddressMds(number) // when auto complete on change event event
    });
}

// auto complete on change shipping to be set on address too
function bindOnChangeShippingForAddressMds(number) {
    var mdsShip = $('#txtMdsShippingTo_'+number);
    mdsShip.change(function() {
       var jqXHR = $.ajax({
           url: "../AjaxServlet/GetShipByCustomerIdAndShipTo",
           data: {customer_id: $('#txtCustomerId').val(), ship_to: mdsShip.val()}
       });
       
       jqXHR.done(function(data) {
           var shipping_id = '';
           var ship_to_address = '';
           
           if(data !== null) {
               shipping_id = data.id;
               ship_to_address = data.full_address;
           }
           
           $('#txtMdsShippingId_'+number).val(shipping_id);
           $('#txtMdsAddress_'+number).val(ship_to_address);
           
       });
       
       jqXHR.fail(function(data) {
          console.log('failed getting data!'); 
       });
    });
}



/**** validate contract is using mds or not section *****/
// function for set mandatory field on mds
function setMdsMandatoryField(boolean) {
    var bool = boolean;
    var mandatoryFieldMds = $('#tblMdsInformationDetail tr td span.mandatory, #tblMdsRemarks tr td span.mandatory');
    mandatoryFieldMds.prop('hidden', bool);
}

//1 validate mds information is having a row detail or not
function validateMdsMachineIsFillOrNot() {
    var mdsMachineTbodyRow = $('#tblMdsMachineDetailInformation tbody tr');
    var number = 1;
    var mdsFilled = true;
    mdsMachineTbodyRow.each(function() {
       var mdsBusinessUnit = $('#txtMdsBusinessUnit_'+number);
       var mdsShippingId = $('#txtMdsShippingId_'+number);
       var mdsShippingTo = $('#txtMdsShippingTo_'+number);
       var mdsModel = $('#txtMdsModel_'+number);
       var mdsSerial = $('#txtMdsSerial_'+number);
       var mdsInstallDate = $('#txtMdsInstallDate_'+number);
       var mdsLocation = $('#txtMdsLocation_'+number);      
       var mdsPIC = $('#txtMdsPIC_'+number);
       var mdsCopyChargeMono = $('#txtCopyChargeMono_'+number);
       var mdsCopyChargeColor = $('#txtCopyChargeColor_'+number);
       var mdsContactNo = $('#txtMdsContactNo_'+number);
       var mdsStartMeter = $('#txtMdsStartMeter_'+number);
       var mdsSerialUsed = $('#txtMdsSerialUsed_'+number);
       
       if(mdsBusinessUnit.val() === '') {
           alert('Please Enter Mds Machine Detail Unit On Line ' + number);
           mdsTab.click();
           scrollTo(mdsBusinessUnit.attr('id'));
           mdsBusinessUnit.focus();
           mdsFilled = false;
           return false;
       }
       
       if(mdsShippingId.val() === '') {
            alert('Please Enter Correct Mds Machine Detail Shipping Address On Line ' + number + ' Base On Customer');
            mdsTab.click();            
            scrollTo(mdsShippingTo.attr('id'));
            mdsShippingTo.focus();
            mdsFilled = false;
            return false;
        }
        
        if(mdsModel.val() === '') {
            alert('Please Enter Mds Machine Detail Model On Line ' + number);
            mdsTab.click();
            scrollTo(mdsModel.attr('id'));
            mdsModel.focus();
            mdsFilled = false;
            return false;
        }
        
        if(mdsSerial.val() === '') {
            alert('Please Enter Mds Machine Detail Serial On Line ' + number);
            mdsTab.click();
            scrollTo(mdsSerial.attr('id'));
            mdsSerial.focus();
            mdsFilled = false;
            return false;
        } else if(mdsSerialUsed.val() === 'YES' && typeof $('#ddlStatus') !== undefined) {
            if($('#ddlStatus').children('option:selected').val() === 'Active') {
                alert('MDS Serial On Line ' + number + ' Already Used!');
                mdsTab.click();
                scrollTo(mdsSerial.attr('id'));
                mdsSerial.focus();
                mdsFilled = false;
                return false;
            }            
        }
        
        if(mdsInstallDate.val() === '') {
            alert('Please Enter Mds Machine Detail Install Date On Line ' + number);
            mdsTab.click();
            scrollTo(mdsInstallDate.attr('id'));
            mdsInstallDate.focus();
            mdsFilled = false;
            return false;
        }
        
        if(mdsLocation.val() === '') {
            alert('Please Enter Mds Machine Detail Location On Line ' + number);
            mdsTab.click();
            scrollTo(mdsLocation.attr('id'));
            mdsLocation.focus();
            mdsFilled = false;
            return false;
        }
        
        if(mdsPIC.val() === '') {
            alert('Please Enter Mds Machine Detail PIC On Line ' + number);
            mdsTab.click();
            scrollTo(mdsPIC.attr('id'));
            mdsPIC.focus();
            mdsFilled = false;
            return false;
        }
        
        if(mdsCopyChargeMono.val() === '') {
            alert('Please enter MDS Machine Detail Copy Charge Mono on line '+number);
            mdsTab.click();
            scrollTo(mdsCopyChargeMono.attr('id'));
            mdsCopyChargeMono.focus();
            mdsFilled = false;
            return false;
        }
        
        if(mdsCopyChargeColor.val() === '') {
            alert('Please enter MDS Machine Detail Copy Charge Color on line '+number);
            mdsTab.click();
            scrollTo(mdsCopyChargeColor.attr('id'));
            mdsCopyChargeColor.focus();
            mdsFilled = false;
            return false;
        }
        
        if(mdsContactNo.val() === '') {
            alert('Please Enter Mds Machine Detail Contact No On Line ' + number);
            mdsTab.click();
            scrollTo(mdsContactNo.attr('id'));
            mdsContactNo.focus();
            mdsFilled = false;
            return false;
        }
        
        if(mdsStartMeter.val() === '') {
            alert('Please Enter Mds Machine Detail Start Meter On Line ' + number);
            mdsTab.click();
            scrollTo(mdsStartMeter.attr('id'));
            mdsStartMeter.focus();
            mdsFilled = false;
            return false;            
        }
       number++;
    });
        
    var count = mdsMachineTbodyRow.length;
    
    if(mdsFilled === true && count > 0) {
        mdsFilled = validateMdsInformationForm(); // call validate mds information form if user filled the machine detail information
    } else if(mdsFilled === false && count > 0) {
        mdsFilled = false;
    }     
    else {
        mdsFilled = getMdsIsEmptyOrNot();
        if(mdsFilled) {
            mdsFilled = validateMdsInformationForm();
            if(mdsFilled) {
                if($('#tblMdsMachineDetailInformation tbody tr').length === 0) {
                    alert('Please Add Mds Machine Detail at least 1!');
                    mdsTab.click();                    
                    $('#logoAddMdsMachineDetail').click();
                    var mdsBusinessUnit = $('#txtMdsBusinessUnit_1');
                    scrollTo(mdsBusinessUnit.attr('id'));
                    mdsBusinessUnit.focus();
                    mdsFilled = false;
                }
                
            }
        } else {
            mdsFilled = true;
        }
    }
        
    return mdsFilled;
}


// validate mds information form
function validateMdsInformationForm() {
    var mdsItPersonnel = $('#txtMdsITPersonnel');
//    var mdsDesignation = $('#txtMdsDesignation');
    var mdsContactNo = $('#txtMdsContactNo');
//    var mdsEmailAddress = $('#txtMdsEmailAddress');
//    var mdsNoWorkStation = $('#txtMdsNoWorkStation');
//    var mdsNoSiteOutlet = $('#txtMdsNoSiteOrOutlet');
    
    if(mdsItPersonnel.val() === '') {
        alert('Please Enter It Personnel For Manage Document Services!');
        mdsTab.click();
        scrollTo(mdsItPersonnel.attr('id'));
        mdsItPersonnel.focus();
        return false;
    } 
    
//    if(mdsDesignation.val() === '') {
//        alert('Please Enter Designation For Manage Document Services!');
//        mdsTab.click();
//        scrollTo(mdsDesignation.attr('id'));
//        mdsDesignation.focus();
//        return false;
//    } 
    
    if(mdsContactNo.val() === '') {
        alert('Please Enter Contact No For Manage Document Services!');
        mdsTab.click();
        scrollTo(mdsContactNo.attr('id'));
        mdsContactNo.focus();
        return false;
    }
    
//    if(mdsEmailAddress.val() === '') {
//        alert('Please Enter Email Address For Manage Document Services!');
//        mdsTab.click();
//        scrollTo(mdsEmailAddress.attr('id'));
//        mdsEmailAddress.focus();
//        return false;
//    }
//    
//    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//    if(!regex.test(mdsEmailAddress.val())) {
//        alert('Please Enter Correct Email Address For Manage Document Services!');
//        mdsTab.click();
//        scrollTo(mdsEmailAddress.attr('id'));
//        mdsEmailAddress.focus();
//        return false;
//    }
//    
//    if(mdsNoWorkStation.val() === '') {
//        alert('Please Enter No Work Station For Manage Document Services!');
//        mdsTab.click();
//        scrollTo(mdsNoWorkStation.attr('id'));
//        mdsNoWorkStation.focus();
//        return false;
//    }
//    
//    if(mdsNoSiteOutlet.val() === '') {
//        alert('Please Enter No Site Outlet For Manage Document Services!');
//        mdsTab.click();
//        scrollTo(mdsNoSiteOutlet.attr('id'));
//        mdsNoSiteOutlet.focus();
//        return false;
//    }
    
    return true;
}

// check if mds form is filled or not
function checkMdsFormIsFilledOrNot() {
    $('.mdsForm').change(function() {
        getMdsIsEmptyOrNot();
    });    
}

// for check mds mandatory is mandatory or not
function getMdsIsEmptyOrNot() {
    var mandatory = false;
    $('.mdsForm').each(function() {
        var value = $(this).val();
        if(value !== '') {
           mandatory = true;                
        }
    });

    if(mandatory === true) {
        setMdsMandatoryField(false);
    } else {
         setMdsMandatoryField(true);
    }

    return mandatory;
}
/***** end section *****/