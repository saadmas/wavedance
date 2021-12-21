export const getEventDateDisplay = (eventDate: string) => {
  const eventDateDisplay = new Date(eventDate).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });
  return eventDateDisplay;
};

export const getAge = (birthdayString: string) => {
  const today = new Date();
  const birthDate = new Date(birthdayString);

  const monthDifference = today.getMonth() - birthDate.getMonth();
  const isTodayLessThanDayOfBirth = today.getDate() < birthDate.getDate();

  let age = today.getFullYear() - birthDate.getFullYear();

  if (monthDifference < 0 || (monthDifference === 0 && isTodayLessThanDayOfBirth)) {
    age--;
  }

  return age;
};
