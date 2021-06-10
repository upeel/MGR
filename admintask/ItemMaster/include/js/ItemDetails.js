/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global listOfCategoryJsonRetrieve, listItemTypeNeedToLinkMainJson, listOfItemUomJson */

$(document).ready(function() {
    bindRadioButtonDefault();
    setDropDownToBeChoosenItemDetails();
    validateJsonList();
    onGetSelectEntityCodeEvent();
    bindButtonAddUomClick ();    
    var ct= $('#ddlItemCategoryId option').length;
    $('#categoryLength').val(ct);  
    bindChangeCategoryMandatory();
    bindLastestSellingPriceValuetoCurrency();    
     $(window).unload(function() {
       window.opener.location.reload(); 
    });    
});

// set dropdown type to be chosen
function setDropDownToBeChoosenItemDetails() {
    bindChosenDDLMulitpleSelectEvent('ddlItemTypeId');
    bindChosenDDLMulitpleSelectEvent('ddlItemGroupId');
    bindChosenDDLMulitpleSelectEvent('ddlItemStatus');
    bindChosenDDLMulitpleSelectEvent('ddlInventoryItemType');
}

//Validation if itemId "" or not to get json list
function validateJsonList(){
    var itemId = $('#txtItemMasterId').val() || 0;
    if (itemId !== 0)
    {     
        bindItemCategoryRetrieve();
        getItemUomDetailList();
        checkIfCheckBoxValue1();
        hideItemCategoryIfMain();
        
        var itemType = $('#ddlItemTypeId').val();
        $('#itemTypeVal').val(itemType);
        
        getItemTypeMain();
        if (itemvalidation === true)
        {
            $('.itemCategory').hide();
            $('#category').hide();
        }
    }
    else
    {
        $('.itemCategory').hide();
        $('#category').hide();
    }
}

// append input hidden value contain status to frm
function bindStatusValToInput() {
    var itemStatus = $('#ddlItemStatus').children('option:selected').val();
    $('#frm').append('<input type="hidden" id="ddlItemStatusVal" name="ddlItemStatusVal" value="0">');
    $('#ddlItemStatusVal').val(itemStatus);
}

