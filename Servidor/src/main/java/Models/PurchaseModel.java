package Models;


import Datos.PurchaseDao;
import Logic.Purchase;

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
}
