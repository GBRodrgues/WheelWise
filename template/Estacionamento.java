package template;

public class Estacionamento {
    private Setor setorPremium;
    private Setor setorBasico;

    public Estacionamento(int vagasPremium, int vagasBasicas) {
        this.setorPremium = new SetorPremium(vagasPremium);
        this.setorBasico = new SetorBasico(vagasBasicas);
    }

    public void estacionarCarro(Carro carro, String tipoSetor) {
        Setor setor = tipoSetor.equalsIgnoreCase("Premium") ? setorPremium : setorBasico;
        Vaga vaga = setor.buscarVaga(carro);

        if (vaga != null) {
            vaga.ocupar(carro);
        }
    }

    public void liberarVaga(int numeroVaga, String tipoSetor) {
        Setor setor = tipoSetor.equalsIgnoreCase("Premium") ? setorPremium : setorBasico;

        for (Vaga vaga : setor.getVagas()) {
            if (vaga.getNumero() == numeroVaga) {
                vaga.liberar();
                return;
            }
        }

        System.out.println("Vaga " + numeroVaga + " não encontrada no setor " + tipoSetor);
    }
}
