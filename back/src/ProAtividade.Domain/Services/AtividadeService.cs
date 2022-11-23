using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividade.Domain.Services
{
    public class AtividadeService : IAtividadeService
    {
        private readonly IAtividadeRepo atividadeRepo;

        public AtividadeService(IAtividadeRepo atividadeRepo)
        {
            this.atividadeRepo = atividadeRepo;
        }

        public async Task<Atividade> AdicionarAtividade(Atividade model)
        {
            if (await atividadeRepo.PegaPorTituloAsync(model.Titulo) != null)
                throw new Exception("Já existe uma atividade com esse título.");

            if (await atividadeRepo.PegaPorIdAsync(model.Id) == null)
            {
                atividadeRepo.Adicionar(model);
                if (await atividadeRepo.SalvarMudancasAsync())
                    return model;
            }

            return null;
        }

        public async Task<Atividade> AtualizarAtividade(Atividade model)
        {
            if (model.DataConclusao != null)
                throw new Exception("Não se pode alterar atividade já concluída.");

            if (await atividadeRepo.PegaPorIdAsync(model.Id) != null)
            {
                atividadeRepo.Atualizar(model);
                if (await atividadeRepo.SalvarMudancasAsync())
                    return model;
            }

            return null;
        }

        public async Task<bool> ConcluirAtividade(Atividade model)
        {
            if (model != null)
            {
                model.Concluir();
                atividadeRepo.Atualizar(model);
                return await atividadeRepo.SalvarMudancasAsync();
            }

            return false;
        }

        public async Task<bool> DeletarAtividade(int atividadeId)
        {
            var atividade = await atividadeRepo.PegaPorIdAsync(atividadeId);

            if (atividade == null)
                throw new Exception("Atividade que tentou deletar não existe.");

            atividadeRepo.Deletar(atividade);

            return await atividadeRepo.SalvarMudancasAsync();
        }

        public async Task<Atividade> PegarAtividadePorIdAsync(int atividadeId)
        {
            try
            {
                var atividade = await atividadeRepo.PegaPorIdAsync(atividadeId);
                if (atividade == null) return null;

                return atividade;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Atividade[]> PegarTodasAtividadesAsync()
        {
            try
            {
                var atividades = await atividadeRepo.PegaTodasAsync();
                if (atividades == null) return null;

                return atividades;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}