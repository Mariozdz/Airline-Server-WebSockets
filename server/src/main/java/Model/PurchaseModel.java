package Model;


import Datos.PurchaseDao;
import Logic.*;
import com.sun.org.apache.xpath.internal.operations.Bool;

import com.sun.tools.javac.util.Pair;
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
            t.setSrow(ticket.getInt("column"));
            t.setScolum(ticket.getInt("row"));
            t.setIsreturn(ticket.getInt("isreturn"));
            TicketModel.getInstance().Insert(t);
            System.out.print(ticket);

        }
        return true;
    }

    public JSONArray getbyuser(String userid) throws Throwable {

        JSONArray result = new JSONArray();

        List<Purchase> purchases = entity.getbyuser(userid);

        for (Purchase p : purchases)
        {
            JSONObject temp = new JSONObject(p);

            if(TicketModel.getInstance().getbypurchase(p.getId()).isEmpty())
            {
                temp.put("isselected",false);
            }
            else
            {
                temp.put("isselected",true);
            }

            result.put(temp);
        }

        return result;
    }

    public JSONArray getTotal() throws Exception {
        JSONArray result = new JSONArray();

        for (int i = 1; i <= 12; i++)
        {
            Pair<String,String> pair =  getMonth(i);
            JSONObject temp = new JSONObject();
            temp.put("name", pair.fst);
            temp.put("y",entity.getTotal(i));
            temp.put("color",pair.snd);

            result.put(temp);
        }

        return result;
    }

    public Pair<String,String> getMonth(int id)
    {
        switch (id)
        {
            case 1: return new Pair<>("January", "#0000FF");
            case 2: return new Pair<>("February", "#FF00FF");
            case 3: return new Pair<>("March","#FF0000");
            case 4: return new Pair<>("April","#FFFF00");
            case 5: return new Pair<>("May","#00FF00");
            case 6: return new Pair<>("June","#00FFFF");
            case 7: return new Pair<>("July","#8A2BE2");
            case 8: return new Pair<>("August","#FF7F50");
            case 9: return new Pair<>("September","#FF1493");
            case 10: return new Pair<>("October","#C0C0C0");
            case 11: return new Pair<>("November","#006400");
            case 12: return new Pair<>("December","#FFD700");
        }
        return new Pair<>("nada","#FFD700");
    }

}
