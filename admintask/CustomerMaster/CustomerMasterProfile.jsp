<%-- 
    Document   : CustomerMaster
    Created on : 14 Jun, 2019, 11:17:11 AM
    Author     : Brian
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://sargue.net/jsptags/time" prefix="javatime" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%@ page import="com.bizmann.utility.Version" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!-- include link,src file --> 
        <jsp:include page="../include/include.jsp"/>
        
        <script src="include/js/CustomerMasterProfile.js?v=${Version.VERSION}" type="text/javascript"></script>
        <link href="include/css/CustomerMasterProfile.css?v=${Version.VERSION}" rel="stylesheet" type="text/css"/>  
        <script>
            var listOfCustomerMasterShippingDetailJson = ${listOfCustomerMasterShippingDetailJson};
            var listOfCustomerMastersJson = ${listOfCustomerMastersJson};
        </script>
        <title>Customer Master</title>
    </head>
    <body class="mgrBodyBGColor defaultPosition">  
        <input readonly type="text" id="message" value="${param.message}" hidden>
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Customer Profile"></jsp:param>
        </jsp:include>        
        <br>
        <input readonly type="text" hidden value="${ddlCustomerTypes}" name="ddlCustomerTypes" id="ddlCustomerTypes"/>
        <div>
        <div style="padding: 0 50px; margin-bottom: 50px;">
                    <main>                         
                        <label class="horizontalLineMgr">
                            &nbsp;
                        </label>
                        
                        <input readonly id="tab1" type="radio" name="tabs" checked>                        
                        <label for="tab1" class="tabs" style="padding-bottom: 9px; position: relative;">
                            <span style="padding: 0 100px;" data-value="sales">
                                <img src="../../include/mgr/include/images/MGR-LOGO/Client Info Icon.png" id="sales" style="width: 20px; vertical-align: middle;">
                                Client Information
                            </span>
                        </label>
                        
                        <input readonly id="tab2" type="radio" name="tabs">
                        <label for="tab2" class="tabs" style="padding-bottom:9px; position: relative;">                      
                            <span style="padding: 0 100px;" data-value="lease">
                                <img src="../../include/mgr/include/images/MGR-LOGO/Shipping Info Icon.png" id="lease" style="width: 20px; vertical-align: middle;">
                                Ship Information
                            </span>
                        </label>   
                        <input readonly id="tab3" type="radio" name="tabs">
                        <label for="tab3" class="tabs" style="padding-bottom: 9px; position: relative;">
                            <span style="padding: 0 100px;" data-value="user">
                                
                                User Account
                            </span>
                        </label>
                    </main>
                </div>
    <form method="POST" id="frm" action="CustomerMasterProfile">
        <div class="tab1 tabs defaultBodyContent"> 
        <input readonly type="text" class="mgrFormDesign" id="customerMasterId" name="customerMasterId" value="${customerMasterId}" hidden/>
        <input readonly type="text" id="shippingCount" name="shippingCount" value="1" hidden/>
        <table class="tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr defaultPosition divFormMGR bodyAndFormBorderMGR" id="clientInfo">
            <tbody>
                    <tr>
                    <th class="formTableHeader " hidden id="customerId"></th>
                    <td class="width20Percentage " style="padding-right: 0px;">Customer Type</td>
                    <td class="width25Percentage"><input readonly type="text" maxlength="50" required class="mgrFormDesign" id="ddlCustomerTypes" name="ddlCustomerType" value="${customerTypeNames}"/><input readonly type="text" maxlength="50" required class="mgrFormDesign" id="ddlCustomerTypesa" name="ddlCustomerTypes" value="${ddlCustomerTypes}" hidden/>
