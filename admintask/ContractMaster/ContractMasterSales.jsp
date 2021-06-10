<%-- 
    Document   : ContractMasterSales
    Created on : 14 Jun, 2019, 12:35:41 PM
    Author     : Wildan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://sargue.net/jsptags/time" prefix="javatime" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!-- css js lease -->
<link rel="stylesheet" href="./include/css/ContractMasterSales.css" type="text/css">
<script type="text/javascript" src="./include/js/ContractMasterSales.js"></script>

<div class="defaultPosition divFormMGR contractDetailSectionDiv bodyAndFormBorderMGR mgrSpace40">
    <table class="tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr">
        <tr>
            <td class="width20Percentage">
               Contract Start Date <span class="mandatory">*</span>
            </td>

            <td class="width25Percentage">
                <input type="text" id="txtSalesContractStartDate" class="mgrFormDesign" name="txtSalesContractStartDate" value="${contractMaster.contractSalesInformationDetail.contract_start_date}" readonly>
            </td>
            <td class="width5Percentage"></td>
            
            <td class="width25Percentage">
                Contract Expiry Date <span class="mandatory">*</span>
            </td>

            <td class="width25Percentage">
                <input type="text" id="txtSalesContractExpiryDate" class="mgrFormDesign" name="txtSalesContractExpiryDate" value="${contractMaster.contractSalesInformationDetail.contract_expiry_date}" readonly>
            </td>
        </tr>
        <tr>
            <td class="width20Percentage">
                <input type="text" id="txtContractSalesId" name="txtContractSalesId" value="${contractMaster.contractSalesInformationDetail.id}" readonly hidden>
                <input type="text" id="txtSalesPaymentDetailCount" name="txtSalesPaymentDetailCount" readonly hidden>
                Product <span class="mandatory">*</span>
            </td>

            <td class="width25Percentage">
                <select id="ddlSalesProduct" name="ddlSalesProduct" disabled>
                    <option value="0" selected disabled>-- Please Select Product --</option>
                    <c:forEach var="product" items="${listOfProductHeaders}">
                        <option value="${product.id}" ${contractMaster.contractSalesInformationDetail.product_id eq product.id ? 'selected' : ''}>
                            ${product.name}
                        </option>
                    </c:forEach>
                </select>
            </td>
            
            <td class="width5Percentage"></td>
            
            <td>
                Contract Period (Months) <span class="mandatory">*</span>
            </td>

            <td>
                <input type="text" id="txtSalesContractPeriodMonths" onkeypress="return isNumber(event);" class="mgrFormDesign" name="txtSalesContractPeriodMonths" value="${contractMaster.contractSalesInformationDetail.contract_period_month}">
            </td>

        </tr>
        
        <tr>
            <td>
                Sales Type <span class="mandatory">*</span>
            </td>

            <td>
                <select id="ddlSalesType" name="ddlSalesType" disabled>
                    <option value="0" selected disabled>-- Please Select Sales Type --</option>
                    <c:forEach var="salesType" items="${listOfSalesTypeHeaders}">
                        <option value="${salesType.id}" ${contractMaster.contractSalesInformationDetail.sales_type_id eq salesType.id ? 'selected' : ''}>
                            ${salesType.name}
                        </option>
                    </c:forEach>
                </select>
            </td>
            
            <td></td>
            <td class="width25Percentage">
                Contract Reference No. <span id="show" class="mandatory">*</span>
            </td>

            <td style="width: 5% !important;">
                <select id="ddlPrefix" name="ddlPrefix">
                    <option value="0" selected disabled>-- Please Select Prefix --</option>              
                    <option value="SAC" ${contractMaster.contractSalesInformationDetail.prefix eq 'SAC'  ? 'selected' : ''}>
                    SAC
                    </option>
                    <option value="SAM" ${contractMaster.contractSalesInformationDetail.prefix eq 'SAM'  ? 'selected' : ''}>SAM</option>
                    <option value="TP" ${contractMaster.contractSalesInformationDetail.prefix eq 'TP'  ? 'selected' : ''}>TP</option>
                    <option value="RAC" ${contractMaster.contractSalesInformationDetail.prefix eq 'RAC'  ? 'selected' : ''}>RAC</option>
                    <option value="MIS" ${contractMaster.contractSalesInformationDetail.prefix eq 'MIS'  ? 'selected' : ''}>MIS</option>
                    <!--    <input type="hidden" id="txtPrefix" name="txtPrefix"> -->
                </select>
                <input type="text" id="txtSalesContractReferenceNo" style="width: 68% !important" class="mgrFormDesign" name="txtSalesContractReferenceNo" value="${contractMaster.contractSalesInformationDetail.halfRefNo}" maxlength="50" readonly>    
            </td>
        </tr>
       
        <tr>
            <td>
                Sales Amount <span class="mandatory">*</span>
                <br>
                (Exc. GST)
            </td>

            <td>
                <input type="text" id="txtSalesAmountGstNo" class="mgrFormDesign mgrAmountInput mgrAmountAlign" name="txtSalesAmountGstNo" data-dot="0" onkeypress="return isNumberPlusComma(event, $(this));" value="<fmt:formatNumber value="${contractMaster.contractSalesInformationDetail.sales_ammount}" type="currency" maxFractionDigits="2" minFractionDigits="2"/>" readonly>
            </td>
            
            <td></td>
            <td class="width25Percentage"></td>
            
        </tr>

        <tr>    
            <td></td>
            <td></td>
            <td></td>
            
        </tr>

        <tr>
            <td>
                Sales Remarks <span id="salesMandatory" class="mandatory" hidden>*</span>
            </td>

            <td colspan="4" rowspan="4">
                <textarea id="txtSalesRemarks" name="txtSalesRemarks" class="mgrFormDesign mgrTextAreaOnTable" maxlength="300" readonly>${contractMaster.contractSalesInformationDetail.sales_remarks}</textarea>
            </td>
        </tr>
        
        <tr><td></td></tr>
        
        <tr><td></td></tr>
        
        <tr><td></td></tr>
    </table>
