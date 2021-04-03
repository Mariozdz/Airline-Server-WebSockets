package Controller;

import Auxiliar.DecoderJson;
import Auxiliar.EncoderArrayJson;
import Auxiliar.EnconderJson;
import Logic.Country;
import Logic.Plane;
import Logic.Planetype;
import Model.CountryModel;
import Model.PlaneTypeModel;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@ServerEndpoint(value = "/typeplane",
        encoders = {EnconderJson.class, EncoderArrayJson.class},
        decoders = {DecoderJson.class})
public class TypePlaneEndPoint {

    private static JSONObject nullobj = new JSONObject("{ none : \"none\"}");
    private static Set<Session> sessions = new HashSet<>();

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("WebSocket opened: " + session.getId());
        sessions.add(session);
    }

    @OnMessage
    public void onMessage(JSONObject message, Session session) {
        System.out.println("Message received: " + message + " from " + session.getId());
        try {
            session.getBasicRemote().sendObject(message);
            session.getBasicRemote().sendObject(message);


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

    public void interpretar(JSONObject message, Session session) throws Throwable {
        String action = message.getString("Action").toUpperCase(Locale.ROOT);

        switch(action)
        {
            case "GET": {
                int id = message.getInt("id");
                JSONObject g = new JSONObject(PlaneTypeModel.getInstance().Get(id));
                session.getBasicRemote().sendObject(g);
                break;
            }
            case "GET_ALL": {
                JSONArray u = new JSONArray(PlaneTypeModel.getInstance().search());
                session.getBasicRemote().sendObject(u);
                break;
            }
            case "UPDATE":{
                Planetype l = new Planetype();
                System.out.println("al menos aqui...");
                l.setId(message.getInt("id"));
                l.setBrand( message.getString("brand"));
                l.setModel(message.getString("model"));
                l.setNumbercolums(message.getInt("Numbercolums"));
                l.setNumberrow(message.getInt("Numberrow"));
                System.out.println("also aqui...");
                PlaneTypeModel.getInstance().Update(l);
                break;
            }
            case "CREATE":
            {
                Planetype k = new Planetype();
                System.out.println("al menos aqui...");
                k.setBrand( message.getString("brand"));
                k.setModel(message.getString("model"));
                k.setNumbercolums(message.getInt("Numbercolums"));
                k.setNumberrow(message.getInt("Numberrow"));
                PlaneTypeModel.getInstance().Insert(k);
                System.out.println("also aqui...");
                break;
            }
            default: System.out.println("LLEGA AL DEFAULT");
                session.getBasicRemote().sendObject(nullobj);
                break;
        }

    }

}
