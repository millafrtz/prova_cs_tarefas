import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ListarTarefas from './tarefa/ListarTarefas';
import CadastrarTarefa from './tarefa/CadastrarTarefa';
import AlterarTarefa from './tarefa/AlterarTarefa';
import ListarConcluidas from './tarefa/ListarConcluidas';
import ListarNaoConcluidas from './tarefa/ListarNaoConcluidas';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/listar">Listar Tarefas</Link>
            </li>
            <li>
              <Link to="/cadastrar">Cadastrar Tarefa</Link>
            </li>
            <li>
              <Link to="/alterar">Alterar Tarefa</Link>
            </li>
            <li>
              <Link to="/listarConcluidas">Listar Concluídas</Link>
            </li>
            <li>
              <Link to="/listarnaoconcluidas">Listar Não Concluídas</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/listar" component={ListarTarefas} />
          <Route path="/cadastrar" component={CadastrarTarefa} />
          <Route path="/alterar" component={AlterarTarefa} />
          <Route path="/listarconcluidas" component={ListarConcluidas} />
          <Route path="/listarnaoconcluidas" component={ListarNaoConcluidas} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;