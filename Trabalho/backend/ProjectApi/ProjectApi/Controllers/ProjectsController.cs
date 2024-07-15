using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectApi.Contexts;
using ProjectApi.Models;

namespace ProjectApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<IEnumerable<Project>> GetAllProjects()
        {
            return await _context.Projects.ToListAsync();
        }

        [HttpPost]
        public async void CreateProject(Project project)
        {
            project.Id = Guid.NewGuid();
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
        }

        [HttpDelete("{id}")]
        public async void DeleteProject(Guid id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return;
            }
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
        }

        [HttpPut("{id}")]
        public async void EditProject(Guid id, Project project)
        {
            if (id == Guid.Empty)
            {
                return;
            }
            var findProject = await _context.Projects.FindAsync(id);
            if (findProject == null)
            {
                return;
            }
            findProject.Name = project.Name;
            findProject.Description = project.Description;

            await _context.SaveChangesAsync();
            
        }

    }
}
