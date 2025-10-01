import * as Yup from "yup";

export const validationDiarySchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Мінімум 3 символи")
    .max(20, "Максимум 20 символів")
    .required("Заголовок обов’язковий"),
  categories: Yup.array()
    .of(Yup.string())
    .min(1, "Виберіть хоча б одну категорію"),
  description: Yup.string()
    .min(1, "Мінімум 1 символів")
    .max(1000, "Максимум 1000 символів")
    .required("Запис обов’язковий"),
});
