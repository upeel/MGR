/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* supported global variable for contract sales date section */
/* global listOfProductAndServicesJson */

var contractPeriodCurrent, contractPeriodStart, contractPeriodEnd, lastUpdatedContractPeriod;

/* tab sales id to be trigger when validation */
var salesTab = $('label[for="tab1"]');

var ready = 0;

$(document).ready(function() {
    bindInitializeDropDownChosen();
    bindInitializeDatePicker();
    bindContractPeriodMonthsOnEdit();
    bindAmountOnChange();
    bindAddPaymentDetailsOnClick();
    bindDropDownSalesTypeOnChange();
    salesTypeOnChange();
    bindSetSalesFormPlaceHolder();
    bindSetTotalSalesPaymentDetailCount();    
    bindSetFirstRetrievePercentageFormat();
    checkingProductServicesOnFirstLoadFormUpdate();
    setTotalRadioProductAndServicesChecked();
    setFirstLoadDatePicker();
    bindFormFillableContract();
    $('#txtSalesContractExpiryDate, #txtSalesContractStartDate').change();
});

/* function for all disabled after sales is fullified */
function bindFormFillableContract()
{
    $('#txtSalesContractExpiryDate').change(function() {
        if($('#txtSalesContractStartDate').val() !== '' && ready === 0)
        {
            ready = 1;
            bindContractReadyToFill();
        }
    });
    
    $('#txtSalesContractStartDate').change(function() {
        if($('#txtSalesContractExpiryDate').val() !== '' && ready === 0) 
        {
            ready = 1;
            bindContractReadyToFill();
        }
    });
}

// make disabled or readonline form to be fill
function bindContractReadyToFill() {
    var rowPaymentDetailCount = $('#tablePaymentDetails tbody tr').length;
    $('#ddlSalesProduct, #ddlSalesType').prop('disabled', false);
    $('#ddlSalesProduct, #ddlSalesType').trigger('chosen:updated');
    $('#txtSalesContractReferenceNo, #txtSalesAmountGstNo, #txtSalesRemarks').prop('readonly', false);  
    $('#btnAddSalesPaymentDetails').prop('hidden', false);
//    if(rowPaymentDetailCount === 0) {
//        $('#btnAddSalesPaymentDetails').click();
//    }
    
    $('.salesProductAndServices').prop('disabled', false);
    $('#file_1').prop('disabled', false);
    
    // mds section
    $('#txtMdsITPersonnel, #txtMdsDesignation, #txtMdsContactNo, #txtMdsEmailAddress, #txtMdsNoWorkStation, #txtMdsNoSiteOrOutlet, #txtMdsRemarks').prop('readonly', false);
    $('#logoAddMdsMachineDetail').prop('hidden', false);
}

function bindChosenDDLMultipleSelectEvent(elementId, selectAllElementId, deselectAllElementId)
{
    $("#" + elementId).chosen({
        no_results_text: "Oops, nothing found!",
        width: "30%",
        search_contains: true
    });

    $("#" + selectAllElementId).on("click", function ()
    {
        $("#" + elementId + " option").prop("selected", true).trigger("chosen:updated");
    });

    $("#" + deselectAllElementId).on("click", function ()
    {
        $("#" + elementId + " option").prop("selected", false).trigger("chosen:updated");
    });
}

/* initialize dropdown choosen for dropdown sales information */
function bindInitializeDropDownChosen() {
    bindChosenDDLMulitpleSelectEvent('ddlSalesProduct');
    bindChosenDDLMulitpleSelectEvent('ddlSalesType');
    bindChosenDDLMultipleSelectEvent('ddlPrefix');
}

