import { Component } from "react";
import { nanoid } from 'nanoid'
import { Section } from "./Section"; 
import { Filter } from "./Filter";
import { ContactList } from "./ContactList";
import { ContactForm } from "./ContactForm";

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  contactsChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  contactsSubmit = e => {
    const id = nanoid();
    const name = e.name;
    const number = e.number;
    const contactsLists = [...this.state.contacts];

    if (
      contactsLists.findIndex(
        contact =>
          name.toLowerCase().replace(/ /g, '') ===
          contact.name.toLowerCase().replace(/ /g, '')
      ) !== -1
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      contactsLists.push({ name, id, number });
    }

    this.setState({ contacts: contactsLists });
  };
  contactsDelete = e => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== e),
    }));
  };
  getFilteredContacts = () => {
    let filterContactsList = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
     });
    return filterContactsList;
  };
  componentDidMount() {
    if (localStorage.contact) {
      let localContacts = JSON.parse(localStorage.getItem('contact'))
      this.setState({ contacts: localContacts })
      console.log(this.state.contacts);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.setState.contacts !== prevState.contacts) {
      localStorage.setItem("contact", JSON.stringify(this.state.contacts))
    }
  }

  render() {
    return (
      <div>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.contactsSubmit} />
        </Section>
        <Section title="Contacts">
          <Filter filter={this.state.filter} contactsChange={this.contactsChange} />
          <ContactList
            contacts={this.getFilteredContacts()}
            contactsDelete={this.contactsDelete}
          />
        </Section>
      </div>
    );
  }
}
