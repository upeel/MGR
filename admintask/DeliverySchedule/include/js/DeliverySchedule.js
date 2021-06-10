/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function(){
    initiateJQUERYUiLibaray();
    bindBtnFilterOnClick();
    bindBtnUpdateOnClick();
    // for hidden table posting value and validation
    addToHiddenTableForTheValue();
    bindRouteDropDownOnChangeEvent();
    initializeDataTableEvent('dtServiceSchedule');
    hideTheSearchBarTheadDataTable(); 
    removeNotRequiredParam(window.location.href);   
});

function bindRouteDropDownOnChangeEvent() {
    $('.ddlRouteRowId').change(function() {
        var index = $(this).parent().parent().data('row');
        var routeIdHiddenSelector = $('#dtServiceScheduleHidden tr input#route_'+index);
        routeIdHiddenSelector.val($(this).children('option:selected').val());
    });
}

function addToHiddenTableForTheValue() {
    var i = 1;
    var number = 1;
    $('#dtServiceSchedule tbody tr').each(function() {
        var txtJustDisplay = $(this).find('input.txtJustDisplay').val();
        
        var hiddenTable = $('#dtServiceScheduleHidden');
        if(txtJustDisplay === '0') {
            var txtDeliveryScheduleId = $(this).find('input.txtDeliveryScheduleId').val();
            var txtDeliveryOrderId = $(this).find('input.txtDOId').val();
            var ddlRouteIdHidden = $(this).find('select.ddlRouteRowId').children('option:selected').val();
            var row = '<tr>';
            row+= '<td>';
            row+= '<input type="text" id="ds_'+i+'" style="width: 50px;" name="txtDeliveryScheduleId_'+number+'" value="'+txtDeliveryScheduleId+'">';
            row+= '<input type="text" id="do_'+i+'" style="width: 50px;" name="txtDOId_'+number+'" value="'+txtDeliveryOrderId+'">';
            row+= '<input type="text" id="route_'+i+'" class="route_'+number+'" style="width: 50px;" name="ddlRouteRowId_'+number+'" value="'+ddlRouteIdHidden+'">';
            row+= '</td>';
            row+= '</tr>';
            hiddenTable.append(row);
            number++;
        }
        $('#txtTotalDeliverySchedules').val(number);
        i++;
    });
}

function initiateJQUERYUiLibaray() {
    bindChosenDDLMulitpleSelectEvent('ddlBusinessEntityId');
    bindChosenDDLMulitpleSelectEvent('ddlRouteId');
    initializeDatePicker('txtDeliveryDate');
    bindChosenDDLMulitpleSelectEvent('ddlPeriodId');
    bindChosenDDLMulitpleSelectEvent('ddlRouteRowIdAdmin');
    
    var totalDeliverySchedules = $('#dtServiceSchedule tbody tr').length;
    for(var i = 1; i <= parseInt(totalDeliverySchedules); i++) 
    {
        var noUpdateRow = $('#txtJustDisplay_' + i);
        if(noUpdateRow.val() === '0') {
            bindChosenDDLMulitpleSelectEvent('ddlRouteRowId_'+i);
        }        
    }
}

function bindBtnFilterOnClick() {
    $('#btnFilter').click(function() {
        var frm = $('#frm');
        frm.attr('method', 'GET');
        frm.submit();
    });
}

function bindBtnUpdateOnClick() {
    $('#btnUpdateDeliverySchedule').click(function() {
        var dtServiceSchedule = $('#dtServiceScheduleHidden tbody tr');
        var totalUpdate = dtServiceSchedule.length;
        if(totalUpdate > 0) {
            for(var i = 1; i <= totalUpdate; i++) 
            {
                var route_id = $('.route_' + i);
                var line = route_id.attr('id').split('_')[1];
                if(route_id.val() === '0') {
                    alert('Please Select Route On Schedule Order ' + line);
                    $('#ddlRouteRowId_'+line).next().addClass('chosen-container-active');
                    return false;
                }
            }

            var confirm = window.confirm("Are You Sure Wanna Update This Changes ?");
            if(!confirm) {
                return false;
            }
            var frm = $('#frm');
            frm.attr('method', 'POST'); 
            frm.submit();
        } else {
            alert('Nothing To Update.');
            return false;
        }        
    });
}

function removeNotRequiredParam(resourceURL) {
    var rtn = resourceURL.split('?')[0],
            param,
            params_arr = [],
            queryString = (resourceURL.indexOf('?') !== -1) ? resourceURL.split('?')[1] : '';
    if(queryString !== '') {
        params_arr = queryString.split('&&');
        
        for(var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split('=')[0];
            if(param === 'message') {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&&");
    }
    window.history.pushState(null, null, rtn);
}
