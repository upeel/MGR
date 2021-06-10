
/* global listOfCustomerMasterShippingDetailJson, listOfCustomerMastersJson */

function manageId()
{   
    $('#minimizeIcon').attr('src', '../../include/mgr/include/images/MGR-LOGO/Up.png');
    $('#maxMin').attr('id', 'maxMin1');
    $('#divNumber').attr('id', 'divNumber1');
    $('#txtShipToLocation').attr('id', 'txtShipToLocation_1');
    $('#txtShipToLocation_1').attr('name', 'txtShipToLocation_1');    
    $('#txtAddressLine1').attr('id', 'txtAddressLine1_1');
    $('#txtAddressLine1_1').attr('name', 'txtAddressLine1_1');
    
    $('#txtContactPerson').attr('id', 'txtContactPerson_1');
    $('#txtContactPerson_1').attr('name', 'txtContactPerson_1');    
    $('#txtAddressLine2').attr('id', 'txtAddressLine2_1');
    $('#txtAddressLine2_1').attr('name', 'txtAddressLine2_1');
    
    $('#txtContactNo').attr('id', 'txtContactNo_1');
    $('#txtContactNo_1').attr('name', 'txtContactNo_1');    
    $('#txtAddressLine3').attr('id', 'txtAddressLine3_1');
    $('#txtAddressLine3_1').attr('name', 'txtAddressLine3_1');
    
    $('#txtEmail').attr('id', 'txtEmail_1');
    $('#txtEmail_1').attr('name', 'txtEmail_1');    
    $('#txtAddressLine4').attr('id', 'txtAddressLine4_1');
    $('#txtAddressLine4_1').attr('name', 'txtAddressLine4_1');
    
    $('#txtCountry').attr('id', 'txtCountry_1');
    $('#txtCountry_1').attr('name', 'txtCountry_1');    
    $('#txtCity').attr('id', 'txtCity_1');
    $('#txtCity_1').attr('name', 'txtCity_1');
    
    $('#txtPostalCode').attr('id', 'txtPostalCode_1');
    $('#txtPostalCode_1').attr('name', 'txtPostalCode_1');    
    $('#txtState').attr('id', 'txtState_1');
    $('#txtState_1').attr('name', 'txtState_1');    
}

function setTab1OnCheckWhenFirstLoad() {
    $('input#tab1').prop('checked', true);
    $('img#sales').attr('src', '../../include/mgr/include/images/MGR-LOGO/Client Info Green.png');
}

