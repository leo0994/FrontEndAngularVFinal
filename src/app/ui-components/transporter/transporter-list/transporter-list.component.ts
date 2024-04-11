import {Component, OnInit} from '@angular/core';
import {TransporterService} from "../../../logic-components/services/TransporterService";
import {Transporter} from "../../../logic-components/classes/Transporter";
import {TransporterEditModalComponent} from "../transporter-edit-modal/transporter-edit-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-transporter-list',
  templateUrl: './transporter-list.component.html',
  styleUrls: ['./transporter-list.component.css']
})
export class TransporterListComponent implements OnInit {
  transporters: Transporter[] = [];

  constructor(private transporterService: TransporterService, private modalService: NgbModal) {}

  ngOnInit() {
    this.transporterService.transporters$.subscribe((transporters) => {
      this.transporters = transporters;
    });
  }

  openEditModal(transporterId: number) {
    this.transporterService.getTransporterDetails(transporterId).subscribe((transporter: any) => {
      const modalRef = this.modalService.open(TransporterEditModalComponent, { size: 'lg' });
      modalRef.componentInstance.transporter = transporter;
    });
  }
  onDeleteTransporter(transporter: Transporter) {
    this.transporterService.deleteTransporter(transporter.id).subscribe((response:any) => {
      console.log("borrado", response);
    });
  }


}

