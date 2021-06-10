<%-- 
    Document   : DeliveryOrder
    Created on : 8 Jul, 2019, 5:07:07 PM
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
        <title>Delivery Order</title>
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/DeliveryOrder.css" type="text/css">
        <script type="text/javascript" src="./include/js/DeliveryOrder.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="message" value="${param.message}" readonly hidden>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Delivery Order"></jsp:param>
        </jsp:include>
        
        <form id="frm" method="POST" action="DeliveryOrder">
            <div class="defaultBodyContent">
                <!-- supporting value do -->
                <input type="hidden" id="txtURLDO" value="${urlDO}" readonly>
                <input type="hidden" id="txtOrderEntryId" name="txtOrderEntryId" value="${deliveryOrderHeader.order_entry_id}" readonly>
                <input type="hidden" id="txtDeliveryOrderId" name="txtDeliveryOrderId" value="${deliveryOrderHeader.id}" readonly>
                <input type="hidden" id="txtDeliveryOrderStatus" name="txtDeliveryOrderStatus" value="${deliveryOrderHeader.status}" readonly>
                <input type="hidden" id="txtContractSalesInfoId" name="txtContractSalesInfoId" value="${deliveryOrderHeader.contract_sales_information_id}" readonly>
                <input type="hidden" id="txtServiceCallId" name="txtServiceCallId" value="${deliveryOrderHeader.service_call_id}" readonly>
                <input type="hidden" id="ordrtype" name="orderType" value="${orderType}">
                <div class="defaultPosition divFormMGR bodyAndFormBorderMGR mgrSpace40">
                    <table class="tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr">
                        <tr>
                            <td class="width20Percentage">
                                Business Entity <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <select id="ddlBusinessEntityId" name="ddlBusinessEntityId" class="fromOrder completedDO fromServiceCall">
                                    <option value="0" selected disabled>-- Please Select Entity --</option>
                                    <c:forEach items="${listOfUserLoggedEntities}" var="entity">
                                        <option value="${entity.id}" ${entity.id eq deliveryOrderHeader.business_entity_id ?  'selected' : ''}>
                                            ${entity.name}
                                        </option>
                                    </c:forEach>
                                </select>
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                DO Date
                            </td>

                            <td class="width25Percentage">
                                <input type="text" id="txtDODate" name="txtDODate" value="${deliveryOrderHeader.do_date}" class="mgrFormDesign completedDO" readonly>
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage">
                                <input type="hidden" id="txtCustomerId" name="txtCustomerId" value="${deliveryOrderHeader.customer_id}">
                                Customer Name <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <input type="text" id="txtCustomerName" name="txtCustomerName" value="${deliveryOrderHeader.customer_name}" class="mgrFormDesign fromOrder completedDO fromServiceCall">
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                DO No.
                            </td>

                            <td class="width25Percentage">
                                <input type="text" id="txtDONumber" name="txtDONumber" value="${deliveryOrderHeader.do_number}" class="mgrFormDesign completedDO" readonly>
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage">
                                Customer Code <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <input type="text" id="txtCustomerCode" name="txtCustomerCode" value="${deliveryOrderHeader.customer_code}" class="mgrFormDesign fromOrder completedDO fromServiceCall" readonly>
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                Delivery Date <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <input type="text" id="txtDODeliveryDate" name="txtDODeliveryDate" value="${deliveryOrderHeader.delivery_date}" class="mgrFormDesign completedDO" readonly>
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage">
                                Order Type <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <select id="ddlOrderType" name="ddlOrderType" class="ddlOrderType fromOrder completedDO fromServiceCall" onchange="orderTypeOnChange()">
                                    <option value="0" selected disabled>-- Please Select Order Type --</option>
                                    <c:forEach items="${listOfOrderTypeHeaders}" var="orderType">
                                        <option value="${orderType.id}" ${deliveryOrderHeader.order_type_id eq orderType.id ? 'selected' : ''}>${orderType.name}</option>
                                    </c:forEach>
                                </select>
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                Order No.
                            </td>

                            <td class="width25Percentage">
                                <input type="text" id="txtOrderNo" name="txtOrderNo" value="${deliveryOrderHeader.order_no}" class="mgrFormDesign fromOrder completedDO" readonly>
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage">
                                Client Reference No. <span class="mandatory" id="clientRFMandatory">*</span>
                            </td>

                            <td id="parentServiceCallLink" class="width25Percentage">
                                <input type="text" id="txtContractType" name="txtContractType" class="txtContractType serviceCallNotDisp" value="0" readonly hidden>
                                <select id="ddlReferenceNo" name="ddlReferenceNo" onchange="setCustomerSalesInformationDetailId()" class="ddlReferenceNo serviceCallNotDisp fromServiceCall">
                                    <option value="0" selected disabled>-- Please Select Client Reference No --</option>
                                </select>
                                <input type="text" id="txtClientReferenceNo" name="txtClientReferenceNo" value="${deliveryOrderHeader.client_reference_no}" class="mgrFormDesign fromOrder completedDO serviceCallNotDisp fromServiceCall">
                            </td>                            

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                Delivery Period <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <select id="ddlDeliveryPeriod" name="ddlDeliveryPeriod" class="ddlDeliveryPeriod completedDO">
                                    <option value="0" selected disabled>-- Please Select Delivery Period --</option>
                                    <c:forEach items="${listOfDeliveryPeriodHeaders}" var="deliveryPeriod">
                                        <option value="${deliveryPeriod.id}" ${deliveryOrderHeader.delivery_period_id eq deliveryPeriod.id ? 'selected' : ''}>${deliveryPeriod.name}</option>
                                    </c:forEach>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage">
                                Payment Mode <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <select id="ddlPaymentMode" name="ddlPaymentMode" class="ddlPaymentMode completedDO">
                                    <option value="0" selected disabled>-- Please Select Payment Mode --</option>
                                    <c:forEach items="${listOfPaymentTermHeaders}" var="paymentTerm">
                                        <option value="${paymentTerm.id}" ${deliveryOrderHeader.payment_terms_id eq paymentTerm.id ? 'selected' : ''}>${paymentTerm.name}</option>
                                    </c:forEach>
                                </select>
                                <input type="text" id="txtPaymentModeId" name="txtPaymentModeId" value="${deliveryOrderHeader.payment_terms_id}" readonly hidden>
                                <input type="text" id="txtPaymentModeName" name="txtPaymentModeName" value="${deliveryOrderHeader.payment_terms_name}" class="mgrFormDesign fromOrder completedDO fromServiceCall" readonly hidden>
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                Driver / Technician <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <input type="text" name="colMode" value="${deliveryOrderHeader.collection_mode}" hidden>
                                <c:choose>
                                    <c:when test="${deliveryOrderHeader.collection_mode eq 'Self Collect'}">
                                        <input type="text" name="driverAdmin" id="driverAdmin" class="mgrFormDesign" value="${driverAdmin}"readonly>
                                        <input type="text" name="driverAdminId" id="driverAdminId" class="mgrFormDesign" value="${driverAdminId}" hidden>
                                    </c:when>
                                    <c:otherwise>
                                        <select id="ddlDriver" name="ddlDriver" class="ddlDriver completedDO">
                                        <option value="0" selected disabled>-- Please Select Driver/Technician --</option>
                                        <c:forEach items="${listOfDriverOrTechnicianHeaders}" var="driverTech">
                                        <option value="${driverTech.id}" ${deliveryOrderHeader.driver_or_technician_id eq driverTech.id ? 'selected' : ''}>${driverTech.driver_or_technician_name}</option>
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
                                <input type="checkbox" class="chkCategory" id="chkShipTo" name="chkShipTo" value="0">
                                <sub><i>Select if same as billing address</i></sub>
                            </td>
                        </tr>
                        <tr>
                            <td class="width20Percentage mgrPaddingLeft30 mgrTdPaddingTopTable">
                                Attention To <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage mgrTdPaddingTopTable">
                                <input type="text" class="mgrFormDesign txtAttentionTo fromOrder completedDO fromServiceCall" id="txtAttentionTo" name="txtAttentionTo" value="${deliveryOrderHeader.bill_attention_to}" readonly>
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage mgrTdPaddingTopTable">
                                Ship To <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage mgrPaddingRight30 mgrTdPaddingTopTable">
                                <input type="text" class="mgrFormDesign txtShipTo fromOrder completedDO fromServiceCall" id="txtShipTo" name="txtShipTo" value="${deliveryOrderHeader.ship_attention_to}" readonly>
                            </td>
                        </tr>

                        <tr>
                            <td class="width20Percentage mgrTdPaddingTopTable mgrPaddingLeft30" style="vertical-align: top;">
                                Address <span class="mandatory">*</span>
                            </td>

                            <td rowspan="2" class="width25Percentage mgrTdPaddingTopTable">
                                <textarea class="mgrFormDesign mgrTextAreaOnTable txtAddress fromOrder completedDO fromServiceCall" id="txtAddressAttentionTo" name="txtAddressAttentionTo" readonly>${deliveryOrderHeader.bill_address_to}</textarea>
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage mgrTdPaddingTopTable" style="vertical-align: top;">
                                Address <span class="mandatory">*</span>
                            </td>

                            <td rowspan="2" class="width25Percentage mgrPaddingRight30 mgrTdPaddingTopTable">
                                <textarea class="mgrFormDesign mgrTextAreaOnTable fromOrder completedDO fromServiceCall" id="txtAddressShipTo" name="txtAddressShipTo" readonly>${deliveryOrderHeader.ship_address_to}</textarea>
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
                                <input type="text" class="mgrFormDesign txtPostalCodeAttentionTo fromOrder completedDO fromServiceCall" id="txtPostalCodeAttentionTo" name="txtPostalCodeAttentionTo" value="${deliveryOrderHeader.bill_postal_code}" readonly>
                            </td>

                            <td class="mgrFormBorderSpacing mgrTdPaddingBotTable"></td>

                            <td class="width25Percentage mgrTdPaddingTopTable mgrTdPaddingBotTable">
                                Postal Code <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage mgrPaddingRight30 mgrTdPaddingTopTable mgrTdPaddingBotTable">
                                <input type="text" class="mgrFormDesign txtPostalCodeShipTo fromOrder completedDO fromServiceCall" id="txtPostalCodeShipTo" name="txtPostalCodeShipTo" value="${deliveryOrderHeader.ship_postal_code}" readonly>
                            </td>
                        </tr>
                    </tbody>              
                </table>
                <!-- end section -->

                <!-- item details section -->
                <table id="tblDeliverOrderItemDetail" class="defaultPosition mgrBorderRadius tblWdth100 contractDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0">
                    <thead class="mgrDataTableThead">
                        <tr>
                            <th class="mgrTdPadTopBot20 mgrPaddingLeft20" colspan="8" style="border-bottom: 1px solid #ffffff; width: 95%;">
                                Item Details
                            </th>

                            <th class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20" style="border-bottom: 1px solid #ffffff;">
                                <input type="hidden" id="txtTotalItemDetail" name="txtTotalItemDetail" readonly>
                                <img src="../../include/mgr/include/images/MGR-LOGO/Edit.png" id="btnEditItemDetails" class="logoTheadTableMgr bye fromOrder MGRIconButton" alt="logo Add Item">
                            </th>
                        </tr>

                        <tr>
                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff;">
                                No.
                            </th>

                            <th id="itemSKU" class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff;">
                                Item SKU
                            </th>

                            <th id="partNo" class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff;">
                                Part No.
                            </th>

                            <th id="desc" class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff;">
                                Description
                            </th>

                            <th id="order" colspan="2" class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff;">
                                Order
                            </th>

                            <th id="delivery" colspan="2" class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff;">
                                Delivery
                            </th>   

                            <th class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20" style="border-bottom: 1px solid #ffffff;">
                                <img src="../../include/mgr/include/images/MGR-LOGO/Remove White.png" id="btnDeleteAllItem" class="logoTheadTableMgr bye fromOrder" alt="logo Delete All Item">
                            </th>
                        </tr>

                        <tr>
                            <th id="thDetail"colspan="4"></th>

                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="width: 5%;">
                                UOM
                            </th>

                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="width: 5%;">
                                Quantity
                            </th>

                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="width: 5%;">
                                UOM
                            </th>

                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="width: 5%;">
                                Quantity
                            </th>

                            <th id="empty"></th>
                        </tr>
                    </thead>

                    <tbody class="bgWhite">
                        <c:forEach items="${deliveryOrderHeader.listOfDeliveryOrderItemDetails}" var="do_item" varStatus="loop">
                            <c:choose>
                                <c:when test="${order_item.uom eq 'ie'}">
                                    <tr id="contract">
                                </c:when>
                                <c:otherwise>
                                     <tr id="noContract">
                                </c:otherwise>
                            </c:choose>
                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20">
                                    ${loop.count}.
                                </td>

                                <td id="sku_${loop.count}" class="mgrTdPadTopBot20 mgrPaddingLeft20">
                                    ${do_item.item_sku}
                                </td>

                                <td id="part_${loop.count}" class="mgrTdPadTopBot20 mgrPaddingLeft20">
                                    ${do_item.part_no}
                                </td>

                                <td id="itmName_${loop.count}" class="mgrTdPadTopBot20 mgrPaddingLeft20">
                                    ${do_item.item_name}
                                    <br>
                                    <small><i>${do_item.item_remark}</i></small>
                                </td>

                                <c:choose>
                                    <c:when test="${deliveryOrderHeader.order_entry_id eq 0}">
                                        <td class="mgrTdPadTopBot20 mgrPaddingLeft20"></td>
                                        
                                        <td class="mgrTdPadTopBot20 mgrPaddingLeft20" style="text-align: right;"></td>
                                    </c:when>
                                    
                                    <c:otherwise>
                                        <td class="mgrTdPadTopBot20 mgrPaddingLeft20">           
                                            ${do_item.uom}
                                        </td>

                                        <td class="mgrTdPadTopBot20 mgrPaddingLeft20" style="text-align: right;">
                                            <fmt:formatNumber value="${do_item.order_quantity}" maxFractionDigits="1" groupingUsed="false"/>
                                        </td>
                                    </c:otherwise>
                                </c:choose>                                

                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20">
                                    ${do_item.uom}
                                </td>
                                
                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20 checkStock_${loop.count}" style="text-align: right;">
                                    <c:choose>
                                        <c:when test="${deliveryOrderHeader.order_entry_id eq 0}">
                                            <fmt:formatNumber value="${do_item.delivery_quantity}" maxFractionDigits="1" groupingUsed="false"/>
                                        </c:when>
                                        
                                        <c:otherwise>
                                            <input type="text" id="txtDeliveryQuantityByOrder_${loop.count}" name="txtDeliveryQuantityByOrder_${loop.count}" class="doByOrderDisplay mgrFormDesign completedDO" onchange="calculateNewTotalAmountForDelivery($(this));" onkeypress="return deliveryQuantityKeyPress(event);" value="<fmt:formatNumber value="${do_item.delivery_quantity}" maxFractionDigits="1" groupingUsed="false"/>" class="mgrFormDesign" placeholder="0" style="text-align: right;">
                                        </c:otherwise>
                                    </c:choose>                                    
                                </td>

                                <td hidden>
                                    <!-- for input type hidden posting -->
                                    <input type="hidden" id="txtItemSKU_${loop.count}" name="txtItemSKU_${loop.count}" class="txtItemSKU" value="${do_item.item_sku}">
                                    <input type="hidden" id="txtPartNo_${loop.count}" name="txtPartNo_${loop.count}" class="txtPartNo" value="${do_item.part_no}">
                                    <input type="hidden" id="txtItemName_${loop.count}" name="txtItemName_${loop.count}" class="txtItemName" value="${do_item.item_name}">
                                    <input type="hidden" id="txtItemRemark_${loop.count}" name="txtItemRemark_${loop.count}" class="txtItemRemark" value="${do_item.item_remark}">
                                    <input type="hidden" id="txtUomName_${loop.count}" name="txtUomName_${loop.count}" class="txtUomName" value="${do_item.uom}">
                                    <input type="hidden" id="txtOrderQuantity_${loop.count}" name="txtOrderQuantity_${loop.count}" class="txtOrderQuantity" value="${do_item.order_quantity}">
                                    <input type="hidden" id="txtDeliveryQuantity_${loop.count}" name="txtDeliveryQuantity_${loop.count}" class="txtDeliveryQuantity" value="${do_item.delivery_quantity}">
                                    <input type="hidden" id="txtUnitPrice_${loop.count}" class="txtUnitPrice" name="txtUnitPrice_${loop.count}" value="${do_item.unit_price}" readonly>
                                    <input type="hidden" id="txtTotalPrice_${loop.count}" class="txtTotalPrice" name="txtTotalPrice_${loop.count}" value="${do_item.total_price}" readonly>
                                    <input type="hidden" id="txtUomId_${loop.count}" name="txtUomId_${loop.count}" class="txtUomId" value="${do_item.item_uom_id}">
                                </td>

                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20" style="text-align: center;">
                                    <img src="../../include/mgr/include/images/MGR-LOGO/Trash.png" class="logoTheadTableMgr bye fromOrder completedDO" onclick="deleteSelectedItem($(this));" alt="logo Delete Item">
                                </td>
                            </tr>
                        </c:forEach>                
                    </tbody>

                    <tfoot class="bgWhite">
                        <tr>
                            <td class="mgrTdPadTopBot20 mgrPaddingLeft20" colspan="2" style="vertical-align: top;">
                                Additional Remark
                            </td>

                            <td colspan="6" class="mgrTdPadTopBot20 mgrPaddingLeft20">
                                <textarea id="txtDOAdditionalRemarks" name="txtDOAdditionalRemarks" class="mgrFormDesign mgrTextAreaOnTable completedDO" maxlength="300">${deliveryOrderHeader.additional_remark}</textarea>
                            </td>

                            <td>
                                <input type="hidden" id="total" name="total" value="${deliveryOrderHeader.total}">
                                <input type="hidden" id="txtSubTotal" name="txtSubTotal" value="${deliveryOrderHeader.sub_total}" readonly>
                                <input type="hidden" id="txtGst" name="txtGst" value="${deliveryOrderHeader.gst}" readonly>
                                <input type="hidden" id="txtGrandTotal" name="txtGrandTotal" value="${deliveryOrderHeader.grand_total}" readonly>
                            </td>
                        </tr>
                    </tfoot>
                </table>
                <!-- end section -->

                <!-- button container section -->
                <div class="mgrSpace100 completedDO">
                    <input type="button" id="btnPrint" class="btnGreenVersionMGR mgrFloatRight notPrintPDF" value="Print" style="display: none;">
                    <input type="button" id="btnConfirm" class="btnGreenVersionMGR mgrFloatRight mgrButtonSpacing notPrintPDF" value="Confirm">
                    <input type="button" id="btnSave" class="btnBrownVersionMGR mgrFloatRight mgrButtonSpacing notPrintPDF" value="Save">
                    <input type="button" id="btnCancel" class="btnBrownVersionMGR mgrFloatRight mgrButtonSpacing notPrintPDF" value="Cancel">  
                </div>
                <!-- end section -->
            </div>
        </form>
    </body>
</html>
