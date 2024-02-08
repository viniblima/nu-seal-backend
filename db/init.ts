import { Photo } from "./models";

const dbInit = async () => {
    await Photo.sync({ alter: true });
}
export default dbInit;