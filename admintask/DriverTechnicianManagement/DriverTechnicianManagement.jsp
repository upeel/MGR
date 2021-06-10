<%-- 
    Document   : DriverTechnicianManagement
    Created on : 8 Aug, 2019, 8:33:54 AM
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
        <title>Driver & Technician Management</title>
        
        <jsp:include page="../include/include.jsp"/>
        
        <!-- CSS JS -->
        <link href="include/css/DriverTechnicianManagement.css?v=${Version.VERSION}" rel="stylesheet" type="text/css"/>    
        <script src="include/js/DriverTechnicianManagement.js?v=${Version.VERSION}" type="text/javascript"></script>
        <script>
            var listOfDTManagerJson = ${listOfDTManagerJson};
            var listOfDriverTypeJson = ${listOfDriverTypeJson};
        </script>
        
    </head>
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="message" value="${param.message}" readonly hidden>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
             <jsp:param name="formTitle" value="Driver / Technician Management"></jsp:param>
         </jsp:include>
        
        <div class="defaultBodyContent">
            <form method="POST" id="frm" action="DriverTechnicianManagement">
                <table class=" defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0" style="overflow: auto !important;">    
                    <thead class="mgrDataTableThead">
                        <tr>
                            <th hidden></th>
                            <th style="height: 50px !important; border-top-left-radius: 5px; margin-bottom: 20px" class="mgrPaddingLeft20">No.</th>
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">Driver Name</th>
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">Vehicle No.</th>
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">Contact No.</th>
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">Type</th>
                            <th class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20">Status</th>
                            <th style="height: 50px !important; border-top-right-radius: 5px" class="mgrTxtAlignLeft mgrPaddingLeft20 mgrPaddingRight20"><img class="logoTheadTableMgr" id="addNew" src="../../include/mgr/include/images/MGR-LOGO/Add mgr.png"/></th>
                        </tr>
                    </thead>
                    <tbody id="tbodyId">
                    </tbody>
                </table>
                <input type="hidden" id="trLength" name="trLength"/>
                <input type="hidden" id="deletedDriverIdLength" name="deletedDriverIdLength" value="0"/>                
            </form>                
            <input type="button" id="btnUpdateManagement" class="update mgrFloatRight txtStyleSanRegularMgr" value="Update">                
        </div>        
    </body>
</html>
