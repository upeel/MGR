/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    bindChosenDDLMulitpleSelectEvent("assign");
    bindChosenDDLMulitpleSelectEvent("ddlCustomer");
    initializeDataTableEventForMgrDestroyAndBuild("dtMachineList");
    hideTheSearchBarTheadDataTable();
    getMachineList();
    setFromDuplicate();
    setCustomer();
    setCheckBoxes();
    checkAll();
    createMeterReading();
    $('#dtMachineList_info').css('display', 'none');
    $('#dtMachineList_paginate').css('display', 'none');
});

function getMachineList(){
    $('#btnMachine').click(function(){
       var customer = $('#ddlCustomer');
       var assign = $('#assign');
       $('#frm2').append(customer);
       $('#frm2').append(assign);
       showLoading();
        $('#frm2').submit();
    });
}

window.onunload = function(){
  window.opener.location.reload();
};

function createMeterReading() {
    $('#btnCreate').click(function(){
       showLoading();
       $('#frm').submit();
       window.opener.location.reload();
    });
}

function checkAll(){
    var sCheckAll = $('#checkAll');
    var sCheckBox = $('.chkbox');
    sCheckAll.click(function(){
            if(sCheckAll[0].hasAttribute('checked'))
            {
                sCheckAll.removeAttr('checked');
                sCheckBox.removeAttr('checked');
                sCheckBox.val(0);
            }
            else {
                sCheckAll.attr('checked', true);
                sCheckBox.attr('checked', true);
                sCheckBox.val(1);
            }
    });
}

function setCheckBoxes() {
    var num = 1;
    $('#dtMachineList tbody tr').each(function(){
       var sCheckBox = $('#assign_'+num);
       
       sCheckBox.click(function(){
          if(sCheckBox[0].hasAttribute('checked'))
          {
              sCheckBox.removeAttr('checked');
              sCheckBox.val(0);
          } else {
              sCheckBox.attr('checked', true);
              sCheckBox.val(1);
          }
       });
    num++;   
    });
}

function setCustomer(){
    var num = 1;
    var numb = 1;
    $('#dtCustIdHidden tbody tr').each(function(){
        var custId = $('#txtCustId_'+num).val();
            $('#ddlCustomer > option').each(function(){
               if($(this).val() === custId){
                   $(this).attr('selected', 'selected');
               } 
            });
        num++;
    });
}

function setFromDuplicate(){
        var num = 1;
        var numb = 1;
    $('#dtSerialHidden tbody tr').each(function(){
        var txtSerial = $('#txtSerial_'+numb).val();
            $('#dtMachineList tbody tr').each(function(){
                var sCheckBox = $('#assign_'+num);
                var serial = $('#serial_'+num).val();

                if(txtSerial === serial){
                    sCheckBox.attr('checked', true);
                    sCheckBox.val(1);
                    return false;
                }
                num++;
            });

        numb++;   
    });
}

function initializeDataTableEventForMgrDestroyAndBuild(dataTableElementId)
{
    var $datatable = $('#' + dataTableElementId).DataTable({
        "dom": '<"toolbar">frBtip',
        "aLengthMenu": [[10, 25, 50, 75, -1], [10, 25, 50, 75, "All"]],
        "iDisplayLength": -1,
        "buttons": [
            //'colvis',
            {
                extend: 'copy',
                filename: $('#' + dataTableElementId)[0].getAttribute("name"),
                footer: true
            },
            {
                extend: 'csv',
                filename: $('#' + dataTableElementId)[0].getAttribute("name"),
                footer: true
            },
            {
                extend: 'print',
                filename: $('#' + dataTableElementId)[0].getAttribute("name"),
                footer: true
            },
            {
                extend: 'excel',
                filename: $('#' + dataTableElementId)[0].getAttribute("name"),
                footer: true
            },
            {
                extend: 'pdfHtml5',
                filename: $('#' + dataTableElementId)[0].getAttribute("name"),
                footer: true,
                orientation: 'landscape'
            }
        ],
        //"responsive": true,
        "colReorder": false,
        "aoColumnDefs": [{ "bSortable": false, "aTargets": ["disabledSort"] }], 
        //Disabled table sorting, need add 'disabledSort' class for each table head element
        
        "initComplete": function (settings, json) {
            //show the datatable after initializing
            //In cases where the data to load into the datatable is huge, 
            //it will cause the browser to incur an expensive rendering time
            //only after the data is completely loaded, then show the datatable.
            $('#' + dataTableElementId).show();
        }
    });
    
    $('#' + dataTableElementId + '_filter').find('input[type="search"]')[0].className = 'dtMachineList';
    
    //make sure that the datatable is scaled correctly
    $('#' + dataTableElementId).css("width", "100%");
    $(".sorting_asc")[0].classList.remove("sorting_asc");
}