//function addNewTableUser(){
//    $('#addUser').click(function(){
//        var customerId = $('#userCustomerId_1').val() || 0;
//        var table = $('.divParent').length;
//        var count = parseInt(table) +1;
//        $('#divTab3').append('<div id="divParent'+count+'" class="divParent">\n\
//                                <input type="hidden" class="shipCustomerId" id="userCustomerId_'+count+'" name="userCustomerId_'+count+'" value="'+customerId+'">\n\
//                                <input type="hidden" value="'+count+'">\n\
//                                <br>\n\
//                                <div class="mgrDataTableThead maxMin" id="maxMin'+count+'" style="border-radius: 5px; display: flex;">'+                    
//                                    '\
//                    \n\                                   <a style="padding-left: 100px; text-align: center; width: 100%; padding-top: 10px; height: 35px">User Account '+count+'</a>'+
//                                    '<table style="margin-top: -2px; width: 5%;">\n\
//                    <tr><td><img onclick="minimimzerow($(this));" class="minimize" id="minimizeIcon'+count+'" style="padding-right: 5px; padding-top: 10px; height: 25px; width: 25px" src="../../include/mgr/include/images/MGR-LOGO/Up.png" alt="min"></td>'+
//                                    '<td><img onclick="deleteRow($(this));" id="deleteIcon'+count+'" class="formImageIconSize remove" style="padding-top: 10px; height: 25px; width: 25px; padding-right: 8px;"  src="../../include/mgr/include/images/MGR-LOGO/Close.png" alt="logo delete icon"></td></tr></table>'+
//                                '</div>\n\
//                                <br>'
//                +
//         
//                                '<div class="divNumber tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr" id="divNumber'+count+'">'+
//                                    '<div style="display:flex;">' +
//                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >First Name<span class="mandatory">*</span></a></div>' +
//                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
//                                                '<input required style="margin-bottom: 10px;" class="mgrFormDesign" type="text" id="firstName_'+count+'" name="firstName_'+count+'" />' +
//                                        '</div>' +
//                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >Login ID</a><span class="mandatory">*</span></div>' +
//                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
//                                            '<input required  style="margin-bottom: 10px;" class="mgrFormDesign" type="text" id="loginId_'+count+'" name="loginId_'+count+'" />' +
//                                        '</div>' +
//                                    '</div>'+
//                                    '<div style="display:flex;">' +
//                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >Middle Name</a></div>' +
//                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
//                                            '<input required  style="margin-bottom: 10px;" class="mgrFormDesign" type="text" id="midName_'+count+'" name="midName_'+count+'" />' +
//                                        '</div>' +
//                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >Password</a><span class="mandatory">*</span></div>' +
//                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
//                                            '<input required  style="margin-bottom: 10px;" class="mgrFormDesign" type="text" id="password_'+count+'" name="password_'+count+'" />' +
//                                        '</div>' +
//                                    '</div>'+
//                                    '<div style="display:flex;">' +
//                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >Last Name</a><span class="mandatory">*</span></div>' +
//                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
//                                            '<input required  style="margin-bottom: 10px;" class="mgrFormDesign" type="text" id="lastName_'+count+'" name="lastName_'+count+'" />' +
//                                        '</div>' +
//                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >Confirm Password</a></div>' +
//                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
//                                            '<input required  style="margin-bottom: 10px;" class="mgrFormDesign" type="text" id="passwordCon_'+count+'" name="passwordCon_'+count+'" />' +
//                                        '</div>' +
//                                    '</div>'+
//                                    '<div style="display:flex;">' +
//                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >Email</a><span class="mandatory">*</span></div>' +
//                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
//                                            '<input onchange="emailValidation(this);" maxlength="50" required  style="margin-bottom: 10px;" class="mgrFormDesign" type="text" id="userEmail_'+count+'" name="userEmail_'+count+'" />' +
//                                        '</div>' +
//                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >ContactNo</a></div>' +
//                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
//                                            '<input required  style="margin-bottom: 10px;" class="mgrFormDesign" type="text" id="contactNo_'+count+'" name="contactNo_'+count+'" />' +
//                                        '</div>' +
//                                    '</div>'+
//                                    '<div style="display:flex;">' +
//                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >Mobile No</a></div>' +
//                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
//                                            '<input required  style="margin-bottom: 10px;" class="mgrFormDesign" type="text" id="mobileNo_'+count+'" name="mobileNo_'+count+'" />' +
//                                        '</div>' +
//                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >Fax No</a></div>' +
//                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
//                                            '<input required  style="margin-bottom: 10px;" class="mgrFormDesign" type="text" id="faxNo_'+count+'" name="faxNo_'+count+'" />' +
//                                        '</div>' +
//                                    '</div>'+
//                                    '<div style="display:flex;">'+
//                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >Postal Code</a><span class="mandatory">*</span></div>' +
//                                        '<div style="width: 305.35px; padding-bottom: 20px !important">'+
//                                            '<input onkeypress="return isNumber(event);" maxlength="6" required  style="margin-bottom: 10px;" class="mgrFormDesign txtPostalCode" type="text" id="txtPostalCode_'+count+'" name="txtPostalCode_'+count+'" />'+
//                                        '</div>'+
//                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >State</a><span class="mandatory">*</span></div>'+
//                                        '<div style="width: 305.35px; padding-bottom: 20px !important">'+
//                                            '<input maxlength="50" required  style="margin-bottom: 10px;" class="mgrFormDesign txtState" type="text" id="txtState_'+count+'" name="txtState_'+count+'" />'+
//                                        '</div>'+
//                                    '</div>'+
//                                '</div>\n\
//                </div>');
//    });
//}
function addNewTable(){   
    $('#addShip').click(function(){
        var customerId = $('#shipCustomerId_1').val() || 0;
        var table = $('.parentDiv').length;
        var count = parseInt(table) +1;
        $('#shippingCount').val(count);     
        $('#divTab2').append('<div id="parentDiv'+count+'" class="parentDiv">\n\
                                <input type="hidden" class="shipCustomerId" id="shipCustomerId_'+count+'" name="shipCustomerId_'+count+'" value="'+customerId+'">\n\
                                <input type="hidden" value="'+count+'"><input type="hidden" type="hidden" id="shippingId_'+count+'" value="0">\n\
                                <br>\n\
                                <div class="mgrDataTableThead maxMin" id="maxMin'+count+'" style="border-radius: 5px; display: flex;">'+                    
                                    '\
                    \n\                                   <a style="padding-left: 100px; text-align: center; width: 100%; padding-top: 10px; height: 35px">Shipping Details '+count+'</a>'+
                                    '<table style="margin-top: -2px; width: 5%;">\n\
                    <tr><td><img onclick="minimimzerow($(this));" class="minimize" id="minimizeIcon'+count+'" style="padding-right: 5px; padding-top: 10px; height: 25px; width: 25px" src="../../include/mgr/include/images/MGR-LOGO/Up.png" alt="min"></td>'+
                                    '<td><img onclick="deleteRow($(this), '+count+');" id="deleteIcon'+count+'" class="formImageIconSize remove" style="padding-top: 10px; height: 25px; width: 25px; padding-right: 8px;"  src="../../include/mgr/include/images/MGR-LOGO/Close.png" alt="logo delete icon"></td></tr></table>'+
                                '</div>\n\
                                <br>'
                +
         
                                '<div class="divNumber tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr" id="divNumber'+count+'">'+
                                    '<div style="display:flex;">' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >Ship To Location<span class="mandatory">*</span></a></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                                '<input required maxlength="50" onclick="ml('+count+');" style="margin-bottom: 10px;" class="mgrFormDesign txtShipToLocation" type="text" id="txtShipToLocation_'+count+'" name="txtShipToLocation_'+count+'" />' +
                                        '</div>' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >Address(line 1)</a><span class="mandatory">*</span></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input maxlength="100" required  style="margin-bottom: 10px;" class="mgrFormDesign txtAddressLine1" type="text" id="txtAddressLine1_'+count+'" name="txtAddressLine1_'+count+'" />' +
                                        '</div>' +
                                    '</div>'+
                                    '<div style="display:flex;">' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >Contact Person</a><span class="mandatory">*</span></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input maxlength="50" required  style="margin-bottom: 10px;" class="mgrFormDesign txtContactPerson" type="text" id="txtContactPerson_'+count+'" name="txtContactPerson_'+count+'" />' +
                                        '</div>' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >Address(line 2)</a></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input maxlength="100" required  style="margin-bottom: 10px;" class="mgrFormDesign txtAddressLine2" type="text" id="txtAddressLine2_'+count+'" name="txtAddressLine2_'+count+'" />' +
                                        '</div>' +
                                    '</div>'+
                                    '<div style="display:flex;">' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >Contact No.</a><span class="mandatory">*</span></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input maxlength="50" required  style="margin-bottom: 10px;" class="mgrFormDesign txtContactNo" type="text" id="txtContactNo_'+count+'" name="txtContactNo_'+count+'" />' +
                                        '</div>' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >Address(line 3)</a></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input maxlength="100" required  style="margin-bottom: 10px;" class="mgrFormDesign txtAddressLine3" type="text" id="txtAddressLine3_'+count+'" name="txtAddressLine3_'+count+'" />' +
                                        '</div>' +
                                    '</div>'+
                                    '<div style="display:flex;">' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >Email</a></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input onchange="emailValidation(this);" maxlength="50" required  style="margin-bottom: 10px;" class="mgrFormDesign txtEmail" type="text" id="txtEmail_'+count+'" name="txtEmail_'+count+'" />' +
                                        '</div>' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >Address(line 4)</a></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input maxlength="100" required  style="margin-bottom: 10px;" class="mgrFormDesign txtAddressLine4" type="text" id="txtAddressLine4_'+count+'" name="txtAddressLine4_'+count+'" />' +
                                        '</div>' +
                                    '</div>'+
                                    '<div style="display:flex;">' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >Country</a><span class="mandatory">*</span></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input maxlength="50" required  style="margin-bottom: 10px;" class="mgrFormDesign txtCountry" type="text" id="txtCountry_'+count+'" name="txtCountry_'+count+'" />' +
                                        '</div>' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >City</a></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input maxlength="50" required  style="margin-bottom: 10px;" class="mgrFormDesign txtCity" type="text" id="txtCity_'+count+'" name="txtCity_'+count+'" />' +
                                        '</div>' +
                                    '</div>'+
                                    '<div style="display:flex;">'+
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >Postal Code</a><span class="mandatory">*</span></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">'+
                                            '<input onkeypress="return isNumber(event);" maxlength="6" required  style="margin-bottom: 10px;" class="mgrFormDesign txtPostalCode" type="text" id="txtPostalCode_'+count+'" name="txtPostalCode_'+count+'" />'+
                                        '</div>'+
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >State</a></div>'+
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">'+
                                            '<input maxlength="50" required  style="margin-bottom: 10px;" class="mgrFormDesign txtState" type="text" id="txtState_'+count+'" name="txtState_'+count+'" />'+
                                        '</div>'+
                                    '</div>'+
                                '</div>\n\
                </div>');               
               

               $('#txtShipToLocation_'+count).focus();
                
                reset();   
                bindInputTextCharacterCountdownEvent();   
    });
}

