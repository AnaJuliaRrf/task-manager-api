const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Banco de dados em memória
let tasks = [
  {
    id: 1,
    title: 'Estudar GitHub Actions',
    completed: false
  }
];

// Listar tarefas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Criar tarefa
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      error: 'O título é obrigatório.'
    });
  }

  const newTask = {
    id: Date.now(),
    title,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Marcar como concluída
app.put('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      error: 'Tarefa não encontrada.'
    });
  }

  task.completed = !task.completed;
  res.json(task);
});

// Excluir tarefa
app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.filter(t => t.id !== id);

  res.json({
    message: 'Tarefa removida com sucesso.'
  });
});

// Rota inicial
app.get('/', (req, res) => {
  res.send('API Task Manager funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});