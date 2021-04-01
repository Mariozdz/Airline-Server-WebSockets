package Model;


import Datos.FlightDao;
import Logic.Flight;

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
}
