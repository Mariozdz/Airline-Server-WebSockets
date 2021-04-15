package Logic;


public class Purchase {

  private int id;
  private int flightid;
  private String userid;
  private double totalprice;
  private int tickets;
  private int returnflightid;


  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }


  public int getFlightid() {
    return flightid;
  }

  public void setFlightid(int flightid) {
    this.flightid = flightid;
  }


  public String getUserid() {
    return userid;
  }

  public void setUserid(String userid) {
    this.userid = userid;
  }


  public double getTotalprice() {
    return totalprice;
  }

  public void setTotalprice(double totalprice) {
    this.totalprice = totalprice;
  }


  public int getTickets() {
    return tickets;
  }
  public int getRealsTickets(){
     return this.returnflightid!=0?2*tickets :tickets;
  }
  public void setTickets(int tickets) {
    this.tickets = tickets;
  }


  public int getReturnflightid() {
    return returnflightid;
  }

  public void setReturnflightid(int returnflightid) {
    this.returnflightid = returnflightid;
  }

}
