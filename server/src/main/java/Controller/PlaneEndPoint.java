package Controller;

import Auxiliar.DecoderJson;
import Auxiliar.EncoderArrayJson;
import Auxiliar.EnconderJson;
import Logic.Country;
import Logic.Plane;
import Logic.Planetype;
import Model.CountryModel;
import Model.PlaneModel;
import Model.PlaneTypeModel;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@ServerEndpoint(value = "/plane",
        encoders = {EnconderJson.class, EncoderArrayJson.class},
        decoders = {DecoderJson.class})
public class PlaneEndPoint {

    private static Set<Session> sessions = new HashSet<>();
    private static JSONObject nullobj = new JSONObject("{ none : \"none\"}");

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("WebSocket opened: " + session.getId());
        sessions.add(session);
    }

    @OnMessage
    public void onMessage(JSONObject message, Session session) throws Throwable {
        System.out.println("Message received: " + message + " from " + session.getId());
        try {
            System.out.println(message.getString("Action"));
            this.interpretar(message,session);

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

        switch (action) {
            case "GET": {
                int id = message.getInt("id");
                JSONObject g = new JSONObject(PlaneModel.getInstance().Get(id));
                session.getBasicRemote().sendObject(g);
                break;
            }
            case "GET_ALL": {
                JSONArray u = new JSONArray(PlaneModel.getInstance().search());
                session.getBasicRemote().sendObject(u);
                break;
            }
            case "UPDATE": {
                Plane l = new Plane();
                l.setId(message.getInt("id"));
                l.setTypeplaneid(message.getInt("typeplaneid"));
                PlaneModel.getInstance().Update(l);
                broadcast(new JSONObject("{action: \"update\"}"));
                break;
            }
            case "CREATE": {
                Plane m = new Plane();
                m.setTypeplaneid(message.getInt("typeplaneid"));
                PlaneModel.getInstance().Insert(m);
                broadcast(new JSONObject("{action: \"update\"}"));
                break;
            }
            case "CREATE_TYPE":
            {
                Planetype k = new Planetype();
                System.out.println("al menos aqui...");
                k.setBrand( message.getString("brand"));
                k.setModel(message.getString("model"));
                k.setNumbercolums(message.getInt("Numbercolums"));
                k.setNumberrow(message.getInt("Numberrow"));
                PlaneTypeModel.getInstance().Insert(k);
                System.out.println("also aqui...");
                broadcast(new JSONObject("{action: \"update\"}"));
                break;
            }

            case "UPDATE_TYPE":{
                Planetype l = new Planetype();
                System.out.println("al menos aqui...");
                l.setId(message.getInt("id"));
                l.setBrand( message.getString("brand"));
                l.setModel(message.getString("model"));
                l.setNumbercolums(message.getInt("numbercolums"));
                l.setNumberrow(message.getInt("numberrow"));
                System.out.println("also aqui...");
                PlaneTypeModel.getInstance().Update(l);
                broadcast(new JSONObject("{action: \"update\"}"));
                break;
            }
            case "GET_COMPLETE":
            {
                session.getBasicRemote().sendObject(PlaneModel.getInstance().GetCompletePlane());
            }

            case "GET_ALL_TYPEPLANE":{
                JSONArray u = new JSONArray(PlaneTypeModel.getInstance().search());
                session.getBasicRemote().sendObject(u);
                break;

            }

            default:
                System.out.println("LLEGA AL DEFAULT");
                session.getBasicRemote().sendObject(nullobj);
                break;
        }
    }
}
