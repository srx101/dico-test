<?php


require '../models/records.model.php';

if ($_POST) {
    $records = new Records();

    switch ($_POST["action"]) {
        case 'SAVE':
            $name = $_POST["name"];
            $email = $_POST["email"];
            $phone = $_POST["phone"];
            $message = $_POST["message"];
            $res = $records->Save($name, $email, $phone, $message);
            echo json_encode($res);
            break;
        case 'GETR':
            echo json_encode($records->getRecords());
            break;
    }
}
