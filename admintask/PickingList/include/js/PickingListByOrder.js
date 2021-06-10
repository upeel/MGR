/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    setDropDownListChosen();
    btnUpdateOnClick();
    disableEditingWhenComplete();
    
    $(window).unload(function() {
       window.opener.location.reload(); 
    });
});

// set dropdown chosen 
function setDropDownListChosen() {
    bindChosenDDLMulitpleSelectEvent('ddlEntityId');
    bindChosenDDLMulitpleSelectEvent('ddlDriverOrTechnicianId');
    bindChosenDDLMulitpleSelectEvent('ddlDeliveryPeriodId');
}

// btn update on click event
function btnUpdateOnClick()
{
    $("#btnUpdatePickingList").on('click', function()
    {   
        var eachItemPicking = $('#tblPickingList tbody td table#pickingListByOrderTable tr'); 
        var itemPickingDetail = eachItemPicking.length;
        var checkedWithPickedZero = 0;
        for(var i = 1; i <= eachItemPicking.length; i++) 
        {
            var job_done = eachItemPicking.find('#chkJobDone_' + i);
            var pickedQuantity = eachItemPicking.find('#txtPickedQuantity_' + i);
            
            if(job_done.is(':checked') && (pickedQuantity.val() === '')) {
                alert('Please Enter Quantity On Picked Quantity!');
                scrollTo(pickedQuantity.attr('id'));
                pickedQuantity.val('');
                pickedQuantity.focus();
                return false;
            }            
            
            if(job_done.is(':checked') && parseInt(pickedQuantity.val()) === 0)
            {
                checkedWithPickedZero++;
            }
        }
        
        if(itemPickingDetail === checkedWithPickedZero)
        {
            alert('Please At Least Picked 1 Item To Be Delivered!');
            return false;
        }
        
        var confirmation = window.confirm('Are You Sure Wanna Update This Picking List ?');
        if(!confirmation) {
            return false;
        }
        
        $('#frm').submit();        
    });
    
}

function checkboxOnClick(x)
{
    if(document.getElementById("chkJobDone_"+x).checked)
    {
        $($('#chkJobDone_'+x)).attr('value', "1");
    }
    else
    {
        $($('#chkJobDone_'+x)).attr('value', "0");
    }
}

// key press section
function pickedQuantityKeyPress(event) {
    var key = window.event ? event.keyCode : event.which;
    if(event.keyCode === 8 || event.keyCode === 46) {
        return false;
    } else if(key < 48 || key > 57) {
        return false;
    } else {
        return true;
    }
}
    

// disable editing when complete
function disableEditingWhenComplete()
{
    var status = $('#txtStatus').val();
    if('COMPLETE' === status.toUpperCase().trim())
    {
        var row = $('#pickingListByOrderTable tr').length;
        
        for(var i=1; i<=parseInt(row); i++)
        {
            $('#txtPickingRemarks_'+i).attr('readonly', true);
            $('#txtPickedQuantity_'+i).attr('readonly', true);
            $('#chkJobDone_'+i).attr('disabled', 'disabled');
            
        }
        $('#btnUpdatePickingList').remove();
    }
}