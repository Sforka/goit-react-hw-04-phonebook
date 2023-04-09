import React, { useState } from 'react'
import PropTypes from 'prop-types';
import css from '../style/ContactForm.module.css';
export function ContactForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const contactsChange = event => { 
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'number':
        setNumber(event.target.value);
        break;
      
      default:return
    }
  }

  const contactSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    onSubmit({name, number});
    form.reset();

    setName('');
    setNumber('');
    
  };
  
    return (
      <form className={css.contactForm} onSubmit={contactSubmit}>
        <label className={css.label}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="Enter name"
            value={name}
            onChange={contactsChange}
          />
        </label>

        <label className={css.label}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="Enter phone number"
            value={number}
            onChange={contactsChange}
          />
        </label>

        <button type="submit">Add contact</button>
      </form>
    );
  
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