function setFirstLoadDatePicker() {
    var tdPayment = $('#tablePaymentDetails tbody tr');
    var num = 0;
    for(var index=0; index<tdPayment.length; index++){
        num = (parseInt(index)+1);
       
       $('#txtInvoiceDate_'+num).datepicker({
           dateFormat: "dd/mm/yy",
           onClose: function() {
               var startDateArray =$(this).val().split('/');
            var day = parseInt(startDateArray[0]);
            var month = parseInt(startDateArray[1]);
            var year = parseInt(startDateArray[2]);
            $('#txtPaymentDate_'+num).datepicker("change", {
                minDate: new Date(year, month-1, day)
            });
           }
       });

        $('#txtPaymentDate_'+num).datepicker({
           dateFormat: "dd/mm/yy",
           onClose: function() {
               var startDateArray =$(this).val().split('/');
            var day = parseInt(startDateArray[0]);
            var month = parseInt(startDateArray[1]);
            var year = parseInt(startDateArray[2]);
            $('#txtInvoiceDate_'+num).datepicker("change", {
                maxDate: new Date(year, month-1, day)
            });
           }
       });
   }
}

// set total row sales payment detail count row
function bindSetTotalSalesPaymentDetailCount() {
    var rowCount = $('#tablePaymentDetails tbody tr').length;
    $('#txtSalesPaymentDetailCount').val(rowCount);
}



/* contract sales form place holder default */
function bindSetSalesFormPlaceHolder() {
    $('#txtSalesAmountGstNo').attr('placeholder', getPriceFormattedNumber('0.00', 2));
}


/***** section sales start, end, period *****/
/* intialize date picker on input value date start, end */
function bindInitializeDatePicker() {
    $('#txtSalesContractStartDate').datepicker({
        dateFormat: "dd/mm/yy",
        onClose: function() {
            var startDateArray =$(this).val().split('/');
            var day = parseInt(startDateArray[0]);
            var month = parseInt(startDateArray[1]);
            var year = parseInt(startDateArray[2]);
            $('#txtSalesContractExpiryDate').datepicker("change", {                   
                minDate: new Date(year, month-1, day)
            });
        }
    }).on('change', function(e) {
        bindShowContractSalesPeriodMonths();
    });
    
    $('#txtSalesContractExpiryDate').datepicker({
        dateFormat: "dd/mm/yy",
        onClose: function() {
            var expiryDateArray = $(this).val().split('/');
            var day = parseInt(expiryDateArray[0]);
            var month = parseInt(expiryDateArray[1]);
            var year = parseInt(expiryDateArray[2]);
            $('#txtSalesContractStartDate').datepicker("change", {               
                maxDate: new Date(year, month-1, day) 
            });
        }
    }).on('change', function(e) {
        bindShowContractSalesPeriodMonths();
    });
}

/* calculate month duration base on start date and end date*/
function bindCalculateMonthDate(startContractDate, endContractDate) {
    var months;
    months = (endContractDate.getFullYear() - startContractDate.getFullYear()) * 12;
    months -= startContractDate.getMonth() + 1;
    months += endContractDate.getMonth();
    // plus one because month is base on index
    months += 1;
    return months <= 0 ? 0 : months;
}

/* show contract sales period months base on start-expiry date */
function bindShowContractSalesPeriodMonths() {    
    var contractSalesStartDate = $('#txtSalesContractStartDate').val();
    var contractExpiredDate = $('#txtSalesContractExpiryDate').val();

    if(contractSalesStartDate !== '' && contractExpiredDate !== '') {
        var startDateSplit = contractSalesStartDate.split("/");                
        var startDay = parseInt(startDateSplit[0]);
        var startMonth = parseInt(startDateSplit[1]) - 1;
        var startYear = parseInt(startDateSplit[2]);
        
        var endDateSplit = contractExpiredDate.split('/');        
        var expiredDay = parseInt(endDateSplit[0]);
        var expiredMonth = parseInt(endDateSplit[1]) - 1;
        var expiredYear = parseInt(endDateSplit[2]);
        
        var dateStartContrant = new Date(startYear, startMonth, startDay);
//        alert(dateStartContrant);
        var dateEndContract = new Date(expiredYear, expiredMonth, expiredDay);
//        alert(dateEndContract);
        // calculate difference period month
        var contractPeriod = bindCalculateMonthDate(dateStartContrant, dateEndContract);

        if(contractPeriod === 0) {
            contractPeriodStart = 1;
            contractPeriod = contractPeriodStart;
            contractPeriodEnd = 2;
            lastUpdatedContractPeriod = contractPeriodStart;
        } else {
            contractPeriodStart = contractPeriod - 1;
            contractPeriodEnd = contractPeriod + 1;
            lastUpdatedContractPeriod = contractPeriod;
        }
        $('#txtSalesContractPeriodMonths').val(contractPeriod);
        contractPeriodCurrent = contractPeriod;
    }    
}

