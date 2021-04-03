package Datos;

import Logic.Country;
import oracle.jdbc.OracleTypes;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CountryDao extends InterfaceDao<Country,Integer>{


    public CountryDao()
    {
        super();
    }
    @Override
    public void insert(Country c) throws Throwable {

        String sp = "{CALL prc_insert_country(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setString(1, c.getName());

        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to insert the country");
        }
    }

    @Override
    public void update(Country c) throws Throwable {
        String sp = "{CALL prc_update_country(?,?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, c.getId());
        pstmt.setString(2, c.getName());

        System.out.println("llega a capa datos");
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to update the country");
        }
    }

    @Override
    public void delete(Integer id) throws Throwable {
        String sp = "{CALL prc_delete_country(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, id);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to delete the country.");
        }
    }

    @Override
    public Country get(Integer id) throws Throwable {
        String sp = "{? = call fn_getone_country(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.registerOutParameter(1, OracleTypes.CURSOR);
        pstmt.setInt(2, id);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to read the country.");
        }
        ResultSet rs = (ResultSet) pstmt.getObject(1);
        if (rs.next()) {
            return instance(rs);
        }
        return null;
    }

    @Override
    public Country instance(ResultSet rs) throws Throwable {
        try {
            Country c= new Country();

            c.setId(rs.getInt("ID"));
            c.setCountry(rs.getString("Name"));

            return c;
        } catch (SQLException ex) {
            System.out.println(ex.toString());
            return null;
        }
    }

    @Override
    public List<Country> search() throws Throwable {
        List<Country> result = new ArrayList();
        try {
            String sp = "{?= call fn_get_country()}";
            CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.execute();
            ResultSet rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
                result.add(instance(rs));
            }
        } finally {
            return result;
        }
    }
}