function bindItemCategoryRetrieve (){    
        var listOfItemType = listItemTypeNeedToLinkMainJson;
        var arrayId = [];
        for (var i=0 ; i<listOfItemType.length ; i++)
        {
            var itemTypeId = listOfItemType[i].id;
            arrayId.push(itemTypeId);
        }

        var itemType = $('#ddlItemTypeId').val();
        var itemvalidation = arrayId.includes(parseInt(itemType));
            if (itemvalidation === true)
            {    
                $('#category').hide();              
            }
    }
    
    function getItemUomDetailList(){
        $('.tbodyUom').empty();
        for (var index in listOfItemUomJson)
        {
           var trLength = $('.trUom').length;
           var count = parseInt(trLength)+1;

           var uom = listOfItemUomJson[index].uom;
           if (uom === 'undefined')
           {
               uom="";
           }

           var factor = listOfItemUomJson[index].factor;
           if (factor === 'undefined')
           {
               factor="";
           }

           var lastestSellingPrice = listOfItemUomJson[index].latest_selling_price;
           if (lastestSellingPrice === 'undefined')
           {
               lastestSellingPrice="";
           }

           var basedUom = listOfItemUomJson[index].base_uom;
           if (basedUom === 'undefined')
           {
               basedUom="";
           }

           var soldUom = listOfItemUomJson[index].sold_uom;
           if (soldUom === 'undefined')
           {
               soldUom="";
           }

           $('.tbodyUom').append(
                        '<tr id="trUom_'+count+'" class="trUom">'+
                            '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20">'+
                                '<input  type="text" id="txtItemUOMUnit_'+count+'" name="txtItemUOMUnit_'+count+'" class="mgrFormDesign txtItemUOMUnit" maxlength="20" value="'+uom+'">'+
                            '</td>'+

                            '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20">'+
                                '<input style="text-align: right;" type="text" id="txtItemUOMFactor_'+count+'" name="txtItemUOMFactor_'+count+'" maxlength="20" class="mgrFormDesign txtItemUOMFactor" data-dot="0" onkeypress="return isNumberPlusComma(event, $(this));" onchange="isnumberAddComma($(this))" value="'+factor+'.0'+'">'+
                            '</td>'+

                            '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20">'+
                                '<input style="text-align: right;" type="text" id="txtItemUOMLatestSellingPrice_'+count+'" name="txtItemUOMLatestSellingPrice_'+count+'" maxlength="20" class="mgrFormDesign txtItemUOMLatestSellingPrice" data-dot="0" onkeypress="return isNumberPlusComma(event, $(this));" onchange="bindAmountOnChange($(this))" value="'+lastestSellingPrice+'">'+
                            '</td>'+

                            '<td class="mgrTdPadTopBot20" style="padding-left:5px !important">'+                   
                                    '<input onclick="radioButton('+count+');" type="radio" class="mgrRadioButton radBaseUom" id="radBaseUom_'+count+'" name="radBaseUom_'+count+'" data-checked="0" value="'+basedUom+'">'+
                                    '<label class="txtStyleSanRegularMgr" for=""><span><span></span></span></label>'+    
                            '</td>'+

                            '<td class="mgrTdPadTopBot20 center" style="padding-bottom: 45px !important">'+
                                '<label class="checkBoxMgrContainer">'+                    
                                    '<input type="checkbox" class="chkSoldUom" id="chkSoldUom_'+count+'" name="chkSoldUom_'+count+'" data-checked="0" value="'+soldUom+'">'+
                                    '<span class="checkmarkMgr"></span>'+                     
                                '</label>'+
                            '</td>'+

                            '<td class="mgrTdPadTopBot20 center" style="padding-left: 10px !important;">'+
                                '<img onclick="deleteBaseUomRow('+count+');" src="../../include/mgr/include/images/MGR-LOGO/delete.png" class="logoTheadTableMgr imgRemove" id="imgRemove_'+count+'"/>'+
                            '</td>'+
                        '</tr>'
                    );
            bindInputTextCharacterCountdownEvent();   
            $('#trLength').val(count);
        }    
    }
    
    function checkIfCheckBoxValue1(){
        var trLength = $('.trUom').length;
    
        for(var i =1 ; i<= trLength ; i++)
        {
            var checkbox = $('#chkSoldUom_'+i).val(); 
            var radio = $('#radBaseUom_'+i).val();
            if(checkbox == 1)
            {
                $('#chkSoldUom_'+i).prop('checked',true);
            }
            if (radio == 1)
            {
                $('#radBaseUom_'+i).prop('checked',true);
            }
        }
            var entityId = listOfEntityIdJson;
            var entityLength = $('.radEntity').length;
           
            for (var j=1 ; j<=entityLength ; j++)
            {                
                var chkEntity = $('#chkEntity_'+j).val();  
                if(entityId.includes(parseInt(chkEntity)) == true)
                {
                    chkEntity = $('#chkEntity_'+j).prop('checked',true);
                }
                else
                {
                    chkEntity = $('#chkEntity_'+j).prop('checked',false);
                }
            }
    }
        
    function hideItemCategoryIfMain(){    
        var itemIdList = [];
        var listItemId = listOfItemIdOnCategoryRelationJson;

        for (var i=0 ; i<listItemId.length ; i++)
        {
            var item=listOfItemIdOnCategoryRelationJson[i];
            itemIdList.push(item);
        }
        var itemId = $('#txtItemMasterId').val();
        if (!itemIdList.includes(Number(itemId)))
        {
            $('.chkCategory').hide();
        }
    }

    function bindLastestSellingPriceValuetoCurrency(){
        var tr =$('#trLength').val();    
        for (var i=1 ;i<= tr ; i++)
        {
            var id ='#txtItemUOMLatestSellingPrice_'+i;
             var thisInputAmount = $(id);
            if(thisInputAmount.val().trim() === '.') {
                thisInputAmount.val(0);
            }
            // if empty keep the value empty
            if(thisInputAmount.val() !== '') {
                $(thisInputAmount).val(getPriceFormattedNumber(thisInputAmount.val(), 2));
            } 
        }
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


/* bind amount input type on change */
function bindAmountOnChange(thisElement) {    
    var thisInputAmount = thisElement;
    if(thisInputAmount.val().trim() === '.') {
        thisInputAmount.val(0);
    }
    // if empty keep the value empty
    if(thisInputAmount.val() !== '') {
        $(thisInputAmount).val(getPriceFormattedNumber(thisInputAmount.val(), 2));
    }        
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

function isnumberAddComma(thisElement) {
   thisElement.val(thisElement.val().replace('.',''));
   if (thisElement.val() !== '')
   {  
        $(thisElement).val(thisElement.val()+'.0');
   }

}


    function onGetSelectEntityCodeEvent()
    {
        $('#ddlItemGroupId').change(function()
        {      
            var jqXHR = $.ajax({
                url: "getGroupCodeAjax",
                data: {ddlItemGroup: $("#ddlItemGroupId").children('option:selected').text(), txtItemMasterId:$("#txtItemMasterId").val()}            
            });

            jqXHR.done(function (listOfGroupCodeJson)
            {
                var code ='';
                var idLength = 0;
                if (listOfGroupCodeJson !== null)      
                {
                   code = listOfGroupCodeJson.code;
                   idLength = listOfGroupCodeJson.name;
                }
                 $("#txtItemCode").val(code +idLength);
            });    

            jqXHR.fail(function (){
               alert("Unable to retrieve data!");
            });

            jqXHR.always(function(){
               hideLoading(); 
            });
            return jqXHR;
        });
    }

    
//change category mandatory and disabled select if item type id = 1 (main item)
function bindChangeCategoryMandatory (){        
    $('#ddlItemTypeId').change(function(){            
        var itemType = $('#ddlItemTypeId').val();
        $('#itemTypeVal').val(itemType);
        var listOfItemType = listItemTypeNeedToLinkMainJson;
        var arrayId = [];
        for (var i=0 ; i<listOfItemType.length ; i++)
        {
            var itemTypeId = listOfItemType[i].id;
            arrayId.push(itemTypeId);
        }
        var itemvalidation = arrayId.includes(parseInt(itemType));
        if (itemvalidation == true) 
        {            
            $('.itemCategory').hide();
            $('#category').hide();               
        }
        else
        {
            var categoryLength = $('.chkCategory').length;
            $('#categoryVal').val(categoryLength);
            $('.itemCategory').show();
            $('#category').show();
        }
    }); 
}


function bindButtonAddUomClick (){
    $('#btnAddItemUomDetails').click(function(){
        var trLength = $('.trUom').length +1;

        $('.tbodyUom').append(
                    '<tr id="trUom_'+trLength+'" class="trUom">'+
                        '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20">'+
                            '<input placeholder="pc" type="text" id="txtItemUOMUnit_'+trLength+'" name="txtItemUOMUnit_'+trLength+'" class="mgrFormDesign txtItemUOMUnit" maxlength="20">'+
                        '</td>'+

                        '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20">'+
                            '<input style="text-align: right;" placeholder="1.0" type="text" id="txtItemUOMFactor_'+trLength+'" name="txtItemUOMFactor_'+trLength+'" maxlength="20" class="mgrFormDesign txtItemUOMFactor" data-dot="0" onkeypress="return isNumberPlusComma(event, $(this));" onchange="isnumberAddComma($(this));">'+
                        '</td>'+

                        '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20">'+
                            '<input style="text-align: right;" placeholder="$1.00" type="text" id="txtItemUOMLatestSellingPrice_'+trLength+'" name="txtItemUOMLatestSellingPrice_'+trLength+'" maxlength="20" class="mgrFormDesign txtItemUOMLatestSellingPrice" data-dot="0" onkeypress="return isNumberPlusComma(event, $(this));" onchange="bindAmountOnChange($(this));">'+
                        '</td>'+

                        '<td class="mgrTdPadTopBot20" style="padding-left:5px !important">'+                   
                                '<input onclick="radioButton('+trLength+');" type="radio" class="mgrRadioButton radBaseUom" id="radBaseUom_'+trLength+'" name="radBaseUom_'+trLength+'" data-checked="0" value="0">'+
                                '<label class="txtStyleSanRegularMgr" for=""><span><span></span></span></label>'+    
                        '</td>'+

                        '<td class="mgrTdPadTopBot20 center" style="padding-bottom: 45px !important">'+
                            '<label class="checkBoxMgrContainer">'+                    
                                '<input type="checkbox" class="chkSoldUom" id="chkSoldUom_'+trLength+'" name="chkSoldUom_'+trLength+'" data-checked="0" value="0" checked>'+
                                '<span class="checkmarkMgr"></span>'+                     
                            '</label>'+
                        '</td>'+

                        '<td class="mgrTdPadTopBot20 center" style="padding-left: 10px !important;">'+
                            '<img onclick="deleteBaseUomRow('+trLength+');" src="../../include/mgr/include/images/MGR-LOGO/delete.png" class="logoTheadTableMgr imgRemove" id="imgRemove_'+trLength+'"/>'+
                        '</td>'+
                    '</tr>'
                );
        bindInputTextCharacterCountdownEvent();   
        $('#trLength').val(trLength);
    });
}

function radioButton(radioId){
    $('#radBaseUom_'+radioId).change(function(){
        var trLength = $('.trUom').length;
        for (var i=1 ; i<=trLength ; i++)
        {
            $('#radBaseUom_'+i).prop('checked', false);            
        }
        $(this).prop('checked', true);
    });
}

function radioButtonEntity(radioId){
    $('#radBaseUom_'+radioId).change(function(){
        var trLength = $('.radEntity').length;
        for (var i=1 ; i<=trLength ; i++)
        {
            $('#radBaseUom_'+i).prop('checked', false);
            $(this).prop('checked', true);
        }
    });
}

    function bindRadioButtonDefault(){
        if ($('#txtItemMasterId').val() == "")
        {
            $('#ddlItemStatus option[value=1]').prop('selected', true);
        }    
        $('#radBaseUom_1').attr('checked',true);
        var trLength = $('.trUom').length;
        $('#trLength').val(trLength);
    }

function deleteBaseUomRow(trIndex){
    var trLength = $('.trUom').length;
    if (trLength >1)
    {
        $('#trUom_'+trIndex).remove();
        var trLengthAfter = $('.trUom').length;
        $('#trLength').val(trLengthAfter);
        resetUom();
    }
    var radAfterLength=[]
    for(var k=1 ; k<=trLengthAfter ; k++)
    {
        var radAfter =$('#radBaseUom_'+k).prop('checked');
        if (radAfter === false)
        {
            radAfterLength.push(radAfter);            
        }            
    }
    if (radAfterLength.length === trLengthAfter)
    {
        $('#radBaseUom_1').prop('checked',true);
    }

    if (trLength === 1 && $('#trUom_'+trIndex).click() )
    {
        alert('Please insert at least 1 uom detail for item!');
    }
}

function resetUom(){
    var i=1;
    $('#tbodyUom .trUom').each(function(){
        $(this).attr({id: 'trUom_'+i , name: 'trUom_'+i});
        $(this).find('.txtItemUOMUnit').attr({id: 'txtItemUOMUnit_'+i , name: 'txtItemUOMUnit_'+i});
        $(this).find('.txtItemUOMFactor').attr({id: 'txtItemUOMFactor_'+i , name: 'txtItemUOMFactor_'+i});
        $(this).find('.txtItemUOMLatestSellingPrice').attr({id: 'txtItemUOMLatestSellingPrice_'+i , name: 'txtItemUOMLatestSellingPrice_'+i});
        $(this).find('.radBaseUom').attr({id: 'radBaseUom_'+i , name: 'radBaseUom_'+i, onclick:'radioButton('+i+');'});
        $(this).find('.chkSoldUom').attr({id: 'chkSoldUom_'+i , name: 'chkSoldUom_'+i});
        $(this).find('.imgRemove').attr({id: 'imgRemove_'+i , name: 'imgRemove_'+i, onclick:'deleteBaseUomRow('+i+');'});
        i++;
    });
}

/**
 * method for doing validation item detail form while do submit(create/update)
 * 
 * @returns {Boolean}
 */
function formItemDetailsValidation() 
{
    var formItemDetailValid = true;
    var itemName = 'txtItemName';
    var itemCode = 'txtItemCode';
    var itemDescription = 'txtItemDescription';
    var itemGroup = 'ddlItemGroupId';
    var inventoryStatus = 'ddlInventoryItemType';
    var itemTypes = 'ddlItemTypeId';
    var status = 'ddlItemStatus';
    var myobCode = 'txtItemMYOBCode';
    var length = $('.trUom').length;
    // total business entity displayed
    var businessLength = $('.radEntity').length;
    $('#businessEntityValue').val(businessLength);
    //
    var categoryLength = $('.chkCategory').length;
    // for business entity checked total
    var totalBusinessEntityChecked = 0;
    // for total categoy that are checked
    var totalCategoryChecked = 0;
    
    for (var i = 1; i <= businessLength; i++) {
        var businessEntity = $('#chkEntity_'+i);
        if (businessEntity.prop('checked') === true) 
        {
            totalBusinessEntityChecked +=1;            
        }
    }

    for (var i=1 ; i<=categoryLength; i++) {
        var category = $('#chkCategory_'+i);
        if (category.prop('checked') === true) 
        {
            totalCategoryChecked +=1;
            $('#cateoryLength').val(categoryLength);
        }
    }

    var itemType = $('#ddlItemTypeId').children('option:selected').val();
    // this for item sparepart need to link to main item called category
    var listOfItemType = listItemTypeNeedToLinkMainJson;
    var arrayId = [];
    for (var i = 0 ; i < listOfItemType.length; i++)
    {
        var itemTypeId = listOfItemType[i].id;
        arrayId.push(itemTypeId);
    }
    // if need to select main item category
    var itemCategoryNeedToCheck = arrayId.includes(parseInt(itemType));

    if ($('#'+itemName).val() === '') {
        var name = "Item Name";
        formItemDetailValid = validationItemDetailsMethod(name, itemName);      
        
    } else if ($('#'+itemCode).val() === "") {
        var name1 = "Item Code";
        formItemDetailValid = validationItemDetailsMethod(name1, itemGroup);
    } else if ($('#'+itemDescription).val() === "") {
        var name2 = "Item Description";
        formItemDetailValid = validationItemDetailsMethod(name2,itemDescription);
    } else if ($('#'+inventoryStatus).val() === null) {
        var name3 = "Inventory Item Status";
        formItemDetailValid = validationItemDetailsMethod(name3,inventoryStatus);
    } else if ($('#'+itemTypes).val() === null) {
        var name4 = "Item Type";
        formItemDetailValid = validationItemDetailsMethod(name4,itemTypes);
    } else if ($('#'+itemGroup).children('option:selected').val() === '0') {
        var name5 = "Item Group";
        formItemDetailValid = validationItemDetailsMethod(name5,itemGroup);
    } else if (totalCategoryChecked === 0 && itemCategoryNeedToCheck === false) {
        alert('Please Check Item Category At Least 1!'); 
        formItemDetailValid = false;
        $('label[for=tab1]').click();
        scrollTo('chkCategory_1');
        $('#chkCategory_1').focus();
    } else if (totalBusinessEntityChecked === 0 ) {                    
        alert('Please Check Business Entity!');
        formItemDetailValid = false;
        $('label[for=tab1]').click();
        scrollTo('chkEntity_1');
        $('#chkEntity_1').focus();
    } else if ($('#'+status).children('option:selected').val() === null) {
        var name8 = "Status";
        validationItemDetailsMethod(name8,status);
        formItemDetailValid = false;
    } else if ($('#'+myobCode).val() === '') {
        var name9 = "Myob Code";
        validationItemDetailsMethod(name9, myobCode);
        formItemDetailValid = false;
    } else {
        formItemDetailValid = uomValidationForm();
    }     
    
    return formItemDetailValid;
}

function validationItemDetailsMethod(name, itemName) {  
    var validationValid = true;
    var elementToBeFocus = $('#'+itemName);
    var scrollElementTarget = itemName;
    var message = "";
    if(name === 'Item Name') {
        message = "Please Enter Item Name!";
        validationValid = false;
    } else if (name === 'Item Group' || name === 'Item Code') {
        message = "Please Select Item Group!";
        scrollElementTarget = itemName+'_chosen';
        validationValid = false;
    } else if(name === 'Item Description') {
        message = "Please Enter Item Description!";
        validationValid = false;
    } else if(name === 'Item Category') {
        message = "Please Check Item Category At Least 1!";
        scrollElementTarget = itemName+'_chosen';
        validationValid = false;
    } else if (name === 'Inventory Item Status') {
        message = "Please Select Inventory Item Status!";
        scrollElementTarget = itemName+'_chosen';
        validationValid = false;
    } else if (name === 'Item Type') {
        message = "Please Select Item Type!";
        scrollElementTarget = itemName+'_chosen';
        validationValid = false;
    } else if (name === 'Status') {
        message = "Please Select Status!";
        scrollElementTarget = itemName+'_chosen';
        validationValid = false;
    } else if (name === 'Business Entity') {
        message = "Please Check Business Entity At Least 1!";
        validationValid = false;
    } else if(name === 'Myob Code') {
        message = 'Please Enter Myob Code';
        validationValid = false;
    }
    
    alert(message); 
    $('label[for=tab1]').click();
    scrollTo(scrollElementTarget);
    elementToBeFocus.focus();  
    return validationValid;
}

function uomValidationForm() {
    var trLength = $('.trUom').length;
    var checkCount = 0;
    var radioCount = 0;
    var uomArray = [];
    var uomValidation = 0;
    
    for (var y=1 ; y<=trLength ; y++)
    {
        var uom = $('#txtItemUOMUnit_'+y).val();
        if (uomArray.includes(uom) === false)
        {
            uomArray.push(uom);
        } 
        else
        {
            uomValidation+=1;
        }
    }
    
    for (var i=1 ; i<=trLength ; i++) {    
        var uom = $('#txtItemUOMUnit_'+i).val();
        var factor = $('#txtItemUOMFactor_'+i).val();
        var lastestSelling = $('#txtItemUOMLatestSellingPrice_'+i).val();
        var checkBox = $('#chkSoldUom_'+i);
        var radio = $('#radBaseUom_'+i);
        
        if ((checkBox).prop('checked') === false) {
            checkCount +=1;
        } else {
            checkBox.val(1);
        }
        
        if ((radio).prop('checked') === false) {
            radioCount +=1;
        } else {
            radio.val(1);
        }

        if (uom === "") {
            var uomRow = 'UOM Row ';
            var uomId = 'txtItemUOMUnit_';
            uomValidationMethod(uomRow,uomId,i);
            return false;
        } else if (factor === "") {
            var factorRow = 'Factor Row ';
            var factorId = 'txtItemUOMFactor_';
            uomValidationMethod(factorRow,factorId,i);
            return false;
        } else if (lastestSelling === "") {
            var lastSellingRow = 'Lastest Selling Row ';
            var lastestSellingId = 'txtItemUOMLatestSellingPrice_';
            uomValidationMethod(lastSellingRow,lastestSellingId,i);
            return false;
        } else if (checkCount >= trLength) {
            alert('Sold UOM must be checked at least 1!'); 
            $('label[for=tab1]').click();
            scrollTo('tbodyUom');
            $('#tbodyUom').focus();
            return false;
        } else if (radioCount === trLength) {
            alert('Please select based UOM!');
            scrollTo('tbodyUom');
            $('#tbodyUom').focus();
            return false;
        } else if (uomValidation === 1) {
            alert('Uom Already Exist On This Item!');
            scrollTo('tbodyUom');
            $('.txtItemUOMUnit').last().focus();
            return false;
        }
    }
    
    return true;
}

/**
 * method validation uom detail to be check 
 * 
 * @param {type} name
 * @param {type} itemName
 * @param {type} i
 * @returns {undefined}
 */
function uomValidationMethod(name,itemName,i) { 
    var focus = '#'+itemName+i;
    var scroll = itemName+i;
    var message = " Cannot be Empty!";
    if (name === 'Sold Uom ')
    {
        message = " Must be checked at least 1!";
        scroll = itemName+i;
    }
    else if(name === 'Item Category')
    {
        message = " Must be choosen!";
        scroll = itemName+i+'_chosen';
    }
    alert( name + i + message); 
    $('label[for=tab1]').click();
    scrollTo(scroll);
    $(focus).focus();
}

function getItemUomDetailList() {
    $('.tbodyUom').empty();
    
    for (var index in listOfItemUomJson)
    {
       var trLength = $('.trUom').length;
       var count = parseInt(trLength)+1;

       var uom = listOfItemUomJson[index].uom;
       if (uom === 'undefined')
       {
           uom="";
       }

       var factor = listOfItemUomJson[index].factor;
       if (factor === 'undefined')
       {
           factor="";
       }

       var lastestSellingPrice = listOfItemUomJson[index].latest_selling_price;
       if (lastestSellingPrice === 'undefined')
       {
           lastestSellingPrice="";
       }

       var basedUom = listOfItemUomJson[index].base_uom;
       if (basedUom === 'undefined')
       {
           basedUom="";
       }

       var soldUom = listOfItemUomJson[index].sold_uom;
       if (soldUom === 'undefined')
       {
           soldUom="";
       }

       $('.tbodyUom').append(
            '<tr id="trUom_'+count+'" class="trUom">'+
                '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20">'+
                    '<input  type="text" id="txtItemUOMUnit_'+count+'" name="txtItemUOMUnit_'+count+'" class="mgrFormDesign txtItemUOMUnit" maxlength="20" value="'+uom+'">'+
                '</td>'+

                '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20">'+
                    '<input style="text-align: right;" type="text" id="txtItemUOMFactor_'+count+'" name="txtItemUOMFactor_'+count+'" maxlength="20" class="mgrFormDesign txtItemUOMFactor" data-dot="0" onkeypress="return isNumberPlusComma(event, $(this))" onchange="isnumberAddComma($(this))" value="'+factor+'.0'+'">'+
                '</td>'+

                '<td class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20">'+
                    '<input style="text-align: right;" type="text" id="txtItemUOMLatestSellingPrice_'+count+'" name="txtItemUOMLatestSellingPrice_'+count+'" maxlength="20" class="mgrFormDesign txtItemUOMLatestSellingPrice" data-dot="0" onkeypress="return isNumberPlusComma(event, $(this))" onchange="bindAmountOnChange($(this))" value="'+lastestSellingPrice+'">'+
                '</td>'+

                '<td class="mgrTdPadTopBot20" style="padding-left:5px !important">'+                   
                        '<input onclick="radioButton('+count+');" type="radio" class="mgrRadioButton radBaseUom" id="radBaseUom_'+count+'" name="radBaseUom_'+count+'" data-checked="0" value="'+basedUom+'">'+
                        '<label class="txtStyleSanRegularMgr" for=""><span><span></span></span></label>'+    
                '</td>'+

                '<td class="mgrTdPadTopBot20 center" style="padding-bottom: 45px !important">'+
                    '<label class="checkBoxMgrContainer">'+                    
                        '<input type="checkbox" class="chkSoldUom" id="chkSoldUom_'+count+'" name="chkSoldUom_'+count+'" data-checked="0" value="'+soldUom+'">'+
                        '<span class="checkmarkMgr"></span>'+                     
                    '</label>'+
                '</td>'+

                '<td class="mgrTdPadTopBot20 center" style="padding-left: 10px !important;">'+
                    '<img onclick="deleteBaseUomRow('+count+');" src="../../include/mgr/include/images/MGR-LOGO/delete.png" class="logoTheadTableMgr imgRemove" id="imgRemove_'+count+'"/>'+
                '</td>'+
            '</tr>'
        );

        bindInputTextCharacterCountdownEvent();   
        $('#trLength').val(count);
    }    
}

function checkIfCheckBoxValue1() {
    var trLength = $('.trUom').length;

    for(var i =1 ; i<= trLength ; i++)
    {
        var checkbox = $('#chkSoldUom_'+i).val(); 
        var radio = $('#radBaseUom_'+i).val();
        if(checkbox == 1)
        {
            $('#chkSoldUom_'+i).prop('checked',true);
        }
        if (radio == 1)
        {
            $('#radBaseUom_'+i).prop('checked',true);
        }
    }

    var entityId = listOfEntityIdJson;
    var entityLength = $('.radEntity').length;

    for (var j=1 ; j<=entityLength ; j++)
    {                
        var chkEntity = $('#chkEntity_'+j).val();  
        if(entityId.includes(parseInt(chkEntity)) == true)
        {
            chkEntity = $('#chkEntity_'+j).prop('checked',true);
        }
        else
        {
            chkEntity = $('#chkEntity_'+j).prop('checked',false);
        }
    }

    var categoryId = listOfCategoryJsonRetrieve;
    var categoryLength = $('.itemCategory').length;
    $('#categoryVal').val(categoryLength);

    for (var o=1;o<=categoryLength;o++)
    {
        var chkCategory = $('#chkCategory_'+o).val();
        if(categoryId.includes(parseInt(chkCategory)) == true)
        {
            $('#chkCategory_'+o).prop('checked',true);
        }
        else
        {
             $('#chkCategory_'+o).prop('checked',false);
        }
    }
}
    
function getItemTypeMain(){
    var itemType = $('#ddlItemTypeId').val();
    var listOfItemType = listItemTypeNeedToLinkMainJson;
    var arrayId = [];
    for (var i=0 ; i<listOfItemType.length ; i++)
    {
        var itemTypeId = listOfItemType[i].id;
        arrayId.push(itemTypeId);
    }
    itemvalidation = arrayId.includes(parseInt(itemType));        
}

