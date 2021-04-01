package Model;

import Datos.PlaneTypeDao;
import Logic.Planetype;

import java.util.List;

public class PlaneTypeModel {

    private static PlaneTypeModel instance = null;
    private PlaneTypeDao entity;

    private PlaneTypeModel() {
        this.entity = new PlaneTypeDao();
    }

    public PlaneTypeDao getEntity() {
        return entity;
    }

    public static PlaneTypeModel getInstance() {
        if (instance == null)
            instance = new PlaneTypeModel();
        return instance;
    }

    public void Insert(Planetype u) throws Throwable {
        entity.insert(u);
    }
    public void Update(Planetype u) throws Throwable {
        entity.update(u);
    }
    public void Delete(int id) throws Throwable {
        entity.delete(id);
    }
    public Planetype Get(int id) throws Throwable {
        return entity.get(id);
    }
    public List<Planetype> search() throws Throwable {
        return entity.search();
    }

}
