<?php
include('db.php');
if(isset($_POST['action']))
{
    if($_POST['action']=="insert")
    {
        $game = R::dispense( 'games' );
        $game->title = $_POST["name_of_game"];
        $game->short_description = $_POST["short_description"];
        $game->full_description = $_POST["full_description"];
        $game->path_to_img = "images/".$_POST["image_of_game"];
        R::store($game);
        echo '<p>Data Inserted...</p>';
    }

    if($_POST["action"]=='fetch_single')
    {
        $game = R::load('games', $_POST["id"]);
        $output['name_of_game'] = $game['title'];
        $output['short_description'] = $game['short_description'];
        $output['full_description'] = $game['full_description'];
        $output['path_to_img'] = $game['path_to_img'];
        echo json_encode($output);
    }


}



/*
$game = R::dispense( 'games' );
$game->title = '$_POST["name_of_game"]';
$game->short_description = '$_POST["short_description"]';
$game->full_description = '$_POST["full_description"]';
$game->path_to_img = '$_POST["image_of_game"]';
R::store($game);
echo '<p>Data Inserted...</p>';
*/