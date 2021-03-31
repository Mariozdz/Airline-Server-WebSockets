package Datos;

import java.sql.ResultSet;
import java.util.List;

public interface Dao<T, K> {

    public List<T> search() throws Throwable;

    public List<T> search(K s) throws Throwable;

    public void insert(T s) throws Throwable;

    public void delete(K s) throws Throwable;

    public void update(T s) throws Throwable;

    public T get(K s) throws Throwable;

    public T instance(ResultSet rs) throws Throwable;

}
