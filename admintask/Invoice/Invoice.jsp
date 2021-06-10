<%-- 
    Document   : Invoice
    Created on : 8 Jul, 2019, 5:03:29 PM
    Author     : Wildan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://sargue.net/jsptags/time" prefix="javatime" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <jsp:include page="../include/include.jsp"/>
        <title>Invoice</title>
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/Invoice.css" type="text/css">
        <script type="text/javascript" src="./include/js/Invoice.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <script>
            var paramId = ${param.inv_id}
            var type = ${param.report};
        </script>
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="message" value="${param.message}" readonly hidden>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Invoice"></jsp:param>
        </jsp:include>
        
        <form id="frm" action="Invoice" method="POST">
            <div class="defaultBodyContent">
                <!-- supporting value do -->       
                <input type="hidden" id="txtURLIN" value="${urlIN}" readonly>
                <input type="hidden" id="txtInvoiceId" name="txtInvoiceId" value="${invoiceHeader.id}" readonly>
                <input type="hidden" id="txtOrderEntryId" name="txtOrderEntryId" value="${invoiceHeader.order_entry_id}" readonly>
                <input type="hidden" id="txtDeliveryOrderId" name="txtDeliveryOrderId" value="${invoiceHeader.delivery_order_id}" readonly>
                <input type="hidden" id="txtInvoiceStatus" name="txtInvoiceStatus" value="${invoiceHeader.status}" readonly>
                <input type="hidden" id="txtServiceCallId" name="txtServiceCallId" value="${invoiceHeader.service_call_id}" readonly>
                <input type="hidden" id="txtContractSalesInfoId" name="txtContractSalesInfoId" value="${invoiceHeader.contract_sales_information_id}">
                <div class="defaultPosition divFormMGR bodyAndFormBorderMGR mgrSpace40">
                    <table class="tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr">
                        <tr>
                            <td class="width20Percentage">
                                Business Entity <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <select id="ddlBusinessEntityId" name="ddlBusinessEntityId" class="fromDO invoiceRdy">
                                    <option value="0" selected  >-- Please Select Entity --</option>
                                    <c:forEach items="${listOfUserLoggedEntities}" var="entity">
                                        <option value="${entity.id}" ${entity.id eq invoiceHeader.business_entity_id ? 'selected' : ''}>
                                            ${entity.name}
                                        </option>
                                    </c:forEach>
                                </select>
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                Invoice No.
                            </td>

                            <td class="width25Percentage">
                                <input type="text" id="txtInvoiceNo" name="txtInvoiceNo" class="mgrFormDesign invoiceRdy" value="${invoiceHeader.invoice_no}" readonly>
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage">
                                Customer Name <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <input type="text" maxlength="50" id="txtCustomerName" name="txtCustomerName" class="mgrFormDesign fromDO invoiceRdy" value="${invoiceHeader.customer_name}">
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                Invoice Date
                            </td>

                            <td class="width25Percentage">
                                <input type="text" id="txtInvoiceDate" name="txtInvoiceDate" class="mgrFormDesign invoiceRdy" value="${invoiceHeader.invoice_date}" readonly>
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage">
                                Customer Code <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <input type="hidden" id="txtCustomerId" name="txtCustomerId" value="${invoiceHeader.customer_id}" readonly>
                                <input type="text" id="txtCustomerCode" name="txtCustomerCode" class="mgrFormDesign fromDO invoiceRdy" value="${invoiceHeader.customer_code}" readonly>
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                Order No.
                            </td>

                            <td class="width25Percentage">
                                <input type="text" id="txtOrderNo" name="txtOrderNo" class="mgrFormDesign fromDO invoiceRdy" value="${invoiceHeader.order_entry_no}" readonly>
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage">
                                Invoice Type <span class="mandatory">*</span>
                            </td>
                            
                            <c:if test="${invoiceHeader.delivery_order_id == 0}">
                            <td class="width25Percentage">
                                <select id="ddlInvoiceTypeId" name="ddlInvoiceTypeId" class="invoiceRdy fromDO fromServiceCall">
                                    <option value="0" selected disabled>-- Please Select Invoice Type --</option>
                                    <c:forEach items="${listOfInvoiceTypeHeaders}" var="inv_type">
                                        <option value="${inv_type.id}" ${inv_type.id eq invoiceHeader.invoice_type_id ? 'selected' : ''}>
                                            ${inv_type.name}
                                        </option>
                                    </c:forEach>
                                </select>
                            </td>    
                            </c:if>
                            <c:if test="${invoiceHeader.delivery_order_id != 0}">
                            <td class="width25Percentage">
                                <select id="ddlInvoiceTypeId" name="ddlInvoiceTypeId" class="invoiceRdy fromDO fromServiceCall">
                                    <option value="0" selected disabled>-- Please Select Invoice Type --</option>
                                    <c:forEach items="${listInvociceTypeWithoutMeter}" var="inv_type">
                                        <option value="${inv_type.id}" ${inv_type.id eq invoiceHeader.invoice_type_id ? 'selected' : ''}>
                                            ${inv_type.name}
                                        </option>
                                    </c:forEach>
                                </select>
                            </td>
                            </c:if>
                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                Client Reference No. <span class="mandatory" id="clientRFMandatory">*</span>
                            </td>

                            <td class="width25Percentage" id="parentServiceCallLink">
                                <input type="text" id="txtContractType" name="txtContractType" class="txtContractType serviceCallNotDisp" value="0" readonly hidden>
                                <select id="ddlReferenceNo" name="ddlReferenceNo" class="ddlReferenceNo fromServiceCall serviceCallNotDisp" onchange="setCustomerSalesInformationDetailId()">         
                                    <option value="0" selected disabled>-- Please Select Client Reference No --</option>
                                </select>
                                <input type="text" maxlength="50" id="txtClientReferenceNo" name="txtClientReferenceNo" value="${invoiceHeader.client_reference_no}" class="mgrFormDesign fromDO invoiceRdy serviceCallNotDisp">
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage">
                                Payment Mode <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <select id="ddlPaymentModeId" name="ddlPaymentModeId">
                                    <option value="0" selected disabled>-- Please Select Payment Mode --</option>
                                    <c:forEach items="${listOfPaymentTermHeaders}" var="paymentTerm">
                                        <option value="${paymentTerm.id}" ${invoiceHeader.payment_terms_id eq paymentTerm.id ? 'selected' : ''}>${paymentTerm.name}</option>
                                    </c:forEach>
                                </select>
                                    <input type="text" id="txtPaymentModeId" name="txtPaymentModeId" value="${invoiceHeader.payment_terms_id}" readonly hidden>
                                    <input type="text" id="txtPaymentModeName" name="txtPaymentModeName" value="${invoiceHeader.payment_terms_name}" class="mgrFormDesign fromDO invoiceRdy" readonly hidden>
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                Driver / Technician <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                            <input type="text" name="colMode" value="${invoiceHeader.collection_mode}" hidden>
                                <c:choose>
                                    <c:when test="${invoiceHeader.collection_mode eq 'Self Collect'}">
                                        <input type="text" name="driverAdmin" id="driverAdmin" class="mgrFormDesign" value="${driverAdmin}"readonly>
                                        <input type="text" name="driverAdminId" id="driverAdminId" class="mgrFormDesign" value="${driverAdminId}" hidden>
                                    </c:when>
                                        <c:otherwise>
                                <select id="ddlDriverOrTechnicianId" name="ddlDriverOrTechnicianId" class="fromDO invoiceRdy">
                                    <option value="0" selected disabled>-- Please Select Driver/Technician --</option>
                                    <c:forEach items="${listOfDriverOrTechnicianHeaders}" var="driverTech">
                                        <option value="${driverTech.id}" ${invoiceHeader.driver_or_technician_id eq driverTech.id ? 'selected' : ''}>${driverTech.driver_or_technician_name}</option>
                                    </c:forEach>
                                </select>
                                        </c:otherwise>
                                </c:choose>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- bill to and ship to section -->
                <table class="defaultPosition mgrBorderRadius tblWdth100 contractDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0">
                    <thead class="mgrDataTableThead">
                        <tr>
                            <th colspan="2" class="mgrTdPadTopBot20 mgrPaddingLeft30">
                                Bill To 
                            </th>

                            <th colspan="3" class="mgrTdPadTopBot20 mgrPaddingLeft30">
                                Ship To
                            </th>
                        </tr>
                    </thead>

                    <tbody class="bgWhite">
                        <tr id="chkShipToTr">
                            <td colspan="2" class="width20Percentage mgrPaddingLeft30 mgrTdPaddingTopTable">
                               
                            </td>
                            <td class="mgrFormBorderSpacing"></td>
                            <td colspan="3"class="width25Percentage mgrTdPaddingTopTable">
                                <input type="checkbox" class="chkCategory" id="chkShipTo" name="chkShipTo" value="1">
                                <sub><i>Select if same as billing address</i></sub>
                            </td>
                        </tr>
                        <tr>
                            <td class="width20Percentage mgrPaddingLeft30 mgrTdPaddingTopTable">
                                Attention To <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage mgrTdPaddingTopTable">
                                <input type="text" class="mgrFormDesign txtAttentionTo fromDO invoiceRdy" id="txtAttentionTo" name="txtAttentionTo" value="${invoiceHeader.bill_attention_to}" readonly>
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage mgrTdPaddingTopTable">
                                Ship To <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage mgrPaddingRight30 mgrTdPaddingTopTable">
                                <input type="text" class="mgrFormDesign txtShipTo fromDO invoiceRdy" id="txtShipTo" name="txtShipTo" value="${invoiceHeader.ship_attention_to}" readonly>
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage mgrTdPaddingTopTable mgrPaddingLeft30" style="vertical-align: top;">
                                Address <span class="mandatory">*</span>
                            </td>

                            <td rowspan="2" class="width25Percentage mgrTdPaddingTopTable">
                                <textarea class="mgrFormDesign mgrTextAreaOnTable txtAddress fromDO invoiceRdy" id="txtAddressAttentionTo" name="txtAddressAttentionTo" readonly>${invoiceHeader.bill_address_to}</textarea>
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage mgrTdPaddingTopTable" style="vertical-align: top;">
                                Address <span class="mandatory">*</span>
                            </td>

                            <td rowspan="2" class="width25Percentage mgrPaddingRight30 mgrTdPaddingTopTable">
                                <textarea class="mgrFormDesign mgrTextAreaOnTable fromDO invoiceRdy" id="txtAddressShipTo" name="txtAddressShipTo" readonly>${invoiceHeader.ship_address_to}</textarea>
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage"></td>
                            <td class="mgrFormBorderSpacing"></td>
                            <td class="width25Percentage"></td>
                        </tr>

                        <tr>
                            <td class="width20Percentage mgrPaddingLeft30 mgrTdPaddingTopTable mgrTdPaddingBotTable">
                                Postal Code <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage mgrTdPaddingTopTable mgrTdPaddingBotTable">
                                <input type="text" class="mgrFormDesign txtPostalCodeAttentionTo fromDO invoiceRdy" id="txtPostalCodeAttentionTo" name="txtPostalCodeAttentionTo" value="${invoiceHeader.bill_postal_code}" readonly>
                            </td>

                            <td class="mgrFormBorderSpacing mgrTdPaddingBotTable"></td>

                            <td class="width25Percentage mgrTdPaddingTopTable mgrTdPaddingBotTable">
                                Postal Code <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage mgrPaddingRight30 mgrTdPaddingTopTable mgrTdPaddingBotTable">
                                <input type="text" class="mgrFormDesign txtPostalCodeShipTo fromDO invoiceRdy" id="txtPostalCodeShipTo" name="txtPostalCodeShipTo" value="${invoiceHeader.ship_postal_code}" readonly>
                            </td>
                        </tr>
                    </tbody>              
                </table>
                <!-- end section -->

                <!-- item details section -->
                <table id="tblInvoiceItemDetail" class="defaultPosition mgrBorderRadius tblWdth100 contractDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0">
                    <thead class="mgrDataTableThead">
                        <tr>
                            <th class="mgrTdPadTopBot20 mgrPaddingLeft20" colspan="8" style="border-bottom: 1px solid #ffffff;">
                                <input type="hidden" id="txtTotalItemDetail" name="txtTotalItemDetail" readonly>
                                Item Details
                            </th>

                            <th class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20" style="border-bottom: 1px solid #ffffff; width: 5%;">
                                <img src="../../include/mgr/include/images/MGR-LOGO/Edit.png" id="btnEditItemDetails" class="logoTheadTableMgr bye fromDO MGRIconButton invoiceRdy" alt="logo Add Item">
                            </th>
                        </tr>

                        <tr>
                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff; width: 5%;">
                                No.
                            </th>

                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff; width: 10%;">
                                Item SKU
                            </th>

                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff; width: 10%;">
                                Part No.
                            </th>

                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff; width: 40%;">
                                Description
                            </th>
                            <c:choose>
                                <c:when test="${invType eq 'Meter Reading'}">
                                    <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff; width: 8%;">
                                        BW / Color
                                    </th>
                                </c:when>
                                <c:otherwise>
                                    <th id="uomTh" class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff; width: 8%;">
                                        UOM
                                    </th>
                                    <th id="bwTh" class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff; width: 8%; display: none;">
                                        BW / Color
                                    </th>
                                </c:otherwise>
                            </c:choose>
                                    
                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff; width: 8%;">
                                Quantity
                            </th>

                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="width: 8%; border-bottom: 1px solid #ffffff; width: 9%;">
                                Unit Price
                            </th>

                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="width: 8%; border-bottom: 1px solid #ffffff; width: 9%;">
                                Total
                            </th>

                            <th hidden></th>

                            <th class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20" style="border-bottom: 1px solid #ffffff;">
                                <img src="../../include/mgr/include/images/MGR-LOGO/Remove White.png" id="btnDeleteAllItem" class="logoTheadTableMgr bye serviceCallNoDisp fromDO invoiceRdy" alt="logo Delete All Item">
                            </th>
                        </tr>
                    </thead>

                    <tbody class="bgWhite">
                        <c:forEach items="${invoiceHeader.listOfInvoiceItemDetails}" var="invoiceDetail" varStatus="loop">
                            <c:choose>
                                <c:when test="${order_item.uom eq 'ie'}">
                                    <tr id="contract">
                                </c:when>
                                <c:otherwise>
                                     <tr id="noContract">
                                </c:otherwise>
                            </c:choose>
                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">
                                   ${loop.count}. 
                                </td>

                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">
                                    ${invoiceDetail.item_sku}
                                </td>

                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">
                                    ${invoiceDetail.part_no}
                                </td>
                            <c:choose>
                                <c:when test="${invType eq 'Meter Reading'}">
                                    <td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">
                                    ${invoiceDetail.item_name}
                                    <br>
                                    <small><i>Start Meter: ${invoiceDetail.startMeter}</i></small>
                                    <br>
                                    <small><i>End Meter: ${invoiceDetail.endMeter}</i></small>
                                </td>
                                </c:when>
                                <c:otherwise>
                                    <td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">
                                    ${invoiceDetail.item_name}
                                    <br>
                                    <small><i>${invoiceDetail.item_remark}</i></small>
                                </td>
                                </c:otherwise>
                            </c:choose>
                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">
                                    ${invoiceDetail.uom}
                                </td>

                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom" style="text-align: right;">
                                    <fmt:formatNumber value="${invoiceDetail.quantity}" maxFractionDigits="1"/>
                                </td>

                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom">
                                    <c:choose>
                                        <c:when test="${invType eq 'Meter Reading'}">
                                            <input type="text" style="text-align: right;" id="txtInvoiceUnitPrice_${loop.count}" class="unitPrice mgrFormDesign" name="txtInvoiceUnitPrice_${loop.count}" value="<fmt:formatNumber value="${invoiceDetail.unit_price}" type="currency" maxFractionDigits="4" minFractionDigits="4"/>" class="mgrFormDesign invoiceUnitPrice invoiceRdy" onkeypress="return isNumberPlusComma(event, $(this));" onchange="invoiceUnitPriceOnChange($(this));">
                                        </c:when>
                                        <c:otherwise>
                                            <input type="text" style="text-align: right;" id="txtInvoiceUnitPrice_${loop.count}" class="unitPrice mgrFormDesign" name="txtInvoiceUnitPrice_${loop.count}" value="<fmt:formatNumber value="${invoiceDetail.unit_price}" type="currency" maxFractionDigits="2" minFractionDigits="2"/>" class="mgrFormDesign invoiceUnitPrice invoiceRdy" onkeypress="return isNumberPlusComma(event, $(this));" onchange="invoiceUnitPriceOnChange($(this));">
                                        </c:otherwise>
                                    </c:choose>
                                    <input type="hidden" value="${invoiceDetail.price}" class="sellingPrice" id="sellingPrice_${loop.count}">
                                </td>

                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom" style="text-align: right;">
                                    <c:choose>
                                        <c:when test="${invType eq 'Meter Reading'}">
                                            <fmt:formatNumber value="${invoiceDetail.total_price}" maxFractionDigits="4" minFractionDigits="4" type="currency"/> 
                                        </c:when>
                                        <c:otherwise>
                                            <fmt:formatNumber value="${invoiceDetail.total_price}" maxFractionDigits="2" minFractionDigits="2" type="currency"/> 
                                        </c:otherwise>
                                    </c:choose>        
                                </td>

                                <td hidden>
                                    <!-- for input type hidden posting -->
                                    <input type="hidden" id="txtItemSKU_${loop.count}" name="txtItemSKU_${loop.count}" class="txtItemSKU" value="${invoiceDetail.item_sku}">
                                    <input type="hidden" id="txtPartNo_${loop.count}" name="txtPartNo_${loop.count}" class="txtPartNo" value="${invoiceDetail.part_no}">
                                    <input type="hidden" id="txtItemName_${loop.count}" name="txtItemName_${loop.count}" class="txtItemName" value="${invoiceDetail.item_name}">
                                    <input type="hidden" id="txtItemRemark_${loop.count}" name="txtItemRemark_${loop.count}" class="txtItemRemark" value="${invoiceDetail.item_remark}">
                                    <input type="hidden" id="txtUomName_${loop.count}" name="txtUomName_${loop.count}" class="txtUomName" value="${invoiceDetail.uom}">
                                    <input type="hidden" id="txtQuantity_${loop.count}" name="txtQuantity_${loop.count}" class="txtQuantity" value="${invoiceDetail.quantity}">
                                    <input type="hidden" id="txtUnitPrice_${loop.count}" class="txtUnitPrice" name="txtUnitPrice_${loop.count}" value="${invoiceDetail.unit_price}" readonly>
                                    <input type="hidden" id="txtTotalPrice_${loop.count}" class="txtTotalPrice" name="txtTotalPrice_${loop.count}" value="${invoiceDetail.total_price}" readonly>
                                    <input type="hidden" id="txtUomId_${loop.count}" name="txtUomId_${loop.count}" class="txtUomId" value="${invoiceDetail.item_uom_id}">
                                    <input type="text" id="startMeter_${loop.count}" name="startMeter_${loop.count}" class="startMeter" value="${invoiceDetail.startMeter}">
                                    <input type="text" id="endMeter_${loop.count}" name="endMeter_${loop.count}" class="endMeter" value="${invoiceDetail.endMeter}">
                                </td>

                                <td class="mgrTdPadTopBot20 mgrPaddingRight20 mgrPaddingLeft20 borderBottom" style="text-align: center;">
                                    <img src="../../include/mgr/include/images/MGR-LOGO/Trash.png" class="logoTheadTableMgr bye serviceCallNoDisp fromDO invoiceRdy" onclick="deleteSelectedItem($(this));" alt="logo Delete Item">
                                </td>
                            </tr>
                        </c:forEach>                                       
                    </tbody>

                    <tfoot class="bgWhite">
                        <tr>
                            <td class="mgrPaddingLeft20" colspan="2">
                                <label class="checkBoxMgrContainer" style="font-weight: bold;"> 
                                    <input type="checkbox" id="chkInclusiveGST" class="chkInclusiveGST invoiceRdy" name="chkInclusiveGST" ${invoiceHeader.total > invoiceHeader.sub_total ? 'checked' : ''}>
                                    <span class="checkmarkMgr"></span>
                                    Inclusive GST
                                </label>
                            </td>
                            
                            <td colspan="2"></td>

                            <td class="mgrTdPadTopBot20 mgrPaddingLeft20" colspan="3" style="font-weight: bold;">
                                Sub Total
                            </td>

                            <td class="mgrTdPadTopBot20 mgrPaddingLeft20" style="font-weight: bold; text-align: right;" id="subTotalPreview">
                                <c:choose>
                                    <c:when test="${invType eq 'Meter Reading'}">
                                        <fmt:formatNumber value="${invoiceHeader.sub_total}" type="currency" maxFractionDigits="4" minFractionDigits="4"/>
                                    </c:when>
                                    <c:otherwise>
                                        <fmt:formatNumber value="${invoiceHeader.sub_total}" type="currency" maxFractionDigits="2" minFractionDigits="2"/>
                                    </c:otherwise>
                                </c:choose>
                                
                            </td>

                            <td></td>

                            <td>
                                <input type="hidden" id="txtSubTotal" name="txtSubTotal" value="${invoiceHeader.sub_total}" readonly>
                                <input type="hidden" id="total" name="total" value="${invoiceHeader.total}" readonly>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="4"></td>

                            <td class="mgrTdPadTopBot20 mgrPaddingLeft20" colspan="3" style="font-weight: bold;">
                                GST
                            </td>

                            <td class="mgrTdPadTopBot20 mgrPaddingLeft20">
                                <c:if test="${invoiceHeader.gst eq null}">
                                    <c:choose>
                                        <c:when test="${invType eq 'Meter Reading'}">
                                            <input type="text" id="txtInvoiceGST" name="txtInvoiceGST" value="<fmt:formatNumber value="0" maxFractionDigits="4" minFractionDigits="4" type="currency"/>" class="mgrFormDesign invoiceRdy" style="text-align: right;" onchange="bindSetGst($(this));" data-dot="0" data-current="${invoiceHeader.gst}" onkeypress="return isNumberPlusComma(event, $(this));" readonly>
                                        </c:when>
                                        <c:otherwise>
                                            <input type="text" id="txtInvoiceGST" name="txtInvoiceGST" value="<fmt:formatNumber value="0" maxFractionDigits="2" minFractionDigits="2" type="currency"/>" class="mgrFormDesign invoiceRdy" style="text-align: right;" onchange="bindSetGst($(this));" data-dot="0" data-current="${invoiceHeader.gst}" onkeypress="return isNumberPlusComma(event, $(this));" readonly>
                                        </c:otherwise>
                                    </c:choose>
                                    </c:if>

                                <c:if test="${invoiceHeader.gst ne null}">
                                    <c:choose>
                                        <c:when test="${invType eq 'Meter Reading'}">
                                            <input type="text" id="txtInvoiceGST" name="txtInvoiceGST" value="<fmt:formatNumber value="${invoiceHeader.gst}" maxFractionDigits="4" minFractionDigits="4" type="currency"/>" class="mgrFormDesign invoiceRdy" style="text-align: right;" onchange="bindSetGst($(this));" data-dot="0" data-current="${invoiceHeader.gst}" onkeypress="return isNumberPlusComma(event, $(this));">
                                        </c:when>
                                        <c:otherwise>
                                            <input type="text" id="txtInvoiceGST" name="txtInvoiceGST" value="<fmt:formatNumber value="${invoiceHeader.gst}" maxFractionDigits="2" minFractionDigits="2" type="currency"/>" class="mgrFormDesign invoiceRdy" style="text-align: right;" onchange="bindSetGst($(this));" data-dot="0" data-current="${invoiceHeader.gst}" onkeypress="return isNumberPlusComma(event, $(this));">
                                        </c:otherwise>
                                    </c:choose>
                                     </c:if>                            
                            </td>

                            <td></td>

                            <td >
                                <c:if test="${invoiceHeader.gst eq null}">
                                    <input type="text" id="txtGST" name="txtGST" value="0" readonly hidden>
                                </c:if>

                                <c:if test="${invoiceHeader.gst ne null}">
                                    <c:choose>
                                        <c:when test="${invType eq 'Meter Reading'}">
                                            <input type="text" id="txtGST" name="txtGST" data-current="<fmt:formatNumber value="${invoiceHeader.gst}" maxFractionDigits="4" minFractionDigits="4"/>" value="<fmt:formatNumber value="${invoiceHeader.gst}" maxFractionDigits="4" minFractionDigits="4"/>" readonly hidden>
                                        </c:when>
                                        <c:otherwise>
                                            <input type="text" id="txtGST" name="txtGST" data-current="<fmt:formatNumber value="${invoiceHeader.gst}" maxFractionDigits="2" minFractionDigits="2"/>" value="<fmt:formatNumber value="${invoiceHeader.gst}" maxFractionDigits="2" minFractionDigits="2"/>" readonly hidden>
                                        </c:otherwise>
                                    </c:choose>
                                    
                                </c:if>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="4"></td>

                            <td class="mgrTdPadTopBot20 mgrPaddingLeft20" colspan="3" style="font-weight: bold;">
                                Grand Total
                            </td>

                            <td id="grandTotalDisplay" class="mgrTdPadTopBot20 mgrPaddingLeft20" style="font-weight: bold; text-align: right;">
                                <c:choose>
                                    <c:when test="${invType eq 'Meter Reading'}">
                                        <fmt:formatNumber value="${invoiceHeader.grand_total}" type="currency" maxFractionDigits="4" minFractionDigits="4"/>
                                    </c:when>
                                    <c:otherwise>
                                        <fmt:formatNumber value="${invoiceHeader.grand_total}" type="currency" maxFractionDigits="2" minFractionDigits="2"/>
                                    </c:otherwise>
                                </c:choose>
                                
                            </td>

                            <td></td>

                            <td >
                                <input type="hidden" id="txtGrandTotal" name="txtGrandTotal" value="${invoiceHeader.grand_total}" readonly>
                            </td>
                        </tr>

                        <!-- remark section -->
                        <tr>
                            <td colspan="2" class="mgrTdPadTopBot20 mgrPaddingLeft20" style="font-weight: normal; vertical-align: top;">
                                Additional Remark 
                            </td> 

                            <td colspan="6" class="mgrTdPadTopBot20">
                                <input type="text" id="MRStartDate" name="MRStartDate" value="${periodFrom}" hidden>
                                <input type="text" id="MREndDate" name="MREndDate" value="${periodTo}" hidden>
                                <textarea id="txtInvoiceAdditionalRemarks" name="txtInvoiceAdditionalRemarks" class="mgrFormDesign mgrTextAreaOnTable invoiceRdy" maxlength="300">${invoiceHeader.additional_remark}</textarea>
                            </td>

                            <td></td>
                        </tr>
                        <!-- end section -->
                    </tfoot>
                </table>
                <!-- end section -->

                <!-- button container section -->
                <div class="mgrSpace100">
                    <input type="hidden" value="${invoiceHeader.invoice_can_cancel}" id="txt_invoice_can_cancel" readonly>
                    <input type="hidden" value="${invoiceHeader.invoice_can_confirm}" id="txt_invoice_can_confirm" readonly>
                    <input type="hidden" value="${invoiceHeader.generate_pdf}" id="pdf" name="pdf">
                    
                    <input type="button" id="btnPrint" class="btnGreenVersionMGR mgrFloatRight mgrButtonSpacing notPrintPDF" value="Print" style="display: none;">
                    <input type="button" id="btnConfirm" class="btnGreenVersionMGR mgrFloatRight mgrButtonSpacing notPrintPDF invoiceRdy" value="Confirm">
                    <input type="button" id="btnSave" class="btnBrownVersionMGR mgrFloatRight mgrButtonSpacing notPrintPDF invoiceRdy" value="Save">
                    <input type="button" id="btnCancel" class="btnBrownVersionMGR mgrFloatRight mgrButtonSpacing notPrintPDF" value="Cancel">      
                    <input type="button" id="pdfBtn" class="btnGreenVersionMGR mgrFloatRight mgrButtonSpacing notPrintPDF" value="PDF">
                </div>
                <!-- end section -->
            </div>
        </form>
        
    </body>
</html>