function minimimzerow(element){    
                var div = element;
                var divfooter = '#'+element.closest('div.parentDiv').find('div.divNumber').attr('id');
                    
                var dataValue = $(div).attr('alt');
                if(dataValue === 'min') {
                    $(div).attr('src', '../../include/mgr/include/images/MGR-LOGO/Down.png');
                    $(div).attr('alt', 'max');
                    $(divfooter).fadeOut();
                } 
                else if(dataValue === 'max') {
                    $(div).attr('src', '../../include/mgr/include/images/MGR-LOGO/Up.png');
                    $(div).attr('alt', 'min');
                    $(divfooter).fadeIn();
                }  
}

function deleteRow(element, row){
    var parameter='#'+element.attr('id');
    var parentDiv = $(parameter).closest('div.parentDiv');

    var table = $('.parentDiv').length;
    
    // check shipping used by another like (contract, order, do, invoice)
    var shipping_id = $('#shippingId_'+row);
//    var business_entity_id will be required in the future if this got an issue on relation
    var customer_code = $('#customerCode');
    var entity_id = $('#txtEntityIdHidden');
    // do validating if shipping already been submitted before
    if(shipping_id.val() !== '0') {
        var jqXHR = $.ajax({
            method: 'GET',
            url: '../AjaxServlet/CheckCustomerShippingIsBeingUsed',
            data: {
                customer_code: customer_code.val(), 
                shipping_id: shipping_id.val(),
                entity_id: entity_id.val()
            }
        });
        
        jqXHR.done(function(data) {
            if(data === true) {
                alert('This Customer Shipping Is Being Used By Contract!');
                return false;
            }
            
            if(table === 1) {
                alert('Shipping Detail Cannot Be Delete, At Least 1 Shipping Per Customer!');
                return false;
            }
            $(parentDiv).remove();

            reset();
        });
        
        jqXHR.fail(function(data) {
            
        });
    } else {
        if(table === 1) {
            alert('Shipping Detail Cannot Be Delete, At Least 1 Shipping Per Customer!');
            return false;
        }
        $(parentDiv).remove();

        reset();
    }        
}

function reset() {
    var i = 1;
    var table = $('.parentDiv').length;
    $('#shippingCount').val(table);
    $('#divTab2 div.parentDiv').each(function() {
        $(this).attr('id', 'parentDiv'+i);
        $(this).find('div.divNumber').attr('id','divNumber'+i);
        $(this).find('img.minimize').attr('id','minimize'+i);
        $(this).find('img.remove').attr('id','remove'+i);

        $(this).find('input.txtShipToLocation').attr({id:'txtShipToLocation_'+i, name: 'txtShipToLocation_'+i});
        $(this).find('input.txtAddressLine1').attr({id:'txtAddressLine1_'+i,name:'txtAddressLine1_'+i});
        $(this).find('input.txtContactPerson').attr({id:'txtContactPerson_'+i,name:'txtContactPerson_'+i});
        $(this).find('input.txtAddressLine2').attr({id:'txtAddressLine2_'+i,name:'txtAddressLine2_'+i});
        $(this).find('input.txtContactNo').attr({id:'txtContactNo_'+i,name:'txtContactNo_'+i});
        $(this).find('input.txtAddressLine3').attr({id:'txtAddressLine3_'+i,name:'txtAddressLine3_'+i});
        $(this).find('input.txtEmail').attr({id:'txtEmail_'+i,name:'txtEmail_'+i});
        $(this).find('input.txtAddressLine4').attr({id:'txtAddressLine4_'+i,name:'txtAddressLine4_'+i});
        $(this).find('input.txtCountry').attr({id:'txtCountry_'+i,name:'txtCountry_'+i});
        $(this).find('input.txtCity').attr({id:'txtCity_'+i,name:'txtCity_'+i});
        $(this).find('input.txtPostalCode').attr({id:'txtPostalCode_'+i,name:'txtPostalCode_'+i});
        $(this).find('input.txtState').attr({id:'txtState_'+i,name:'txtState_'+i});
        
        $(this).find('div.maxMin a').text('Shipping Details ' + i);
        i++;
    });
}

