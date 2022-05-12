const formatQueryString = (obj: { [key: string]: string }) => {
  const newObject = { ...obj };
  Object.keys(newObject).forEach((key) => {
    if (newObject[key] === '') {
      delete newObject[key];
    }
  });

  return newObject;
};

export default formatQueryString;
