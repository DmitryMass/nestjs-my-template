Темплейт для личного использования.

Авторизация с рефреш токеном.
Кетчер/Логгер.
Гварды на Запросы
Ролевая модель на запросы

localy api: http://localhost:3001/api#/

<!-- Добавить адвансед -->

1. Транзакции(квери раннеры) на откат запросов в случае ошибки. (на основной функционал не авторизацию)

  <!-- const queryRunner = this . dataSource . createQueryRunner (); 
  await queryRunner. connect (); 
  await queryRunner. startTransaction (); 
  try { 
    await queryRunner. manager . save ( Order , { 
      /* данные заказа */
     }); 
    await queryRunner. manager . save ( Item , { 
      /* данные элемента */
     }); 
    await queryRunner. commitTransaction (); 
  } catch (e) { 
    await queryRunner. rollbackTransaction (); 
    throw e; 
  } finally { 
    await queryRunner. release (); 
  } 
  
  // ...

2. Автосоздание токена + рефреша после SignUp для автовхода в платформу.
