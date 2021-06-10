<%-- 
    Document   : ServiceReport
    Created on : 15 Aug, 2019, 8:34:15 AM
    Author     : Wildan
--%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://sargue.net/jsptags/time" prefix="javatime" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="height=device-height,width=device-width">
        <title>Service Report</title>
        
        <jsp:include page="../include/include.jsp"/>
        
        <!-- CSS JS -->
        <link href="include/css/ServiceReport.css?v=${Version.VERSION}" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/admintask/MGRHeader/include/css/MGRHeader.css">
        <script src="include/js/ServiceReport.js?v=${Version.VERSION}" type="text/javascript"></script>
        
        <!-- signature pad resource helper -->
        <link rel="stylesheet" href="${pageContext.request.contextPath}/include/css/jquery.signaturepad.css?v=${Version.VERSION}">  
        <script src="${pageContext.request.contextPath}/include/js/jquery.signaturepad.min.js?v=${Version.VERSION}"></script>
        <script src="${pageContext.request.contextPath}/include/jtable/external/json2.min.js?v=${Version.VERSION}"></script>
        
        <script type="text/javascript">
            var listOfItemEntitesJson = ${listOfItemEntitesJson};
        </script>
    </head>
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="message" value="${param.message}" readonly hidden>
        
        <div style="width: 100%; background-color: #ffffff;">
            <table class="formTableForLogoAndTable" style="width: 100%;">
                <tr>
                    <td class="formLogoTableCell">
                        <img class="formLogoImage logoImageMGRResp" src="${pageContext.request.contextPath}/include/mgr/include/images/MGR-LOGO/Logo mgr.png" alt="Logo">
                    </td>
                    
                    <td class="formTitleTableCell logoMGRTitleResp">
                        <h2 class="logoMGRTitleResp">Service Report</h2>
                    </td>
                </tr>
            </table>
        </div>
        
        <div class="defaultBody">
            <form method="POST" id="frm" action="ServiceReport">
                <input type="hidden" id="txtServiceCallId" name="txtServiceCallId" value="${serviceReportHeader.service_call_header_id}" readonly>
                <input type="hidden" id="txtServiceReportId" name="txtServiceReportId" value="${serviceReportHeader.id}" readonly>
                <input type="hidden" id="txtBusinessEntityId" name="txtBusinessEntityId" value="${serviceReportHeader.business_entity_id}" readonly>
                <table class="defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0" style="overflow: auto !important;">    
                    <thead class="mgrDataTableThead">
                        <tr>
                            <th colspan="5" style="height: 50px !important; border-radius:  5px;margin-bottom: 20px" class="underline mgrPaddingLeft20">Service Report</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyServiceReport">
                        <tr>
                            <td class="paddingTop paddingBottom mgrPaddingRight20 mgrPaddingLeft20" style="width: 120px">Date</td>
                            <td colspan="4" class="paddingTop paddingBottom mgrPaddingRight20 mgrPaddingLeft20">
                                <input readonly maxlength="50" type="text" id="date" name="date" class="mgrFormDesign date maxWidth" value="${serviceReportHeader.date}"/>
                            </td>
                        </tr>   
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Job No.</td>
                            <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                                <input readonly maxlength="50" type="text" id="jobNo" name="jobNo" class="mgrFormDesign jobNo maxWidth" value="${serviceReportHeader.job_no}"/>
                            </td>
                        </tr>  
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Company</td>
                            <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                                <input readonly maxlength="50" type="text" id="company" name="company" class="mgrFormDesign company maxWidth" value="${serviceReportHeader.company}"/>
                            </td>
                        </tr> 
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Name</td>
                            <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                                <input readonly maxlength="50" type="text" id="name" name="name" class="mgrFormDesign name maxWidth" value="${serviceReportHeader.name}"/>
                            </td>
                        </tr> 
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Contact</td>
                            <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                                <input readonly maxlength="50" type="text" id="contact" name="contact" class="mgrFormDesign contact maxWidth" value="${serviceReportHeader.contact}"/>
                            </td>
                        </tr> 
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Email</td>
                            <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                                <input type="text" id="email" name="email" onchange="emailValidation(this);" class="mgrFormDesign maxWidth admin" value="${serviceReportHeader.email}"/>
                            </td>
                        </tr>
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Model</td>
                            <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                                <input readonly maxlength="50" type="text" id="model" name="model" class="mgrFormDesign model maxWidth" value="${serviceReportHeader.model}"/>
                            </td>
                        </tr> 
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Serial No.</td>
                            <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                                <input readonly maxlength="50" type="text" id="serialNo" name="serialNo" class="mgrFormDesign serialNo maxWidth" value="${serviceReportHeader.serial_no}"/>
                            </td>
                        </tr> 
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Technician <span class="mandatory">*</span></td>
                            <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                                <select id="ddlTechnician" name="ddlTechnician" class="ddlMgr technician dropdown admin">
                                    <option value="0" selected disabled>-- Please Select Technician --</option>
                                    <c:forEach items="${listOfTechnicians}" var="technician">
                                        <option value="${technician.id}">
                                            ${technician.driver_or_technician_name}
                                        </option>
                                    </c:forEach>
                                </select>
                            </td>
                        </tr> 
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Service Date<span class="mandatory">*</span></td>
                            <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                                <input type="text" id="txtServiceDate" name="txtServiceDate" readonly class="mgrFormDesign serviceDate maxWidth admin" value="${serviceReportHeader.service_date}"/>
                            </td>
                        </tr> 
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Start Time<span class="mandatory">*</span></td>
                            <td class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                                <select id="ddlServiceStartTime" name="ddlServiceStartTime" class="startTime dropdown ddlMgr admin">
                                    <option value="0" data-index="NO" selected disabled>-- Please Select Start Time --</option>
                                    <c:forEach items="${listOfServiceTimes}" var="startTime">
                                        <option data-index="${startTime.index_time}" value="${startTime.name}">
                                            ${startTime.name}
                                        </option>
                                    </c:forEach>
                                </select>     
                            </td>
                        </tr>
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">End Time<span class="mandatory">*</span></td>
                            <td class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                                <select id="ddlServiceEndTime" name="ddlServiceEndTime" class="endTime dropdown ddlMgr admin">
                                    <option value="0" data-index="NO" selected disabled>-- Please Select End Time --</option>
                                    <c:forEach items="${listOfServiceTimes}" var="endTime">
                                        <option data-index="${endTime.index_time}" value="${endTime.name}">
                                            ${endTime.name}
                                        </option>
                                    </c:forEach>
                                </select>     
                            </td>                        
                        </tr> 
                    </tbody>
                </table>
                
                <div class="div1">
                    <div class="div2">
                        <table class=" defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0" style="overflow: auto !important;">    
                            <thead class="mgrDataTableThead">
                                <tr>
                                    <th colspan="5" style="height: 50px !important; border-radius:  5px;margin-bottom: 20px" class="underline mgrPaddingLeft20">Job Description</th>
                                </tr>
                            </thead>
                            <tbody id="tbodyJobDesc">
                                <c:forEach items="${serviceReportHeader.listOfJobDescriptionDetails}" var="jobDesc" varStatus="loop">
                                    <tr>
                                        <td style="width:10px" class="underline mgrPaddingLeft20 mgrPaddingRight20">
                                            ${loop.count}.
                                        </td>
                                        
                                        <td colspan="4" class="underline mgrPaddingLeft20 mgrPaddingRight20 paddingTop paddingBottom">
                                            ${jobDesc.job_item_name}
                                            <br>
                                            <small><i><span style="color: #666666 !important;">${jobDesc.job_item_remark}</span></i></small>                                            
                                        </td>
                                    </tr> 
                                </c:forEach>                                
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="div1">
                    <div class="div2">
                        <table class=" defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0" style="overflow: auto !important;">    
                            <thead class="mgrDataTableThead">
                                <tr>
                                    <th colspan="5" style="height: 50px !important; border-radius:  5px;margin-bottom: 20px" class="underline mgrPaddingLeft20">
                                        Job Done <span class="mandatory">*</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="tbodyJobDone">
                                <tr>
                                    <td colspan="4" class="underline mgrPaddingLeft20 mgrPaddingRight20 paddingBottom paddingTop">
                                        <textarea class="mgrTextAreaOnTable mgrFormDesign admin" id="txtServiceJobDoneRemarks" name="txtServiceJobDoneRemarks" maxlength="300"></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="div1">
                    <div class="div2">
                        <table class="defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0" style="overflow: auto !important;">    
                            <thead class="mgrDataTableThead">
                                <tr>
                                    <th class="underline mgrPaddingLeft20 textLeft" style="width: 5px; height: 50px !important; margin-bottom: 20px">
                                        <img id="imgAddPartUsed" class="add logoTheadTableMgr MGRIconButton admin" src="../../include/mgr/include/images/MGR-LOGO/Add mgr.png"/>           
                                    </th>

                                    <th class="underline mgrPaddingLeft20 textLeft" style="width: 10px;">
                                        #
                                    </th>

                                    <th class="mgrPaddingLeft20 textLeft underline" style="width: 100px;">
                                        Part Used
                                    </th>

                                    <th class="mgrPaddingLeft20 textLeft underline" style="width: 20px;">
                                        UOM
                                    </th>

                                    <th class="underline mgrPaddingLeft20 mgrPaddingRight20 textLeft" style="width: 20px; border-top-right-radius: 5px;">
                                        Qty
                                    </th>
                                </tr>
                            </thead>
                            
                            <tbody id="tbodyPartUsed">
                                <c:forEach var="partUsed" items="${serviceReportHeader.listOfPartUsedDetails}" varStatus="loop">
                                    <tr id="trPart_${loop.count}" name="trPart_${loop.count}" class="trPart" >
                                        <td class="underline mgrPaddingLeft20 paddingTop paddingTopBottom">
                                            <img onclick="removeRow($(this));" id="remove_${loop.count}" class="remove admin" style="width: 20px; vertical-align: middle; cursor: pointer;" src="../../include/mgr/include/images/MGR-LOGO/Remove mgr.png"/>
                                        </td>
                                        
                                        <td class="mgrPaddingLeft20 underline paddingTop paddingTopBottom">
                                            ${loop.count}.
                                        </td>
                                        
                                        <td class="underline mgrPaddingLeft20 paddingTop paddingTopBottom">
                                            <input style="width: 150px;" maxlength="50" type="text" id="txtPartNo_${loop.count}" name="txtPartNo_${loop.count}" class="mgrFormDesign txtPartNo admin" value="${partUsed.part_no}"/>
                                            <input type="hidden" id="txtItemId_${loop.count}" name="txtItemId_${loop.count}" value="${partUsed.item_id}" class="txtItemId" readonly>
                                        </td>
                                    
                                        <td class="underline mgrPaddingLeft20 paddingTop paddingTopBottom">
                                            <select id="ddlItemUomId_${loop.count}" style="width: 80px;" class="ddlMgr ddlItemUomId admin" name="ddlItemUomId_${loop.count}">
                                                <option value="0" selected disabled>-- Please Select UOM --</option>
                                                
                                            </select>
                                            <input id="txtItemUomIdHidden_${loop.count}" name="txtItemUomIdHidden_${loop.count}" class="txtItemUomIdHidden" value="${partUsed.item_uom_id}" type="hidden" readonly>
                                        </td>
                                        
                                        <td class="underline mgrPaddingLeft20 mgrPaddingRight20 paddingTop paddingTopBottom">
                                            <input data-current="<fmt:formatNumber maxFractionDigits="1" value="${partUsed.quantity}" groupingUsed="false"/>" style="text-align: right; width: 50px;" type="number" id="txtQuantity_${loop.count}" name="txtQuantity_${loop.count}" class="mgrFormDesign txtQuantity admin" value="<fmt:formatNumber maxFractionDigits="1" value="${partUsed.quantity}" groupingUsed="false"/>">
                                        </td>
                                    </tr>
                                </c:forEach>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="div1">
                    <div class="div2">
                        <table class="defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0" style="overflow: auto !important;">   
                            <thead class="mgrDataTableThead">
                                <tr>
                                    <th colspan="3" class="underlinethin meterStart textLeft" style="text-align: center;border-top-left-radius: 5px; border-top-right-radius: 5px" >Meter Reading</th>                       
                                </tr>

                                <tr>                            
                                    <th class="meterStart textLeft" >BW(Before)</th>
                                    <th class="meterStart textLeft">BW(Now)</th>
                                    <th class="meterEnd textLeft">BW(Used)</th>
                                </tr>
                            </thead>
                            <tbody id="tbodyMeterReading">
                                <tr>                            
                                    <td class="meterStart">
                                        <input style="text-align: right; width: 100px;" data-current="0" type="number" id="txtServiceBWBefore" name="txtServiceBWBefore" class="mgrFormDesign txtServiceBWBefore txtMeterReading admin" value="0">
                                    </td>
                                    
                                    <td class="meterStart">
                                        <input style="text-align: right; width: 100px;" data-current="0" type="number" id="txtServiceBWNow" name="txtServiceBWNow" class=" mgrFormDesign txtServiceBWNow txtMeterReading admin" value="0">
                                    </td>
                                    
                                    <td class="meterEnd">
                                        <input style="text-align: right; width: 100px;" readonly type="number" id="txtServiceBWUsed" name="txtServiceBWUsed" class="mgrFormDesign txtServiceBWUsed admin" value="0"/></td>
                                </tr> 
                            </tbody>
                            <thead class="mgrDataTableThead">
                                <tr>                            
                                    <th class="meterStart textLeft">Colour(Before)</th>
                                    <th class="meterStart textLeft">Colour(Now)</th>
                                    <th class="meterEnd textLeft">Colour(Used)</th>
                                </tr>
                            </thead>
                            <tbody id="trMeter2">
                                <tr>                            
                                    <td class="meterStart">
                                        <input style="text-align: right; width: 100px;" data-current="0" type="number" id="txtServiceColorBefore" name="txtServiceColorBefore" class="mgrFormDesign txtServiceColorBefore txtMeterReading admin" value="0"/>
                                    </td>
                                    
                                    <td class="meterStart">
                                        <input style="text-align: right; width: 100px;" data-current="0" type="number" id="txtServiceColorNow" name="txtServiceColorNow" class="mgrFormDesign txtServiceColorNow txtMeterReading admin" value="0"/>
                                    </td>
                                    
                                    <td class="meterEnd">
                                        <input style="text-align: right; width: 100px;" readonly type="number" id="txtServiceColorUsed" name="txtServiceColorUsed" class="mgrFormDesign txtServiceColorUsed txtMeterReading admin" value="0"/>
                                    </td>
                                </tr> 
                            </tbody>
                        </table>
                    </div>                    
                </div>

                <table class="defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace50" cellspacing="0" style="overflow: auto !important;">
                    <tbody id="tbodyEmail">
                        <tr>
                            <td class="mgrPaddingLeft20 paddingTop paddingBottom" style="width: 120px;">Call Status<span class="mandatory">*</span></td>
                            <td colspan="4" class="paddingTop paddingBottom mgrPaddingLeft20 mgrPaddingRight20 maxWidth">
                                <select id="ddlCallStatus" name="ddlCallStatus" class="ddlCallStatus dropdown ddlMgr admin">
                                    <option value="" selected disabled>-- Please Select Call Status --</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Follow Up Required">Follow Up Required</option>
                                    <option value="Monitoring">Monitoring</option>
                                </select>     
                            </td>                         
                        </tr>

                        <tr>
                            <td class="paddingBottom mgrPaddingLeft20" style="width: 120px;">
                                Follow Up Remark <span id="txtFlwUp" class="mandatory" hidden>*</span>
                            </td>

                            <td colspan="4" class="paddingBottom mgrPaddingRight20 mgrPaddingLeft20">
                                <input type="text" maxlength="300" id="txtFollowUpRemark" name="txtFollowUpRemark" class="admin mgrFormDesign txtFollowUpRemark maxWidth"/>
                            </td>
                        </tr>

                        <tr>
                            <td class="paddingBottom mgrPaddingLeft20" style="width: 120px;">
                                Verified By <span class="mandatory">*</span>
                            </td>
                            <td colspan="4" class="paddingBottom mgrPaddingRight20 mgrPaddingLeft20">
                                <input type="text" maxlength="100" id="txtVerifiedBy" name="txtVerifiedBy" class="mgrFormDesign txtVerifiedBy maxWidth admin"/>
                            </td>
                        </tr>

                        <tr>
                            <td class="paddingBottom mgrPaddingLeft20" colspan="5">
                                Signature <span class="mandatory">*</span>
                            </td>                            
                        </tr>
                        
                        <tr>
                            <td colspan="5" class="paddingBottom" style="padding-left: 8px;">
                                <div class="sigPad admin" id="sigPad">
                                    <div class="typed"></div>
                                    <canvas class="pad admin" style="width: 300px; border: 1px solid #b7b7b7; border-radius: 5px; overflow: hidden;"></canvas>
                                    <input type="hidden" id="txtSignature" name="txtSignature" class="output">
                                    <ul class="sigNav">
                                        <li class="clearButton" style="left:0; width: 50px;">
                                            <a href="#clear" class="txtStyleSanRegularMgr" id="clearSig">Clear</a>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="5" class=" paddingBottom mgrPaddingLeft20" style="width: 120px;">
                                <label class="checkBoxMgrContainer itemCategory" style="padding-bottom: 5px; "> Email Customer              
                                    <input type="checkbox" class="chkCategory admin" id="cbEmailCustomer" name="cbEmailCustomer" value="1">
                                    <span class="checkmarkMgr"></span>                      
                                </label>
                                <!--
                                <input type="text" id="txtEmail" onchange="emailValidation(this)" class="mgrFormDesign" style="margin-top:10px;width: 50%;" name="txtEmail" hidden>
                            -->
                                </td>
                        </tr>
                    </tbody>
                </table>             
                            
                <input type="hidden" id="txtTotalServicePartUsed" name="txtTotalServicePartUsed" readonly/>
            </form>                
            <input style="margin-bottom: 20px;" type="button" id="btnReportSubmit" class="update mgrFloatRight txtStyleSanRegularMgr admin" value="Submit">                
        </div>        
    </body>
</html>
