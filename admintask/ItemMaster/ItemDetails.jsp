<%-- 
    Document   : ItemDetails
    Created on : 5 Jul, 2019, 10:28:34 AM
    Author     : Wildan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://sargue.net/jsptags/time" prefix="javatime" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!-- item detail css and js -->
<link rel="stylesheet" type="text/css" href="./include/css/ItemDetails.css">
<script type="text/javascript" src="./include/js/ItemDetails.js"></script>

<c:choose>
    <c:when test="${param.txtItemMasterId != null}">
        <script>
            // list json for required to select main item
            var listItemTypeNeedToLinkMainJson = ${listItemTypeNeedToLinkMainJson};
            var listOfItemUomJson = ${itemUomJson};
            var listOfEntityIdJson = ${listOfEntityIdJson};
            var listOfItemIdOnCategoryRelationJson = ${listOfItemIdOnCategoryRelationJson};
            var listItemTypeInItemHdJson = ${listItemTypeInItemHdJson};
            var listOfCategoryJsonRetrieve = ${listOfCategoryJson};
        </script>
    </c:when>
    <c:otherwise>
        <script>
            var listItemTypeNeedToLinkMainJson = ${listItemTypeNeedToLinkMainJson};
        </script>
    </c:otherwise>
</c:choose>
<input readonly type="text" id="message" value="${param.message}" hidden>