// contract period months on change event
function bindContractPeriodMonthsOnEdit() {
    $('#txtSalesContractPeriodMonths').change(function() {
       // start date and end date contract sales
       var contractSalesStartDate = $('#txtSalesContractStartDate');
       var contractSalesEndDate = $('#txtSalesContractExpiryDate');
       var inputSalesContractPeriod = parseInt($(this).val());
       
       // check start date and expired date is choose first
       if(contractSalesStartDate.val() === '' || contractSalesEndDate.val() === '') {
           alert('Please Choose Contract Sales Start Date And Expired Date First!');
           $(this).val('');
           
           if(contractSalesStartDate.val() === '') {
                contractSalesStartDate.focus();
                return false;
           }
           
           if(contractSalesEndDate.val() === '') {
                contractSalesEndDate.focus();
                return false;
           }          
       }
       
       // check cannot be empty, 0, less then period start, more then period end
       if(isNaN(inputSalesContractPeriod) || inputSalesContractPeriod === 0 || inputSalesContractPeriod > contractPeriodEnd || inputSalesContractPeriod < contractPeriodStart) {
            var periodStart = contractPeriodStart;
            if(contractPeriodStart === 0) {
                periodStart = 1;
            }
            alert('Contract Period Only Can Only Between ' + periodStart + ' - ' + contractPeriodEnd);
            $(this).val(lastUpdatedContractPeriod);
            return false;
        } 
       
        // set the new value
        lastUpdatedContractPeriod = $(this).val();      
    });
}
/***** end section *****/



/* bind amount input type on change */
function bindAmountOnChange() {
    $('.mgrAmountInput').change(function() {
        var thisInputAmount = $(this);
        if(thisInputAmount.val().trim() === '.') {
            thisInputAmount.val(0);
        }
        // if empty keep the value empty
        if(thisInputAmount.val() !== '') {
            $(thisInputAmount).val(getPriceFormattedNumber(thisInputAmount.val(), 2));
        }        
    });
}



/***** section key press for percentage, and number got dot *****/
// only for numeric and dot input
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
/***** end section *****/




