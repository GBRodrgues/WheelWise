package fachada;

public class Main {
    public static void main(String[] args) {
        // Criação do estacionamento com setores e vagas
        EstacionamentoFacade estacionamento = new EstacionamentoFacade(2, 5);

        // Criação de carros
        Carro carro1 = new Carro("ABC-1234", "Sedan");
        Carro carro2 = new Carro("XYZ-5678", "SUV");

        // Estacionar carros no setor Premium
        estacionamento.estacionarCarro(carro1, "Premium");
        estacionamento.estacionarCarro(carro2, "Premium");

        // Tentar estacionar em um setor lotado
        estacionamento.estacionarCarro(new Carro("LMN-9876", "Hatch"), "Premium");

        // Liberar uma vaga
        estacionamento.liberarVaga(1, "Premium");

        // Estacionar novamente
        estacionamento.estacionarCarro(new Carro("JKL-4321", "Pickup"), "Premium");

        // Estacionar no setor Básico
        estacionamento.estacionarCarro(carro1, "Básico");
    }
}
