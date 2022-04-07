import { ModalModule } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {
  form!: FormGroup;
  get f(): any{
    return this.form.controls;
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
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

}