<!-- item header form section -->
<div class="defaultPosition divFormMGR itemDetailSectionDiv bodyAndFormBorderMGR mgrSpace40">
    <input type="hidden" id="txtItemMasterId" name="txtItemMasterId" value="${param.txtItemMasterId}"/>
    <table class="tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr">   
        <tr>
            <td class="width20Percentage" style="padding-bottom: 20px;">
                Item Name <span class="mandatory">*</span>
            </td>
            
            <td class="width25Percentage">
                <input type="text" id="txtItemName" name="txtItemName" class="mgrFormDesign" value="${itemName}" maxlength="50">
            </td>
            
            <td class="width5Percentage"></td>
            
            <td class="width25Percentage">
                Code <span class="mandatory">*</span>
            </td>
            
            <td class="width25Percentage">
                <input placeholder="Please select Item Group Below" readonly type="text" id="txtItemCode" name="txtItemCode" class="mgrFormDesign" value="${itemCode}" maxlength="20">
            </td>
        </tr>
        
        <tr>
            <td class="width20Percentage" style="padding-bottom: 25px;">
                Item Description <span class="mandatory">*</span>
            </td>
            
            <td class="width25Percentage" rowspan="2">
                <textarea maxlength="200" id="txtItemDescription" name="txtItemDescription" class="mgrFormDesign mgrTextAreaOnTable">${itemDescription}</textarea>
            </td>
            
            <td class="width5Percentage"></td>
            
            <td class="width25Percentage" style="padding-bottom: 25px;">
                Group <span class="mandatory">*</span>
            </td>      
            
            <td class="width25Percentage" style="padding-bottom: 25px;">
                <select id="ddlItemGroupId" name="ddlItemGroupId">
                    <option value="0" selected disabled>-- Please Select Item Group --</option>
                    <c:forEach items="${listOfItemGroup}" var="itemGroups" varStatus="loop">
                        <option value="${itemGroups.id}" ${itemGroups.id eq itemGroup ? 'selected' : ''}>${itemGroups.name}</option>
                    </c:forEach>                    
                </select>
            </td>
        </tr>
        
        <tr>
            <td></td>
            <td></td>
            <td class="width20Percentage" style="padding-bottom: 10px;">
                Inventory Item Status<span class="mandatory">*</span>
            </td>
            <td class="width25Percentage" style="padding-bottom: 10px;">
                <select id="ddlInventoryItemType" name="ddlInventoryItemType">
                    <option class="defaultz" value="" selected disabled>-- Please Select Inventory Item --</option>    
                    <option class="defaultz" value="0" ${0 eq inventoryItemSatus ? 'selected' : ''}>No</option>   
                    <option class="defaultz" value="1" ${1 eq inventoryItemSatus ? 'selected' : ''}>Yes</option>   
                </select>
            </td>            
            
        <tr>
            <td class="width20Percentage">
                Item Type<span class="mandatory">*</span>
            </td>
            
            <td class="width25Percentage">
                <select id="ddlItemTypeId" name="ddlItemTypeId">
                    <option class="defaultz" value="0" selected disabled>-- Please Select Item Type --</option>
                    <c:forEach items="${listType}" var="type" varStatus="loop">
                        <option  value="${type.id}"${type.id eq itemType ? 'selected' :''}>${type.name}</option>
                    </c:forEach>                    
                </select>
            </td>
            <td class="width5Percentage"></td>
            <td class="width25Percentage">
                Category <span id="category" class="mandatory">*</span>
            </td>
            <td class="width25Percentage">              
                    <c:forEach items="${listItemType}" var="itemCategory" varStatus="loop">                        
                        <label class="checkBoxMgrContainer itemCategory" style="padding-bottom: 5px; "> ${itemCategory.name}                 
                            <input type="checkbox" class="chkCategory" id="chkCategory_${loop.count}" name="chkCategory_${loop.count}" data-checked="${itemCategory.id}" value="${itemCategory.id}">
                        <span class="checkmarkMgr"></span>                      
                        </label>  
                    </c:forEach>    
            </td>
        </tr>
        </tr>
        
        <tr>
            <td class="width20Percentage">
                Business Entity <span class="mandatory">*</span>
            </td>  
            
            <td class="mgrTdPadTopBot20"> 
                <!-- change this to be retrieve mgr only cause requested 3/10/2019 -->
                <%--<c:forEach items="${listOfEntity}" var="itemGroup" varStatus="loop">--%>   
                    <label class="checkBoxMgrContainer" style="padding-bottom: 5px; "> ${mgrEntity.name}                   
                        <input type="checkbox" class=" mgrRadioButton radEntity" id="chkEntity_1" name="chkEntity_1" data-checked="${mgrEntity.id}" value="${mgrEntity.id}" >
                        <span class="checkmarkMgr"></span>                      
                    </label>   
                <%--</c:forEach>--%>
            </td>  
            
            <td class="width5Percentage"></td>
            
            <td class="width25Percentage">
                Status<span class="mandatory">*</span>
            </td>
            
            <c:choose>
                <c:when test="${param.txtItemMasterId != null}">
                    <td class="width25Percentage">
                        <select id="ddlItemStatus" name="ddlItemStatus">
                            <option value="" selected disabled>-- Please Select Status --</option>
                            <option value="1" ${1 eq status ? 'selected':''}>Active</option>
                            <option value="0" ${0 eq status ? 'selected':''}>Inactive</option>
                        </select>
                    </td>
                </c:when>
                <c:otherwise>
                    <td class="width25Percentage">
                        <select id="ddlItemStatus" name="ddlItemStatus" selected disabled>
                            <option value="" selected disabled>-- Please Select Status --</option>
                            <option value="1" ${1 eq status ? 'selected':''}>Active</option>
                            <option value="0" ${0 eq status ? 'selected':''}>Inactive</option>
                        </select>
                    </td>
                </c:otherwise>
            </c:choose>
        </tr>
        
        <tr>
            <td class="width20Percentage">
                Shelf Life
            </td>
            
            <td class="width25Percentage">
                <input type="text" id="txtItemShelfLife" name="txtItemShelfLife" class="mgrFormDesign" maxlength="100" value="${shelfLife}">
            </td>
            
            <td class="width5Percentage"></td>
            
            <td class="width25Percentage">
                MYOB Code<span class="mandatory">*</span>
            </td>
            
            <td class="width25Percentage">
                <input type="text" id="txtItemMYOBCode" name="txtItemMYOBCode" class="mgrFormDesign" maxlength="100" value="${myobCode}">
<!--                <input type="text" id="txtItemMYOBCode" name="txtItemMYOBCode" class="mgrFormDesign" maxlength="100" value="${inventoryMovement.latestBalance}">-->
            </td>
        </tr>
    </table>
</div>

