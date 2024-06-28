import React, { useState, useEffect } from 'react';
import { Categoria } from '../types';
import api from 'api/tarefa/cadastrar';

const CadastrarTarefa: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get('/api/categoria/listar');
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/tarefa/cadastrar', {
        nome,
        descricao,
        status: 'Não iniciada',
        categoriaId: 
      });
      alert('Tarefa cadastrada!');
      setNome('');
      setDescricao('');
    } catch (error) {
      console.error('Erro ao cadastrar tarefa:', error);
    }
  };

  return (
    <div>
      <h2>Cadastrar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
        </label>
        <br />
        <label>
          Descrição:
          <textarea value={descricao} onChange={e => setDescricao(e.target.value)} />
        </label>
        <br />
        <label>
          Categoria:
          <select>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarTarefa;
