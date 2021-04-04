package Controller;

import Auxiliar.DecoderJson;
import Auxiliar.EncoderArrayJson;
import Auxiliar.EnconderJson;
import Logic.Auser;
import Logic.Country;
import Model.CountryModel;
import Model.UserModel;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@ServerEndpoint(value = "/country",
        encoders = {EnconderJson.class, EncoderArrayJson.class},
        decoders = {DecoderJson.class})
public class CountryEndPoint {

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
            /*session.getBasicRemote().sendObject(message);
            session.getBasicRemote().sendObject(message);*/


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
                JSONObject g = new JSONObject(CountryModel.getInstance().Get(id));
                session.getBasicRemote().sendObject(g);
                break;
            }
            case "GET_ALL": {
                JSONArray u = new JSONArray(CountryModel.getInstance().search());
                session.getBasicRemote().sendObject(u);
                break;
            }
            case "UPDATE":{
                Country l = new Country();
                System.out.println("al menos aqui...");
                l.setId(message.getInt("id"));
                l.setName( message.getString("name"));
                System.out.println("also aqui...");
                CountryModel.getInstance().Update(l);
                break;
            }
            case "CREATE":
            {
                Country m = new Country();
                m.setName(message.getString("name"));
                CountryModel.getInstance().Insert(m);
                break;
            }
            default: System.out.println("LLEGA AL DEFAULT");
                session.getBasicRemote().sendObject(nullobj);
                break;
        }

    }

}
