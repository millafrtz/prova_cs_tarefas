﻿namespace API.Models;
public class Categoria
{
    public int CategoriaId { get; set; }
    public string Nome { get; set; }
    public List<Tarefa> Tarefas { get; set; }
}
