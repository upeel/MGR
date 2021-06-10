<%-- 
    Document   : StockMovement
    Created on : 5 Jul, 2019, 10:34:07 AM
    Author     : Wildan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://sargue.net/jsptags/time" prefix="javatime" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!-- stock movement css and js -->
<link rel="stylesheet" type="text/css" href="./include/css/StockMovement.css">
<script type="text/javascript" src="./include/js/StockMovement.js"></script>

<!-- stock movement period form section -->
<form id="frmInventoryMovement" method="GET">
<table id="tblStockMovementPeriod" class="txtStyleSanRegularMgr defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0">
    
    <tbody class="bgWhite">
        <tr>
            <td class="mgrPaddingLeft20 mgrTdPadTopBot20" style="width: 5%;">
                From
            </td>
            
            <td class="width25Percentage" style="width: 15%;">
                <input class="mgrFormDesign" type="text" id="txtDateFrom" name="txtDateFrom" 
                       value="<javatime:format value="${txtDateFrom}" pattern="MMM-yyyy" />" readonly>
            </td>
            
            <td class="mgrTdPadTopBot20 mgrPaddingLeft20" style="width: 6%;">
                To
            </td>
            
            <td class="mgrTdPadTopBot20" style="width: 15%;">
                <input class="mgrFormDesign" type="text" id="txtDateTo" name="txtDateTo" 
                       value="<javatime:format value="${txtDateTo}" pattern="MMM-yyyy"/>" readonly>
            </td>
            
            <td class="mgrTdPadTopBot20 mgrPaddingLeft20" style="width: 15%;">
                <input type="button" id="btnStockMovementPeriodFilter" value="Filter" class="btnMGRStyle" style="width: 80px;">
            </td>
            
            </tr>
            
            <tr>
            <td class="mgrTdPadTopBot20 mgrPaddingLeft20" style="width: 7%;">
                Latest Balance
            </td>
            
            <td class="mgrTdPadTopBot20" style="width: 15%;">
                <input type="text" class="mgrFormDesign" id="latestBalance" name="latestBalance" 
                       value="<fmt:formatNumber value="${inventoryMovement.latestBalance}" type="number" />" readonly>
                
                <input type="text" id="txtItemMasterId" name="txtItemMasterId" value="${txtItemMasterId}" hidden>
                <input type="text" id="txtFilter" name="txtFilter" value="filter" hidden>
                <input type="text" id="tab_Index" name="tab_Index" value="${tab_Index}" hidden/>
            </td>
            <td colspan="3"></td>
        </tr>
    </tbody>
</table>
<!-- end section -->

<!-- stock movement detail section -->
<table id="tblStockMovementDetail" class="txtStyleSanRegularMgr defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0">
    <thead class="mgrDataTableThead">
        <tr>
            <th class="mgrTdPadTopBot20 mgrThead2FontSize" colspan="10" style="border-bottom: 1px solid #ffffff;">
                Inventory Movement
            </th>
        </tr>
        
        <tr>
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff;">
                No.
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="border-bottom: 1px solid #ffffff;">
                Date
            </th>
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="border-bottom: 1px solid #ffffff;">
                Batch No
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="border-bottom: 1px solid #ffffff;">
                Transaction Type
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="border-bottom: 1px solid #ffffff;">
                Location (From)
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="border-bottom: 1px solid #ffffff;">
                Location (To)
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="border-bottom: 1px solid #ffffff;">
                Quantity
            </th>
            <th class="mgrTdPadTopBot20 mgrThead2FontSize mgrTxtAlignLeft" style="border-bottom: 1px solid #ffffff;">
                Unit Cost
            </th>
        </tr>
    </thead>
    
    <tbody class="bgWhite">
        <c:forEach items="${inventoryMovement.listOfInventoryMovement}" var="list" varStatus="loop">
        <tr>
            <td class="mgrTdPadTopBot20 mgrPaddingLeft20">
                ${loop.count}
            </td>
            
            <td class="mgrTdPadTopBot20">
                <javatime:format value="${list.transactionDate}" pattern="dd/MM/yyyy" />
            </td>
            
            <td class="mgrTdPadTopBot20">
                <c:out value="${list.batchNo}"/>
            </td>
            
            <td class="mgrTdPadTopBot20">
                <c:out value="${list.typeName}"/>
            </td>
            
            <td class="mgrTdPadTopBot20">
               <c:out value="${list.locationFrom}"/>
            </td>
            
            <td class="mgrTdPadTopBot20">
                <c:out value="${list.locationTo}"/>
            </td>
            
            <td class="mgrTdPadTopBot20">
                <fmt:formatNumber value="${list.qty}" type="number" minFractionDigits="2" maxFractionDigits="2"/>
            </td>
            <td class="mgrTdPadTopBot20">
                <fmt:formatNumber value="${list.unitCost}" type="currency" minFractionDigits="2" maxFractionDigits="2"/>
            </td>
        </tr>
        </c:forEach>
    </tbody>
</table>
</form>
<!-- end section -->