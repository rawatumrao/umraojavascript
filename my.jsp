<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<%@ page import="java.net.*"%>
<%@ page import="tcorej.*"%>
<%@ include file="/include/globalinclude.jsp"%>
<%

	PFO pfo = new PFO(request);
	UFO ufo = new UFO(request);

	Logger logger = Logger.getInstance();
	final String ACTION_ADD = "ADD";
	final String ACTION_EDIT = "EDIT";
	int iEventId = -1;
	String sDataValue = Constants.EMPTY;
	boolean bHasCountryInMasterField = false;
	try{
	
		String action = ACTION_ADD;
		
		if(request.getParameter("action") != null && request.getParameter("action").equals(ACTION_EDIT)){
			action = ACTION_EDIT;
		}
		
		
		String sFieldId = request.getParameter("sFieldId");
		boolean bHasLocation = false;
	
		try{ iEventId = Integer.parseInt(request.getParameter(Constants.RQEVENTID)); }catch(Exception e){}
		
		String sQueryString = pfo.toQueryString() + "&" + ufo.toQueryString();
		
		boolean isSubField = false;
		boolean foundField = false;
		HashMap<String,String> currentField = null;
		HashMap<String,String> aOptincurrentregfield = null;
		
		String sFieldType = Constants.EMPTY;
		int iFieldOrder = 0;
		String sFieldDisplay = Constants.EMPTY;
		boolean bFieldRequired = false;
		String sFieldAbstract = Constants.EMPTY;
		int iQuestionType = 0;
		boolean bFieldMasterfield = false;
		boolean bFieldDeleted = false;
		boolean bMultiAnswer = false;
		HashMap<String,String> currCountryField = RegistrationTools.getFieldByEventIdFieldId(iEventId,Constants.REGISTRATION_MASTERFIELDID_COUNTRY,Constants.DB_ADMINDB,false);
		if(!General.isNullorEmpty(currCountryField.get("fieldid"))){
			bHasCountryInMasterField = true;
		}
		if(iEventId != -1 && sFieldId != null){
			//try to lookup field
			currentField = RegistrationTools.getFieldByEventIdFieldId(iEventId,sFieldId,Constants.DB_ADMINDB,true);
			if(!General.isNullorEmpty(currentField.get("fieldid"))){
				foundField = true;
				sFieldId = currentField.get("fieldid");
				sFieldType = currentField.get("fieldtype");
				iFieldOrder = Integer.parseInt(currentField.get("fieldorder"));
				sFieldDisplay = currentField.get("display");
				bFieldRequired = General.getBooleanValue(currentField.get("required"));
				sFieldAbstract = currentField.get("abstractname");
				iQuestionType = Integer.parseInt(currentField.get("questiontype"));
				bFieldMasterfield = General.getBooleanValue(currentField.get("masterfield"));
				bFieldDeleted = General.getBooleanValue(currentField.get("deleted"));
			
				if(bHasCountryInMasterField){
					aOptincurrentregfield = RegistrationTools.getOptinregfieldbyFieldId(iEventId,sFieldId,Constants.DB_ADMINDB);
					if(aOptincurrentregfield!=null && !aOptincurrentregfield.isEmpty()){
						sDataValue = aOptincurrentregfield.get("datavalue");
						bHasLocation = true;
					}
					
				}
				
			}
			if(foundField){
				//if(sValue_MainSub != null && sValue_MainSub.equals("child")){
					//isSubField = true;
				//}
			}
		}
		
		if(sFieldType.equals("select-one") || sFieldType.equals("checkbox") || sFieldType.equals("radio")){
			bMultiAnswer = true;
		}
		
		String formName = Constants.EMPTY;
		String closeLinkId = Constants.EMPTY;
		
		//setup form
		formName = "frmAddEditCustomField";
		closeLinkId = "closeAddCustRegLink";
		
		
	%>

<form id="frmAddEditCustomField" name="frmAddEditCustomField" method="post" action="">
  <table class="whitebox" id="addCustomRegQuestion">
    <tr height="20">
      <td colspan="3"><span class="adminFieldName"><%= action.equals(ACTION_EDIT) ? "Edit" : "New" %> Custom Registration Question</span>
        <input type="hidden" name="action" value="<%=action%>">
        <input type="hidden" name="<%=Constants.RQEVENTID%>" value="<%=iEventId%>">
        <input type="hidden" name="param_fieldOrder" value="<%=iFieldOrder%>">
        <input type="hidden" name="param_fieldId" value="<%=sFieldId%>">
        <input type="hidden" name="ui" value="<%=ufo.sUserID%>">
         <input type="hidden" name="param_isRequired" value="<%=bFieldRequired%>">
        <br /><br /></td>
    </tr>
    <%if(!foundField && action.equals(ACTION_EDIT)){ %>
    <tr>
      <td colspan="3"><span class="note">Field Not Found.</span></td>
    </tr>
    <tr>
      <td colspan="3" align="center">[ <a id="<%=closeLinkId%>" href="#">close</a> ]</td>
    </tr>
    <%}else{ %>
    <% ArrayList<HashMap<String,String>> answerList = RegistrationTools.getCustomAnswersByEventIdFieldId(iEventId,sFieldId,Constants.DB_ADMINDB); %>
    <tr valign="top">
      <td><table width="400">
          <tr>
            <td width="40%" height="20" valign="top"><strong>Question Text:</strong></td>
            <td width="60%" height="20" valign="top"><input type="text" id="param_fieldDisplay" name="param_fieldDisplay" value="<%=sFieldDisplay%>" size="30" /></td>
          </tr>
          <tr valign="top" height="20">
            <td height="20"> <strong>Answer Type:</strong></td>
            <td height="20"><select id="addEditFieldTypeSelector" name="param_fieldType">
                <option value="<%=Constants.REGISTRATION_FIELDTYPE_TEXT%>" <%=sFieldType.equals(Constants.REGISTRATION_FIELDTYPE_TEXT) ? "selected":"" %>>Open Text Field</option>
                <option value="<%=Constants.REGISTRATION_FIELDTYPE_TEXTAREA%>" <%=sFieldType.equals(Constants.REGISTRATION_FIELDTYPE_TEXTAREA) ? "selected":"" %>>Open Text Area</option>
                <option value="<%=Constants.REGISTRATION_FIELDTYPE_SELECTONE%>" <%=sFieldType.equals(Constants.REGISTRATION_FIELDTYPE_SELECTONE) ? "selected":"" %>>Drop Down List</option>
                <option value="<%=Constants.REGISTRATION_FIELDTYPE_CHECKBOX%>" <%=sFieldType.equals(Constants.REGISTRATION_FIELDTYPE_CHECKBOX) ? "selected":"" %>>Checkboxes</option>
                <option value="<%=Constants.REGISTRATION_FIELDTYPE_RADIO%>" <%=sFieldType.equals(Constants.REGISTRATION_FIELDTYPE_RADIO) ? "selected":"" %>>Radio Buttons</option>
                <option value="<%=Constants.REGISTRATION_FIELDTYPE_SINGLECHECKBOX%>" <%=sFieldType.equals(Constants.REGISTRATION_FIELDTYPE_SINGLECHECKBOX) ? "selected":"" %>>Single Checkbox</option>
              </select></td>
          </tr>
          <tr valign="top" height="20">
            <td height="20"><strong>Report Column Title:</strong><br><span class="note" id="security_note">75 characters or less</span></td>
            <td height="20"><input type="text" id="param_fieldAbstract" name="param_fieldAbstract" value="<%=sFieldAbstract%>" size="30" maxlength="75"/></td>
          </tr>
        </table></td>
      <td width="5"></td>
      <td width="400">
          <div id="answerListWrapper" style="border-left:1px dotted #ccc; margin-left:10px">
              <table width="250" cellpadding="0" cellspacing="3" id="addEditAnswerTable" style="display:<%= bMultiAnswer ? "block":"none" %>; margin-left:15px">
                  <tr>
                    <td colspan="3"><strong>Answers </strong></td>
                  </tr>
                  <tr>
                    <td colspan="2"><input type="text" id="addNewAnswerText" value="" size="31" />
                    </td>
                      <td width="55"> <input id="addNewAnswerBtn" type="button" class="buttonSmall buttonCreate" value="+ Add" style="display:inline;"/><input type="hidden" id="addEditQuestionAnswerCount" name="addEditQuestionAnswerCount" value="<%=answerList.size()%>" />
                        </td>
                  </tr>
               
                  <tr><td colspan="3">&nbsp;</td></tr>
                  <%
                            for(HashMap<String,String> currentAnswer : answerList){ %>     
                  <tr>
                  <td width="45">
                  <input  type="text" class ="answerorderText" id="<%=sFieldId%>_order" name="param_customAnswer_order_<%=answerList.indexOf(currentAnswer)%>_answerorder" size="3" maxlength="3" value="<%=answerList.indexOf(currentAnswer)+1 %>"/>
                  </td>
                    <td>
                     <input type="hidden" name="param_customAnswer_id_<%=answerList.indexOf(currentAnswer)%>_answerId" value="<%=currentAnswer.get("answerid") %>"/>
                    <input type="text" name="param_customAnswer_data_<%=answerList.indexOf(currentAnswer)%>_answerData" value="<%=ContentFilter.escape(currentAnswer.get("answerdata"))%>" size="25" /></td>
                    <td width="55"> <input type="button" class="buttonSmall" value="Remove" onclick="removeAnswer(this);"/></td>
                  </tr>
                  <%}%>
                  <tr id="addAnswerRow">
                    <td width="45" style="font-size:1px">&nbsp;</td>
                    <td width="130" style="font-size:1px">&nbsp;</td>
                    <td width="55" style="font-size:1px">&nbsp;</td>
                  </tr>
                  
              </table>
              
          </div>
      </td>
    </tr>
    <%if(bHasCountryInMasterField){%>
    <tr valign="top">
      <td colspan="4" align="left">
      <br />
      	<input type="checkbox" id="optin" name="optin" value="yes" <%if(bHasLocation){%> checked <%}%> />Only display to users in specific countries.
      	<span id="optinlist_span" <%if(!bHasLocation){%> style="display:none" <%}%>>
      	<select id="optinlist" name="optinlist" title="optinlist" multiple='multiple' data-placeholder="Select a Country">
		<%
			ArrayList<HashMap<String,String>> aAnswerList = RegistrationTools.getMasterAnswersByFieldId(Constants.REGISTRATION_MASTERFIELDID_COUNTRY,Constants.DB_ADMINDB);
			if(aAnswerList!=null && !aAnswerList.isEmpty())	{
				for( HashMap<String,String> answerMap : aAnswerList ){
					String sAnswerId = answerMap.get("answerid");
					String sAnswerData = answerMap.get("answerdata");%>
					<option value="<%=sAnswerData%>" data="<%=sDataValue.indexOf(sAnswerData)%>" <%if(sDataValue.indexOf(sAnswerData)>-1){%> selected <%}%>><%=sAnswerData%></option>								<%
				}
			}%>
	</select>
	</span>
	</td>
    </tr>
    <%}%>
    <tr valign="top">
      <td colspan="4" align="center">
      <br />
     <table id="saveQuestionOrCancelButtons">
     <tr height="20">
      <td colspan="100%" align="center">
      <a href="#" id="closeAddCustRegLink" name="closeAddCustRegLink" class="buttonSmall"  style="display:inline;">Cancel</a> &nbsp;
      <input type="button" id="addEditCustRegSaveBtn" name="addEditCustRegSaveBtn" class="button buttonSave" style="display:inline;" value="Save Question"/>
        <input type="hidden" id="editQuestion" name="editQuestion" value="">
         <input type="hidden" id="editQuestion_idx" name="editQuestion_idx" value="">
        </td>
    </tr>
     </table>
      </td>
    </tr>
    <%}%>
  </table>
</form>
<br />

<%}catch(Exception e){
	logger.log(Logger.CRIT, "frag_addEditCustomReg.jsp", " for event: " + iEventId + ", Error: " + e.getMessage());
	logger.log(Logger.INFO, "frag_addEditCustomReg.jsp", ErrorHandler.getStackTrace(e));
	
%>
<table>
  <tr>
    <td>error.</td>
  </tr>
</table>
<%}%>
