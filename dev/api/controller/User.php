<?php
class User {

    function __construct() {}

    public function getCurrent() {
        $user = getSession()->get('user');
        if ($user) respond($user);
        else error('Not logged in.');
    }

    public function logout() {
        getSession()->set('user', null);
        respond('Logged out.');
    }

    public function login() {
        $params = getParams();
        $user = getDatabase()->one('SELECT * FROM users
                                    WHERE username=:username
                                    AND password=:password',
                                    array(':username' => $params->username,
                                          ':password' => md5($params->password)));
        if ($user) {
            unset($user['password']);
            getSession()->set('user', $user);
            respond($user);
        }
        else error('Wrong username or password.');
    }

    public function getAll() {
        loginCheck();
        $users = getDatabase()->all('SELECT id, username, access FROM users');
        respond($users);
    }

    public function getById($userId) {
        loginCheck();
        $user = getDatabase()->one('SELECT * FROM users
                                    WHERE id=:id',
                                    array(':id' => $userId));
        respond($user);
    }

    public function add() {
        loginCheck();
        $params = getParams();
        $existingUser = getDatabase()->one('SELECT * FROM users
                                            WHERE username=:username',
                                            array(':username' => $params->username));
        if ($existingUser) error('Username taken.');
        $userId = getDatabase()->execute('INSERT INTO users (username, password, access)
                                          VALUES(:username, :password, :access)',
                                          array(':username' => $params->username,
                                                ':password' => md5($params->password),
                                                ':access' => (int)$params->access));
        respond($userId);
    }

    public function update($userId) {
        loginCheck();
        $params = getParams();
        $affectedRows = getDatabase()->execute('UPDATE users
                                                SET username=:username, access=:access
                                                WHERE id=:id',
                                                array(':id'       => $userId,
                                                      ':username' => $params->username,
                                                      ':access'   => $params->access));
        respond($affectedRows);
    }

    public function delete($userId) {
        loginCheck();
        $affectedRows = getDatabase()->execute('DELETE FROM users
                                                WHERE id=:id',
                                                array(':id' => $userId));
        respond($affectedRows);
    }

}