/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
	searchItem();
    getUnitPriceBaseUOMItemFirstLoad();
    bindOnAddItemList();
    bindChosenDDLMulitpleSelectEvent("ddlItemType");
    bindChosenDDLMulitpleSelectEvent("ddlItemGroup");
    bindChosenDDLMulitpleSelectEvent("ddlItemTypeContract");
    $('#ddlItemType').trigger('chosen:updated');
    $('.dt-buttons').hide();
    $('#dtItemEntityList_info').css('margin', '30px 0');
    $('#dtItemEntityList_paginate').css('margin', '36px 0');
    bindbtnFilterOnClick();
    initializeDatePicker("periodFrom");
    initializeDatePicker("periodTo");
});

function searchItem()
{
    $("#txtSearchItem").on("keyup", function ()
    {
        var value = $(this).val().toLowerCase();
        $("#dtItemEntityList tbody tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        }); 
    });
}

//1. for quantity
function isQuantityUnit(event, selector) {
    
    // uom section
    var indexId = selector.attr('id').substring(selector.attr('id').lastIndexOf('_') + 1, selector.attr('id').length);
    var uomItemId = $('#ddlItemEntityUOM_'+indexId).children('option:selected').val();
    if(uomItemId === "0") {
        alert("Please Select Uom First Before Input Quantity!");
        $('#ddlItemEntityUOM_'+indexId).focus();
        return false;
    }
    
    // key press section
    var key = window.event ? event.keyCode : event.which;
    if(event.keyCode === 8 || event.keyCode === 46) {
        return false;
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

function validate(evt)
{
    var theEvent = evt || window.event;
    
    if (theEvent.type === 'paste'){
        key = event.clipboardData.getData('text/plain');
    } else{
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[1]/;
    if(!regex.test(key)){
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.prefentDefault();
    }
}

function bindbtnFilterOnClick() {
    $('#btnFilterItem').click(function() {
        var itemType = $('#ddlItemType');
        var itemGroup = $('#ddlItemGroup');
        var orderType = $('#txtOrderType');
        var cusSales = $('#custSalesId');
        $('#frm2').append(itemType);
        $('#frm2').append(itemGroup);  
        $('#frm2').append($('#txtEntityId'));
        $('#frm2').append($('#txtTypeItemList'));
        if($('#txtOrderType').val() !== ''){
            $('#frm2').append(orderType);
        }
        if($('#txtInvType').val() !== ''){
            $('#frm2').append($('#txtInvType'));
        }
        if(cusSales.val() !== ''){
            $('#frm2').append(cusSales);
        }
        showLoading();
        $('#frm2').submit();
    });
}

//2. on add item event
function bindOnAddItemList() {
    $('#btnAddItemList').click(function() {
       var number = 1;
       var rowFilled = 0;
       var breaker = false;
       var custSales = $('#custSalesId').val();
       var ddlItemType = $('#ddlItemType').val(); 
       var invType = $('#txtInvType').val();
       var listOfItemListObjects = [];
       var tableHidden = $('#dtItemEntityListHidden tbody tr');
       var tableContractHidden = $('#dtItemEntityContractHidden tbody tr');
       $('#dtItemEntityList tbody tr').each(function() {                 
            var focus = 0; 
            if($(this).find('td:eq(0)').hasClass('dataTables_empty')) {
                alert('Cannot Add Item With Item List!');
                return false;
            }
            
            // validation section
            var sItem_sku = $('#txtItemEntityItemSKU_'+number);
            var sPart_no = $('#txtItemEntityPartNO_'+number);
            var sItem_name = $('#txtItemEntityItemName_'+number);
            var sItem_remarks = $('#txtItemEntityRemarks_'+number);
            var sUom = $('#ddlItemEntityUOM_'+number);
            var sQuantity = $('#txtItemEntityQuantity_'+number);
            var sUnit_price = $('#txtItemEntityUnitPrice_'+number);
            var sstartMeter = $('#txtStartMeter_'+number);
            var sEndMeter = $('#txtEndMeter_'+number);
            var sPrice = $('#txtItemEntityOriginalPrice_'+number);
            
            var item_sku = sItem_sku.val();
            var part_no = sPart_no.val();
            var item_name = sItem_name.val();
            var item_remarks = sItem_remarks.val();
            var start_meter = sstartMeter.val();
            var end_meter = sEndMeter.val();
            var uom = sUom.children('option:selected').val();
            var uomC = sUom.val();
            var uomName = sUom.children('option:selected').text();
            var quantity = sQuantity.val();
            if(sUnit_price.val() !== undefined) {
            var unit_price = removeNumberFormat(sUnit_price.val());
            }
            var price = $('#txtItemEntityOriginalPrice_'+number).val();
            
            if(item_remarks !== '' || (!isNaN(parseInt(quantity)) && parseInt(quantity) !== 0)) {
                rowFilled++;
                
                    if(isNaN(parseInt(quantity)) && ddlItemType !== '8' && item_sku !== undefined) {
                    alert('Please Input Quantity On Item SKU ' + item_sku);
                    focus = 2;
                    breaker = true;
                }
            }
            if(invType === 'Meter Reading') {
                if(!isNaN(parseInt(quantity)) && parseInt(quantity) !== 0) {
                    if(start_meter > end_meter) {
                        alert('Start Meter cannot be higher than End Meter!');
                        focus = 3;
                        breaker = true;
                    }
                    if(price === ''){
                        alert('Please enter the unit price!');
                        focus = 4;
                        breaker = true;
                    }
                }
            }
  
            // break the loop
            if(breaker) {
//                if(focus === 1) {
//                    scrollTo(sItem_remarks.attr('id'));
//                    sItem_remarks.focus();
//                } else 
                if(focus === 1) {
                    scrollTo(sUom.attr('id'));
                    sUom.focus();
                } else if(focus === 2) {
                    scrollTo(sQuantity.attr('id'));
                    sQuantity.focus();
                } else if(focus === 3) {
                    scrollTo(sEndMeter.attr('id'));
                    sEndMeter.focus();
                } else if(focus === 4) {
                    scrollTo(sPrice.attr('id'));
                    sPrice.focus();
                }
                return false;
            }
            
            // increment each row and what has filled
            // list of item list object
            if(uom !== '0' && (!isNaN(parseInt(quantity)) && parseInt(quantity) !== 0) && quantity !== undefined) {
                var itemObject = {
                    item_sku: item_sku,
                    part_no: part_no,
                    item_name: item_name,
                    item_remarks: item_remarks,
                    uom_id: uom,
                    uom_name: uomName,
                    uom_contract: uomC,
                    quantity: quantity,
                    price: price,
                    unit_price: unit_price,
                    start_meter: start_meter,
                    end_meter: end_meter
                };
                listOfItemListObjects.push(itemObject);
            }            
            number++;
        });
            
        // minimum add one item
        if(rowFilled === 0) {
           alert('Please Add 1 Item At Least!');
           return false;
        }
        if(invType === 'Meter Reading'){
            var from = $('#periodFrom');
            var to = $('#periodTo');
            if(from.val() === '' || from.val() === null){
                alert('Please fill the date period!');
                scrollTo(from.attr('id'));
                from.focus();
                return false;
            }
            if(to.val() === '' || to.val() === null){
                alert('Please fill the date period!');
                scrollTo(to.attr('id'));
                to.focus();
                return false;
            }
        }
      
        if(!breaker) {
            var confirm = window.confirm('Are You Sure Wanna Add This List Of Items ?');
            if(!confirm) {
                return false;
            }
            
            var orderType = $('#txtOrderType').val();

            if(ddlItemType === '8' && invType !== 'Meter Reading') {
                for(var index in listOfItemListObjects) {
                    var number = (parseInt(index)+1);
                    var itemRow = '<tr>';
                    itemRow += '<td><input type="text" id="itemName_'+number+'" class="nameHidden" name="txtItemEntityItemName_'+number+'" value="'+listOfItemListObjects[index].item_name+'"></td>';
                    itemRow += '<td><input type="text" id="remarks_'+number+'" class="remarkHidden" name="txtItemEntityRemarks_'+number+'" value="'+listOfItemListObjects[index].item_remarks+'"></td>';
                    itemRow += '<td><input type="text" id="quantity_'+number+'" class="qtyHidden" name="txtItemEntityQuantity_'+number+'" value="'+listOfItemListObjects[index].quantity+'"></td>';
                    itemRow += '<td><input type="text" id="unitPrice_'+number+'" class="unitPriceHidden" name="txtItemEntityUnitPrice_'+number+'" value="'+listOfItemListObjects[index].unit_price+'"></td>';
                    itemRow += '<td><input type="text" id="originalPrice_'+number+'" class="priceHidden" name="txtItemEntityOriginalPrice_'+number+'" value="'+listOfItemListObjects[index].price+'"></td>';
                    itemRow += '<td><input type="text" id="UOM_'+number+'" class="uomHidden" name="ddlItemEntityUOM_'+number+'" value="'+listOfItemListObjects[index].uom_id+'"></td>';
                    itemRow += '<td><input type="text" id="UOMName_'+number+'" class="uomNameHidden" name="ddlItemEntityUOMName_'+number+'" value="'+listOfItemListObjects[index].uom_name+'"></td>';
                    itemRow += '<td><input type="text" id="UOMContract_'+number+'" class="uomCHidden" name="itemEntityUOMContract_'+number+'" value="'+listOfItemListObjects[index].uom_contract+'"></td>';
                    itemRow += '</tr>';
                    $('#dtItemEntityContractHidden tbody').append(itemRow);
                }
            } else if(ddlItemType === '8' && invType === 'Meter Reading'){
                for(var index in listOfItemListObjects) {
                    var currentObj = listOfItemListObjects[index];
                    var same = false;
                    for (var j=0; j<tableContractHidden.length; j++) {
                        var row = $('#dtItemEntityContractHidden tbody tr:eq('+j+')');
                        var name = row.find('td:eq(0) input.nameHidden').val();
                        var uom = row.find('td:eq(7) input.uomCHidden').val();
                        if(currentObj.item_name === name && currentObj.uom_contract === uom) {
                            same = true;
                            break;
                        }
                    }
                    if(!same) {
                    var number = (parseInt(index)+1);
                    var itemRow = '<tr>';
                    itemRow += '<td><input type="text" id="itemName_'+number+'" class="nameHidden" name="txtItemEntityItemName_'+number+'" value="'+listOfItemListObjects[index].item_name+'"></td>';
                    itemRow += '<td><input type="text" id="remarks_'+number+'" class="remarkHidden" name="txtItemEntityRemarks_'+number+'" value="'+listOfItemListObjects[index].item_remarks+'"></td>';
                    itemRow += '<td><input type="text" id="quantity_'+number+'" class="qtyHidden" name="txtItemEntityQuantity_'+number+'" value="'+listOfItemListObjects[index].quantity+'"></td>';
                    itemRow += '<td><input type="text" id="unitPrice_'+number+'" class="unitPriceHidden" name="txtItemEntityUnitPrice_'+number+'" value="'+listOfItemListObjects[index].unit_price+'"></td>';
                    itemRow += '<td><input type="text" id="originalPrice_'+number+'" class="priceHidden" name="txtItemEntityOriginalPrice_'+number+'" value="'+listOfItemListObjects[index].price+'"></td>';
                    itemRow += '<td><input type="text" id="UOM_'+number+'" class="uomHidden" name="ddlItemEntityUOM_'+number+'" value="'+listOfItemListObjects[index].uom_id+'"></td>';
                    itemRow += '<td><input type="text" id="UOMName_'+number+'" class="uomNameHidden" name="ddlItemEntityUOMName_'+number+'" value="'+listOfItemListObjects[index].uom_name+'"></td>';
                    itemRow += '<td><input type="text" id="UOMContract_'+number+'" class="uomCHidden" name="itemEntityUOMContract_'+number+'" value="'+listOfItemListObjects[index].uom_contract+'"></td>';
                    itemRow += '<td><input type="text" id="startMeter_'+number+'" class="startMeter" name="startMeter_'+number+'" value="'+listOfItemListObjects[index].start_meter+'"></td>';
                    itemRow += '<td><input type="text" id="endMeter_'+number+'" class="endMeter" name="endMeter_'+number+'" value="'+listOfItemListObjects[index].end_meter+'"></td>';
                    itemRow += '</tr>';
                    $('#dtItemEntityContractHidden tbody').append(itemRow);
                } else {
                    row.find('td:eq(2) input.qtyHidden').val(listOfItemListObjects[index].quantity);
                    row.find('td:eq(3) input.unitPriceHidden').val(listOfItemListObjects[index].unit_price);
                    row.find('td:eq(4) input.priceHidden').val(listOfItemListObjects[index].price);
                    row.find('td:eq(5) input.uomHidden').val(listOfItemListObjects[index].uom_id);
                    row.find('td:eq(6) input.uomNameHidden').val(listOfItemListObjects[index].uom_name);
                    row.find('td:eq(8) input.startMeter').val(listOfItemListObjects[index].start_meter);
                    row.find('td:eq(9) input.endMeter').val(listOfItemListObjects[index].end_meter);
                    }
                }
            }
            else if(ddlItemType !== '8'){
            for(var i in listOfItemListObjects) {
                // get part no 
                var currentObject = listOfItemListObjects[i];
                var meet = false;
                for(var j = 0; j < tableHidden.length; j++) {
                   var row = $('#dtItemEntityListHidden tbody tr:eq('+j+')');
                   var sku = row.find('td:eq(0) input.itemHidden').val();
                   if(currentObject.item_sku === sku) {
                       meet = true;
                       break;
                   }
                }

                if(!meet) {
                        var number = (parseInt(index)+1);
                        var itemRow = '<tr>';                 
                        itemRow += '<td><input type="text" id="itemEntityItemSKU_'+number+'" class="itemHidden" name="txtItemEntityItemSKU_'+number+'" value="'+listOfItemListObjects[i].item_sku+'"></td>';
                        itemRow += '<td><input type="text" id="itemEntityPartNO_'+number+'" class="partNoHidden" name="txtItemEntityPartNO_'+number+'" value="'+listOfItemListObjects[i].part_no+'"></td>';
                        itemRow += '<td><input type="text" id="itemEntityItemName_'+number+'" class="nameHidden" name="txtItemEntityItemName_'+number+'" value="'+listOfItemListObjects[i].item_name+'"></td>';
                        itemRow += '<td><input type="text" id="itemEntityRemarks_'+number+'" class="remarkHidden" name="txtItemEntityRemarks_'+number+'" value="'+listOfItemListObjects[i].item_remarks+'"></td>';
                        itemRow += '<td><input type="text" id="itemEntityQuantity_'+number+'" class="qtyHidden" name="txtItemEntityQuantity_'+number+'" value="'+listOfItemListObjects[i].quantity+'"></td>';
                        itemRow += '<td><input type="text" id="itemEntityUnitPrice_'+number+'" class="unitPriceHidden" name="txtItemEntityUnitPrice_'+number+'" value="'+listOfItemListObjects[i].unit_price+'"></td>';
                        itemRow += '<td><input type="text" id="itemEntityOriginalPrice_'+number+'" class="priceHidden" name="txtItemEntityOriginalPrice_'+number+'" value="'+listOfItemListObjects[i].price+'"></td>';
                        itemRow += '<td><input type="text" id="itemEntityUOM_'+number+'" class="uomHidden" name="ddlItemEntityUOM_'+number+'" value="'+listOfItemListObjects[i].uom_id+'"></td>';
                        itemRow += '<td><input type="text" id="itemEntityUOMName_'+number+'" class="uomNameHidden" name="ddlItemEntityUOMName_'+number+'" value="'+listOfItemListObjects[i].uom_name+'"></td>';
                        itemRow += '<td><input type="text" id="itemEntityUOMContract_'+number+'" class="uomCHidden" name="itemEntityUOMContract_'+number+'" value="'+listOfItemListObjects[i].uom_contract+'"></td>';
                        itemRow += '</tr>';
                        $('#dtItemEntityListHidden tbody').append(itemRow);                 
                } else {
                    row.find('td:eq(3) input.remarkHidden').val(listOfItemListObjects[i].item_remarks);
                    row.find('td:eq(4) input.qtyHidden').val(listOfItemListObjects[i].quantity);
                    row.find('td:eq(5) input.unitPriceHidden').val(listOfItemListObjects[i].unit_price);
                    row.find('td:eq(6) input.priceHidden').val(listOfItemListObjects[i].price);
                    row.find('td:eq(7) input.uomHidden').val(listOfItemListObjects[i].uom_id);
                    row.find('td:eq(8) input.uomNameHidden').val(listOfItemListObjects[i].uom_name);
                }
            }
        }
            // opener selector           
            var typeItemListOpen = $('#txtTypeItemList').val();
            var serviceCall = $('#txtServiceCall').val();
            var aw = $('#dtItemEntityListHidden tbody tr');
            var wow = $('#dtItemEntityContractHidden tbody tr');
            if(typeItemListOpen === 'order') {               
            if(ddlItemType === '8') {
                $('#tblOrderItemDetail tbody #contract', opener.document).remove();
                var num = 0;
                    $('#txtTotalItemDetail', opener.document).val(aw.length+wow.length);
                    for(var index = 0; index < wow.length; index++) {
                        var item_name = wow.eq(index).find('td:eq(0) input.nameHidden').val();
                        var item_remarks = wow.eq(index).find('td:eq(1) input.remarkHidden').val();
                        var quantity = wow.eq(index).find('td:eq(2) input.qtyHidden').val();
                        var unit_price = wow.eq(index).find('td:eq(3) input.unitPriceHidden').val();
                        var price = wow.eq(index).find('td:eq(4) input.priceHidden').val();
                        var uomC = wow.eq(index).find('td:eq(7) input.uomCHidden').val();
                        if(aw.length>0){
                            num = (parseInt(index)+aw.length);
                        } else {
                            num = (parseInt(index)+1);
                        }
                        var itemDetailRow = '<tr id="contract">';
                        itemDetailRow += '<td style="width: 10px;" class="mgrPaddingLeft20 mgrTdPadTopBot20 borderBottom no">'+num+'.</td>';
                        itemDetailRow += '<td colspan="2" class="mgrTdPadTopBot20 borderBottom mgrPaddingLeft20></td>';
                        itemDetailRow += '<td class="mgrTdPadTopBot20 borderBottom mgrPaddingLeft20></td>';
                        itemDetailRow += '<td class="mgrTdPadTopBot20 borderBottom mgrPaddingLeft20 itemName">'+item_name+'<br><small><i>'+item_remarks+'</i></small></td>';
                        itemDetailRow += '<td class="mgrTdPadTopBot20 borderBottom mgrPaddingLeft20 uom">'+uomC+'</td>';
                        itemDetailRow += '<td class="mgrTdPadTopBot20 borderBottom mgrPaddingLeft20 quantity" style="text-align: right;">'+quantity+'</td>';
                        itemDetailRow += '<td colspan="2" class="mgrTdPadTopBot20 borderBottom mgrPaddingLeft20></td>';
                        itemDetailRow += '<td class="mgrTdPadTopBot20 borderBottom mgrPaddingLeft20></td>';
                        itemDetailRow += '<td hidden>';
                        itemDetailRow += '<input type="hidden" id="txtItemSKU_'+num+'" class="txtItemSKU" name="txtItemSKU_'+num+'" value="" readonly>';
                        itemDetailRow += '<input type="hidden" id="txtPartNo_'+num+'" class="txtPartNo" name="txtPartNo_'+num+'" value="" readonly>';
                        itemDetailRow += '<input type="hidden" id="txtItemName_'+num+'" class="txtItemName" name="txtItemName_'+number+'" value="'+item_name+'" readonly>';
                        itemDetailRow += '<input type="hidden" id="txtItemRemark_'+num+'" class="txtItemRemark" name="txtItemRemark_'+num+'" value="'+item_remarks+'" readonly>';
                        itemDetailRow += '<input type="hidden" id="txtUomName_'+num+'" class="txtUomName" name="txtUomName_'+num+'" value="'+uomC+'" readonly>';
                        itemDetailRow += '<input type="hidden" id="txtQuantity_'+num+'" class="txtQuantity" name="txtQuantity_'+num+'" value="'+quantity+'" readonly>';
                        itemDetailRow += '<input type="hidden" id="txtUnitPrice_'+num+'" class="txtUnitPrice" name="txtUnitPrice_'+num+'" value="'+unit_price+'" readonly>';
                        itemDetailRow += '<input type="hidden" id="txtTotalPrice_'+num+'" class="txtTotalPrice" name="txtTotalPrice_'+num+'" value="'+price+'" readonly>';
                        itemDetailRow += '<input type="hidden" id="txtUomId_'+num+'" class="txtUomId" name="txtUomId_'+num+'" value="0" readonly>';
                        itemDetailRow += '</td>';
                        itemDetailRow += '<td class="mgrPaddingLeft20 mgrPaddingRight20 mgrTdPadTopBot20 borderBottom" style="text-align: center;"><img src="../../include/mgr/include/images/MGR-LOGO/Trash.png" class="logoTbodyTableMgr" style="cursor: pointer !important;" onclick="deleteSelectedItem($(this));" alt="logo Delete Item"></td>';
                        itemDetailRow += '</tr>';
                        $('#tblOrderItemDetail tbody', opener.document).append(itemDetailRow);
                        }
                        var gstInclusive = $('#chkInclusiveGST', opener.document);
                        gstInclusive.attr({disabled: false});
                        $('#txtOrderSubTotal').hide();
                        $('#subTotal').hide();
                        $('#chkInclusiveGST').hide();
                        $('#gstTd').hide();
                        $('#txtOrderGST').hide();
                        $('#txtOrderGrandTotal').hide();
                        $('#grandTotal').hide();
                    }
                else if (ddlItemType !== '8'){
                    $('#tblOrderItemDetail tbody #noContract', opener.document).remove();
                    var subTotal = parseFloat(0);
                    $('#txtTotalItemDetail', opener.document).val(aw.length+wow.length);
                    for(var index = 0; index < aw.length; index++) {
                        var item_sku = aw.eq(index).find('td:eq(0) input.itemHidden').val();
                        var part_no = aw.eq(index).find('td:eq(1) input.partNoHidden').val();
                        var item_name = aw.eq(index).find('td:eq(2) input.nameHidden').val();                       
                        var item_remarks = aw.eq(index).find('td:eq(3) input.remarkHidden').val();
                        var quantity = aw.eq(index).find('td:eq(4) input.qtyHidden').val();
                        var unit_price = aw.eq(index).find('td:eq(5) input.unitPriceHidden').val();
                        var price = aw.eq(index).find('td:eq(6) input.priceHidden').val();
                        var uom_id = aw.eq(index).find('td:eq(7) input.uomHidden').val();
                        var uom_name = aw.eq(index).find('td:eq(8) input.uomNameHidden').val();
                        var num = 0;
                        if(wow.length>0) {
                            num = (parseInt(index)+wow.length);
                        } else {
                            num = (parseInt(index)+1);
                        }
                        var itemDetailRow = '<tr id="noContract">';
                        itemDetailRow += '<td style="width: 10px;" class="mgrPaddingLeft20 mgrTdPadTopBot20 borderBottom no">'+num+'.</td>';
                        itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom itemSku">'+item_sku+'</td>';
                        itemDetailRow += '<td class="mgrTdPadTopBot20 borderBottom mgrPaddingLeft20 partNo">'+part_no+'</td>';
                        itemDetailRow += '<td class="mgrTdPadTopBot20 borderBottom mgrPaddingLeft20 itemName">'+item_name+'<br><small><i>'+item_remarks+'</i></small></td>';
                        itemDetailRow += '<td class="mgrTdPadTopBot20 borderBottom mgrPaddingLeft20 uom">'+uom_name+'</td>';
                        itemDetailRow += '<td class="mgrTdPadTopBot20 borderBottom mgrPaddingLeft20 quantity" style="text-align: right;">'+quantity+'</td>';
                        itemDetailRow += '<td class="mgrTdPadTopBot20 borderBottom mgrPaddingLeft20 unitPrice" style="text-align: right;">'+getPriceFormattedNumber(price, 2)+'</td>';
                        itemDetailRow += '<td class="borderBottom mgrPaddingLeft20 total" style="text-align: right;">'+getPriceFormattedNumber(unit_price, 2)+'</td>';
                        itemDetailRow += '<td hidden>';
                        itemDetailRow += '<input type="hidden" id="txtItemSKU_'+num+'" class="txtItemSKU" name="txtItemSKU_'+num+'" value="'+item_sku+'" readonly>';
                        itemDetailRow += '<input type="hidden" id="txtPartNo_'+num+'" class="txtPartNo" name="txtPartNo_'+num+'" value="'+part_no+'" readonly>';
                        itemDetailRow += '<input type="hidden" id="txtItemName_'+num+'" class="txtItemName" name="txtItemName_'+num+'" value="'+item_name+'" readonly>';
                        itemDetailRow += '<input type="hidden" id="txtItemRemark_'+num+'" class="txtItemRemark" name="txtItemRemark_'+num+'" value="'+item_remarks+'" readonly>';
                        itemDetailRow += '<input type="hidden" id="txtUomName_'+num+'" class="txtUomName" name="txtUomName_'+num+'" value="'+uom_name+'" readonly>';
                        itemDetailRow += '<input type="hidden" id="txtQuantity_'+num+'" class="txtQuantity" name="txtQuantity_'+num+'" value="'+quantity+'" readonly>';
                        itemDetailRow += '<input type="hidden" id="txtUnitPrice_'+num+'" class="txtUnitPrice" name="txtUnitPrice_'+num+'" value="'+price+'" readonly>';
                        itemDetailRow += '<input type="hidden" id="txtTotalPrice_'+num+'" class="txtTotalPrice" name="txtTotalPrice_'+num+'" value="'+unit_price+'" readonly>';
                        itemDetailRow += '<input type="hidden" id="txtUomId_'+num+'" class="txtUomId" name="txtUomId_'+num+'" value="'+uom_id+'" readonly>';
                        itemDetailRow += '</td>';
                        itemDetailRow += '<td class="mgrPaddingLeft20 mgrPaddingRight20 mgrTdPadTopBot20 borderBottom" style="text-align: center;"><img src="../../include/mgr/include/images/MGR-LOGO/Trash.png" class="logoTbodyTableMgr" style="cursor: pointer !important;" onclick="deleteSelectedItem($(this));" alt="logo Delete Item"></td>';
                        itemDetailRow += '</tr>';
                        $('#tblOrderItemDetail tbody', opener.document).append(itemDetailRow);
                        subTotal += parseFloat(unit_price);                    
                    }
                    $('#tblOrderItemDetail tfoot input#txtOrderSubTotal', opener.document).val(subTotal);
                    $('#tblOrderItemDetail tfoot input#total', opener.document).val(subTotal);
                    $('#tblOrderItemDetail tfoot #subTotal', opener.document).text(getPriceFormattedNumber(subTotal, 2));
                    var gstInclusive = $('#chkInclusiveGST', opener.document);
                        gstInclusive.attr({disabled: false});
                    var gst = parseFloat(0);
                    if(!gstInclusive.is(':checked')) {
                        gst = 0.07;
                    }
                    var grandTotal = subTotal;
                    gst = (gst * subTotal).toFixed(2);   
    //                alert(gst);
    //                alert(grandTotal);
                    grandTotal += parseFloat(gst);
                    $('#tblOrderItemDetail tfoot #gstTd', opener.document).text(getPriceFormattedNumber(gst, 2));
                    $('#tblOrderItemDetail tfoot #txtOrderGST', opener.document).val(gst);
                    $('#tblOrderItemDetail tfoot #txtOrderGrandTotal', opener.document).val(grandTotal);
                    $('#tblOrderItemDetail tfoot #grandTotal', opener.document).text(getPriceFormattedNumber(grandTotal, 2));
                    }
            } else if(typeItemListOpen === 'do') {
                 if(ddlItemType === '8') {
                    var tableItemDetailOpener = $('#tblDeliverOrderItemDetail tbody #contract', opener.document);                    
                    tableItemDetailOpener.remove();
                    var subTotal = parseFloat(0);
                $('#txtTotalItemDetail', opener.document).val(aw.length+wow.length);
                for(var index = 0; index < wow.length; index++) {
                    var item_name = wow.eq(index).find('td:eq(0) input.nameHidden').val();
                    var item_remarks = wow.eq(index).find('td:eq(1) input.remarkHidden').val();
                    var quantity = wow.eq(index).find('td:eq(2) input.qtyHidden').val();
                    var unit_price = wow.eq(index).find('td:eq(3) input.unitPriceHidden').val();
                    var price = wow.eq(index).find('td:eq(4) input.priceHidden').val();
                    var uomC = wow.eq(index).find('td:eq(7) input.uomCHidden').val();
        
                    var num = 0;
                        if(aw.length>0) {
                            num = (parseInt(index)+aw.length);
                        } else {
                            num = (parseInt(index)+1);
                        }
                    var itemDetailRow = '<tr id="contract">';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20">'+num+'.</td>';
                    itemDetailRow += '<td colspan="3" class="mgrTdPadTopBot20 mgrPaddingLeft20">'+item_name+'<br><small><i>'+item_remarks+'</i></small></td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20"></td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20"></td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20">'+uomC+'</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20" style="text-align: right;">'+quantity+'</td>';
                    itemDetailRow += '<td hidden>';
                    itemDetailRow += '<input type="hidden" id="txtItemSKU_'+num+'" class="txtItemSKU" name="txtItemSKU_'+num+'" value="" readonly>';
                    itemDetailRow += '<input type="hidden" id="txtPartNo_'+num+'" class="txtPartNo" name="txtPartNo_'+num+'" value="" readonly>';
                    itemDetailRow += '<input type="hidden" id="txtItemName_'+num+'" name="txtItemName_'+num+'" class="txtItemName" value="'+item_name+'">';
                    itemDetailRow += '<input type="hidden" id="txtItemRemark_'+num+'" name="txtItemRemark_'+num+'" class="txtItemRemark" value="'+item_remarks+'">';
                    itemDetailRow += '<input type="hidden" id="txtUomName_'+num+'" name="txtUomName_'+num+'" class="txtUomName" value="'+uomC+'">';
                    itemDetailRow += '<input type="hidden" id="txtOrderQuantity_'+num+'" name="txtOrderQuantity_'+num+'" class="txtOrderQuantity" value="">';
                    itemDetailRow += '<input type="hidden" id="txtDeliveryQuantity_'+num+'" name="txtDeliveryQuantity_'+num+'" class="txtDeliveryQuantity" value="'+quantity+'">';
                    itemDetailRow += '<input type="hidden" id="txtUnitPrice_'+num+'" class="txtUnitPrice" name="txtUnitPrice_'+num+'" value="'+unit_price+'" readonly>';
                    itemDetailRow += '<input type="hidden" id="txtTotalPrice_'+num+'" class="txtTotalPrice" name="txtTotalPrice_'+num+'" value="'+price+'" readonly>';
                    itemDetailRow += '<input type="hidden" id="txtUomId_'+num+'" class="txtUomId" name="txtUomId_'+num+'" value="0" readonly>';
                    itemDetailRow += '</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20" style="text-align: center;"><img src="../../include/mgr/include/images/MGR-LOGO/Trash.png" class="logoTheadTableMgr bye" alt="logo Delete Item" onclick="deleteSelectedItem($(this));"></td>';
                    itemDetailRow += '</tr>';
                    $('#tblDeliverOrderItemDetail tbody', opener.document).append(itemDetailRow);
                    }
                    $('#txtOrderSubTotal').hide();
                    $('#subTotal').hide();
                    $('#chkInclusiveGST').hide();
                    $('#gstTd').hide();
                    $('#txtOrderGST').hide();
                    $('#txtOrderGrandTotal').hide();
                    $('#grandTotal').hide();
                }
                else if(ddlItemType !== '8') {
                $('#tblDeliverOrderItemDetail tbody #noContract', opener.document).remove();                    
                var subTotal = parseFloat(0);
                $('#txtTotalItemDetail', opener.document).val(aw.length+wow.length);
                for(var index=0; index < aw.length; index++) {
                    var item_sku = aw.eq(index).find('td:eq(0) input.itemHidden').val();
                    var part_no = aw.eq(index).find('td:eq(1) input.partNoHidden').val();
                    var item_name = aw.eq(index).find('td:eq(2) input.nameHidden').val();                       
                    var item_remarks = aw.eq(index).find('td:eq(3) input.remarkHidden').val();
                    var quantity = aw.eq(index).find('td:eq(4) input.qtyHidden').val();
                    var unit_price = aw.eq(index).find('td:eq(5) input.unitPriceHidden').val();
                    var price = aw.eq(index).find('td:eq(6) input.priceHidden').val();
                    var uom_id = aw.eq(index).find('td:eq(7) input.uomHidden').val();
                    var uom_name = aw.eq(index).find('td:eq(8) input.uomNameHidden').val();

                    var num = 0;
                        if(wow.length>0) {
                            num = (parseInt(index)+wow.length);
                        } else {
                            num = (parseInt(index)+1);
                        }
                    var itemDetailRow = '<tr id="noContract">';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20">'+num+'.</td>';
                    itemDetailRow += '<td id="sku_'+num+'" class="mgrTdPadTopBot20 mgrPaddingLeft20">'+item_sku+'</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20">'+part_no+'</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20">'+item_name+'<br><small><i>'+item_remarks+'</i></small></td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20"></td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20"></td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20">'+uom_name+'</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 checkStock_'+num+'" style="text-align: right;">'+quantity+'</td>';
                    itemDetailRow += '<td hidden>';
                    itemDetailRow += '<input type="hidden" id="txtItemSKU_'+num+'" name="txtItemSKU_'+num+'" class="txtItemSKU" value="'+item_sku+'">';
                    itemDetailRow += '<input type="hidden" id="txtPartNo_'+num+'" name="txtPartNo_'+num+'" class="txtPartNo" value="'+part_no+'">';
                    itemDetailRow += '<input type="hidden" id="txtItemName_'+num+'" name="txtItemName_'+num+'" class="txtItemName" value="'+item_name+'">';
                    itemDetailRow += '<input type="hidden" id="txtItemRemark_'+num+'" name="txtItemRemark_'+num+'" class="txtItemRemark" value="'+item_remarks+'">';
                    itemDetailRow += '<input type="hidden" id="txtUomName_'+num+'" name="txtUomName_'+num+'" class="txtUomName" value="'+uom_name+'">';
                    itemDetailRow += '<input type="hidden" id="txtOrderQuantity_'+num+'" name="txtOrderQuantity_'+num+'" class="txtOrderQuantity" value="">';
                    itemDetailRow += '<input type="hidden" id="txtDeliveryQuantity_'+num+'" name="txtDeliveryQuantity_'+num+'" class="txtDeliveryQuantity" value="'+quantity+'">';
                    itemDetailRow += '<input type="hidden" id="txtUnitPrice_'+num+'" class="txtUnitPrice" name="txtUnitPrice_'+num+'" value="'+price+'" readonly>';
                    itemDetailRow += '<input type="hidden" id="txtTotalPrice_'+num+'" class="txtTotalPrice" name="txtTotalPrice_'+num+'" value="'+unit_price+'" readonly>';
                    itemDetailRow += '<input type="hidden" id="txtUomId_'+num+'" name="txtUomId_'+num+'" class="txtUomId" value="'+uom_id+'">';
                    itemDetailRow += '</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20" style="text-align: center;"><img src="../../include/mgr/include/images/MGR-LOGO/Trash.png" class="logoTheadTableMgr bye" alt="logo Delete Item" onclick="deleteSelectedItem($(this));"></td>';
                    itemDetailRow += '</tr>';
                    $('#tblDeliverOrderItemDetail tbody', opener.document).append(itemDetailRow);
                    subTotal += parseFloat(unit_price);
                    }
                    $('#tblDeliverOrderItemDetail tfoot input#total', opener.document).val(subTotal);
                $('#tblDeliverOrderItemDetail tfoot input#txtSubTotal', opener.document).val(subTotal);
                var gstToBeCalculate = 0.00;
                var orderId = $('#txtOrderEntryId', opener.document).val();
                if(orderId === '0' || (parseInt($('#txtGst', opener.document).val()) !== 0 && orderId !== '0')) {
                    gstToBeCalculate = 0.07;
                }

                var grand_total = subTotal;
                gstToBeCalculate = parseFloat((parseFloat(gstToBeCalculate) * parseFloat(subTotal)).toFixed(2));
                grand_total += gstToBeCalculate;
                $('#txtGst', opener.document).val(gstToBeCalculate);
                $('#txtGrandTotal', opener.document).val(grand_total);       
                }   
            } else if(typeItemListOpen === 'invoice') {
                if(ddlItemType !== '8') {
                $('#tblInvoiceItemDetail tbody #noContract', opener.document).remove();
//                var listModifyObject = [];
//                for(var i = 1; i <= tableItemDetailOpener.length; i++) {
//                   var modifyObject = {
//                       partNo: $('#txtPartNo_'+i, opener.document).val(),
//                       price: parseFloat($('#txtUnitPrice_'+i, opener.document).val()),
//                       item_uom_id: parseInt($('#txtUomId_'+i, opener.document).val())
//                   };
//                   listModifyObject.push(modifyObject);                    
//                }
//                tableItemDetailOpener.remove();
                var subTotal = parseFloat(0);
                $('#txtTotalItemDetail', opener.document).val(aw.length+wow.length);
                for(var index = 0; index < aw.length; index++)
                {
                    var item_sku = aw.eq(index).find('td:eq(0) input.itemHidden').val();
                    var part_no = aw.eq(index).find('td:eq(1) input.partNoHidden').val();
                    var item_name = aw.eq(index).find('td:eq(2) input.nameHidden').val();                       
                    var item_remarks = aw.eq(index).find('td:eq(3) input.remarkHidden').val();
                    var quantity = aw.eq(index).find('td:eq(4) input.qtyHidden').val();
                    var unit_price = aw.eq(index).find('td:eq(5) input.unitPriceHidden').val();
                    var price = aw.eq(index).find('td:eq(6) input.priceHidden').val();
                    var uom_id = aw.eq(index).find('td:eq(7) input.uomHidden').val();
                    var uom_name = aw.eq(index).find('td:eq(8) input.uomNameHidden').val();
                    
                    var unitPriceParent = $('#txtInvoiceUnitPrice_'+number+'', opener.document).val();                    
                    
                    var num = 0;
                        if(wow.length>0) {
                            num = (parseInt(index)+wow.length);
                        } else {
                            num = (parseInt(index)+1);
                        }
                    var itemDetailRow = '<tr id="noContract">';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+num+'.</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+item_sku+'</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+part_no+'</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+item_name+'<br><small><i>'+item_remarks+'</i></small></td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+uom_name+'</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom" style="text-align: right;">'+quantity+'</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom"><input type="text" style="text-align: right;" id="txtInvoiceUnitPrice_'+num+'" name="txtInvoiceUnitPrice_'+num+'" value="'+getPriceFormattedNumber(0, 2)+'" class="mgrFormDesign invoiceUnitPrice" onkeypress="return isNumberPlusComma(event, $(this))" onchange="invoiceUnitPriceOnChange($(this))"><input type="hidden" class="sellingPrice" value="'+price+'" id="sellingPrice_'+num+'"></td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+getPriceFormattedNumber(0, 2)+'</td>';
//                    var notExisting = true;
//                    if(listModifyObject.length === 0) {
//                        itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom"><input type="text" style="text-align: right;" id="txtInvoiceUnitPrice_'+number+'" name="txtInvoiceUnitPrice_'+number+'" value="'+getPriceFormattedNumber(price, 2)+'" class="mgrFormDesign invoiceUnitPrice" onkeypress="return isNumberPlusComma(event, $(this))" onchange="invoiceUnitPriceOnChange($(this))"></td>';
//                        itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+getPriceFormattedNumber(unit_price, 2)+'</td>';
//                    } else {
//                        for(var index in listModifyObject) {
//                            if((parseInt(listModifyObject[index].price) === 0 || parseInt(listModifyObject[index].price) !== 0) && (listModifyObject[index].partNo === part_no && listModifyObject[index].item_uom_id !== parseInt(uom_id))) {
//                                itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom"><input type="text" style="text-align: right;" id="txtInvoiceUnitPrice_'+number+'" name="txtInvoiceUnitPrice_'+number+'" value="'+getPriceFormattedNumber(price, 2)+'" class="mgrFormDesign invoiceUnitPrice" onkeypress="return isNumberPlusComma(event, $(this))" onchange="invoiceUnitPriceOnChange($(this))"></td>';
//                                itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+getPriceFormattedNumber(unit_price, 2)+'</td>';
//                                notExisting = false;
//                            } else if(listModifyObject[index].partNo === part_no && listModifyObject[index].item_uom_id === parseInt(uom_id)) {
//                                price = listModifyObject[index].price;
//                                unit_price = price * quantity;
//                                itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom"><input type="text" style="text-align: right;" id="txtInvoiceUnitPrice_'+number+'" name="txtInvoiceUnitPrice_'+number+'" value="'+getPriceFormattedNumber(price, 2)+'" class="mgrFormDesign invoiceUnitPrice" onkeypress="return isNumberPlusComma(event, $(this))" onchange="invoiceUnitPriceOnChange($(this))"></td>';
//                                itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+getPriceFormattedNumber(unit_price, 2)+'</td>';
//                                notExisting = false;
//                           }
//                        }
//                    }
//                    
//                    // for not existing one
//                    if(notExisting && listModifyObject.length > 0) {
//                        itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom"><input type="text" style="text-align: right;" id="txtInvoiceUnitPrice_'+number+'" name="txtInvoiceUnitPrice_'+number+'" value="'+getPriceFormattedNumber(price, 2)+'" class="mgrFormDesign invoiceUnitPrice" onkeypress="return isNumberPlusComma(event, $(this))" onchange="invoiceUnitPriceOnChange($(this))"></td>';
//                        itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+getPriceFormattedNumber(unit_price, 2)+'</td>';
//                    }
                    
                    itemDetailRow += '<td hidden>';
                    itemDetailRow += '<input type="hidden" id="txtItemSKU_'+num+'" name="txtItemSKU_'+num+'" class="txtItemSKU" value="'+item_sku+'">';
                    itemDetailRow += '<input type="hidden" id="txtPartNo_'+num+'" name="txtPartNo_'+num+'" class="txtPartNo" value="'+part_no+'">';
                    itemDetailRow += '<input type="hidden" id="txtItemName_'+num+'" name="txtItemName_'+num+'" class="txtItemName" value="'+item_name+'">';
                    itemDetailRow += '<input type="hidden" id="txtItemRemark_'+num+'" name="txtItemRemark_'+num+'" class="txtItemRemark" value="'+item_remarks+'">';
                    itemDetailRow += '<input type="hidden" id="txtUomName_'+num+'" name="txtUomName_'+num+'" class="txtUomName" value="'+uom_name+'">'; 
                    itemDetailRow += '<input type="hidden" id="txtQuantity_'+num+'" name="txtQuantity_'+num+'" class="txtQuantity" value="'+quantity+'">';
                    itemDetailRow += '<input type="hidden" id="txtUnitPrice_'+num+'" class="txtUnitPrice" name="txtUnitPrice_'+num+'" value="'+0+'" readonly>';
                    itemDetailRow += '<input type="hidden" id="txtTotalPrice_'+num+'" class="txtTotalPrice" name="txtTotalPrice_'+num+'" value="'+0+'" readonly>';
                    itemDetailRow += '<input type="hidden" id="txtUomId_'+num+'" name="txtUomId_'+num+'" class="txtUomId" value="'+uom_id+'">';
                    itemDetailRow += '</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingRight20 mgrPaddingLeft20 borderBottom" style="text-align: center;"><img src="../../include/mgr/include/images/MGR-LOGO/Trash.png" class="logoTheadTableMgr bye fromDO" onclick="deleteSelectedItem($(this));" alt="logo Delete Item"></td>';
                    itemDetailRow += '</tr>';
                    $('#tblInvoiceItemDetail tbody', opener.document).append(itemDetailRow);
                    subTotal += parseFloat(0);
                }
                $('#tblInvoiceItemDetail tfoot input#total', opener.document).val(subTotal);
                
                var gstPreview = $('#txtInvoiceGST', opener.document);
                gstPreview.prop('readonly', false);
                var inclusiveGstCB = $('#chkInclusiveGST', opener.document);
                    inclusiveGstCB.attr({disabled: false});
                
                var gstValue = parseFloat(0.00);
                var orderId = $('#txtOrderEntryId', opener.document).val();
//                if(orderId === '0' || (parseInt(gst.val()) !== 0 && orderId !== '0')) {
//                    gstValue = (parseFloat(0.07) * parseFloat(subTotal)).toFixed(2);
//                } 
                if(inclusiveGstCB.is(':checked'))
                {
                    $('#grandTotalDisplay', opener.document).text(getPriceFormattedNumber(subTotal, 2));
                    $('#txtGrandTotal', opener.document).val(parseFloat(subTotal));
                    gstValue = (parseFloat(0.07) * parseFloat(subTotal)).toFixed(2);
                    var subTotal2 = parseFloat(subTotal) + parseFloat(gstValue);
                    $('#subTotalPreview', opener.document).text(getPriceFormattedNumber(subTotal2, 2));
                    $('#txtSubTotal', opener.document).val(subTotal2);
                    gstPreview.val(getPriceFormattedNumber(gstValue, 2));
                    var gstHiddenOne = $('#txtGST', opener.document);                
                    gstHiddenOne.val((parseFloat(0.07) * parseFloat(subTotal)).toFixed(2));
                }
                else
                {
                    $('#subTotalPreview', opener.document).text(getPriceFormattedNumber(subTotal, 2));
                    $('#txtSubTotal', opener.document).val(parseFloat(subTotal));
                    gstValue = (parseFloat(0.07) * parseFloat(subTotal)).toFixed(2);
                    var grandTotal = parseFloat(subTotal) + parseFloat(gstValue);
                    $('#grandTotalDisplay', opener.document).text(getPriceFormattedNumber(grandTotal, 2));
                    $('#txtGrandTotal', opener.document).val(grandTotal);
                    gstPreview.val(getPriceFormattedNumber(gstValue, 2));
                    var gstHiddenOne = $('#txtGST', opener.document);                
                    gstHiddenOne.val((parseFloat(0.07) * parseFloat(subTotal)).toFixed(2));
                }                
            } else if(ddlItemType === '8' && invType !== 'Meter Reading')
            {
                var tableItemDetailOpener = $('#tblInvoiceItemDetail tbody #contract', opener.document);
//                var listModifyObject = [];
//                for(var i = 1; i <= tableItemDetailOpener.length; i++) {
//                   var modifyObject = {
//                       partNo: $('#txtPartNo_'+i, opener.document).val(),
//                       price: parseFloat($('#txtUnitPrice_'+i, opener.document).val()),
//                       item_uom_id: parseInt($('#txtUomId_'+i, opener.document).val())
//                   };
//                   listModifyObject.push(modifyObject);                    
//                }
                tableItemDetailOpener.remove();
                var subTotal = parseFloat(0);
                $('#txtTotalItemDetail', opener.document).val(wow.length+aw.length);
                for(var index = 0; index < wow.length; index++)
                {
                    var item_name = wow.eq(index).find('td:eq(0) input.nameHidden').val();
                    var item_remarks = wow.eq(index).find('td:eq(1) input.remarkHidden').val();
                    var quantity = wow.eq(index).find('td:eq(2) input.qtyHidden').val();
                    var uomC = wow.eq(index).find('td:eq(7) input.uomCHidden').val();
                    var price = wow.eq(index).find('td:eq(4) input.priceHidden').val();
                    var unit_price = wow.eq(index).find('td:eq(3) input.unitPriceHidden').val();
                    
                    var unitPriceParent = $('#txtInvoiceUnitPrice_'+number+'', opener.document).val();                    
                    
                    var num = 0;
                        if(aw.length>0) {
                            num = (parseInt(index)+aw.length);
                        } else {
                            num = (parseInt(index)+1);
                        }
                    var itemDetailRow = '<tr>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+num+'.</td>';
                    itemDetailRow += '<td colspan="3" class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+item_name+'<br><small><i>'+item_remarks+'</i></small></td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+uomC+'</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom" style="text-align: center;">'+quantity+'</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom"><input type="text" style="text-align: right;" id="txtInvoiceUnitPrice_'+num+'" name="txtInvoiceUnitPrice_'+num+'" value="'+getPriceFormattedNumber(price, 2)+'" class="mgrFormDesign invoiceUnitPrice" onkeypress="return isNumberPlusComma(event, $(this))" onchange="invoiceUnitPriceOnChange($(this))"></td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+getPriceFormattedNumber(unit_price, 2)+'</td>';
//                      var notExisting = true;
//                    if(listModifyObject.length === 0) {
//                        itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom"><input type="text" style="text-align: right;" id="txtInvoiceUnitPrice_'+number+'" name="txtInvoiceUnitPrice_'+number+'" value="'+getPriceFormattedNumber(price, 2)+'" class="mgrFormDesign invoiceUnitPrice" onkeypress="return isNumberPlusComma(event, $(this))" onchange="invoiceUnitPriceOnChange($(this))"></td>';
//                        itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+getPriceFormattedNumber(unit_price, 2)+'</td>';
//                    } else {
//                        for(var index in listModifyObject) {
//                            if((parseInt(listModifyObject[index].price) === 0 || parseInt(listModifyObject[index].price) !== 0) && (listModifyObject[index].partNo === part_no && listModifyObject[index].item_uom_id !== parseInt(uom_id))) {
//                                itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom"><input type="text" style="text-align: right;" id="txtInvoiceUnitPrice_'+number+'" name="txtInvoiceUnitPrice_'+number+'" value="'+getPriceFormattedNumber(price, 2)+'" class="mgrFormDesign invoiceUnitPrice" onkeypress="return isNumberPlusComma(event, $(this))" onchange="invoiceUnitPriceOnChange($(this))"></td>';
//                                itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+getPriceFormattedNumber(unit_price, 2)+'</td>';
//                                notExisting = false;
//                            } else if(listModifyObject[index].partNo === part_no && listModifyObject[index].item_uom_id === parseInt(uom_id)) {
//                                price = listModifyObject[index].price;
//                                unit_price = price * quantity;
//                                itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom"><input type="text" style="text-align: right;" id="txtInvoiceUnitPrice_'+number+'" name="txtInvoiceUnitPrice_'+number+'" value="'+getPriceFormattedNumber(price, 2)+'" class="mgrFormDesign invoiceUnitPrice" onkeypress="return isNumberPlusComma(event, $(this))" onchange="invoiceUnitPriceOnChange($(this))"></td>';
//                                itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+getPriceFormattedNumber(unit_price, 2)+'</td>';
//                                notExisting = false;
//                           }
//                        }
//                    }
//                    
//                    // for not existing one
//                    if(notExisting && listModifyObject.length > 0) {
//                        itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom"><input type="text" style="text-align: right;" id="txtInvoiceUnitPrice_'+number+'" name="txtInvoiceUnitPrice_'+number+'" value="'+getPriceFormattedNumber(price, 2)+'" class="mgrFormDesign invoiceUnitPrice" onkeypress="return isNumberPlusComma(event, $(this))" onchange="invoiceUnitPriceOnChange($(this))"></td>';
//                        itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+getPriceFormattedNumber(unit_price, 2)+'</td>';
//                    }
                    
                    itemDetailRow += '<td hidden>';
                    itemDetailRow += '<input type="hidden" id="txtItemSKU_'+num+'" class="txtItemSKU" name="txtItemSKU_'+num+'" value="" readonly>';
                    itemDetailRow += '<input type="hidden" id="txtPartNo_'+num+'" class="txtPartNo" name="txtPartNo_'+num+'" value="" readonly>';
                    itemDetailRow += '<input type="hidden" id="txtItemName_'+num+'" name="txtItemName_'+num+'" class="txtItemName" value="'+item_name+'">';
                    itemDetailRow += '<input type="hidden" id="txtItemRemark_'+num+'" name="txtItemRemark_'+num+'" class="txtItemRemark" value="'+item_remarks+'">';
                    itemDetailRow += '<input type="hidden" id="txtUomName_'+num+'" name="txtUomName_'+num+'" class="txtUomName" value="'+uomC+'">'; 
                    itemDetailRow += '<input type="hidden" id="txtQuantity_'+num+'" name="txtQuantity_'+num+'" class="txtQuantity" value="'+quantity+'">';
                    itemDetailRow += '<input type="hidden" id="txtUnitPrice_'+num+'" class="txtUnitPrice" name="txtUnitPrice_'+num+'" value="'+price+'" readonly>';
                    itemDetailRow += '<input type="hidden" id="txtTotalPrice_'+num+'" class="txtTotalPrice" name="txtTotalPrice_'+num+'" value="'+unit_price+'" readonly>';
                    itemDetailRow += '<input type="hidden" id="txtUomId_'+num+'" name="txtUomId_'+num+'" class="txtUomId" value="0">';
                    itemDetailRow += '</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingRight20 mgrPaddingLeft20 borderBottom" style="text-align: center;"><img src="../../include/mgr/include/images/MGR-LOGO/Trash.png" class="logoTheadTableMgr bye fromDO" onclick="deleteSelectedItem($(this));" alt="logo Delete Item"></td>';
                    itemDetailRow += '</tr>';
                    $('#tblInvoiceItemDetail tbody', opener.document).append(itemDetailRow);
                    subTotal += parseFloat(unit_price);
                    }
                    $('#tblInvoiceItemDetail tfoot #total', opener.document).val(parseFloat(subTotal));
                
                var gstPreview = $('#txtInvoiceGST', opener.document);
                gstPreview.prop('readonly', false);
                var inclusiveGstCB = $('#chkInclusiveGST', opener.document);
                    inclusiveGstCB.attr({disabled: false});
                
                var gstValue = parseFloat(0.00);
                var orderId = $('#txtOrderEntryId', opener.document).val();
//                if(orderId === '0' || (parseInt(gst.val()) !== 0 && orderId !== '0')) {
//                    gstValue = (parseFloat(0.07) * parseFloat(subTotal)).toFixed(2);
//                } 
                if(inclusiveGstCB.is(':checked'))
                {
                    $('#grandTotalDisplay', opener.document).text(getPriceFormattedNumber(subTotal, 2));
                    $('#txtGrandTotal', opener.document).val(parseFloat(subTotal));
                    gstValue = (parseFloat(0.07) * parseFloat(subTotal)).toFixed(2);
                    var subTotal2 = parseFloat(subTotal) - parseFloat(gstValue);
                    $('#subTotalPreview', opener.document).text(getPriceFormattedNumber(subTotal2, 2));
                    $('#txtSubTotal', opener.document).val(subTotal2);
                    gstPreview.val(getPriceFormattedNumber(gstValue, 2));
                    var gstHiddenOne = $('#txtGST', opener.document);                
                    gstHiddenOne.val((parseFloat(0.07) * parseFloat(subTotal)).toFixed(2));
                }
                else
                {
                    $('#subTotalPreview', opener.document).text(getPriceFormattedNumber(subTotal, 2));
                    $('#txtSubTotal', opener.document).val(parseFloat(subTotal));
                    gstValue = (parseFloat(0.07) * parseFloat(subTotal)).toFixed(2);
                    var grandTotal = parseFloat(subTotal) + parseFloat(gstValue);
                    $('#grandTotalDisplay', opener.document).text(getPriceFormattedNumber(grandTotal, 2));
                    $('#txtGrandTotal', opener.document).val(grandTotal);
                    gstPreview.val(getPriceFormattedNumber(gstValue, 2));
                    var gstHiddenOne = $('#txtGST', opener.document);                
                    gstHiddenOne.val((parseFloat(0.07) * parseFloat(subTotal)).toFixed(2));
                }                          
            } else if(ddlItemType === '8' && invType === 'Meter Reading')
            {
                var period1 = $('#periodFrom').val();
                var period2 = $('#periodTo').val();
                var tableItemDetailOpener = $('#tblInvoiceItemDetail tbody tr', opener.document);
                tableItemDetailOpener.remove();
                var subTotal = parseFloat(0);
                $('#txtTotalItemDetail', opener.document).val(wow.length);
                for(var index = 0; index < wow.length; index++)
                {
                    var item_name = wow.eq(index).find('td:eq(0) input.nameHidden').val();
                    var item_remarks = wow.eq(index).find('td:eq(1) input.remarkHidden').val();
                    var quantity = wow.eq(index).find('td:eq(2) input.qtyHidden').val();
                    var uomC = wow.eq(index).find('td:eq(7) input.uomCHidden').val();
                    var price = wow.eq(index).find('td:eq(4) input.priceHidden').val();
                    var unit_price = wow.eq(index).find('td:eq(3) input.unitPriceHidden').val();
                    var start_meter = wow.eq(index).find('td:eq(8) input.startMeter').val();
                    var end_meter = wow.eq(index).find('td:eq(9) input.endMeter').val();
                    
                    var unitPriceParent = $('#txtInvoiceUnitPrice_'+number+'', opener.document).val();                    
                    var num = (parseInt(index)+1);
                    var itemDetailRow = '<tr>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+num+'.</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">METER</td>';
                    itemDetailRow += '<td colspan="2" class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+item_name+'<br><small><i>Start Meter: '+start_meter+'</i></small><br><small><i>End Meter: '+end_meter+'</i></small></td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+uomC+'</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom" style="text-align: center;">'+quantity+'</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom"><input type="text" style="text-align: right;" id="txtInvoiceUnitPrice_'+num+'" name="txtInvoiceUnitPrice_'+num+'" value="'+getPriceFormattedNumber(price, 4)+'" class="mgrFormDesign invoiceUnitPrice" onkeypress="return isNumberPlusComma(event, $(this))" onchange="invoiceUnitPriceOnChange($(this))"></td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">'+getPriceFormattedNumber(unit_price, 4)+'</td>';
                    
                    itemDetailRow += '<td hidden>';
                    itemDetailRow += '<input type="hidden" id="txtItemSKU_'+num+'" class="txtItemSKU" name="txtItemSKU_'+num+'" value="METER" readonly>';
                    itemDetailRow += '<input type="hidden" id="txtPartNo_'+num+'" class="txtPartNo" name="txtPartNo_'+num+'" value="" readonly>';
                    itemDetailRow += '<input type="hidden" id="txtItemName_'+num+'" name="txtItemName_'+num+'" class="txtItemName" value="'+item_name+'">';
                    itemDetailRow += '<input type="hidden" id="txtItemRemark_'+num+'" name="txtItemRemark_'+num+'" class="txtItemRemark" value="">';
                    itemDetailRow += '<input type="hidden" id="txtUomName_'+num+'" name="txtUomName_'+num+'" class="txtUomName" value="'+uomC+'">'; 
                    itemDetailRow += '<input type="hidden" id="txtQuantity_'+num+'" name="txtQuantity_'+num+'" class="txtQuantity" value="'+quantity+'">';
                    itemDetailRow += '<input type="hidden" id="txtUnitPrice_'+num+'" class="txtUnitPrice" name="txtUnitPrice_'+num+'" value="'+price+'" readonly>';
                    itemDetailRow += '<input type="hidden" id="txtTotalPrice_'+num+'" class="txtTotalPrice" name="txtTotalPrice_'+num+'" value="'+unit_price+'" readonly>';
                    itemDetailRow += '<input type="hidden" id="txtUomId_'+num+'" name="txtUomId_'+num+'" class="txtUomId" value="0">';
                    itemDetailRow += '<input type="text" id="startMeter_'+num+'" name="startMeter_'+num+'" class="startMeter" value="'+start_meter+'">';
                    itemDetailRow += '<input type="text" id="endMeter_'+num+'" name="endMeter_'+num+'" class="endMeter" value="'+end_meter+'">';
                    itemDetailRow += '</td>';
                    itemDetailRow += '<td class="mgrTdPadTopBot20 mgrPaddingRight20 mgrPaddingLeft20 borderBottom" style="text-align: center;"><img src="../../include/mgr/include/images/MGR-LOGO/Trash.png" class="logoTheadTableMgr bye fromDO" onclick="deleteSelectedItem($(this));" alt="logo Delete Item"></td>';
                    itemDetailRow += '</tr>';
                    $('#tblInvoiceItemDetail tbody', opener.document).append(itemDetailRow);
                    subTotal += parseFloat(unit_price);
                    }
                    $('#tblInvoiceItemDetail tfoot #total', opener.document).val(parseFloat(subTotal));
                
                $('#txtInvoiceAdditionalRemarks', opener.document).html('Period From: '+period1+' to '+period2+'');
                $('#MRStartDate', opener.document).val(period1);
                $('#MREndDate', opener.document).val(period2);
                var gstPreview = $('#txtInvoiceGST', opener.document);
                gstPreview.prop('readonly', false);
                var inclusiveGstCB = $('#chkInclusiveGST', opener.document);
                    inclusiveGstCB.attr({disabled: false});
                
                var gstValue = parseFloat(0.0000);
                var orderId = $('#txtOrderEntryId', opener.document).val();
                if(inclusiveGstCB.is(':checked'))
                {
                    $('#grandTotalDisplay', opener.document).text(getPriceFormattedNumber(subTotal, 4));
                    $('#txtGrandTotal', opener.document).val(parseFloat(subTotal));
                    gstValue = (parseFloat(0.07) * parseFloat(subTotal)).toFixed(4);
                    var subTotal2 = parseFloat(subTotal) - parseFloat(gstValue);
                    $('#subTotalPreview', opener.document).text(getPriceFormattedNumber(subTotal2, 4));
                    $('#txtSubTotal', opener.document).val(subTotal2);
                    gstPreview.val(getPriceFormattedNumber(gstValue, 4));
                    var gstHiddenOne = $('#txtGST', opener.document);                
                    gstHiddenOne.val((parseFloat(0.07) * parseFloat(subTotal)));
                }
                else
                {
                    $('#subTotalPreview', opener.document).text(getPriceFormattedNumber(subTotal, 4));
                    $('#txtSubTotal', opener.document).val(parseFloat(subTotal));
                    gstValue = (parseFloat(0.07) * parseFloat(subTotal)).toFixed(4);
                    var grandTotal = parseFloat(subTotal) + parseFloat(gstValue);
                    $('#grandTotalDisplay', opener.document).text(getPriceFormattedNumber(grandTotal, 4));
                    $('#txtGrandTotal', opener.document).val(grandTotal);
                    gstPreview.val(getPriceFormattedNumber(gstValue, 4));
                    var gstHiddenOne = $('#txtGST', opener.document);                
                    gstHiddenOne.val((parseFloat(0.07) * parseFloat(subTotal)));
                }
            }
        }
           $('#btnDeleteAllItem', opener.document).show();
           $('#frm').submit();
       }
    });
}

// 3. call onchange to get unit price
function getUnitPriceBaseUOMItem(selector) {
    var idIndex = selector.attr('id').substring(selector.attr('id').lastIndexOf('_') + 1, selector.attr('id').length);
    var item_uom_id = selector.children('option:selected').val();
    
    var jqXHR = $.ajax({
        method: "GET",
        url: "../AjaxServlet/GetUnitPriceByItemUomId",
        data: {item_uom_id}
    });
    
    jqXHR.done(function(price) {
        var originalPrice = $('#txtItemEntityOriginalPrice_'+idIndex);
        var displayPrice = $('#txtItemEntityUnitPriceDisplay_'+idIndex);
        var unitPrice = $('#txtItemEntityUnitPrice_'+idIndex);
        var quantity = $('#txtItemEntityQuantity_'+idIndex);
        if(price === null) {
            originalPrice.val('');
        } else {
            originalPrice.val(parseFloat(price));
        }
        
        if(quantity.val() !== '' && quantity.val() !== '0') {
            var calculate = getPriceFormattedNumber(parseFloat(originalPrice.val()) * parseFloat(quantity.val()), 2);                        
            unitPrice.val(calculate);
        }         
        
        // if original price is empty then means no selected uom
        if(originalPrice.val() === '') {
            displayPrice.text('');
        } else {
            displayPrice.text(getPriceFormattedNumber(parseFloat(originalPrice.val()), 2));
        }        
    });
    
    jqXHR.fail(function(price) {
        alert('Error, Need to maintanance!');
    });
}

function QtyOnChange(selector) {
    var selectorValue = $(selector).parent().parent().find('.txtQuantity').val();
    if(selectorValue === '' || selectorValue === '.') {
        $(selector).parent().parent().find('.txtQuantity').val('0');
    }
        var unit_price = $(selector).parent().parent().find('.txtUnitPrice').val(getPriceFormattedNumber($(selector).parent().parent().find('.txtUnitPrice').val(), 4));
        
        unit_price = removeNumberFormat(unit_price.val());
    if(unit_price > parseFloat(0)) {
        var total_price = selectorValue * unit_price;
        var selectorTotalPrice = $(selector).parent().parent().find('.txtTotalPrice');
        selectorTotalPrice.val(total_price);
    }
}

function changeUnitPrice(selector) {
    if(selector.val() === '' || selector.val() === '.') {
        selector.val('0');
    }
        var quantity = $(selector).parent().parent().find('.txtQuantity').val();
        var selectorValue = $(selector).val(getPriceFormattedNumber($(selector).val(), 4));
        selectorValue = removeNumberFormat(selectorValue.val());
    if(quantity > 0) {
        var total_price = selectorValue * quantity;
        var selectorTotalPrice = $(selector).parent().parent().find('.txtTotalPrice');
        selectorTotalPrice.val(total_price);
    }
}

// 4. quantity item list inputted
function inputQuantityOfUOM(selector) {
    var indexId = selector.attr('id').substring(selector.attr('id').lastIndexOf('_') + 1, selector.attr('id').length);
    var quantity = selector.val();
    if(quantity === '0') {
        alert('Make Sure Quantity is Not Less Than 1!');
        selector.val('');
        selector.focus();
        $('#txtItemEntityUnitPrice_'+indexId).val('');
        return false;
    } else {
        if(quantity !== '') {
            var totalUnitPrice = parseFloat(quantity) * parseFloat($('#txtItemEntityOriginalPrice_'+indexId).val(), 2);
            $('#txtItemEntityUnitPrice_'+indexId).val(totalUnitPrice);
        } else {
            $('#txtItemEntityUnitPrice_'+indexId).val('');
        }        
    }
}

function getUnitPriceBaseUOMItemFirstLoad() {
    var wow = $('#dtItemEntityList #itemTbody tr');
    var idIndex = 1;
    for(var index = 0; index < wow.length; index++) {
        var item_uom_id = wow.eq(index).find('td:eq(4) select.ddlMgr').val();
        var jqXHR = $.ajax({
            method: "GET",
            url: "../AjaxServlet/GetUnitPriceByItemUomId",
            data: {item_uom_id, idIndex}
        });

        jqXHR.done(function(aw) {
            $('#dtItemEntityList #itemTbody tr').each(function() {
            var originalPrice = $('#txtItemEntityOriginalPrice_'+aw[1]);
            var displayPrice = $('#txtItemEntityUnitPriceDisplay_'+aw[1]);
            var unitPrice = $('#txtItemEntityUnitPrice_'+aw[1]);
            var quantity = $('#txtItemEntityQuantity_'+aw[1]);
            if(aw[0] === null) {
                originalPrice.val('');
            } else {
                originalPrice.val(parseFloat(aw[0]));
            }

            if(quantity.val() !== '' && quantity.val() !== '0') {
                var calculate = getPriceFormattedNumber(parseFloat(originalPrice.val()) * parseFloat(quantity.val()), 2);                        
                unitPrice.val(calculate);
            }         

            // if original price is empty then means no selected uom
            if(originalPrice.val() === '') {
                displayPrice.text('');
            } else {
                displayPrice.text(getPriceFormattedNumber(parseFloat(originalPrice.val()), 2));
            }        
            });
           
        });
 idIndex++;
        jqXHR.fail(function(price) {
            alert('Error, Need to maintenance!');
        });
    }
}

function bindMeterReadingValidation(selector) {
    var startMeter = $(selector).parent().parent().find('.startMeter');
    var qty = $(selector).parent().parent().find('.txtQuantity');
    var unit_price = $(selector).parent().parent().find('.txtUnitPrice').val(getPriceFormattedNumber($(selector).parent().parent().find('.txtUnitPrice').val(), 4));
    unit_price = removeNumberFormat(unit_price.val());
    var endMeterVal = $(selector).val();
    var startMeterVal = parseInt(startMeter.val());
    var qtyVal = 0;
    if(endMeterVal >= startMeterVal) {
        qtyVal = endMeterVal - startMeterVal;
        qty.val(qtyVal);
        var total_price = qtyVal * unit_price;
        var selectorTotalPrice = $(selector).parent().parent().find('.txtTotalPrice');
        selectorTotalPrice.val(total_price);
    } 
}

function meterReadingValidation(selector) {
    var endMeter = $(selector).parent().parent().find('.endMeter');
    var qty = $(selector).parent().parent().find('.txtQuantity');
    var valStart = $(selector).parent().find('.startMeterVal').val();
    var startMeterVal = $(selector).val();
    var endMeterVal = parseInt(endMeter.val());
    var qtyVal = 0;
    if(startMeterVal <= endMeterVal) {
        qtyVal = endMeterVal - startMeterVal;
        qty.val(qtyVal);            
    } 
}