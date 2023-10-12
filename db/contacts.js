import fs from "fs/promises";
import * as path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("./db/contacts.json");

export async function listContacts() {
  const response = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(response);
  return allContacts;
}

export async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactById = allContacts.find((elem) => elem.id === contactId);
  return contactById || null;
}

export async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    console.log(`Contact with ID ${contactId} removed successfully.`);
  } catch (error) {
    console.error("Error writing to file:", error);
    throw error;
  }
  return result;
}

export async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const allContacts = await listContacts();

  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}
