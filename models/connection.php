<?php
//
class Conexion extends PDO
{
    public function __construct()
    {
        $servidor = 'localhost';
        $user = 'root';
        $password = '';
        $DB = 'dico';
        try {
            parent::__construct('mysql:host='.$servidor.';dbname='.$DB, $user, $password);
            parent::exec('set names utf8');
        } catch (PDOException $e) {
            echo 'Error al conectar: ' . $e->getMessage();
            exit;
        }
    }
}
?>
