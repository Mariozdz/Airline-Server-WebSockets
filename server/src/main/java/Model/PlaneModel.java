package Model;

import Datos.PlaneDao;
import Logic.Plane;

import java.util.List;

public class PlaneModel {

    private static PlaneModel instance = null;
    private PlaneDao entity;

    private PlaneModel() {
        this.entity = new PlaneDao();
    }

    public PlaneDao getEntity() {
        return entity;
    }

    public static PlaneModel getInstance() {
        if (instance == null)
            instance = new PlaneModel();
        return instance;
    }


    public void Insert(Plane u) throws Throwable {
        entity.insert(u);
    }
    public void Update(Plane u) throws Throwable {
        entity.update(u);
    }
    public void Delete(int id) throws Throwable {
        entity.delete(id);
    }
    public Plane Get(int id) throws Throwable {
        return entity.get(id);
    }
    public List<Plane> search() throws Throwable {
        return entity.search();
    }

}
