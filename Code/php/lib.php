<?php

$pdo = new PDO('mysql:host=172.29.4.61;dbname=inf_431_19i_vogt', 'db_000674', '3v9fkmRrZPAP');

switch($_GET['action']) {
    // https://inf-431-19i-vogt.iet-gibb.net/php/lib.php?action=getTage&month=11&year=2019
    case 'getTage':
        $month = $_GET['month'];
        $year = $_GET['year'];

        $statement = $pdo->prepare("
            SELECT DISTINCT
                Datum,
                COUNT(*)
            FROM Aufgabe
            WHERE Erledigt = 0
              AND YEAR(Datum) = :year
              AND MONTH(Datum) = :month
            GROUP BY Datum");
        $statement->execute(array(':year' => $year, ':month' => $month));
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($result);
        die($json);
}
