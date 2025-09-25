export interface BabyWeekData {
  _id: string; // ID из базы (строка, например Mongo ObjectId)
  analogy: string | null; // аналогия (например "Лимон"), может быть null
  weekNumber: number; // номер недели
  babySize: number; // размер (см)
  babyWeight: number; // вес (г)
  image: string; // ссылка на картинку
  babyActivity: string; // описание активности малыша
  babyDevelopment: string; // описание развития малыша
  interestingFact: string; // интересный факт недели
  momDailyTips: string[]; // массив советов для мамы
}
