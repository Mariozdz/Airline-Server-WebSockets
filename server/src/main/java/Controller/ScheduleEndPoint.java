package Controller;

import Auxiliar.ConvertDate;
import Auxiliar.DecoderJson;
import Auxiliar.EncoderArrayJson;
import Auxiliar.EnconderJson;
import Logic.Route;
import Logic.Schedule;
import Model.RouteModel;
import Model.ScheduleModel;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@ServerEndpoint(value = "/schedule",
        encoders = {EnconderJson.class, EncoderArrayJson.class},
        decoders = {DecoderJson.class})
public class ScheduleEndPoint {

    private static Set<Session> sessions = new HashSet<>();

    private static JSONObject nullobj = new JSONObject("{ none : \"none\"}");
    /*private static JSONArray nullarr = new JSONArray("{ none : \"none\"}");*/

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("WebSocket opened: " + session.getId());
        sessions.add(session);
    }

    @OnMessage
    public void onMessage(JSONObject message, Session session) throws Throwable {

        try {
            System.out.println(message.getString("Action"));
            interpretar(message,session);

        } catch ( EncodeException | IOException e) {
            e.printStackTrace();
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.out.println("WebSocket error for " + session.getId() + " " + throwable.getMessage());
    }

    @OnClose
    public void onClose(Session session, CloseReason closeReason) {
        System.out.println("WebSocket closed for " + session.getId()
                + " with reason " + closeReason.getCloseCode());
        sessions.remove(session);
    }

    public void broadcast(JSONObject message) throws IOException, EncodeException {
        for (Session s : sessions)
        {

            s.getBasicRemote().sendObject(message);
        }
    }

    public void interpretar(JSONObject message, Session session) throws Throwable {
        String action = message.getString("Action").toUpperCase(Locale.ROOT);

        switch(action)
        {
            case "GET": {
                int id = message.getInt("id");
                JSONObject g = new JSONObject(ScheduleModel.getInstance().Get(id));
                session.getBasicRemote().sendObject(g);
                break;
            }
            case "GET_ALL_SCHEDULE": {
                session.getBasicRemote().sendObject(ScheduleModel.getInstance().searchWithHour());
                break;
            }
            case "GET_ALL_ROUTE":{

                JSONArray u = new JSONArray(RouteModel.getInstance().search());
                session.getBasicRemote().sendObject(u);
                break;
            }
            case "UPDATE_SCHEDULE":{
                Schedule p = new Schedule();
                p.setId(message.getInt("id"));
                p.setSdate(ConvertDate.getInstance().timetodate("sdate")); /*Aqui me tiene que llegar la hora de salida "3:30" formato 24h*/
                p.setRouteid(message.getInt("routeid"));
                p.setStime(message.getInt("stime")); /*Numero del 1 alñ 7 que representa un dia*/

                ScheduleModel.getInstance().Update(p);

                broadcast(new JSONObject("{action: \"update\"}"));
                break;
            }
            case "CREATE_SCHEDULE":
            {
                Schedule m = new Schedule();
                System.out.println(message.getString("sdate"));
                System.out.println(ConvertDate.getInstance().timetodate(message.getString("sdate")));
                m.setSdate(ConvertDate.getInstance().timetodate(message.getString("sdate"))); /*Aqui me tiene que llegar la hora de salida "03:30" formato 24h* si es antes de las 12, agregar un 0 ejem 01:30,02:43,03:90/
                m.setRouteid(message.getInt("routeid"));
                m.setStime(message.getInt("stime")); /*Numero del 1 alñ 7 que representa un dia*/

                ScheduleModel.getInstance().Insert(m);

                broadcast(new JSONObject("{action: \"update\"}"));
                break;
            }
            case "CREATE_ROUTE":
            {
                Route r = new Route();

                r.setPrice(message.getFloat("price"));
                r.setDuration(message.getInt("duration"));
                r.setDestinoid(message.getInt("destinoid"));
                r.setOrigenid(message.getInt("origenid"));
                r.setDiscount(message.getFloat("discount"));

                RouteModel.getInstance().Insert(r);
                broadcast(new JSONObject("{action: \"update\"}"));
                break;

            }
            case "UPDATE_ROUTE":
            {
                Route t = new Route();
                t.setId(message.getInt("id"));
                t.setPrice(message.getFloat("price"));
                t.setDuration(message.getInt("duration"));
                t.setDestinoid(message.getInt("destinoid"));
                t.setOrigenid(message.getInt("origenid"));
                t.setDiscount(message.getFloat("discount"));

                RouteModel.getInstance().Update(t);
                broadcast(new JSONObject("{action: \"update\"}"));
                break;

            }
            case "GET_COMPLETE":
            {
                JSONArray l = ScheduleModel.getInstance().getCompleteSchedule();
                session.getBasicRemote().sendObject(l);
                break;
            }
            default: System.out.println("LLEGA AL DEFAULT");
                session.getBasicRemote().sendObject(nullobj);
                break;
        }

    }

}
