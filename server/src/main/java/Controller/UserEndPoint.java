package Controller;


import Auxiliar.DecoderJson;
import Auxiliar.EncoderArrayJson;
import Auxiliar.EnconderJson;
import Logic.Auser;
import Model.UserModel;
import com.google.gson.JsonObject;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@ServerEndpoint(value = "/user",
encoders = {EnconderJson.class, EncoderArrayJson.class},
decoders = {DecoderJson.class})
public class UserEndPoint {

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

            System.out.println(message.getString("Action"));
            interpretar(message,session);



        } catch ( EncodeException | IOException e) {
            e.printStackTrace();
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable) throws IOException, EncodeException {
        session.getBasicRemote().sendObject(new JSONObject("{none:" + "\"WebSocket error for " + session.getId() + " " + throwable.getMessage() + "\""));
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
                String id = message.getString("id");
                JSONObject g = new JSONObject(UserModel.getInstance().Get(id));
                session.getBasicRemote().sendObject(g);
                break;
            }
            case "LOGIN": {
                String username = message.getString("id");
                String pass = message.getString("password");
                Auser temp = UserModel.getInstance().Loginget(username, pass);
                if (temp !=null) {
                    JSONObject u = new JSONObject(temp);
                    session.getBasicRemote().sendObject(u);
                }
                else{
                    session.getBasicRemote().sendObject(nullobj);
                }
                break;
            }
            case "UPDATE":{
                Auser l = new Auser();
                l.setId(message.getString("id"));
                l.setPassword( message.getString("password"));
                l.setLongitud( message.getDouble("longitud"));
                l.setLatitud(message.getDouble("latitud"));
                l.setName( message.getString("name"));
                l.setCellphone( message.getString("cellphone"));
                l.setSurnames(message.getString("surnames"));
                l.setUsertype(message.getInt("usertype"));
                UserModel.getInstance().Update(l);

                session.getBasicRemote().sendObject(new JSONObject("{estado : \"Correcto\"}"));
                break;
            }
            case "CREATE":
            {
                Auser c = new Auser();
                c.setId(message.getString("id"));
                c.setPassword( message.getString("password"));
                c.setLongitud( message.getDouble("longitud"));
                c.setLatitud(message.getDouble("latitud"));
                c.setName( message.getString("name"));
                c.setCellphone( message.getString("cellphone"));
                c.setSurnames(message.getString("surnames"));
                c.setUsertype(message.getInt("usertype"));
                UserModel.getInstance().Insert(c);

                session.getBasicRemote().sendObject(new JSONObject("{estado : \"Correcto\"}"));
                break;

            }
            case "PRUEBA": System.out.println("gg se logró compa");
            default: System.out.println("LLEGA AL DEFAULT");
                session.getBasicRemote().sendObject(nullobj);
                break;
        }

    }


}
