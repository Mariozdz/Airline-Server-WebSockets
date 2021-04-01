package Logic;


public class Route {

  private int id;
  private int duration;
  private int origenId;
  private int destinoId;
  private double price;


  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }


  public int getDuration() {
    return duration;
  }

  public void setDuration(int duration) {
    this.duration = duration;
  }


  public int getOrigen() {
    return origenId;
  }

  public void setOrigen(int origen) {
    this.origenId = origen;
  }


  public int getDestino() {
    return destinoId;
  }

  public void setDestino(int destino) {
    this.destinoId = destino;
  }


  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

}
