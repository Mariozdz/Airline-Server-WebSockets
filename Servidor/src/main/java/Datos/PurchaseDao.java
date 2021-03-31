package Datos;

import Logic.Purchase;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import oracle.jdbc.OracleTypes;
import java.sql.SQLException;

public class PurchaseDao extends InterfaceDao<Purchase, Integer> {

    public PurchaseDao()
    {
        super();
    }
    @Override
    public void insert(Purchase p) throws Throwable {
        String sp = "{CALL prc_insert_purchase(?,?,?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, p.getFlightid());
        pstmt.setString(2, p.getUserid());
        pstmt.setDouble(3, p.getTotalprice());
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to insert the purchase");
        }
    }

    @Override
    public void update(Purchase p) throws Throwable {
        String sp = "{CALL prc_update_purchase(?,?,?,?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1,p.getId());
        pstmt.setInt(2, p.getFlightid());
        pstmt.setString(3, p.getUserid());
        pstmt.setDouble(4, p.getTotalprice());
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to update the purchase");
        }
    }

    @Override
    public void delete(Integer id) throws Throwable {
        String sp = "{CALL prc_delete_purchase(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, id);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to delete the purchase.");
        }
    }

    @Override
    public Purchase get(Integer id) throws Throwable {
        String sp = "{CALL fn_getone_purchase(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, id);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to read the purchase.");
        }
        ResultSet rs = (ResultSet) pstmt.getObject(1);
        if (rs.next()) {
            return instance(rs);
        }
        return null;
    }

    @Override
    public Purchase instance(ResultSet rs) throws Throwable {
        try {
            Purchase p = new Purchase();

            p.setId(rs.getInt("ID"));
            p.setFlightid(rs.getInt("FlightId"));
            p.setUserid(rs.getString("UserId"));
            p.setTotalprice(Double.valueOf(rs.getString("TotalPrice")));

            return p;
        } catch (SQLException ex) {
            System.out.println(ex.toString());
            return null;
        }
    }

    @Override
    public List<Purchase> search() throws Throwable {
        List<Purchase> result = new ArrayList();
        try {
            String sp = "{CALL fn_get_purchase()}";
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
