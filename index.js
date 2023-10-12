import * as contact from "./db/contacts.js";
import { Command } from "commander";

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone")
  .parse(process.argv);

const options = program.opts();
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contact.listContacts();
      return console.log(allContacts);

    case "get":
      const contactById = await contact.getContactById(id);
      return console.log(contactById);

    case "add":
      const addContact = await contact.addContact(name, email, phone);
      console.log("user successfully added");
      return console.log(addContact);

    case "remove":
      const remContact = await contact.removeContact(id);
      return console.log(remContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
