<%-- 
    Document   : ServicingReport
    Created on : 15 Nov, 2019, 1:35:26 PM
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
        <title>Servicing Report</title>
        
        <!-- include link,src file --> 
        <jsp:include page="../include/include.jsp"/>
        
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/Report.css" type="text/css">
        <script type="text/javascript" src="./include/js/ServicingReport.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Servicing Report"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">
            <form id="frm" method="GET" action="ServicingReport">
                <table>
                    <tr>
                        <td class="txtStyleSanRegularMgr" style="width: 20%;">
                            Business Entity
                        </td>

                        <td style="width: 25%;">
                            <select id="ddlEntity" name="ddlEntity">
                                <option value="0" ${business_entity_id eq 0 ? 'selected' : ''}>All</option>
                                <c:forEach items="${listOfUserLoggedEntities}" var="entity" varStatus="loop">
                                    <option value="${entity.id}" ${business_entity_id eq entity.id ? 'selected' : ''}>${entity.name}</option>
                                </c:forEach>
                            </select>
                        </td>
                        <td style="width: 10%;"></td>
                        <td class="txtStyleSanRegularMgr" style="width: 20%">
                            Customer
                        </td>
                        <td style="width: 25%">
                            <select id="ddlCustomer" name="ddlCustomer">
                                <option value="All">All</option>
                                <c:forEach items="${listOfCustName}" var="cust">
                                    <option value="${cust.customerName}" ${param.ddlCustomer eq cust.customerName ? 'selected' : ''}>${cust.customerName}</option>
                                </c:forEach>
                            </select>
                        </td>
                        <td style="width: 10%;"></td>
                        <td style="width: 20%;">
                            <input type="button" value="Filter" id="btnFilter" class="btnMGRStyle">
                        </td>
                    </tr>
                    <tr>
                        <td class="txtStyleSanRegularMgr" style="width: 20%">
                            Issue
                        </td>
                        <td style="width: 25%">
                            <select id="ddlIssue" name="ddlIssue">
                                <option value="All">All</option>
                                <c:forEach items="${listOfIssue}" var="issue">
                                    <option value="${issue.name}" ${issue.name eq param.ddlIssue ? 'selected' : ''}>${issue.name}</option>
                                </c:forEach>
                            </select>
                        </td>
                        <td style="width: 10%;"></td>
                        <td class="txtStyleSanRegularMgr" style="width: 20%">
                            Technician
                        </td>
                        <td style="width: 25%">
                            <select id="ddlTech" name="ddlTech">
                                <option value="0">All</option>
                                <c:forEach items="${listOfDriverOrTechnicianHeaders}" var="tech">
                                    <option value="${tech.id}" ${tech.id eq param.ddlTech ? 'selected' : ''}>${tech.driver_or_technician_name}</option>
                                </c:forEach>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="txtStyleSanRegularMgr" style="width: 20%">
                            Machine Model
                        </td>
                        <td style="width: 25%">
                            <select id="ddlModel" name="ddlModel">
                                <option value="All">All</option>
                                <c:forEach items="${listOfMachineModel}" var="model">
                                    <option value="${model.name}" ${model.name eq param.ddlModel ? 'selected' : ''}>${model.name}</option>
                                </c:forEach>
                            </select>
                        </td>
                        <td style="width: 10%;"></td>
                        <td class="txtStyleSanRegularMgr" style="width: 20%">
                            Machine S/N
                        </td>
                        <td style="width: 25%">
                            <select id="ddlSerial" name="ddlSerial">
                                <option value="All">All</option>
                                <c:forEach items="${listOfSerial}" var="serial">
                                    <option value="${serial.name}" ${serial.name eq param.ddlSerial ? 'selected' : ''}>${serial.name}</option>
                                </c:forEach>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="txtStyleSanRegularMgr" style="width: 20%;">
                          Invoice Date From
                        </td>
                        <td style ="width: 25%;">
                            <input type="text" class="mgrFormDesign" id="startDate" name="txtDateFrom" value="<javatime:format value="${dateFrom}" pattern="dd/MM/yyyy" />" autocomplete="off">
                        </td>
                        <td style="width: 10%;"></td>
                        <td class="txtStyleSanRegularMgr" style="width: 20%;">
                          Invoice Date To
                        </td>
                        <td style ="width: 25%;">
                            <input type="text" class="mgrFormDesign" id="endDate" name="txtDateTo" value="<javatime:format value="${dateTo}" pattern="dd/MM/yyyy" />" autocomplete="off">
                        </td>
                    </tr>
                </table>
            </form>
            
            <table id="dtServicingReport" class="formTable compact hover tableMGRStyle" style="top: 10px; position: relative !important;">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th class="mgrTxtAlignLeft">#</th>
                        <th class="mgrTxtAlignLeft">Service Date</th>
                        <th class="mgrTxtAlignLeft">Ticket No</th>
                        <th class="mgrTxtAlignLeft">Issue</th>
                        <th class="mgrTxtAlignLeft">Job No.</th>
                        <th class="mgrTxtAlignLeft">Technician</th>
                        <th class="mgrTxtAlignLeft">Customer</th>
                        <th class="mgrTxtAlignLeft">Model</th>
                        <th class="mgrTxtAlignLeft">Serial</th>
                        <th class="mgrTxtAlignLeft">Start</th>
                        <th class="mgrTxtAlignLeft">End</th>
                    </tr>
                </thead>
                
                <tbody>
                    <c:forEach items="${listOfServicingReport}" var="servicing" varStatus="loop">
                        <tr>
                            <td>${loop.count}.</td>
                            <td>${servicing.serviceDate}</td>
                            <td><a onclick="fnOpenPopUpWindow('Service Call Print Page', '../ServiceCall/ServiceCallPrintPage?service_call_id=${servicing.serviceCallId}')">${servicing.ticketNo}</a></td>
                            <td>${servicing.issue}</td>
                            <td><a onclick="fnOpenPopUpWindow('Service Report Print Page', '../ServiceReport/ServiceReportPrintPage?service_report_id=${servicing.serviceReportId}')">${servicing.jobNo}</a></td>
                            <td>${servicing.technician}</td>
                            <td>${servicing.customer}</td>
                            <td>${servicing.model}</td>
                            <td>${servicing.serial}</td>
                            <td>${servicing.start}</td>
                            <td>${servicing.end}</td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
    </body>
</html>