/***** append row, delete row, reset each row number section *****/
/* add new sales payment details */
function bindAddPaymentDetailsOnClick() {
    $('#btnAddSalesPaymentDetails').click(function() {
        var salesPaymentDetailsBody = $('#tablePaymentDetails tbody');
        var currentLength = salesPaymentDetailsBody.children('tr').length;
        var newNumber = currentLength + 1;
        var newNumberFormat = newNumber + '.';
        // string append
        var newRowSalesPaymentDetail = '<tr>';
        newRowSalesPaymentDetail += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 txtStyleSanRegularMgr">' + newNumberFormat + '</td>';
        newRowSalesPaymentDetail += '<td class="mgrTdPadTopBot20"><input type="text" id="txtPaymentDetailsPercentage_'+newNumber+'" name="txtPaymentDetailsPercentage_'+newNumber+'" class="mgrFormDesign txtPaymentDetailsPercentage" data-dot="0" data-current="" onkeypress="return isNumberPercentage(event, $(this));" onchange="bindSetPercentageFormat($(this));"></td>';
        newRowSalesPaymentDetail += '<td class="mgrTdPadTopBot20" style="padding-left: 10px;"><input type="text" id="txtPaymentPhases_'+newNumber+'" name="txtPaymentPhases_'+newNumber+'" class="mgrFormDesign txtPaymentPhases" maxlength="50"></td>';
        newRowSalesPaymentDetail += '<td class="mgrTdPadTopBot20"  style="padding-left: 10px;"><input type="text" id="txtPaymentAmount_'+newNumber+'" name="txtPaymentAmount_'+newNumber+'" class="mgrAmountInput mgrFormDesign txtPaymentAmount mgrAmountAlign" onkeypress="return isNumberPlusComma(event, $(this));"></td>';
        newRowSalesPaymentDetail += '<td class="mgrTdPadTopBot20" style="padding-left: 10px;"><input type="text" id="txtInvoiceNumber_'+newNumber+'" name="txtInvoiceNumber_'+newNumber+'" class="mgrFormDesign txtInvoiceNumber" maxlength="20"></td>';
        newRowSalesPaymentDetail += '<td class="mgrTdPadTopBot20" style="padding-left: 10px;"><input type="text" id="txtInvoiceDate_'+newNumber+'" name="txtInvoiceDate_'+newNumber+'" class="mgrFormDesign txtInvoiceDate" readonly></td>';
        newRowSalesPaymentDetail += '<td class="mgrTdPadTopBot20" style="padding-left: 10px;"><input type="text" id="txtPaymentDate_'+newNumber+'" name="txtPaymentDate_'+newNumber+'" class="mgrFormDesign txtPaymentDate" readonly></td>';
        newRowSalesPaymentDetail += '<td class="mgrTdPadTopBot20 txtAlignCenter mgrPaddingRight20 mgrFloatRight"><img src="../../include/mgr/include/images/MGR-LOGO/Remove mgr.png" class="logoTbodyTableMgr" onclick="bindDeleteSelectedPaymentDetails($(this));" alt="logo Remove Row"></td>';
        newRowSalesPaymentDetail += '</tr>';
        
        salesPaymentDetailsBody.append(newRowSalesPaymentDetail);
        
        // place holder for percentage
        $('#txtPaymentDetailsPercentage_'+newNumber).attr("placeholder", getQuantityFormattedNumber("0.00", 2)+'%');
        // place holder for amount
        $('#txtPaymentAmount_'+newNumber).attr("placeholder", getPriceFormattedNumber("0.00", 2));
        
        // call for new element to be trigger on this function
        bindInputTextCharacterCountdownEvent();
        bindAmountOnChange();
        
        // initialize date picker on invoice date and payment date
        $('#txtInvoiceDate_'+newNumber).datepicker({
           dateFormat: "dd/mm/yy",
           onClose: function() {
               var startDateArray =$(this).val().split('/');
            var day = parseInt(startDateArray[0]);
            var month = parseInt(startDateArray[1]);
            var year = parseInt(startDateArray[2]);
            $('#txtPaymentDate_'+newNumber).datepicker("change", {
                minDate: new Date(year, month-1, day)
            });
           }
       });

        $('#txtPaymentDate_'+newNumber).datepicker({
           dateFormat: "dd/mm/yy",
           onClose: function() {
               var startDateArray =$(this).val().split('/');
            var day = parseInt(startDateArray[0]);
            var month = parseInt(startDateArray[1]);
            var year = parseInt(startDateArray[2]);
            $('#txtInvoiceDate_'+newNumber).datepicker("change", {
                maxDate: new Date(year, month-1, day)
            });
           }
       });
        
        // set sales payment detail row count
        bindSetTotalSalesPaymentDetailCount();
    });
}

/* deleted row that are selected */
function bindDeleteSelectedPaymentDetails(imageSelected) {
//    if($('#tablePaymentDetails tbody tr').length === 1) {
//        alert('At Least Add 1 Sales Payment Details!');
//        return false;
//    }
    $(imageSelected).closest('tr').remove();   
    bindResetSalesPaymentDetailsRowNumber();
    
    // set sales payment detail row count
    bindSetTotalSalesPaymentDetailCount();
}

