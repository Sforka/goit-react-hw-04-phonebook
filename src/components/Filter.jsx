import PropTypes from 'prop-types';

export const Filter = ({ filter, contactsChange }) => (
  <div>
    <label>Find contacts by name </label>
    <input
      type="text"
      name="filter"
      placeholder="Enter filter"
      value={filter}
      onChange={contactsChange}
    />
  </div>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  contactsChange: PropTypes.func.isRequired,
};