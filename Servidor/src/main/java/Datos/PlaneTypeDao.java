package Datos;

import Logic.Country;
import Logic.Typeplane;
import oracle.jdbc.OracleTypes;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class PlaneTypeDao extends InterfaceDao<Typeplane, Integer>{


    public PlaneTypeDao()
    {
        super();
    }
    @Override
    public void insert(Typeplane t) throws Throwable {
        String sp = "{CALL prc_insert_typeplane(?,?,?,?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setString(1, t.getModel());
        pstmt.setString(2, t.getBrand());
        pstmt.setInt(3, t.getNumberrow());
        pstmt.setInt(4, t.getNumbercolums());
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to insert the typeplane");
        }
    }

    @Override
    public void update(Typeplane t) throws Throwable {
        String sp = "{CALL prc_update_typeplane(?,?,?,?,?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, t.getId());
        pstmt.setString(2, t.getModel());
        pstmt.setString(3, t.getBrand());
        pstmt.setInt(4, t.getNumberrow());
        pstmt.setInt(5, t.getNumbercolums());
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to update the typeplane");
        }
    }

    @Override
    public void delete(Integer id) throws Throwable {
        String sp = "{CALL prc_delete_typeplane(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, id);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to delete the typeplane.");
        }
    }

    @Override
    public Typeplane get(Integer id) throws Throwable {
        String sp = "{CALL fn_getone_typeplane(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, id);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to read the typeplane.");
        }
        ResultSet rs = (ResultSet) pstmt.getObject(1);
        if (rs.next()) {
            return instance(rs);
        }
        return null;
    }

    @Override
    public Typeplane instance(ResultSet rs) throws Throwable {
        try {
            Typeplane t= new Typeplane();

            t.setId(rs.getInt("ID"));
            t.setBrand(rs.getString("Brand"));
            t.setModel(rs.getString("Model"));
            t.setNumbercolums(rs.getInt("NumberColums"));
            t.setNumberrow(rs.getInt("NumberRow"));

            return t;
        } catch (SQLException ex) {
            System.out.println(ex.toString());
            return null;
        }
    }

    @Override
    public List<Typeplane> search() throws Throwable {
        List<Typeplane> result = new ArrayList();
        try {
            String sp = "{CALL fn_get_typeplane()}";
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
