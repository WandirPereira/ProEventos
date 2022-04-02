import { EventoService } from '../../services/evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Evento } from '../../models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  //providers: [EventoService]  //opção para injeção de dependência no EventoService
})
export class EventosComponent implements OnInit {
  modalRef?: BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public widthImg = 90;
  public heightImg = 60;
  public marginImg = 2;
  public showImage = true;
  private _filtroLista = '';

  public get filtroLista(){
    return this._filtroLista;
  }
  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter (
      (evento : Evento) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      || evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) { }

  public  ngOnInit(): void {
    this.getEventos();

    /** spinner starts on init */
    this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    // }, 3000);

  }

  public  changeImage() : void{
    this.showImage = !this.showImage;
  }

  public getEventos(): void {
    const observer = {
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: unknown) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos!', 'Error!');
      },
      complete: () => this.spinner.hide()
    };
    this.eventoService.getEventos().subscribe(observer);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
        this.modalRef?.hide();
        this.toastr.success('O evento foi deletado com sucesso!', 'Deletado!');
  }

  decline(): void {
      this.modalRef?.hide();
  }

    // this.eventos =
    // [
    //   {
    //   Tema: 'Angular',
    //   Local: 'Belo Horizonte'
    //   },
    //   {
    //     Tema: 'Net.5',
    //     Local: 'São Paulo'
    //     },
    //     {
    //       Tema: 'Angular e suas novidades',
    //       Local: 'Rio de Janeiro'
    //     }
    // ];

}
