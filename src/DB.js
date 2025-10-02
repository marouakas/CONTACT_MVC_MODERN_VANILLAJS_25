export default class DB {
  static setApiURL(url) {
    this.apiURL = url;
  }

  static async find() {
    const response = await fetch(this.apiURL + "contact");
    return response.json();
  }

  static async create(contact) {
    const response = await fetch(this.apiURL + "contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    return response.json();
  }

  static async update(id, contact) {
    const response = await fetch(this.apiURL + "contact/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    return response.json();
  }

  static async delete(id) {
    await fetch(this.apiURL + "contact/" + id, {
      method: "DELETE",
    });
  }
}
