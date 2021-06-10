<%-- 
    Document   : DeliveryOrderList
    Created on : 8 Jul, 2019, 5:05:53 PM
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
        <title>Delivery List</title>
        
        <!-- include link,src file --> 
        <jsp:include page="../include/include.jsp"/>
        
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/DeliveryOrderList.css" type="text/css">
        <script type="text/javascript" src="./include/js/DeliveryOrderList.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Delivery List"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">
            <form id="frm" method="GET" action="DeliveryOrderList">
                <table style="width: 50%">
                    <tr>
                        <td class="txtStyleSanRegularMgr" style="width: 10%;">
                           Date From
                        </td>
                        <td style ="width: 25%;">
                            <input type="text" class="mgrFormDesign" id="startDate" name="txtDateFrom" value="<javatime:format value="${dateFrom}" pattern="dd/MM/yyyy" />" autocomplete="off">
                        </td>
                        <td class="txtStyleSanRegularMgr" style="width: 8%;">
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
                                <option value="0" ${business_entity_id eq 0 ? 'selected' : ''}>ALL</option>
                                <c:forEach items="${listOfUserLoggedEntities}" var="entity" varStatus="loop">
                                    <option value="${entity.id}" ${entity.id eq business_entity_id ? 'selected' : ''}>${entity.name}</option>
                                </c:forEach>
                            </select>
                        </td>

                        <td style="width: 10%;">
                            <input type="button" value="Filter" id="btnFilterDeliveryList" class="btnMGRStyle">
                        </td>

                        <td style="width: 10%;">
                            <input type="button" value="New" id="btnAddNewDelivery" class="btnMGRStyle"> 
                        </td>
                    </tr>
                </table>
            </form>
                
            <table id="dtDeliveryList" class="formTable compact hover tableMGRStyle" style="bottom: 20px; position: relative !important;">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th class="mgrTxtAlignLeft">No.</th>
                        <th class="mgrTxtAlignLeft">DO No.</th>
                        <th class="mgrTxtAlignLeft">DO Date</th>
                        <th class="mgrTxtAlignLeft">Customer</th>
                        <th class="mgrTxtAlignLeft">Order No.</th>
                        <th class="mgrTxtAlignLeft">Driver / Technician</th>
                        <th class="mgrTxtAlignLeft">Status</th>
                    </tr>
                </thead>

                <tfoot style="display: none !important;">
                    <tr>
                        <th class="mgrTxtAlignLeft">No.</th>
                        <th class="mgrTxtAlignLeft">DO No.</th>
                        <th class="mgrTxtAlignLeft">DO Date</th>
                        <th class="mgrTxtAlignLeft">Customer</th>
                        <th class="mgrTxtAlignLeft">Order No.</th>
                        <th class="mgrTxtAlignLeft">Driver / Technician</th>
                        <th class="mgrTxtAlignLeft">Status</th>
                    </tr>
                </tfoot>
                
                <tbody>
                    <c:forEach items="${listOfDeliveryOrders}" var="DO" varStatus="loop">
                        <tr onclick="fnOpenPopUpWindow('Delivery Order', 'DeliveryOrder?do_id='+${DO.id})">
                            <td>${loop.count}.</td>
                            <td>${DO.do_number}</td>
                            <td>${DO.do_date}</td>
                            <td>${DO.customer_name}</td>
                            <td>${DO.order_no}</td>
                            <td>${DO.driver_or_technician_name}</td>
                            <td>${DO.status}</td>
                        </tr>
                    </c:forEach>
                </tbody>

            </table>          
        </div>
    </body>
</html>
