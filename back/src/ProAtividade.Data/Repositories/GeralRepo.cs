using ProAtividade.Data.Context;
using ProAtividade.Domain.Interfaces.Repositories;

namespace ProAtividade.Data.Repositories
{
    public class GeralRepo : IGeralRepo
    {
        private readonly DataContext context;
        public GeralRepo(DataContext context)
        {
            this.context = context;
        }

        public void Adicionar<T>(T entity) where T : class
        {
            context.Add(entity);
        }

        public void Atualizar<T>(T entity) where T : class
        {
            context.Update(entity);
        }

        public void Deletar<T>(T entity) where T : class
        {
            context.Remove(entity);
        }

        public void DeletarVarias<T>(T[] entity) where T : class
        {
            context.RemoveRange(entity);
        }

        public async Task<bool> SalvarMudancasAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}