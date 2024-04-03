// import { promises as fs } from "fs";
// import path from "path";
// import { v4 as uuidv4 } from "uuid";
// const contactsPath = path.join("db", "contacts.json");

// export async function listContacts() {
//   try {
//     const readContacts = await fs.readFile(contactsPath);
//     const contactOject = JSON.parse(readContacts);
//     return contactOject;
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// export async function getContactById(contactId) {
//   try {
//     const contactOject = await listContacts();
//     const contactById = contactOject.find((item) => item.id === contactId);
//     return contactById || null;
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// export async function removeContact(contactId) {
//   try {
//     const contactOject = await listContacts();
//     const contactById = contactOject.findIndex((item) => item.id === contactId);
//     if (contactById === -1) {
//       return null;
//     }
//     const [removeContact] = contactOject.splice(contactById, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(contactOject, null, 2));
//     return removeContact;
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// export async function addContact(data) {
//   try {
//     const contactOject = await listContacts();
//     const newContact = {
//       id: uuidv4(),
//       ...data,
//     };
//     contactOject.push(newContact);
//     await fs.writeFile(
//       contactsPath,
//       JSON.stringify(contactOject, null, 2),
//       "utf8"
//     );
//     return newContact;
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// export async function updateContactById(contactId, data) {
//   try {
//     const contactOject = await listContacts();
//     const contactById = contactOject.findIndex((item) => item.id === contactId);
//     if (contactById === -1) {
//       return null;
//     }

//     contactOject[contactById] = { ...contactOject[contactById], ...data };
//     await fs.writeFile(contactsPath, JSON.stringify(contactOject, null, 2));
//     return contactOject[contactById];
//   } catch (error) {
//     console.log(error.message);
//   }
// }
