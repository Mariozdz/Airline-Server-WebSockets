package Model;


import Datos.CountryDao;
import Logic.Country;

import java.util.List;

public class CountryModel {

    private static CountryModel instance = null;
    private CountryDao entity;

    private CountryModel() {
        this.entity = new CountryDao();
    }

    public CountryDao getEntity() {
        return entity;
    }

    public static CountryModel getInstance() {
        if (instance == null)
            instance = new CountryModel();
        return instance;
    }


    public void Insert(Country u) throws Throwable {
        entity.insert(u);
    }
    public void Update(Country u) throws Throwable {
        entity.update(u);
    }
    public void Delete(int id) throws Throwable {
        entity.delete(id);
    }
    public Country Get(int id) throws Throwable {
        return entity.get(id);
    }
    public List<Country> search() throws Throwable {
        return entity.search();
    }
}
