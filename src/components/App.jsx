import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { FormAddContact } from "./Form/Form";

import { Section } from "./Section/Section";
import { Filter } from "./Filter/Filter";
import { Container, Wrapper } from "./App.styled";
import { ContactsList } from "./ContactList/ContactList";

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (localStorage.getItem('contacts')) {
      setContacts(JSON.parse(localStorage.getItem('contacts')));
    }
  }, []);

  useEffect(() => {
    const prevContacts = JSON.parse(localStorage.getItem('contacts'));
    if (prevContacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContact = (contact) => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    setContacts((prevContacts) => [
      { id: nanoid(), ...contact },
      ...prevContacts,
    ]);
  };

  const onDelete = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const getFilteredContacts = () => {
    if (filter) {
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return contacts;
  };

  const handleChange = (evt) => {
    setFilter(evt.target.value);
  };

  return (
    <Container>
      <Section title="Phonebook">
        <FormAddContact addContact={addContact} />
      </Section>
      <Section title="Contacts">
        
        {contacts.length > 0 ? (
          <Filter value={filter} onChange={handleChange} />
        ) : (
          <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
        )}
        {contacts.length > 0 && (
          <ContactsList
            contacts={getFilteredContacts()}
            deleteContact={onDelete}
          />
        )}
      </Section>
    </Container>
  );
};