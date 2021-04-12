package Datos;

import Logic.Purchase;
import oracle.jdbc.OracleTypes;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class PurchaseDao extends InterfaceDao<Purchase, Integer> {

    public PurchaseDao()
    {
        super();
    }
    @Override
    public void insert(Purchase p) throws Throwable {
        String sp = "{CALL prc_insert_purchase(?,?,?,?,?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, p.getFlightid());
        pstmt.setString(2, p.getUserid());
        pstmt.setDouble(3, p.getTotalprice());
        pstmt.setInt(4,p.getTickets());
        System.out.println(p.getReturnflightid());
        if (p.getReturnflightid() != 0) {
            pstmt.setInt(5, p.getReturnflightid());
        }else
            pstmt.setNull(5, OracleTypes.INTEGER);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to insert the purchase");
        }
    }

    @Override
    public void update(Purchase p) throws Throwable {
        String sp = "{CALL prc_update_purchase(?,?,?,?,?,?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1,p.getId());
        pstmt.setInt(2, p.getFlightid());
        pstmt.setString(3, p.getUserid());
        pstmt.setDouble(4, p.getTotalprice());
        pstmt.setInt(5,p.getTickets());
        pstmt.setInt(6,p.getReturnflightid());
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to update the purchase");
        }
    }

    @Override
    public void delete(Integer id) throws Throwable {
        String sp = "{? = call prc_delete_purchase(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.registerOutParameter(1,OracleTypes.CURSOR);
        pstmt.setInt(2, id);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to delete the purchase.");
        }
    }

    @Override
    public Purchase get(Integer id) throws Throwable {
        String sp = "{? = call fn_getone_purchase(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.registerOutParameter(1,OracleTypes.CURSOR);
        pstmt.setInt(2, id);
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
            p.setTotalprice(rs.getDouble("TotalPrice"));
            p.setTickets(rs.getInt("Tickets"));
            p.setReturnflightid(rs.getInt("ReturnFlightId"));
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
            String sp = "{? = call fn_get_purchase()}";
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

    public List<Purchase> getbyflight(int id) throws Throwable {
        List<Purchase> result = new ArrayList();
        try {
            String sp = "{? = call fn_get_purchasebyfligh(?)}";
            CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.setInt(2, id);
            pstmt.execute();
            ResultSet rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
                result.add(instance(rs));
            }
        } finally {
            return result;
        }
    }

    public int ticketsComprados(int id) throws Exception {
        String sp = "{? = call fn_cantida_espacios(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.registerOutParameter(1,OracleTypes.INTEGER);
        pstmt.setInt(2, id);
        pstmt.execute();
        return pstmt.getInt(1);
    }

    public List<Purchase> getbyuser(String id) throws Throwable {
        List<Purchase> result = new ArrayList();
        try {
            String sp = "{? = call fn_getbyuser_purchase(?)}";
            CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.setString(2, id);
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