</div>

<!-- Payment Details Section -->
<table id="tablePaymentDetails" class="defaultPosition mgrBorderRadius tblWdth100 contractDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0"> 
    <thead class="mgrDataTableThead">
        <tr>
            <th colspan="8" class="mgrTdPadTopBot20 bdrBtmWhiteMgr">
                Payment Details
            </th>
        </tr>

        <tr>
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="width:5%;">
                No.
            </th>  

            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="width: 5%;">
                Percentage
            </th>

            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 10px; width: 20%;">
                Payment Phases
            </th>

            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 10px; width: 15%;">
                Payment Amount
            </th>

            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 10px; width: 15%;">
                Invoice Number
            </th>

            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 10px; width: 15%;">
                Invoice Date
            </th>

            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 10px; width: 15%;">
                Payment Date
            </th>

            <th class="mgrTdPadTopBot20 mgrPaddingRight20 mgrFloatRight">
                <img src="../../include/mgr/include/images/MGR-LOGO/Add mgr.png" id="btnAddSalesPaymentDetails" class="logoTheadTableMgr" alt="logo Add Row" hidden>
            </th>
        </tr>
    </thead>

    <tbody class="bgWhite">
        <c:forEach var="salesPayment" items="${contractMaster.contractSalesInformationDetail.listOfContractSalesPaymentDetails}" varStatus="loop">
            <tr>
                <td class="mgrTdPadTopBot20 mgrPaddingLeft20 txtStyleSanRegularMgr">
                    ${loop.count}.
                </td>

                <td class="mgrTdPadTopBot20">
                    <input type="text" id="txtPaymentDetailsPercentage_${loop.count}" name="txtPaymentDetailsPercentage_${loop.count}" class="mgrFormDesign txtPaymentDetailsPercentage" data-dot="0" data-current="${salesPayment.percentage}" value="${salesPayment.percentage}" onkeypress="return isNumberPercentage(event, $(this));" onchange="bindSetPercentageFormat($(this));">
                </td>

                <td class="mgrTdPadTopBot20" style="padding-left: 10px;">
                    <input type="text" id="txtPaymentPhases_${loop.count}" name="txtPaymentPhases_${loop.count}" class="mgrFormDesign txtPaymentPhases" value="${salesPayment.payment_phases}" maxlength="50">
                </td>

                <td class="mgrTdPadTopBot20"  style="padding-left: 10px;">
                    <input type="text" id="txtPaymentAmount_${loop.count}" name="txtPaymentAmount_${loop.count}" class="mgrAmountInput mgrFormDesign txtPaymentAmount mgrAmountAlign" value="<fmt:formatNumber type="currency" value="${salesPayment.payment_ammount}" maxFractionDigits="2" minFractionDigits="2"/>" onkeypress="return isNumberPlusComma(event, $(this));">
                </td>

                <td class="mgrTdPadTopBot20" style="padding-left: 10px;">
                    <input type="text" id="txtInvoiceNumber_${loop.count}" name="txtInvoiceNumber_${loop.count}" class="mgrFormDesign txtInvoiceNumber" value="${salesPayment.invoice_number}" maxlength="20">
                </td>

                <td class="mgrTdPadTopBot20" style="padding-left: 10px;">
                    <input type="text" id="txtInvoiceDate_${loop.count}" name="txtInvoiceDate_${loop.count}" class="mgrFormDesign txtInvoiceDate" value="${salesPayment.invoice_date}" readonly>
                </td>

                <td class="mgrTdPadTopBot20" style="padding-left: 10px;">
                    <input type="text" id="txtPaymentDate_${loop.count}" name="txtPaymentDate_${loop.count}" class="mgrFormDesign txtPaymentDate" value="${salesPayment.payment_date}" readonly>
                </td>

                <td class="mgrTdPadTopBot20 txtAlignCenter mgrPaddingRight20 mgrFloatRight">
                    <img src="../../include/mgr/include/images/MGR-LOGO/Remove mgr.png" class="logoTbodyTableMgr" onclick="bindDeleteSelectedPaymentDetails($(this));" alt="logo Remove Row">
                </td>
            </tr>
        </c:forEach>
    </tbody>
