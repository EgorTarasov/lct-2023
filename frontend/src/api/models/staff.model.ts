export const MocStaff: StaffDto.User[] = [
  {
    id: "1",
    roles: ["HR"],
    fullName: "Иванова Анна Михайловна",
    phone: "+7 (921) 123-45-67",
    email: "ivanova.anna@mail.ru",
    telegram: "@ivanova_anna"
  },
  {
    id: "2",
    roles: ["Маркетолог"],
    fullName: "Петров Сергей Васильевич",
    phone: "+7 (922) 234-56-78",
    email: "petrov.sergey@mail.ru",
    telegram: "@petrov_sergey"
  },
  {
    id: "3",
    roles: ["Разработчик", "Team Lead"],
    fullName: "Смирнова Ольга Ивановна",
    phone: "+7 (923) 345-67-89",
    email: "smirnova.olga@mail.ru",
    telegram: "@smirnova_olga"
  },
  {
    id: "4",
    roles: ["Дизайнер"],
    fullName: "Кузнецова Мария Петровна",
    phone: "+7 (924) 456-78-90",
    email: "kuznetsova.maria@mail.ru",
    telegram: "@kuznetsova_maria"
  },
  {
    id: "5",
    roles: ["Разработчик"],
    fullName: "Соколов Илья Дмитриевич",
    phone: "+7 (925) 567-89-01",
    email: "sokolov.ilya@mail.ru",
    telegram: "@sokolov_ilya"
  },
  {
    id: "6",
    roles: ["HR", "Team Lead"],
    fullName: "Попова Ксения Романовна",
    phone: "+7 (926) 678-90-12",
    email: "popova.ksenia@mail.ru",
    telegram: "@popova_ksenia"
  },
  {
    id: "7",
    roles: ["Продажи"],
    fullName: "Лебедева Дарья Александровна",
    phone: "+7 (927) 789-01-23",
    email: "lebedeva.darya@mail.ru",
    telegram: "@lebedeva_darya"
  },
  {
    id: "8",
    roles: ["Финансист"],
    fullName: "Новиков Денис Михайлович",
    phone: "+7 (928) 890-12-34",
    email: "novikov.denis@mail.ru",
    telegram: "@novikov_denis"
  },
  {
    id: "9",
    roles: ["Аналитик"],
    fullName: "Морозова Екатерина Владимировна",
    phone: "+7 (929) 901-23-45",
    email: "morozova.ekaterina@mail.ru",
    telegram: "@morozova_ekaterina"
  },
  {
    id: "10",
    roles: ["HR"],
    fullName: "Петрова Алина Игоревна",
    phone: "+7 (930) 012-34-56",
    email: "petrova.alina@mail.ru",
    telegram: "@petrova_alina"
  }
];

export namespace StaffDto {
  export interface User {
    id: string;
    roles: string[];
    fullName: string;
    phone: string;
    email: string;
    telegram: string;
  }
}
