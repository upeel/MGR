/* global listOfDTManagerJson, listOfDTManagementHeaderJson, listOfRouteManagementHeaderJson, listOfRouteUsedJson, listOfDeletedDriverIdJson */
$(document).ready(function(){
    retrieveRouteManagemetData();
    updateTrLength();
    addNewRow();   
    validationInput();
    changeInputOrDDL();
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
        bindChosenDDLMulitpleSelectEvent('personInCharge_'+i);
    }
}

//Add new Row
function addNewRow(){
    $('#addNew').click(function(){
       var trLength = $('.trManagement').length +1;
       $('#tbodyId').append('<tr id="trManagement_'+trLength+'" class="trManagement">'+
                                '<td hidden><input type="text" id="driverType_'+trLength+'" name="driverType_'+trLength+'" class="driverType" value=""/></td>'+
                                '<td hidden><input type="text" id="routeId_'+trLength+'" name="routeId_'+trLength+'" class="driverId" value=""/></td>'+
                                '<td id="no_'+trLength+'" class="'+trLength+' paddingBottom mgrPaddingLeft20 a"><input type="text" class="inputBorderless inputNo" readonly id="inputNo_'+trLength+'" value="'+trLength+'."/></td>'+
                                '<td class="'+trLength+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input maxlength="50" type="text" id="routeName_'+trLength+'" name="routeName_'+trLength+'" class="mgrFormDesign routeName maxWidth" value=""/></td>'+
                                '<td class="'+trLength+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input onkeypress="return isNumber(event);" maxlength="6" type="text" id="postalCodeFrom_'+trLength+'" name="postalCodeFrom_'+trLength+'" class="mgrFormDesign postalCodeFrom maxWidth" value=""/></td>'+
                                '<td class="'+trLength+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input onkeypress="return isNumber(event);" maxlength="6" type="text" id="postalCodeTo_'+trLength+'" name="postalCodeTo_'+trLength+'" class="mgrFormDesign postalCodeTo maxWidth" value=""/></td>'+
                                '<td id="ddlOrInput_'+trLength+'" class="ddlOrInput '+trLength+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20">'+
                                    '<select onchange="onGetSelectEntityCodeEvent('+trLength+');" id="personInCharge_'+trLength+'" name="personInCharge_'+trLength+'" class="personInCharge">'+
                                        '<option selected disabled>-- Please Select PIC --</option>'+
                                    '</select>'+
                                '</td>'+
                                '<td class="'+trLength+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20">'+
                                    '<select id="type_'+trLength+'" name="type_'+trLength+'" class="type">'+
                                        '<option selected disabled>Driver/Technician</option>'+
                                        '<option value="0">Driver</option>'+
                                        '<option value="1">Technician</option>'+
                                    '</select>'+
                                '</td>'+
                                '<td class="'+trLength+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20">'+
                                    '<select id="status_'+trLength+'" name="status_'+trLength+'" class="status">'+
                                        '<option selected disabled>-- Please Select Status --</option>'+
                                        '<option value="1">Active</option>'+
                                        '<option value="0">Inactive</option>'+
                                    '</select>'+
                                '</td>'+                               
                                '<td class="'+trLength+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><img onclick="deleteRow('+trLength+');" id="delete_'+trLength+'" class="logoTheadTableMgr delete" src="../../include/mgr/include/images/MGR-LOGO/Trash.png"/></td>'+
                            '</tr>');
                    $('.1').addClass('paddingTopBottom');
                    appendDriverList(trLength);
                    disabledType();
                    bindInitializeChosen(trLength); 
                    bindInputTextCharacterCountdownEvent(); 
                    updateTrLength();
                    
    });
}

//DeleteRow
function deleteRow(id){
    var routeName = $('#routeName_'+id).val();
    
    // array for route that being used on delivery schedule
    var array = listOfRouteUsedJson;
    var idCheck = $('#routeId_'+id).val();   
    
    if(array.includes(parseInt(idCheck)))
    {
        alert('Please Select Status To Be Inactive, ' + routeName+' is Being Assigned To Delivery Schedule');
        return false;
    }
    else
    {
        var confirmation = window.confirm('Are you sure want to delete '+routeName+' from list?');
        if(confirmation == true)
        {
            deletedRouteId(id);
            $('#trManagement_'+id).remove();
            resetRow();
            updateTrLength();
            alert(routeName + " deleted SuccessFully");
        }   
    }
}

