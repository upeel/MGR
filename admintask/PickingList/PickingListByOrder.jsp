<%-- 
    Document   : PickingList
    Created on : 8 Jul, 2019, 5:14:52 PM
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
        <title>Picking List</title>
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/PickingListByOrder.css" type="text/css">
        <script type="text/javascript" src="./include/js/PickingListByOrder.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="message" value="${param.message}" readonly hidden>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Picking List By Order"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">
            <form id="frm" method="POST" action="PickingListByOrder">
                <table style="width: 100%;" class="mgrSpace20">
                    <input type="text" id="txtPickingListHeaderId" name="txtPickingListHeaderId" value="${pickingList.pickingListHeader.id}" hidden>
                    <input type="text" id="txtStatus" name="txtStatus" value="${pickingList.pickingListHeader.status}" hidden>
                    <tr>
                        <td class="txtStyleSanRegularMgr">
                            Business Entity
                        </td>
                        
                        <td>
                            <input type="text" value="${pickingList.pickingListHeader.entity_name}" class="mgrFormDesign" readonly>
                        </td>
                        
                        <td class="txtStyleSanRegularMgr">
                            Required Date
                        </td>
                        
                        <td>
                            <input type="text" id="txtRequiredDate" name="txtRequiredDate" value="${pickingList.pickingListHeader.required_date}" class="mgrFormDesign" readonly>
                        </td>
                        
                        <td class="txtStyleSanRegularMgr">
                            Driver / Technician
                        </td>
                        
                        <td>
                            <input type="text" class="mgrFormDesign" value="${pickingList.pickingListHeader.delivery_or_technician_name}" readonly>
                        </td>
                    </tr>
           
                </table>
            
                <table id="tblPickingList" class="txtStyleSanRegularMgr defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0">
                    <thead class="mgrDataTableThead">
                        <tr>
                            <th class="mgrTdPadTopBot20 mgrThead2FontSize mgrTxtAlignLeft mgrPaddingLeft20" style="border-bottom: 1px solid #ffffff; width: 10%;">
                                Order No
                            </th>
                            
                            <th class="mgrTdPadTopBot20 mgrThead2FontSize mgrTxtAlignLeft mgrPaddingLeft20" style="border-bottom: 1px solid #ffffff; width: 15%;">
                                Customer
                            </th>
                            
                            <th colspan="2" class="mgrTdPadTopBot20 mgrThead2FontSize mgrPaddingLeft20 mgrPaddingRight20" style="border-bottom: 1px solid #ffffff;">
                                Total Count
                            </th>
                            
                            <th class="mgrTdPadTopBot20 mgrThead2FontSize mgrTxtAlignLeft mgrPaddingLeft20" style="width: 18%; border-bottom: 1px solid #ffffff;">
                                Items
                            </th>
                            
                            <th class="mgrTdPadTopBot20 mgrThead2FontSize mgrTxtAlignLeft mgrPaddingLeft20" style="width: 20%; border-bottom: 1px solid #ffffff;">
                                Remarks
                            </th>
                            
                            <th colspan="2" class="mgrTdPadTopBot20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff;">
                                Amount Breakdown
                            </th>
                            
                            <th class="mgrTdPadTopBot20 mgrThead2FontSize mgrPaddingRight20 mgrPaddingLeft20" style="border-bottom: 1px solid #ffffff;">
                                Job Done
                            </th>
                        </tr>
                        
                        <tr>
                            <th class="mgrTdPadTopBot20 mgrThead2FontSize mgrTxtAlignLeft mgrPaddingLeft20" style="border-bottom: 1px solid #ffffff;">
                                
                            </th>
                            
                            <th class="mgrTdPadTopBot20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff;">

                            </th>
                            
                            <th class="mgrTdPadTopBot20 mgrThead2FontSize mgrTxtAlignLeft mgrPaddingLeft20" style="width: 5%; border-bottom: 1px solid #ffffff;">
                                Ordered
                            </th>
                            
                            <th class="mgrTdPadTopBot20 mgrThead2FontSize mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20" style="width: 5%; border-bottom: 1px solid #ffffff;">
                                Complete
                            </th>
                            
                            <th class="mgrTdPadTopBot20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff;">

                            </th>
                            
                            <th class="mgrTdPadTopBot20 mgrThead2FontSize" style="border-bottom: 1px solid #ffffff;">

                            </th>
                            
                            <th class="mgrTdPadTopBot20 mgrThead2FontSize mgrTxtAlignLeft mgrPaddingLeft20" style="width: 7%; border-bottom: 1px solid #ffffff;">
                                Ordered
                            </th>
                            
                            <th class="mgrTdPadTopBot20 mgrThead2FontSize mgrTxtAlignLeft mgrPaddingLeft20" style="width: 7%; border-bottom: 1px solid #ffffff;">
                                Picked
                            </th>
                            
                            <th class="mgrTdPadTopBot20 mgrThead2FontSize mgrTxtAlignLeft" style="border-bottom: 1px solid #ffffff;">
                                
                            </th>
                        </tr>
                    </thead>
                    
                    <tbody class="bgWhite">                  
                        <tr>
                            <td rowspan="${fn:length(pickingList.listOfPickingListDetails)}" class="mgrTdPaddingTopTable5 mgrPaddingLeft20">
                                <c:out value="${pickingList.pickingListHeader.orderNo}"/>
                            </td>
                            
                            <td rowspan="${fn:length(pickingList.listOfPickingListDetails)}" class="mgrTdPaddingTopTable5 mgrPaddingLeft20">
                               <c:out value="${pickingList.pickingListHeader.customerName}"/>
                            </td>
                            
                            <td rowspan="${fn:length(pickingList.listOfPickingListDetails)}" class="mgrTdPaddingTopTable5 mgrPaddingLeft20" style="text-align: right;">
                                ${pickingList.pickingListHeader.ordered_quantity}
                            </td>
                            
                            <td rowspan="${fn:length(pickingList.listOfPickingListDetails)}" class="mgrTdPaddingTopTable5 mgrPaddingLeft20 mgrPaddingRight20" style="border-right: 1px solid #b7b7b7; text-align: right;">
                                ${pickingList.pickingListHeader.complete_quantity}
                            </td>
                            
                            <td colspan="5">
                                <table id="pickingListByOrderTable" style="width: 100%">
                                    <c:forEach items="${pickingList.listOfPickingListDetails}" var="pickingListByOrder" varStatus="loop">
                                        <tr>
                                            <input type="text" hidden id="pickingListItemDetailId_${loop.count}" name="pickingListItemDetailId_${loop.count}" value="${pickingListByOrder.id}">
                                            <input type="text" hidden id="orderItemId_${loop.count}" name="orderItemId_${loop.count}" value="${pickingListByOrder.order_item_id}">

                                            <td class="mgrTdPaddingTopTable5 mgrPaddingLeft20 mgrEachItemPickingBorderBottom" style="width: 25%">
                                                <c:out value="${pickingListByOrder.itemName}"/>
                                            </td>

                                            <td class="mgrTdPaddingTopTable5 mgrPaddingLeft20 mgrEachItemPickingBorderBottom" style="width: 35%">
                                                <input type="text" id="txtPickingRemarks_${loop.count}" name="txtPickingRemarks_${loop.count}" class="mgrFormDesign" maxlength="100"
                                                       value="${pickingListByOrder.remarks}">
                                            </td>

                                            <td class="mgrTdPaddingTopTable5 mgrPaddingLeft20 mgrEachItemPickingBorderBottom" style="width: 14%; padding-left: 35px;">${pickingListByOrder.ordered_quantity} ${pickingListByOrder.uom}</td>

                                            <td class="mgrTdPaddingTopTable5 mgrPaddingLeft20 mgrEachItemPickingBorderBottom" style="width: 14%;">
                                                <input type="text" id="txtPickedQuantity_${loop.count}" name="txtPickedQuantity_${loop.count}" value="${pickingListByOrder.picked_quantity}" class="mgrFormDesign" 
                                                       style="width:50%; text-align: right;" onkeypress="return pickedQuantityKeyPress(event);">
                                                <input type="hidden" id="orderedQty_${loop.count}" value="${pickingListByOrder.ordered_quantity}" readonly> 
                                                ${pickingListByOrder.uom}
                                            </td>

                                            <td class="mgrTdPaddingTopTable5 mgrPaddingRight20 mgrEachItemPickingBorderBottom" style="width: 10%">
                                                <label class="checkBoxMgrContainer">
                                                    <input type="checkbox" id="chkJobDone_${loop.count}" class="chkPickingList" name="chkJobDone_${loop.count}" value="${pickingListByOrder.job_done}" ${pickingListByOrder.job_done eq 1 ? 'checked' : ""} onclick="checkboxOnClick(${loop.count})" >
                                                    <span class="checkmarkMgr"></span>
                                                </label>
                                            </td>
                                        </tr>
                                    </c:forEach>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                    <input type="text" id="rowLength" name="rowLength" value="${fn:length(pickingList.listOfPickingListDetails)}" readonly hidden>
                </table>
                
                <!-- button container -->
                <div class="mgrSpace100">
                    <input type="button" id="btnUpdatePickingList" class="mgrFloatRight" value="Update">
                </div>
                <!-- end section -->
            </form>            
        </div>
    </body>
</html>
