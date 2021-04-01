package Datos;

import java.sql.ResultSet;
import java.util.List;

public abstract class InterfaceDao<T,K> implements Datos.Dao<T,K> {

    protected Datos.ConnectionSQL db;

    public InterfaceDao() {
        this.db = Datos.ConnectionSQL.getInstance();
    }

    @Override
    public List<T> search() throws Throwable {
        return null;
    }

    @Override
    public List<T> search(K k) throws Throwable {
        return null;
    }

    @Override
    public void insert(T s) throws Throwable {
    }

    @Override
    public void delete(K s) throws Throwable {
    }

    @Override
    public T get(K s) throws Throwable {
        return null;
    }

    @Override
    public void update(T s) throws Throwable {
    }

    @Override
    public T instance(ResultSet rs) throws Throwable {
        return null;
    }

}
