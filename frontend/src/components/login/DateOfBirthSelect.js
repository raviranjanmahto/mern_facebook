const DateOfBirthSelect = ({
  bDay,
  bMonth,
  bYear,
  days,
  months,
  years,
  handleChange,
  dateError,
}) => {
  return (
    <div className='reg_grid'>
      <select name='bDay' value={bDay} onChange={handleChange}>
        {days.map((day, i) => (
          <option value={day} key={i}>
            {day}
          </option>
        ))}
      </select>
      <select name='bMonth' value={bMonth} onChange={handleChange}>
        {months.map((month, i) => (
          <option value={month} key={i}>
            {month}
          </option>
        ))}
      </select>
      <select name='bYear' value={bYear} onChange={handleChange}>
        {years.map((year, i) => (
          <option value={year} key={i}>
            {year}
          </option>
        ))}
      </select>
      {dateError && (
        <div className='input_error'>
          <div className='error_arrow_bottom'></div>
          {dateError}
        </div>
      )}
    </div>
  );
};

export default DateOfBirthSelect;
