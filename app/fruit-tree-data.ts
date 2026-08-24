export const FRUIT_META = {
  mango: { name: "Манго", note: "Сочное тропическое пюре и сироп", accent: "#f0a62b" },
  passion: { name: "Маракуйя", note: "Яркая кислинка и насыщенный аромат", accent: "#a96cc0" },
  raspberry: { name: "Малина", note: "Спелая ягода для напитков и десертов", accent: "#ec476b" },
  strawberry: { name: "Клубника", note: "Узнаваемый вкус свежей ягоды", accent: "#f05b47" },
  orange: { name: "Апельсин", note: "Цитрусовая свежесть и натуральный цвет", accent: "#ff9127" },
  lime: { name: "Лайм", note: "Чистая кислотность для барной карты", accent: "#b7ff4a" },
  blueberry: { name: "Черника", note: "Глубокий ягодный профиль", accent: "#6588d7" },
  pineapple: { name: "Ананас", note: "Тропическая сладость с лёгкой кислинкой", accent: "#f1c13a" },
} as const;

export type FruitKind = keyof typeof FRUIT_META;
