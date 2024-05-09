export function formatDateForInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function formatTimeDifference(endTime: Date) {
  const currentDate = new Date();
  const timeDifference = endTime.getTime() - currentDate.getTime();

  if (timeDifference <= 0) {
    return {
      formattedTime: '0s',
      isLittleTime: true,
    };
  }

  const secondsDifference = Math.floor(timeDifference / 1000);

  const days = Math.floor(secondsDifference / (3600 * 24));
  const hours = Math.floor((secondsDifference % (3600 * 24)) / 3600);
  const minutes = Math.floor((secondsDifference % 3600) / 60);
  const seconds = secondsDifference % 60;

  let formattedTime = '';
  if (days > 0) {
    formattedTime += `${days}d `;
  }
  if (hours > 0) {
    formattedTime += `${hours}h `;
  }
  if (minutes > 0 || (days === 0 && hours === 0)) {
    formattedTime += `${minutes}m `;
  }
  formattedTime += `${seconds}s`;

  return {
    formattedTime,
    isLittleTime: days === 0 && hours === 0 && minutes < 30 ? true : false,
  };
}
