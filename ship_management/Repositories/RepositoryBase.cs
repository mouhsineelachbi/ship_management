using Microsoft.EntityFrameworkCore;
using ship_management.DB;
using ship_management.Interfaces;
using System.Linq.Expressions;

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
            this.ctx.Set<T>().Add(entity);
            this.ctx.SaveChanges();
        }

        public void Delete(T entity)
        {
            this.ctx.Set<T>().Remove(entity);
            this.ctx.SaveChanges();
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
            this.ctx.Set<T>().Update(entity);
            this.ctx.SaveChanges();
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
