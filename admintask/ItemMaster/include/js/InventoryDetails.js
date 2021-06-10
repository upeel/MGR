/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global minStockLevel */

var inventoryTab = $('label[for="tab2"]');

//for auto complete
var listOfInventoryLocationJson = [];

$(document).ready(function() {
    setChosenOnDropDownListType();
    loadAjaxAtFirstLoad();
    bindSetTotalInventoryDetailsCount();
    checkOnItemChangeAttribute();
    checkOnMinStockOnChange();
    checkOnMinOrderQtyOnChange();
    
});

// set dropdown list type to be chosen
function setChosenOnDropDownListType() {
    bindChosenDDLMulitpleSelectEvent('ddlInventoryItemTypeId');
    bindChosenDDLMulitpleSelectEvent('ddlYear');
    bindChosenDDLMulitpleSelectEvent('ddlInventoryLocation');
    bindChosenDDLMulitpleSelectEvent('ddlMonth');
}

function bindAppendInventoryDetailRow() {
    $('#btnAddItemDetails').click(function() {
        var inventoryDetailsBody = $('#tableInventoryDetails tbody');
        var currentLength = inventoryDetailsBody.children('tr').length;
        var newNumber = currentLength + 1;
        
        var InventoryDetailsRow = '<tr>';
        InventoryDetailsRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 txtStyleSanRegularMgr"><input type="text" id="txtInventoryLocationId_' + newNumber + '" name="txtInventoryLocationId_' + newNumber + '" class="txtInventoryLocationId mgrFormDesign mgrInputText" readonly hidden><input type="text" id="txtInventoryLocation_' + newNumber + '" name="txtInventoryLocation_' + newNumber + '" class="mgrFormDesign mgrInputText txtInventoryLocation"></td>';
        InventoryDetailsRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 txtStyleSanRegularMgr"><input type="text" id="txtStockAtHand_' + newNumber + '" name="txtStockAtHand_' + newNumber + '" class="mgrFormDesign mgrInputText txtStockAtHand" readonly></td>';
        InventoryDetailsRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 txtStyleSanRegularMgr"><input type="text" id="txtStockInTransit_' + newNumber + '" name="txtStockInTransit_' + newNumber + '" class="mgrFormDesign mgrInputText txtStockInTransit" readonly></td>';
        InventoryDetailsRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 txtStyleSanRegularMgr"><input type="text" id="txtStockReceived_' + newNumber + '" name="txtStockReceived_' + newNumber + '" class="mgrFormDesign mgrInputText txtStockReceived" readonly></td>';
        InventoryDetailsRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 txtStyleSanRegularMgr"><input type="text" id="txtStockShipped_' + newNumber + '" name="txtStockShipped_' + newNumber + '" class="mgrFormDesign mgrInputText txtStockShipped" readonly></td>';
        InventoryDetailsRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 txtStyleSanRegularMgr"><input type="text" id="txtReservedQty_' + newNumber + '" name="txtReservedQty_' + newNumber + '" class="mgrFormDesign mgrInputText txtReservedQty" readonly></td>';
        InventoryDetailsRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 txtStyleSanRegularMgr"><input type="text" id="txtAvailableQty_' + newNumber + '" name="txtAvailableQty_' + newNumber + '" class="mgrFormDesign mgrInputText txtAvailableQty" readonly></td>';
        InventoryDetailsRow += '<td class="mgrTdPadTopBot20 mgrPaddingRight20" style="text-align: center"><input type="text" id="txtMainStoreStatus_'+ newNumber + '" name="txtMainStoreStatus_'+ newNumber + '" value="Inactive" class="txtMainStoreStatus" hidden><input type="checkbox" id="checkMainStore_' + newNumber + '" name="checkMainStore_' + newNumber + '" class="checkMainStore" onclick="SetChk(this)"></td>';
        InventoryDetailsRow += '<td class="mgrTdPadTopBot20 mgrPaddingRight20 txtAlignCenter"><img src="../../include/mgr/include/images/MGR-LOGO/Remove mgr.png" class="mgrFloatRight logoTbodyTableMgr" alt="logo Remove Row" onclick="bindDeleteSelectedInventoryDetail($(this));"></td>';
        InventoryDetailsRow += '</tr>';

        inventoryDetailsBody.append(InventoryDetailsRow);

        // set auto complete
        bindSetInventoryLocationAutoComplete(newNumber);


        // set item detail row count
        bindSetTotalInventoryDetailsCount();
       
//        bindResetAutoCompleteInventoryLocation();
        
        bindResetInventoryDetailsRowNumber();
    });
}
function bindDeleteSelectedInventoryDetail(deleteItem) {
    
    $(deleteItem).closest('tr').remove();
    
    // reset row number
    bindResetInventoryDetailsRowNumber();
    
    // set total row count after delete
    bindSetTotalInventoryDetailsCount();
    bindResetAutoCompleteInventoryLocation();
}
function bindResetInventoryDetailsRowNumber() {
    var InventoryDetailBodyRow = $('#tableInventoryDetails tbody tr');
    var rowNumber = 1;
    $(InventoryDetailBodyRow).each(function() {
        $(this).find('td:eq(0) input.txtInventoryLocationId').attr({id: 'txtInventoryLocationId_'+rowNumber, name: 'txtInventoryLocationId_'+rowNumber});
        $(this).find('td:eq(0) input.txtInventoryLocation').attr({id: 'txtInventoryLocation_'+rowNumber, name: 'txtInventoryLocation_'+rowNumber});
        $(this).find('td:eq(1) input.txtStockAtHand').attr({id: 'txtStockAtHand_'+rowNumber, name: 'txtStockAtHand_'+rowNumber});
        $(this).find('td:eq(2) input.txtStockInTransit').attr({id: 'txtStockInTransit_'+rowNumber, name: 'txtStockInTransit_'+rowNumber});
        $(this).find('td:eq(3) input.txtStockReceived').attr({id: 'txtStockReceived_'+rowNumber, name: 'txtStockReceived_'+rowNumber});
        $(this).find('td:eq(4) input.txtStockShipped').attr({id: 'txtStockShipped_'+rowNumber, name: 'txtStockShipped_'+rowNumber});
        $(this).find('td:eq(5) input.txtReservedQty').attr({id: 'txtReservedQty_'+rowNumber, name: 'txtReservedQty_'+rowNumber});
        $(this).find('td:eq(6) input.txtAvailableQty').attr({id: 'txtAvailableQty_'+rowNumber, name: 'txtAvailableQty_'+rowNumber});
        $(this).find('td:eq(7) input.checkMainStore').attr({id: 'checkMainStore_'+rowNumber, name: 'checkMainStore_'+rowNumber});
        $(this).find('td:eq(7) input.txtMainStoreStatus').attr({id: 'txtMainStoreStatus_'+rowNumber, name: 'txtMainStoreStatus_'+rowNumber});
        
        // reinitialize again auto complete
        bindSetInventoryLocationAutoComplete(rowNumber);
        rowNumber++;
    });
    bindInputTextCharacterCountdownEvent();
}