function deletedRouteId(id){
            var deletedRouteId = $('#routeId_'+id).val() || 0;
            
            if(deletedRouteId !=0)
            {    
                var deletedRouteIdLength = $('.deletedRouteId').length || 0;
                var count = deletedRouteIdLength +1;
                $('#frm').append('<input type="hidden" id="deletedRouteId_'+count+'" name="deletedRouteId_'+count+'" class="deletedRouteId" value="'+deletedRouteId+'"/>');                 
                $('#deletedRouteIdLength').val(count);
            }       
}

//ResetRowNumber
function resetRow(){
    var i=1;
        $('.trManagement').each(function(){
            $(this).attr({id: 'trManagement_'+i , name: 'trManagement_'+i});
            $(this).find('.inputNo').attr({id: 'inputNo_'+i , value:i});
            $(this).find('.routeId').attr({id: 'routeId_'+i , name: 'routeId_'+i});
            $(this).find('.routeName').attr({id: 'routeName_'+i , name: 'routeName_'+i});
            $(this).find('.postalCodeFrom').attr({id: 'postalCodeFrom_'+i , name: 'postalCodeFrom_'+i});
            $(this).find('.postalCodeTo').attr({id: 'postalCodeTo_'+i , name: 'postalCodeTo_'+i});
            $(this).find('.personInCharge').attr({id: 'personInCharge_'+i , name: 'personInCharge_'+i});
            $(this).find('.type').attr({id: 'type_'+i , name: 'type_'+i});
            $(this).find('.status').attr({id: 'status_'+i , name: 'status_'+i});
            $(this).find('.delete').attr({id: 'delete_'+i , name: 'delete_'+i, onclick:'deleteRow('+i+');'});
            $(this).find('.paddingBottom').attr('class',i+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20');
            
            var deletedLength = $('.deletedDriverId').length;
            if(parseInt(deletedLength) <= i)
            {
                $(this).find('.deletedDriverId').attr({id:'deletedDriverId_'+i, name:'deletedDriverId_'+i});
                $(this).find('.deletedDriverName').attr({id:'deletedDriverName_'+i, name:'deletedDriverName_'+i});
            }
            
            $(this).find('.a').attr('id',i);
            i++;
        });
        $('.1').addClass('paddingTopBottom');        
}
//input validation
function validationInput(){
    $('#btnUpdateManagement').click(function() {        
        var trLength = $('.trManagement').length;    
        var array =[]; 
        var exist = false;
        
        
        for(var i=1;i<=trLength;i++)
        {
            var routeName = 'routeName_'+i;
            var postalCodeFrom = 'postalCodeFrom_'+i;
            var postalCodeTo = 'postalCodeTo_'+i;
            var personInCharge = 'personInCharge_'+i;
            var type = 'type_'+i;
            var status = 'status_'+i;
            
            var routeNameVal = $('#routeName_'+i).val();
            var postalCodeFromVal = $('#postalCodeFrom_'+i).val();
            var postalCodeToVal = $('#postalCodeTo_'+i).val();
            var personInChargeVal = $('#personInCharge_'+i).val();
            var typeVal = $('#type_'+i).val();
            var statusVal = $('#status_'+i).val(); 
            var deletedDriverId = $('#deletedDriverId_'+i).val();
            var driverId;
            if(deletedDriverId != null)
            {
                driverId = deletedDriverId;
            }
            else
            {
                driverId = personInChargeVal;
            }
            
                      
            if(!array.includes(routeNameVal))
            {
                array.push(routeNameVal);
            }
            else
            {
               exist = true;                
            }
            
            
            if(routeNameVal == "")
            {
                var headerName = "Route Name"
                validationForm(headerName, i, routeName);
                return false;
            }
            else if(postalCodeFromVal == "")
            {
                var vehicle = "Postal Ship From"
                validationForm(vehicle, i, postalCodeFrom);
                return false;
            }
            else if(postalCodeToVal == "")
            {
                var contact = "Postal Ship To"
                validationForm(contact, i, postalCodeTo);
                return false;
            }
            else if(driverId == null)
            {
                var contact = "Person In Charge"
                validationForm(contact, i, personInCharge);
                return false;
            }
            else if(typeVal == null)
            {
                var types = "Driver Type"
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
                alert(routeNameVal+' already exist!');
                $('#routeName_'+i).val('');
                $('#routeName_'+i).focus();
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
    if(headerName == 'Driver Type' || headerName == 'Status' || headerName == 'Person In Charge')
    {
        alert('Plese Select ' + headerName +' at row '+no);
    }
    else
    {
        alert(headerName +' at row '+no+' cannot be Empty');   
    }    
    scrollTo(valName);
    $('#'+valName).focus();
}

function retrieveRouteManagemetData(){
    var RouteData = listOfRouteManagementHeaderJson;
    for(var i in RouteData)
    {
        var count = parseInt(i)+1;
        
        var routeId = RouteData[i].id;
        var routeName = RouteData[i].routeName;
        var postalCodeFrom = RouteData[i].postalShipFrom;
        var postalCodeTo = RouteData[i].postalShipTo;
        var personInCharge = RouteData[i].personInCharge;
        var type = RouteData[i].driverType;
        var status = RouteData[i].status;
                
        if(routeId == 'undefined')
        {
            routeId = "";
        }
        if(routeName == 'undefined')
        {
            routeName="";
        }
        if(postalCodeFrom == 'undefined')
        {
            postalCodeFrom="";
        }
        if(postalCodeTo == 'undefined')
        {
            postalCodeTo="";
        }
        if(personInCharge == 'undefined')
        {
            personInCharge="";
        }
        if(type == 'undefined')
        {
            type="";
        }
        if(status == 'undefined')
        {
            status="";
        }
        $('#tbodyId').append('<tr id="trManagement_'+count+'" class="trManagement">'+
                                '<td hidden><input type="text" id="driverType_'+count+'" name="driverType_'+count+'" class="driverType" value="'+type+'"/></td>'+
                                '<td hidden><input type="text" id="routeId_'+count+'" name="routeId_'+count+'" class="driverId" value="'+routeId+'"/></td>'+
                                '<td id="no_'+count+'" class="'+count+' paddingBottom mgrPaddingLeft20 a"><input type="text" class="inputBorderless inputNo" readonly id="inputNo_'+count+'" value="'+count+'."/></td>'+
                                '<td class="'+count+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input maxlength="50" type="text" id="routeName_'+count+'" name="routeName_'+count+'" class="mgrFormDesign routeName maxWidth" value="'+routeName+'"/></td>'+
                                '<td class="'+count+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input onkeypress="return isNumber(event);" maxlength="6" type="text" id="postalCodeFrom_'+count+'" name="postalCodeFrom_'+count+'" class="mgrFormDesign postalCodeFrom maxWidth" value="'+postalCodeFrom+'"/></td>'+
                                '<td class="'+count+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input onkeypress="return isNumber(event);" maxlength="6" type="text" id="postalCodeTo_'+count+'" name="postalCodeTo_'+count+'" class="mgrFormDesign postalCodeTo maxWidth" value="'+postalCodeTo+'"/></td>'+
                                '<td id="ddlOrInput_'+count+'" class="'+count+' ddlOrInput paddingBottom mgrPaddingLeft20 mgrPaddingRight20">'+                                
                                '</td>'+
                                '<td class="'+count+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20">'+
                                    '<select id="type_'+count+'" name="type_'+count+'" class="type">'+
                                        '<option selected disabled>Driver/Technician</option>'+
                                        '<option value="0">Driver</option>'+
                                        '<option value="1">Technician</option>'+
                                    '</select>'+
                                '</td>'+
                                '<td class="'+count+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20">'+
                                    '<select onchange="routeStatusOnChange(this);" id="status_'+count+'" name="status_'+count+'" class="status">'+
                                        '<option selected disabled>-- Please Select Status --</option>'+
                                        '<option value="1">Active</option>'+
                                        '<option value="0">Inactive</option>'+
                                    '</select>'+
                                '</td>'+                               
                                '<td class="'+count+' paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><img onclick="deleteRow('+count+');" id="delete_'+count+'" class="logoTheadTableMgr delete" src="../../include/mgr/include/images/MGR-LOGO/Trash.png"/></td>'+
                            '</tr>');
                    $('.1').addClass('paddingTopBottom');     
                    changeInputOrDDL(count,personInCharge); 
                    selectOptionByValue(count,type,status,personInCharge); 
                    disabledType();                                      
                    bindInitializeChosen(count);                     
                    bindInputTextCharacterCountdownEvent(); 
                    updateTrLength();        
    }    
}

function changeInputOrDDL(count,personInCharge){
    var array = listOfDeletedDriverIdJson;
    if(!array.includes(personInCharge))
    {    
        deletedDriverRemove(count);
        personInChargeAppend(count);
    }
    else
    {   
        personInChargeRemove(count);
        driverDeletedAppend(count,personInCharge);        
    }
}

function personInChargeAppend(count){
    $('#ddlOrInput_'+count).append('<select onchange="onGetSelectEntityCodeEvent('+count+');" id="personInCharge_'+count+'" name="personInCharge_'+count+'" class="personInCharge">'+
                                            '<option selected disabled>-- Please Select PIC --</option>'+
                                       '</select>');
    appendDriverList(count);
    bindChosenDDLMulitpleSelectEvent('personInCharge_'+count);
}

function driverDeletedAppend(count,personInCharge){
    var deletedDriverName = listOfDTManagementHeaderJson;
    for(var i in deletedDriverName)
    {
        if(deletedDriverName[i].id === parseInt(personInCharge))
        {
            $('#ddlOrInput_'+count).append('<input hidden type="text" id="deletedDriverId_'+count+'" name="deletedDriverId_'+count+'" value="'+personInCharge+'" class="deletedDriverId" readonly/>'+
                                           '<input type="text" id="deletedDriverName_'+count+'" name="deletedDriverName_'+count+'" class="deletedDriverName mgrFormDesign" value="'+deletedDriverName[i].dtName+'" readonly/>');   
        }
    }    
}

function personInChargeRemove(count){
    $('.personInCharge').eq(count).remove();
    $('.personInCharge').trigger('chosen:updated');
}

function deletedDriverRemove(count){
    $('#deletedDriverId_'+count).remove();
    $('#deletedDriverName_'+count).remove();
}

//Select dropdownList by value while retrieve data
function selectOptionByValue(count,type,status,personInCharge){
    $('#type_'+count+' option[value='+type+']').attr('selected', 'selected');
    $('#type_'+count).trigger('chosen:updated');
    
    $('#status_'+count+' option[value='+status+']').attr('selected', 'selected');
    $('#status_'+count).trigger('chosen:updated');
    
    $('#personInCharge_'+count+' option[value='+personInCharge+']').attr('selected', 'selected');
    $('#personInCharge_'+count).trigger('chosen:updated');
}

//Add driver list to dropdown driver
function appendDriverList(value){
    var deletedDriverId = listOfDeletedDriverIdJson;
    var driverList = listOfDTManagementHeaderJson;
    for(var i in driverList)
    {   
        if(!deletedDriverId.includes(driverList[i].id))
        {
            $('#personInCharge_'+value).append('<option value="'+driverList[i].id+'">'+driverList[i].dtName+'</option>');
        }        
    }
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

function onGetSelectEntityCodeEvent(value)
    {            
            var jqXHR = $.ajax({
                url: "getDriverTypeAjax",
                data: {personInCharge: $("#personInCharge_"+value).children('option:selected').val()}            
            });

            jqXHR.done(function(driverTypeJson)
            {
                $('#type_'+value).val(driverTypeJson);
                $('#type_'+value).trigger("chosen:updated");   
                $('#driverType_'+value).val(driverTypeJson);
            });    

            jqXHR.fail(function (){
               alert("Unable to retrieve data!");
            });

            jqXHR.always(function(){
               hideLoading(); 
            });
            return jqXHR;
    }
    
    function disabledType(){
        $('.type').prop('disabled', true);
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

    function routeIdIsExistValidation(value){
        var jqXHR = $.ajax({
           url:"checkRouteIdIsExistAjaxServlet",
           data:{routeId:$("#routeId_"+value).val()}
        });

        jqXHR.done(function(routeIdExistJson)
                {
                    if(routeIdExistJson == true)
                    {
                        alert('Sorry cannot set route status to inactive.Delivery not completed'); 
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

    function routeStatusOnChange(element){
        var index = $("."+element.className).index(element) +1;
        var status = $('#status_'+index).val();
        var arrays = listOfDeletedDriverIdJson;
        var deletedDriverId = $('#deletedDriverId_'+index).val();        
        
        if(deletedDriverId == null)
        {
            routeIdIsExistValidation(index)
        }
    //    routeIdIsExistValidation(index);        
        if(parseInt(status) === 1 && arrays.includes(parseInt(deletedDriverId)))
        {   
            if($("#personInCharge_"+index).length == 0)
            {
                personInChargeAppend(index);
            }  
            $('#personInCharge_'+index+'_chosen').show();
            $('#personInCharge_'+index).trigger('chosen:updated');
            $('#deletedDriverName_'+index).hide();
        } 
        else if(parseInt(status) === 0 && arrays.includes(parseInt(deletedDriverId)))
        {
            $('#deletedDriverName_'+index).show();
            $('#personInCharge_'+index+'_chosen').hide();
            $('#personInCharge_'+index).trigger('chosen:updated');
        }
    }