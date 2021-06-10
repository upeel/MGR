<%-- 
    Document   : ServiceCallManagement
    Created on : 7 Aug, 2019, 2:49:38 PM
    Author     : Wildan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://sargue.net/jsptags/time" prefix="javatime" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%@ page import="com.bizmann.utility.Version" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
        <title>Service Call Management</title>
        
        <jsp:include page="../include/include.jsp"/>
        
        <!-- CSS JS -->
        <link href="include/css/ServiceCallManagement.css?v=${Version.VERSION}" rel="stylesheet" type="text/css"/>    
        <script src="include/js/ServiceCallManagement.js?v=${Version.VERSION}" type="text/javascript"></script>
        
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <style>
            #dtServiceCall_length{
                display: none !important;
            }
        </style>
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Service Call Management"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">
            
            <form id="frm" method="GET" action="ServiceCallManagement">
                <table>
                    <tr>
                        <td class="txtStyleSanRegularMgr" style="width: 15%;">
                           Date From
                        </td>
                        <td style ="width: 25%;">
                            <input type="text" class="mgrFormDesign" id="startDate" name="txtDateFrom" value="<javatime:format value="${dateFrom}" pattern="dd/MM/yyyy" />" autocomplete="off">
                        </td>
                        <td style="width: 7%"></td>
                        <td class="txtStyleSanRegularMgr" style="width: 10%;">
                           Date To
                        </td>
                        <td style ="width: 25%;">
                            <input type="text" class="mgrFormDesign" id="endDate" name="txtDateTo" value="<javatime:format value="${dateTo}" pattern="dd/MM/yyyy" />" autocomplete="off">
                        </td>
                        <td style="width: 7%"></td>
                        <td style="width: 8%;">
                            <input type="button" value="Filter" id="btnFilterServiceCallList" class="btnMGRStyle">
                        </td>
                    </tr>
                    <tr>
                        <td class="txtStyleSanRegularMgr" style="width: 15%; padding-left: 0;">
                            Status
                        </td>

                        <td style="width: 25%;">
                            <select id="ddlStatus" name="ddlStatus" class="txtStyleSanRegularMgr">
                                <option value="All" ${param.ddlStatus eq 'ALL' ? 'selected' : ''} selected>All</option>
                                <option value="Terminated" ${param.ddlStatus eq 'Terminated' ? 'selected' : ''}>Terminated</option>
                                <option value="Ongoing" ${param.ddlStatus eq 'Ongoing' ? 'selected' : ''}>Confirmed</option>
                                <option value="Reported" ${param.ddlStatus eq 'Reported' ? 'selected' : ''}>Reported</option>
                                <option value="Completed" ${param.ddlStatus eq 'Completed' ? 'selected' : ''}>Completed</option>
                            </select>
                        </td>
                        <td style="width: 7%"></td>
                        <td class="txtStyleSanRegularMgr" style="width: 15%">
                            Technician
                        </td>
                        <td style="width: 25%">
                            <select id="ddlTech" name="ddlTech" class="txtStyleSanRegularMgr">
                                <option value="All">All</option>
                                <c:forEach items="${listOfDriverOrTechnicianHeaders}" var="technician">
                                    <option value="${technician.id}">${technician.driver_or_technician_name}</option>
                                </c:forEach>
                            </select>
                        </td>
                        <td style="width: 7%"></td>
                        <c:if test="${ouName ne 'Engineer'}">
                            <td style="width: 8%">
                            <input type="button" value="New Service Call" id="btnNewServiceCall" class="btnMGRStyle">
                        </td>
                        </c:if>
                        <c:if test="${ouName eq 'Engineer'}">
                            <td style="width: 8%">
                            <input type="button" value="New Service Report" id="btnNewServiceR" class="btnMGRStyle">
                        </c:if>

                    </tr>
                </table>
            </form>
                                    
            <table id="dtServiceCall" class="formTable compact hover tableMGRStyle" style="bottom: 20px; top: 10px; position: relative !important;">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th class="mgrTxtAlignLeft">#</th>
                        <th class="mgrTxtAlignLeft">Ticket #</th>
                        <th class="mgrTxtAlignLeft">Date</th>
                        <th class="mgrTxtAlignLeft">Customer</th>
                        <th class="mgrTxtAlignLeft">Contract Ref No.</th>
                        <th class="mgrTxtAlignLeft">Job No.</th>
                        <th class="mgrTxtAlignLeft">Model</th>
                        <th class="mgrTxtAlignLeft">S/N</th>
                        <th class="mgrTxtAlignLeft">Technician</th>
                        <th class="mgrTxtAlignLeft">Status</th>
                        <th class="mgrTxtAlignLeft">Service Report</th>
                    </tr>
                </thead>      
                
                <tfoot style="display: none !important;">
                    <tr>
                        <th class="mgrTxtAlignLeft">#</th>
                        <th class="mgrTxtAlignLeft">Ticket #</th>
                        <th class="mgrTxtAlignLeft">Date</th>
                        <th class="mgrTxtAlignLeft">Customer</th>
                        <th class="mgrTxtAlignLeft">Contract Ref No.</th>
                        <th class="mgrTxtAlignLeft">Job No.</th>
                        <th class="mgrTxtAlignLeft">Model</th>
                        <th class="mgrTxtAlignLeft">S/N</th>
                        <th class="mgrTxtAlignLeft">Technician</th>
                        <th class="mgrTxtAlignLeft">Status</th>
                        <th class="mgrTxtAlignLeft">Service Report</th>
                    </tr>
                </tfoot>
                
                <tbody>
                    <c:forEach var="serviceCallHeader" items="${serviceCallList}" varStatus="loop">
                        <c:choose>           
                        <c:when test="${serviceCallHeader.status eq 'Reported'}">
                          <tr onclick="fnOpenPopUpWindow('Service Call Confirmation', 'ServiceCallAdmin?serviceCallId='+${serviceCallHeader.id})">
                            <td>${loop.count}.</td>
                            <td>${serviceCallHeader.ticketNo}</td>
                            <td>${serviceCallHeader.date}</td>
                            <td>${serviceCallHeader.companyName}</td>
                            <td>${serviceCallHeader.referenceNo}</td>
                            <td>${serviceCallHeader.job_no_comma}</td>
                            <td>${serviceCallHeader.machineModel}</td>
                            <td>${serviceCallHeader.serialNo}</td>
                            <td>${serviceCallHeader.technician_comma}</td>
                            <td>${serviceCallHeader.status}</td>
                            <td></td>
                          </tr>
                        </c:when>
                        <c:when test="${serviceCallHeader.status eq 'Ongoing'}">
                            <tr>
                            <td onclick="fnOpenPopUpWindow('Service Call Confirmation', 'ServiceCallPrintPage?service_call_id='+${serviceCallHeader.id})">${loop.count}.</td>
                            <td onclick="fnOpenPopUpWindow('Service Call Confirmation', 'ServiceCallPrintPage?service_call_id='+${serviceCallHeader.id})">${serviceCallHeader.ticketNo}</td>
                            <td onclick="fnOpenPopUpWindow('Service Call Confirmation', 'ServiceCallPrintPage?service_call_id='+${serviceCallHeader.id})">${serviceCallHeader.date}</td>
                            <td onclick="fnOpenPopUpWindow('Service Call Confirmation', 'ServiceCallPrintPage?service_call_id='+${serviceCallHeader.id})">${serviceCallHeader.companyName}</td>
                            <td onclick="fnOpenPopUpWindow('Service Call Confirmation', 'ServiceCallPrintPage?service_call_id='+${serviceCallHeader.id})">${serviceCallHeader.referenceNo}</td>
                            <td onclick="fnOpenPopUpWindow('Service Call Confirmation', 'ServiceCallPrintPage?service_call_id='+${serviceCallHeader.id})">${serviceCallHeader.job_no_comma}</td>
                            <td onclick="fnOpenPopUpWindow('Service Call Confirmation', 'ServiceCallPrintPage?service_call_id='+${serviceCallHeader.id})">${serviceCallHeader.machineModel}</td>
                            <td onclick="fnOpenPopUpWindow('Service Call Confirmation', 'ServiceCallPrintPage?service_call_id='+${serviceCallHeader.id})">${serviceCallHeader.serialNo}</td>
                            <td onclick="fnOpenPopUpWindow('Service Call Confirmation', 'ServiceCallPrintPage?service_call_id='+${serviceCallHeader.id})">${serviceCallHeader.technician_comma}</td>
                            <td onclick="fnOpenPopUpWindow('Service Call Confirmation', 'ServiceCallPrintPage?service_call_id='+${serviceCallHeader.id})">${serviceCallHeader.status}</td>
                            <c:choose>
                            <c:when test="${serviceCallHeader.DOStatus eq 'Complete'}">
                                <td><input type="button" value="View" class="btnMGRStyle" id="btnView" onclick="fnOpenPopUpWindow('Service Report', './../ServiceReport/ServiceReport?service_report_id=${serviceCallHeader.serviceReportId}&&orgunit=${ouName}')"></td>
                            </c:when>
                            <c:otherwise>
                                <td><input type="button" value="View" class="btnMGRStyle" id="btnView" onclick="fnOpenPopUpWindow('Service Report', './../ServiceReport/ServiceReportManual?serviceCallId=${serviceCallHeader.id}&&orgunit=${ouName}')"></td> 
                            </c:otherwise>
                            </c:choose>
                            </tr>
                        </c:when>
                        <c:otherwise>
                        <tr onclick="fnOpenPopUpWindow('Service Call Confirmation', 'ServiceCallPrintPage?service_call_id='+${serviceCallHeader.id})">
                            <td>${loop.count}.</td>
                            <td>${serviceCallHeader.ticketNo}</td>
                            <td>${serviceCallHeader.date}</td>
                            <td>${serviceCallHeader.companyName}</td>
                            <td>${serviceCallHeader.referenceNo}</td>
                            <td>${serviceCallHeader.job_no_comma}</td>
                            <td>${serviceCallHeader.machineModel}</td>
                            <td>${serviceCallHeader.serialNo}</td>
                            <td>${serviceCallHeader.technician_comma}</td>
                            <td>${serviceCallHeader.status}</td>
                            <td></td>
                        </tr>
                        </c:otherwise>
                        </c:choose>
                    </c:forEach>
                </tbody>
            </table>
        </div>
    </body>
</html>
