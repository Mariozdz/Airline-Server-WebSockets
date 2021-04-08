package Model;


import Datos.PurchaseDao;
import Logic.*;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;

public class PurchaseModel {

    private static PurchaseModel instance = null;
    private PurchaseDao entity;

    private PurchaseModel() {
        this.entity = new PurchaseDao();
    }

    public PurchaseDao getEntity() {
        return entity;
    }

    public static PurchaseModel getInstance() {
        if (instance == null)
            instance = new PurchaseModel();
        return instance;
    }

    public void Insert(Purchase u) throws Throwable {

        Flight f = FlightModel.getInstance().Get(u.getFlightid());
        Schedule s = ScheduleModel.getInstance().Get(f.getOutbound());
        Route r = RouteModel.getInstance().Get(s.getRouteid());
        u.setTotalprice(u.getTickets() * r.getPrice());

        if (u.getReturnflightid() != 0)
        {
            f = FlightModel.getInstance().Get(u.getReturnflightid());
            s = ScheduleModel.getInstance().Get(f.getOutbound());
            r = RouteModel.getInstance().Get(s.getRouteid());
            double total = (u.getTickets() * r.getPrice());
            u.setTotalprice(u.getTotalprice()+ total);
        }


        entity.insert(u);
    }
    public void Update(Purchase u) throws Throwable {
        entity.update(u);
    }
    public void Delete(int id) throws Throwable {
        entity.delete(id);
    }
    public Purchase Get(int id) throws Throwable {
        return entity.get(id);
    }
    public List<Purchase> search() throws Throwable {
        return entity.search();
    }

    public List<Purchase> getbyflight(int id) throws Throwable {
        return entity.getbyflight(id);
    }

    public int getCantTickets(int id) throws Exception {
        return entity.ticketsComprados(id);
    }

    public Boolean createTickets(JSONObject message) throws Throwable {

        int id = message.getInt("purchaseid");

        JSONArray temp = message.getJSONArray("asientos");

        Purchase ptemp = this.Get(id);

        if (temp.length() > ptemp.getTickets())
        {
            return false;
        }

        for (short i = 0; i < temp.length(); i++)
        {
            JSONObject ticket = temp.getJSONObject(i);
            Ticket t = new Ticket();

            t.setPurchaseid(id);
            t.setSrow(ticket.getInt("x"));
            t.setScolum(ticket.getInt("y"));
            TicketModel.getInstance().Insert(t);
            System.out.print(ticket);

        }
        return true;
    }

}
