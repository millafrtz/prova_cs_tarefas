namespace API.Models;
public class Tarefa
{
    public int TarefaId { get; set; }
    public string Nome { get; set; }
    public string Descricao { get; set; }
    public string Status { get; set; } 
    public int CategoriaId { get; set; }
    public Categoria Categoria { get; set; }
}

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var dbContext = new ApplicationDbContext();
dbContext.Database.EnsureCreated();

app.MapPost("/api/tarefa/cadastrar", async (Tarefa tarefa) =>
{
    dbContext.Tarefas.Add(tarefa);
    await dbContext.SaveChangesAsync();
    return Results.Created($"/api/tarefa/{tarefa.Id}", tarefa);
});

app.MapGet("/api/tarefa/listar", () =>
{
    var tarefas = dbContext.Tarefas.ToList();
    return Results.Ok(tarefas);
});

app.MapPatch("/api/tarefa/alterar", async (Tarefa tarefa) =>
{
    var existingTarefa = await dbContext.Tarefas.FindAsync(tarefa.Id);
    if (existingTarefa == null)
    {
        return Results.NotFound();
    }

    switch (existingTarefa.Status)
    {
        case "Não iniciada":
            existingTarefa.Status = "Em andamento";
            break;
        case "Em andamento":
            existingTarefa.Status = "Concluída";
            break;
        case "Concluída":
            break;
        default:
            return Results.BadRequest("Status inválido");
    }

    await dbContext.SaveChangesAsync();
    return Results.Ok(existingTarefa);
});

app.MapGet("/api/tarefa/naoconcluidas", () =>
{
    var tarefasNaoConcluidas = dbContext.Tarefas.Where(t => t.Status == "Não iniciada" || t.Status == "Em andamento").ToList();
    return Results.Ok(tarefasNaoConcluidas);
});

app.MapGet("/api/tarefa/concluidas", () =>
{
    var tarefasConcluidas = dbContext.Tarefas.Where(t => t.Status == "Concluída").ToList();
    return Results.Ok(tarefasConcluidas);
});