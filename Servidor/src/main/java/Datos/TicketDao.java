package Datos;

import Logic.Route;
import Logic.Ticket;
import oracle.jdbc.OracleTypes;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class TicketDao extends InterfaceDao<Ticket, Integer>{


    public TicketDao()
    {
        super();
    }
    @Override
    public void insert(Ticket t) throws Throwable {
        String sp = "{CALL prc_insert_ticket(?,?,?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, t.getScolum());
        pstmt.setInt(2, t.getSrow());
        pstmt.setInt(3, t.getPurchaseid());

        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to insert the ticket");
        }
    }

    @Override
    public void update(Ticket t) throws Throwable {
        String sp = "{CALL prc_update_ticket(?,?,?,?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, t.getId());
        pstmt.setInt(1, t.getScolum());
        pstmt.setInt(2, t.getSrow());
        pstmt.setInt(3, t.getPurchaseid());
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to update the ticket");
        }
    }

    @Override
    public void delete(Integer id) throws Throwable {
        String sp = "{CALL prc_delete_ticket(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, id);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to delete the ticket.");
        }
    }

    @Override
    public Ticket get(Integer id) throws Throwable {
        String sp = "{CALL fn_getone_ticket(?)}";
        CallableStatement pstmt = this.db.getConnection().prepareCall(sp);
        pstmt.setInt(1, id);
        boolean flag = pstmt.execute();
        if (flag) {
            throw new Exception("Impossible to read the ticket.");
        }
        ResultSet rs = (ResultSet) pstmt.getObject(1);
        if (rs.next()) {
            return instance(rs);
        }
        return null;
    }

    @Override
    public Ticket instance(ResultSet rs) throws Throwable {
        try {
            Ticket t = new Ticket();

            t.setId(rs.getInt("ID"));
            t.setScolum(rs.getInt("Scolum"));
            t.setSrow(rs.getInt("Srow"));
            t.setPurchaseid(rs.getInt("PurchaseId"));

            return t;
        } catch (SQLException ex) {
            System.out.println(ex.toString());
            return null;
        }
    }

    @Override
    public List<Ticket> search() throws Throwable {
        List<Ticket> result = new ArrayList();
        try {
            String sp = "{CALL fn_get_ticket()}";
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
