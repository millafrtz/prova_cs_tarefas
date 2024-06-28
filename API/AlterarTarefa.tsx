import React, { useState } from 'react';
import { Tarefa } from 'api/tarefa/listar';
import api from 'api/tarefa/alterar';

const AlterarTarefa: React.FC = () => {
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.patch(`/api/tarefa/alterar?id=${id}`, {});
      setStatus(response.data.status);
      alert('Status da tarefa alterado!');
    } catch (error) {
      console.error('Erro ao alterar status da tarefa:', error);
    }
  };

  return (
    <div>
      <h2>Alterar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID da Tarefa:
          <input type="text" value={id} onChange={(e: { target: { value: any; }; }) => setId(e.target.value)} />
        </label>
        <br />
        <label>
          Status Atual: {status}
        </label>
        <br />
        <button type="submit">Alterar Status</button>
      </form>
    </div>
  );
};

export default AlterarTarefa;