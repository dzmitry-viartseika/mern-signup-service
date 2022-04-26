/**
 * Роли клиентов в системе для фильтрации
 * */

enum ClientRoles {
  /** Все клиенты (включает админов и клиентов) */
  ALL = 'ALL',

  /** Только клиенты */
  CLIENT = 'CLIENT',

  /** Только админы */
  ADMIN = 'ADMIN'
}

export default ClientRoles;
