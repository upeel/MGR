/* global listOfDTManagerJson, listOfDriverTypeJson */

$(document).ready(function(){
    retrieveDTManagemetData();
    updateTrLength();
    addNewRow();
    bindInitializeChosen();     
    validationInput();
});

// Update tr length
function updateTrLength(){
    var trManagement = $('.trManagement').length;
    $('#trLength').val(trManagement);
}

//initialize dropdown to chosen
function bindInitializeChosen(trLength){
    if(trLength == null)
    {
        trLength = $('.trManagement').length;
    }    
    for(var i=1 ; i<=trLength ; i++)
    {
        bindChosenDDLMulitpleSelectEvent('type_'+i);
        bindChosenDDLMulitpleSelectEvent('status_'+i);
    }   
}

//Add new Row
function addNewRow(){
    $('#addNew').click(function(){
       var trLength = $('.trManagement').length +1;        
       $('#tbodyId').append('<tr id="trManagement_'+trLength+'" class="trManagement">'+
                                '<td hidden><input type="text" id="driverId_'+trLength+'" name="driverId_'+trLength+'" class="driverId" value=""/></td>'+
                                '<td id="no_'+trLength+'" class="'+trLength+' paddingBottom mgrPaddingLeft20 a"><input type="text" class="inputBorderless inputNo" readonly id="inputNo_'+trLength+'" value="'+trLength+'."/></td>'+
                                '<td class="'+trLength+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input maxlength="50" type="text" id="driverName_'+trLength+'" name="driverName_'+trLength+'" class="mgrFormDesign driverName maxWidth" value=""/></td>'+
                                '<td class="'+trLength+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input maxlength="10" type="text" id="vehicleNo_'+trLength+'" name="vehicleNo_'+trLength+'" class="mgrFormDesign vehicleNo maxWidth" value=""/></td>'+
                                '<td class="'+trLength+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input onkeypress="return isNumber(event);" maxlength="50" type="text" id="contactNo_'+trLength+'" name="contactNo_'+trLength+'" class="mgrFormDesign contactNo maxWidth" value=""/></td>'+
                                '<td class="'+trLength+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20">'+
                                    '<select id="type_'+trLength+'" name="type_'+trLength+'" class="type">'+
                                        '<option selected disabled>-- Please Select Type --</option>'+
                                        '<option value="0">Driver</option>'+
                                        '<option value="1">Technician</option>'+
                                    '</select>'+
                                '</td>'+
                                '<td class="'+trLength+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20">'+
                                    '<select onchange="validateCantInactive('+trLength+');" id="status_'+trLength+'" name="status_'+trLength+'" class="status">'+
                                        '<option selected disabled>-- Please Select Status --</option>'+
                                        '<option value="1">Active</option>'+
                                        '<option value="0">Inactive</option>'+
                                    '</select>'+
                                '</td>'+                               
                                '<td class="'+trLength+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><img onclick="deleteRow('+trLength+');" id="delete_'+trLength+'" class="logoTheadTableMgr delete" src="../../include/mgr/include/images/MGR-LOGO/Trash.png"/></td>'+
                            '</tr>');
                    $('.1').addClass('paddingTopBottom');
                    bindInitializeChosen(trLength); 
                    bindInputTextCharacterCountdownEvent(); 
                    updateTrLength();
    });
}

//DeleteRow
function deleteRow(id){
    var driverName = $('#driverName_'+id).val();
    
    var array = listOfDriverTypeJson;
    var idCheck = $('#driverId_'+id).val();   
    
    if(array.includes(parseInt(idCheck)))
    {
        alert(driverName+' Is Being Assigned To Route Delivery');
    }
    else
    {
        var confirmation = window.confirm('Are you sure want to delete '+driverName+' from list?');
        if(confirmation == true)
        {
            addDeletedDriverId(id);
            $('#trManagement_'+id).remove();
            resetRow();
            updateTrLength();
            alert(driverName + " deleted SuccessFully");
        }   
    }
}

//If driver or technician on duty, status cannot change to inactive
function validateCantInactive(id){
    var driverName = $('#driverName_'+id).val();
    
    var array = listOfDriverTypeJson;
    var idCheck = $('#driverId_'+id).val();  
    var status = $('#status_'+id).val();
    if(array.includes(parseInt(idCheck)) &&  status == 0)
    {
        alert('Sorry cannot set to Inactive. '+driverName+' on duty');
        $('#status_'+id).val(1);
        $('#status_'+id).trigger('chosen:updated');
    }
     if(parseInt(status) == 0)
    {
        driverIdIsExistValidation(idCheck, driverName);  
    }  
}

