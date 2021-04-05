<%@ page import="Datos.ConnectionSQL" %>
<%@ page import="Datos.CountryDao" %>
<%@ page import="Logic.Country" %>
<%@ page import="Datos.UserDao" %>
<%@ page import="Logic.Auser" %>
<%@ page import="Model.UserModel" %>
<%@ page import="com.google.gson.JsonObject" %>
<%@ page import="com.google.gson.Gson" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.List" %>
<%@ page import="Model.CountryModel" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="Model.PlaneModel" %>
<%@ page import="Datos.PlaneDao" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<% ConnectionSQL.getInstance();  %>

<%  System.out.println(new PlaneDao().getCompletePlane());

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