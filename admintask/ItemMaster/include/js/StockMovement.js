/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var inventoryTab = $('label[for="tab4"]');

$(document).ready(function() {
    initiateTabs();
    initializeDatePickerFrom("txtDateFrom");
    initializeDatePickerFrom("txtDateTo");
    btnFilterOnClick();
});

function btnFilterOnClick()
{
    $("#btnStockMovementPeriodFilter").on('click', function ()
    {
        $('#frmInventoryMovement').submit();
    });
    
}

function initializeDatePickerFrom(datePickedElementId)
{
    $("#" + datePickedElementId).datepicker({
        stepMonths: 1,
        dateFormat: 'MM yyyy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,

        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).val($.datepicker.formatDate('M-yy', new Date(year, month, 1)));
        }
    });

    $("#" +datePickedElementId).focus(function () {
        $(".ui-datepicker-calendar").hide();
        $("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: $(this)
        });
    });
}

function initiateTabs()
{
    var index = $('#tab_Index').val();
    if (index === "1") {
        $("#tab4").click();
    }
    

    
}
