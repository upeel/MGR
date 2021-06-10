<%-- 
    Document   : OrderList
    Created on : 5 Jul, 2019, 9:39:00 AM
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
        <title>Order List</title>
        
        <!-- include link,src file --> 
        <jsp:include page="../include/include.jsp"/>
        
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/OrderList.css" type="text/css">
        <script type="text/javascript" src="./include/js/OrderList.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Order List"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">            
            <form id="frm" method="GET" action="OrderList">
                <table style="width: 50%">
                    <tr>
                        <td class="txtStyleSanRegularMgr" style="width: 10%;">
                           Date From
                        </td>
                        <td style ="width: 25%;">
                            <input type="text" class="mgrFormDesign" id="startDate" name="txtDateFrom" value="<javatime:format value="${dateFrom}" pattern="dd/MM/yyyy" />" autocomplete="off">
                        </td>
                        <td class="txtStyleSanRegularMgr" style="width: 8%;margin-left: 20px !important">
                           Date To
                        </td>
                        <td style ="width: 25%;">
                            <input type="text" class="mgrFormDesign" id="endDate" name="txtDateTo" value="<javatime:format value="${dateTo}" pattern="dd/MM/yyyy" />" autocomplete="off">
                        </td>
                    </tr>
                </table>
                <table style="width: 50%;">
                    <tr>
                        <td class="txtStyleSanRegularMgr" style="width: 20%;">
                            Business Entity
                        </td>

                        <td style="width: 50%;">
                            <select id="ddlEntity" name="ddlEntity">
                                <option value="0" ${business_entity_id eq 0 ? 'selected' : ''}>All</option>
                                <c:forEach items="${listOfUserLoggedEntities}" var="entity" varStatus="loop">
                                    <option value="${entity.id}" ${entity.id == business_entity_id ? 'selected' : ''}>${entity.name}</option>
                                </c:forEach>
                            </select>
                        </td>

                        <td style="width: 10%;">
                            <input type="button" value="Filter" id="btnFilterOrderList" class="btnMGRStyle">
                        </td>

                        <td style="width: 10%;">
                            <input type="button" value="New" id="btnAddNewOrderList" class="btnMGRStyle"> 
                        </td>
                    </tr>
                    
                </table>
            </form>
                                    
            <table id="dtOrderListList" class="formTable compact hover tableMGRStyle" style="bottom: 20px; position: relative !important;">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th hidden></th>
                        <th class="mgrTxtAlignLeft">No.</th>
                        <th class="mgrTxtAlignLeft">Order No.</th>
                        <th class="mgrTxtAlignLeft">Order Date</th>
                        <th class="mgrTxtAlignLeft">Customer</th>
                        <th class="mgrTxtAlignLeft">Client Ref</th>
                        <th class="mgrTxtAlignLeft">Order Type</th>
                        <th class="mgrTxtAlignLeft">Required Date</th>
                        <th class="mgrTxtAlignLeft">Status</th>
                    </tr>
                </thead>      
                
                <tfoot style="display: none !important;">
                    <tr>
                        <th hidden></th>
                        <th class="mgrTxtAlignLeft">No.</th>
                        <th class="mgrTxtAlignLeft">Order No.</th>
                        <th class="mgrTxtAlignLeft">Order Date</th>
                        <th class="mgrTxtAlignLeft">Customer</th>
                        <th class="mgrTxtAlignLeft">Client Ref</th>
                        <th class="mgrTxtAlignLeft">Order Type</th>
                        <th class="mgrTxtAlignLeft">Required Date</th>
                        <th class="mgrTxtAlignLeft">Status</th>
                    </tr>
                </tfoot>                
                <tbody>
                    <c:forEach items="${listOfOrderEntries}" var="orderList" varStatus="loop">
                        <tr onclick="fnOpenPopUpWindow('OrderEntryExist', 'OrderEntry?order_id='+${orderList.id})">
                            <td hidden>
                                <input type="hidden" id="txtOrderListId" name="txtOrderListId" value="${orderList.id}">
                            </td>
                            
                            <td>
                                ${loop.count}.
                            </td>
                            
                            <td>
                                ${orderList.order_no}
                            </td>
                            
                            <td>
                                ${orderList.order_date}
                            </td>
                            
                            <td>
                                ${orderList.customer_name}
                            </td>
                            
                            <td>
                                ${orderList.client_reference_no}
                            </td>
                            
                            <td>
                                ${orderList.order_type_name}
                            </td>
                            
                            <td>
                                ${orderList.required_date}
                            </td>
                            
                            <td>
                                ${orderList.status}
                            </td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
    </body>
</html>
