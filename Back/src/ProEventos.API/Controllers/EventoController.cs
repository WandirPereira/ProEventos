using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Data;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        // public IEnumerable<Evento> _evento = new Evento[] {
        //         new Evento() {
        //             EventoId = 1,
        //             Tema = "Angular 11 e Net. 5",
        //             Local = "BElo Horizonte",
        //             Lote = "1º Lote",
        //             QtdPessoas = 250,
        //             DataEvento =  DateTime.Now.AddDays(2).ToString("dd/MM/yyyy"),
        //             ImagemURL = "foto.png"
        //         },
        //         new Evento() {
        //             EventoId = 2,
        //             Tema = "Angular 11 e Net. 5",
        //             Local = "BElo Horizonte",
        //             Lote = "1º Lote",
        //             QtdPessoas = 250,
        //             DataEvento =  DateTime.Now.AddDays(2).ToString(),
        //             ImagemURL = "foto2.png"
        //         }
        //     };
        private readonly DataContext _context;
        public EventoController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _context.Eventos;
        }

        [HttpGet("{id}")]
        public Evento GetByID(int id)
        {
            return _context.Eventos.FirstOrDefault(evento => evento.EventoId == id);
        }
    }
}