/* tabs on click to set image */
function bindOnClickActiveTabs() {
    $('label.tabs').click(function() {
        var dataValue = $(this).find('span').data('value');
        if(dataValue === 'sales') {
            $('img#sales').attr('src', '../../include/mgr/include/images/MGR-LOGO/Client Info Green.png');
            $('img#lease').attr('src', '../../include/mgr/include/images/MGR-LOGO/Shipping Info Icon.png');
            $('.tab2').hide();
            $('.tab1').show();
            $('.tab3').hide();
            $('html, body').scrollTop('contactPerson');
            $('#btnPriceList').fadeIn('fast');
            $('#btnAdd').hide();
            $('#addShip').hide();
//            var focuszs =$(".tab1");; 
//                $('html, body').animate({
//                    scrollTop: $(focuszs).offset().top-100
//                }, 0, function(){$(focuszs).focus();
//                });
        } else if(dataValue === 'lease') {
            $('img#sales').attr('src', '../../include/mgr/include/images/MGR-LOGO/Client Info Icon.png');
            $('img#lease').attr('src', '../../include/mgr/include/images/MGR-LOGO/Shipping Info Green.png');
            $('.tab1').hide();
            $('.tab2').show();
            $('.tab3').hide();
            $('#btnAdd').hide();
            $('#btnPriceList').hide();
            $('#addShip').fadeIn('fast');
//            var focusz = 'maxMin1';        
//               
//                $('html, body').animate({
//                    scrollTop: $(focusz).offset().top
//                }, 0, function(){$(focusz).focus();
//                });
        } else if(dataValue === 'user') {
            $('.tab1').hide();
            $('.tab2').hide();
            $('.tab3').show();
            $('#btnPriceList').hide();
            $('#addShip').hide();
            $('#btnAdd').show();
            $('#btnSubmit').hide();
        }
    });
}

function ml(parameterz){
    var co ="#txtShipToLocation"+parameterz;
    $(co).attr('maxlength','100');
}

function bindInitializeDropDownChosen() {
    bindChosenDDLMulitpleSelectEvent('ddlCustomerType');
    bindChosenDDLMulitpleSelectEvent('ddlCustomerStatus');
    bindChosenDDLMulitpleSelectEvent('ddlCustomerPaymentTerms');
    bindChosenDDLMulitpleSelectEvent('ddlCurrency');
    bindChosenDDLMulitpleSelectEvent('ddlCustomerTax');
    bindChosenDDLMulitpleSelectEvent('ddlCustomerEntity');   
}

function minimizeIcon (){
    $('#minimizeIcon').click(function(){    
    var dataValue = $(this).attr('alt');
        if(dataValue === 'min') {
            $(this).attr('src', '../../include/mgr/include/images/MGR-LOGO/Down.png');
            $(this).attr('alt', 'max');
            $('#divNumber1').fadeOut();
        } 
        else if(dataValue === 'max') {
            $(this).attr('src', '../../include/mgr/include/images/MGR-LOGO/Up.png');
            $(this).attr('alt', 'min');
            $('#divNumber1').fadeIn();
        }     
    });
}

function injectIntentionInputElementIntoFrm1(intention)
{
    //clear existing intention
    $("#txtIntention").remove();

    //define the intention
    var $intentionInput = $("<input>")
            .attr("id", "txtIntention")
            .attr("name", "txtIntention")
            .attr("type", "text")
            .attr("hidden", true)
            .val(intention);

    //attach the intention to the form element, so that server side knows which operation to perform
    $intentionInput.appendTo("#frm1");
}

function validationCheck(){
   var valid = true; 
   var userTab = $('label[for="tab3"]');
   var firstname = $('#firstNameUser');
   var loginId = $('#loginId');
   var password = $('#password');
   var pwdCon = $('#passwordCon');
   var lastname = $('#lastName');
   var email = $('#userEmail');
   
   if(firstname.val() === '' || firstname.val() === null){
       alert('Please fill in the first name!');
       userTab.click();
       scrollTo(firstname.attr('id'));
       firstname.focus();
       return false;
   }
   if(loginId.val() === '' || loginId.val() === null){
       alert('Please fill in the login ID!');
       userTab.click();
       scrollTo(loginId.attr('id'));
       loginId.focus();
       return false;
   }
   if(email.val() === '' || email.val === null){
       alert('Please fill in the email!');
       userTab.click();
       scrollTo(email.attr('id'));
       email.focus();
       return false;
   }
   if(password.val() === null || password.val() === ''){
       alert('Please fill in the password!');
       userTab.click();
       scrollTo(password.attr('id'));
       password.focus();
       return false;
   }
   if(password.val() !== pwdCon.val()){
       alert('Passwords you entered do not match!');
       userTab.click();
       scrollTo(pwdCon.attr('id'));
       pwdCon.focus();
       return false;
   }
   if(pwdCon.val() === '' || pwdCon.val() === null){
       alert('Please enter password again!');
       userTab.click();
       scrollTo(pwdCon.attr('id'));
       pwdCon.focus();
       return false;
   }
   return valid;
}

function addButtonOnClick(){
   $('#btnAdd').click(function(){
       if(validationCheck()){
       injectIntentionInputElementIntoFrm1("ADD");
       var confirmation = window.confirm("Are You Sure Want to Add This User ?");
       if(!confirmation) {
           return false;
       }
       $("#frm1").submit();
       window.parent.opener.location.reload();
    }
   }); 
   
}

