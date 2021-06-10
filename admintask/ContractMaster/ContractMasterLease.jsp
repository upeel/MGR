<%-- 
    Document   : ContractMasterLease
    Created on : 14 Jun, 2019, 12:35:51 PM
    Author     : Wildan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://sargue.net/jsptags/time" prefix="javatime" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!-- css js lease -->
<link rel="stylesheet" href="./include/css/ContractMasterLease.css" type="text/css">
<script type="text/javascript" src="./include/js/ContractMasterLease.js"></script>

<div class="defaultPosition divFormMGR contractDetailSectionDiv bodyAndFormBorderMGR mgrSpace40">
    <input type="text" id="txtContractLeaseId" name="txtContractLeaseId" value="${contractMaster.contractLeaseInformationDetail.id}" readonly hidden>
    <input type="text" id="txtLeaseMandatory" name="txtLeaseMandatory" readonly hidden>
    <input type="text" id="txtLeaseMachineDetailCount" name="txtLeaseMachineDetailCount" readonly hidden>
    <table id="tableLeaseMgr" class="tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr">
        <tr>
            <td class="width20Percentage">
                Lease Agreement No. <span class="mandatory" hidden>*</span>
            </td>
            
            <td class="width25Percentage">
                <input type="text" id="txtLeaseAgreementNo" class="mgrFormDesign" name="txtLeaseAgreementNo" value="${contractMaster.contractLeaseInformationDetail.lease_agreement_no}" maxlength="50">
            </td>
            
            <td class="width5Percentage">
                
            </td>
            
            <td class="width25Percentage">
                Finance Company <span class="mandatory" hidden>*</span>
            </td>
            
            <td class="width25Percentage">
                <input type="text" id="txtFinanceCompany" class="mgrFormDesign" name="txtFinanceCompany" value="${contractMaster.contractLeaseInformationDetail.finance_company}" maxlength="50">
            </td>
        </tr>
        
        <tr>
            <td>
                Lease Start Date. <span class="mandatory" hidden>*</span>
            </td>
            
            <td>
                <input type="text" id="txtLeaseStartDate" class="mgrFormDesign destroyDatePicker" name="txtLeaseStartDate" value="${contractMaster.contractLeaseInformationDetail.lease_start_date}" readonly>
            </td>
            
            <td></td>
            
            <td>
                Subsidiary 
<!--                <span class="mandatory" hidden>*</span>-->
            </td>
            
            <td>
                <input type="text" id="txtLeaseSubsidiary" class="mgrFormDesign" name="txtLeaseSubsidiary" value="${contractMaster.contractLeaseInformationDetail.subsidiary}" maxlength="50">
            </td>
        </tr>
        
        <tr>
            <td>
                Lease Expiry Date <span class="mandatory" hidden>*</span>
            </td>
            
            <td>
                <input type="text" id="txtLeaseExpiryDate" class="mgrFormDesign destroyDatePicker" name="txtLeaseExpiryDate" value="${contractMaster.contractLeaseInformationDetail.lease_expiry_date}" readonly>
            </td>
            
            <td></td>
            
            <td>
                Lease Period (Months) <span class="mandatory" hidden>*</span>
            </td>
            
            <td>
                <input type="text" id="txtLeasePeriod" class="mgrFormDesign" name="txtLeasePeriod" value="${contractMaster.contractLeaseInformationDetail.lease_period_month}" onkeypress="return isNumber(event);">
            </td>            
        </tr>
        <tr>
            <td> Monthly Rental
            </td>
            <td>
                <input type="text" id="txtMonthlyRental" style="text-align: right;" class="mgrFormDesign monthlyRental" name="txtMonthlyRental" value="<fmt:formatNumber value="${contractMaster.contractLeaseInformationDetail.monthly_rental}" type="currency" maxFractionDigits="2" minFractionDigits="2"/>" onchange="monthly($(this));" onkeypress="return isNumberPlusComma(event, $(this));">
            </td>
            <td></td>
            <td>
                Residual Charge
            </td>
            <td>
                <input type="text" id="txtResidualCharge" style="text-align: right;" class="mgrFormDesign residualCharge" name="txtResidualCharge" value="<fmt:formatNumber value="${contractMaster.contractLeaseInformationDetail.residual_charge}" type="currency" maxFractionDigits="2" minFractionDigits="2"/>" onchange="residual($(this));" onkeypress="return isNumberPlusComma(event, $(this));">
            </td>
        </tr>
    </table>
</div>

<!-- lease machince details information -->
<table id="dtLeaseMachineDetails" class="defaultPosition mgrBorderRadius tblWdth100 contractDetailSectionDiv tableMGRStyle tableMGRRounded mgrSpace40 bodyAndFormBorderMGR" 
       cellspacing="0"> 
    <thead class="mgrDataTableThead">
        <tr>
            <th colspan="12" class="mgrTdPadTopBot20 bdrBtmWhiteMgr">
                Lease Machines Detail Information
            </th>
        </tr>
        
        <tr>
            <th class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrTxtAlignLeft mgrThead2FontSize" style="width: 4%;">
                No.
            </th>
            
        <!--    <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="width: 5%; padding-left: 5px;">
                Unit
            </th> -->
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 5px; width: 9%;">
                Ship To
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 5px; width: 12%;">
                Model
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 5px; width: 18%;">
                Serial #
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 5px; width: 10%;">
                Install Date
            </th>
            
        <!--    <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 5px; width: 10%;">
                Location/Dept
            </th> -->
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 5px; width: 12%;">
                Address
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 5px; width: 9%;">
                Postal
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 5px; width: 10%;">
                PIC
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 5px; width: 10%;">
                Contact No
            </th>
            
            <th class="mgrTdPadTopBot20 mgrPaddingRight20 mgrFloatRight">
                <img src="../../include/mgr/include/images/MGR-LOGO/Add mgr.png" id="logoNewLeaseMachineDetail" data-enabled="0" class="logoTheadTableMgr" alt="logo Add Row">
            </th>
        </tr>
    </thead>
    
    <tbody class="bgWhite">
        <c:forEach var="leaseMachine" items="${contractMaster.contractLeaseInformationDetail.listOfContractLeaseMachineInformationDetails}" varStatus="loop">
            <tr>
                <td class="mgrTdPadTopBot20 mgrPaddingLeft20">                   
                    ${loop.count}.
                </td>

