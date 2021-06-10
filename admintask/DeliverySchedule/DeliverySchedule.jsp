<%-- 
    Document   : DeliverySchedule
    Created on : 6 Aug, 2019, 2:56:38 PM
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
        <title>Delivery Schedule</title>
        
        <!-- include link,src file --> 
        <jsp:include page="../include/include.jsp"/>
        
        <!-- css and js -->
        <link rel="stylesheet" href="./include/css/DeliverySchedule.css" type="text/css">
        <script type="text/javascript" src="./include/js/DeliverySchedule.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="message" value="${param.message}" readonly hidden>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
             <jsp:param name="formTitle" value="Delivery Schedule"></jsp:param>
         </jsp:include>
        
        <div class="defaultBodyContent">
            <form method="GET" id="frm" action="DeliverySchedule">
                <table class="tblWdth100">
                    <tr>
                        <td style="width: 11%" class="paddingRight paddingBottom">Business Entity</td>
                        <td style="width: 20%" class="paddingRight paddingBottom">
                            <select id="ddlBusinessEntityId" name="ddlBusinessEntityId">
                                <option value="0" ${business_entity_id eq 0 ? 'selected' : ''}>-- All --</option>
                                <c:forEach items="${listOfMGRCompanyEntities}" var="entity" varStatus="loop">
                                    <option value="${entity.id}" ${business_entity_id eq entity.id ? 'selected' : ''}>
                                        ${entity.name}
                                    </option>
                                </c:forEach>                                
                            </select>
                        </td>
                        
                        <td style="width: 10%" class="paddingRight paddingBottom">
                            Delivery Date
                        </td>
                        
                        <td style="width: 20%" class="paddingRight paddingBottom">
                            <input readonly type="text" id="txtDeliveryDate" name="txtDeliveryDate" class="mgrFormDesign" value="${delivery_date}"/>
                        </td>
                        
                        <td style="width: 5.4%" class="paddingRight paddingBottom">
                            Technician/Driver
                        </td>
                        
                        <td style="width: 20%" class="paddingBottom">
                            <select id="ddlRouteId" name="ddlRouteId">
                                <option value="0" ${route_id eq 0 ? 'selected' : ''}>-- All --</option>
                                <c:forEach items="${listOfDriverOrTechnicianHeaders}" var="route" varStatus="loop">
                                    <option value="${route.id}" ${route_id eq route.id ? 'selected' : ''}>
                                        ${route.driver_or_technician_name}
                                    </option>
                                </c:forEach>
                            </select>
                        </td>
                        
                        <td class="paddingBottom ">
                            <input style="width: 100px;" type="button" id="btnFilter" class="paddingBottom btnMGRStyle mgrFloatRight txtStyleSanRegularMgr" value="Filter"/>
                        </td>
                    </tr>
                </table>
                
                <table id="filter" class="tblWdth100">
                    <tr>
                        <td style="width: 11%" class="paddingBottom">
                            Period
                        </td>
                        
                        <td style="width: 21.2%; float: left" class="paddingBottom">
                            <select id="ddlPeriodId" name="ddlPeriodId">
                                <option value="0" ${delivery_period_id eq 0 ? 'selected' : ''}>-- All --</option>
                                <c:forEach items="${listOfDeliveryPeriodHeaders}" var="period" varStatus="loop">
                                    <option value="${period.id}" ${delivery_period_id eq period.id ? 'selected' : ''}>
                                        ${period.name}
                                    </option>
                                </c:forEach>
                            </select>
                        </td>
                    </tr>
                </table>
            
                <table id="dtServiceSchedule" class="formTable compact hover tableMGRStyle" cellspacing="0" style="bottom: 35px; position: relative !important; overflow: auto !important;">    
                    <thead class="mgrDataTableThead">
                        <tr>
                            <th style="height: 50px !important; border-top-left-radius: 5px; margin-bottom: 20px;" class="mgrTxtAlignLeft mgrPaddingLeft20">
                                Order No.
                            </th>
                            
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">
                                Customer
                            </th>
                            
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">
                                Technician/Driver
                            </th>
                            
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">
                                Order
                            </th>
                            
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">
                                Address
                            </th>
                            
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">
                                Postal Code
                            </th>
                            
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">
                                Contact Person
                            </th>
                            
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">
                                Contact No.
                            </th>
                            
                            <th style="height: 50px !important; border-top-right-radius: 5px" class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">
                                Status
                            </th>
                        </tr>
                    </thead>
                    
                    <tfoot class="mgrDataTableThead">
                        <tr>
                            <th style="height: 50px !important; border-top-left-radius: 5px; margin-bottom: 20px;" class="mgrTxtAlignLeft mgrPaddingLeft20">
                                Order No.
                            </th>
                            
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">
                                Customer
                            </th>
                            
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">
                                Technician/Driver
                            </th>
                            
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">
                                Order
                            </th>
                            
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">
                                Address
                            </th>
                            
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">
                                Postal Code
                            </th>
                            
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">
                                Contact Person
                            </th>
                            
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">
                                Contact No.
                            </th>
                            
                            <th style="height: 50px !important; border-top-right-radius: 5px" class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">
                                Status
                            </th>
                        </tr>
                    </tfoot>
                    
                    <tbody style="background-color: white;">
                        <c:forEach var="deliverySchedule" items="${listOfDeliveryScheduleHeaders}" varStatus="loop">
                            <tr data-row="${loop.count}">
                                <td class="paddingTopBottom mgrPaddingLeft20 ">
                                    ${deliverySchedule.order_or_do_no}
                                </td>

                                <td class="paddingTopBottom mgrPaddingLeft20">
                                    ${deliverySchedule.customerName}
                                </td>

                                <td class="paddingBottom mgrPaddingLeft20 paddingTop">
                                    <c:choose>
                                        <c:when test="${deliverySchedule.status == 'Loaded'}">
                                            ${deliverySchedule.routeName}
                                            <input type="text" id="txtJustDisplay_${loop.count}" class="txtJustDisplay" name="txtJustDisplay_${loop.count}" value="1" readonly hidden>
                                        </c:when>
                                        
                                        <c:when test="${deliverySchedule.status == 'Delivered'}">
                                            ${deliverySchedule.routeName}
                                                <input type="text" id="txtJustDisplay_${loop.count}" class="txtJustDisplay" name="txtJustDisplay_${loop.count}" value="1" readonly hidden>
                                        </c:when>
                                        
                                        <c:when test="${deliverySchedule.postalCode eq '367903'}">
                                            <select id="ddlRouteRowIdAdmin" class="ddlRouteRowId" disabled>
                                            
                                            <c:forEach var="route_row" items="${listOfRouteManagementHeaders}">
                                            <option value="${route_row.id}" ${route_row.id eq deliverySchedule.routeId ? 'selected' : ''}>
                                                ${route_row.routeName}
                                            </option>
                                            </c:forEach>
                                            </select>
                                                </c:when>        
                                        
                                        <c:otherwise>
                                            <select id="ddlRouteRowId_${loop.count}" class="ddlRouteRowId">
                                                <option selected value="0" ${deliverySchedule.routeId eq 0 ? 'selected' : ''} disabled>-- Please Select Technician --</option>
                                                <c:forEach var="route_row" items="${listOfDriverOrTechnicianHeaders}">
                                                    <option value="${route_row.id}" ${route_row.id eq deliverySchedule.routeId ? 'selected' : ''}>
                                                        ${route_row.driver_or_technician_name}
                                                    </option>
                                                </c:forEach>
                                            </select>
                                            <input type="text" id="txtDeliveryScheduleId_${loop.count}" class="txtDeliveryScheduleId" value="${deliverySchedule.id}" readonly hidden>
                                            <input type="text" id="txtDOId_${loop.count}" class="txtDOId" value="${deliverySchedule.delivery_order_id}" readonly hidden>    
                                            <input type="text" id="txtJustDisplay_${loop.count}" class="txtJustDisplay" value="0" readonly hidden>
                                        </c:otherwise>
                                    </c:choose>               
                                </td>

                                <td class="paddingTopBottom mgrPaddingLeft20" style="text-align: right;">
                                    ${loop.count}
                                </td>

                                <td class="paddingTopBottom mgrPaddingLeft20 ">
                                    ${deliverySchedule.address}
                                </td>

                                <td class="paddingTopBottom mgrPaddingLeft20 ">
                                    ${deliverySchedule.postalCode}
                                </td>

                                <td class="paddingTopBottom mgrPaddingLeft20 ">
                                    ${deliverySchedule.contactPerson}
                                </td>

                                <td class="paddingTopBottom mgrPaddingLeft20 ">
                                    ${deliverySchedule.contactNo}
                                </td>

                                <td class="paddingTopBottom mgrPaddingLeft20 mgrPaddingRight20">
                                    ${deliverySchedule.status}
                                </td>
                            </tr>                            
                        </c:forEach>                                                
                    </tbody>
                </table>
                                
                <table id="dtServiceScheduleHidden" hidden>
                    
                </table>
                
               <input type="hidden" value="0" id="txtTotalDeliverySchedules" name="txtTotalDeliverySchedules">
            </form>                
            <input type="button" id="btnUpdateDeliverySchedule" class="update mgrFloatRight txtStyleSanRegularMgr" value="Update" style="position: relative; top: 40px; margin-bottom: 30px;">                
        </div>        
    </body>
</html>