function updateButtonDialogOnClick(){
   $('#btnSubmit').click(function(){   
   var pmt = $('#ddlCustomerPaymentTerms').val();
   var cr =  $('#ddlCurrency').val();
   var ctax =  $('#ddlCustomerTax').val();   
   var cety =  $('#ddlCustomerEntity').val();
   var cttp = $('#ddlCustomerType').val();
   var ctn = $('#customerName').val();
   var prg = $('#priceGroup').val();
   var cstc = $('#customerCode').val(); 
   var frst = $('#firstName').val(); 
   var slsps = $('#salesPerson').val();
   var postals = $('#postalCode').val();
   var states = $('#state').val();
   var citys = $('#city').val();
   var countrys = $('#country').val();
   var emails = $('#email').val();
   var fax = $('#fax').val();
   var tel = $('#tel').val();
   var addresLine1 = $('#addressLine1').val();
   var contactPerson = $('#contactPerson').val();
   var stts = $('#ddlCustomerStatus').val();
   var ksg = "";   
    
   var listOfShipLocation = $(".txtShipToLocation");
   var listOfAddressLine1 = $('.txtAddressLine1');
   var result = true;
   var result1 = true;
   
   for(var m=0; m<listOfShipLocation.length; m++){
       var first = listOfShipLocation[m];
       
       for(var n=0; n<listOfShipLocation.length; n++){
           var thisValue = first.value;
           var currentValue = listOfShipLocation[n].value;
           
           if(m !== n && result !== false){
               if(thisValue === currentValue){
                   result = false;
                   var currentsValue = n+1;
               }
           }
       }
       break;
   }
   
   for(var d=0; d<listOfAddressLine1.length; d++){
       var firsts = listOfAddressLine1[d];
       
       for(var e=0; e<listOfAddressLine1.length; e++){
           var thisValues = firsts.value;
           var currentValues = listOfAddressLine1[e].value;
           
           if(d !== e && result1 !== false){
               if(thisValues === currentValues){
                   result1 = false;
                   var currentsValues = e+1;
               }
           }
       }
       break;
   }
   
    var emil = true;
    var em =  $('#email').val();
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(em)) {
     emil = false;
    }
   
   //Ship to Location Validation
   var shipResult = false;
   var adlResult = false;
   var contactPersonResult = false;
   var contactNoResult = false;
   var emailResult = false;
   var countryResult = false;
   var cityResult = false;
   var postalCodeResult = false;
   var stateResult = false;
   var ct = 0;
   //value to parameter after event
   var valueShipId = "";
   var valueAddressId = "";
   var valueContactPerson = "";
   var valueContactNo = "";
   var valueEmail = "";
   var valueCountry = "";
   var valueCity = "";
   var valuePostalCode = "";
   var valueState = "";
   
   //id name that used after event
   var shipId = "";
   var addressId = "";
   var contactPersonIds = "";
   var contactNoIds = "";
   var emailIds = "";
   var countryIds = "";
   var cityIds = "";
   var postalCodeIds = "";
   var stateIds = "";
   for (var s=1 ; s<=listOfShipLocation.length ; s++)   {
       //inputId
       var shipTolocationId = '#txtShipToLocation_'+s;
       var addressLine1Id = '#txtAddressLine1_'+s;
       var contactPersonId = '#txtContactPerson_'+s;
       var contactNoId = '#txtContactNo_'+s;
       var emailId = '#txtEmail_'+s;
       var countryId = '#txtCountry_'+s;
       var cityId = '#txtCity_'+s;
       var postalCodeId = '#txtPostalCode_'+s;
       var stateId = '#txtState_'+s;
       
       //input value
       var valueShip = $(shipTolocationId).val();
       var addressLine1Value = $(addressLine1Id).val();
       var contactPersonValue = $(contactPersonId).val();
       var contactNoValue = $(contactNoId).val();
       var emailValue = $(emailId).val();
       var countryValue = $(countryId).val();
       var cityValue = $(cityId).val();
       var postalCodeValue = $(postalCodeId).val();
       var stateValue = $(stateId).val();
       var emptys = "";
            if (valueShip == emptys )
            {
                if ( ct == 0)
                {
                    shipResult = true;
                    ct +=1; 
                    shipId = shipTolocationId;
                    valueShipId = s;
                    var shipName = 'Ship To Location ';
                }         
            }
            else if (addressLine1Value == emptys )
            {
                if ( ct == 0)
                {
                    adlResult = true;
                    ct +=1; 
                    addressId = addressLine1Id;
                    valueAddressId = s;
                    var addressName = 'Address Line 1 ';
                }         
            }
            else if (contactPersonValue == emptys )
            {
                if ( ct == 0)
                {
                    contactPersonResult = true;
                    ct +=1; 
                    contactPersonIds = contactPersonId;
                    valueContactPerson = s;
                    var contactPersonName = 'Contact Person ';
                }         
            }
            else if (contactNoValue == emptys )
            {
                if ( ct == 0)
                {
                    contactNoResult = true;
                    ct +=1; 
                    contactNoIds = contactNoId;
                    valueContactNo = s;
                    var contactNoName = 'Contact No ';
                }         
            }
            else if (emailValue == emptys )
            {
                if ( ct == 0)
                {
                    emailResult = true;
                    ct +=1; 
                    emailIds = emailId;
                    valueEmail = s;
                    var emailName = 'Email ';
                }         
            }
            else if (countryValue == emptys )
            {
                if ( ct == 0)
                {
                    countryResult = true;
                    ct +=1; 
                    countryIds = countryId;
                    valueCountry = s;
                    var countryName = 'Country ';
                }         
            }
            else if (cityValue == emptys )
            {
                if ( ct == 0)
                {
                    cityResult = true;
                    ct +=1; 
                    cityIds = cityId;
                    valueCity = s;
                    var cityName = 'City ';
                }         
            }
            else if (postalCodeValue == emptys )
            {
                if ( ct == 0)
                {
                    postalCodeResult = true;
                    ct +=1; 
                    postalCodeIds = postalCodeId;
                    valuePostalCode = s;
                    var postalName = 'Postal Code ';
                }         
            }
            else if (stateValue == emptys )
            {
                if ( ct == 0)
                {
                    stateResult = true;
                    ct +=1; 
                    stateIds = stateId;
                    valueState = s;
                    var stateName = 'State ';
                }         
            }
   }
   
   
     
        if (shipResult)    {
        eventIfValidationTrue (valueShipId,shipId,shipName);     
        }
        else if (adlResult)
        {
            eventIfValidationTrue (valueAddressId,addressId,addressName);
        }
        else if (contactPersonResult)
        {
            eventIfValidationTrue (valueContactPerson,contactPersonIds,contactPersonName);
        }
        else if (contactNoResult)
        {
            eventIfValidationTrue (valueContactNo,contactNoIds,contactNoName);
        }
        
        else if (countryResult)
        {
            eventIfValidationTrue (valueCountry,countryIds,countryName);
        }
        else if (postalCodeResult)
        {
            eventIfValidationTrue (valuePostalCode,postalCodeIds,postalName);
        }
       
        else if (!result){
        var stl = 'Ship to Location Address ';
        var classId = '#txtShipToLocation_' +currentsValue;
        var table = $('.parentDiv').length;
        $('#shippingCount').val(table);
        alert(stl+ 'at Shipping Details ' +currentsValue+' already Exists!');
        $('.tab2').fadeIn('fast');
        $('.tab1').fadeOut('fast');
        $('#addShip').fadeIn('fast');
        $('#btnPriceList').fadeOut('fast');
        $('#divNumber'+currentsValue).fadeIn('fast');
        $('#minimizeIcon'+currentsValue).attr('src', '../../include/mgr/include/images/MGR-LOGO/Up.png');
        $('label[for="tab2"]').click();
            $('#minimizeIcon'+currentsValue).attr('alt', 'min');
                var focuszss =$(classId); 
                $('html, body').animate({
                    scrollTop: $(focuszss).offset().top-100
                }, 600, function(){$(focuszss).focus();
                });  
                 
    }
     else if (!result1){
                var stls = 'Address Line 1 ';
                var classId = '#txtAddressLine1_' +currentsValues;
                var table = $('.parentDiv').length;
                $('#shippingCount').val(table);
                alert(stls+ 'at Shipping Details ' +currentsValues+' already Exists!');
                $('.tab2').fadeIn('fast');
                $('.tab1').fadeOut('fast');
                $('#addShip').fadeIn('fast');
                $('#btnPriceList').fadeOut('fast');
                $('#divNumber'+currentsValues).fadeIn('fast');
                $('#minimizeIcon'+currentsValues).attr('src', '../../include/mgr/include/images/MGR-LOGO/Up.png');
                $('label[for="tab2"]').click();
                    $('#minimizeIcon'+currentsValues).attr('alt', 'min');
                        var focuszss =$(classId); 
                        $('html, body').animate({
                            scrollTop: $(focuszss).offset().top-100
                        }, 600, function(){$(focuszss).focus();
                        });
                         
            }
    else
    {
        injectIntentionInputElementIntoForm("UPDATE");
        var confirmation = window.confirm("Are You Sure Want to Submit This Changes ?");
        if(!confirmation) {
            return false;
        }
        $("#frm").submit();
        window.parent.opener.location.reload();
    }
    
   });
}

