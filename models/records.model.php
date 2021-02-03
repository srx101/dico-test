<?php

require 'connection.php';

class Records
{
    public function Save($name, $email, $phone, $message)
    {
        $conexion = new Conexion();
        $res = new stdClass();
        $stmt = $conexion->prepare("INSERT INTO records (name, email, phone, message)
        VALUES (:name, :email, :phone, :message);");

        $stmt->bindValue(":name", $name, PDO::PARAM_STR);
        $stmt->bindValue(":email", $email, PDO::PARAM_STR);
        $stmt->bindValue(":phone", $phone, PDO::PARAM_STR);
        $stmt->bindValue(":message", $message, PDO::PARAM_STR);


        if ($stmt->execute()) {
            $res->ok = true;
            $res->name = $name;
            $res->email = $email;
        } else {
            $res->ok = false;
            $res->message = "Error: Se ha generado un error al registrar tus datos";
        }

        return $res;
    }

    public function getRecords()
    {
        $conexion = new Conexion();
        $res = new stdClass();
        $stmt = $conexion->prepare("SELECT name,email,phone,message FROM records;");

        $stmt->execute();
        $resultado = $stmt->fetchAll(PDO::FETCH_OBJ);
        return $resultado;
    }
}
