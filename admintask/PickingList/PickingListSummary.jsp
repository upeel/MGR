<%-- 
    Document   : PickingListSummary
    Created on : 12 Jul, 2019, 5:27:48 PM
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
        <title>Picking List Summary</title>
        
        <!-- include link,src file --> 
        <jsp:include page="../include/include.jsp"/>
        
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/PickingListSummary.css" type="text/css">
        <script type="text/javascript" src="./include/js/PickingListSummary.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Picking List Summary"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">
            <form id="frm" method="GET" action="PickingList">
                <table style="width: 100%" class="mgrSpace20">
                    <tr>
                        <td>
                            Business Entity
                        </td>
                        
                        <td style="width: 20%;">
                            <select id="ddlBusinessEntityId" name="ddlBusinessEntityId">
                                <option value="0" ${business_entity_id eq 0 ? 'selected' : ''}>
                                    All
                                </option>
                                <c:forEach items="${listOfCompanies}" var="company" varStatus="loop">
                                    <option value="${company.id}" ${business_entity_id eq company.id ? 'selected' : ''}>
                                        ${company.name}
                                    </option>
                                </c:forEach>
                            </select>
                        </td>
                        
                        <td>
                            Required Date
                        </td>
                        
                        <td>
                            <input type="text" id="txtRequiredDate" name="txtRequiredDate" value="${required_date}" class="mgrFormDesign" readonly>
                        </td>
                        
                        <td>
                            Driver / Technician 
                        </td>
                        
                        <td style="width: 20%;">
                            <select id="ddlDriverOrTechnicianId" name="ddlDriverOrTechnicianId">
                                <option value="0" ${driver_tech_id eq 0 ? 'selected' : ''}>
                                   All
                                </option>
                                <c:forEach items="${listOfDrivers}" var="drivers" varStatus="loop">
                                    <option value="${drivers.id}" ${driver_tech_id eq drivers.id ? 'selected' : ''}>
                                        ${drivers.driver_or_technician_name}
                                    </option>
                                </c:forEach>
                            </select>
                        </td>
                        
                        <td>
                            <input type="button" id="btnFilterPickingList" class="btnMGRStyle" value="Filter">
                        </td>
                    </tr>
                </table>
                
                <table id="dtPickingListSummary" class="formTable compact hover tableMGRStyle">
                    <thead class="mgrDataTableThead">
                        <tr>
                            <th class="mgrTxtAlignLeft">No.</th>
                            <th class="mgrTxtAlignLeft">Order No.</th>
                            <th class="mgrTxtAlignLeft">Picking List No.</th>
                            <th class="mgrTxtAlignLeft">Customer</th>
                            <th class="mgrTxtAlignLeft">Client Ref</th>
                            <th class="mgrTxtAlignLeft">Required Date</th>
                            <th class="mgrTxtAlignLeft">Total Item</th>
                            <th class="mgrTxtAlignLeft">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach items="${listOfPickingList}" var="pickingList" varStatus="loop">
                            <tr onclick="fnOpenPopUpWindow('Picking List By Order', 'PickingListByOrder?pickingListId='+${pickingList.id})">
                                <td><c:out value="${loop.count}"/>.</td>
                                <td><c:out value="${pickingList.orderNo}"/></td>
                                <td><c:out value="${pickingList.pickingListNo}"/></td>
                                <td><c:out value="${pickingList.customerName}"/></td>
                                <td><c:out value="${pickingList.clientRefNo}"/></td>
                                <td><c:out value="${pickingList.required_date}"/></td>
                                <td style="text-align: right;"><c:out value="${pickingList.ordered_quantity}"/></td>
                                <td><c:out value="${pickingList.status}"/></td>
                            </tr>
                        </c:forEach>
                    </tbody>
                    
                    <tfoot>
                        <tr>
                            <th>No.</th>
                            <th>Order No.</th>
                            <th>Picking List No.</th>
                            <th>Customer</th>
                            <th>Client Ref</th>
                            <th>Required Date</th>
                            <th>Total Item</th>
                            <th>Status</th>
                        </tr>
                    </tfoot>
                </table>
            </form>
        </div>
    </body>
</html>

