<%-- 
    Document   : ContractMasterMds
    Created on : 14 Jun, 2019, 12:36:02 PM
    Author     : Wildan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://sargue.net/jsptags/time" prefix="javatime" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!-- css js mds -->
<link rel="stylesheet" href="./include/css/ContractMasterMds.css" type="text/css">
<script type="text/javascript" src="./include/js/ContractMasterMds.js"></script>

<div class="defaultPosition divFormMGR contractDetailSectionDiv bodyAndFormBorderMGR" style="margin-bottom: 40px;">
    <input type="text" id="txtMdsMachineDetailCount" name="txtMdsMachineDetailCount" readonly hidden>
    <input type="text" id="txtContractMasterId" name="txtContractMasterId" value="${contractMaster.contractMasterHeader.id}" readonly hidden>
    <input type="text" id="txtContractMdsId" name="txtContractMdsId" value="${contractMaster.contractMdsInformationDetail.id}" readonly hidden>
    <table id="tblMdsInformationDetail" class="tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr">
        <tr>
            <td class="width20Percentage">
                IT Personnel <span class="mandatory" hidden>*</span>
            </td>
            
            <td class="width25Percentage">
                <input type="text" id="txtMdsITPersonnel" class="mgrFormDesign mdsForm" name="txtMdsITPersonnel" value="${contractMaster.contractMdsInformationDetail.it_personnel}" maxlength="50" readonly>
            </td>
            
            <td class="width5Percentage"></td>
            
            <td class="width25Percentage">
                Designation
            </td>
            
            <td class="width25Percentage">
                <input type="text" id="txtMdsDesignation" class="mgrFormDesign mdsForm" name="txtMdsDesignation" value="${contractMaster.contractMdsInformationDetail.designation}" maxlength="50" readonly>
            </td>
        </tr>
        
        <tr>
            <td>
                Contact No. <span class="mandatory" hidden>*</span>
            </td>
            
            <td>
                <input type="text" id="txtMdsContactNo" class="mgrFormDesign mdsForm" name="txtMdsContactNo" value="${contractMaster.contractMdsInformationDetail.contact_no}" maxlength="50" readonly>
            </td>
            
            <td></td>
            
            <td>
                Email Address
            </td>
            
            <td>
                <input type="text" id="txtMdsEmailAddress" class="mgrFormDesign mdsForm" name="txtMdsEmailAddress" value="${contractMaster.contractMdsInformationDetail.email_address}" maxlength="50" readonly>
            </td>
        </tr>
        
        <tr>
            <td>
                No. of Work Station
            </td>
            
            <td>
                <input type="text" id="txtMdsNoWorkStation" class="mgrFormDesign mdsForm" name="txtMdsNoWorkStation" value="${contractMaster.contractMdsInformationDetail.no_work_station}" maxlength="50" readonly>
            </td>
            
            <td></td>
            
            <td>
                No. of Site/Outlet
            </td>
            
            <td>
                <input type="text" id="txtMdsNoSiteOrOutlet" class="mgrFormDesign mdsForm" name="txtMdsNoSiteOrOutlet" value="${contractMaster.contractMdsInformationDetail.no_site_or_outlet}" maxlength="50" readonly>
            </td>
        </tr>
    </table>
</div>

