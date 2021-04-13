package Model;



import Datos.TicketDao;
import Logic.Ticket;
import org.json.JSONArray;

import java.util.List;

public class TicketModel {

    private static TicketModel instance = null;
    private TicketDao entity;

    private TicketModel() {
        this.entity = new TicketDao();
    }

    public TicketDao getEntity() {
        return entity;
    }

    public static TicketModel getInstance() {
        if (instance == null)
            instance = new TicketModel();
        return instance;
    }

    public void Insert(Ticket u) throws Throwable {
        entity.insert(u);
    }
    public void Update(Ticket u) throws Throwable {
        entity.update(u);
    }
    public void Delete(int id) throws Throwable {
        entity.delete(id);
    }
    public Ticket Get(int id) throws Throwable {
        return entity.get(id);
    }
    public List<Ticket> search() throws Throwable {
        System.out.println("la wea prueba");
        System.out.println(entity.search().size());
        return entity.search();
    }

    public List<Ticket> getbypurchase(int id) throws Throwable {
        return entity.getbypurchase(id);
    }

    public JSONArray getacquiredfields(int id) throws Throwable {

        System.out.println(entity.getacquiredfields(id).length());
        return entity.getacquiredfields(id);

    }

}
