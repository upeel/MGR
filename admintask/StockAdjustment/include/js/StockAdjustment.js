/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global listOfItemCodeJson, listOfInventoryLocationJson */

// global variable for dropdown shipping array
var listOfItemCode = [];
var listOfInventoryLocationJson = [];

$(document).ready(function() {
    bindChosenDDLMulitpleSelectEvent('ddlBusinessEntityId');
    bindChosenDDLMulitpleSelectEvent('ddlTransferType');
    $('#txtTransferDate').datepicker({
       dateFormat: "dd/mm/yy"
    });
    bindSetItemCodeOnFirstLoad();    
 
    bindAppendItemDetailRow();
    btnSaveOnClickEvent();
    bindSetTotalItemDetailsCount();
    btnAdjustOnClickEvent();
    bindInputTextCharacterCountdownEvent();
    bindSetInventoryLocationOnFirstLoad();
    transactionTypeOnChange();
    //checkTransferMandatory();
});
function bindAppendItemDetailRow() {
    $('#btnAddItemDetails').click(function() {
        var itemDetailsBody = $('#dtItemDetail tbody');
        var currentLength = itemDetailsBody.children('tr').length;
        var newNumber = currentLength + 1;
        var newNumberFormat = newNumber + '.';
        
        var ItemDetailsRow = '<tr>';
        ItemDetailsRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 txtStyleSanRegularMgr">' + newNumberFormat + '</td>';
        ItemDetailsRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtItemId_' + newNumber + '" name="txtItemId_' + newNumber + '" class="txtItemId" readonly hidden><input type="text" id="txtItemCode_' + newNumber + '" name="txtItemCode_' + newNumber + '" class="mgrFormDesign txtItemCode"></td>';
        ItemDetailsRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtItemDescription_' + newNumber + '" name="txtItemDescription_' + newNumber + '" class="mgrFormDesign txtItemDescription" readonly></td>';
        ItemDetailsRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtUom_' + newNumber + '" name="txtUom_' + newNumber + '" class="mgrFormDesign txtUom" readonly></td>';
        ItemDetailsRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" onchange="unitPriceOnChange('+ newNumber +')" id="txtUnitCost_' + newNumber + '" name="txtUnitCost_' + newNumber + '" class="mgrFormDesign txtUnitCost"></td>';
        ItemDetailsRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" id="txtQty_' + newNumber + '" name="txtQty_' + newNumber + '" class="mgrFormDesign txtQty" maxlength = "15" style="width:90%" onkeypress="return isNumberPlusComma(event, $(this));"></td>';
        ItemDetailsRow += '<td class="mgrTdPadTopBot20" style="padding-left: 5px;"><input type="text" maxlength="100" id="txtRemarks_' + newNumber + '" name="txtRemarks_' + newNumber + '" class="mgrFormDesign"></td>';
        ItemDetailsRow += '<td class="mgrTdPadTopBot20 mgrPaddingRight20 txtAlignCenter"><img src="../../include/mgr/include/images/MGR-LOGO/Remove mgr.png" class="mgrFloatRight logoTbodyTableMgr" alt="logo Remove Row" onclick="bindDeleteSelectedItemDetail($(this));"></td>';
        ItemDetailsRow += '</tr>';

        itemDetailsBody.append(ItemDetailsRow);

        // set auto complete
        bindSetItemCodeAutoComplete(newNumber);


        // set item detail row count
        bindSetTotalItemDetailsCount();
        
        bindResetAutoCompleteItemCode();
        
        bindResetItemDetailsRowNumber();
    });
}

