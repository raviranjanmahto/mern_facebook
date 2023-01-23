const GenderSelect = ({ handleChange, genderError }) => {
  return (
    <div className='reg_grid'>
      <label htmlFor='male'>
        Male
        <input
          type='radio'
          name='gender'
          id='male'
          value='male'
          onChange={handleChange}
        />
      </label>
      <label htmlFor='female'>
        Female
        <input
          type='radio'
          name='gender'
          id='female'
          value='female'
          onChange={handleChange}
        />
      </label>
      <label htmlFor='custom'>
        Custom
        <input
          type='radio'
          name='gender'
          id='custom'
          value='custom'
          onChange={handleChange}
        />
      </label>
      {genderError && <div className='input_error'>{genderError}</div>}
    </div>
  );
};

export default GenderSelect;
