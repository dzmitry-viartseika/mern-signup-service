import $api from '../../api/api';

/**
 * Сервис для создания нового пользователя и взаимодействия в системе.
 */

const AuthService = {
     /**
     * Авторизация пользователя для входа в систему.
     * @param {String}  email - почта нового пользователя
     * @param { String } password - пароль нового пользователя
     * @returns {Promise} Promise,  Возвращает текущего пользователя и accessToken
     */
    login(email, password) {
        return $api.post('/login', {email, password});
    },
};

export default AuthService;
