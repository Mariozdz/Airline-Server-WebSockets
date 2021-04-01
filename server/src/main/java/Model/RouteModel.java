package Model;

import Datos.RouteDao;
import Logic.Route;

import java.util.List;

public class RouteModel {

    private static RouteModel instance = null;
    private RouteDao entity;

    private RouteModel() {
        this.entity = new RouteDao();
    }

    public RouteDao getEntity() {
        return entity;
    }

    public static RouteModel getInstance() {
        if (instance == null)
            instance = new RouteModel();
        return instance;
    }

    public void Insert(Route u) throws Throwable {
        entity.insert(u);
    }
    public void Update(Route u) throws Throwable {
        entity.update(u);
    }
    public void Delete(int id) throws Throwable {
        entity.delete(id);
    }
    public Route Get(int id) throws Throwable {
        return entity.get(id);
    }
    public List<Route> search() throws Throwable {
        return entity.search();
    }
}
