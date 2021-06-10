<%-- 
    Document   : ContractMDSQRCodeList
    Created on : 12 Aug, 2019, 12:22:05 PM
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
        <title>QR Code List</title>
        
        <!-- include link,src file --> 
        <jsp:include page="../include/include.jsp"/>
        
        <!-- css and js -->
        <link rel="stylesheet" href="./include/css/ContractMDSQRCodeList.css" type="text/css">
        <script type="text/javascript" src="./include/js/ContractMDSQRCodeList.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
         <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="QR Code List"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">
            <table id="dtContractMDSQRCodeList" class="formTable compact hover tableMGRStyle">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th class="mgrTxtAlignLeft">No.</th>                        
                        <th class="mgrTxtAlignLeft">QR Code</th>
                        <th class="mgrTxtAlignLeft">Model</th>
                        <th class="mgrTxtAlignLeft">Serial #</th>
                        <th class="mgrTxtAlignLeft">Status</th>
                    </tr>                
                </thead>
                
                <tfoot>
                    <tr>
                        <th class="mgrTxtAlignLeft">No.</th>   
                        <th class="mgrTxtAlignLeft">QR Code</th>  
                        <th class="mgrTxtAlignLeft">Model</th>
                        <th class="mgrTxtAlignLeft">Serial #</th>
                        <th class="mgrTxtAlignLeft">Status</th>
                    </tr>
                </tfoot>
                
                <tbody>
                    <c:forEach var="mdsMachineDetail" items="${listOfContractMdsMachineInformationDetails}" varStatus="loop">
                        <tr>
                            <td>
                                ${loop.count}.
                            </td>

                            <td>
                                <img src="<c:url value="../../GetAttachmentFile?attachmentFilePath=${mdsMachineDetail.qr_code_file_path}"/>" alt="${mdsMachineDetail.qr_code_file_path}">                                                           
                           </td>
                            
                            <td>
                                ${mdsMachineDetail.model}
                            </td>
                            
                            <td>
                                ${mdsMachineDetail.serial}
                            </td>

                            <td>
                                ${mdsMachineDetail.status}
                            </td>
                        </tr>
                    </c:forEach>                    
                </tbody>
            </table>
        </div>
    </body>
</html>
