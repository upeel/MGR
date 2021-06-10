<%-- 
    Document   : CustSalesReport
    Created on : 8 Nov, 2019, 10:44:56 AM
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
        <title>Customer Sales Report</title>
        
        <!-- include link,src file --> 
        <jsp:include page="../include/include.jsp"/>
        
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/Report.css" type="text/css">
        <script type="text/javascript" src="./include/js/CustomerSalesReport.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Customer Sales Report"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">
            <form id="frm" method="GET" action="CustSalesReport">
                <table>
                    <tr>
                        <td class="txtStyleSanRegularMgr" style="width: 20%;">
                            Business Entity
                        </td>

                        <td style="width: 25%;">
                            <select id="ddlEntity" id="ddlEntity" name="ddlEntity">
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
                            <select id="ddlCustomer" id="ddlCustomer" name="ddlCustomer">
                                <option value="All" ${param.ddlCustomer == 'All' ? 'selected' : ''}>All</option>
                                <c:forEach items="${listOfCustName}" var="customer">
                                    <option value="${customer.customer_code}" ${param.ddlCustomer eq customer.customer_code ? 'selected' : ''}>${customer.customerName}</option>
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
                            Invoice Type
                        </td>
                        <td style="width: 25%">
                            <select id="ddlInvoiceType" id="ddlInvoiceType" name="ddlInvoiceType">
                                <option value="${param.ddlInvoiceType == 'All' ? 'selected' : ''}">All</option>
                                <c:forEach items="${listOfInvoiceTypeHeaders}" var="inv">
                                    <option value="${inv.id}" ${param.ddlInvoiceType eq inv.id ? 'selected' : ''}>${inv.name}</option>
                                </c:forEach>
                            </select>
                        </td>
                        <td style="width: 10%;"></td>
                        <td class="txtStyleSanRegularMgr" style="width: 20%">
                            Ship To
                        </td>
                        <td style="width: 25%">
                            <select id="ddlShipTo" id="ddlShipTo" name="ddlShipTo">
                                <option value="All" ${param.ddlShipTo == 'All' ? 'selected' : ''}>All</option>
                                <c:forEach items="${listOfShipTo}" var="shipTo">
                                    <option value="${shipTo.customerCode}" customerCode="${shipTo.customerCode}" ${param.ddlShipTo eq shipTo.customerCode ? 'selected' : ''}>${shipTo.shipTo}</option>
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
            
            <table id="dtCustSalesReport" class="formTable compact hover tableMGRStyle tableStyleMgr" style="top: 10px; position: relative !important;">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th hidden>Id</th>
                        <th class="mgrTxtAlignLeft">No</th>
                        <th class="mgrTxtAlignLeft">Invoice Date</th>
                        <th class="mgrTxtAlignLeft">Invoice No</th>
                        <th class="mgrTxtAlignLeft">Invoice Type</th>
                        <th class="mgrTxtAlignLeft">Customer</th>
                        <th class="mgrTxtAlignLeft">Ship To</th>
                        <th class="mgrTxtAlignLeft">Sub Total</th>
                        <th class="mgrTxtAlignLeft">GST</th>
                        <th class="mgrTxtAlignLeft">Grand Total</th>
                    </tr>
                </thead>
                
                <tbody>
                    <c:forEach items="${listOfCustomerSalesReport}" var="sales" varStatus="loop">
                        <tr class="customerSalesReportList">
                            <td hidden class="salesId" id="id">${sales.id}</td>
                            <td>${loop.count}.</td>
                            <td><javatime:format value="${sales.invoiceDate}" pattern="dd/MM/yyyy"/></td>
                            <td>
                                <a href="" class="salesInvoice" onclick='openOrderCollectionForms(this)'>${sales.invoiceNo}</a></td>
                            <td>${sales.invoiceType}</td>
                            <td>${sales.customerName}</td>
                            <td>${sales.shipTo}</td>
                            <td class="subTotalInfo" style="text-align: right"><fmt:formatNumber value="${sales.subTotal}" type="currency" maxFractionDigits="2" minFractionDigits="2" /></td>
                            <td class="gstInfo" style="text-align: right"><fmt:formatNumber value="${sales.gst}" type="currency" maxFractionDigits="2" minFractionDigits="2" /></td>
                            <td class="grandTotalInfo" style="text-align: right"><fmt:formatNumber value="${sales.grandTotal}" type="currency" maxFractionDigits="2" minFractionDigits="2" /></td>
                        </tr>
                    </c:forEach>
                </tbody>
                
                <tfoot class="DataTableTfoots tableStyleMgr" style="border-top: 1px solid #dadada !important">
                    <tr class="DataTableTfoots">
                       <td style="border-bottom-left-radius: 7px !important;"/><td/><td/><td/><td/>
                       <td style="text-align: right; padding: 0 8px 0 8px !important;">Total Sales : </td>
                       <td id="subTotal" style="text-align: right; padding: 0 8px 0 8px !important;"></td>
                       <td id="gstTotal" style="text-align: right; padding: 0 8px 0 8px !important;"></td>
                       <td id="grandTotal" style="text-align: right; padding: 0 8px 0 8px !important;"></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </body>
</html>
