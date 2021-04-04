package Datos;

import Logic.Route;
import oracle.jdbc.OracleTypes;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RouteDao extends InterfaceDao<Route,Integer>{

    public RouteDao()
    {
        super();
    }
    @Override
    public void insert(Route r) throws Throwable {
        String sp = "{CALL prc_insert_route(?,?,?,?,?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, r.getDuration());
        pstmt.setInt(2, r.getOrigenid());
        pstmt.setInt(3, r.getDestinoid());
        pstmt.setDouble(4, r.getPrice());
        pstmt.setDouble(5, r.getDiscount());

        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to insert the route");
        }
    }

    @Override
    public void update(Route r) throws Throwable {
        String sp = "{CALL prc_update_route(?,?,?,?,?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, r.getId());
        pstmt.setInt(2, r.getDuration());
        pstmt.setInt(3, r.getOrigenid());
        pstmt.setInt(4, r.getDestinoid());
        pstmt.setDouble(5, r.getPrice());
        pstmt.setDouble(5, r.getDiscount());
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to update the route");
        }
    }

    @Override
    public void delete(Integer id) throws Throwable {
        String sp = "{CALL prc_delete_route(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, id);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to delete the route.");
        }
    }

    @Override
    public Route get(Integer id) throws Throwable {
        String sp = "{? = call fn_getone_route(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.registerOutParameter(1,OracleTypes.CURSOR);
        pstmt.setInt(2, id);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to read the route.");
        }
        ResultSet rs = (ResultSet) pstmt.getObject(1);
        if (rs.next()) {
            return instance(rs);
        }
        return null;
    }

    @Override
    public Route instance(ResultSet rs) throws Throwable {
        try {
            Route r = new Route();

            r.setId(rs.getInt("ID"));
            r.setDuration(rs.getInt("Duration"));
            r.setOrigenid(rs.getInt("OrigenId"));
            r.setDestinoid(rs.getInt("DestinoId"));
            r.setPrice(rs.getDouble("Price"));
            r.setDiscount(rs.getInt("Discount"));

            return r;
        } catch (SQLException ex) {
            System.out.println(ex.toString());
            return null;
        }
    }

    @Override
    public List<Route> search() throws Throwable {
        List<Route> result = new ArrayList();
        try {
            String sp = "{? = call fn_get_route()}";
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
