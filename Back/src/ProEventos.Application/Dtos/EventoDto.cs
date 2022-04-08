using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; } 
        public string DataEvento { get; set; }
        [
            Required(ErrorMessage = "O campo {0} é obrigatório!"),
            //MinLength(3, ErrorMessage = "O campo {0} deve ter no mínimo 4 caracteres!"),
            //MaxLength(50, ErrorMessage = "O campo {0} deve ter no máximo 50 caracteres!"),
            StringLength(50, MinimumLength = 3, ErrorMessage = "Intervalo Permitido de 3 a 50 caracteres!")
        ]
        public string Tema { get; set; }
        [Range(1, 120000, ErrorMessage = "[0] não pode ser menor que 1 e maior que 120.000")]
        public int QtdPessoas { get; set; }
        // public string Lote { get; set; }
        [RegularExpression(@".*\.(git|jpe?g|bmp|png)$", ErrorMessage = "Não é uma imagem válida. (gif, jpg, jpeg, bmp ou png)")]
        public string ImagemURL { get; set; }
        [Required(ErrorMessage =  "O campo {0} é obrigatório!")]
        [Phone(ErrorMessage = "O campo {0} está com número inválido!")]
        public string Telefone { get; set; }
        [Display(Name = "e-mail")]
        [EmailAddress(ErrorMessage = "O campo {0} precisa ser um e-mail válido!")]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}