function eventIfValidationTrue (valueShipId,shipId,shipName){
    alert(shipName+ 'at Shipping Details ' +valueShipId+' Cannot be Empty!');
    $('label[for="tab2"]').click();
//        $('.tab2').fadeIn('fast');
//        $('.tab1').fadeOut('fast');
//        $('#addShip').fadeIn('fast');
//        $('#btnPriceList').fadeOut('fast');
        $('#divNumber'+valueShipId).fadeIn('fast');
        $('#minimizeIcon'+valueShipId).attr('src', '../../include/mgr/include/images/MGR-LOGO/Up.png');
        
            $('#minimizeIcon'+valueShipId).attr('alt', 'min');
                 scrollTo(shipId.split('#')[1]);
                 $(shipId).focus();
    
}

function emailValidation(id){
    var emil = true;
    var em =  $(id).val();
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(em)) {
     emil = false;
    }
    
    if (!emil)
    {
        alert('email must be formatted example@mail.com');
        $(id).val('');
        $(id).focus();
    }
}

function format$(id,currency){
    var values = $(id).value;
    return currency + values.toFixed(2).replace(/./g, function(c, i, a) {
    return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
  });
}

/* bind amount input type on change */
function bindAmountOnChange() {
    $('#priceGroup').change(function() {
        var thisInputAmount = $(this);
        if(thisInputAmount.val().trim() === '.') {
            thisInputAmount.val(0);
        }
        // if empty keep the value empty
        if(thisInputAmount.val() !== '') {
            $(thisInputAmount).val(getPriceFormattedNumber(thisInputAmount.val(), 2));
        }        
    });
}

function focusClientInfo (){
    var focuszss =$("#clientInfo"); 
                $('html, body').animate({
                    scrollTop: $(focuszss).offset().top-100
                }, 600, function(){$(focuszss).focus();
                });
}

function focusBillingInfo(){
    var focuszss =$("#addressLine1"); 
                $('html, body').animate({
                    scrollTop: $(focuszss).offset().top-100
                }, 600, function(){$(focuszss).focus();
                });
}

function focusUserAccount() {
    var focuss = $("#userAccount");
    $('html, body').animate({
        scrollTop: $(focuss).offset().top-100
    }, 600, function(){$(focuss).focus();
    });
}
    
