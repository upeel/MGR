/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global listItemTypeJson, listOfItemUomJson, listOfEntityIdJson, listOfItemIdOnCategoryRelationJson */

$(document).ready(function() {    
    bindUpdateBtnOnClick();
    setTab1ItemDetailOnCheckWhenFirstLoad();
    bindOnClickItemDetailTabEvent(); 
});


/* set item detail web first load */
function setTab1ItemDetailOnCheckWhenFirstLoad() {
    $('input#tab1').prop('checked', true);
    $('img#item_details').attr('src', '../../include/mgr/include/images/MGR-LOGO/Item Detail Icon Green.png');
}

/* event when chosen tab */
function bindOnClickItemDetailTabEvent() {
    $('label.tabs').click(function() {
       var dataValue = $(this).find('span').data('value');
       
       if(dataValue === 'item_details') {
           $('img#item_details').attr('src', '../../include/mgr/include/images/MGR-LOGO/Item Detail Icon Green.png');
           $('img#inventory_details').attr('src', '../../include/mgr/include/images/MGR-LOGO/Inventory Details Icon.png');
           $('img#stock_adjustment').attr('src', '../../include/mgr/include/images/MGR-LOGO/Stock Adjustment Icon.png');
           $('img#stock_movement').attr('src', '../../include/mgr/include/images/MGR-LOGO/Stock Movement Icon.png');
       } else if(dataValue === 'inventory_details') {
           $('img#item_details').attr('src', '../../include/mgr/include/images/MGR-LOGO/Item Detail Icon.png');
           $('img#inventory_details').attr('src', '../../include/mgr/include/images/MGR-LOGO/Inventory Details Icon Green.png');
           $('img#stock_adjustment').attr('src', '../../include/mgr/include/images/MGR-LOGO/Stock Adjustment Icon.png');
           $('img#stock_movement').attr('src', '../../include/mgr/include/images/MGR-LOGO/Stock Movement Icon.png');
       } else if(dataValue === 'stock_adjustment') {
           $('img#item_details').attr('src', '../../include/mgr/include/images/MGR-LOGO/Item Detail Icon.png');
           $('img#inventory_details').attr('src', '../../include/mgr/include/images/MGR-LOGO/Inventory Details Icon.png');
           $('img#stock_adjustment').attr('src', '../../include/mgr/include/images/MGR-LOGO/Stock Adjustment Icon Green.png');
           $('img#stock_movement').attr('src', '../../include/mgr/include/images/MGR-LOGO/Stock Movement Icon.png');
       } else if(dataValue === 'stock_movement') {
           $('img#item_details').attr('src', '../../include/mgr/include/images/MGR-LOGO/Item Detail Icon.png');
           $('img#inventory_details').attr('src', '../../include/mgr/include/images/MGR-LOGO/Inventory Details Icon.png');
           $('img#stock_adjustment').attr('src', '../../include/mgr/include/images/MGR-LOGO/Stock Adjustment Icon.png');
           $('img#stock_movement').attr('src', '../../include/mgr/include/images/MGR-LOGO/Stock Movement Icon Green.png');
       }
    });
}
// create button on click
function bindUpdateBtnOnClick() {
    $('#btnUpdateItemDetails').click(function() {
        var item_id = $('#txtItemMasterId').val(); 
        var updateItemMaster = false;
        if(item_id !== '')
        {
            updateItemMaster = true;
        }
        var itemDetails = formItemDetailsValidation();
        // set true for know current development for stock adjustment, stock movement doesnt have validation form
        var itemStockAdjustment = true;
        var itemStockMovement = true;
        var inventoryDetails = formInventoryDetailsValidation();
        // execute if item_id is not available(new item)
        if(itemDetails === true && inventoryDetails === true &&
            itemStockAdjustment === true && 
            itemStockMovement === true) // validation 4 tab (item detail, item detail will do check for inventory too if item detail is inventory item, stock adjustment, stock movement 
        {
            if(updateItemMaster) {
                bindUpdateItemMasterDetail();
            } else {
                bindSubmitItemMasterDetail();
            }
        }
    });
}

// Submit Item Master Detail
function bindSubmitItemMasterDetail() {
    showLoading();
    injectIntentionInputElementIntoForm('SUBMIT');
    var confirmation = window.confirm("Are You Sure Wanna Create This Item ?");
    if(!confirmation) {
        // stop display the loading gif
        $("#dvLoading").hide();
        $("#overlay").hide();
        return false;
    }
    bindStatusValToInput();
    $('#frm').submit();
}

//Update Item Master Detail
function bindUpdateItemMasterDetail() {
    showLoading();
    injectIntentionInputElementIntoForm('UPDATE');
    var confirmation = window.confirm("Are You Sure Wanna Update This Item ?");
    if(!confirmation) {
        // stop display the loading gif
        $("#dvLoading").hide();
        $("#overlay").hide();
        return false;
    }
    bindStatusValToInput();
    $('#frm').submit();
}
