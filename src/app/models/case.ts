export default class Case  {
  public id: string;
  public name: string;
  public status: CaseStatus;
  public assignedTo: string;

  constructor(id: string, name: string, status: CaseStatus, assignedTo: string = undefined) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.assignedTo = assignedTo;
  }
}

export enum CaseStatus {
  Open = 1,
  Assigned = 2,
  Complete = 3
}