function getShippingList (){
    for (var index in listOfCustomerMasterShippingDetailJson)
        {
//            if (listOfCustomerMasterShippingDetailJson[index].ship_to_location != null)
//            {
                $('#divTab2').empty();
            for (var index in listOfCustomerMasterShippingDetailJson)
                    {
                        var table = $('.parentDiv').length;
                        var count = parseInt(table) +1;
                        
                        var shipto = listOfCustomerMasterShippingDetailJson[index].ship_to_location;
                        if(typeof shipto === 'undefined') {
                            shipto = "";
                        }
                        
                        var addressline1 = listOfCustomerMasterShippingDetailJson[index].address_line_1;
                        if(typeof addressline1 === 'undefined') {
                            addressline1 = "";
                        }
                        var contactPerson = listOfCustomerMasterShippingDetailJson[index].contact_person;
                        if(typeof contactPerson === 'undefined') {
                            contactPerson = "";
                        }
                        var addressLine2 = listOfCustomerMasterShippingDetailJson[index].address_line_2;
                        if(typeof addressLine2 === 'undefined') {
                            addressLine2 = "";
                        }
                        var contactNo = listOfCustomerMasterShippingDetailJson[index].contact_no;
                        if(typeof contactNo === 'undefined') {
                            contactNo = "";
                        }
                        var addressLine3 = listOfCustomerMasterShippingDetailJson[index].address_line_3;
                        if(typeof addressLine3 === 'undefined') {
                            addressLine3 = "";
                        }
                        var email = listOfCustomerMasterShippingDetailJson[index].email;
                        if(typeof email === 'undefined') {
                            email = "";
                        }
                        var addressLine4 = listOfCustomerMasterShippingDetailJson[index].address_line_4;
                        if(typeof addressLine4 === 'undefined') {
                            addressLine4 = "";
                        }
                        var country = listOfCustomerMasterShippingDetailJson[index].country;
                        if(typeof country === 'undefined') {
                            country = "";
                        }
                        var city = listOfCustomerMasterShippingDetailJson[index].city;
                        if(typeof city === 'undefined') {
                            city = "";
                        }
                        var postalCode = listOfCustomerMasterShippingDetailJson[index].postal;
                        if(typeof postalCode === 'undefined') {
                            postalCode = "";
                        }
                        var state = listOfCustomerMasterShippingDetailJson[index].state;
                        if(typeof state === 'undefined') {
                            state = "";
                        }
                        
                        

                        $('#divTab2').append('<div id="parentDiv'+count+'" class="parentDiv">\n\
<input class="shipcustomerId" type="hidden" id="shipCustomerId_'+count+'" name="shipCustomerId_'+count+'" value="'+listOfCustomerMasterShippingDetailJson[index].customer_id+'"/>\n\
<input type="hidden" value="'+count+'"/><input type="hidden" type="hidden" id="shippingId_'+count+'" value="'+listOfCustomerMasterShippingDetailJson[index].id+'">\n\
<br>\n\
<div class="mgrDataTableThead maxMin" id="maxMin'+count+'" style="border-radius: 5px; display: flex;">'+                    
'<a class="aa"  id="tableHeaders" class="mgrDataTableThead" style="padding-left: 100px !important;text-align: center !important; width: 100%; padding-top: 10px; height: 35px">Shipping Details '+count+'</a>'+
'<table style="margin-top: -2px; width: 5%;"><tr><td><img onclick="minimimzerow($(this));" class="formImageIconSize minimize" id="minimizeIcon'+count+'" style="padding-right: 5px;padding-top: 9.5px;height: 25px; width: 25px" src="../../include/mgr/include/images/MGR-LOGO/Down.png" alt="max"></td>'+
'<td><img onclick="deleteRow($(this), '+count+');" class="formImageIconSize remove" style="padding-top: 9.5px;height: 25px; width: 25px ; padding-right: 8px;"  src="../../include/mgr/include/images/MGR-LOGO/Close.png" alt="logo delete icon" id="deleteIcon'+count+'">'+
'</td></tr></table></div>\n\
<br>'
                    +

                                '<div class="divNumber tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr" id="divNumber'+count+'">'+
                                    '<div style="display:flex;">' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >Ship To Location<span class="mandatory">*</span></a></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                                '<input maxlength="50" value="'+shipto+'" required  onclick="ml('+count+');" style="margin-bottom: 10px;" class="mgrFormDesign txtShipToLocation" type="text" id="txtShipToLocation_'+count+'" name="txtShipToLocation_'+count+'" />' +
                                        '</div>' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >Address(line 1)</a><span class="mandatory">*</span></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input maxlength="100" value="'+addressline1+'" required  style="margin-bottom: 10px;" class="mgrFormDesign txtAddressLine1" type="text" id="txtAddressLine1_'+count+'" name="txtAddressLine1_'+count+'" />' +
                                        '</div>' +
                                    '</div>'+
                                    '<div style="display:flex;">' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >Contact Person</a><span class="mandatory">*</span></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input maxlength="50" value="'+contactPerson+'" required  style="margin-bottom: 10px;" class="mgrFormDesign txtContactPerson" type="text" id="txtContactPerson_'+count+'" name="txtContactPerson_'+count+'" />' +
                                        '</div>' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >Address(line 2)</a></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input maxlength="100" value="'+addressLine2+'" required  style="margin-bottom: 10px;" class="mgrFormDesign txtAddressLine2" type="text" id="txtAddressLine2_'+count+'" name="txtAddressLine2_'+count+'" />' +
                                        '</div>' +
                                    '</div>'+
                                    '<div style="display:flex;">' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >Contact No.</a><span class="mandatory">*</span></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input maxlength="100" value="'+contactNo+'" required  style="margin-bottom: 10px;" class="mgrFormDesign txtContactNo" type="text" id="txtContactNo_'+count+'" name="txtContactNo_'+count+'" />' +
                                        '</div>' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >Address(line 3)</a></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input maxlength="100" value="'+addressLine3+'" required  style="margin-bottom: 10px;" class="mgrFormDesign txtAddressLine3" type="text" id="txtAddressLine3_'+count+'" name="txtAddressLine3_'+count+'" />' +
                                        '</div>' +
                                    '</div>'+
                                    '<div style="display:flex;">' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >Email</a></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input onchange="emailValidation(this);" maxlength="50" value="'+email+'" required  style="margin-bottom: 10px;" class="mgrFormDesign txtEmail" type="text" id="txtEmail_'+count+'" name="txtEmail_'+count+'" />' +
                                        '</div>' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >Address(line 4)</a></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input maxlength="100" value="'+addressLine4+'" required  style="margin-bottom: 10px;" class="mgrFormDesign txtAddressLine4" type="text" id="txtAddressLine4_'+count+'" name="txtAddressLine4_'+count+'" />' +
                                        '</div>' +
                                    '</div>'+
                                    '<div style="display:flex;">' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >Country</a><span class="mandatory">*</span></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input maxlength="50" value="'+country+'" required  style="margin-bottom: 10px;" class="mgrFormDesign txtCountry" type="text" id="txtCountry_'+count+'" name="txtCountry_'+count+'" />' +
                                        '</div>' +
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >City</a></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">' +
                                            '<input maxlength="50" value="'+city+'" required  style="margin-bottom: 10px;" class="mgrFormDesign txtCity" type="text" id="txtCity_'+count+'" name="txtCity_'+count+'" />' +
                                        '</div>' +
                                    '</div>'+
                                    '<div style="display:flex;">'+
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px "><a class="aa" >Postal Code</a><span class="mandatory">*</span></div>' +
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">'+
                                            '<input onkeypress="return isNumber(event);" maxlength="6" value="'+postalCode+'" required  style="margin-bottom: 10px;" class="mgrFormDesign txtPostalCode" type="text" id="txtPostalCode_'+count+'" name="txtPostalCode_'+count+'" />'+
                                        '</div>'+
                                        '<div class="formFieldText1 mgrContentFont" style="width: 271.35px; margin-left: 50px;"><a class="aa" >State</a></div>'+
                                        '<div style="width: 305.35px; padding-bottom: 20px !important">'+
                                            '<input maxlength="50" value="'+state+'" required  style="margin-bottom: 10px;" class="mgrFormDesign txtState" type="text" id="txtState_'+count+'" name="txtState_'+count+'" />'+
                                        '</div>'+
                                    '</div>'+
                                '</div></div>');
                                    bindInputTextCharacterCountdownEvent();
                                    $('#divNumber'+count).hide('fast');
                    }
//            }    
    }
}