//ResetRowNumber
function resetRow(){
    var i=1;
        $('.trManagement').each(function(){
            $(this).attr({id: 'trManagement_'+i , name: 'trManagement_'+i});
            $(this).find('.inputNo').attr({id: 'inputNo_'+i , value:i});
            $(this).find('.driverId').attr({id: 'driverId_'+i , name: 'driverId_'+i});
            $(this).find('.driverName').attr({id: 'driverName_'+i , name: 'driverName_'+i});
            $(this).find('.vehicleNo').attr({id: 'vehicleNo_'+i , name: 'vehicleNo_'+i});
            $(this).find('.contactNo').attr({id: 'contactNo_'+i , name: 'contactNo_'+i});
            $(this).find('.type').attr({id: 'type_'+i , name: 'type_'+i});
            $(this).find('.status').attr({id: 'status_'+i , name: 'status_'+i});
            $(this).find('.delete').attr({id: 'delete_'+i , name: 'delete_'+i, onclick:'deleteRow('+i+');'});
            $(this).find('.paddingBottom').attr('class',i+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20');
            $(this).find('.a').attr('id',i);
            i++;
        });
        $('.1').addClass('paddingTopBottom');        
}

//input validation
function validationInput(){
    $('#btnUpdateManagement').click(function(){        
        var trLength = $('.trManagement').length;    
        var array =[]; 
        var exist = false;
        
        
        for(var i=1;i<=trLength;i++)
        {
            var driverName = 'driverName_'+i;
            var vehicleNo = 'vehicleNo_'+i;
            var contactNo = 'contactNo_'+i;
            var type = 'type_'+i;
            var status = 'status_'+i;
            
            var driverNameVal = $('#driverName_'+i).val();
            var vehicleNoVal = $('#vehicleNo_'+i).val();
            var contactNoVal = $('#contactNo_'+i).val();
            var typeVal = $('#type_'+i).val();
            var statusVal = $('#status_'+i).val();                                 
                      
            if(!array.includes(driverNameVal))
            {
                array.push(driverNameVal);
            }
            else
            {
               exist = true;                
            }
            
            
            if(driverNameVal == "")
            {
                var headerName = "Driver Name"
                validationForm(headerName, i, driverName);
                return false;
            }
            else if(vehicleNoVal == "")
            {
                var vehicle = "Vehicle No"
                validationForm(vehicle, i, vehicleNo);
                return false;
            }
            else if(contactNoVal == "")
            {
                var contact = "Contact No"
                validationForm(contact, i, contactNo);
                return false;
            }
            else if(typeVal == null)
            {
                var types = "Type"
                validationForm(types, i, type);
                return false;
            }
            else if(statusVal == null)
            {
                var statuss = "Status"
                validationForm(statuss, i, status);
                return false;
            }
            else if(exist == true)
            {
                alert('User Name ' +driverNameVal+' already exist!');
                $('#driverName_'+i).val('');
                $('#driverName_'+i).focus();
                return false;
            }
            else if(i == trLength)
            {
                
            }
        }
        var confirmation = confirm('Are You Sure Wanna Update These Changes ?');
        if(!confirmation) {
            return false;
        }

        injectIntentionInputElementIntoForm("UPDATE");
        $("#frm").submit();
    });
}

function validationForm(headerName, no, valName){
    if(headerName == 'Type' || headerName == 'Status')
    {
        alert('Please Select ' + headerName +' at row '+no);
    }
    else
    {
        alert(headerName +' at row '+no+' cannot be Empty');   
    }    
    scrollTo(valName);
    $('#'+valName).focus();
}

function retrieveDTManagemetData(){
    var DTMData = listOfDTManagerJson;
    for(var i in DTMData)
    {
        var count = parseInt(i)+1;
        
        var driverId = DTMData[i].id;
        var driverName = DTMData[i].dtName;
        var driverVhcNo = DTMData[i].dtVehicle;
        var driverContact = DTMData[i].dtContact;
        var driverType = DTMData[i].type;
        var driverStatus = DTMData[i].status;
                
        if(driverId == 'undefined')
        {
            driverId = "";
        }
        if(driverName == 'undefined')
        {
            driverName="";
        }
        if(driverVhcNo == 'undefined')
        {
            driverVhcNo="";
        }
        if(driverContact == 'undefined')
        {
            driverContact="";
        }
        if(driverType == 'undefined')
        {
            driverType="";
        }
        if(driverStatus == 'undefined')
        {
            driverStatus="";
        }
        $('#tbodyId').append('<tr id="trManagement_'+count+'" class="trManagement">'+
                                '<td hidden><input type="text" id="driverId_'+count+'" name="driverId_'+count+'" class="driverId" value="'+driverId+'"/></td>'+
                                '<td id="no_'+count+'" class="'+count+' paddingBottom mgrPaddingLeft20 a"><input type="text" class="inputBorderless inputNo" readonly id="inputNo_'+count+'" value="'+count+'."/></td>'+
                                '<td class="'+count+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input maxlength="50" type="text" id="driverName_'+count+'" name="driverName_'+count+'" class="mgrFormDesign driverName maxWidth" value="'+driverName+'"/></td>'+
                                '<td class="'+count+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input maxlength="10" type="text" id="vehicleNo_'+count+'" name="vehicleNo_'+count+'" class="mgrFormDesign vehicleNo maxWidth" value="'+driverVhcNo+'"/></td>'+
                                '<td class="'+count+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input onkeypress="return isNumber(event);" maxlength="50" type="text" id="contactNo_'+count+'" name="contactNo_'+count+'" class="mgrFormDesign contactNo maxWidth" value="'+driverContact+'"/></td>'+
                                '<td class="'+count+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20">'+
                                    '<select id="type_'+count+'" name="type_'+count+'" class="type">'+
                                        '<option selected disabled>-- Please Select Type --</option>'+
                                        '<option value="0">Driver</option>'+
                                        '<option value="1">Technician</option>'+
                                    '</select>'+
                                '</td>'+
                                '<td class="'+count+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20">'+
                                    '<select onchange="validateCantInactive('+count+');" id="status_'+count+'" name="status_'+count+'" class="status">'+
                                        '<option selected disabled>-- Please Select Status --</option>'+
                                        '<option value="1">Active</option>'+
                                        '<option value="0">Inactive</option>'+
                                    '</select>'+
                                '</td>'+                               
                                '<td class="'+count+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><img onclick="deleteRow('+count+');" id="delete_'+count+'" class="logoTheadTableMgr delete" src="../../include/mgr/include/images/MGR-LOGO/Trash.png"/></td>'+
                            '</tr>');
                    $('.1').addClass('paddingTopBottom');
                    selectOptionByValue(count,driverType,driverStatus);
                    bindInitializeChosen(i); 
                    bindInputTextCharacterCountdownEvent(); 
                    updateTrLength();                    
    }    
}

//Select dropdownList by value while retrieve data
function selectOptionByValue(count,type,status){
    $('#type_'+count+' option[value='+type+']').attr('selected', 'selected');
    $('#status_'+count+' option[value='+status+']').attr('selected', 'selected');
}

//edit max length add br in text remaining
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
                $(this).after("<br id='br'/><small><i><span class='characterCountDown' id='" + spanElementId + "'></span></i></small>");
            }

            //if exist, change the text.
            $span_character_countdown = $("#" + spanElementId);
            var currentLength = this.value.length;
            $span_character_countdown.text((maxLength - currentLength) + " characters remaining.");
        });

        $inputText.blur(function () {
            $("#span_" + this.id).remove();
            $("#br").remove();
        });
    });
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



function driverIdIsExistValidation(value,driverName){
    var jqXHR = $.ajax({
       url:"DTManagementAjaxServlet",
       data:{driverId:$("#driverId_"+value).val()}
    });
    
    jqXHR.done(function(driverTypeJson)
            {
                if(driverTypeJson == true)
                {
                    alert('Sorry cannot set to Inactive. '+driverName+' on duty'); 
                    $('#status_'+value).val(1);
                    $('#status_'+value).trigger('chosen:updated');
                }              
            });    

            jqXHR.fail(function (){
               alert("Unable to retrieve data!");
            });

            jqXHR.always(function(){
               hideLoading(); 
            });
            return jqXHR;
}

function addDeletedDriverId(value){
    
    var driverId = $('#driverId_'+value).val() || 0;    
    if(driverId != 0)
    {
        var deletedDriverIdLength = $('.deletedDriverId').length || 0;
        var count = parseInt(deletedDriverIdLength)+1;     
        $('#deletedDriverIdLength').val(count);
        $('#frm').append('<input type="hidden" id="deletedDriverId_'+count+'" name="deletedDriverId_'+count+'" class="deletedDriverId" value="'+driverId+'"/>');
    }    
    
}