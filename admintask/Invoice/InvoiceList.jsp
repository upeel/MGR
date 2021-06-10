<%-- 
    Document   : InvoiceList
    Created on : 8 Jul, 2019, 5:02:57 PM
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
        <title>Invoice List</title>
        
        <!-- include link,src file --> 
        <jsp:include page="../include/include.jsp"/>
        
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/InvoiceList.css" type="text/css">
        <script type="text/javascript" src="./include/js/InvoiceList.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Invoice List"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">
            <form id="frm" method="GET" action="InvoiceList">
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
                                <option value="0" ${business_entity_id eq 0 ? 'selected' : ''}>All</option>
                                <c:forEach items="${listOfUserLoggedEntities}" var="entity" varStatus="loop">
                                    <option value="${entity.id}" ${business_entity_id eq entity.id ? 'selected' : ''}>${entity.name}</option>
                                </c:forEach>
                            </select>
                        </td>

                        <td style="width: 10%;">
                            <input type="button" value="Filter" id="btnFilterInvoiceList" class="btnMGRStyle">
                        </td>

                        <td style="width: 10%;">
                            <input type="button" value="New" id="btnAddNewInvoice" class="btnMGRStyle"> 
                        </td>
                    </tr>
                </table>
            </form>
            
            <table id="dtInvoiceList" class="formTable compact hover tableMGRStyle" style="bottom: 20px; position: relative !important;">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th class="mgrTxtAlignLeft">No.</th>
                        <th class="mgrTxtAlignLeft">Invoice No</th>
                        <th class="mgrTxtAlignLeft">Invoice Date</th>
                        <th class="mgrTxtAlignLeft">Customer</th>
                        <th class="mgrTxtAlignLeft">Order No.</th>
                        <th class="mgrTxtAlignLeft">Do/Job No.</th>
                        <th class="mgrTxtAlignLeft">Inv Amt</th>
                        <th class="mgrTxtAlignLeft">Status</th>
                    </tr>
                </thead>
                
                <tfoot>
                    <tr>
                        <th class="mgrTxtAlignLeft">No.</th>
                        <th class="mgrTxtAlignLeft">Invoice No</th>
                        <th class="mgrTxtAlignLeft">Invoice Date</th>
                        <th class="mgrTxtAlignLeft">Customer</th>
                        <th class="mgrTxtAlignLeft">Order No.</th>
                        <th class="mgrTxtAlignLeft">Do/Job No.</th>
                        <th class="mgrTxtAlignLeft">Inv Amt</th>
                        <th class="mgrTxtAlignLeft">Status</th>
                    </tr>
                </tfoot>
                
                <tbody>
                    <c:forEach items="${listOfInvoiceHeaders}" var="invoice" varStatus="loop">
                        <tr onclick="fnOpenPopUpWindow('invoice', 'Invoice?inv_id='+${invoice.id})">
                            <td>${loop.count}.</td>
                            <td>${invoice.invoice_no}</td>
                            <td>${invoice.invoice_date}</td>
                            <td>${invoice.customer_name}</td>
                            <td>${invoice.order_entry_no}</td>
                            <td>${invoice.do_no}</td>
                            <td><fmt:formatNumber value="${invoice.grand_total}" type="currency" maxFractionDigits="2" minFractionDigits="2" /></td>
                            <td>${invoice.status}</td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
    </body>
</html>
