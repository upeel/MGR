<%-- 
    Document   : InventoryDetails
    Created on : 5 Jul, 2019, 10:33:42 AM
    Author     : Wildan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://sargue.net/jsptags/time" prefix="javatime" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
    <head>
        <!-- item inventory css and js -->
        <link rel="stylesheet" type="text/css" href="./include/css/InventoryDetails.css">
        <script type="text/javascript" src="./include/js/InventoryDetails.js"></script>
        <script type="text/javascript">
            var listOfInventoryLocationJson = ${listOfInventoryLocationJson};
            var minStockLevel = ${itemInventoryHeader.minStockLevel};
        </script>
    </head>
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <!-- item inventory form section -->
        <form method="POST" id="frm" action="ItemMasterDetail">
        <div class="defaultPosition divFormMGR itemDetailSectionDiv bodyAndFormBorderMGR mgrSpace40">
            <!--used data--> 
            <input type="text" id="txtItemId" name="txtItemId" value="${itemId}" class="mgrFormDesign" hidden>
            <input type="text" id="txtItemName" name="txtItemName" class="mgrFormDesign" value="${itemName}" hidden>
            <input type="text" id="txtInventoryDetailsCount" name="txtInventoryDetailsCount" class="mgrFormDesign" hidden>
            <table class="tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr">        
                <tr>
                    <td class="width20Percentage">
                        Inventory Stock Code
                    </td>

                    <td class="width25Percentage">
                        <input type="text" id="txtInventoryStockCode" name="txtInventoryStockCode" value="${itemCode}" class="mgrFormDesign">
                    </td>

                    <td class="width5Percentage"></td>

                    <td class="width25Percentage">
                        Min Stock Level
                    </td>

                    <td class="width25Percentage">
                        <input type="text" id="txtInventoryMinStockLevel" name="txtInventoryMinStockLevel" value="${itemInventoryHeader.minStockLevel}" class="mgrFormDesign">
                    </td>
                </tr>

                <tr>
                    <td class="width20Percentage">
                        Item Type
                    </td>

                    <td class="width25Percentage">
                        <select id="ddlInventoryItemTypeId" name="ddlInventoryItemTypeId">
                            <option value="0">-- Please Select Item Type --</option>
                            <c:forEach items="${listOfItemInventoryType}" var="itemType">
                                <option value="${itemType.id}" ${itemInventoryHeader.itemTypeID eq itemType.id ? 'selected' : ''}>
                                ${itemType.name}</option>
                            </c:forEach>
                        </select>
                    </td>

                    <td class="width5Percentage"></td>

                    <td class="width25Percentage">
                        Min Order Qty
                    </td>

                    <td class="width25Percentage">
                        <input type="text" id="txtInventoryMinOrderQty" name="txtInventoryOrderQty" value="${itemInventoryHeader.minOrderQTY}" class="mgrFormDesign">
                    </td>
                </tr>
                <tr>

                </tr>
                <tr>
                    <td class="width20Percentage">
                        Year
                    </td>

                    <td class="width25Percentage">
                        <select id="ddlYear" name="ddlYear">
                            <c:forEach items="${listOfYears}" var="year">
                                <c:choose>
                                    <c:when test="${itemInventoryHeader.id != null}">
                                        <option value="${year}" ${itemInventoryHeader.year == year ? 'selected' : ''}>
                                    </c:when>
                                    <c:otherwise>
                                        <option value="${year}" ${yearValue == year ? 'selected' : ''}>
                                    </c:otherwise>
                                </c:choose>
                                    <c:out value="${year}" />
                                </option> 
                            </c:forEach>
                        </select>
                    </td>

                    <td class="width5Percentage"></td>

                    <td class="width25Percentage">
                        Month
                    </td>

                    <td class="width25Percentage">
                        <select id="ddlMonth" name="ddlMonth">
                            <c:forEach items="${listOfMonths}" var="month" varStatus="loop">
                                <c:choose>
                                    <c:when test="${itemInventoryHeader.id != null}">
                                         <option value="${loop.count}" ${itemInventoryHeader.month == loop.count ? 'selected' : ''}>
                                    </c:when>
                                    <c:otherwise>
                                         <option value="${loop.count}" ${monthIndex == loop.count ? 'selected' : ''}>
                                    </c:otherwise>
                                </c:choose>
                                    <c:out value="${month}" />
                                </option>
                            </c:forEach>
                        </select> 
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" id="ddlItemTypeChangesFlag" value="" hidden>
                        <input type="text" id="minStockLevel" value="" hidden>
                        <input type="text" id="miOrderQty" value="" hidden>
                        
                    </td>
                </tr>
            </table>
        </div>

        <!-- end section -->

        <!-- inventory detail section -->
            <table id="tableInventoryDetails" class="defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace50" cellspacing="0">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize">
                            Inventory Location
                        </th>
                        
                        <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize">
                            Stock at Hand
                        </th>

                        <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize">
                            Stock in Transit
                        </th>

                        <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize">
                            Stock Received
                        </th>

                        <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize">
                            Stock Delivered
                        </th>

                        <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize">
                            Reserved Quantity
                        </th>

                        <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize">
                            Available Quantity
                        </th>

                        <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize mgrPaddingRight20" style="text-align: center">
                            Main Store
                        </th>
                    </tr>
                </thead>

                <tbody class="bgWhite">
                    <c:forEach var="ItemDetails" items="${itemInventoryHeader.listOfItemInventoryDetails}" varStatus="loop">
                        <tr class="itemDetails_${loop.count}">
                            <td class="mgrTdPadTopBot20 mgrPaddingLeft20 txtStyleSanRegularMgr">
                                <input type="text" id="txtInventoryLocationId_${loop.count}" name="txtInventoryLocationId_${loop.count}" value="${ItemDetails.inventoryLocationId}" class="mgrFormDesign mgrInputText txtInventoryLocationId"hidden>
                                <input type="text" id="txtInventoryLocation_${loop.count}" name="txtInventoryLocation_${loop.count}" value="${ItemDetails.inventoryLocation}" class="mgrFormDesign mgrInputText txtInventoryLocation" readonly>
                            </td>
                            <td class="mgrTdPadTopBot20 txtStyleSanRegularMgr">
                                <input type="text" id="txtStockAtHand_${loop.count}" name="txtStockAtHand_${loop.count}" value="" class="mgrFormDesign mgrInputText txtStockAtHand" readonly>
                            </td>

                            <td class="mgrTdPadTopBot20 txtStyleSanRegularMgr">
                                <input type="text" id="txtStockInTransit_${loop.count}" name="txtStockInTransit_${loop.count}" value="" class="mgrFormDesign mgrInputText txtStockInTransit" readonly>
                            </td>

                            <td class="mgrTdPadTopBot20 txtStyleSanRegularMgr">
                                <input type="text" id="txtStockReceived_${loop.count}" name="txtStockReceived_${loop.count}" value="" class="mgrFormDesign mgrInputText txtStockReceived" readonly>
                            </td>

                            <td class="mgrTdPadTopBot20 txtStyleSanRegularMgr">
                                <input type="text" id="txtStockShipped_${loop.count}" name="txtStockShipped_${loop.count}" value="" class="mgrFormDesign mgrInputText txtStockShipped" readonly>
                            </td>

                            <td class="mgrTdPadTopBot20 txtStyleSanRegularMgr">
                                <input type="text" id="txtReservedQty_${loop.count}" name="txtReservedQty_${loop.count}" value="" class="mgrFormDesign mgrInputText txtReservedQty" readonly>
                            </td>

                            <td class="mgrTdPadTopBot20 txtStyleSanRegularMgr">
                                <input type="text" id="txtAvailableQty_${loop.count}" name="txtAvailableQty_${loop.count}" value="" class="mgrFormDesign mgrInputText txtAvailableQty" readonly>
                            </td>

                            <td class="mgrTdPadTopBot20 mgrPaddingRight20" style="text-align: center">
                                <c:choose>
                                    <c:when test="${ItemDetails.mainStore == 1}">
                                        <input type="text" id="txtMainStoreStatus_${loop.count}" name="txtMainStoreStatus_${loop.count}" value="Active" class="txtMainStoreStatus" class="txtMainStoreStatus" hidden>
                                    </c:when>
                                    <c:otherwise>
                                         <input type="text" id="txtMainStoreStatus_${loop.count}" name="txtMainStoreStatus_${loop.count}" value="Inactive" class="txtMainStoreStatus" class="txtMainStoreStatus" hidden>
                                    </c:otherwise>
                                </c:choose>
                                
                                <input type="checkbox" id="checkMainStore_${loop.count}" name="checkMainStore" class="checkMainStore" onclick="SetChk(this)" ${ItemDetails.mainStore == 1 ? 'checked' : '' }>
                            </td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </form>
    </body>
</html>
<!-- end section -->
