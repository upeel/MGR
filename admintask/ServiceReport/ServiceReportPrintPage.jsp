<%-- 
    Document   : ServiceReportPrintPage
    Created on : 23 Aug, 2019, 11:34:18 AM
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
        <title>Service Report Print Page</title>
        
        <jsp:include page="../include/include.jsp"/>
        
        <!-- css js -->
        <link rel="stylesheet" type="text/css" href="./include/css/ServiceReportPrintPage.css">
        <script type="text/javascript" src="./include/js/ServiceReportPrintPage.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="message" value="${param.message}" readonly hidden>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
             <jsp:param name="formTitle" value="Service Report"></jsp:param>
        </jsp:include>
        
        <div class="defaultBody">
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
                            <input type="text" readonly value="${serviceReportHeader.date}" class="mgrFormDesign">
                        </td>
                    </tr>   

                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Job No.</td>
                        <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" readonly value="${serviceReportHeader.job_no}" class="mgrFormDesign">
                        </td>
                    </tr>  

                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Company</td>
                        <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" readonly value="${serviceReportHeader.company}" class="mgrFormDesign">
                        </td>
                    </tr> 

                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Name</td>
                        <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" readonly value="${serviceReportHeader.name}" class="mgrFormDesign">
                        </td>
                    </tr> 

                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Contact</td>
                        <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" readonly value="${serviceReportHeader.contact}" class="mgrFormDesign">
                        </td>
                    </tr> 

                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Location</td>
                        <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" readonly value="${serviceReportHeader.location}" class="mgrFormDesign">
                        </td>
                    </tr> 

                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Model</td>
                        <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" readonly value="${serviceReportHeader.model}" class="mgrFormDesign">
                        </td>
                    </tr> 

                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Serial No.</td>
                        <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" readonly value="${serviceReportHeader.serial_no}" class="mgrFormDesign">
                        </td>
                    </tr> 

                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Technician</td>
                        <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" readonly value="${serviceReportHeader.technician_name}" class="mgrFormDesign">
                        </td>
                    </tr> 

                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Service Date</td>
                        <td colspan="4" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" readonly value="${serviceReportHeader.service_date}" class="mgrFormDesign">
                        </td>
                    </tr> 

                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Start Time</td>
                        <td class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" readonly value="${serviceReportHeader.start_time}" class="mgrFormDesign">
                        </td>
                    </tr>

                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">End Time</td>
                        <td class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">   
                            <input type="text" readonly value="${serviceReportHeader.end_time}" class="mgrFormDesign">
                        </td>                        
                    </tr> 
                </tbody>
            </table>
                        
            <div class="div1">
                <div class="div2">
                    <table class="defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0" style="overflow: auto !important;">    
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
                                    Job Done
                                </th>
                            </tr>
                        </thead>
                        <tbody id="tbodyJobDone">
                            <tr>
                                <td colspan="4" class="underline mgrPaddingLeft20 mgrPaddingRight20 paddingBottom paddingTop">
                                    <textarea class="mgrTextAreaOnTable mgrFormDesign" id="txtServiceJobDoneRemarks" name="txtServiceJobDoneRemarks" maxlength="300" readonly>${serviceReportHeader.job_done_remarks}</textarea>
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
                                <th style="text-align: left; height: 50px !important; margin-bottom: 20px" class="underline mgrPaddingLeft20" class="underline mgrPaddingLeft20 textLeft">
                                    #
                                </th>

                                <th style="text-align: left; height: 50px !important; margin-bottom: 20px" class="underline mgrPaddingLeft20">
                                    Part Used
                                </th>

                                <th style="text-align: left; height: 50px !important; margin-bottom: 20px" class="underline mgrPaddingLeft20">
                                    UOM
                                </th>

                                <th style="text-align: left; height: 50px !important; margin-bottom: 20px" class="underline mgrPaddingLeft20">
                                    Qty
                                </th>
                            </tr>
                        </thead>

                        <tbody id="tbodyPartUsed">
                            <c:forEach var="partUsed" items="${serviceReportHeader.listOfPartUsedDetails}" varStatus="loop">
                                <tr id="trPart_${loop.count}" name="trPart_${loop.count}" class="trPart">                                    
                                    <td class="mgrPaddingLeft20 underline paddingTop paddingTopBottom">
                                        ${loop.count}.
                                    </td>

                                    <td class="underline mgrPaddingLeft20 paddingTop paddingTopBottom">
                                        ${partUsed.part_no}                              
                                    </td>

                                    <td class="underline mgrPaddingLeft20 paddingTop paddingTopBottom">
                                        ${partUsed.item_uom_name}
                                    </td>

                                    <td class="underline mgrPaddingLeft20 mgrPaddingRight20 paddingTop paddingTopBottom">
                                        <fmt:formatNumber maxFractionDigits="1" value="${partUsed.quantity}" />
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
                                    <input style="text-align: right; width: 100px;" data-current="0" type="text" id="txtServiceBWBefore" name="txtServiceBWBefore" class="mgrFormDesign txtServiceBWBefore txtMeterReading" value="<fmt:formatNumber maxFractionDigits="1" value="${serviceReportHeader.bw_before}"/>" readonly>
                                </td>

                                <td class="meterStart">
                                    <input style="text-align: right; width: 100px;" data-current="0" type="text" id="txtServiceBWNow" name="txtServiceBWNow" class=" mgrFormDesign txtServiceBWNow txtMeterReading" value="<fmt:formatNumber maxFractionDigits="1" value="${serviceReportHeader.bw_now}"/>" readonly>
                                </td>

                                <td class="meterEnd">
                                    <input style="text-align: right; width: 100px;" type="text" id="txtServiceBWUsed" name="txtServiceBWUsed" class="mgrFormDesign txtServiceBWUsed" value="<fmt:formatNumber maxFractionDigits="1" value="${serviceReportHeader.bw_used}"/>" readonly></td>
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
                                    <input style="text-align: right; width: 100px;" data-current="0" type="text" id="txtServiceBWBefore" name="txtServiceBWBefore" class="mgrFormDesign txtServiceBWBefore txtMeterReading" value="<fmt:formatNumber maxFractionDigits="1" value="${serviceReportHeader.color_before}"/>" readonly>
                                </td>

                                <td class="meterStart">
                                    <input style="text-align: right; width: 100px;" data-current="0" type="text" id="txtServiceBWNow" name="txtServiceBWNow" class=" mgrFormDesign txtServiceBWNow txtMeterReading" value="<fmt:formatNumber maxFractionDigits="1" value="${serviceReportHeader.color_now}"/>" readonly>
                                </td>

                                <td class="meterEnd">
                                    <input style="text-align: right; width: 100px;" type="text" id="txtServiceBWUsed" name="txtServiceBWUsed" class="mgrFormDesign txtServiceBWUsed" value="<fmt:formatNumber maxFractionDigits="1" value="${serviceReportHeader.color_used}"/>" readonly></td>
                            </tr> 
                        </tbody>
                    </table>
                </div>                    
            </div>
                            
            <table class="defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace50" cellspacing="0" style="overflow: auto !important;">
                <tbody id="tbodyEmail">
                    <tr>
                        <td class="mgrPaddingLeft20 paddingTop paddingBottom" style="width: 120px;">Call Status</td>
                        <td colspan="4" class="paddingTop paddingBottom mgrPaddingLeft20 mgrPaddingRight20 maxWidth">
                            <input type="text" class="mgrFormDesign" value="${serviceReportHeader.call_status}" readonly>     
                        </td>                         
                    </tr>

                    <tr>
                        <td class="paddingBottom mgrPaddingLeft20" style="width: 120px;">
                            Follow Up Remark
                        </td>

                        <td colspan="4" class="paddingBottom mgrPaddingRight20 mgrPaddingLeft20">
                            <input type="text" value="${serviceReportHeader.follow_up_remark}" maxlength="300" id="txtFollowUpRemark" name="txtFollowUpRemark" class="mgrFormDesign txtFollowUpRemark maxWidth" readonly/>
                        </td>
                    </tr>

                    <tr>
                        <td class="paddingBottom mgrPaddingLeft20" style="width: 120px;">
                            Verified By
                        </td>
                        <td colspan="4" class="paddingBottom mgrPaddingRight20 mgrPaddingLeft20">
                            <input type="text" value="${serviceReportHeader.verified_by}" readonly maxlength="100" id="txtVerifiedBy" name="txtVerifiedBy" class="mgrFormDesign txtVerifiedBy maxWidth"/>
                        </td>
                    </tr>

                    <tr>
                        <td class="paddingBottom mgrPaddingLeft20" colspan="5">
                            Signature
                        </td>                            
                    </tr>

                    <tr>
                        <td colspan="5" class="paddingBottom" style="padding-left: 8px;">
                            <img src="../../GetAttachmentFile?attachmentFilePath=${serviceReportHeader.signature_image_file_path}" alt="signature" style="width: 300px;">
                        </td>
                    </tr>

                    <tr>
                        <td colspan="5" class=" paddingBottom mgrPaddingLeft20" style="width: 120px;">
                            <label class="checkBoxMgrContainer itemCategory" style="padding-bottom: 5px; "> Email Customer              
                                <input type="checkbox" class="chkCategory" id="cbEmailCustomer" name="cbEmailCustomer" ${serviceReportHeader.is_email_customer eq 1 ? 'checked' : ''} disabled>
                                <span class="checkmarkMgr"></span>                      
                            </label> 
                        </td>
                    </tr>
                </tbody>
            </table>
            <input style="margin-bottom: 20px;" type="button" id="btnReportSubmit" class="update mgrFloatRight txtStyleSanRegularMgr" onclick="fnOpenPopUpWindow('service report PDF', '../../GetAttachmentFile?attachmentFilePath=${serviceReportHeader.service_pdf_file_path}')" value="Preview PDF">
        </div>
    </body>
</html>
