package template;

public class Main {
    public static void main(String[] args) {
        // Criar estacionamento
        Estacionamento estacionamento = new Estacionamento(2, 1);

        // Criar carros
        Carro carro1 = new Carro("ABC-1234", "Sedan");
        Carro carro2 = new Carro("XYZ-5678", "SUV");

        // Estacionar carros
        estacionamento.estacionarCarro(carro1, "Premium");
        estacionamento.estacionarCarro(carro2, "Básico");

        // Tentar estacionar em setores lotados ou diferentes
        estacionamento.estacionarCarro(new Carro("LMN-9876", "Hatch"), "Básico");

        // Liberar vaga
        estacionamento.liberarVaga(1, "Premium");

        // Estacionar novamente no Premium
        estacionamento.estacionarCarro(new Carro("JKL-4321", "Pickup"), "Premium");
    }
}
