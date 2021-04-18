package Model;


import Datos.FlightDao;
import Logic.Flight;
import Logic.Route;
import Logic.Schedule;
import com.google.gson.JsonObject;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Calendar;
import java.util.List;

public class FlightModel {

    private static FlightModel instance = null;
    private FlightDao entity;

    private FlightModel() {
        this.entity = new FlightDao();
    }

    public FlightDao getEntity() {
        return entity;
    }

    public static FlightModel getInstance() {
        if (instance == null)
            instance = new FlightModel();
        return instance;
    }

    public void Insert(Flight u) throws Throwable {

        System.out.println(u.getOutbounddate());
        Schedule temp = ScheduleModel.getInstance().Get(u.getOutbound());
        Route tempr = RouteModel.getInstance().Get(temp.getRouteid());
        Calendar cal = Calendar.getInstance();
        cal.setTime(temp.getSdate());
        cal.add(Calendar.HOUR_OF_DAY, tempr.getDuration());
        u.setArrivetime(new java.sql.Date(cal.getTime().getTime()));

        entity.insert(u);
    }
    public void Update(Flight u) throws Throwable {

        Schedule temp = ScheduleModel.getInstance().Get(u.getOutbound());
        Route tempr = RouteModel.getInstance().Get(temp.getRouteid());
        Calendar cal = Calendar.getInstance();
        cal.setTime(temp.getSdate());
        cal.add(Calendar.HOUR_OF_DAY, tempr.getDuration());
        u.setArrivetime(new java.sql.Date(cal.getTime().getTime()));

        entity.update(u);
    }
    public void Delete(int id) throws Throwable {
        entity.delete(id);
    }
    public Flight Get(int id) throws Throwable {
        return entity.get(id);
    }
    public List<Flight> search() throws Throwable {
        return entity.search();
    }

    public JSONArray getCompleteFlight() throws Throwable {

        JSONArray response = entity.getCompleteFlight();

        JSONArray response2 = new JSONArray();

        for (int i= 0; i < response.length();i++) {
            JSONObject j = response.getJSONObject(i);
            int total = j.getInt("cantidadasientos") - PurchaseModel.getInstance().getCantTickets(j.getInt("id"));
            j.put("disponibles",total);
            response2.put(j);
        }
        return response;
    }

    public JSONArray getflightusers(int flightid) throws Throwable {
        return entity.getFlightUsers(flightid);
    }

}
