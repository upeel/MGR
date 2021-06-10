/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function removeDoubleColumnOnFilterDataTablesMGR() {
    $('#dtItemMasterList input').remove();
    $('#dtItemMasterList_length label').remove();
}

$(document).ready(function(){
    initializeDataTableEvent('dtItemMasterList');
    removeDoubleColumnOnFilterDataTablesMGR();
});