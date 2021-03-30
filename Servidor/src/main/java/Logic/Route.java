package Logic;


public class Route {

  private String id;
  private String duration;
  private double origen;
  private double destino;
  private double price;


  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }


  public String getDuration() {
    return duration;
  }

  public void setDuration(String duration) {
    this.duration = duration;
  }


  public double getOrigen() {
    return origen;
  }

  public void setOrigen(double origen) {
    this.origen = origen;
  }


  public double getDestino() {
    return destino;
  }

  public void setDestino(double destino) {
    this.destino = destino;
  }


  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

}
