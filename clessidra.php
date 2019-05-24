
<?php
$responsabile="Filippo Alessandrin";
$titoloEvento ="Riunione Gruppo IT";
$inizioEvento="09:00";
$fineEvento="12:00";
$temperature="17°";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/animazione.css" type="text/css" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Mandali|Pontano+Sans|Questrial|Roboto|Sarabun&display=swap" rel="stylesheet">
    <title>Clessidra</title>
</head>
<body>

    <div class="container-fluid font">
        
        <!--EVENTO IN CORSO-->
        
        <div class="row" id="evento-in-corso">
            <div class="col-3 text-center">
                <img  src="img/gruppo-sinergia-logistica-per-ecommerce-bianco.png" class="img-header">
            </div>
            <div class="col-6" id="descr">
                <div>
                    <?php echo $titoloEvento ." (h. " . $inizioEvento ." - ". $fineEvento .")"; ?>
                </div>
                <div>
                    <h3>Responsabile:<?php echo " " . $responsabile;?></h3>
                </div>
            </div>
            <div class="col-3 text-center" id="ora">
                <?=date('H:i'); ?>
            </div>
        </div>    
    
        <!--EVENTI-->

        <div class="row ">
            
            <!--DI OGGI-->
            
            <div class="col-3 oggi">
                <div class="row">
                    <div class="col-12 titolo">
                        Oggi, <?php echo date('jS \of F');?>
                    </div>
                </div>
                <div class="row">
                <div class="col-12">
                    <div class="row evento-oggi">
                        <div class="col-3" id="ora-oggi">
                            <?php echo $inizioEvento ."<br>". $fineEvento?>
                        </div>
                        <div class="col-9">
                            <div id="oggi-titolo">
                                <?php echo $titoloEvento?>
                            </div>
                            <div>
                                <?php echo "R: " . $responsabile?>
                            </div>
                        </div>
                    </div>
                    <div class="row evento-oggi">
                        <div class="col-3" id="ora-oggi">
                            <?php echo $inizioEvento ."<br>". $fineEvento?>
                        </div>
                        <div class="col-9">
                            <div>
                                <?php echo $titoloEvento?>
                            </div>
                            <div>
                                <?php echo "R: " . $responsabile?>
                            </div>
                        </div>
                    </div>
                    <div class="row evento-oggi">
                        <div class="col-3" id="ora-oggi">
                            <?php echo $inizioEvento ."<br>". $fineEvento?>
                        </div>
                        <div class="col-9">
                            <div>
                                <?php echo $titoloEvento?>
                            </div>
                            <div>
                                <?php echo "R: " . $responsabile?>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <!--DELLA SETTIMANA-->

            <div class="col-9"  id="settimana">
                
                    <div class="row titolo" id="titolo2">
                        <div class="col-12">
                            <?php echo date('M  Y');?>
                        </div>
                    </div>
                    <div class="row">
                        
                        <div class="col-2" id="blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12">
                                    MERCOLEDÌ 24
                                </div>
                            </div>
                            <div class="row evento-settimana">
                                <div class="col-3 bordino">
                                    <?= $inizioEvento . " " . $fineEvento;?>
                                </div>
                                <div class="col-9">
                                    <div><?= $titoloEvento; ?></div>
                                    <div><?= "R: " . $responsabile;?></div>
                                </div>
                            </div>
                        </div>
                                            
                        <div class="col-2" id="blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12">
                                    MERCOLEDÌ 24
                                </div>
                            </div>
                            <div class="row evento-settimana">
                                <div class="col-3 bordino">
                                    <?= $inizioEvento . " " . $fineEvento;?>
                                </div>
                                <div class="col-9">
                                    <div><?= $titoloEvento; ?></div>
                                    <div><?= "R: " . $responsabile;?></div>
                                </div>
                            </div>
                        </div>
                                        
                        <div class="col-2" id="blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12">
                                    MERCOLEDÌ 24
                                </div>
                            </div>
                            <div class="row evento-settimana">
                                <div class="col-3 bordino">
                                    <?= $inizioEvento . " " . $fineEvento;?>
                                </div>
                                <div class="col-9">
                                    <div><?= $titoloEvento; ?></div>
                                    <div><?= "R: " . $responsabile;?></div>
                                </div>
                            </div>
                        </div>
                                           
                        <div class="col-2" id="blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12">
                                    MERCOLEDÌ 24
                                </div>
                            </div>
                            <div class="row evento-settimana">
                                <div class="col-3 bordino">
                                    <?= $inizioEvento . " " . $fineEvento;?>
                                </div>
                                <div class="col-9">
                                    <div><?= $titoloEvento; ?></div>
                                    <div><?= "R: " . $responsabile;?></div>
                                </div>
                            </div>
                        </div>
                                             
                        <div class="col-2" id="blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12">
                                    MERCOLEDÌ 24
                                </div>
                            </div>
                            <div class="row evento-settimana">
                                <div class="col-3 bordino">
                                    <?= $inizioEvento . " " . $fineEvento;?>
                                </div>
                                <div class="col-9">
                                    <div><?= $titoloEvento; ?></div>
                                    <div><?= "R: " . $responsabile;?></div>
                                </div>
                            </div>
                        </div>
                                              
                        <div class="col-2" id="blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12">
                                    MERCOLEDÌ 24
                                </div>
                            </div>
                            <div class="row evento-settimana">
                                <div class="col-3 bordino">
                                    <?= $inizioEvento . " " . $fineEvento;?>
                                </div>
                                <div class="col-9">
                                    <div><?= $titoloEvento; ?></div>
                                    <div><?= "R: " . $responsabile;?></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                                            
                        <div class="col-2" id="blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12">
                                    MERCOLEDÌ 24
                                </div>
                            </div>
                            <div class="row evento-settimana">
                                <div class="col-3 bordino">
                                    <?= $inizioEvento . " " . $fineEvento;?>
                                </div>
                                <div class="col-9">
                                    <div><?= $titoloEvento; ?></div>
                                    <div><?= "R: " . $responsabile;?></div>
                                </div>
                            </div>
                        </div>
                                             
                        <div class="col-2" id="blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12">
                                    MERCOLEDÌ 24
                                </div>
                            </div>
                            <div class="row evento-settimana">
                                <div class="col-3 bordino">
                                    <?= $inizioEvento . " " . $fineEvento;?>
                                </div>
                                <div class="col-9">
                                    <div><?= $titoloEvento; ?></div>
                                    <div><?= "R: " . $responsabile;?></div>
                                </div>
                            </div>
                        </div>
                                            
                        <div class="col-2" id="blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12">
                                    MERCOLEDÌ 24
                                </div>
                            </div>
                            <div class="row evento-settimana">
                                <div class="col-3 bordino">
                                    <?= $inizioEvento . " " . $fineEvento;?>
                                </div>
                                <div class="col-9">
                                    <div><?= $titoloEvento; ?></div>
                                    <div><?= "R: " . $responsabile;?></div>
                                </div>
                            </div>
                        </div>
                                             
                        <div class="col-2" id="blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12">
                                    MERCOLEDÌ 24
                                </div>
                            </div>
                            <div class="row evento-settimana">
                                <div class="col-3 bordino">
                                    <?= $inizioEvento . " " . $fineEvento;?>
                                </div>
                                <div class="col-9">
                                    <div><?= $titoloEvento; ?></div>
                                    <div><?= "R: " . $responsabile;?></div>
                                </div>
                            </div>
                        </div>
                                            
                        <div class="col-2" id="blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12">
                                    MERCOLEDÌ 24
                                </div>
                            </div>
                            <div class="row evento-settimana">
                                <div class="col-3 bordino">
                                    <?= $inizioEvento . " " . $fineEvento;?>
                                </div>
                                <div class="col-9">
                                    <div><?= $titoloEvento; ?></div>
                                    <div><?= "R: " . $responsabile;?></div>
                                </div>
                            </div>
                        </div>
                                              
                        <div class="col-2" id="blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12">
                                    MERCOLEDÌ 24
                                </div>
                            </div>
                            <div class="row evento-settimana">
                                <div class="col-3 bordino">
                                    <?= $inizioEvento . " " . $fineEvento;?>
                                </div>
                                <div class="col-9">
                                    <div><?= $titoloEvento; ?></div>
                                    <div><?= "R: " . $responsabile;?></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           
        </div>
            
        <!-- BARRA INFO
        <div class="row barra-info">
            <div class="col-3 text-center">
                    <img  src="img/logoSinergia.png" class="img-header">
            </div>
            <div class="col-6 text-center" id="ora">
                <?=date('H:i'); ?>
            </div>
            <div class="col-3 text-center">
                <img  src="img/amcharts/animated/cloudy.svg" id="weather">
                <?php echo $temperature;?>
            </div>
        </div> -->

    </div>




<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script type="text/javascript" src="js/weather.js"></script>
<script type="text/javascript" src="js/calendar.js"></script>
    
<script async defer src="https://apis.google.com/js/api.js" onload="this.onload=function(){};handleClientLoad()" onreadystatechange="if (this.readyState === 'complete') this.onload()"></script>

</body>
</html>
