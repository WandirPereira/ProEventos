import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../services/evento.service';
import { Evento } from '@app/models/Evento';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {
  form!: FormGroup;
  estadoSalvar = 'post';
  evento = {} as Evento;

  get f(): any{
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }

  constructor(
      private fb: FormBuilder,
      private localeService: BsLocaleService,
      private router: ActivatedRoute,
      private eventoService: EventoService,
      private spinner: NgxSpinnerService,
      private toaster: ToastrService
    )
    {
      this.localeService.use('pt-br');
    }

    public carregarEvento(): void{
      const eventoIdParam = this.router.snapshot.paramMap.get('id');

      if (eventoIdParam !== null){
        this.spinner.show();

        this.estadoSalvar = 'put';

        this.eventoService.getEventoById(+eventoIdParam).subscribe(
            (evento: Evento) => {
            this.evento = {...evento};
            this.form.patchValue(this.evento);
          },
          (error: any) => {
            this.spinner.hide();
            this.toaster.error('Erro ao tentar carregar evento!', 'Error!');
            console.error(error);
          },
          () => {this.spinner.hide();},
        );
      }
    }

  ngOnInit(): void {
    this.validation();
    this.carregarEvento();
  }

  public validation(): void {
    this.form = this.fb.group({
      local: ['',Validators.required],
      dataEvento: ['',
        [
          Validators.required,
          //Validators.pattern
        ]
      ],
      tema: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50)
        ]
      ],
      qtdPessoas: ['',
        [
          Validators.required,
          Validators.max(120000),
          //Validators.//isnumerico
        ]
      ],
      imagemURL: ['',Validators.required],
      telefone: ['',
        [
          Validators.required,
          //Validators.pattern

        ]
      ],
      email: ['',
      [
        Validators.required,
        Validators.email
      ]
      ],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public salvarAlteracao(): void {
    this.spinner.show();

    if (this.form.valid){
      if (this.estadoSalvar==='post') {
        this.evento = {...this.form.value};
        this.eventoService.postEvento(this.evento).subscribe(
          () => {this.toaster.success('Evento salvo com sucesso!', 'Sucesso')},
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toaster.error('Erro ao salvar evento!', 'Erro');
          },
          () => {this.spinner.hide()},
        );
      }
      else
      {
        this.evento = {id: this.evento.id, ...this.form.value};
        this.eventoService.putEvento(this.evento.id, this.evento).subscribe(
          () => {this.toaster.success('Evento salvo com sucesso!', 'Sucesso')},
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toaster.error('Erro ao salvar evento!', 'Erro');
          },
          () => {this.spinner.hide()},
        );
      }
    }
  }
}
