import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';


export const ContactList = ({ contacts, contactsDelete }) => (
  <div >
    <ul>
      {contacts.map(contact => (
        <li  key={nanoid()}>
          {contact.name}: {contact.number}
          <button
            type="button"
            onClick={() => contactsDelete(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  contactsDelete: PropTypes.func.isRequired,
};