// reset sales payment details row number
function bindResetSalesPaymentDetailsRowNumber() {
    var salesPaymentDetailBodyRow = $('#tablePaymentDetails tbody tr');
    var rowNumber = 1;
    $(salesPaymentDetailBodyRow).each(function() {
        $(this).find('td:eq(0)').text((rowNumber)+'.');
        $(this).find('td:eq(1) input.txtPaymentDetailsPercentage').attr({id: 'txtPaymentDetailsPercentage_'+rowNumber, name: 'txtPaymentDetailsPercentage_'+rowNumber});
        $(this).find('td:eq(2) input.txtPaymentPhases').attr({id: 'txtPaymentPhases_'+rowNumber, name: 'txtPaymentPhases_'+rowNumber});
        $(this).find('td:eq(3) input.txtPaymentAmount').attr({id: 'txtPaymentAmount_'+rowNumber, name: 'txtPaymentAmount_'+rowNumber});
        $(this).find('td:eq(4) input.txtInvoiceNumber').attr({id: 'txtInvoiceNumber_'+rowNumber, name: 'txtInvoiceNumber_'+rowNumber});
        $(this).find('td:eq(5) input.txtInvoiceDate').attr({id: 'txtInvoiceDate_'+rowNumber, name: 'txtInvoiceDate_'+rowNumber});
        $(this).find('td:eq(6) input.txtPaymentDate').attr({id: 'txtPaymentDate_'+rowNumber, name: 'txtPaymentDate_'+rowNumber});
        
        var invoiceDate = $(this).find('td:eq(5) input.txtInvoiceDate');
        invoiceDate.removeClass('hasDatePicker');
        invoiceDate.unbind();
        initializeDatePicker(invoiceDate.attr('id'));
        
        var paymentDate = $(this).find('td:eq(6) input.txtPaymentDate');
        paymentDate.removeClass('hasDatePicker');
        paymentDate.unbind();
        initializeDatePicker(paymentDate.attr('id'));
        
        rowNumber++;
    });
}
/***** end section *****/



/***** set percentage format when first load *****/
// when first load percentage if got value need to be automatically formatted
function bindSetFirstRetrievePercentageFormat() {
    $('#tablePaymentDetails tbody tr').each(function() {
       var currentPercentage = $(this).find('td:eq(1) input'); 
//       alert(currentPercentage);
       bindSetPercentageFormat(currentPercentage);
    });
}
/***** end section *****/



/***** set percentage format on each sales payment detail section *****/
// set percentage format on payment detail percentage
function bindSetPercentageFormat(inputSelected) {
    // if not empty set the format percentage
    if(inputSelected.val() !== '') {
        var subStringIndexPercentage = inputSelected.val().indexOf('%');
        if(subStringIndexPercentage !== -1) {
            inputSelected.val(inputSelected.val().replace('%', ''));
        }    
        
        // for dot not throw issue
        if(inputSelected.val() === '.')
        {
            var data = inputSelected.data('current');
            alert('Please Put Correct Percentage!');
            inputSelected.val(data);
        }
        
        var percentageNumeric = parseInt(inputSelected.val());
        if(percentageNumeric > 100 || percentageNumeric < 0) {
            alert("Please Enter Percentage Between 0-100!");
            // set value to be previous one
            // if is empty previous one set empty
            // set to keep focusing
            var dataCurrent = inputSelected.data('current');
            if(dataCurrent === '') {
                $(inputSelected).val('');
                $(inputSelected).focus();
            } else {
                $(inputSelected).val(getQuantityFormattedNumber(dataCurrent, 2)+'%');
                $(inputSelected).focus();
            }
            
            return false;
        }
        // set data to the current accepted value
        $(inputSelected).data('current', inputSelected.val());
        $(inputSelected).val(getQuantityFormattedNumber(inputSelected.val(),2)+'%');
    } else {
        $(inputSelected).data('current', inputSelected.val());
    }    
}
/***** end section *****/



/***** validating sales information form *****/
/* validate sales information form 
 * if status terminated sales remarks is mandatory
 * if sales type is lease and hire purchase lease information must filled
 * */
