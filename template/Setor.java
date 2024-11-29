package template;

import java.util.ArrayList;
import java.util.List;

public abstract class Setor {
    protected String tipo; // Premium ou Básico
    protected List<Vaga> vagas;

    public Setor(int quantidadeVagas) {
        this.vagas = new ArrayList<>();
        for (int i = 1; i <= quantidadeVagas; i++) {
            vagas.add(new Vaga(i));
        }
    }

    public String getTipo() {
        return tipo;
    }

    public List<Vaga> getVagas() {
        return vagas;
    }

    // Template Method
    public final Vaga buscarVaga(Carro carro) {
        if (!temVagasDisponiveis()) {
            System.out.println("Não há vagas disponíveis no setor " + tipo);
            return null;
        }

        return selecionarVaga(carro);
    }

    // Método concreto
    private boolean temVagasDisponiveis() {
        for (Vaga vaga : vagas) {
            if (!vaga.isOcupada()) {
                return true;
            }
        }
        return false;
    }

    // Métodos abstratos a serem implementados
    protected abstract Vaga selecionarVaga(Carro carro);
}

