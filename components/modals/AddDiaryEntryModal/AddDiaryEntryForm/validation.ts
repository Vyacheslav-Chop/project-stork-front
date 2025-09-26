import * as Yup from "yup";

export const validationDiarySchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Мінімум 3 символи")
    .max(50, "Максимум 50 символів")
    .required("Заголовок обов’язковий"),
  categories: Yup.array()
    .of(Yup.string())
    .min(1, "Виберіть хоча б одну категорію"),
  description: Yup.string()
    .min(5, "Мінімум 5 символів")
    .required("Запис обов’язковий"),
});
