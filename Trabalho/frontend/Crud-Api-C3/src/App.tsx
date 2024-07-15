import axios from "axios";
import { useEffect, useState } from "react"
import CreateModal from "./components/modals/CreateModal";
import EditModal from "./components/modals/EditModal";

function App() {

  interface Project {
    id: string;
    name: string;
    description: string;
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [editId, setEditId] = useState('');

  const dataProjects = async () => {
    const response = await axios.get<Project[]>('https://localhost:32771/api/projects');
    setProjects(response.data);
  }

  useEffect(() => {
    dataProjects();
  }, [])

  const handleCreateProject = async (name: string, description: string) => {
    const newProject = {
      name,
      description
    };
    await axios.post<Project>('https://localhost:32771/api/projects', newProject);
    dataProjects();
  }

  const handleEditProject = async (name: string, description: string) => {
    const editProject: Project = {
      id: editId,
      name,
      description
    }
    await axios.put<Project>(`https://localhost:32771/api/projects/${editId}`, {name, description});
    setProjects(projects.map(project => (project.id === editId ? editProject! : project)));
    setEditId('');
  }

  const handleDeleteProject = async (id: string) => {
    await axios.delete(`https://localhost:32771/api/projects/${id}`);
    setProjects(projects.filter(project => project.id !== id));
  }

  const closeModal = () => {
    setShowNewProject(false);
    setEditId('');
  }

  const openCreateModal = () => {
    setShowNewProject(true);
  }


  return (
    <div className="bg-dark min-vh-100">
      {showNewProject && <CreateModal onClose={closeModal} handleCreate={handleCreateProject}/>}
      {editId && <EditModal onClose={closeModal} handleEdit={handleEditProject}/>}
      <div className="container text-light">
        <h1 className="mb-4">Projetos</h1>
        <button onClick={() => openCreateModal()} className="btn btn-primary">Cria Projeto</button>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Descrição</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>
                  <button onClick={() => setEditId(project.id)} className="btn btn-warning m-2">Editar</button>
                  <button onClick={() => handleDeleteProject(project.id)} className="btn btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody >
        </table >
      </div >
    </div >

  )
}

export default App
