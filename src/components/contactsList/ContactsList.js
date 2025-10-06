import DB from "../../DB";
import Contact from "../contact/Contact";
import ContactsListTemplate from "./template";

export default class ContactsList {
  constructor(data) {
    this.div = document.querySelector(data.elt);
    DB.setApiURL(data.apiURL);
    this.contacts = [];

    // Injecter le HTML dans le div
    this.div.innerHTML = ContactsListTemplate(this);

    // Sélecteurs des éléments après injectiona
    this.tbody = this.div.querySelector("table.contacts-table tbody");
    this.countSpan = this.div.querySelector("span.font-bold");
    this.inputFirstname = this.div.querySelector(".input-add-firstname");
    this.inputLastname = this.div.querySelector(".input-add-lastname");
    this.inputEmail = this.div.querySelector(".input-add-email");
    this.btnAdd = this.div.querySelector(".btn-add");

    // Charger contacts depuis DB
    this.loadContacts();

    // Events
    this.btnAdd.addEventListener("click", () => this.addContact());
  }

  async loadContacts() {
    const contacts = await DB.find();
    this.contacts = contacts.map(c => new Contact(c));
    this.tbody.innerHTML = ""; // vider le tableau avant d'ajouter eviter duplication
    this.contacts.forEach(contact => this.addContactInDOM(contact));
    this.renderContactsCount();
  }

  getContactsCount() {
    return this.contacts.length;
  }

  renderContactsCount() {
    this.countSpan.textContent = this.getContactsCount();
  }

  async addContact() {
   //  Récupérer les valeurs AVANT de les utiliser
  const firstname = this.inputFirstname.value;
  const lastname = this.inputLastname.value;
  const email = this.inputEmail.value;

  //  Envoyer à la DB
    const newContactData = await DB.create({ firstname, lastname, email });
    const newContact = new Contact(newContactData);

    this.contacts.push(newContact);
    this.addContactInDOM(newContact);
    this.renderContactsCount();

  }

  addContactInDOM(contact) {
    const tr = document.createElement("tr");
    tr.classList.add("contact-row");
    tr.dataset.id = contact.id;

    tr.innerHTML = `
      <td class="p-4">
        <span class="isEditing-hidden">${contact.firstname}</span>
        <input type="text" class="input-firstname isEditing-visible w-full" value="${contact.firstname}">
      </td>
      <td class="p-4">
        <span class="isEditing-hidden">${contact.lastname}</span>
        <input type="text" class="input-lastname isEditing-visible w-full" value="${contact.lastname}">
      </td>
      <td class="p-4">
        <span class="isEditing-hidden">${contact.email}</span>
        <input type="text" class="input-email isEditing-visible w-full" value="${contact.email}">
      </td>
      <td class="p-4">
        <div class="flex justify-end space-x-2">
          <button class="btn-check isEditing-visible bg-green-400 text-white px-4 py-2 rounded-md">
            <i class="fa-solid fa-check"></i>
          </button>
          <button class="btn-edit isEditing-hidden bg-yellow-400 text-white px-4 py-2 rounded-md">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn-delete isEditing-hidden bg-red-500 text-white px-4 py-2 rounded-md">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    `;

    // Events
    tr.querySelector(".btn-edit").addEventListener("click", () => tr.classList.add("isEditing"));
    tr.querySelector(".btn-check").addEventListener("click", () => this.validateEdit(tr, contact));
    tr.querySelector(".btn-delete").addEventListener("click", () => this.deleteContact(tr, contact));

    this.tbody.appendChild(tr);
  }

  async validateEdit(tr, contact) {
    const firstname = tr.querySelector(".input-firstname").value.trim();
    const lastname = tr.querySelector(".input-lastname").value.trim();
    const email = tr.querySelector(".input-email").value.trim();

    await DB.update(contact.id, { firstname, lastname, email });

    contact.firstname = firstname;
    contact.lastname = lastname;
    contact.email = email;

    const spans = tr.querySelectorAll("span.isEditing-hidden");
    spans[0].textContent = firstname;
    spans[1].textContent = lastname;
    spans[2].textContent = email;

    tr.classList.remove("isEditing");
  }

  async deleteContact(tr, contact) {
    await DB.delete(contact.id);
    this.contacts = this.contacts.filter(c => c.id !== contact.id);
    tr.remove();
    this.renderContactsCount();
  }
}
