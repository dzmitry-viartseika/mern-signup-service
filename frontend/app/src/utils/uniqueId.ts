function getUniqueId() {
  return Math.floor(new Date().valueOf() * Math.random());
}

export default getUniqueId;
