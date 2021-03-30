package Logic;


public class Schedule {

  private String id;
  private String planeid;
  private String routeid;
  private java.sql.Date stime;
  private java.sql.Date sdate;


  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }


  public String getPlaneid() {
    return planeid;
  }

  public void setPlaneid(String planeid) {
    this.planeid = planeid;
  }


  public String getRouteid() {
    return routeid;
  }

  public void setRouteid(String routeid) {
    this.routeid = routeid;
  }


  public java.sql.Date getStime() {
    return stime;
  }

  public void setStime(java.sql.Date stime) {
    this.stime = stime;
  }


  public java.sql.Date getSdate() {
    return sdate;
  }

  public void setSdate(java.sql.Date sdate) {
    this.sdate = sdate;
  }

}
