package Datos;

import Logic.Plane;
import oracle.jdbc.OracleTypes;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class PlaneDao extends Datos.InterfaceDao<Plane,String> {


    public PlaneDao()
    {
        super();
    }
    @Override
    public void insert(Plane p) throws Throwable {
        String sp = "{CALL prc_insert_planet(?,?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setString(1, p.getId());
        pstmt.setInt(2, p.getTypeplaneid());

        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to insert the plane");
        }
    }

    @Override
    public void update(Plane p) throws Throwable {
        String sp = "{CALL prc_update_plane(?,?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setString(1, p.getId());
        pstmt.setInt(2, p.getTypeplaneid());
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to insert the plane");
        }
    }

    @Override
    public void delete(String id) throws Throwable {
        String sp = "{CALL prc_delete_plane(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setString(1, id);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to delete the plane.");
        }
    }

    @Override
    public Plane get(String id) throws Throwable {
        String sp = "{? = call fn_getone_plane(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.registerOutParameter(1, OracleTypes.CURSOR);
        pstmt.setString(2, id);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to read the plane.");
        }
        ResultSet rs = (ResultSet) pstmt.getObject(1);
        if (rs.next()) {
            return instance(rs);
        }
        return null;
    }

    @Override
    public Plane instance(ResultSet rs) throws Throwable {
        try {
            Plane p = new Plane();

            p.setId(rs.getString("ID"));
            p.setTypeplaneid(rs.getInt("TypePlaneId"));

            return p;
        } catch (SQLException ex) {
            System.out.println(ex.toString());
            return null;
        }
    }

    @Override
    public List<Plane> search() throws Throwable {
        List<Plane> result = new ArrayList();
        try {
            String sp = "{? = call fn_get_plane()}";
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
