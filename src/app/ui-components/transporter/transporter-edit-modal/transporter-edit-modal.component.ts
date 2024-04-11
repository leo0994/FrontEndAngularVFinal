import {Component, Input, OnInit} from '@angular/core';
import {Transporter} from "../../../logic-components/classes/Transporter";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TransporterService} from "../../../logic-components/services/TransporterService";

@Component({
  selector: 'app-transporter-edit-modal',
  templateUrl: './transporter-edit-modal.component.html',
  styleUrls: ['./transporter-edit-modal.component.css']
})
export class TransporterEditModalComponent implements OnInit{
  @Input() transporter: Transporter | undefined;
  toUpdateTransporter: Transporter = new Transporter();// Recibe el objeto Transporter del componente padre
  constructor(public activeModal: NgbActiveModal, private transporterService: TransporterService) {
  }

  ngOnInit() {
    if (this.transporter) {
      // @ts-ignore
      this.toUpdateTransporter = new Transporter(this.transporter?.id, this.transporter?.name, this.transporter?.company)
      console.log('transporter', this.toUpdateTransporter);
    }
  }

  onSubmit() {
    // Llama al servicio para actualizar el Transporter
    // @ts-ignore
    this.transporterService.updateTransporter(this.toUpdateTransporter).subscribe(
      (updatedTransporter) => {
        console.log('Transporter actualizado:', updatedTransporter);
        // Realiza acciones adicionales después de actualizar el transporter si es necesario

        // Cierra el modal
        this.activeModal.close('Cambios guardados');
      },
      (error) => {
        console.error('Error al actualizar el transporter:', error);
        // Maneja el error apropiadamente

        // Cierra el modal (opcional, dependiendo de cómo quieras manejar los errores)
        this.activeModal.dismiss();
      }
    );
  }
}




