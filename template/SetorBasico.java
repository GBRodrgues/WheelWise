package template;

public class SetorBasico extends template.Setor {

    public SetorBasico(int quantidadeVagas) {
        super(quantidadeVagas);
        this.tipo = "Básico";
    }

    @Override
    protected Vaga selecionarVaga(Carro carro) {
        // Política: ocupar a última vaga disponível
        for (int i = vagas.size() - 1; i >= 0; i--) {
            if (!vagas.get(i).isOcupada()) {
                return vagas.get(i);
            }
        }
        return null;
    }
}
