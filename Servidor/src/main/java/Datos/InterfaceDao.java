package Datos;

import java.sql.ResultSet;
import java.util.List;

public abstract class InterfaceDao<T,K> implements Dao<T,K>{

    protected ConnectionSQL db;

    public InterfaceDao() {
        this.db = ConnectionSQL.getInstance();
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
