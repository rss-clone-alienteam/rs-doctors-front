export const filterData = <T extends object>(data: T) => {
  return Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== null));
};

export const pick = <T extends object>(obj: T, fieldsToTake: string[]) => Object.fromEntries(
  Object.entries(obj).filter(([key]) => fieldsToTake.includes(key))
);