<!-- machince details information -->
<table id="tblMdsMachineDetailInformation" class="defaultPosition mgrBorderRadius tblWdth100 contractDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" 
    cellspacing="0"> 
    <thead class="mgrDataTableThead">
        <tr>
            <th colspan="13" class="mgrTdPadTopBot20 bdrBtmWhiteMgr">
                Machines Detail Information
            </th>
        </tr>
        
        <tr>
            <th class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrTxtAlignCenter mgrThead2FontSize" style="width: 4%;">
                No.
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignCenter mgrThead2FontSize" style="width: 12%; padding-left: 5px;">
                Ship To
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignCenter mgrThead2FontSize" style="padding-left: 5px; width: 11%;">
                Model
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignCenter mgrThead2FontSize" style="padding-left: 5px; width: 18%;">
                Serial #
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignCenter mgrThead2FontSize" style="padding-left: 5px; width: 9%;">
                Install Date
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignCenter mgrThead2FontSize" style="padding-left: 5px; width: 12%;">
                Address
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignCenter mgrThead2FontSize" style="padding-left: 5px; width: 7%;">
                Ownership
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignCenter mgrThead2FontSize" colspan="2" style="padding-left: 5px; width: 12%;">
                Copy Charge
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignCenter mgrThead2FontSize" style="padding-left: 5px; width: 5%;">
                Start Meter
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignCenter mgrThead2FontSize" style="padding-left: 5px; width: 6%;">
                Status
            </th>
            
            <th class="mgrTdPadTopBot20 mgrPaddingRight20 mgrFloatRight">
                <img src="../../include/mgr/include/images/MGR-LOGO/Add mgr.png" id="logoAddMdsMachineDetail" class="logoTheadTableMgr" alt="logo Add Row" hidden>
            </th>
        </tr>
        <tr>
            <th colspan="7"></th>
            <th class="mgrTdPadTopBot20 mgrTxtAlignCenter mgrThead2FontSize" style="padding-left: 5px; width: 6%">
                Mono
            </th>
            <th class="mgrTdPadTopBot20 mgrTxtAlignCenter mgrThead2FontSize" style="padding-left: 5px; width: 6%">
                Color
            </th>
            <th colspan="3"></th>
        </tr>
    </thead>
    
    <tbody class="bgWhite"> 
        <c:forEach var="mdsMachine" items="${contractMaster.contractMdsInformationDetail.listOfContractMdsMachineInformationDetails}" varStatus="loop">
            <tr>
                <td class="mgrTdPadTopBot20 mgrPaddingLeft20 txtStyleSanRegularMgr">
                    ${loop.count}.
                </td>
                
                 <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                    <input type="text" id="txtMdsShippingId_${loop.count}" name="txtMdsShippingId_${loop.count}" value="${mdsMachine.customer_shipping_id}" class="shippingId" readonly hidden>
                    <input type="text" id="txtMdsShippingTo_${loop.count}" name="txtMdsShippingTo_${loop.count}" class="mgrFormDesign txtMdsShippingTo" value="${mdsMachine.customer_shipping_name}" onkeypress="return bindValidateCustomerAlreadyChoose();">
                    <input type="hidden" id="txtMdsShippingToHidden_${loop.count}" value="${mdsMachine.customer_shipping_name}" readonly>
                 </td>
                
                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                    <input type="text" id="txtMdsModel_${loop.count}" name="txtMdsModel_${loop.count}" class="mgrFormDesign txtMdsModel" value="${mdsMachine.model}" data-current="${mdsMachine.model}" maxlength="15">
                </td>
                
                <td class="mgrTdPadTopBot20"  style="padding-left: 5px;">
                    <input type="hidden" id="txtMdsSerialUsed_${loop.count}" class="txtMdsSerialUsed" value="${mdsMachine.existed}" readonly>
                    <input type="text" id="txtMdsSerial_${loop.count}" name="txtMdsSerial_${loop.count}" class="mgrFormDesign txtMdsSerial" value="${mdsMachine.serial}" data-current="${mdsMachine.serial}" maxlength="20" onchange="bindAjaxCheckModelAndSerialExist($(this));">
                </td>
                
                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                    <input type="text" id="txtMdsInstallDate_${loop.count}" name="txtMdsInstallDate_${loop.count}" class="mgrFormDesign txtMdsInstallDate" value="${mdsMachine.install_date}" readonly>
                </td>
                
                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                    <input type="text" id="txtMdsAddress_${loop.count}" name="txtMdsAddress_${loop.count}" class="mgrFormDesign txtMdsAddress" value="${mdsMachine.customer_address}" readonly>
                </td>
                
                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                   <select id="ddlOwnership_${loop.count}" name="ddlOwnership_${loop.count}" class="ddlMdsOwnership ddlMgr">
                        <option value="Internal" ${mdsMachine.ownership eq "Internal" ? 'selected' : ''}selected>Internal</option>
                        <option value="External" ${mdsMachine.ownership eq "External" ? 'selected' : ''}>External</option>
                    </select>
                </td>       
                
                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                    <input type="text" id="txtMonoCopyCharge_${loop.count}" name="txtMonoCopyCharge_${loop.count}" class="mgrFormDesign monoCopyCharge" style="text-align: right;" value="<fmt:formatNumber value="${mdsMachine.copyChargeMono}" type="currency" maxFractionDigits="4" minFractionDigits="4"/>" onchange="copyMonoOnChange($(this));" onkeypress="return isNumberPlusComma(event, $(this));">
                </td>
                
                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                    <input type="text" id="txtColorCopyCharge_${loop.count}" name="txtColorCopyCharge_${loop.count}" class="mgrFormDesign colorCopyCharge" style="text-align: right;" value="<fmt:formatNumber value="${mdsMachine.copyChargeColor}" type="currency" maxFractionDigits="4" minFractionDigits="4"/>" onchange="copyColorOnChange($(this));" onkeypress="return isNumberPlusComma(event, $(this));">
                </td>
                
                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                    <input type="text" id="txtMdsStartMeter_${loop.count}" name="txtMdsStartMeter_${loop.count}" class="mgrFormDesign txtMdsStartMeter" value="${mdsMachine.start_meter}" onkeypress="return isNumberUnit(event)">
                </td>
                
                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                    <select id="ddlMdsStatus_${loop.count}" name="ddlMdsStatus_${loop.count}" class="ddlMdsStatus ddlMgr">
                        <option value="Active" ${mdsMachine.status eq "Active" ? 'selected' : ''}>Active</option>
                        <option value="Inactive" ${mdsMachine.status eq "Inactive" ? 'selected' : ''}>Inactive</option>
                    </select>
                </td>
                
                <td class="mgrTdPadTopBot20 mgrPaddingRight20 txtAlignCenter">
                    <!--<img src="../../include/mgr/include/images/MGR-LOGO/Remove mgr.png"  class="mgrFloatRight logoTheadTableMgr" alt="logo Remove Row" onclick="deleteSelectedMdsMachineDetailRow($(this));">-->
                </td>
            </tr>
        </c:forEach>
    </tbody>
</table>

<!-- button for qr code list -->
<input type="button" value="QR Code List" id="btnQRCodeList" style="margin-top: 10px;">

<!-- mds remarks -->
<div class="defaultPosition divFormMGR contractDetailSectionDiv bodyAndFormBorderMGR mgrSpace40">
    <table id="tblMdsRemarks" class="tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr">
        <tr>
            <td style="width: 20%;">
                Remarks
            </td>
            
            <td rowspan="4">
                <textarea id="txtMdsRemarks" class="mgrFormDesign mgrTextAreaOnTable" name="txtMdsRemarks" maxlength="300" readonly>${contractMaster.contractMdsInformationDetail.mds_remark}</textarea>
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