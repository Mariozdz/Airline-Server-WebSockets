package Controller;

import Auxiliar.ConvertDate;
import Auxiliar.DecoderJson;
import Auxiliar.EncoderArrayJson;
import Auxiliar.EnconderJson;
import Logic.Country;
import Logic.Flight;
import Logic.Ticket;
import Model.CountryModel;
import Model.FlightModel;
import Model.TicketModel;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.Calendar;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@ServerEndpoint(value = "/flight",
        encoders = {EnconderJson.class, EncoderArrayJson.class},
        decoders = {DecoderJson.class})
public class FlightEndPoint {

    private static Set<Session> sessions = new HashSet<>();
    private static JSONObject nullobj = new JSONObject("{ none : \"none\"}");

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("WebSocket opened: " + session.getId());
        sessions.add(session);
    }

    @OnMessage
    public void onMessage(JSONObject message, Session session) {
        System.out.println("Message received: " + message + " from " + session.getId());
        try {
            System.out.println(message.getString("Action"));
            interpretar(message,session);


        } catch ( EncodeException | IOException e) {
            e.printStackTrace();
        } catch (Throwable throwable) {
            throwable.printStackTrace();
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
                JSONObject g = new JSONObject(FlightModel.getInstance().Get(id));
                session.getBasicRemote().sendObject(g);

                break;
            }
            case "GET_ALL": {
                JSONArray u = new JSONArray(FlightModel.getInstance().getCompleteFlight());
                session.getBasicRemote().sendObject(u);
                break;
            }
            case "UPDATE":{
                Flight l = new Flight();
                l.setId(message.getInt("id"));
                l.setOutbound(message.getInt("outboundid"));
                l.setOutbounddate(java.sql.Date.valueOf(message.getString("outbounddate")));
                l.setPlaneid( message.getInt("planeid"));

                FlightModel.getInstance().Update(l);

                broadcast(new JSONObject("{action: \"update\"}"));
                break;
            }
            case "CREATE":
            {
                Flight m = new Flight();;
                m.setOutbound(message.getInt("outboundid"));
                m.setOutbounddate(java.sql.Date.valueOf(message.getString("outbounddate")));
                m.setPlaneid(message.getInt("planeid"));
                m.setIsreturned(message.getInt("isreturned"));
                FlightModel.getInstance().Insert(m);
                broadcast(new JSONObject("{action: \"update\"}")); /*Año - mes - dia formato 24h*/
                break;
            }
            case "GET_ACQUIRED_FIELDS":
            {
                session.getBasicRemote().sendObject(TicketModel.getInstance().getacquiredfields(message.getInt("flightid")));
                break;
            }
            default: System.out.println("LLEGA AL DEFAULT");
                session.getBasicRemote().sendObject(nullobj);
                break;
        }

    }
}
