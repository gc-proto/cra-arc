<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<%
' VBscript Document
' Last updated 2016-08-18 by Andrew de Peiza
Dim objConf
Dim objFlds
Dim objMessage
Dim key
Dim regMessage
Dim mailheader
Dim mailfooter
Dim mailfieldformat
Dim maillayout
Dim mailsubject
Dim mailtimestamp
Dim hideblanks
Dim addCC
Dim i

mailtimestamp = Now()
If Request.Form("mailto") <> vbNullString Or Request.Querystring("mailto") <> vbNullString Then
  Set objConf = CreateObject("CDO.Configuration")
  Set objFlds = objConf.Fields
  With objFlds
'    Name or IP of remote SMTP server
    .Item("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "mail.rc.gc.ca"
    .Item("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2
'    .Item("http://schemas.microsoft.com/cdo/configuration/smtpusessl") = True
'    .Item("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate") = 1
'    Server port
'    .Item("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = 25
    .Update
  End With
  Set objMessage = CreateObject("CDO.Message")
  Set objMessage.Configuration = objConf
'  objMessage.Fields("urn:schemas:httpmail:importance") = 2
'  objMessage.Fields.Item("urn:schemas:httpmail:importance") = 2
'  objMessage.Fields.Item("urn:schemas:mailheader:X-Priority") = 5
'  objMessage.Fields.Item("urn:schemas:mailheader:importance") = "low"
' Request read receipt
'  objMessage.Fields.Item("urn:schemas:mailheader:return-receipt-to") = "noreply@cra-arc.gc.ca"
'  objMessage.Fields.Item("urn:schemas:mailheader:disposition-notification-to") = "noreply@cra-arc.gc.ca"
  If Request.Form("hideblanks") <> vbNullString Then
    hideblanks = CBool(Request.Form("hideblanks"))
  ElseIf Request.Querystring("hideblanks") <> vbNullString Then
    hideblanks = CBool(Request.Querystring("hideblanks"))
  Else
    hideblanks = False
  End If
  If Request.Form("cc") = 1 Or Request.Querystring("cc") = 1 Then
    addCC = True
  Else
    addCC = False
  End If
  maillayout = vbNullString
  mailfieldformat = vbNullString
  If Request.Form("maillayout") <> vbNullString Then
    maillayout = htmlDecode(Request.Form("maillayout"))
  ElseIf Request.Querystring("maillayout") <> vbNullString Then
    mailfieldformat = htmlDecode(Request.Querystring("maillayout"))
  ElseIf Request.Form("mailfieldformat") <> vbNullString Then
    mailfieldformat = htmlDecode(Request.Form("mailfieldformat"))
  ElseIf Request.Querystring("mailfieldformat") <> vbNullString Then
    mailfieldformat = htmlDecode(Request.Querystring("mailfieldformat"))
  Else
    mailfieldformat = "<strong>$1</strong><br>$2<br><br>"
  End If
  If Request.Form("subject") <> vbNullString Then
    mailsubject = Request.Form("subject")
  ElseIf Request.Querystring("subject") <> vbNullString Then
    mailsubject = Request.Querystring("subject")
  Else
    mailsubject = vbNullString
  End If
  mailheader = vbNullString
  mailfooter = vbNullString
  regMessage = vbNullString
  If Request.Form.Count > 0 Then
    For i = 1 To Request.Form.Count
      processFields objMessage, regMessage, Request.Form.key(i), Request.Form.Item(i), mailtimestamp, hideblanks, maillayout, mailfieldformat, mailsubject, addCC
    Next
  ElseIf Request.Querystring.Count > 0 Then
    For Each key In Request.Querystring
      processFields objMessage, regMessage, key, Request.Querystring(key), mailtimestamp, hideblanks, maillayout, mailfieldformat, mailsubject. addCC
    Next
  End If
'  objMessage.TextBody = "This is a message."
  If mailfieldformat <> vbNullString Then
    regMessage = mailheader & regMessage & mailfooter
  End If
  objMessage.Subject = mailsubject
  objMessage.HTMLBody = htmlDecode(regMessage)
'  objMessage.CreateMHTMLBody "http://infozone/"
  If Request.Form("mailfrom") = vbNullString And Request.Querystring("mailfrom") = vbNullString Then
    objMessage.From = "Do not reply / Ne pas répondre <ne_pas_repondre-do_not_reply@cra-arc.gc.ca>"
  End If
'  If IsArray(Attachments) = True Then
'    attach all the files in the array.
'    For N = LBound(Attachments) To UBound(Attachments)
'      ensure the attachment file exists and attach it.
'      If Attachments(N) <> vbNullString Then
'        If Dir(Attachments(N), vbNormal) <> vbNullString Then
'          .AddAttachment Attachments(N)
'        End If
'      End If
'    Next N
'  Else
'    ensure the file exists and if so, attach it to the message.
'    If Attachments <> vbNullString Then
'      If Dir(CStr(Attachments), vbNormal) <> vbNullString Then
'        .AddAttachment Attachments
'      End If
'    End If
'  End If
  objMessage.Send
  Set objMessage = Nothing
  Set objFlds = Nothing
  Set objConf = Nothing
End If

Dim pagemsg

If Request.Form("pagemsg") <> vbNullString Or Request.Querystring("pagemsg") <> vbNullString Then
  pagemsg = vbNullString
  If Request.Form("pagemsg") <> vbNullString Then
    pagemsg = htmlDecode(Request.Form("pagemsg"))
  ElseIf Request.Querystring("pagemsg") <> vbNullString Then
    pagemsg = htmlDecode(Request.Querystring("pagemsg"))
  End If
  If Request.Form.Count > 0 Then
    For i = 1 To Request.Form.Count
      pagemsg = displayPageMsg(Request.Form.key(i), Request.Form.Item(i), pagemsg, mailtimestamp)
    Next
  ElseIf Request.Querystring.Count > 0 Then
    For Each key In Request.Querystring
      pagemsg = displayPageMsg(key, Request.Querystring(key), pagemsg, mailtimestamp)
    Next
  End If
  If Request.Form("reply") = vbNullString And Request.QueryString("reply") = vbNullString Then
    response.write (htmlDecode(pagemsg))
  End If
End If

Function replaceEntity(txt, entityArr, chrCode)
Dim entityCounter 

For entityCounter = LBound(entityArr) To UBound(entityArr)
  txt = Replace(txt, entityArr(entityCounter), Chr(chrCode))
Next
replaceEntity = txt
End Function

Function htmlDecode(txt)
Dim tempText

tempText = txt
If txt <> vbNullString Then
  tempText = replaceEntity(txt, Array("&quot;", "&QUOT;", "&#x00022;", "&#34;"), 34)
  tempText = replaceEntity(tempText, Array("&lt;", "&LT;", "&#x0003C;", "&#60;"), 60)
  tempText = replaceEntity(tempText, Array("&gt;", "&GT;", "&#x0003E;", "&#62;"), 62)
End If
htmlDecode = tempText
End Function

Sub processFields(objMessage, regMessage, fieldName, fieldValue, mailtimestamp, hideblanks, maillayout, mailfieldformat, mailsubject, addCC)
Dim fieldDisplay
Dim separator

separator = vbNullString
If LCase(Left(fieldName, 6)) = LCase("mailto") Then
  If fieldValue <> vbNullString Then
    If objMessage.To <> vbNullString Then
      separator = ";"
    End If
    objMessage.To = objMessage.To & separator & fieldValue
  End If
ElseIf LCase(Left(fieldName, 6)) = LCase("mailcc") Then
  If fieldValue <> vbNullString Then
    If objMessage.CC <> vbNullString Then
      separator = ";"
    End If
    objMessage.CC = objMessage.CC & separator & fieldValue
  End If
ElseIf LCase(Left(fieldName, 7)) = LCase("mailbcc") Then
  If fieldValue <> vbNullString Then
    If objMessage.Bcc <> vbNullString Then
      separator = ";"
    End If
    objMessage.Bcc = objMessage.Bcc & separator & fieldValue
  End If
'  ElseIf LCase(Left(fieldName, 10)) = LCase("attachment") Then
'    If fieldValue <> vbNullString Then
'      regMessage = regMessage & "%%" &  fieldName & "%%" & fieldValue& "%%"
'       objMessage.AddAttachment fieldValue
'   End If
Else
  Select Case LCase(fieldName)
  Case "mailfrom"
      objMessage.From = fieldValue
      If addCC = True Then
        If objMessage.CC <> vbNullString Then
          separator = ";"
        End If
		objMessage.CC = objMessage.CC & separator & fieldValue
	  End If
  Case "mailheader"
    mailheader = fieldValue
  Case "mailfooter"
    mailfooter = fieldValue
  End Select
  If LCase(fieldName) <> "reply" And LCase(fieldName) <> "hideblanks" And LCase(fieldName) <> "mailfieldformat" And LCase(fieldName) <> "maillayout" And LCase(fieldName) <> "pagemsg" And LCase(fieldName) <> "cc" Then
    If maillayout <> vbNullString Then
      If LCase(fieldName) = "mailtimestamp" Then
        maillayout = Replace(maillayout, "{" & fieldValue & "}", mailtimestamp)
      Else
        maillayout = Replace(maillayout, "{" & fieldName & "}", fieldValue)
      End If
      regMessage = maillayout
    ElseIf LCase(fieldName) <> "mailheader" And LCase(fieldName) <> "mailfooter" And LCase(fieldName) <> "mailto" And LCase(fieldName) <> "mailcc" And LCase(fieldName) <> "mailbcc" And LCase(fieldName) <> "mailfrom" And LCase(fieldName) <> "subject" And mailfieldformat <> vbNullString And (hideblanks = False Or (hideblanks = True And fieldValue <> vbNullString)) Then
      If LCase(fieldName) = "mailtimestamp" Then
        fieldDisplay = Replace(mailfieldformat, "$1", fieldValue)
        fieldDisplay = Replace(fieldDisplay, "$2", mailtimestamp)
      Else
        fieldDisplay = Replace(mailfieldformat, "$1", fieldName)
        fieldDisplay = Replace(fieldDisplay, "$2", fieldValue)
      End If
      regMessage = regMessage & fieldDisplay
    End If
    If LCase(fieldName) = "mailtimestamp" Then
      mailsubject = Replace(mailsubject, "{" & fieldValue & "}", mailtimestamp)
    Else
      mailsubject = Replace(mailsubject, "{" & fieldName & "}", fieldValue)
    End If
  End If
End If
End Sub
  
Function displayPageMsg(fieldName, fieldValue, pagemsg, mailtimestamp)
  If LCase(fieldName) <> "reply" And LCase(fieldName) <> "hideblanks" And LCase(fieldName) <> "mailfieldformat" And LCase(fieldName) <> "maillayout" And LCase(fieldName) <> "pagemsg" And LCase(fieldName) <> "cc" Then
    If LCase(fieldName) = "mailtimestamp" Then
      pagemsg = Replace(pagemsg, "{" & fieldValue & "}", mailtimestamp)
    Else
      pagemsg = Replace(pagemsg, "{" & fieldName & "}", fieldValue)
    End If
  End If
  displayPageMsg = pagemsg
End Function
%>