// bind auto complete list of customer name
function bindSetAutoCompleteCustomerName() {
    var listOfCustomerMasters = listOfCustomerMastersJson;
    
    var listOfCustomers = [];
    for(var index in listOfCustomerMasters) {
        listOfCustomers.push({
           id: listOfCustomerMasters[index].id,
           value: listOfCustomerMasters[index].customerName
        });
    }
    
    $('#customerName').autocomplete({
       source: listOfCustomers,
       autoFocus: true,
       change: bindCustomerNameOnChange
    });
}

// when auto complete is selected
function bindCustomerNameOnChange() {
    $('#txtCustomerName').change(function() {
        var jqXHR = $.ajax({
           url: "../AjaxServlet/GetCustomerDataByName",
           data: {customer_name: $(this).val()}
        });
        
        jqXHR.done(function(data) {
            // auto populate base customer id
            var customerCode = '';
            var customerAddress1 = '';
            var customerAddress2 = '';
            var customerAddress3 = '';
            var customerAddress4 = '';
            var customerContactPerson = '';
            var customerTel = '';
            var customerPostalCode = '';
            var customerEmail = '';
            var listOfCustomerShipping = [];
            
            if(data !== null) {
                customerCode = data.customerCode;
                customerAddress1 = data.addressLine1;
                customerAddress2 = data.addressLine2;
                customerAddress3 = data.addressLine3;
                customerAddress4 = data.addressLine4;
                customerContactPerson = data.contactPerson;
                customerTel = data.tel;
                customerPostalCode = data.postal;
                customerEmail = data.email;
                listOfCustomerShipping = data.listOfCustomerMasterShippingDetails;
            } 
            
            $('#txtCustomerCode').val(customerCode);
            $('#txtCustomerAddress1').val(customerAddress1);
            $('#txtCustomerAddress2').val(customerAddress2);
            $('#txtCustomerAddress3').val(customerAddress3);
            $('#txtCustomerAddress4').val(customerAddress4);
            $('#txtCustomerContactPerson').val(customerContactPerson);
            $('#txtCustomerTel').val(customerTel);
            $('#txtCustomerPostalCode').val(customerPostalCode);
            $('#txtCustomerEmail').val(customerEmail); 
            
            // call method for setting mds and lease shipping global variable array
            bindPushDataToGlobalListShippingLease(listOfCustomerShipping);
        });
        
        jqXHR.fail(function() {
            console.log('error please check');
        });
        
        jqXHR.always(function() {
            
        });
    });
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

/* contract sales form place holder default */
function bindSetSalesFormPlaceHolder() {
    $('#priceGroup').attr('placeholder', getPriceFormattedNumber('0.00', 2));
}

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
                $(this).after("<small><i><span class='characterCountDown' id='" + spanElementId + "'></span></i></small>");
            }

            //if exist, change the text.
            $span_character_countdown = $("#" + spanElementId);
            var currentLength = this.value.length;
            $span_character_countdown.text((maxLength - currentLength) + " characters remaining.");
        });

        $inputText.blur(function () {
            $("#span_" + this.id).remove();
        });
    });
}

function inputNumberFormat (event){
      var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    } else if ( key < 48 || key > 57 ) {
        return false;
    } else {
        return true;
    }
}

function firstName(){
    var value =  $('#ddlCustomerType').val();
    if (value == 1)
    {
            $('#mandatory').show();
            $('#firstName').prop('readonly', false);
    }
    else
    {
            $('#mandatory').hide();
            $('#firstName').prop('readonly', true);
            $('#firstName').val('');
    }
}
function firstNameReadonly(){
    $('#ddlCustomerType').change(function(){
    firstName();
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

 $(document).ready(function()
{
    bindSetSalesFormPlaceHolder();
    bindSetAutoCompleteCustomerName();
    getShippingList ();
    $('#btnPriceList').css('background-color', 'black');
    minimizeIcon ();    
    bindInitializeDropDownChosen();
    manageId();
    addNewTable();     
    bindOnClickActiveTabs();
    setTab1OnCheckWhenFirstLoad(); 
    $('#addShip').hide();
    $('#btnAdd').hide();
    $('.tab2').hide();
    $('.tab3').hide();
    updateButtonDialogOnClick();
    addButtonOnClick();
    var focuszs =$(".tab1"); 
                $('html, body').animate({
                    scrollTop: $(focuszs).offset().top-100
                }, 600, function(){$(focuszs).focus();
                });
                
    $(window).unload(function() {
       window.opener.location.reload(); 
    });
    bindAmountOnChange(); 
});
