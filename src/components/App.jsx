import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsStorage = JSON.parse(localStorage.getItem('contacts'));
    if (contactsStorage) {
      setContacts(contactsStorage);
    }
  }, []);

  useEffect(() => {
    
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const contactsSubmit = e => {
    console.log(e);
    const id = nanoid();
    const name = e.name;
    const number = e.number;
    const contactsLists = [...contacts];

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

    setContacts(contactsLists);
  };

  const contactsDelete = e => {
    setContacts(contacts.filter(contact => contact.id !== e));
  };

  const filterChange = e => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    const filterContactsList = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });

    return filterContactsList;
  };

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm onSubmit={contactsSubmit} />
      </Section>
      <Section title="Contacts">
        <Filter filter={filter} contactsChange={filterChange} />
        <ContactList
          contacts={getFilteredContacts()}
          contactsDelete={contactsDelete}
        />
      </Section>
    </div>
  );
}
