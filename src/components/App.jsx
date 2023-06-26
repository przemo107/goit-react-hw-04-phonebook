import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import PropTypes from 'prop-types';
import { nanoid } from '../../node_modules/nanoid/index';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const dataFromLocal = localStorage.getItem('contacts');
    const parsedDataFromLocal = JSON.parse(dataFromLocal);
    if (parsedDataFromLocal) {
      setContacts(parsedDataFromLocal);
    }
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      setContacts([...contacts, { id: nanoid(), name, number }]);
      form.reset();
    }
  };

  const handleFilter = e => {
    const filter = e.currentTarget.value;
    setFilter(filter);
  };

  const handleDelete = id => {
    const deletedContact = contacts.find(contact => contact.id === id);

    const deletedContactIndex = contacts.indexOf(deletedContact);

    contacts.splice(deletedContactIndex, 1);
    setContacts([...contacts]);
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <Filter handleFilter={handleFilter} />
      <ContactList
        contacts={contacts}
        filter={filter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
};
