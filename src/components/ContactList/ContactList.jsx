import { Component } from 'react';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';

class ContactList extends Component {
  render() {
    const { contacts, filter, handleDelete } = this.props;
    return (
      <div className={css.contactsContainer}>
        <ul className={css.contactList}>
          {contacts
            .filter(el => {
              return el.name.toLowerCase().includes(filter.toLowerCase());
            })
            .map(contact => (
              <li key={contact.id}>
                {contact.name}: {contact.number}
                <button
                  type="button"
                  className={css.deleteButton}
                  onClick={() => handleDelete(contact.id)}
                  style={{ marginLeft: 10 }}
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

ContactList.propTypes = {
  handleDelete: PropTypes.func.isRequired,
};

export default ContactList;
