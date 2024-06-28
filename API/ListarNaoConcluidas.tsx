import React, { useEffect, useState } from 'react';
import { Tarefa } from '../types';
import api from 'api/tarefa/naoconcluidas';

const ListarNaoConcluidas: React.FC = () => {
  const [tarefasNaoConcluidas, setTarefasNaoConcluidas] = useState<Tarefa[]>([]);

  useEffect(() => {
    const fetchTarefasNaoConcluidas = async () => {
      try {
        const response = await api.get('/api/tarefa/naoconcluidas');
        setTarefasNaoConcluidas(response.data);
      } catch (error) {
        console.error('Erro ao carregar tarefas não concluídas:', error);
      }
    };

    fetchTarefasNaoConcluidas();
  }, []);

  return (
    <div>
      <h2>Listar Tarefas Não Concluídas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {tarefasNaoConcluidas.map(tarefa => (
            <tr key={tarefa.id}>
              <td>{tarefa.id}</td>
              <td>{tarefa.nome}</td>
              <td>{tarefa.descricao}</td>
              <td>{tarefa.status}</td>
              <td>{tarefa.categoria.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarNaoConcluidas;
4. Implementando o serviço de API
Crie um serviço para lidar com as chamadas da API:

api.ts
typescript
Copiar código
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5273'
});

export default api;