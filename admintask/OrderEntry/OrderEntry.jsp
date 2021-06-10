<%-- 
    Document   : OrderEntry
    Created on : 5 Jul, 2019, 10:43:55 AM
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
        <title>Order Entry</title>
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/OrderEntry.css" type="text/css">
        <script type="text/javascript" src="./include/js/OrderEntry.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="message" value="${param.message}" readonly hidden>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Order Entry"></jsp:param>
        </jsp:include>
        
        <form id="frm" method="POST" action="OrderEntry">
            <!-- supporting value order -->
            <input type="text" id="txtOrderEntryId" name="txtOrderEntryId" value="${orderEntryHeader.id}" readonly hidden>
            <input type="text" id="txtOrderEntryStatus" name="txtOrderEntryStatus" value="${orderEntryHeader.status}" readonly hidden>
            <input type="text" id="txtContractSalesInfoId" value="${orderEntryHeader.contract_sales_information_id}" readonly hidden>
            <input type="text" id="txtServiceCallId" name="txtServiceCallId" class="txtServiceCallId" value="${orderEntryHeader.service_call_id}" readonly hidden>
            <div class="defaultBodyContent">
                <div class="defaultPosition divFormMGR bodyAndFormBorderMGR mgrSpace40">
                    <table class="tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr">
                        <tr>
                            <td class="width20Percentage">
                                Business Entity <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <select id="ddlBusinessEntityId" name="ddlBusinessEntityId" class="ddlBusinessEntityId fromServiceCall">
                                    <option value="0" selected >-- Please Select Entity --</option>
                                    <c:forEach items="${listOfUserLoggedEntities}" var="entity">
                                        <option value="${entity.id}" ${entity.id eq orderEntryHeader.business_entity_id ?  'selected' : ''}>
                                            ${entity.name}
                                        </option>
                                    </c:forEach>
                                </select>
                            </td>  

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage"> 
                                Order No.
                            </td>

                            <td class="width25Percentage">
                                <input type="text" class="mgrFormDesign txtOrderNo inputText" id="txtOrderNo" name="txtOrderNo" value="${orderEntryHeader.order_no}" readonly>
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage">
                                Customer Name <span class="mandatory">*</span>
                                <input type="text" id="txtCustomerId" name="txtCustomerId" value="${orderEntryHeader.customer_id}" readonly hidden>
                            </td>

                            <td class="width25Percentage">
                                <input type="text" class="mgrFormDesign txtCustomerName inputText fromServiceCall" id="txtCustomerName" name="txtCustomerName" value="${orderEntryHeader.customer_name}" maxlength="50">
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                Order Date
                            </td>

                            <td class="width25Percentage">
                                <input type="text" class="mgrFormDesign txtOrderDate inputText" id="txtOrderDate" name="txtOrderDate" value="${orderEntryHeader.order_date}" readonly>
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage">
                                Customer Code <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <input type="text" class="mgrFormDesign txtCustomerCode inputText fromServiceCall" id="txtCustomerCode" name="txtCustomerCode" value="${orderEntryHeader.customer_code}" readonly>
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                Required Date <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <input type="text" class="mgrFormDesign txtRequiredDate inputText" id="txtRequiredDate" name="txtRequiredDate" value="${orderEntryHeader.required_date}" readonly>
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage">
                                Order Type <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <select id="ddlOrderType" name="ddlOrderType" class="ddlOrderType fromServiceCall" onchange="orderTypeOnChange()">
                                    <option value="0" selected disabled>-- Please Select Order Type --</option>
                                    <c:forEach items="${listOfOrderTypeHeaders}" var="orderType">
                                        <option value="${orderType.id}" ${orderEntryHeader.order_type_id eq orderType.id ? 'selected' : ''}>${orderType.name}</option>
                                    </c:forEach>
                                </select>
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                Collection Mode <span class="mandatory serviceCallNotDisp gg">*</span>
                            </td>

                            <td class="width25Percentage">
                              <c:choose>
                                    <c:when test="${orderEntryHeader.service_call_id == null || orderEntryHeader.service_call_id eq '0'}">
                                        <select id="ddlCollectionModeName" name="ddlCollectionModeName" onchange="colModeChange()">
                                        <option value="" selected disabled>-- Please Select Collection Mode --</option>
                                        <c:forEach items="${listOfCollectionModeHeaders}" var="collectionMode">
                                        <option value="${collectionMode.name}" ${collectionMode.name eq orderEntryHeader.collection_mode ? 'selected' : ''}>
                                            ${collectionMode.name}
                                        </option>
                                        </c:forEach>
                                        </select>
                                    </c:when>
                                    <c:otherwise>
                                        <select id="ddlCollectionModeName" name="ddlCollectionModeName" disabled>
                                        <c:forEach items="${listOfCollectionModeHeaders}" var="collectionMode">
                                        <option value="${collectionMode.name}" ${collectionMode.name eq 'Delivery' ? 'selected' : ''}>
                                            ${collectionMode.name}
                                        </option>
                                        </c:forEach>
                                        </select>
                                        
                                    </c:otherwise>
                                </c:choose>
                                <input type="text" class="mgrFormDesign txtCollectionMode inputText" id="txtCollectionMode" name="txtCollectionMode" value="Delivery" maxlength="50" hidden>
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage">
                                Reference No. <span class="mandatory" id="clientRFMandatory">*</span>
                            </td>

                            <td id="parentServiceCallLink">                          
                                <input type="text" id="txtContractType" name="txtContractType" class="txtContractType serviceCallNotDisp" value="0" readonly hidden>
                                <select id="ddlReferenceNo" onchange="setCustomerSalesInformationDetailId()" name="ddlReferenceNo" class="ddlReferenceNo fromServiceCall serviceCallNotDisp">
                                    <option value="0" selected disabled>-- Please Select Client Reference No --</option>
                                </select>
                                <input type="text" class="mgrFormDesign inputText fromServiceCall serviceCallNotDisp" id="txtReferenceNo" name="txtReferenceNo" value="${orderEntryHeader.client_reference_no}">
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                Delivery Period <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <select id="ddlDeliveryPeriod" name="ddlDeliveryPeriod" class="ddlDeliveryPeriod">
                                    <option value="0" selected disabled>-- Please Select Delivery Period --</option>
                                    <c:forEach items="${listOfDeliveryPeriodHeaders}" var="deliveryPeriod">
                                        <option value="${deliveryPeriod.id}" ${orderEntryHeader.delivery_period_id eq deliveryPeriod.id ? 'selected' : ''}>${deliveryPeriod.name}</option>
                                    </c:forEach>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage">
                                Payment Mode <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <select id="ddlPaymentMode" name="ddlPaymentMode" class="ddlPaymentMode">
                                    <option value="0" selected disabled>-- Please Select Payment Mode --</option>
                                    <c:forEach items="${listOfPaymentTermHeaders}" var="paymentTerm">
                                        <option value="${paymentTerm.id}" ${orderEntryHeader.payment_terms_id eq paymentTerm.id ? 'selected' : ''}>${paymentTerm.name}</option>
                                    </c:forEach>
                                </select>
                                <input type="text" id="txtPaymentModeId" name="txtPaymentModeId" value="${orderEntryHeader.payment_terms_id}" readonly hidden>
                                <input type="text" id="txtPaymentModeName" name="txtPaymentModeName" value="${orderEntryHeader.payment_terms_name}" class="mgrFormDesign fromServiceCall" readonly hidden>
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                Driver / Technician <span class="mandatory" id="driverMandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <select id="ddlDriver" name="ddlDriver" class="ddlDriver">
                                    <option value="0" selected disabled>-- Please Select Driver/Technician --</option>
                                    <c:forEach items="${listOfDriverOrTechnicianHeaders}" var="driverTech">
                                        <option value="${driverTech.id}" ${orderEntryHeader.driver_or_technician_id eq driverTech.id ? 'selected' : ''}>${driverTech.driver_or_technician_name}</option>
                                    </c:forEach>
                                </select>
                                <input type="text" name="driverAdmin" id="driverAdmin" class="mgrFormDesign" value="${driverAdmin}"readonly hidden>
                                <input type="text" name="driverAdminId" id="driverAdminId" class="mgrFormDesign" value="${driverAdminId}" hidden>
                            </td>
                        </tr>
                    </table>  
                </div>

                <table class="defaultPosition mgrBorderRadius tblWdth100 contractDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0">
                    <thead class="mgrDataTableThead">
                         <tr>
                            <th colspan="2" class="mgrTdPadTopBot20 mgrPaddingLeft20">
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
                                <input type="text" class="mgrFormDesign txtAttentionTo fromServiceCall" id="txtAttentionTo" name="txtAttentionTo" value="${orderEntryHeader.bill_attention_to}" readonly>
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage mgrTdPaddingTopTable">
                                Ship To <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage mgrPaddingRight30 mgrTdPaddingTopTable">
                                <input type="text" class="mgrFormDesign txtShipTo fromServiceCall" id="txtShipTo" name="txtShipTo" value="${orderEntryHeader.ship_attention_to}" readonly>
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage textAreaTop mgrTdPaddingTopTable mgrPaddingLeft30">
                                Address <span class="mandatory">*</span>
                            </td>

                            <td rowspan="2" class="width25Percentage mgrTdPaddingTopTable">
                                <textarea class="mgrFormDesign mgrTextAreaOnTable txtAddress fromServiceCall" id="txtAddressAttentionTo" name="txtAddressAttentionTo" readonly>${orderEntryHeader.bill_address_to}</textarea>
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage textAreaTop mgrTdPaddingTopTable">
                                Address <span class="mandatory">*</span>
                            </td>

                            <td rowspan="2" class="width25Percentage mgrPaddingRight30 mgrTdPaddingTopTable">
                                <textarea class="mgrFormDesign mgrTextAreaOnTable fromServiceCall" id="txtAddressShipTo" name="txtAddressShipTo" readonly>${orderEntryHeader.ship_address_to}</textarea>
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
                                <input type="text" class="mgrFormDesign txtPostalCodeAttentionTo fromServiceCall" id="txtPostalCodeAttentionTo" name="txtPostalCodeAttentionTo" value="${orderEntryHeader.bill_postal_code}" readonly>
                            </td>

                            <td class="mgrFormBorderSpacing mgrTdPaddingBotTable"></td>

                            <td class="width25Percentage mgrTdPaddingTopTable mgrTdPaddingBotTable">
                                Postal Code <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage mgrPaddingRight30 mgrTdPaddingTopTable mgrTdPaddingBotTable">
                                <input type="text" class="mgrFormDesign txtPostalCodeShipTo fromServiceCall" id="txtPostalCodeShipTo" name="txtPostalCodeShipTo" value="${orderEntryHeader.ship_postal_code}" readonly>
                            </td>
                        </tr>
                    </tbody>                    
                </table>
                
                <!-- item details section -->
                <table id="tblOrderItemDetail" class="defaultPosition mgrBorderRadius tblWdth100 contractDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0">
                    <thead class="mgrDataTableThead">
                        <tr>
                            <th id="itemDetail" colspan="8" class="mgrPaddingLeft20 mgrTdPadTopBot20 bdrBtmWhiteMgr" style="width: 95%;">Item Details</th>
                            
                            <th class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20 bdrBtmWhiteMgr">
                                <input type="hidden" id="txtTotalItemDetail" name="txtTotalItemDetail" readonly>
                                <img src="../../include/mgr/include/images/MGR-LOGO/Edit.png" id="btnEditItemDetails" class="logoTheadTableMgr bye MGRIconButton" alt="logo Add Item">
                            </th>
                        </tr>               

                        <tr class="mgrDataTableThead">
                            <th class="mgrPaddingLeft20 mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize no" style="width: 5%;">
                                No.
                            </th>

                            <th  class="mgrTdPadTopBot20 mgrThead2FontSize itemSku mgrPaddingLeft20" style="width: 10%;">
                                Item SKU
                            </th>

                            <th  class="mgrTdPadTopBot20 mgrThead2FontSize partNo mgrPaddingLeft20" style="width: 10%;">
                                Part No.
                            </th>

                            <th class="mgrTdPadTopBot20 mgrThead2FontSize itemName mgrPaddingLeft20" style="width: 45%;">
                                Description
                            </th>

                            <th class="mgrTdPadTopBot20 mgrThead2FontSize uom mgrPaddingLeft20" style="width: 8%;">
                                UOM
                            </th>

                            <th class="mgrTdPadTopBot20 mgrThead2FontSize quantity mgrPaddingLeft20 mgrTxtAlignLeft" style="width: 8%;">
                                Quantity
                            </th>

                            <th class="mgrTdPadTopBot20 mgrThead2FontSize unitPrice mgrPaddingLeft20 mgrTxtAlignLeft" style="width: 8%;">
                                Unit Price
                            </th>

                            <th class="mgrTdPadTopBot20 mgrThead2FontSize total mgrPaddingLeft20 mgrTxtAlignLeft" style="width: 8%;">
                                Total
                            </th>
                            
                            <th class="mgrTdPadTopBot20 mgrPaddingRight20 mgrPaddingLeft20">
                                <img src="../../include/mgr/include/images/MGR-LOGO/Remove White.png" id="btnDeleteAllItem" class="logoTbodyTableMgr bye" style="cursor: pointer !important;" alt="logo Delete All Item">
                            </th>
                        </tr>
                    </thead>

                            <tbody class="bgWhite"> 
                        <c:forEach items="${orderEntryHeader.listOfOrderItemDetails}" var="order_item" varStatus="loop">
                            <c:choose>
                                <c:when test="${order_item.uom eq 'ie'}">
                                    <tr id="contract">
                                </c:when>
                                <c:otherwise>
                                     <tr id="noContract">
                                </c:otherwise>
                            </c:choose>
                           
                                <td style="width:10px;" class="mgrPaddingLeft20 mgrTdPadTopBot20 borderBottom no">
                                    ${loop.count}.
                                </td>
                                
                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20 borderBottom itemSku">
                                    ${order_item.item_sku}
                                </td>

                                <td class="mgrTdPadTopBot20 borderBottom mgrPaddingLeft20 partNo">
                                    ${order_item.part_no}
                                </td>
                                
                                <td class="mgrTdPadTopBot20 borderBottom mgrPaddingLeft20 itemName">
                                    ${order_item.item_name}
                                    <br>
                                    <small><i>${order_item.item_remark}</i></small>
                                </td>
                                
                                <td class="mgrTdPadTopBot20 borderBottom mgrPaddingLeft20 uom">
                                    ${order_item.uom}
                                </td>
                                
                                <td class="mgrTdPadTopBot20 borderBottom mgrPaddingLeft20 quantity" style="text-align: right;">
                                    <fmt:formatNumber value="${order_item.quantity}" maxFractionDigits="1"/>
                                </td>
                                
                                <td class="mgrTdPadTopBot20 borderBottom mgrPaddingLeft20 unitPrice" style="text-align: right;">
                                    <fmt:formatNumber type="currency" maxFractionDigits="2" minFractionDigits="2" value="${order_item.unit_price}"/>
                                </td>
                                
                                <td class="borderBottom mgrPaddingLeft20 total" style="text-align: right;">
                                    <fmt:formatNumber type="currency" maxFractionDigits="2" minFractionDigits="2" value="${order_item.total_price}"/>
                                </td>
                                
                                <td hidden>
                                   <!-- for input type hidden posting --> 
                                   <input type="hidden" id="txtItemSKU_${loop.count}" name="txtItemSKU_${loop.count}" class="txtItemSKU" value="${order_item.item_sku}" readonly>
                                   <input type="hidden" id="txtPartNo_${loop.count}" class="txtPartNo" name="txtPartNo_${loop.count}" value="${order_item.part_no}" readonly>
                                   <input type="hidden" id="txtItemName_${loop.count}" class="txtItemName" name="txtItemName_${loop.count}" value="${order_item.item_name}" readonly>
                                   <input type="hidden" id="txtItemRemark_${loop.count}" class="txtItemRemark" name="txtItemRemark_${loop.count}" value="${order_item.item_remark}" readonly>
                                   <input type="hidden" id="txtUomName_${loop.count}" class="txtUomName" name="txtUomName_${loop.count}" value="${order_item.uom}" readonly>
                                   <input type="hidden" id="txtQuantity_${loop.count}" class="txtQuantity" name="txtQuantity_${loop.count}" value="${order_item.quantity}" readonly>
                                   <input type="hidden" id="txtUnitPrice_${loop.count}" class="txtUnitPrice" name="txtUnitPrice_${loop.count}" value="${order_item.unit_price}" readonly>
                                   <input type="hidden" id="txtTotalPrice_${loop.count}" class="txtTotalPrice" name="txtTotalPrice_${loop.count}" value="${order_item.total_price}" readonly>
                                   <input type="hidden" id="txtUomId_${loop.count}" class="txtUomId" name="txtUomId_${loop.count}" value="${order_item.item_uom_id}" readonly>
                                </td>
                                
                                <td class="mgrPaddingLeft20 mgrPaddingRight20 mgrTdPadTopBot20 borderBottom" style="text-align: center;">
                                    <img src="../../include/mgr/include/images/MGR-LOGO/Trash.png" class="logoTbodyTableMgr bye" onclick="deleteSelectedItem($(this));" style="cursor: pointer !important;" alt="logo Delete Item">
                                </td>
                            </tr>
                        </c:forEach>
                    </tbody>
                    
                    <tfoot class="bgWhite">
                        <tr>
                            <td class="mgrPaddingLeft20" colspan="2" style="padding-top: 20px;">
                                <label class="checkBoxMgrContainer" style="font-weight: bold;">                                    
                                    <input type="checkbox" id="chkInclusiveGST" class="chkInclusiveGST" name="chkInclusiveGST" ${orderEntryHeader.total > orderEntryHeader.sub_total ? 'checked' : ''}>
                                    <span class="checkmarkMgr"></span>
                                    Inclusive GST
                                </label>
                            </td> 
                            
                            <td colspan="2"></td>
                            
                            <td colspan="3" class="mgrPaddingLeft20" style="padding-top: 20px; font-weight: bold;">
                                Sub Total
                            </td>
                            
                            <td id="subTotal" class="mgrPaddingLeft20" style="padding-top: 20px; font-weight: bold; text-align: right;">
                                <fmt:formatNumber type="currency" maxFractionDigits="2" minFractionDigits="2" value="${orderEntryHeader.sub_total}"/>
                            </td>
                            
                            <td>
                                <input type="hidden" id="txtOrderSubTotal" name="txtOrderSubTotal" value="${orderEntryHeader.sub_total}" readonly>
                                <input type="hidden" id="total" name="total" value="${orderEntryHeader.total}" readonly>
                            </td>
                        </tr>
                        
                        <tr>
                            <td colspan="4"></td>
                            
                            <td colspan="3" class="mgrPaddingLeft20" style="padding-top: 20px; font-weight: bold;">
                                GST
                            </td>
                            
                            <td id="gstTd" class="mgrPaddingLeft20" style="padding-top: 20px; font-weight: bold; text-align: right;">
                                <c:choose>
                                    <c:when test="${orderEntryHeader.gst eq null}">
                                        <fmt:formatNumber value="0" maxFractionDigits="2" minFractionDigits="2" type="currency" /> 
                                    </c:when>
                                    
                                    <c:otherwise>
                                        <fmt:formatNumber value="${orderEntryHeader.gst}" maxFractionDigits="2" minFractionDigits="2" type="currency"/>
                                    </c:otherwise>
                                </c:choose>                                
                            </td>
                                
                            <td>
                                <input type="text" id="txtOrderGST" class="gst" name="txtOrderGST" value="${orderEntryHeader.gst}" hidden readonly>
                            </td>
                        </tr>
                        
                        <tr>
                            <td colspan="4"></td>
                            
                            <td colspan="3" class="mgrPaddingLeft20" style="padding-top: 20px; font-weight: bold;">
                                Grand Total
                            </td>
                            
                            <td class="mgrPaddingLeft20" id="grandTotal" style="padding-top: 20px; font-weight: bold; text-align: right;">
                                <fmt:formatNumber type="currency" maxFractionDigits="2" minFractionDigits="2" value="${orderEntryHeader.grand_total}" />
                            </td>
                            
                            <td>
                                <input type="text" id="txtOrderGrandTotal" name="txtOrderGrandTotal" value="${orderEntryHeader.grand_total}" hidden readonly>
                            </td>
                        </tr>
                        
                        <tr>
                            <td colspan="2" class="mgrTdPadTopBot20 mgrPaddingLeft20" style="vertical-align: top;">
                                Additional Remark
                            </td> 
                        
                            <td colspan="6" class="mgrTdPadTopBot20">
                                <textarea id="txtOrderEntryAdditionalRemarks" name="txtOrderEntryAdditionalRemarks" class="mgrFormDesign mgrTextAreaOnTable" maxlength="300">${orderEntryHeader.additional_remark}</textarea>
                            </td>
                        
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                <!-- end section -->

                <div class="mgrSpace100 formBtnMgr">
                    <input type="button" id="btnSubmit" class="btnSubmit mgrFloatRight mgrButtonSpacing" value="Submit">
                    <input type="button" id="btnSave" class="btnSave mgrFloatRight mgrButtonSpacing" value="Save">
                    <input type="button" id="btnCancel" class="btnCancel mgrFloatRight" value="Cancel">                
                </div>  
            </div>    
        </form>                            
    </body>
</html>