<!--                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                    <input type="text" id="txtLeaseBusinessUnit_${loop.count}" name="txtLeaseBusinessUnit_${loop.count}" class="mgrFormDesign txtLeaseBusinessUnit" data-current="${leaseMachine.business_unit}" value="${leaseMachine.business_unit}" maxlength="20">
                </td> -->

                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                    <input type="text" id="txtLeaseShippingId_${loop.count}" name="txtLeaseShippingId_${loop.count}" value="${leaseMachine.customer_shipping_id}" class="shippingId" readonly hidden>
                    <input type="text" id="txtLeaseShippingTo_${loop.count}" name="txtLeaseShippingTo_${loop.count}" class="mgrFormDesign txtLeaseShippingTo" value="${leaseMachine.customer_shipping_name}" onkeypress="return bindValidateCustomerAlreadyChoose();">
                    <input type="hidden" id="txtLeaseShippingToHidden_${loop.count}" value="${leaseMachine.customer_shipping_name}" readonly>
                </td>

                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                    <input type="text" id="txtLeaseModel_${loop.count}" name="txtLeaseModel_${loop.count}" class="mgrFormDesign txtLeaseModel" value="${leaseMachine.model}" maxlength="15">
                </td>

                <td class="mgrTdPadTopBot20"  style="padding-left: 5px;">
                    <input type="hidden" id="txtLeaseSerialUsed_${loop.count}" class="txtLeaseSerialUsed" value="${leaseMachine.existed}" readonly>
                    <input type="text" id="txtLeaseSerial_${loop.count}" name="txtLeaseSerial_${loop.count}" class="mgrFormDesign txtLeaseSerial" value="${leaseMachine.serial}" maxlength="10" onchange="bindAjaxValidateModelAndSerialUsed($(this));">
                </td>

                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                    <input type="text" id="txtLeaseInstallDate_${loop.count}" name="txtLeaseInstallDate_${loop.count}" class="mgrFormDesign txtLeaseInstallDate" value="${leaseMachine.install_date}" readonly>
                </td>

<!--                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                    <input type="text" id="txtLeaseLocationAndDepartment_${loop.count}" name="txtLeaseLocationAndDepartment_${loop.count}" class="mgrFormDesign txtLeaseLocationAndDepartment" value="${leaseMachine.location_or_department}" maxlength="50">
                </td> -->

                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                    <input type="text" id="txtLeaseAddress_${loop.count}" name="txtLeaseAddress_${loop.count}" class="mgrFormDesign txtLeaseAddress" value="${leaseMachine.customer_address}" readonly>
                </td>

                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                    <input type="text" id="txtLeasePostal_${loop.count}" name="txtLeasePostal_${loop.count}" class="mgrFormDesign txtLeasePostal" value="${leaseMachine.postal}" onkeypress="return isNumberUnit(event);" maxlength="20" readonly>
                </td>

                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                    <input type="text" id="txtLeasePIC_${loop.count}" name="txtLeasePIC_${loop.count}" class="mgrFormDesign txtLeasePIC" value="${leaseMachine.pic}" maxlength="50">
                </td>

                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                    <input type="text" id="txtLeaseContactNo_${loop.count}" name="txtLeaseContactNo_${loop.count}" class="mgrFormDesign txtLeaseContactNo" value="${leaseMachine.contact_no}" maxlength="50">
                </td>

                <td class="mgrTdPadTopBot20 mgrPaddingRight20 txtAlignCenter">
                    <img src="../../include/mgr/include/images/MGR-LOGO/Remove mgr.png" class="mgrFloatRight logoTbodyTableMgr" alt="logo Remove Row" onclick="bindDeleteSelectedLeaseMachineDetail($(this));">
                </td>
            </tr>
        </c:forEach>
    </tbody>
</table>

<div class="defaultPosition divFormMGR contractDetailSectionDiv bodyAndFormBorderMGR mgrSpace40">
    <table id="tableLeaseRemarkMgr" class="tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr">
        <tr>
            <td class="width20Percentage">
                Remarks <span class="mandatory" hidden>*</span>
            </td>
            
            <td rowspan="4">
                <textarea id="txtLeaseRemarks" class="mgrFormDesign mgrTextAreaOnTable" name="txtLeaseRemarks" maxlength="300">${contractMaster.contractLeaseInformationDetail.lease_remarks}</textarea>
            </td>
        </tr>
        
        <tr>
            <td></td>
        </tr>
        
        <tr>
            <td></td>
        </tr>
        
        <tr>
            <td></td>
        </tr>
    </table>
</div>

