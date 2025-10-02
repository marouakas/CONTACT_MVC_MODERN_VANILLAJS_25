import ContactTemplate from './template';


export default class Contact {
  constructor(data) {
    this.id = data.id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.isEditing = false;
  }

  render() {
    return ContactTemplate(this);
  }
}