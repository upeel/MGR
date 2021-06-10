<%-- 
    Document   : ContractMasterListing
    Created on : 14 Jun, 2019, 12:34:35 PM
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
        <title>Contract Master</title>
        
        <!-- include link,src file --> 
        <jsp:include page="../include/include.jsp"/>
        
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/ContractMaster.css" type="text/css">
        <script type="text/javascript" src="./include/js/ContractMaster.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Contract Master"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">
            
            <form id="frm" method="GET" action="ContractMaster">
                <table style="width: 40%;">
                    <tr>
                        <td class="txtStyleSanRegularMgr" style="width: 30%; padding-left: 0;">
                            Contract Status
                            
                        </td>

                        <td style="width: 50%;">
                            <select id="ddlStatus" name="ddlStatus">
                                <option value="All" ${status eq 'ALL' ? 'selected' : ''}>All</option>
                                <option value="Active" ${status eq 'Active' ? 'selected' : ''}>Active</option>
                                <option value="Expired" ${status eq 'Expired' ? 'selected' : ''}>Expired</option>
                                <option value="Terminated" ${status eq 'Terminated' ? 'selected' : ''}>Terminated</option>
                            </select>
                        </td>

                        <td style="width: 10%;">
                            <input type="button" value="Filter" id="btnFilterContract" class="btnMGRStyle">
                        </td>

                        <td style="width: 10%;">
                            <input type="button" value="New" id="btnAddNewContract" class="btnMGRStyle"> 
                        </td>
                    </tr>
                </table>
            </form>
                                    
            <table id="dtContractMasterList" class="formTable compact hover tableMGRStyle" style="bottom: 20px; position: relative !important;">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th class="mgrTxtAlignLeft">No.</th>
                        <th class="mgrTxtAlignLeft">Customer</th>
                        <th class="mgrTxtAlignLeft">Finance Company</th>
                        <th class="mgrTxtAlignLeft">Sales Contract</th>
                        <th class="mgrTxtAlignLeft">Contract Start</th>
                        <th class="mgrTxtAlignLeft">Contract End</th>
                        <th class="mgrTxtAlignLeft">Contract Period</th>
                        <th class="mgrTxtAlignLeft">Sales Amount</th>
                        <th class="mgrTxtAlignLeft">Product/Services</th>
                        <th class="mgrTxtAlignLeft">Contract Status</th>
                    </tr>
                </thead>      
                
                <tfoot style="display: none !important;">
                    <tr>
                        <th class="mgrTxtAlignLeft">No.</th>
                        <th class="mgrTxtAlignLeft">Customer</th>
                        <th class="mgrTxtAlignLeft">Finance Company</th>
                        <th class="mgrTxtAlignLeft">Sales Contract</th>
                        <th class="mgrTxtAlignLeft">Contract Start</th>
                        <th class="mgrTxtAlignLeft">Contract End</th>
                        <th class="mgrTxtAlignLeft">Contract Period</th>
                        <th class="mgrTxtAlignLeft">Sales Amount</th>
                        <th class="mgrTxtAlignLeft">Product/Services</th>
                        <th class="mgrTxtAlignLeft">Contract Status</th>
                    </tr>
                </tfoot>
                
                <tbody>
                    <c:forEach var="contractMaster" items="${listOfContractMasters}" varStatus="loop">
                        <tr onclick="fnOpenPopUpWindow('Contract Master Form', 'ContractMasterDetail?contractId='+${contractMaster.contractMasterHeader.id})">
                            <td>${loop.count}.</td>
                            <td>${contractMaster.contractMasterHeader.customer_name}</td>
                            <td>${contractMaster.contractMasterHeader.leasing_company_name}</td>
                            <td>${contractMaster.contractMasterHeader.sales_agreement_no}</td>
                            <td>${contractMaster.contractSalesInformationDetail.contract_start_date}</td>
                            <td>${contractMaster.contractSalesInformationDetail.contract_expiry_date}</td>
                            <td>${contractMaster.contractSalesInformationDetail.contract_period_month} Month</td>
                            <td><fmt:formatNumber value="${contractMaster.contractSalesInformationDetail.sales_ammount}" type="currency" maxFractionDigits="2" minFractionDigits="2"/></td>
                            <td>${contractMaster.contractSalesInformationDetail.productAndServices}</td>
                            <td>${contractMaster.contractMasterHeader.status}</td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
    </body>
</html>
