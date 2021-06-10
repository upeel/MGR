<%-- 
    Document   : MeterReading
    Created on : 13 Jan, 2020, 9:59:21 AM
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
        <title>Meter Reading List</title>
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/MeterReading.css" type="text/css">
        <script type="text/javascript" src="./include/js/MeterReadingList.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="message" value="${param.message}" readonly hidden>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Meter Reading Sheet"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">
        <form id="frm" method="GET" action="MeterReadingList">
            <table>
                <tr>
                    <td class="txtStyleSanRegularMgr" style="width: 15%;">
                        Date (From)
                    </td>

                    <td style="width: 30%;">
                        <input type="text" class="mgrFormDesign" id="startDate" name="txtDateFrom" value="<javatime:format value="${dateFrom}" pattern="dd/MM/yyyy" />" autocomplete="off">
                    </td>
                    <td style="width: 5%;"></td>
                    <td class="txtStyleSanRegularMgr" style="width: 15%">
                        Date (To)
                    </td>
                    <td style="width: 30%">
                        <input type="text" class="mgrFormDesign" id="endDate" name="txtDateTo" value="<javatime:format value="${dateTo}" pattern="dd/MM/yyyy" />" autocomplete="off">
                    </td>
                    <td style="width: 5%;"></td>
                    <td style="width: 15%;">
                      <input type="button" value="Filter" name="btnFilter" id="btnFilter" class="btnMGRStyle">
                    </td>
                </tr>
                <tr>
                    <td class="txtStyleSanRegularMgr" style="width: 15%;">
                      Status
                    </td>
                    <td style ="width: 30%;">
                        <select id="ddlStatus" name="ddlStatus">
                            <option value="New" ${param.ddlStatus eq 'New' ? 'selected' : ''}>New</option>
                            <option value="In Progress" ${param.ddlStatus eq 'In Progress' ? 'selected' : ''}>In Progress</option>
                            <option value="Taken" ${param.ddlStatus eq 'Taken' ? 'selected' : ''}>Taken</option>
                            <option value="Verified" ${param.ddlStatus eq 'Verified' ? 'selected' : ''}>Verified</option>
                        </select>
                    </td>
                    <td style="width: 5%;"></td>
                    <td class="txtStyleSanRegularMgr" style="width: 15%;">
                        Technician
                    </td>
                    <td style="width: 30%;">
                        <select id="ddlTechnician" name="ddlTechnician">
                            <option value="0">--Select a Technician--</option>
                            <c:forEach items="${listTech}" var="tech">
                                <option value="${tech.id}" ${param.ddlTechnician eq tech.id ? 'selected' : ''}>${tech.driver_or_technician_name}</option>
                            </c:forEach>
                        </select>
                    </td>
                    <td style="width: 5%;"></td>
                    <td style ="width: 15%;">
                        <input type="button" value="Create" name="btnCreate" id="btnCreate" class="btnMGRStyle">
                    </td>
                </tr>       
            </table>
            <table id="dtMeterReadingList" class="formTable compact hover tableMGRStyle" style="top: 10px; position: relative !important;">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th class="mgrTxtAlignLeft">#</th>
                        <th class="mgrTxtAlignLeft">Technician</th>
                        <th class="mgrTxtAlignLeft">Date Created</th>
                        <th class="mgrTxtAlignLeft">Total Customer</th>
                        <th class="mgrTxtAlignLeft">Total Location</th>
                        <th class="mgrTxtAlignLeft">Total Machine</th>
                        <th class="mgrTxtAlignLeft">Reading No.</th>
                        <th class="mgrTxtAlignLeft">Update On</th>
                        <th class="mgrTxtAlignLeft">Status</th>
                    </tr>
                </thead>
                
                <tfoot>
                    <tr>
                        <th class="mgrTxtAlignLeft">#</th>
                        <th class="mgrTxtAlignLeft">Technician</th>
                        <th class="mgrTxtAlignLeft">Date Created</th>
                        <th class="mgrTxtAlignLeft">Total Customer</th>
                        <th class="mgrTxtAlignLeft">Total Location</th>
                        <th class="mgrTxtAlignLeft">Total Machine</th>
                        <th class="mgrTxtAlignLeft">Reading No.</th>
                        <th class="mgrTxtAlignLeft">Update On</th>
                        <th class="mgrTxtAlignLeft">Status</th>
                    </tr>
                </tfoot>
                
                <tbody>
                    <c:forEach items="${listOfMeterReading}" var="meter" varStatus="loop">
                        <tr onclick="fnOpenPopUpWindow('MeterReading', '../MeterReading/MeterReading?mrd_id=${meter.id}&&created_on=${meter.createdOn}&&tech_id=${meter.techId}')">
                            <td>${loop.count}</td>
                            <td>${meter.technician}</td>
                            <td>${meter.createdOn}</td>
                            <td>${meter.total_customer}</td>
                            <td>${meter.total_location}</td>
                            <td>${meter.total_machine}</td>
                            <td>${meter.reading_no}</td>
                            <td>${meter.updateOn}</td>
                            <td>${meter.status}</td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>        
        </form>
        </div>
    </body>
</html>
