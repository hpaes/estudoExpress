const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(express.json());

/**
 * Query Params: Vamos usar principalmente para filtros e paginação
 * Route Params: Identificar recursos na hora de atualizar ou deletar
 * Request Params: Resto do conteúdo na hora de criar ou editar um recurso
 */

const projects = [];

app.get('/projects', (request, response) => {
  response.json(projects);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = {
    id: uuidv4(),
    title,
    owner,
  };
  projects.push(project);

  response.status(200).json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (!projectIndex) {
    return response.status(400).json({ error: 'Project not found' });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;
  console.log(id);
  const projectIndex = projects.findIndex((project) => project.id == id);

  console.log(projectIndex);
  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found' });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

module.exports = app;
