package template;

public class SetorPremium extends template.Setor {

    public SetorPremium(int quantidadeVagas) {
        super(quantidadeVagas);
        this.tipo = "Premium";
    }

    @Override
    protected Vaga selecionarVaga(Carro carro) {
        // Política: ocupar a primeira vaga disponível
        for (Vaga vaga : vagas) {
            if (!vaga.isOcupada()) {
                return vaga;
            }
        }
        return null;
    }
}

