export class Transporter {
  id: number;
  name: string;
  company: string;

  constructor(id: number = 0, name: string = '', company: string = '') {
    this.id = id;
    this.name = name;
    this.company = company;
  }

}
