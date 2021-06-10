<%-- 
    Document   : ServiceOverviewReport
    Created on : 11 Nov, 2019, 4:20:46 PM
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
        <title>Service Overview Report</title>
        
        <!-- include link,src file --> 
        <jsp:include page="../include/include.jsp"/>
        
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/SalesOverview.css" type="text/css">
        <script type="text/javascript" src="./include/js/ServiceOverviewReport.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Service Overview Report"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">
            <form id="frm" method="GET" action="ServiceOverviewReport">
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
                            Report Type
                        </td>
                        <td style="width: 25%">
                            <select id="reportType" name="reportType">
                                <option value="By Customer" selected ${param.reportType eq "By Customer" ? 'selected' : ''}>By Customer</option>
                                <option value="By Item" ${param.reportType eq "By Item" ? 'selected' : ''}>By Item</option>
                                <option value="By Technician" ${param.reportType eq "By Technician" ? 'selected' : ''}>By Technician</option>
                            </select>
                        </td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td style="width: 10%;">
                            <input type="button" value="Filter" name="btnFilter" id="btnFilter" class="btnMGRStyle">
                        </td>
                    </tr>
                    <tr>
                        <td class="txtStyleSanRegularMgr" style="width: 20%;">
                          Service Period From
                        </td>
                        <td style ="width: 25%;">
                            <input type="text" class="mgrFormDesign" id="startDate" name="txtDateFrom" value="<javatime:format value="${dateFrom}" pattern="dd/MM/yyyy" />" autocomplete="off">
                        </td>
                        <td style="width: 10%;"></td>
                        <td class="txtStyleSanRegularMgr" style="width: 20%;">
                          Service Period To
                        </td>
                        <td style ="width: 25%;">
                            <input type="text" class="mgrFormDesign" id="endDate" name="txtDateTo" value="<javatime:format value="${dateTo}" pattern="dd/MM/yyyy" />" autocomplete="off">
                        </td>
                    </tr>       
                </table>
            </form>
            
            <table id="dtServiceOverview" class="formTable compact hover tableMGRStyle" style="top: 10px; position: relative !important;">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th class="mgrTxtAlignLeft">#</th>
                        <th class="mgrTxtAlignLeft">Customer Code</th>
                        <th class="mgrTxtAlignLeft">Customer Name</th>
                        <th class="mgrTxtAlignLeft">Services Count</th>
                        <th class="mgrTxtAlignLeft">Breakdown</th>
                    </tr>
                </thead>
                
                <tfoot>
                    <tr>
                        <th class="mgrTxtAlignLeft">#</th>
                        <th class="mgrTxtAlignLeft">Customer Code</th>
                        <th class="mgrTxtAlignLeft">Customer Name</th>
                        <th class="mgrTxtAlignLeft">Services Count</th>
                        <th class="mgrTxtAlignLeft">Breakdown</th>
                    </tr>
                </tfoot>
                
                <tbody>
                    <c:forEach items="${listOfServiceOverview}" var="service" varStatus="loop">
                        <tr>
                            <td>${loop.count}.</td>
                            <td>${service.customerCode}</td>
                            <td>${service.customerName}</td>
                            <td>${service.servicesCount}</td>
                            <td><a href="">View</a></td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
            <br>
            <table id="dtServiceOverviewItem" class="formTable compact hover tableMGRStyle" style="top: 10px; position: relative !important;">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th class="mgrTxtAlignLeft">#</th>
                        <th class="mgrTxtAlignLeft">Item Code</th>
                        <th class="mgrTxtAlignLeft">Item Name</th>
                        <th class="mgrTxtAlignLeft">Item Description</th>
                        <th class="mgrTxtAlignLeft">Model</th>
                        <th class="mgrTxtAlignLeft">Services Count</th>
                        <th class="mgrTxtAlignLeft">Breakdown</th>
                    </tr>
                </thead>
                
                <tfoot>
                    <tr>
                        <th class="mgrTxtAlignLeft">#</th>
                        <th class="mgrTxtAlignLeft">Item Code</th>
                        <th class="mgrTxtAlignLeft">Item Name</th>
                        <th class="mgrTxtAlignLeft">Item Description</th>
                        <th class="mgrTxtAlignLeft">Model</th>
                        <th class="mgrTxtAlignLeft">Services Count</th>
                        <th class="mgrTxtAlignLeft">Breakdown</th>
                    </tr>
                </tfoot>
                
                <tbody>
                    <tr>
                        <td>${loop.count}.</td>
                    </tr>
                </tbody>
            </table>
            <table id="dtServiceOverviewTech" class="formTable compact hover tableMGRStyle" style="top: 10px; position: relative !important;">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th class="mgrTxtAlignLeft">#</th>
                        <th class="mgrTxtAlignLeft">Technician</th>
                        <th class="mgrTxtAlignLeft">Services Count</th>
                        <th class="mgrTxtAlignLeft">Total Hours</th>
                        <th class="mgrTxtAlignLeft">Breakdown</th>
                    </tr>
                </thead>
                
                <tfoot>
                    <tr>
                        <th class="mgrTxtAlignLeft">#</th>
                        <th class="mgrTxtAlignLeft">Technician</th>
                        <th class="mgrTxtAlignLeft">Services Count</th>
                        <th class="mgrTxtAlignLeft">Total Hours</th>
                        <th class="mgrTxtAlignLeft">Breakdown</th>
                    </tr>
                </tfoot>
                
                <tbody>
                    <tr>
                        <td>${loop.count}.</td>
                    </tr>
                </tbody>
        </div>
    </body>
</html>
