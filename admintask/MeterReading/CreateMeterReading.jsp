<%-- 
    Document   : CreateMeterReading
    Created on : 13 Jan, 2020, 11:51:59 AM
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
        <title>Create Meter Reading</title>
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/MeterReading.css" type="text/css">
        <script type="text/javascript" src="./include/js/CreateMeterReading.js"></script>
        <script> var listOfCustId = ${listCustId}; </script>
    </head>
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="message" value="${param.message}" readonly hidden>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Create Meter Reading Sheet"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">
        <form id="frm2" method="GET" action="CreateMeterReading">

        </form>
        <form id="frm" method="POST" action="CreateMeterReading">
            <table>
                <tr>
                    <td class="txtStyleSanRegularMgr" style="width: 20%;">
                        Assign To
                    </td>

                    <td style="width: 30%;">
                        <select id="assign" name="tech_id">
                            <option value="0">--Select a Technician--</option>
                            <c:forEach items="${listTech}" var="tech">
                                <option value="${tech.id}" ${param.tech_id eq tech.id ? 'selected' : ''}>${tech.driver_or_technician_name}</option>
                            </c:forEach>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="txtStyleSanRegularMgr" style="width: 20%;">
                        Customer
                    </td>
                    <td style="width: 50%;">
                        <select id="ddlCustomer" name="ddlCustomer" multiple="multiple">
                            <c:forEach items="${listOfCustName}" var="cust">
                                <option value="${cust}" ${param.ddlCustomer eq cust ? 'selected' : ''}>${cust}</option>
                            </c:forEach>
                        </select>
                    </td>
                    <td style="width: 10%;"></td>
                    <td style="width: 20%;">
                        <input type="button" value="Get Machine List" name="btnMachine" id="btnMachine" class="btnMGRStyle mgrFloatRight">
                    </td>
                </tr>
            </table>
            <br>
            <table id="dtMachineList" class="formTable compact hover tableMGRStyle" style="top: 10px; position: relative !important;">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th hidden></th>
                        <th class="mgrTxtAlignLeft">Assign <input type="checkbox" name="checkAll" class="checkBoxMgrContainer" id="checkAll"></th>
                        <th class="mgrTxtAlignLeft">Customer</th>
                        <th class="mgrTxtAlignLeft">Contract Ref</th>
                        <th class="mgrTxtAlignLeft">Model</th>
                        <th class="mgrTxtAlignLeft">Serial No.</th>
                        <th class="mgrTxtAlignLeft">Location</th>
                        <th hidden></th>
                    </tr>
                </thead>
                
                <tbody>
                    <c:forEach items="${listMds}" var="machine" varStatus="loop">
                        <tr>
                            <td hidden><input type="text" name="contractId_${loop.count}" value="${machine.contract_id}"></td>
                            <td><input type="checkbox" name="assign_${loop.count}" id="assign_${loop.count}" class="checkBoxMgrContainer chkbox"></td>
                            <td>${machine.customer}</td>
                            <td>${machine.contractRef}</td>
                            <td>${machine.model}</td>
                            <td>${machine.serial}</td>
                            <td>${machine.customer_shipping_name}</td>
                            <td hidden>
                                <input type="text" id="custName_${loop.count}" name="custName_${loop.count}" value="${machine.customer}">
                                <input type="text" id="contractRef_${loop.count}" name="contractRef_${loop.count}" value="${machine.contractRef}">
                                <input type="text" id="model_${loop.count}" name="model_${loop.count}" value="${machine.model}">
                                <input type="text" id="serial_${loop.count}" name="serial_${loop.count}" value="${machine.serial}">
                                <input type="text" id="location_${loop.count}" name="location_${loop.count}" value="${machine.customer_shipping_name}">
                                <input type="text" id="mono_${loop.count}" name="mono_${loop.count}" value="${machine.copyChargeMono}">
                                <input type="text" id="colour_${loop.count}" name="colour_${loop.count}" value="${machine.copyChargeColor}">
                            </td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
            <table id="dtSerialHidden" hidden>
                <tbody>
                    <c:forEach items="${listOfSerial}" var="serial" varStatus="loop">
                        <tr>
                            <td><input type="text" id="txtSerial_${loop.count}" value="${serial}"></td>
                        </tr>   
                    </c:forEach>
                </tbody>
            </table>
            <table id="dtCustIdHidden" hidden>
                <tbody>
                    <c:forEach items="${listCustId}" var="cust" varStatus="loop">
                        <tr>
                            <td><input type="text" id="txtCustId_${loop.count}" value="${cust}"></td>
                        </tr>   
                    </c:forEach>
                </tbody>
            </table>
            <div class="mgrSpace100" style="margin-top: 20px">
                <input type="button" id="btnCreate" class="btnGreenVersionMGR mgrFloatRight" value="Create">
                <input type="hidden" value="${rowQty}" name="rowQty" id="rowQty">
            </div>
        </form>
        </div>
    </body>
</html>
