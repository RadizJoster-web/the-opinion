function generate_date_range() {
  // Setup date_untl (today)
  const date_until_obj = new Date(); // current Date
  const until_year = date_until_obj.getFullYear(); // get year
  const until_mont = date_until_obj.getMonth() + 1; // get month
  const until_day = date_until_obj.getDate(); // get date
  let default_until_formatted = `${until_year}-${until_mont}-${until_day}`; // insert all of them to one

  // Setup  date_from
  const date_from_obj = new Date(); // get current date
  current_month = date_from_obj.getMonth(); // get current month
  date_from_obj.setMonth(current_month - 5); // set current date to 5 month ago
  const from_year = date_from_obj.getFullYear(); // get year
  const from_mont = date_from_obj.getMonth() + 1; // get month
  const from_day = date_from_obj.getDate(); // get date
  let default_from_formatted = `${from_year}-${from_mont}-${from_day}`;

  const date_from = default_from_formatted;
  const date_until = default_until_formatted;

  return {
    generate_date_from: date_from,
    generate_date_until: date_until,
  };
}

module.exports = generate_date_range;