function bindValidateContractSalesInformationForm(contractStatus) {
    // validate sales information form
    var product = $('#ddlSalesProduct');
    var contractReferenceNo = $('#txtSalesContractReferenceNo');
    var salesType = $('#ddlSalesType');    
    var salesAmount = $('#txtSalesAmountGstNo');
    var salesContractStartDate = $('#txtSalesContractStartDate');
    var salesContractExpiryDate = $('#txtSalesContractExpiryDate');
    var contractPeriodMonths = $('#txtSalesContractPeriodMonths');
    var salesRemarks = $('#txtSalesRemarks');
    // contract status value
    var contractHeaderStatus = contractStatus;
    var sales = $('#ddlSalesType').children('option:selected').text().trim();
    
    if(product.val() === null || product.val() === '0') {
        alert('Please Select Sales Information Product!');
        salesTab.click();
        scrollTo(product.next().attr('id'));
        product.focus();
        return false;
    }
    
    if(contractReferenceNo.val() === '') {
        alert('Please Enter Sales Contract Reference No!');
        salesTab.click();
        scrollTo(contractReferenceNo.attr('id'));
        contractReferenceNo.focus();
        return false;
    }
    
    if(sales !== 'Others') {
        if(salesType.val() === null || salesType.val() === '0') {
            alert('Please Select Sales Information Sales Type!');
            salesTab.click();
            scrollTo(salesType.next().attr('id'));
            salesType.focus();
            return false;
        }
    }
    
    if(salesAmount.val() === '') {
        alert('Please Enter Sales Amount!');
        salesTab.click();
        scrollTo(salesAmount.attr('id'));
        salesAmount.focus();
        return false;
    }
    
    if(salesContractStartDate.val() === '') {
        alert('Please Enter Sales Contract Start Date!');
        salesTab.click();
        scrollTo(salesContractStartDate.attr('id'));
        salesContractStartDate.focus();
        return false;
    }
    
    if(salesContractExpiryDate.val() === '') {
        alert('Please Enter Sales Contract Expiry Date!');
        salesTab.click();
        scrollTo(salesContractExpiryDate.attr('id'));
        salesContractExpiryDate.focus();
        return false;
    }
    
    if(contractPeriodMonths.val() === '') {
        alert('Please Enter Sales Contract Period!');
        salesTab.click();
        scrollTo(contractPeriodMonths.attr('id'));
        contractPeriodMonths.focus();
        return false;
    }
    
    if(contractHeaderStatus === 'Terminated' && salesRemarks.val() === '') {
        alert('Please Input Your Sales Remark, When Terminating This Contract!');
        salesTab.click();
        scrollTo(salesRemarks.attr('id'));
        salesRemarks.focus();
        return false;
    }
    
    // call validate contract sales payment details section
//    var validateSalesPaymentDetails = bindValidateContractSalesPaymentDetails(); 
    var validateSalesPaymentDetails = true;
    // if payment details true call execute
    if(validateSalesPaymentDetails) {
        // product and services validate minimal one
//        var salesProductAndServicesCount = bindValidateContractSalesProductAndServices();
        // count total checked
        var salesProductAndServicesCount = $('#txtRdSalesProductServiceCount').val();
//        alert(salesProductAndServicesCount);
        if(parseInt(salesProductAndServicesCount.trim()) === 0) {
            alert('Please Check The Product And Services Box To Be Used For Contract!');
            salesTab.click();
            scrollTo('productAndServicesRow');
            return false;
        } 
    
        var submission = true;

        // check sales type need to be leasing or not
        var salesTypeValue = salesType.children('option:selected').text().trim().toUpperCase();
        // if sales type is lease and hire purchase need to go and fill lease information form
        if(salesTypeValue === 'LEASE' || salesTypeValue === 'HIRE PURCHASE') {    
            // go leasing information tab
            if(!bindGoToLeaseInformationTab()) {
                // return true if lease mandatory field have been filled
                submission = false;
            }            
        } 

        return submission;
    }
    return false;
}
/***** end section *****/



/***** when choose sales type drop down *****/
// trigger function on change sales type change dropdown
function bindDropDownSalesTypeOnChange() {
    $('#ddlSalesType').change(function() {
        var salesTypeValue = $(this).children('option:selected').text().trim().toUpperCase();        
        var leaseMandatory = $('#txtLeaseMandatory');
        // if lease mandatory is true no need to trigger change and alert
        if((salesTypeValue === 'LEASE' || salesTypeValue === 'HIRE PURCHASE') && leaseMandatory.val() !== '1') {
            leaseMandatory.val(1);
            leaseMandatory.change();
            alert('Leasing Information Is Required!');
        } 
        // if sales type is not lease and not hire purchase and mandatory is 1
        else if((salesTypeValue !== 'LEASE' && salesTypeValue !== 'HIRE PURCHASE') && leaseMandatory.val() === '1') {
            leaseMandatory.val(0);
            leaseMandatory.change();
        }
    });
}
/***** end section *****/



