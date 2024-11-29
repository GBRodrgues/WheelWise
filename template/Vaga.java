package template;

public class Vaga {
    private int numero;
    private boolean ocupada;
    private Carro carro;

    public Vaga(int numero) {
        this.numero = numero;
        this.ocupada = false;
    }

    public boolean isOcupada() {
        return ocupada;
    }

    public void ocupar(Carro carro) {
        if (!ocupada) {
            this.carro = carro;
            this.ocupada = true;
            System.out.println("Vaga " + numero + " ocupada pelo carro: " + carro);
        } else {
            System.out.println("Vaga " + numero + " já está ocupada.");
        }
    }

    public void liberar() {
        if (ocupada) {
            System.out.println("Vaga " + numero + " liberada. Carro removido: " + carro);
            this.carro = null;
            this.ocupada = false;
        } else {
            System.out.println("Vaga " + numero + " já está livre.");
        }
    }

    public int getNumero() {
        return numero;
    }
}
