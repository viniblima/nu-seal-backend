import { Seal } from "../../db/models";

export const count = async () => {
  try {
    const count = await Seal.findAndCountAll();

    const seal = await Seal.create({
      numSeal: count.count + 1,
      isValid: false,
    });

    return { success: true, seal };
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
