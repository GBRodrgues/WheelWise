package fachada;

public class EstacionamentoFacade {
    private Setor setorPremium;
    private Setor setorBasico;

    public EstacionamentoFacade(int vagasPremium, int vagasBasicas) {
        this.setorPremium = new Setor("Premium", vagasPremium);
        this.setorBasico = new Setor("Básico", vagasBasicas);
    }

    public void estacionarCarro(Carro carro, String tipoSetor) {
        Setor setor = tipoSetor.equalsIgnoreCase("Premium") ? setorPremium : setorBasico;
        Vaga vaga = setor.buscarVagaDisponivel();

        if (vaga != null) {
            vaga.ocupar(carro);
        } else {
            System.out.println("Não há vagas disponíveis no setor " + tipoSetor);
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
