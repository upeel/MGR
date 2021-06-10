<%-- 
    Document   : MGRHeader
    Created on : 17 Jun, 2019, 11:49:39 AM
    Author     : Wildan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
    <head>
        <link rel="icon" href="../../favicon.ico"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/admintask/MGRHeader/include/css/MGRHeader.css">
        <title>Company Header Logo</title>
    </head>
    <body>
        <div style="width: 100%; background-color: #ffffff;">
            <table class="formTableForLogoAndTable" style="width: 100%;">
                <tr>
                    <td class="formLogoTableCell">
                        <img class="formLogoImage logoImageMGR" src="${pageContext.request.contextPath}/include/mgr/include/images/MGR-LOGO/Logo mgr.png" alt="Logo">
                    </td>
                    
                    <td class="formTitleTableCell logoTitleMGR">
                        <h2 class="logoTitleMgr"><c:out value="${param.formTitle}"/></h2>
                    </td>
                </tr>
            </table>
        </div>
    </body>
</html>