</table>

<table class="defaultPosition mgrBorderRadius tblWdth100 contractDetailSectionDiv tableMGRRounded mgrSpace40 bodyAndFormBorderMGR" cellspacing="0"> 
    <thead class="mgrDataTableThead">
        <tr>
            <th colspan="5" class="mgrTdPadTopBot20">
                Product and Services
            </th>
        </tr>
    </thead>
    
    <tbody class="bgWhite">
        <tr id="productAndServicesRow">
            <td class="mgrTdPadTopBot20 mgrPaddingLeft20 txtStyleSanRegularMgr">
                Please Select <span class="mandatory">*</span>
                <input type="text" id="txtRdSalesProductServiceCount" name="txtRdSalesProductServiceCount" readonly hidden>
            </td>
            
            <c:forEach var="productAndServices" items="${listOfProductAndServicesHeaders}" varStatus="loop">
                <td class="mgrTdPadTopBot20">
                    <label class="checkBoxMgrContainer" class="txtStyleSanRegularMgr">${productAndServices.name}                        
                        <input type="checkbox" class="salesProductAndServices" name="rdProductAndServices" data-checked="${productAndServices.id}" value="${productAndServices.id}" onclick="bindRadioButtonOnCheck($(this));" ${salesProductServices.product_and_services_id eq productAndServices.id ? 'checked' : ''} disabled>
                        <span class="checkmarkMgr"></span>                      
                    </label>
                </td>
            </c:forEach>
        </tr>
    </tbody>
</table>