function bindSetTotalInventoryDetailsCount() {
    var rowCount = $('#tableInventoryDetails tbody tr').length;
    $('#txtInventoryDetailsCount').val(rowCount);
}

function bindSetInventoryLocationAutoComplete(number) {
    $('#txtInventoryLocation_'+number).autocomplete({
       source: listOfInventoryLocationJson,
       autofocus: true,
       change: bindOnChangeInventoryLocation(number) // when auto complete on change event event
    });
}

function bindSetInventoryLocationOnFirstLoad() {
    var listInventoryLocationFromServletJsp = listOfInventoryLocationJson;
    
    bindPushDataToGlobalListInventoryLocation(listInventoryLocationFromServletJsp);
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
    
    // reset input auto complete data
    bindResetAutoCompleteInventoryLocation();
}

function bindResetAutoCompleteInventoryLocation() {
    var inventoryLocation = $('#tableInventoryDetails tbody tr');
    if(inventoryLocation.length > 0) {
        var number = 1;
        inventoryLocation.each(function() {
            var InventoryInput = $('#txtInventoryLocation_'+number);
            InventoryInput.change();
            bindSetInventoryLocationAutoComplete(number);            
            number++;
        });
    }
}

function bindOnChangeInventoryLocation(number) {
    var inventoryLocation = $('#txtInventoryLocation_'+number);
    inventoryLocation.change(function() {
       var jqXHR = $.ajax({
           url: "../AjaxServlet/GetItemStockAndDetail",
           data: {part_no: $('#txtInventoryStockCode').val(), itemId: $('#txtItemId').val(), inventoryLoc:$('#txtInventoryLocation_'+number).val(), itemSKU:$('#txtItemName').val()}
       });
       
       jqXHR.done(function(data) {
           var inventoryLocation_id = '';
           var stockAtHand = '';
           var stockReceived = '';
           var stockDelivered = '';
           var reservedQty = '';
           var availableqty = '';
           
           if(data !== null) {
               inventoryLocation_id = data.inventoryLocationId;
               stockAtHand = data.StockAtHand;
               stockReceived = data.StockReceived;
               stockDelivered = data.StockDelivered;
               reservedQty = data.reservedQuantity;
               availableqty = data.AvailableQty;
           }
           
           $('#txtInventoryLocationId_'+number).val(inventoryLocation_id);
           $('#txtStockAtHand_'+number).val(getQuantityFormattedNumber(stockAtHand, 2));
           $('#txtStockReceived_'+number).val(getQuantityFormattedNumber(stockReceived, 2));
           $('#txtStockShipped_'+number).val(getQuantityFormattedNumber(stockDelivered, 2));
           $('#txtReservedQty_'+number).val(getQuantityFormattedNumber(reservedQty, 2));
           $('#txtAvailableQty_'+number).val(getQuantityFormattedNumber(availableqty, 2));
           
           checkMinStockLevel(stockAtHand);
       });
       
       jqXHR.fail(function(data) {
          console.log('failed getting data!'); 
       });
    });
}

