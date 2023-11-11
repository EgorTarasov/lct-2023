# Решение команды "Котики МИСИС"

## Краткий путь пользователя
Исполненный нами продукт - цифровая платформа для адаптации и онбординга сотрудников.

Для пользователей сервис предоставляет возможность безопасной авторизации,
получения образовательных материалов, записи на адаптационные мероприятия, 
а также возможность узнать больше о своей команде. Кроме того, мы реализуем возможность
получения уведомлений о происходящем на платформе и собираем обратную связь
для улучшения компанией процесса онбординга. 

Для HR-персонала и руководителей мы создали функционал по выдаче материалов, создания мероприятий
и заданий, а также по анализу работы подопечных на платформе и выгрузки статистики (примеры в папке examples). В дополнении
к этому компании доступна загрузка собственного брендинга - персональные шрифты, цвета и логотип


## Решение
Решение можно попробовать перейдя по [ссылке](https://larek.itatmisis.ru/)

## Особенности приложения
Можно генерировать тесты к материалам с помощью МЛ-модели llama2,
получать помощь от цифрового AI помощника не дожидаясь ответа HR. 
Фронтенд предоставляет полную доступность для людей с ограниченными возможностями.

## Стек приложения
__Бэкенд__: фреймворк FastApi, база данных: PostgreSQL, очередь задач: Celery + RabbitMQ, 
МЛ Модель llama2, Telegram API, Docker

__Фронтенд__: React, Tailwind, TypeScript, MobX

## Команда

[Лиза, Product designer](https://t.me/dvij_designer)

[Егор, Backend](https://t.me/tarasov_egor)

[Андрей, Backend](https://t.me/using_namespace)

[Кирилл, Frontend](https://t.me/biskwiq)

[Лёша, Frontend](https://t.me/nizhgo)


## Основной функционал (не полный список):


- [x] Авторизация и регистрация
    - [x] По email + пароль
    - [x] через телеграм
    - [x] сброс пароля
    - [x] изменение одноразового пароля
    - [x] отправка сообщения с одноразовым паролем
    - [x] Роли пользователей и контроль доступа к фичам
    
- [x] настройка
    - [x] админ панель, для настройки
    - [x] отключение / добавление отдельных фич
    - [x] брендинг
        - [x] стили (лого, цвета)
        - [ ] формальный / не формальный стиль общения в текстовых фичах
- [x] mailing
    - [x] отправка письма из шаблона
    - [x] рассылка
- [x] обратная связь
    - [x] эмоционального состояния (просто цифру от 0 до 5 или -2 до 2)
    - [ ] периодическая (в первый день, через неделю, месяц и т.п.)
    - [ ] классификация обратной связи
- [x] База знаний
    - [x] сохранение файлов
    - [x] создание тегов и метаданных для поиска по документам / ресурсам
    - [x] поиск по ключевым словам / тегам
    - [ ] шаблоны для наставников
        - [ ] создание
        - [ ] поиск
    - [ ] рекомендательная система ?
- [x] Геймификация
    - [ ] ачивки (за выполнение заданий)
    - [x] создание заданий 
        - [x] ручное
        - [ ] с помощью описания офиса / компании
- [x] Мероприятия
    - [x] внутренние мероприятия
        - [x] собрания, созвоны
        - [x] образовательные
        - [x] развлекательные
        - [x] по интересам
    - [x] создание внутренних
- [x] интеграции
    - [x] телеграм 
        - [x] авторизация
        - [x] бот