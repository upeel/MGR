/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    setDropDownListToBeChosen();
});

// set drop down list to be chosen
function setDropDownListToBeChosen() {
    bindChosenDDLMulitpleSelectEvent('ddlStockAdjustmentType');
    bindChosenDDLMulitpleSelectEvent('ddlStockAdjustmentReason');
    bindChosenDDLMulitpleSelectEvent('ddlStockAdjustmentBatchNo');
}