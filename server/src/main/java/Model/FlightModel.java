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


        Schedule temp = ScheduleModel.getInstance().Get(u.getOutbound());
        System.out.println("paso el schedule");
        Route tempr = RouteModel.getInstance().Get(temp.getRouteid());
        System.out.println("paso el route");

        Calendar cal = Calendar.getInstance();
        cal.setTime(temp.getSdate());

        cal.add(Calendar.HOUR_OF_DAY, tempr.getDuration());

        u.setArrivetime(new java.sql.Date(cal.getTime().getTime()));

        entity.insert(u);
    }
    public void Update(Flight u) throws Throwable {
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
        return response;
    }

}
