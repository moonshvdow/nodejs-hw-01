const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json')

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data)
    return contacts;
}
  
async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId);
    if(!contact){
        return null;
    }
    return contact;
}
  
async function removeContact(contactId) {
    const contacts = await listContacts();
    const newContacts = contacts.filter(item => item.id !== String(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return newContacts;
}
  
async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const lastID = Number(contacts[contacts.length - 1].id)
    const newContact = {
        name,
        email,
        phone,
        id: String(lastID + 1),
    }
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact;
}


  module.exports = {
      listContacts,
      getContactById,
      removeContact,
      addContact
  }