package Logic;


public class Flight {

  private int id;
  private int outbound;
  private java.sql.Date outbounddate;
  private int planeid;
  private java.sql.Date arrivetime;


  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }


  public int getOutbound() {
    return outbound;
  }

  public void setOutbound(int outbound) {
    this.outbound = outbound;
  }


  public java.sql.Date getOutbounddate() {
    return outbounddate;
  }

  public void setOutbounddate(java.sql.Date outbounddate) {
    this.outbounddate = outbounddate;
  }


  public int getPlaneid() {
    return planeid;
  }

  public void setPlaneid(int planeid) {
    this.planeid = planeid;
  }


  public java.sql.Date getArrivetime() {
    return arrivetime;
  }

  public void setArrivetime(java.sql.Date arrivetime) {
    this.arrivetime = arrivetime;
  }

}
