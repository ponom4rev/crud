<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<?php
require "db.php";
$games = R::getAll( 'select * from games' );
#echo $result[0]['id'];
#echo count($result);
$output = "";
$total_row = count($games);
if($total_row > 0)
{
    $output .='<div class="card-columns">';
    foreach($games as $row)
    {
        $output .='
                    <div class="card" >
                        <img class="card-img-top" src="'.$row['path_to_img'].'" alt="Card image" style="height:200px">
                            <div class="card-body text-center">
                                <h4 class="card-title">'.$row['title'].'</h4>
                                <p class="card-text">'.$row['short_description'].'</p>
                                <button type="button" name = "edit" class="btn btn-primary btn-xs edit" id = "'.$row['id'].'">Edit</button>
                                <button type="button" name = "delete" class="btn btn-danger btn-xs delete" id = "'.$row['id'].'">Delete</button>
                            </div>
                        </div>
    ';
    }

    $output .='</div>';
}
echo $output;