<!--                        <select class="" id="ddlCustomerType" name="ddlCustomerType">
                            <option value="0" selected disabled>---Please Select Customer Type---</option>
                            <c:forEach items="${listOfCustomerType}" var="customerType" varStatus="loop">
                                <option value="${customerType.id}" ${customerType.id eq ddlCustomerTypes ? 'selected': ''}>${customerType.type}</option>
                            </c:forEach>                            
                        </select>-->
                    </td>
                    <td class="mgrFormBorderSpacing"></td>
                    <td class="width25Percentage ">Created On</td>
                    <td class="width25Percentage"><input readonly type="text" readonly required class="mgrFormDesign" id="createdOn" name="createdOn" value="<javatime:format value="${createdOn}" pattern="dd/MM/yyyy"/>"/></td>
                </tr>
                <tr>
                    <td class="width20Percentage ">Customer Code</td>
                    <td class="width25Percentage"><input readonly type="text" maxlength="50" required class="mgrFormDesign" id="customerCode" name="customerCode" value="${customerCode}"/></td>
                    <td class="mgrFormBorderSpacing"></td>
                    <td class="width25Percentage ">Status</td>
                    <td class="width25Percentage"><input readonly type="text" maxlength="50" required class="mgrFormDesign" id="ddlCustomerStatuss" name="ddlCustomerStatus" value="${customerStatus}"/>
<!--                        <select class=" " id="ddlCustomerStatus"  name="ddlCustomerStatus">
                            <option value="" selected disabled>---Please Select Status---</option>
                            <option value="1" ${"1" eq status ? 'selected': ''}>Active</option>
                            <option value="0" ${"0" eq status ? 'selected': ''}>Inactive</option>
                        </select>-->
                    </td>
                </tr>
                <tr>
                    <td class="width20Percentage ">Customer Name</td>
                    <td class="width25Percentage"><input readonly maxlength="50" type="text" class="mgrFormDesign" id="customerName" name="customerName" value="${customerName}"/></td>
                    <td class="mgrFormBorderSpacing"></td>
                    <td class="width25Percentage ">First Name</td>
                    <td class="width25Percentage"><input readonly type="text" maxlength="50" required class="mgrFormDesign" id="firstName" name="firstName" value="${firstName}"/></td>
                </tr>
                <tr>
                    <td class="width20Percentage ">Entity</td>
                    <td class="width25Percentage"><input readonly type="text" maxlength="50" required class="mgrFormDesign" id="ddlCustomerEntitys" name="ddlCustomerEntity" value="${entityss}"/>
<!--                        <select class="" id="ddlCustomerEntity" name="ddlCustomerEntity">
                            <option value="0" selected disabled>--Please Select Entity--</option>
                            <c:forEach items="${listOfEntity}" var="entity" varStatus="loop">
                                <option value="${entity.id}" ${entity.id eq ct ? 'selected': ''}>${entity.code}</option>
                            </c:forEach>  
                        </select>-->
                        <input type="hidden" id="txtEntityIdHidden" value="${ct}" readonly>
                    </td>
                    <td class="mgrFormBorderSpacing"></td>
                    <td class="width25Percentage ">Tax</td>
                    <td class="width25Percentage"><input readonly type="text" maxlength="50" required class="mgrFormDesign" id="ddlCustomerTaxs" name="ddlCustomerTax" value="${customerTax}"/>
<!--                        <select class="formFieldText1 " id="ddlCustomerTax" name="ddlCustomerTax">
                            <option value="0" selected disabled>---Please Select Tax---</option>
                            <c:forEach items="${listOfTax}" var="tax" varStatus="loop">
                                <option value="${tax.id}" ${tax.id eq tx ? 'selected': ''}>${tax.type}</option>
                            </c:forEach>
                        </select>-->
                    </td>
                </tr>
                <tr>
                    <td class="width20Percentage ">Price Group</td>
                    <td class="width25Percentage"><input readonly placeholder="$0.00" type="text" style="text-align: right" required class="mgrFormDesign" maxlength="50" id="priceGroup" name="priceGroup" data-dot="0" onkeypress="return isNumberPlusComma(event, $(this));" value="<fmt:formatNumber type="currency" minFractionDigits="2" maxFractionDigits="2" value="${priceGroup}"/>"/></td>
                    <td class="mgrFormBorderSpacing"></td>
                    <td class="width25Percentage ">Currency</td>
                    <td class="width25Percentage"><input readonly type="text" maxlength="50" required class="mgrFormDesign" id="ddlCurrencys" name="ddlCurrency" value="${customerCurrency}"/>
