package Datos;

import Logic.Schedule;
import oracle.jdbc.OracleTypes;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ScheduleDao extends InterfaceDao<Schedule, Integer>{


    public ScheduleDao()
    {
        super();
    }
    @Override
    public void insert(Schedule s) throws Throwable {
        String sp = "{CALL prc_insert_schedule(?,?,?,?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, s.getPlaneid());
        pstmt.setInt(2, s.getRouteid());
        pstmt.setDate(3, s.getStime());
        pstmt.setDate(4, s.getSdate());

        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to insert the schedule");
        }
    }

    @Override
    public void update(Schedule s) throws Throwable {
        String sp = "{CALL prc_update_schedule(?,?,?,?,?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, s.getId());
        pstmt.setInt(2, s.getPlaneid());
        pstmt.setInt(3, s.getRouteid());
        pstmt.setDate(4, s.getStime());
        pstmt.setDate(5, s.getSdate());
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to update the schedule");
        }
    }

    @Override
    public void delete(Integer id) throws Throwable {
        String sp = "{CALL prc_delete_schedule(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, id);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to delete the schedule.");
        }
    }

    @Override
    public Schedule get(Integer id) throws Throwable {
        String sp = "{CALL fn_getone_schedule(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, id);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to read the schedule.");
        }
        ResultSet rs = (ResultSet) pstmt.getObject(1);
        if (rs.next()) {
            return instance(rs);
        }
        return null;
    }

    @Override
    public Schedule instance(ResultSet rs) throws Throwable {
        try {
            Schedule s = new Schedule();

            s.setId(rs.getInt("ID"));
            s.setPlaneid(rs.getInt("PlaneId"));
            s.setRouteid(rs.getInt("RouteId"));
            s.setStime(rs.getDate("STime"));
            s.setSdate(rs.getDate("SDate"));

            return s;
        } catch (SQLException ex) {
            System.out.println(ex.toString());
            return null;
        }
    }

    @Override
    public List<Schedule> search() throws Throwable {
        List<Schedule> result = new ArrayList();
        try {
            String sp = "{CALL fn_get_schedule()}";
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