<!-- item uom detail section -->
<table id="tableItemUomDetails" class="defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0">
    <thead class="mgrDataTableThead">
        <tr>
            <th class="maxwidth mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20 mgrThead2FontSize">
                UOM
            </th>
            
            <th class="maxwidth mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20 mgrThead2FontSize">
                Factor
            </th>
            
            <th class="maxwidth mgrTdPadTopBot20 mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20 mgrThead2FontSize">
                Latest Selling Price
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize mgrPaddingRight20">
                Base UOM
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize mgrPaddingRight20">
                Selling UOM
            </th>
            
            <th class="mgrTdPadTopBot20 mgrTxtAlignLeft mgrThead2FontSize mgrPaddingRight20" style="color: #197b30">
                Remove
            </th>
        </tr>
    </thead>
    
    <tbody id="tbodyUom" class="bgWhite tbodyUom" style="background-color: white !important">
        <tr class="trUom">
            <td class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20">
                <input placeholder="pc" type="text" id="txtItemUOMUnit_1" name="txtItemUOMUnit_1" class="mgrFormDesign txtItemUOMUnit" maxlength="20">
            </td>
            
            <td class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20" >
                <input style="text-align: right;" placeholder="1.0" type="text" id="txtItemUOMFactor_1" name="txtItemUOMFactor_1" class="mgrFormDesign txtItemUOMFactor" maxlength="20" data-dot="0" onkeypress="return isNumber(event);" onchange="isnumberAddComma($(this));">
            </td>
            
            <td class="mgrTdPadTopBot20 mgrPaddingLeft20 mgrPaddingRight20">
                <input style="text-align: right;" placeholder="$1.00" type="text" id="txtItemUOMLatestSellingPrice_1" maxlength="20" name="txtItemUOMLatestSellingPrice_1" class="mgrFormDesign txtItemUOMLatestSellingPrice" data-dot="0" onkeypress="return isNumberPlusComma(event, $(this));" onchange="bindAmountOnChange($(this));">
            </td>
            
            <td class="mgrTdPadTopBot20">                                 
                <input onclick="radioButton(1);" type="radio" class=" mgrRadioButton radBaseUom" id="radBaseUom_1" name="radBaseUom_1" data-checked="0" value="0" >
                <label class="txtStyleSanRegularMgr" for=""><span><span></span></span></label>        
            </td>
            
            <td class="mgrTdPadTopBot20 center" style="padding-bottom: 45px !important">
                <label class="checkBoxMgrContainer">                    
                    <input type="checkbox" class="chkSoldUom" id="chkSoldUom_1" name="chkSoldUom_1" data-checked="0" value="0" checked>
                    <span class="checkmarkMgr"></span>                      
                </label>
            </td>
            
            <td class="mgrTdPadTopBot20 center" style="padding-left: 10px !important;">
                <img onclick="deleteBaseUomRow(1);" src="../../include/mgr/include/images/MGR-LOGO/delete.png" class="logoTheadTableMgr imgRemove" id="imgRemove_1"/>
            </td>
        </tr>
    </tbody>
</table>
<!-- end section -->

<!-- button add item uom section -->
<input type="button" value="Add" id="btnAddItemUomDetails" style="margin-top: 10px;">
<!-- end section -->

<!-- item remarks form section -->

<!-- end section -->
<div class="defaultPosition divFormMGR itemDetailSectionDiv bodyAndFormBorderMGR mgrSpace50">
    <table class="tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr">
        <tr>
            <td class="width20Percentage">
                Remarks 1
            </td>
            
            <td>
                <input type="text" id="txtItemRemarks1" name="txtItemRemarks1" value="${remark1}" class="mgrFormDesign" maxlength="100">
            </td>
        </tr>
        
        <tr>
            <td class="width20Percentage">
                Remarks 2
            </td>
            
            <td>
                <input type="text" id="txtItemRemarks2" name="txtItemRemarks2" value="${remark2}" class="mgrFormDesign" maxlength="100">
            </td>
        </tr>
        
        <tr>
            <td class="width20Percentage">
                Remarks 3
            </td>
            
            <td>
                <input type="text" id="txtItemRemarks3" name="txtItemRemarks3" value="${remark3}" class="mgrFormDesign" maxlength="100">
            </td>
        </tr>
        
        <tr>
            <td class="width20Percentage">
                Remarks 4
            </td>
                        
            <td>
                <input type="text" id="txtItemRemarks4" name="txtItemRemarks4" value="${remark4}" class="mgrFormDesign" maxlength="100">
            </td>
        </tr>
    </table>
    <input type="hidden" id="trLength" name="trLength" value="0"/>
    <input type="hidden" id="businessEntityValue" name="businessEntityValue" value="0">
    <input type="hidden" id="categoryLength" name="categoryLength"> 
    <input type="hidden" id="categoryVal" name="categoryVal" value="0"> 
    <input type="hidden" id="itemTypeVal" name="itemTypeVal" value="0">     
</div> 
