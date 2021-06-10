<%-- 
    Document   : CustomerMaster
    Created on : 14 Jun, 2019, 11:17:11 AM
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
        <title>Customer Master</title>
        
        <jsp:include page="../include/include.jsp"/>
        
        <!-- CSS JS -->
        <link href="include/css/CustomerMaster.css?v=${Version.VERSION}" rel="stylesheet" type="text/css"/>    
        <script src="include/js/CustomerMaster.js?v=${Version.VERSION}" type="text/javascript"></script>
        
    </head>
    
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="message" value="${param.message}" readonly hidden>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
             <jsp:param name="formTitle" value="Customer List"></jsp:param>
         </jsp:include>
        
        <div class="defaultBodyContent" >            
                <form id="frm" method="POST" action="../CustomerMasterImportData/CustomerMasterImportData" enctype="multipart/form-data">
                <table style="width: 50%;">
                    <tr>
                        <td class="txtStyleSanRegularMgr" style="padding-left: 0;">
                            Entity
                        </td>
                        
                        <td style="padding-left: 10px;">
                            <select id="ddlEntityId" name="ddlEntityId">
                                <option value="0" selected disabled>-- Please Select Entity --</option>
                                <c:forEach var="entity" items="${listOfEntityHeaders}">
                                    <option value="${entity.id}">
                                        ${entity.name}
                                    </option>
                                </c:forEach>
                            </select>
                        </td>
                        
                        <td style="padding-left: 10px;">
                            <input type="file" id="file" name="file" accept=".txt">
                        </td>
                        
                        <td>
                            <input type="button" id="btnImport" name="btnImport" class="btnMGRStyle" style="width: 70px !important;" value="Import">
                        </td>
                    </tr>
                </table>                
            </form>
            
            <div id="header" style=" display: flex;"></div>
            <table style="width: 40%; border:  1px solid #b7b7b7; position: relative !important; bottom: 25px;" id="dtSummaryTable" class="formTable compact hover tableMGRStyle">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th class="mgrDataTableThead" hidden></th>
                        <th class="mgrDataTableThead mgrTxtAlignLeft">No.</th>
                        <th class="mgrDataTableThead mgrTxtAlignLeft">Customer Code</th>
                        <th class="mgrDataTableThead mgrTxtAlignLeft">Customer Name</th>
                        <th class="mgrDataTableThead mgrTxtAlignLeft">Payment Term</th>
                        <th class="mgrDataTableThead mgrTxtAlignLeft">Contact Person</th>
                        <th class="mgrDataTableThead mgrTxtAlignLeft">Tel</th>
                        <th class="mgrDataTableThead mgrTxtAlignLeft">Fax</th>
                        <th class="mgrDataTableThead mgrTxtAlignLeft">Email</th>
                        <th class="mgrDataTableThead mgrTxtAlignLeft">Status</th>
                    </tr>
                </thead>

                <tfoot>
                    <tr>
                        <th class="mgrDataTableThead" hidden></th>
                        <th class="mgrDataTableThead">No.</th>
                        <th class="mgrDataTableThead">Customer Code</th>
                        <th class="mgrDataTableThead">Customer Name</th>
                        <th class="mgrDataTableThead">Payment Term</th>
                        <th class="mgrDataTableThead">Contact Person</th>
                        <th class="mgrDataTableThead">Tel</th>
                        <th class="mgrDataTableThead">Fax</th>
                        <th class="mgrDataTableThead">Email</th>
                        <th class="mgrDataTableThead">Status</th>
                    </tr>
                </tfoot> 

                <tbody>
                    <c:forEach items="${listOfCustomerMaster}" var="customerList" varStatus="loop">
                        <tr style='cursor:hand' onclick="fnOpenPopUpWindow('CustomerMasterProfile','CustomerMasterProfile?customerMasterId=${customerList.id}')">                
                            <td class=" mgrFormDesign" style="font-size: medium !important; color: grey;" hidden><input type="text" id="customerMasterId" name="customerMasterId" class="txtNumber" value="${customerList.id}"/> </td>
                            <td class=" mgrFormDesign" style="text-align: center; font-size: medium !important; color: grey;">${loop.count}</td>
                            <td class=" mgrFormDesign" style="font-size: medium !important; color: grey;">${customerList.customerCode}</td>
                            <td class=" mgrFormDesign" style="font-size: medium !important; color: grey;">${customerList.customerName}</td>
                            <td class=" mgrFormDesign" style="font-size: medium !important; color: grey;">${customerList.payment_terms_name}</td>
                            <td class=" mgrFormDesign" style="font-size: medium !important; color: grey;">${customerList.contactPerson}</td>
                            <td class=" mgrFormDesign" style="font-size: medium !important; color: grey;" >${customerList.tel}</td>
                            <td class=" mgrFormDesign" style="font-size: medium !important; color: grey;" >${customerList.fax}</td>
                            <td class=" mgrFormDesign" style="font-size: medium !important; color: grey;" >${customerList.email}</td>   
                            <td class=" mgrFormDesign" style="font-size: medium !important; color: grey;" >${customerList.statusValue}</td>   
                        </tr> 
                    </c:forEach>
                </tbody>
            </table> 
        </div>
    </body>
</html>
