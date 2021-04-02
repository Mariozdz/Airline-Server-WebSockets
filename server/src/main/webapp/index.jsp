<%@ page import="Datos.ConnectionSQL" %>
<%@ page import="Datos.CountryDao" %>
<%@ page import="Logic.Country" %>
<%@ page import="Datos.UserDao" %>
<%@ page import="Logic.Auser" %>
<%@ page import="Model.UserModel" %>
<%@ page import="com.google.gson.JsonObject" %>
<%@ page import="com.google.gson.Gson" %>
<%@ page import="org.json.JSONObject" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<% ConnectionSQL.getInstance();  %>

<%  UserModel mode = UserModel.getInstance();
   Auser u = mode.Loginget("User3","123");

   System.out.println("gg"+ u);



%>
<!DOCTYPE html>
<html>
<head>
    <title>GG</title>
</head>
<body>
<h1>
</h1>
<br/>
<a href="hello-servlet">Hello Servlet</a>
</body>
</html>