/***** validating sales payment details before posting *****/
// function to validate contract sales payment details each row
function bindValidateContractSalesPaymentDetails() {
    var salesPaymentDetailsLength = $('#tablePaymentDetails tbody tr').length;
//    alert(salesPaymentDetailsLength);
    for(var i = 1; i <= salesPaymentDetailsLength; i++) {
        var salesPaymentPercentage = $('#txtPaymentDetailsPercentage_'+i);
        var salesPaymentPhases = $('#txtPaymentPhases_'+i);
        var salesPaymentAmount = $('#txtPaymentAmount_'+i);
        
        if(salesPaymentPercentage.val() === '') {
            alert('Please Enter Payment Percentage In Payment Details Row ' + i);
            salesTab.click();
            scrollTo(salesPaymentPercentage.attr('id'));
            salesPaymentPercentage.focus();
            return false;
        }
        
        if(salesPaymentPhases.val() === '') {
            alert('Please Enter Payment Phases In Payment Details Row ' + i);
            salesTab.click();
            scrollTo(salesPaymentPhases.attr('id'));
            salesPaymentPhases.focus();
            return false;
        }
        
        if(salesPaymentAmount.val() === '') {
            alert('Please Enter Payment Amount In Payment Details Row ' + i);
            salesTab.click();
            scrollTo(salesPaymentAmount.attr('id'));
            salesPaymentAmount.focus();
            return false;
        }       
    }
    return true;
}
/***** end section *****/



/***** Check Box Produc And Services Section *****/
// validate get radio checked on product and service sales
function bindValidateContractSalesProductAndServices() {
    var checkedCount = 0;
    $('.salesProductAndServices').each(function() {
        if($(this)[0].hasAttribute('checked')) {
            checkedCount++;
        }
    });
    return checkedCount;
}

/* mgr check on check (checkbox) script function */
function bindRadioButtonOnCheck(checkbox) {
    if($(checkbox)[0].hasAttribute('checked')) {
        $(checkbox).removeAttr('checked');
    } else {
        $(checkbox).attr('checked', true);
    }
    // call to reset total radio button
    setTotalRadioProductAndServicesChecked();
}

// set total checked product and service radio button on input type 
function setTotalRadioProductAndServicesChecked() {
    var countCheck = bindValidateContractSalesProductAndServices();
    $('#txtRdSalesProductServiceCount').val(countCheck);
}

// for when first load form update check box automatically checked
function checkingProductServicesOnFirstLoadFormUpdate() {
    var listOfProductServices = listOfProductAndServicesJson;
    
    for(var index in listOfProductServices) {
        // product and service id
        var productAndServicesId = listOfProductServices[index].product_and_services_id;
        $('.salesProductAndServices').each(function() {
            if($(this).data('checked') === productAndServicesId) {
                $(this).attr('checked', true);
            }
        });
    }
}

function prefixOnChange() {
        var prefix = $('#ddlPrefix').children('option:selected').text().trim();
        $('#txtPrefix').val(prefix);
}

function salesTypeOnChange() {
    $('#ddlSalesType').change(function() {
       var sales = $('#ddlSalesType').children('option:selected').text().trim();
       var prefix = $('#ddlPrefix');
       if(sales === 'Contractual') {
           prefix.val('SAC');
           prefix.trigger('chosen:updated');
       }
       else if(sales === 'Maintenance') {
           prefix.val('SAM');
           prefix.trigger('chosen:updated');
       } 
       else if(sales === 'Transactional') {
           prefix.val('TP');
           prefix.trigger('chosen:updated');
       }
       else if(sales === 'Rental') {
           prefix.val('RAC');
           prefix.trigger('chosen:updated');
       }
       else if(sales === 'Miscellaneous') {
           prefix.val('MIS');
           prefix.trigger('chosen:updated');
       }
    });
}
/***** end section *****/