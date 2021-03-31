package Datos;

import java.sql.*;


public class ConnectionSQL {

    private static ConnectionSQL instance = null;
    private Connection connection;

    private ConnectionSQL()
    {

        String connectionUrl = "jdbc:oracle:thin:@localhost:1521:xe";
        String username = "system" ;
        String password = "root";

        try{
            Class.forName("oracle.jdbc.driver.OracleConnection");
            DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
            this.connection = DriverManager.getConnection(connectionUrl,username,password);
            System.out.println("Conectado :D");

        } catch ( ClassNotFoundException | SQLException ex) {
            System.out.println(ex.toString());
        }

    }

    public Connection getConnection()
    {
        return this.connection;
    }

    public static ConnectionSQL getInstance()
    {
        if (instance == null) instance = new ConnectionSQL();
        return instance;
    }
}
