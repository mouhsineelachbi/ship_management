using System.Text;
using Microsoft.EntityFrameworkCore;
using ship_management.DB;
using ship_management.Interfaces;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace ship_management.Repositories
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected AppDbContext ctx { set; get; }
        public RepositoryBase(AppDbContext ctx)
        {
            this.ctx = ctx;
        }
        public void Create(T entity)
        {
            try
            {
                this.ctx.Set<T>().Add(entity);
                this.ctx.SaveChanges();
            }
            catch (DbUpdateException e)
            {
               var sb = new StringBuilder();
                sb.AppendLine($"DbUpdateException error details - {e?.InnerException?.InnerException?.Message}");

                foreach (var eve in e.Entries)
                {
                    sb.AppendLine($"Entity of type {eve.Entity.GetType().Name} in state {eve.State} could not be added");
                }

                throw new DbUpdateException(sb.ToString());
            }
            
        }

        public void Delete(T entity)
        {
            try{
                this.ctx.Set<T>().Remove(entity);
                this.ctx.SaveChanges();
            }
            catch(DbUpdateException e){
                throw new DbUpdateException();
            }
        }

        public IQueryable<T> FindAll()
        {
            return this.ctx.Set<T>().AsNoTracking();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return this.ctx.Set<T>().Where(expression).AsNoTracking();
        }

        public void Update(T entity)
        {
            try
            {
                this.ctx.Set<T>().Update(entity);
                this.ctx.SaveChanges();
            }
            catch(DbUpdateException e){
                throw new DbUpdateException();
            }
        }

        public void DeleteMultiple(T[] entities)
        {
            foreach (var entity in entities)
            {
                this.ctx.Set<T>().Remove(entity);
            }
            this.ctx.SaveChanges();
        }
    }
}
