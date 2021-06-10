<%-- 
    Document   : StockAdjustment
    Created on : 2 Dec, 2019, 10:01:56 AM
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
        <title>Stock Adjustment</title>
         <!-- css and js-->
        <link rel="stylesheet" href="include/css/StockAdjustment.css" type="text/css">
        <script type="text/javascript" src="include/js/StockAdjustment.js"></script>
         <script type="text/javascript">
            var listOfItemCodeJson = ${listOfItemCodeJson};
            var listOfInventoryLocationJson = ${listOfInventoryLocationJson};
        </script>
    </head>
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="message" value="${param.message}" readonly hidden>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Stock Adjustment"></jsp:param>
        </jsp:include>
        
        <form id="frm" method="POST" action="StockAdjustment">
            <div class="defaultBodyContent">
                <input type="text" id="txtItemDetailsCount" name="txtItemDetailsCount" readonly hidden>
                <input type="text" id="txtStockAdjustmentId" name="txtStockAdjustmentId" value="${stockAdjustmentHeader.id}" readonly hidden>
                <div class="defaultPosition divFormMGR bodyAndFormBorderMGR mgrSpace40">
                    <table class="tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr">
                      <tr>
                            <td class="width20Percentage">
                                Business Entity <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <select id="ddlBusinessEntityId" name="ddlBusinessEntityId">
                                    <option value="0" disabled>-- Please Select Entity --</option>
                                    <c:forEach items="${listOfUserLoggedEntities}" var="entity">
                                        <option value="${entity.id}" ${entity.id eq stockAdjustmentHeader.entityId ?  'selected' : ''}>
                                            ${entity.name}
                                        </option>
                                    </c:forEach>
                                </select>
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                Transaction No.
                            </td>

                            <td class="width25Percentage">
                                <input type="text" id="txtTransferNo" name="txtTransferNo" value="" class="mgrFormDesign" value="${stockAdjustmentHeader.transferNo}" readonly disabled>
                            </td>
                        </tr> 
                        <tr>
                            <td class="width20Percentage">
                                Transaction Date <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <c:choose>
                                    <c:when test="${stockAdjustmentHeader.status eq 1}">
                                        <input type="text" id="txtTransferDate" name="txtTransferDate" value="<javatime:format value="${stockAdjustmentHeader.transferDate}" pattern="dd/MM/yyyy"/>" class="mgrFormDesign" readonly>
                                    </c:when>
                                    <c:otherwise>
                                        <input type="text" id="txtTransferDate" name="txtTransferDate" value="<javatime:format value="${dateNow}" pattern="dd/MM/yyyy"/>" class="mgrFormDesign" readonly>
                                    </c:otherwise>
                                </c:choose>                               
                            </td>

                            <td class="mgrFormBorderSpacing"></td>

                            <td class="width25Percentage">
                                Transaction Type. <span class="mandatory">*</span>
                            </td>

                            <td class="width25Percentage">
                                <select id="ddlTransferType" name="ddlTransferType">
                                    <option value="0" selected disabled>-- Please Select Transaction Type --</option>
                                    <c:forEach items="${listOfTransferType}" var="transfer">
                                        <option value="${transfer.id}" ${transfer.id eq stockAdjustmentHeader.transferTypeId ?  'selected' : ''}>
                                            ${transfer.description}
                                        </option>
                                    </c:forEach>
                                </select>
                            </td>
                        </tr>
                         <tr>
                            <td id="stkFrom"  class="width20Percentage">
                                Transaction Location (From)
                            </td>

                            <td class="width20Percentage">
                                <input type="text" id="txtTransferFrom" name="txtTransferFrom" value="${stockAdjustmentHeader.transferLocFrom}" maxlength="100" class="mgrFormDesign">                                  
                            </td>
                            <td>
                                 
                            </td>
                            <td id="stkTo" class="width20Percentage">
                                 Transaction Location (To)
                            </td>
                             <td class="width25Percentage">
                                <input type="text" id="txtTransferTo" name="txtTransferTo" value="${stockAdjustmentHeader.transferLocTO}" maxlength="100" class="mgrFormDesign">                                         
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Order Reference
                            </td>
                            <td class="width25Percentage">
                                <input class="mgrFormDesign" type="text" id="txtOrderReference" name="txtOrderReference" maxlength="100" value="${stockAdjustmentHeader.orderReference}">
                            </td>
                        </tr>
                    </table>
                </div>
                <!--item Detail-->
                <table id="dtItemDetail" class="defaultPosition mgrBorderRadius tblWdth100 contractDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0"> 
                    <thead class="mgrDataTableThead">
                        <tr>
                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrThead2FontSize" style="width:5%;">
                                #
                            </th>  

                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="width: 15%;">
                                Item Code
                            </th>

                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 10px; width: 25%;">
                                Item Description
                            </th>

                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 10px; width: 10%;">
                                UOM
                            </th>

                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 10px; width: 15%;">
                                Unit Cost
                            </th>

                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 10px; width: 15%;">
                                Quantity
                            </th>
                            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize" style="padding-left: 10px; width: 15%;">
                                Remarks
                            </th>

                            <th class="mgrTdPadTopBot20 mgrPaddingRight20 mgrFloatRight">
                                <img src="../../include/mgr/include/images/MGR-LOGO/Add mgr.png" id="btnAddItemDetails" class="logoTheadTableMgr" alt="logo Add Row">
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bgWhite">
                        <c:forEach var="ItemDetails" items="${stockAdjustmentHeader.listOfItemDetails}" varStatus="loop">
                            <tr>
                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20 txtStyleSanRegularMgr">
                                    ${loop.count}.
                                </td>

                                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                                    <input type="text" id="txtItemId_${loop.count}" name="txtItemId_${loop.count}" value="${ItemDetails.itemId}" class="txtItemId" readonly hidden>
                                    <input type="text" id="txtItemCode_${loop.count}" name="txtItemCode_${loop.count}" value="${ItemDetails.itemCode}" class="mgrFormDesign txtItemCode">
                                </td>

                                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                                    <input type="text" id="txtItemDescription_${loop.count}" name="txtItemDescription_${loop.count}" value="${ItemDetails.itemDescription}" class="mgrFormDesign txtItemDescription" readonly>
                                </td>

                                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                                    <input type="text" id="txtUom_${loop.count}" name="txtUom_${loop.count}" value="${ItemDetails.uOM}" class="mgrFormDesign txtUom" readonly>
                                </td>

                                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                                    <input type="text" id="txtUnitCost_${loop.count}" onchange="unitPriceOnChange(${loop.count})" name="txtUnitCost_${loop.count}" value="<fmt:formatNumber type="currency" value="${ItemDetails.unitCost}" maxFractionDigits="2" minFractionDigits="2"/>" class="mgrFormDesign txtUnitCost">
                                </td>

                                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                                    <input type="text" id="txtQty_${loop.count}" name="txtQty_${loop.count}" class="mgrFormDesign txtQty" maxlength = "15" value="<fmt:formatNumber value="${ItemDetails.qty}" maxFractionDigits="0" minFractionDigits="0"/>" style="width:90%" onkeypress="return isNumberPlusComma(event, $(this));">
                                </td>
                                
                                <td class="mgrTdPadTopBot20" style="padding-left: 5px;">
                                    <input type="text" id="txtRemarks_${loop.count}" name="txtRemarks_${loop.count}" class="mgrFormDesign txtUom" value="${ItemDetails.remarks}">
                                </td>

                                <td class="mgrTdPadTopBot20 mgrPaddingRight20 txtAlignCenter">
                                    <img src="../../include/mgr/include/images/MGR-LOGO/Remove mgr.png" class="mgrFloatRight logoTbodyTableMgr" alt="logo Remove Row" onclick="bindDeleteSelectedItemDetail($(this));">
                                </td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
                <div class="mgrSpace100">
                    <input type="button" id="btnAdjust" class="btnGreenVersionMGR mgrFloatRight mgrButtonSpacing " value="Adjust">
                    <input type="button" id="btnSave" class="btnBrownVersionMGR mgrFloatRight mgrButtonSpacing " value="Save">
                </div>
            </div>
        </form>
    </body>
</html>
