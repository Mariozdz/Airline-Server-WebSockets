package Logic;


public class Auser {

  private String id;
  private String password;
  private String name;
  private String surnames;
  private double latitud;
  private double longitud;
  private String cellphone;

  public Auser(){};
  public Auser(String id, String password, String name, String surnames,Double latitud, Double longitud, String cellphone)
  {
    this.id = id;
    this.password = password;
    this.name = name;
    this.surnames = surnames;
    this.latitud = latitud;
    this.longitud = longitud;
    this.cellphone = cellphone;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }


  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }


  public String getSurnames() {
    return surnames;
  }

  public void setSurnames(String surnames) {
    this.surnames = surnames;
  }


  public Double getLatitud() {
    return latitud;
  }

  public void setLatitud(Double latitud) {
    this.latitud = latitud;
  }

  public Double getLongitud() {
    return longitud;
  }

  public void setLongitud(Double address) {
    this.longitud = address;
  }

  public String getCellphone() {
    return cellphone;
  }

  public void setCellphone(String cellphone) {
    this.cellphone = cellphone;
  }

}
