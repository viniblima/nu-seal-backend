import { Photo, Seal } from "./models";

const dbInit = async () => {
  await Photo.sync({ alter: true });
  await Seal.sync({ alter: true });
};

export default dbInit;
