import { Seal } from "../../db/models";

export const count = async () => {
  try {
    const seal = await Seal.findAndCountAll();

    return { success: true, nextNumber: seal.count + 1 };
  } catch (e) {
    return { success: false, error: e };
  }
};

export const detail = async (id: string) => {
  try {
    const seal = await Seal.findOne({
      where: {
        id: id,
      },
    });

    if (!seal) {
      return { success: false, error: "Seal not found" };
    }
    return { success: true, seal };
  } catch (e) {
    return { success: false, error: e };
  }
};
