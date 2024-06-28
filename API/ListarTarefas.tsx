import React, { useEffect, useState } from 'react';
import { Tarefa } from '../types';
import api from 'api/tarefa/listar';

const ListarTarefas: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await api.get('/api/tarefa/listar');
        setTarefas(response.data);
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };

    fetchTarefas();
  }, []);

  return (
    <div>
      <h2>Listar Tarefas</h2>
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
          {tarefas.map(tarefa => (
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

export default ListarTarefas;