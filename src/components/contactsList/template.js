import "./styles.css";

export default function ContactsListTemplate(contactsList) {
  return `
    <div class="w-full bg-white rounded-lg shadow-lg flex flex-wrap overflow-hidden">
      <aside class="w-1/3 bg-gray-200 p-6 pb-12">
        <h2 class="text-xl font-bold mb-4">Add a Contact</h2>
        <div class="mb-4">
          <label class="block text-gray-700">Firstname</label>
          <input
            type="text"
            class="input-add-firstname mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Alex"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Lastname</label>
          <input
            type="text"
            class="input-add-lastname mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Doe"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input
            type="email"
            class="input-add-email mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="alex.doe@gmail.com"
          />
        </div>
        <button class="btn-add w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
          Add
        </button>
      </aside>

      <section class="w-2/3 p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold mb-4">Contacts List</h2>
          <p class="text-gray-600 mb-4">
            Contacts Count : <span class="font-bold">${contactsList.contacts.length}</span>
          </p>
        </div>

        <div class="mb-4">
          <input
            type="text"
            class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search a contact"
          />
        </div>

        <table class="table-auto w-full contacts-table">
          <thead>
            <tr class="bg-gray-200">
              <th class="text-left p-4 rounded-tl-lg">
                <a href="#">Firstname</a>
              </th>
              <th class="text-left p-4">
                <a href="#">Lastname</a>
              </th>
              <th class="text-left p-4">
                <a href="#">Email</a>
              </th>
              <th class="text-right p-4 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${contactsList.contacts.map((contact) => contact.render()).join("")}
          </tbody>
        </table>
      </section>

      <footer class="w-full bg-gray-500 text-white text-xs p-2">
        &copy; EAFC 2025 Contacts App. All rights reserved.
      </footer>
    </div>
  `;
}