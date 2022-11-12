export const dateParse = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const today = () => {
  let day = new Date(Date.now());
  day.setHours(7, 0, 0);
  // let date = (new Date(Date.now()))
  // date.setHours(9,0,0)
  // console.log((date - day)/900000)
  // console.log(`${day.getHours()}:${day.getMinutes()}:${day.getSeconds()}`)
  return day.getTime();
};
