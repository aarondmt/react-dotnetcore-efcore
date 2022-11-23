using Microsoft.EntityFrameworkCore;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;

namespace ProAtividade.Data.Repositories
{
    public class AtividadeRepo : GeralRepo, IAtividadeRepo
    {
        private readonly DataContext context;

        public AtividadeRepo(DataContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<Atividade> PegaPorIdAsync(int id)
        {
            IQueryable<Atividade> query = context.Atividades;

            return await query.AsNoTracking().FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Atividade> PegaPorTituloAsync(string titulo)
        {
            IQueryable<Atividade> query = context.Atividades;

            return await query.AsNoTracking().FirstOrDefaultAsync(a => a.Titulo == titulo);
        }

        public async Task<Atividade[]> PegaTodasAsync()
        {
            IQueryable<Atividade> query = context.Atividades;

            query = query.AsNoTracking()
                         .OrderBy(e => e.Id);

            return await query.ToArrayAsync();
        }
    }
}