<%-- 
    Document   : SalesOverviewReport
    Created on : 7 Nov, 2019, 11:03:24 AM
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
        <title>Sales Overview Report</title>
        
        <!-- include link,src file --> 
        <jsp:include page="../include/include.jsp"/>
        
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/SalesOverview.css" type="text/css">
        <script type="text/javascript" src="./include/js/SalesOverview.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Sales Overview Report"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">
            <form id="frm" method="GET" action="SalesOverviewReport">
                <table>
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
                            <select id="reportType" name="reportType" >
                                <option value="By Customer" selected ${param.reportType eq "By Customer" ? 'selected' : ''}>By Customer</option>
                                <option value="By Item" ${param.reportType eq "By Item" ? 'selected' : ''}>By Item</option>
                            </select>
                        </td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td style="width: 10%;">
                            <input type="button" value="Filter" id="btnFilter" class="btnMGRStyle">
                        </td>
                    </tr>
                </table>
            </form>
            
            <table id="dtSalesOverview" class="formTable compact hover tableMGRStyle" style="top: 10px; position: relative !important;">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th class="mgrTxtAlignLeft">#</th>
                        <th class="mgrTxtAlignLeft">Customer Code</th>
                        <th class="mgrTxtAlignLeft">Customer Name</th>
                        <th class="mgrTxtAlignLeft">Sales Amt</th>
                        <th class="mgrTxtAlignLeft">GST Amount</th>
                        <th class="mgrTxtAlignLeft">Sales Amt (w GST)</th>
                        <th class="mgrTxtAlignLeft">Breakdown</th>
                    </tr>
                </thead>
                
                
                <tbody>
                    <c:forEach items="${listOfSalesOverview}" var="sales" varStatus="loop">
                        <tr class="salesOverviewList">
                            <td>${loop.count}.</td>
                            <td>${sales.customerCode}</td>
                            <td>${sales.customerName}</td>
                            <td class="subTotalInfo"><fmt:formatNumber value="${sales.salesAmt}" type="currency" maxFractionDigits="2" minFractionDigits="2" /></td>
                            <td class="gstInfo"><fmt:formatNumber value="${sales.gst}" type="currency" maxFractionDigits="2" minFractionDigits="2" /></td>
                            <td class="grandTotalInfo"><fmt:formatNumber value="${sales.salesWithGst}" type="currency" maxFractionDigits="2" minFractionDigits="2" /></td>
                            <td><a href="" class="view" onclick="fnOpenPopUpWindow('Invoice', './../Invoice/Invoice?inv_id='+${sales.id})">View</a></td>
                        </tr>
                    </c:forEach>
                </tbody>
                <tfoot class="DataTableTfoots tableStyleMgr" style="border-top: 1px solid #dadada !important">
                    <tr class="DataTableTfoots">
                       <td style="border-bottom-left-radius: 7px !important;"/><td/>
                       <td style="text-align: right !important;">Total : </td>
                       <td id="subTotal" style="text-align: left !important;"></td>
                       <td id="gstTotal" style="text-align: left !important;"></td>
                       <td id="grandTotal" style="text-align: left !important;"></td><td/>
                    </tr>
                </tfoot>
            </table>
            <table id="dtSalesOverviewItem" class="formTable compact hover tableMGRStyle" style="top: 10px; position: relative !important;">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th class="mgrTxtAlignLeft">#</th>
                        <th class="mgrTxtAlignLeft">Item Group</th>
                        <th class="mgrTxtAlignLeft">Item Code</th>
                        <th class="mgrTxtAlignLeft">Item Description</th>
                        <th class="mgrTxtAlignLeft">Qty</th>
                        <th class="mgrTxtAlignLeft">Sales Amt</th>
                        <th class="mgrTxtAlignLeft">Breakdown</th>
                    </tr>
                </thead>
                
                
                <tbody>
                    <c:forEach items="${listSalesOverviewItem}" var="salesItem" varStatus="loop">
                        <tr class="salesOverviewItemList">
                            <td>${loop.count}.</td>
                            <td>${salesItem.itemGrp}</td>
                            <td>${salesItem.itemCode}</td>
                            <td>${salesItem.itemDesc}</td>
                            <td>${salesItem.qty}</td>
                            <td class="salesAmt"><fmt:formatNumber value="${salesItem.salesAmt}" type="currency" maxFractionDigits="2" minFractionDigits="2" /></td>
                            <td><a href="" class="view" onclick="fnOpenPopUpWindow('Invoice', './../Invoice/Invoice?inv_id='+${salesItem.id})">View</a></td>
                        </tr>
                    </c:forEach>
                </tbody>
                <tfoot class="DataTableTfoots tableStyleMgr" style="border-top: 1px solid #dadada !important">
                    <tr class="DataTableTfoots">
                       <td style="border-bottom-left-radius: 7px !important;"/><td/><td/><td/>
                       <td style="text-align: right !important;">Total Sales : </td>
                       <td id="salesAmt" style="text-align: left !important;"></td><td/>
    
                    </tr>
                </tfoot>
            </table>                    
        </div>
    </body>
</html>
