package Datos;

import Logic.Flight;
import oracle.jdbc.OracleTypes;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class FlightDao extends InterfaceDao<Flight,Integer> {


    public FlightDao()
    {
        super();
    }

    @Override
    public void insert(Flight f) throws Throwable {
        String sp = "{CALL prc_insert_flight(?,?,?,?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, f.getOutbound());
        pstmt.setDate(2, f.getOutbounddate());
        pstmt.setInt(3, f.getPlaneid());
        pstmt.setDate(4, f.getArrivetime());



        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to insert the flight");
        }
    }

    @Override
    public void update(Flight f) throws Throwable {
        String sp = "{CALL prc_update_flight(?,?,?,?,?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, f.getId());
        pstmt.setInt(2, f.getOutbound());
        pstmt.setDate(3, f.getOutbounddate());
        pstmt.setInt(4, f.getPlaneid());
        pstmt.setDate(5, f.getArrivetime());

        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to insert the flight");
        }
    }

    @Override
    public void delete(Integer id) throws Throwable {
        String sp = "{CALL prc_delete_flight(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, id);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to delete the flight.");
        }
    }

    @Override
    public Flight get(Integer id) throws Throwable {
        String sp = "{? = call fn_getone_flight(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.registerOutParameter(1,OracleTypes.CURSOR);
        pstmt.setInt(2, id);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to read the flight.");
        }
        ResultSet rs = (ResultSet) pstmt.getObject(1);
        if (rs.next()) {
            return instance(rs);
        }
        return null;
    }

    @Override
    public Flight instance(ResultSet rs) throws Throwable {
        try {
            Flight f = new Flight();

            f.setId(rs.getInt("ID"));
            f.setOutbound(rs.getInt("Outbound"));
            f.setOutbounddate(rs.getDate("OutboundDate"));
            f.setPlaneid(rs.getInt("PlaneId"));
            f.setArrivetime(rs.getDate("ArriveTime"));


            return f;
        } catch (SQLException ex) {
            System.out.println(ex.toString());
            return null;
        }
    }

    @Override
    public List<Flight> search() throws Throwable {
        List<Flight> result = new ArrayList();
        try {
            String sp = "{? = call fn_get_flight()}";
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