function bindSetItemCodeAutoComplete(number) {
    $('#txtItemCode_'+number).autocomplete({
       source: listOfItemCode,
       autofocus: true,
       change: bindOnChangeItemCode(number) // when auto complete on change event event
    });
}
function bindSetInventoryLocationAutoComplete() {
    $('#txtTransferFrom').autocomplete({
       source: listOfInventoryLocationJson,
       autofocus: true
    });
    
    $('#txtTransferTo').autocomplete({
       source: listOfInventoryLocationJson,
       autofocus: true
    });
}
function bindOnChangeItemCode(number) {
    var itemCode = $('#txtItemCode_'+number);
    itemCode.change(function() {
       var jqXHR = $.ajax({
           url: "../AjaxServlet/GetItemDetailWithUOMsAndUnitCost",
           data: {part_no: $('#txtItemCode_'+ number).val()}
       });
       
       jqXHR.done(function(data) {
           var item_id = '';
           var item_description = '';
           var item_uom = '';
           //var item_cost = '';
           
           if(data !== null) {
               item_id = data.id;
               item_description = data.description;
               item_uom = data.listOfItemUoms[0].uom;
               //item_cost = data.listOfItemUoms[0].latest_selling_price;
           }

           $('#txtItemId_'+number).val(item_id);
           $('#txtItemDescription_'+number).val(item_description);
           $('#txtUom_'+number).val(item_uom);
           //$('#txtUnitCost_'+number).val(getPriceFormattedNumber(item_cost, 2));
       });
       
       jqXHR.fail(function(data) {
          console.log('failed getting data!'); 
       });
    });
}
function bindSetItemCodeOnFirstLoad() {
    var listItemCodeFromServletJsp = listOfItemCodeJson;
    
    bindPushDataToGlobalListItemCode(listItemCodeFromServletJsp);
}
function bindSetInventoryLocationOnFirstLoad() {
    var listInventoryLocationFromServletJsp = listOfInventoryLocationJson;
    
    bindPushDataToGlobalListInventoryLocation(listInventoryLocationFromServletJsp);
    bindSetInventoryLocationAutoComplete();
}
function bindPushDataToGlobalListItemCode(data) {
    // clear first the array
    listOfItemCode = [];
    // check data length is not 0
    if(typeof data !== 'undefined') {
        for(var index in data) {
            listOfItemCode.push({
                id: data[index].id,
                value: data[index].name
            });
        }
    } else {
        listOfItemCode = [];
    }    
    
    // reset input auto complete data
    bindResetAutoCompleteItemCode();
}
function bindPushDataToGlobalListInventoryLocation(data) {
    // clear first the array
    listOfInventoryLocationJson = [];
    // check data length is not 0
    if(typeof data !== 'undefined') {
        for(var index in data) {
            listOfInventoryLocationJson.push({
                id: data[index].id,
                value: data[index].description
            });
        }
    } else {
        listOfInventoryLocationJson = [];
    }    
}
function bindResetAutoCompleteItemCode() {
    var ItemCode = $('#dtItemDetail tbody tr');
    if(ItemCode.length > 0) {
        var number = 1;
        ItemCode.each(function() {
            var CodeInput = $('#txtItemCode_'+number);
//            CodeInput.val('');
            CodeInput.change();
            bindSetItemCodeAutoComplete(number);
            number++;
        });
    }
}
function bindSetTotalItemDetailsCount() {
    var rowCount = $('#dtItemDetail tbody tr').length;
    $('#txtItemDetailsCount').val(rowCount);
}
function bindDeleteSelectedItemDetail(deleteItem) {
    
    $(deleteItem).closest('tr').remove();
    
    // reset row number
    bindResetItemDetailsRowNumber();
    
    // set total row count after delete
    bindSetTotalItemDetailsCount();
    bindResetAutoCompleteItemCode();
}
function bindResetItemDetailsRowNumber() {
    var ItemDetailBodyRow = $('#dtItemDetail tbody tr');
    var rowNumber = 1;
    $(ItemDetailBodyRow).each(function() {
        $(this).find('td:eq(0)').text((rowNumber)+'.');
        $(this).find('td:eq(1) input.txtItemId').attr({id: 'txtItemId_'+rowNumber, name: 'txtItemId_'+rowNumber});
        $(this).find('td:eq(1) input.txtItemCode').attr({id: 'txtItemCode_'+rowNumber, name: 'txtItemCode_'+rowNumber});
        $(this).find('td:eq(2) input.txtItemDescription').attr({id: 'txtItemDescription_'+rowNumber, name: 'txtItemDescription_'+rowNumber});
        $(this).find('td:eq(3) input.txtUom').attr({id: 'txtUom_'+rowNumber, name: 'txtUom_'+rowNumber});
        $(this).find('td:eq(4) input.txtUnitCost').attr({id: 'txtUnitCost_'+rowNumber, name: 'txtUnitCost_'+rowNumber});
        $(this).find('td:eq(5) input.txtQty').attr({id: 'txtQty_'+rowNumber, name: 'txtQty_'+rowNumber});
        
        // reinitialize again auto complete
        bindSetItemCodeAutoComplete(rowNumber);
        rowNumber++;
    });
    bindInputTextCharacterCountdownEvent();
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
function btnSaveOnClickEvent() {
    $('#btnSave').click(function() {
        var confirm = window.confirm('Are You Sure Wanna Save This Form?');
        if(!confirm) {
            return false;
        }
        
        injectIntentionInputElementIntoForm('Save');
        $('#frm').submit();
    });
}
function btnAdjustOnClickEvent() {
    $('#btnAdjust').click(function() {
        var validate = ValidateForm();
        var itemValidate = bindValidateItemDetail();
        if(validate === true && itemValidate === true){
            var confirm = window.confirm('Are You Sure Wanna Submit This Form?');
            if(!confirm) {
                return false;
            }

            injectIntentionInputElementIntoForm('Adjust');
            $('#frm').submit();
        }
    });
}
function checkTransferMandatory(){
    var transferType = $('#ddlTransferType').children("option:selected").val();
    
    if(transferType === "1"){
        $('#stkFrom').addClass('formFieldTextRequired');
        $('#txtTransferFrom').attr('readonly', false);
        $('#stkTo').addClass('formFieldTextRequired');
        $('#txtTransferTo').attr('readonly', false);
    }
    if(transferType === "2"){
        $('#stkFrom').removeClass('formFieldTextRequired');
        $('#txtTransferFrom').attr('readonly', false);
        
        $('#stkTo').addClass('formFieldTextRequired');
        $('#txtTransferTo').attr('readonly', false);
    }
    if(transferType === "3"){
        $('#stkFrom').addClass('formFieldTextRequired');
        $('#txtTransferFrom').attr('readonly', false);
        $('#stkTo').removeClass('formFieldTextRequired');
        $('#txtTransferTo').attr('readonly', false);
            
    }    
}

function transactionTypeOnChange()
{
    $("#ddlTransferType").on("change", function ()
    {
        var transferType = document.getElementById("ddlTransferType");
        var selectedTransferType = transferType.options[transferType.selectedIndex].text;
        if(selectedTransferType === 'Stock In')
        {
            $('#stkFrom').removeClass('formFieldTextRequired');
            $('#stkTo').addClass('formFieldTextRequired');
            //$('#txtTransferTo').attr('value', '');
            $('#txtTransferTo').val('MGR Office');
            $('#txtTransferFrom').val('');
        }else
        {
            $('#stkFrom').addClass('formFieldTextRequired');
            //$('#txtTransferFrom').attr('value', '');
            $('#txtTransferFrom').val('MGR Office');
            $('#stkTo').removeClass('formFieldTextRequired');
            $('#txtTransferTo').val('');
        }
    });
}
function ValidateForm(){
    var entity = $('#ddlBusinessEntityId').children("option:selected").val();
    var transferType = $('#ddlTransferType').children("option:selected").val();
    var transferDate = $('#txtTransferDate').val();
    var transferFrom = $('#txtTransferFrom').val();
    var transferTo = $('#txtTransferTo').val();
    var itemDetailLength = $('#dtItemDetail tbody tr').length;
    
    if(entity === '0'){
        alert("Please select Entity.");
        scrollTo("ddlBusinessEntityId");
        return false;
    }
    else if(transferDate === ''){
        alert("Please select date.");
        scrollTo("txtTransferDate");
        return false;
    }
    else if(transferType === '0'){
        alert("Please select transfer Type.");
        scrollTo("ddlTransferType");
        return false;
    } 
    else if(transferType === '1'){
        if(transferFrom === ''){
            alert("Transfer from cannot be empty.");
            scrollTo("txtTransferFrom");
            return false;
        }else if(transferTo === ''){
            alert("Transfer to cannot be empty.");
            scrollTo("txtTransferTo");
            return false;      
        }
    }
    else if(transferType === '2'){
        if(transferTo === ''){
            alert("Transfer to cannot be empty.");
            scrollTo("txtTransferTo");
            return false;
        }
    }
    else if(transferType === '3'){
        if(transferFrom === ''){
            alert("Transfer from cannot be empty.");
            scrollTo("txtTransferFrom");
            return false; 
        }
    }
    else
    {
        return true;
    }
    if(itemDetailLength === 0){
        alert("Please add item at least 1.");
        scrollTo("dtItemDetail");
        return false; 
    }
    
    return true;
}
function bindValidateItemDetail() {
    var itemDetailLength = $('#dtItemDetail tbody tr').length;

    for(var i = 1; i <= itemDetailLength; i++) {
        var Qty = $('#txtQty_'+i);
        var ItemCode = $('#txtItemCode_'+i);
         
        if(ItemCode.val() === '') {
            alert('Enter Item Code at item details Row ' + i);
            scrollTo(ItemCode.attr('id'));
            ItemCode.focus();
            return false;
        }  
        if(Qty.val() === '') {
            alert('Enter quantity at item details Row ' + i);
            scrollTo(Qty.attr('id'));
            Qty.focus();
            return false;
        }  
    }
    return true;
}
function bindInputTextCharacterCountdownEvent()
{
    $("input[type=text], textarea").each(function ()
    {
        var $inputText = $(this);
        $inputText.on("input", function ()
        {
            var maxLength = this.maxLength;

            if (maxLength < 0)
            {
                //if there is no max length defined in the attribute, do not count down.
                return;
            }

            var spanElementId = "span_" + this.id;
            //check if the span element exist
            var $span_character_countdown = $("#" + spanElementId);

            //if not create it
            if ($span_character_countdown.length <= 0)
            {
                $(this).after("<small><i><span class='characterCountDown' id='" + spanElementId + "'></span></i></small>");
            }

            //if exist, change the text.
            $span_character_countdown = $("#" + spanElementId);
            var currentLength = this.value.length;
            $span_character_countdown.text((maxLength - currentLength) + " characters remaining.");
        });

        $inputText.blur(function () {
            $("#span_" + this.id).remove();
        });
    });
}

function unitPriceOnChange(i)
{
    var unitPrice = $("#txtUnitCost_"+i).val();
    var previousPrice = 0;
    var newUnitPrice = removeNumberFormat(unitPrice);
    if (isNaN(newUnitPrice) === true || newUnitPrice < 0)
    {
        //use previous correct value
        $("#txtUnitCost_"+i).val(getPriceFormattedNumber(previousPrice, 4));
        alert("Invalid Value!");
    } else
    {
        $("#txtUnitCost_"+i).val(getPriceFormattedNumber(newUnitPrice, 4));
    }
    
}