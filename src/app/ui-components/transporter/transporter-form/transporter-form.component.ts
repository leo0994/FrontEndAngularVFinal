import { Component } from '@angular/core';
import {TransporterService} from "../../../logic-components/services/TransporterService";

@Component({
  selector: 'app-transporter-form',
  templateUrl: './transporter-form.component.html',
  styleUrls: ['./transporter-form.component.css']
})
export class TransporterFormComponent {
  transporter: any = {};

  constructor(private transporterService: TransporterService) {}

  onSubmit() {
    // Envía el nuevo transporter al servidor a través del servicio si es necesario
    this.transporterService.addTransporter(this.transporter).subscribe(
      (response: any) => {
        console.log('Transporter agregado exitosamente:', response);
        // Puedes redirigir o realizar otras acciones después de agregar el transporter
      },
      (error: any) => {
        console.error('Error al agregar el transporter:', error);
        // Maneja el error apropiadamente
      }
    );
  }
}