<!--                        <select class="" id="ddlCurrency" name="ddlCurrency">
                            <option value="0" selected disabled>---Please Select Currency---</option>
                            <c:forEach items="${listOfCurrency}" var="currency" varStatus="loop">
                                <option value="${currency.id}" ${currency.id eq cr ? 'selected': ''}>${currency.code}</option>
                            </c:forEach>  
                        </select>-->
                    </td>
                </tr>
                <tr>
                    <td class="width20Percentage " style="width: 20%">Payment Terms</td>
                    <td class="width25Percentage"><input readonly type="text" maxlength="50" required class="mgrFormDesign" id="ddlCustomerPaymentTermss" name="ddlCustomerPaymentTerms" value="${paymentTermsName}"/>
<!--                        <select class=" " id="ddlCustomerPaymentTerms" name="ddlCustomerPaymentTerms">
                            <option value="0" selected disabled>---Please Select Payment Terms---</option>
                            <c:forEach items="${listOfPaymentTerms}" var="payment" varStatus="loop">
                                <option value="${payment.id}" ${payment.id eq pmt ? 'selected': ''}>${payment.name}</option>
                            </c:forEach> 
                        </select>-->
                    </td>
                    <td class="mgrFormBorderSpacing"></td>
                    <td class="width25Percentage ">Sales Person</td>
                    <td class="width25Percentage"><input readonly type="text" maxlength="50" required class="mgrFormDesign" id="salesPerson" name="salesPerson" value="${salesPerson}"/></td>
                </tr>
            </tbody>
        </table>    
        <br> 
        <br>
        <table class="tblWdth100 mgrSpace50 mgrFormBorderSpacing txtStyleSanRegularMgr defaultPosition divFormMGR bodyAndFormBorderMGR" id="billingInfo">
            <thead class="mgrDataTableThead">
                <tr>
                    <th style="border-radius: 5px !important; height: 40px;" colspan="5">Billing Details</th>
                </tr>
            </thead>
            <tbody>
                    <tr>                
                        <td class="width20Percentage ">Contact Person</td>
                        <td class="width25Percentage "><input readonly maxlength="50" required type="text" class="mgrFormDesign" id="contactPerson" name="contactPerson" value="${contactPerson}"/></td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td class="width25Percentage ">Address(line 1)</td>
                        <td class="width25Percentage "><input readonly maxlength="100" required type="text" class="mgrFormDesign" value="${address1}" id="addressLine1" name="addressLine1" /></td>
                    </tr>
                    <tr>                
                        <td class="width20Percentage ">Tel</td>
                        <td class="width25Percentage "><input readonly maxlength="50" required type="text" class="mgrFormDesign" id="tel" name="tel" value="${tel}"/></td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td class="width25Percentage ">Address(line 2)</td>
                        <td class="width25Percentage "><input readonly maxlength="100"  required type="text" class="mgrFormDesign" id="addressLine2" name="addressLine2" value="${address2}" /></td>
                    </tr>
                    <tr>                
                        <td class="width20Percentage ">Fax</td>
                        <td class="width25Percentage "><input readonly maxlength="50" required type="text" class="mgrFormDesign" id="fax" name="fax" value="${fax}"/></td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td class="width25Percentage ">Address(line 3)</td>
                        <td class="width25Percentage "><input readonly maxlength="100"  required type="text" class="mgrFormDesign" value="${address3}" id="addressLine3" name="addressLine3" /></td>
                    </tr>
                    <tr>                
                        <td class="width20Percentage ">Email</td>
                        <td class="width25Percentage "><input readonly onchange="emailValidation(this);" maxlength="50" required type="text" class="mgrFormDesign" id="email" name="email" value="${email}"/></td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td class="width25Percentage ">Address(line 4)</td>
                        <td class="width25Percentage "><input readonly maxlength="100"  required type="text" class="mgrFormDesign" id="addressLine4" value="${address4}" name="addressLine4" /></td>
                    </tr>
                    <tr>                
                        <td class="width20Percentage ">Country</td>
                        <td class="width25Percentage "><input readonly maxlength="50" required type="text" class="mgrFormDesign" id="country" name="country" value="${country}"/></td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td class="width25Percentage ">City</td>
                        <td class="width25Percentage "><input readonly maxlength="50" required type="text" class="mgrFormDesign" id="city" name="city" value="${city}"/></td>
                    </tr>
                    <tr>                
                        
                        <td class="width20Percentage ">Postal Code</td>
                        <td class="width25Percentage "><input readonly onkeypress="return isNumber(event);" maxlength="6" required type="text" class="mgrFormDesign" id="postalCode" name="postalCode" value="${postalCode}"/></td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td class="width25Percentage ">State</td>
                        <td class="width25Percentage "><input readonly maxlength="50" required type="text" class="mgrFormDesign" id="state" name="state" value="${state}"/></td>
                    </tr>
                    <tr>
                        <td style="vertical-align: text-top;">Notes</td>
                        <td colspan="4" rowspan="4" style="padding-top: 15px;"><textarea readonly maxlength="300" class="mgrFormDesign mgrTextAreaOnTable" name="notes" id="notes">${notes}</textarea></td>
                    </tr>
            </tbody>
        </table>  
        </div>
            <div style="margin: 50px; margin-top: -20px !important;" >
            <input class="buttonWhite txtStyleSanRegularMgr" type="button" style="margin-bottom: 5px !important;margin-bottom:20px; width: 221px !important; height: 40px;" value="Add New Ship To Location" name="addShip" id="addShip"/>             
            <div id="divTab2" class="tab2 defaultBodyContent mgrSpace50 mgrFormBorderSpacing txtStyleSanRegularMgr defaultPosition divFormMGR bodyAndFormBorderMGR" style="margin-bottom: 20px !important">
                <div id="parentDiv" class=" txtStyleSanRegularMgr parentDiv" >
                    <input class="shipCustomerId" type="hidden" id="shipCustomerId_1" name="shipCustomerId_1" value="${customerMasterId}"/>
                    <input  type="hidden" value="1"/>
                    <div class=" mgrDataTableThead maxMin " id="maxMin" style="border-radius: 5px; display: flex; margin-top: 20px">                    
                        <a class="aa"  id="tableHeaders" class="mgrDataTableThead" style="padding-left: 100px !important;text-align: center !important; width: 100%; padding-top: 10px; height: 35px">Shipping Details 1</a>
                        <img class="formImageIconSize minimize" id="minimizeIcon" style="padding-right: 10px;padding-top: 9.5px;height: 25px; width: 25px" src="../../include/mgr/include/images/MGR-LOGO/Down.png" alt="min" id="minimizeIcon">
                        <img class="formImageIconSize remove" style="padding-top: 9.5px;height: 25px; width: 25px ; padding-right: 5px;"  src="../../include/mgr/include/images/MGR-LOGO/Close.png" alt="logo delete icon" id="deleteIcon">
                    </div>
                    <br>
                    <div class="tableNumber divNumber" id="divNumber" class="tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr" style="padding-left: 5px; margin-right: 0px !important;">
                        <div style="display:flex;" >
                            <div class="formFieldText1 " style="width: 271.33px "><a class="aa" >Ship To Location<span class="mandatory">*</span></a></div>
                            <div style="width: 305.33px ;padding-bottom: 20px !important">
                                <input onclick="ml(1);" style="margin-bottom: 10px;" class="mgrFormDesign txtShipToLocation" type="text" id="txtShipToLocation" name="txtShipToLocation" />
                            </div>
                            <div class="formFieldText1 " style="width:271.33px; margin-left: 50px;"><a class="aa" >Address(line 1)</a><span class="mandatory">*</span></div>
                            <div style="width: 305.33px; padding-bottom: 20px !important">
                                <input style="margin-bottom: 10px;" class="mgrFormDesign txtAddressLine1" type="text" id="txtAddressLine1" name="txtAddressLine1" value="" />
                            </div>
                        </div>

                        <div style="display:flex;">
                            <div class="formFieldText1 " style="width: 271.33px "><a class="aa" >Contact Person</a><span class="mandatory">*</span></div>
                            <div style="width: 305.33px; padding-bottom: 20px !important">
                                <input style="margin-bottom: 10px;" class="mgrFormDesign txtContactPerson" type="text" id="txtContactPerson" name="txtContactPerson" />
                            </div>
                            <div class="formFieldText1 " style="width: 271.33px; margin-left: 50px;"><a class="aa" >Address(line 2)</a></div>
                            <div style="width: 305.33px; padding-bottom: 20px !important">
                                <input style="margin-bottom: 10px;" class="mgrFormDesign txtAddressLine2" type="text" id="txtAddressLine2" name="txtAddressLine2" value="" />
                            </div>
                        </div>

                        <div style="display:flex;">
                            <div class="formFieldText1 " style="width: 271.33px "><a class="aa" >Contact No.</a><span class="mandatory">*</span></div>
                            <div style="width: 305.33px; padding-bottom: 20px !important">
                                <input style="margin-bottom: 10px;" class="mgrFormDesign txtContactNo" type="text" type="text" id="txtContactNo" name="txtContactNo" value=""/>
                            </div>
                            <div class="formFieldText1 " style="width: 271.33px; margin-left: 50px;"><a class="aa" >Address(line 3)</a></div>
                            <div style="width: 305.33px; padding-bottom: 20px !important;">
                                <input style="margin-bottom: 10px;" class="mgrFormDesign txtAddressLine3" type="text" id="txtAddressLine3" name="txtAddressLine3" value=""/>
                            </div>
                        </div>

                        <div style="display:flex;">
                            <div class="formFieldText1 " style="width: 271.33px "><a class="aa" >Email</a></div>
                            <div style="width: 305.33px; padding-bottom: 20px !important">
                                <input onchange="emailValidation(this);" style="margin-bottom: 10px;" class="mgrFormDesign txtEmail" type="text" id="txtEmail" name="txtEmail" value="" />
                            </div>
                            <div class="formFieldText1 " style="width: 271.33px; margin-left: 50px;"><a class="aa" >Address(line 4)</a></div>
                            <div style="width: 305.33px; padding-bottom: 20px !important">
                                <input style="margin-bottom: 10px;" class="mgrFormDesign txtAddressLine4" type="text" id="txtAddressLine4" name="txtAddressLine4" value=""/>
                            </div>
                        </div>

                        <div style="display:flex;">
                            <div class="formFieldText1 " style="width: 271.33px "><a class="aa" >Country</a><span class="mandatory">*</span></div>
                            <div style="width: 305.33px; padding-bottom: 20px !important">
                                <input style="margin-bottom: 10px;" class="mgrFormDesign txtCountry" type="text" id="txtCountry" name="txtCountry" value=""/>
                            </div>
                            <div class="formFieldText1 " style="width: 271.33px; margin-left: 50px;"><a class="aa" >City</a></div>
                            <div style="width: 305.33px; padding-bottom: 20px !important">
                                <input style="margin-bottom: 10px;" class="mgrFormDesign txtCity" type="text" id="txtCity" name="txtCity" value=""/>
                            </div>
                        </div>

                        <div style="display:flex;">
                            <div class="formFieldText1 " style="width: 271.33px "><a class="aa" >Postal Code</a><span class="mandatory">*</span></div>
                            <div style="width: 305.33px; padding-bottom: 20px !important">
                                <input onkeypress="return isNumber(event);" style="margin-bottom: 10px;" class="mgrFormDesign txtPostalCode" type="text" id="txtPostalCode" name="txtPostalCode" value=""/>
                            </div>
                            <div class="formFieldText1 " style="width: 271.33px; margin-left: 50px;"><a class="aa" >State</a></div>
                            <div style="width: 305.33px; padding-bottom: 20px !important">
                                <input style="margin-bottom: 10px;" class="mgrFormDesign txtState" type="text" id="txtState" name="txtState" value=""/>
                            </div>
                        </div>        
                    </div>                    
                </div>                             
        </div>               
        </div>
        <br>
    </form>
    <form method="POST" id="frm1" action="CustomerMasterProfile">
        <div class="tab3 tabs defaultBodyContent">
            <table class="tblWdth100 mgrSpace50 mgrFormBorderSpacing txtStyleSanRegularMgr defaultPosition divFormMGR bodyAndFormBorderMGR" id="userAccount">
                <input readonly type="text" class="mgrFormDesign" id="customerMasterId" name="customerMasterId" value="${customerMasterId}" hidden/>
            <thead class="mgrDataTableThead">
                <tr>
                    <th style="border-radius: 5px !important; height: 40px;" colspan="5">User Account</th>
                </tr>
            </thead>
            <tbody>
                    <tr>                
                        <td class="width20Percentage ">First Name <span class="mandatory">*</span></td>
                        <td class="width25Percentage "><input required type="text" class="mgrFormDesign" id="firstNameUser" name="firstNameUser" value=""/></td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td class="width20Percentage ">Login ID <span class="mandatory">*</span></td>
                        <td class="width25Percentage "><input required maxlength="100" type="text" class="mgrFormDesign" value="" id="loginId" name="loginId" /></td>
                    </tr>
                    <tr>                
                        <td class="width20Percentage ">Middle Name</td>
                        <td class="width25Percentage "><input type="text" class="mgrFormDesign" id="midName" name="midName" value=""/></td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td class="width20Percentage ">Password <span class="mandatory">*</span></td>
                        <td class="width25Percentage "><input required maxlength="100" type="password" class="mgrFormDesign" id="password" name="password"  /></td>
                    </tr>
                    <tr>                
                        <td class="width20Percentage ">Last Name <span class="mandatory">*</span></td>
                        <td class="width25Percentage "><input required type="text" class="mgrFormDesign" id="lastNameUser" name="lastNameUser" value=""/></td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td class="width20Percentage ">Confirm Password</td>
                        <td class="width25Percentage "><input required type="password" class="mgrFormDesign" id="passwordCon" name="passwordCon" value="" /></td>
                    </tr>
                    <tr>                
                        <td class="width20Percentage ">Email <span class="mandatory">*</span></td>
                        <td class="width25Percentage "><input onchange="emailValidation(this);" maxlength="50" required type="text" class="mgrFormDesign" id="userEmail" name="userEmail" value=""/></td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td class="width20Percentage ">ContactNo</td>
                        <td class="width25Percentage "><input required type="text" class="mgrFormDesign" id="contactNo" value="" name="contactNo" /></td>
                    </tr>
                    <tr>                
                        <td class="width20Percentage ">Mobile No</td>
                        <td class="width25Percentage "><input required type="text" class="mgrFormDesign" id="mobileNo" name="mobileNo" value=""/></td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td class="width20Percentage ">Fax No</td>
                        <td class="width25Percentage "><input required type="text" class="mgrFormDesign" id="faxNo" name="faxNo" value=""/></td>
                    </tr>
                    <tr>                
                        <td class="width20Percentage ">Authority Group</td>
                        <td class="width25Percentage "><input type="text" class="mgrFormDesign" id="authorityName" name="authorityName" value="${authgrpName}" readonly>
                            <input type="hidden" value="${authgrpId}" id="authority" name="authority">
                        </td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td class="width20Percentage ">Primary Designation</td>
                        <td class="width25Percentage ">
                            <input type="text" class="mgrFormDesign" id="designationName" value="${designationName}" name="designationName" readonly>
                            <input type="text" class="mgrFormDesign" id="designation" value="${designationId}" name="designation" readonly hidden>   
                        </td>   
                    </tr>
                    <tr>
                        <td class="width20Percentage">Custom Field 1</td>
                        <td class="width25Percentage"><input type="text" class="mgrFormDesign" id="field1" name="field1" value=""></td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td class="width20Percentage">Custom Field 2</td>
                        <td class="width25Percentage"><input type="text" class="mgrFormDesign" id="field2" name="field2" value=""></td>
                    </tr>
                    <tr>
                        <td class="width20Percentage">Custom Field 3</td>
                        <td class="width25Percentage"><input type="text" class="mgrFormDesign" id="field3" name="field3" value=""></td>
                    </tr>
                  
            </tbody>
        </table>                 
        </div>
            </form>
                    <input class="buttonWhite txtStyleSanRegularMgr" style="width: 175px; margin-left: 50px;margin-top: -20px !important" type="button" value="Custom Price List" name="btnPriceList" id="btnPriceList"/> 
                    <input class="buttonGreen txtStyleSanRegularMgr" style=" margin-bottom: 30px;width: 100px;float: right; margin-right: 50px; margin-top: -15px" type="button" value="Submit" name="btnSubmit" id="btnSubmit"/>
                    <input class="buttonGreen txtStyleSanRegularMgr" style="margin-bottom: 30px;width: 100px;float: right; margin-right: 50px; margin-top: -15px" type="button" value="Add" name="btnAdd" id="btnAdd"/>
        </div>
        <br>        
    </body>
</html>
