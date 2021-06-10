<%-- 
    Document   : StockAdjustment
    Created on : 5 Jul, 2019, 10:33:56 AM
    Author     : Wildan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://sargue.net/jsptags/time" prefix="javatime" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!-- stock adjustment css and js -->
<link rel="stylesheet" type="text/css" href="./include/css/StockAdjustment.css">
<script type="text/javascript" src="./include/js/StockAdjustment.js"></script>

<!-- stock adjustment form section -->
<table id="tableStockAdjustment" class="txtStyleSanRegularMgr defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace50" cellspacing="0">
    <thead class="mgrDataTableThead">
        <tr>
            <th class="mgrTdPadTopBot20 mgrThead2FontSize" colspan="5">
                Stock Adjustment
            </th>
        </tr>
    </thead>
    
    <tbody class="bgWhite">
        <tr>
            <td class="width20Percentage mgrPaddingLeft30 mgrTdPaddingTopTable">
                Adjustment Type
            </td>
            
            <td class="width25Percentage mgrTdPaddingTopTable">
                <select id="ddlStockAdjustmentType" name="ddlStockAdjustmentType">
                    <option value="">-- Please Select Adjustment Type --</option>
                    <option value="Stock In">Stock In</option>
                    <option value="Stock Out">Stock Out</option>
                </select>
            </td>
            
            <td class="width5Percentage"></td>
            
            <td class="width25Percentage mgrTdPaddingTopTable">
                From
            </td>
            
            <td class="width25Percentage mgrPaddingRight30 mgrTdPaddingTopTable">
                <select id="ddlStockAdjustmentFrom" name="ddlStockAdjustmentFrom">
                    <option value="">-- Please Select --</option>
                    <option value="Supplier">Supplier</option>
                    <option value="Production">Production</option>
                    <option value="Warehouse Location">Warehouse Location</option>
                </select>
            </td>
        </tr>
        
        <tr>
            <td class="width20Percentage mgrPaddingLeft30 mgrTdPaddingTopTable">
                Reason
            </td>
            
            <td class="width25Percentage mgrTdPaddingTopTable">
                <select id="ddlStockAdjustmentReason" name="ddlStockAdjustmentReason">
                    <option value="">-- Please Select Reason --</option>
                </select>
            </td>
            
            <td class="width5Percentage"></td>
            
            <td class="width25Percentage mgrTdPaddingTopTable">
                To
            </td>
            
            <td class="width25Percentage mgrTdPaddingTopTable mgrPaddingRight30">
                <select id="ddlStockAdjustmentTo" name="ddlStockAdjustmentTo">
                    <option value="Warehouse Location">Warehouse Location</option>
                    <option value="Customer">Customer</option>
                    <option value="Write Off">Write Off</option>
                </select>
            </td>
        </tr>
        
        <tr>
            <td class="width20Percentage mgrTdPaddingTopTable mgrPaddingLeft30">
                Batch No.
            </td>
            
            <td class="width25Percentage mgrTdPaddingTopTable">
                <select id="ddlStockAdjustmentBatchNo" name="ddlStockAdjustmentNo">
                    <option value="">-- Please Select Batch No --</option>
                </select>
            </td>
            
            <td class="width5Percentage"></td>
            
            <td class="width25Percentage mgrTdPaddingTopTable">
                Remarks
            </td>
            
            <td class="width25Percentage mgrTdPaddingTopTable mgrTdPaddingBotTable mgrPaddingRight30" rowspan="2">
                <textarea id="txtStockAdjustmentRemarks" name="txtStockAdjustmentRemarks" class="mgrFormDesign mgrTextAreaOnTable"></textarea>
            </td>
        </tr>
        
        <tr>
            <td class="width20Percentage mgrPaddingLeft30 mgrTdPaddingTopTable mgrTdPaddingBotTable">
                Quantity
            </td>
            
            <td class="width25Percentage mgrTdPaddingTopTable mgrTdPaddingBotTable">
                <input type="text" id="ddlStockAdjustmentQuantity" name="ddlStockAdjustmentQuantity" value="" class="mgrFormDesign">
            </td>
            
            <td class="width5Percentage"></td>
            
            <td></td>
        </tr>
    </tbody>
</table>
<!-- end section -->