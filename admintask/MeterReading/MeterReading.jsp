<%-- 
    Document   : MeterReading
    Created on : 13 Jan, 2020, 11:52:16 AM
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
        <title>Meter Reading</title>
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/MeterReading.css" type="text/css">
        <script type="text/javascript" src="./include/js/MeterReading.js"></script>
        <script> 
            var tech_id = ${param.tech_id}
            </script>
    </head>
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="message" value="${param.message}" readonly hidden>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Meter Reading Sheet"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">
        <form id="frm" method="POST" action="MeterReading">
            <table>
                <tr>
                    <td class="txtStyleSanRegularMgr" style="width: 20%;">
                        Created On
                    </td>

                    <td style="width: 25%;">
                        <input type="text" class="mgrFormDesign" id="createdOn" name="createdOn" value="${param.created_on}" readonly>
                    </td>
                    <td style="width: 15%;"></td>
                    <td class="txtStyleSanRegularMgr" style="width: 20%">
                        Last Update On
                    </td>
                    <td style="width: 25%">
                        <input type="text" class="mgrFormDesign" id="lastUpdateOn" name="lastUpdateOn" value="${updOn}" readonly>
                    </td>
                </tr>
                <tr>
                    <td class="txtStyleSanRegularMgr" style="width: 20%;">
                        Technician
                    </td>

                    <td style="width: 25%;">
                        <input type="text" class="mgrFormDesign" id="technician" name="technician" value="${technician}" readonly>
                        <input type="hidden" value="${techId}" name="techId">
                        <input type="hidden" value="${mrd_id}" name="mrd_id">
                        <input type="hidden" value="${reading_no}" name="readingNo">
                    </td>
                    <td style="width: 15%;"></td>
                    <td class="txtStyleSanRegularMgr" style="width: 20%">
                        Last Update By
                    </td>
                    <td style="width: 25%">
                        <input type="text" class="mgrFormDesign" id="lastUpdateBy" name="lastUpdateBy" value="${updBy}" readonly>
                    </td>
                </tr>
            </table>
            <table id="dtMeterReading" class="formTable compact hover tableMGRStyle" style="top: 10px; position: relative !important;">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th class="mgrTxtAlignLeft" hidden></th>
                    </tr>
                    <tr>
                        <th hidden></th>
                        <th hidden></th>
                        <th class="mgrTxtAlignLeft">#</th>
                        <th class="mgrTxtAlignLeft">Model</th>
                        <th class="mgrTxtAlignLeft">Serial No.</th>
                        <th class="mgrTxtAlignLeft">Location</th>
                        <th class="mgrTxtAlignLeft">Mono</th>
                        <th class="mgrTxtAlignLeft">Colour</th>
                        <th class="mgrTxtAlignLeft">Total</th>
                        <th class="mgrTxtAlignLeft">Remarks</th>
                        <th class="mgrTxtAlignLeft">Taken</th>
                        <th class="mgrTxtAlignLeft">Verified</th>
                    </tr>
                </thead>
 
                <tbody>
                    <c:forEach items="${listOfCustomer}" var="cust" varStatus="loop1">
                        <tr id="cust" style="background-color: #e0f8e2"><th colspan="10" style="text-align: left">${cust}</th>
                        </tr>
                    <c:forEach items="${listOfMeterReading}" var="meter" varStatus="loop">
                        <c:if test="${cust eq meter.customer}">    
                        <tr id="meter">
                            <td hidden><input type="text" name="meterId_${loop.count}" value="${meter.id}" id="meterId_${loop.count}"></td>
                            <td hidden><input type="text" name="cust_${loop.count}" value="${meter.customer}" id="cust_${loop.count}"></td>
                            <td>${loop.count}</td>
                            <td>${meter.model}</td>
                            <td>${meter.serial}<input type="hidden" id="serial_${loop.count}" value="${meter.serial}"></td>
                            <td>${meter.location}</td>
                            <td><input type="text" id="mono_${loop.count}" name="mono_${loop.count}" class="mgrFormDesign mono" value="${meter.mono}" onchange="monoValidation($(this));" onkeypress="return isNumberPlusComma(event, $(this));"></td>
                            <td><input type="text" id="colour_${loop.count}" name="colour_${loop.count}" class="mgrFormDesign colour" value="${meter.colour}" onchange="colourValidation($(this));" onkeypress="return isNumberPlusComma(event, $(this));"></td>
                            <td><input type="text" name="total_${loop.count}" id="total_${loop.count}" class="mgrFormDesign total" value="${meter.total}"></td>
                            <td><input type="text" id="remark_${loop.count}" name="remark_${loop.count}" class="mgrFormDesign" value="${meter.remarks}"></td>
                            <td><input type="checkbox" id="taken_${loop.count}" name="taken_${loop.count}" class="checkBoxMgrContainer" value="${meter.taken}"></td>
                            <td><input type="checkbox" id="verified_${loop.count}" name="verified_${loop.count}" class="checkBoxMgrContainer" value="${meter.verified}"></td>
                        </tr>
                        </c:if>
                    </c:forEach>
                    </c:forEach>
                </tbody>
            </table>
            <div class="mgrSpace100" style="margin-top: 20px">
                <input type="hidden" id="totalRow" name="totalRow" value="${totalRow}">
                <input type="button" id="btnDuplicate" class="btnGreenVersionMGR mgrFloatLeft" value="Duplicate Template">
                <input type="button" id="btnPrint" class="btnGreenVersionMGR mgrFloatLeft mgrButtonSpacing" value="Print">
                <input type="button" id="btnUpdate" class="btnGreenVersionMGR mgrFloatRight" value="Update">
            </div>
        </form>
        </div>
    </body>
</html>
