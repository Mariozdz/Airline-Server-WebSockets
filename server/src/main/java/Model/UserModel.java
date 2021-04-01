package Model;

import Datos.UserDao;
import Logic.Auser;

import java.util.List;

public class UserModel {

    private static UserModel instance = null;
    private UserDao entity;

    private UserModel() {
        this.entity = new UserDao();
    }

    public UserDao getEntity() {
        return entity;
    }

    public static UserModel getInstance() {
        if (instance == null)
            instance = new UserModel();
        return instance;
    }


    public void Insert(Auser u) throws Throwable {
        entity.insert(u);
    }
    public void Update(Auser u) throws Throwable {
        entity.update(u);
    }
    public void Delete(String id) throws Throwable {
        entity.delete(id);
    }
    public Auser Get(String id) throws Throwable {
            return entity.get(id);
    }
    public List<Auser> search() throws Throwable {
        return entity.search();
    }




}
