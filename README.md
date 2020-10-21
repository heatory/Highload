# Highload

### [1-2 Лабораторная работа](https://github.com/heatory/Highload/tree/master/python-api "1-2 Лабораторная работа")

Сервис прогноза погоды ( + конфигурация для разворачивания в docker ).

Программа, запускающая другие в контейнере написана на C и лежит [тут](https://github.com/heatory/Highload/tree/master/isolation "тут"). Поддержаны изоляции:
 * hostname - **CLONE_NEWUTS**; 
 * файловой системы - **CLONE_NEWNS**; 
 * сети - **CLONE_NEWNET**; 
 * pid - **CLONE_NEWPID**.
 
А также лимитирование по памяти задаётся при выполнении программы.

### [3 Лабораторная работа](https://github.com/heatory/Highload/tree/master/python-tcp-game "3 Лабораторная работа")

TCP клиент-серверная игра угадай число.

### [4 Лабораторная работа](https://github.com/heatory/Highload/tree/master/services "4 Лабораторная работа")

Cервис А (сервис верификации) и сервис Б (сервис телефонов) на разных языках программирования (**Node.js** и **Python**) + *RPC* + *GraphQL*.