function bindOnLoadInventoryLocation(number) {
//    var inventoryLocation = $('#txtInventoryLocation_'+number);
       var jqXHR = $.ajax({
           url: "../AjaxServlet/GetItemStockAndDetail",
           data: {part_no: $('#txtInventoryStockCode').val(), itemId: $('#txtItemId').val(), inventoryLoc:$('#txtInventoryLocation_'+number).val(), itemSKU:$('#txtItemName').val()}
       });
       
       jqXHR.done(function(data) {
           var inventoryLocation_id = '';
           var stockAtHand = '';
           var stockReceived = '';
           var stockDelivered = '';
           var reservedQty = '';
           var availableqty = '';
           
           if(data !== null) {
               inventoryLocation_id = data.inventoryLocationId;
               stockAtHand = data.StockAtHand;
               stockReceived = data.StockReceived;
               stockDelivered = data.StockDelivered;
               reservedQty = data.reservedQuantity;
               availableqty = data.AvailableQty;
           }
           
           $('#txtInventoryLocationId_'+number).val(inventoryLocation_id);
           $('#txtStockAtHand_'+number).val(getQuantityFormattedNumber(stockAtHand, 2));
           $('#txtStockReceived_'+number).val(getQuantityFormattedNumber(stockReceived, 2));
           $('#txtStockShipped_'+number).val(getQuantityFormattedNumber(stockDelivered, 2));
           $('#txtReservedQty_'+number).val(getQuantityFormattedNumber(reservedQty, 2));
           $('#txtAvailableQty_'+number).val(getQuantityFormattedNumber(availableqty, 2));
           
           //check min stock level

            if(stockAtHand < minStockLevel){
                $('#txtInventoryLocation_'+number).addClass("changeLocationColor");
                $('#txtStockAtHand_'+number).addClass("changeLocationColor");
                $('#txtStockReceived_'+number).addClass("changeLocationColor");
                $('#txtStockShipped_'+number).addClass("changeLocationColor");
                $('#txtReservedQty_'+number).addClass("changeLocationColor");
                $('#txtStockInTransit_'+number).addClass("changeLocationColor");
                $('#txtAvailableQty_'+number).addClass("changeLocationColor");
            }else{
                $('#txtInventoryLocation_'+number).removeClass("changeLocationColor");
            }
       });
       
       jqXHR.fail(function(data) {
          console.log('failed getting data!'); 
       });
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

function formInventoryDetailsValidation() 
{
    var itemTypeId = $('#ddlInventoryItemTypeId').children("option:selected").val();
    var minStockLevel = $('#txtInventoryMinStockLevel').val();
    var minOrderQTY = $('#txtInventoryMinOrderQty').val();
    
    if($("#ddlItemTypeChangesFlag").val() === "1")
    {
        if(itemTypeId === '0'){
            alert("Please select Item Type.");
            scrollTo("ddlInventoryItemTypeId");
            return false;
        }
    }
    if($("#minStockLevel").val() === "1")
    {
        if(minStockLevel === ''){
            alert("Min Stock Level cannot be empty.");
            scrollTo("txtInventoryMinStockLevel");
            return false;
        }
    }
    if($("#miOrderQty").val() === "1")
    {
        if(minOrderQTY === ''){
            alert("Min Stock Level cannot be empty.");
            scrollTo("txtInventoryMinOrderQty");
            return false;
        }
    }
    else{
       return true; 
    }
    return true;
}
function SetChk(object){
    var thisIndex = $(".checkMainStore").index(object);
    
    var thisChk = $(".checkMainStore")[thisIndex];
    
    var thisChkStatus = $(".txtMainStoreStatus")[thisIndex];

    $(".txtMainStoreStatus").prop("value", "Inactive");
    if($(thisChk).is(":checked") === false)
    {
        $(".checkMainStore").prop("checked", false);
        thisChkStatus.value = "Inactive";
        $(thisChk).prop("checked", false);
    }
    else{
        $(".checkMainStore").prop("checked", false);
        thisChkStatus.value = "Active";
        $(thisChk).prop("checked", true);
    }

}
function loadAjaxAtFirstLoad(){
    var rowCount = $('#tableInventoryDetails tbody tr').length;
    for(var i = 1; i <= rowCount; i++){
        bindOnLoadInventoryLocation(i);       
    }
}

// this 3 function below to flag the changed field
// to prevent tab which does not do any changes throw any validation
function checkOnItemChangeAttribute()
{
    $("#ddlInventoryItemTypeId").on('change', function()
    {
        $("#ddlItemTypeChangesFlag").attr('value', "1");
    });
}

function checkOnMinStockOnChange()
{
    $("#txtInventoryMinStockLevel").on('change', function()
    {
        $("#minStockLevel").attr('value', "1");
    });
}

function checkOnMinOrderQtyOnChange()
{
    $("#txtInventoryMinOrderQty").on('change', function()
    {
        $("#miOrderQty").attr('value', "1");
    });
}