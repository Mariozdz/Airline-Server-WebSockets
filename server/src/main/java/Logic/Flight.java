package Logic;


import java.sql.Date;

public class Flight {

  private int id;
  private int outbound;
  private java.sql.Date outbounddate;
  private int planeid;
  private java.sql.Date arrivetime;
  private int isreturned;

  public int getIsreturned() {
    return isreturned;
  }

  public void setIsreturned(int isreturned) {
    this.isreturned = isreturned;
  }

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


  public Date getOutbounddate() {
    return outbounddate;
  }

  public void setOutbounddate(Date outbounddate) {
    this.outbounddate = outbounddate;
  }


  public int getPlaneid() {
    return planeid;
  }

  public void setPlaneid(int planeid) {
    this.planeid = planeid;
  }


  public Date getArrivetime() {
    return arrivetime;
  }

  public void setArrivetime(Date arrivetime) {
    this.arrivetime = arrivetime;
  }

}
