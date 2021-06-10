<%-- 
    Document   : ItemEntityList
    Created on : 12 Jul, 2019, 4:28:23 PM
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
        <title>Item List</title>
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/ItemEntityList.css" type="text/css">
        <script type="text/javascript" src="./include/js/ItemEntityList.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="message" readonly hidden>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Item List"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">
            <form id="frm2" method="GET" action="ItemEntityList">
                
            </form>
            <form id="frm" method="POST" action="ItemEntityList">
                <table style="width: 100%">
                    <tr>
                        <td class="txtStyleSanRegularMgr" style="width: 8%;">
                            Item Type
                        </td>
                        <c:choose>
                            <c:when test="${param.customerSalesInformationDetailId != null}">
                                <td style="width: 25%;">
                                    <select id="ddlItemType" name="ddlItemType">
                                        <c:forEach items="${listOfItemType}" var="itemType" varStatus="loop">
                                    <option value="${itemType.id}" ${itemType.id eq param.ddlItemType ? 'selected' : ''}>${itemType.name}</option>
                                    </c:forEach>
                                    <option value="8" ${param.ddlItemType eq '8' ? 'selected' : ''}>Contract</option>
                                    </select>
                                </td>
                            </c:when>
                            <c:when test="${param.order_type eq 'Item Sales' || param.inv_type eq 'Item Sales'}">
                        <td style="width: 25%;">
                            <select id="ddlItemType" name="ddlItemType">
                                <c:forEach items="${listOfItemType}" var="itemType" varStatus="loop">
                                    <option value="${itemType.id}" ${itemType.name eq 'Services' ? 'disabled' : '' || itemType.id eq param.ddlItemType ? 'selected' : ''}>${itemType.name}</option>
                                </c:forEach>
                            </select>
                        </td>
                            </c:when>
                            <c:otherwise>
                                <td style="width: 25%;">
                            <select id="ddlItemType" name="ddlItemType">
                                <c:forEach items="${listOfItemType}" var="itemType" varStatus="loop">
                                    <option value="${itemType.id}" ${itemType.id eq param.ddlItemType ? 'selected' : ''}>${itemType.name}</option>
                                </c:forEach>
                            </select>
                        </td>
                            </c:otherwise>
                        </c:choose>
                        <td style="width:3%"></td>
                        <td class="txtStyleSanRegularMgr mgrPaddingLeft20" style="width: 10%;">
                            Item Group
                        </td>

                        <td style="width: 25%;">
                            <select id="ddlItemGroup" name="ddlItemGroup">
                                <option value="0">All</option>
                                <c:forEach items="${listOfItemGroup}" var="itemGroup" varStatus="loop">
                                    <option value="${itemGroup.id}" ${itemGroup.id eq param.ddlItemGroup ? 'selected' : ''}>${itemGroup.name}</option>
                                </c:forEach>
                            </select>
                        </td>
                        <td style="width:1%"></td>
                        <td style="width: 6%;">
                            <input type="button" value="Filter" id="btnFilterItem" class="btnMGRStyle">
                        </td>
                    <!--    <td class="txtStyleSanRegularMgr" style="width: 10%">
                            <input type="text" id="search" placeholder="search by item sku" name="search" class="mgrFormDesign">
                        </td>
                        <td style="width: 6%">
                            <input type="button" class="btnMGRStyle" id="btnSearch" value="Search">
                        </td> -->
                        
                    </tr>
                </table>
        
                <input type="hidden" value="${param.order_id}" name="txtOrderId" id="txtOrderId">
                <input type="hidden" value="${param.entity_id}" id="txtEntityId" name="entity_id">
                <input type="hidden" value="${param.do_id}" name="txtDOId" id="txtDOId">
                <input type="hidden" value="${param.invoice_id}" name="txtInvoiceId" id="txtInvoiceId">
                <input type="hidden" id="custSalesId" value="${param.customerSalesInformationDetailId}" name="customerSalesInformationDetailId">
                <input type="hidden" id="txtTypeItemList" value="${param.type}" name="type">
                <input type="hidden" id="txtOrderType" name="order_type" value="${param.order_type}">
                <input type="hidden" id="txtInvType" name="inv_type" value="${param.inv_type}">
                <input type="text" id="txtTotalItem" name="txtTotalItem" value="${totalItem}" readonly hidden>
                <input type="text" id="txtTotalItemContract" name="txtTotalItemContract" value="${totalItemContract}" readonly hidden>
               
                <table id="dtItemEntityList" class="txtStyleSanRegularMgr defaultPosition mgrBorderRadius tblWdth100 itemSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0">
                    <c:choose>
                        <c:when test="${param.ddlItemType eq '8'}">
                    <thead class="mgrDataTableThead" id="theadContract">
                        <tr>
                       
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20 mgrPaddingLeft20" style="width: 30%;">Description</th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20" style="width: 25%;">Remarks</th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20 mgrPaddingLeft20" style="width: 25%;">UOM</th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20" style="width: 20%;">Quantity</th>
                            <th hidden></th>
                            
                        </tr>
                    </thead>
                    <tfoot style="display: none !important;">
                        <tr>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20 mgrPaddingLeft20" style="width: 30%;">Description</th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20" style="width: 25%;">Remarks</th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20 mgrPaddingLeft20" style="width: 25%;">UOM</th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20" style="width: 20%;">Quantity</th>
                            <th hidden></th>              
                        </tr>
                    </tfoot>
                    <tbody style="background-color: white;" id="tbodyContract">
                        <c:forEach items="${listOfItemEntityContract}" var="item" varStatus="loop">
                            <tr>           
                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20">
                                    ${item.description}
                                    <input type="text" id="txtItemEntityItemName_${loop.count}" name="txtItemEntityItemName_${loop.count}" value="${item.description}" readonly hidden>
                                </td>

                                <td class="mgrTdPadTopBot20">
                                    <input type="text" id="txtItemEntityRemarks_${loop.count}" name="txtItemEntityRemarks_${loop.count}" class="mgrFormDesign" value="${item.remarks}" maxlength="50">
                                </td>

                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20">
                                    <input id="ddlItemEntityUOM_${loop.count}" name="ddlItemEntityUOM_${loop.count}" class="ddlMgr" type="text" value="${item.uom_name}" readonly>
                                        
                                </td>

                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20">
                                    <input type="text" onkeypress="validate(event)" maxlength="1" style="text-align: right;" id="txtItemEntityQuantity_${loop.count}" name="txtItemEntityQuantity_${loop.count}" value="${item.quantity}" class="mgrFormDesign">
                                </td>
                                
                                <td hidden>
                                    <input type="text" id="txtItemEntityUnitPrice_${loop.count}" name="txtItemEntityUnitPrice_${loop.count}" value="0" readonly hidden>
                                    <input type="text" id="txtItemEntityOriginalPrice_${loop.count}" name="txtItemEntityOriginalPrice_${loop.count}" value="0" readonly hidden>
                                </td>
                                
                              <!--  <td id="txtItemEntityUnitPriceDisplay_${loop.count}" style="text-align: right;" class="mgrTdPadTopBot20 mgrPaddingRight20">
                                    <fmt:formatNumber type="currency" maxFractionDigits="2" minFractionDigits="2" value=""/>
                                </td> -->
                            </tr>
                        </c:forEach>
                    </tbody>
                        </c:when>
                        <c:otherwise>
                    <thead class="mgrDataTableThead">
                        <tr>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20 mgrPaddingLeft20" style="width: 10%;">Item SKU</th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20" style="width: 10%;">Part No.</th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20 mgrPaddingLeft20" style="width: 20%;">Description</th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20" style="width: 20%;">Remarks</th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20 mgrPaddingLeft20" style="width: 20%;">UOM</th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20 mgrPaddingLeft20" style="width: 10%;">Quantity</th>
                            <th hidden></th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20 mgrPaddingRight20" style="width: 10%;">Unit Price</th>
                        </tr>
                    </thead>
                    <tfoot style="display: none !important;">
                        <tr>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20 mgrPaddingLeft20" style="width: 10%;">Item SKU</th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20" style="width: 10%;">Part No.</th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20 mgrPaddingLeft20" style="width: 20%;">Description</th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20" style="width: 20%;">Remarks</th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20 mgrPaddingLeft20" style="width: 20%;">UOM</th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20 mgrPaddingLeft20" style="width: 10%;">Quantity</th>
                            <th hidden></th>
                            <th class="mgrTxtAlignLeft bdrBtmWhiteMgr mgrTdPadTopBot20 mgrPaddingRight20" style="width: 10%;">Unit Price</th>
                        </tr>
                    </tfoot>
                    <tbody style="background-color: white;" id="itemTbody">
                        <c:forEach items="${listOfItemEntity}" var="item" varStatus="loop">
                            <tr>
                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20">
                                   ${item.item_sku}
                                   <input type="text" id="txtItemEntityItemSKU_${loop.count}" name="txtItemEntityItemSKU_${loop.count}" value="${item.item_sku}" readonly hidden>
                                </td>

                                <td class="mgrTdPadTopBot20">
                                   
                                    <input type="text" id="txtItemEntityPartNO_${loop.count}" name="txtItemEntityPartNO_${loop.count}" value="${item.part_no}">
                                </td>

                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20">
                                    ${item.description}
                                    <input type="text" id="txtItemEntityItemName_${loop.count}" name="txtItemEntityItemName_${loop.count}" value="${item.description}" readonly hidden>
                                </td>

                                <td class="mgrTdPadTopBot20">
                                    <input type="text" id="txtItemEntityRemarks_${loop.count}" name="txtItemEntityRemarks_${loop.count}" class="mgrFormDesign" value="${item.remarks}" maxlength="50">
                                </td>

                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20">
                                    <select id="ddlItemEntityUOM_${loop.count}" name="ddlItemEntityUOM_${loop.count}" class="ddlMgr" onchange="getUnitPriceBaseUOMItem($(this));">
                                        <c:forEach var="uom" items="${item.listOfItemUomDetails}">
                                            <option value="${uom.id}" ${item.uom_id eq uom.id ? "selected" : ""}>
                                                ${uom.uom}
                                            </option>
                                        </c:forEach>
                                    </select>
                                </td>

                                <td class="mgrTdPadTopBot20 mgrPaddingLeft20">
                                    <input type="text" style="text-align: right;" id="txtItemEntityQuantity_${loop.count}" name="txtItemEntityQuantity_${loop.count}" value="${item.quantity eq 0 ? '' : item.quantity}" onkeypress="return isQuantityUnit(event, $(this));" onchange="inputQuantityOfUOM($(this));" class="mgrFormDesign">
                                </td>
                                
                                <td hidden>
                                    <input type="text" id="txtItemEntityUnitPrice_${loop.count}" name="txtItemEntityUnitPrice_${loop.count}" value="${item.total_unit_price}" readonly hidden>
                                    <input type="text" id="txtItemEntityOriginalPrice_${loop.count}" name="txtItemEntityOriginalPrice_${loop.count}" value="${item.unit_price}" readonly hidden>
                                </td>
                                
                                <td id="txtItemEntityUnitPriceDisplay_${loop.count}" style="text-align: right;" class="mgrTdPadTopBot20 mgrPaddingRight20">
                                    <fmt:formatNumber type="currency" maxFractionDigits="2" minFractionDigits="2" value="${item.unit_price}"/>
                                </td>
                            </tr>
                        </c:forEach>
                    </tbody>
                        </c:otherwise>
                    </c:choose>
                </table>
                <table id="dtItemEntityListHidden" hidden>
                    <tbody>
                    <c:forEach items="${listOfItemEntitySession}" var="item" varStatus="loop">
                    <tr>
                        <td>
                            <input type="text" id="itemEntityItemSKU_${loop.count}" class="itemHidden" name="txtItemEntityItemSKU_${loop.count}" value="${item.item_sku}">
                        </td>
                        <td>
                            <input type="text" id="itemEntityPartNO_${loop.count}" class="partNoHidden" name="txtItemEntityPartNO_${loop.count}" value="${item.part_no}">
                        </td>
                        <td>
                            <input type="text" id="itemEntityItemName_${loop.count}" class="nameHidden" name="txtItemEntityItemName_${loop.count}" value="${item.description}">
                        </td>
                        <td>
                            <input type="text" id="itemEntityRemarks_${loop.count}" class="remarkHidden" name="txtItemEntityRemarks_${loop.count}" value="${item.remarks}">
                        </td>
                        <td>
                            <input type="text" id="itemEntityQuantity_${loop.count}" class="qtyHidden" name="txtItemEntityQuantity_${loop.count}" value="${item.quantity eq 0 ? '' : item.quantity}">
                        </td>
                        <td>
                            <input type="text" id="itemEntityUnitPrice_${loop.count}" class="unitPriceHidden" name="txtItemEntityUnitPrice_${loop.count}" value="${item.total_unit_price}">
                        </td>
                        <td>    
                            <input type="text" id="itemEntityOriginalPrice_${loop.count}" class="priceHidden" name="txtItemEntityOriginalPrice_${loop.count}" value="${item.unit_price}">
                        </td>
                        <td>
                            <input type="text" id="itemEntityUOM_${loop.count}" class="uomHidden" name="ddlItemEntityUOM_${loop.count}" value="${item.uom_id}">
                        </td>
                        <td><input type="text" id="itemEntityUOMName_${loop.count}" class="uomNameHidden" name="ddlItemEntityUOMName_${loop.count}" value="${item.uom_name}"></td>
                        <td><input type="text" id="itemEntityUOMContract_${loop.count}" class="uomCHidden" name="itemEntityUOMContract_${loop.count}" value=""></td>
                    </tr>
                    </c:forEach>
                    </tbody>
                </table>
                <table id="dtItemEntityContractHidden" hidden>
                    <tbody>
                    <c:forEach items="${listOfItemEntitySessionContract}" var="item" varStatus="loop">
                    <tr>
              
                        <td>
                            <input type="text" id="itemName_${loop.count}" class="nameHidden" name="txtItemEntityItemName_${loop.count}" value="${item.description}">
                        </td>
                        <td>
                            <input type="text" id="remarks_${loop.count}" class="remarkHidden" name="txtItemEntityRemarks_${loop.count}" value="${item.remarks}">
                        </td>
                        <td>
                            <input type="text" id="quantity_${loop.count}" class="qtyHidden" name="txtItemEntityQuantity_${loop.count}" value="${item.quantity eq 0 ? '' : item.quantity}">
                        </td>
                        <td>
                            <input type="text" id="unitPrice_${loop.count}" class="unitPriceHidden" name="txtItemEntityUnitPrice_${loop.count}" value="${item.total_unit_price}">
                        </td>
                        <td>    
                            <input type="text" id="originalPrice_${loop.count}" class="priceHidden" name="txtItemEntityOriginalPrice_${loop.count}" value="${item.unit_price}">
                        </td>
                        <td>
                            <input type="text" id="UOM_${loop.count}" class="uomHidden" name="ddlItemEntityUOM_${loop.count}" value="${item.uom_id}">
                        </td>
                        <td><input type="text" id="UOMName_${loop.count}" class="uomNameHidden" name="ddlItemEntityUOMName_${loop.count}" value="${item.uom_name}"></td>
                        <td><input type="text" id="UOMContract_${loop.count}" class="uomCHidden" name="itemEntityUOMContract_${loop.count}" value=""></td>
                    </tr>
                    </c:forEach>
                    </tbody>
                </table>

                <div style="margin: 10px 0 30px 0;">
                    <input type="button" id="btnAddItemList" class="mgrFloatRight" value="Add">
                    <br/>
                </div>
            </form>
        </div>        
    </body>
</html>
