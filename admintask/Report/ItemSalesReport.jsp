<%-- 
    Document   : ItemSalesReport
    Created on : 8 Nov, 2019, 2:07:53 PM
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
        <link rel="icon" href="${pageContext.request.contextPath}/favicon.ico"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="height=device-height,width=device-width">
        <script type="text/javascript" src="${pageContext.request.contextPath}/include/app/include/jquery/jquery-ui-1.12.1.custom/external/jquery/jquery.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/include/app/include/jquery/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
        <link href="${pageContext.request.contextPath}/include/css/loading.css?v=${Version.VERSION}" rel="stylesheet" type="text/css"/>

        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/include/app/include/jquery/jquery-ui-1.12.1.custom/jquery-ui.min.css"  />
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/include/app/include/DataTables/datatables.min.css" />
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/include/app/include/DataTables/Responsive-2.2.0/css/responsive.dataTables.min.css" />
        
        <script src="../../include/js/jquery.fileupload.js"></script>
        <script src="../../include/js/jquery.fileupload-ui.js"></script>
        <script src="../../include/bootstrap/js/bootstrap.min.js"></script>
        <link href="../../include/css/myuploadcss.css" type="text/css" rel="stylesheet" />
        <link rel="stylesheet" href="../../include/css/jquery.fileupload-ui.css">
        <link href="../../include/css/dropzone.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="${pageContext.request.contextPath}/include/js/pdfobject.js"></script>
        
        <script src="${pageContext.request.contextPath}/include/app/include/js/bootstrap.min.js"></script>
        
        <script type="text/javascript" src="${pageContext.request.contextPath}/include/app/include/DataTables/datatables.min.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/include/app/include/DataTables/Buttons-1.4.2/js/dataTables.buttons.min.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/include/app/include/DataTables/Buttons-1.4.2/js/buttons.flash.min.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/include/app/include/DataTables/Buttons-1.4.2/js/buttons.html5.min.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/include/app/include/DataTables/Buttons-1.4.2/js/buttons.print.min.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/include/app/include/DataTables/Responsive-2.2.0/js/dataTables.responsive.min.js"></script>

        <link href="${pageContext.request.contextPath}/include/app/include/css/common.css?v=${Version.VERSION}" rel="stylesheet" type="text/css"/>
        <script src="${pageContext.request.contextPath}/include/app/include/js/common.js?v=${Version.VERSION}" type="text/javascript"></script>
        
        <!--Chosen js file (Multiple Select)-->
        <link href="${pageContext.request.contextPath}/include/app/include/chosen_v1.8.3/chosen.min.css?v=${Version.VERSION}" rel="stylesheet" type="text/css"/>
        <script src="${pageContext.request.contextPath}/include/app/include/chosen_v1.8.3/chosen.jquery.min.js?v=${Version.VERSION}" type="text/javascript"></script> 
        <title>Item Sales Report</title>
        
        <!-- include link,src file --> 
        <jsp:include page="../include/include.jsp"/>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/admintask/MGRHeader/include/css/MGRHeader.css">
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/Report.css" type="text/css">
        <script type="text/javascript" src="./include/js/ItemSalesReport.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <script>
            var paramIds = ${param.sales.id}
        </script>
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <div style="width: 100%; background-color: #ffffff;">
            <table class="formTableForLogoAndTable" style="width: 100%;">
                <tr>
                    <td class="formLogoTableCell">
                        <img class="formLogoImage logoImageMGR" style="height: 50px" src="${pageContext.request.contextPath}/include/mgr/include/images/MGR-LOGO/Logo mgr.png" alt="Logo">
                    </td>
                    
                    <td class="formTitleTableCell logoTitleMGR">
                        <h2 class="logoTitleMgr">Item Sales Report</h2>
                    </td>
                </tr>
            </table>
        </div>
        
        <div class="defaultBodyContent">
            <form id="frm" method="GET" action="ItemSalesReport">
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
                                <option value="${param.ddlCustomer == 'All' ? 'selected' : ''}">All</option>
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
                            Item
                        </td>
                        <td style="width: 25%">
                            <select id="ddlItem" name="ddlItem">
                                <option value="${param.ddlItem == 'All' ? 'selected' : ''}" >All</option>
                                <c:forEach items="${listOfItem}" var="items">
                                    <option value="${items.name}" ${param.ddlItem eq items.name ? 'selected' : ''}>${items.item}</option>
                                </c:forEach>
                            </select>
                        </td>
                        <td style="width: 10%;"></td>
                        <td class="txtStyleSanRegularMgr" style="width: 20%">
                            Item Group
                        </td>
                        <td style="width: 25%">
                            <select id="ddlItemGroup" name="ddlItemGroup">
                                <option value="${param.ddlItemGroup == 'All' ? 'selected' : ''}">All</option>
                                <c:forEach items="${listOfItemGroup}" var="itemGroups">
                                    <option value="${itemGroups.id}" ${param.ddlItemGroup eq itemGroups.id ? 'selected' : ''}>${itemGroups.itemGroup}</option>
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
            
            <table id="dtItemSalesReport" class="formTable compact hover tableMGRStyle dataTable" style="top: 10px; position: relative !important;" >
                <thead class="mgrDataTableThead">
                    <tr>
                        <th hidden>Id</th>
                        <th class=" mgrTxtAlignLeft">No</th>
                        <th class=" mgrTxtAlignLeft">Date</th>
                        <th class=" mgrTxtAlignLeft">Invoice No</th>
                        <th class=" mgrTxtAlignLeft">Item Description</th>
                        <th class=" mgrTxtAlignLeft">Group</th>
                        <th class=" mgrTxtAlignLeft">Qty</th>
                        <th class=" mgrTxtAlignLeft">Customer</th>
                        <th class=" mgrTxtAlignLeft">Amt</th>
                    </tr>
                </thead>

                <tbody>
                    <c:forEach items="${listOfItemSalesReportFilter}" var="sales" varStatus="loop">
                        <tr class="amtTotalList">
                            <td hidden class="salesID">${sales.id}</td>
                            <td>${loop.count}.</td>
                            <td><javatime:format value="${sales.date}" pattern="dd/MM/yyyy"/></td>
                            <td>
                                <a href="" class="salesInvoice" onclick='openOrderCollectionForms(this)'>
                                    ${sales.invoiceNo}
                                </a>
                            </td>
                            <td>${sales.item}</td>
                            <td>${sales.itemGroup}</td>
                            <td>${sales.quantity}</td>
                            <td>${sales.customerName}</td>
                            <td class="amountTotal">${sales.amount}</td>
                        </tr>
                    </c:forEach>
                </tbody>
                                
                <tfoot class="mgrDataTableTfoots" style="border-top: 1px solid #dadada !important">
                    <tr class="mgrDataTableTfoots">
                       <td style="border-bottom-left-radius: 7px !important;"/><td/><td/><td/><td/><td/>
                       <td style=" padding: 0 8px 0 8px !important;">Total Sales :</td>
                       <td id="AmountTotals" style="padding: 0 8px 0 8px !important; border-bottom-right-radius: 7px !important;"></td>
                    </tr>
                </tfoot>
                <br><br>
            </table>
        </div>
    </body>
</html>
