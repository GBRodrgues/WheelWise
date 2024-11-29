package fachada;
import java.util.ArrayList;
import java.util.List;

public class Setor {
    private String tipo; // Premium ou Básico
    private List<Vaga> vagas;

    public Setor(String tipo, int quantidadeVagas) {
        this.tipo = tipo;
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

    public Vaga buscarVagaDisponivel() {
        for (Vaga vaga : vagas) {
            if (!vaga.isOcupada()) {
                return vaga;
            }
        }
        return null;
    }
}
