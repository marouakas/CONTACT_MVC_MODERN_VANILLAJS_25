import DB from "../../DB";
import Contact from '../contact/Contact';
import ContactsListTemplate from "./template";

export default class ContactsList {
  constructor(data) {
    this.div = document.querySelector(data.elt);
    DB.setApiURL(data.apiURL);
    this.contacts = [];
    this.contactsfun();
  }

  async contactsfun() {
    const contacts = await DB.find();
    this.contacts = contacts.map((contact) => new Contact(contact));
    this.render();
  }

  render() {
    this.div.innerHTML = ContactsListTemplate(this);
    this.attachEvents();
  }

  attachEvents() {
    const addBtn = this.div.querySelector(".btn-add");

    addBtn.onclick = async () => {
      const firstname = this.div.querySelector(".input-add-firstname").value;
      const lastname = this.div.querySelector(".input-add-lastname").value;
      const email = this.div.querySelector(".input-add-email").value;
      
      if (firstname && lastname && email) {
        const newContact = await DB.create({ firstname, lastname, email });
        this.contacts.push(new Contact(newContact));
        this.render();
        this.div.querySelector(".input-add-firstname").value = "";
        this.div.querySelector(".input-add-lastname").value = "";
        this.div.querySelector(".input-add-email").value = "";
      }
    };

    this.div.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.onclick = async () => {
        const row = btn.closest(".contact-row");
        const id = row.dataset.id;
        await DB.delete(id);
        this.contacts = this.contacts.filter((c) => c.id !== id);
        this.render();
      };
    });

    this.div.querySelectorAll(".btn-edit").forEach((btn) => {
      btn.onclick = () => {
        const row = btn.closest(".contact-row");
        const id = row.dataset.id;
        const contact = this.contacts.find((c) => c.id === id);
        if (contact) {
          contact.isEditing = true;
        }
        this.render();
      };
    });

    this.div.querySelectorAll(".btn-check").forEach((btn) => {
      btn.onclick = async () => {
        const row = btn.closest(".contact-row");
        const id = row.dataset.id;
        const firstname = row.querySelector(".input-firstname").value;
        const lastname = row.querySelector(".input-lastname").value;
        const email = row.querySelector(".input-email").value;
        
        await DB.update(id, { firstname, lastname, email });
        const contact = this.contacts.find((c) => c.id === id);
        if (contact) {
          contact.firstname = firstname;
          contact.lastname = lastname;
          contact.email = email;
          contact.isEditing = false;
        }
        this.render();
      };
    });
  }
}