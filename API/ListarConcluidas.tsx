import React, { useEffect, useState } from 'react';
import { Tarefa } from '../types';
import api from 'api/tarefa/concluidas';

const ListarConcluidas: React.FC = () => {
  const [tarefasConcluidas, setTarefasConcluidas] = useState<Tarefa[]>([]);

  useEffect(() => {
    const fetchTarefasConcluidas = async () => {
      try {
        const response = await api.get('/api/tarefa/concluidas');
        setTarefasConcluidas(response.data);
      } catch (error) {
        console.error('Erro ao carregar tarefas concluídas:', error);
      }
    };

    fetchTarefasConcluidas();
  }, []);

  return (
    <div>
      <h2>Listar Tarefas Concluídas</h2>
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
          {tarefasConcluidas.map(tarefa => (
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

export default ListarConcluidas;