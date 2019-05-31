<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no,
initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
    <link rel="stylesheet" href="css/animazione.css" type="text/css" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">
    <title>Calendario</title>
</head>
<body>

    <div class="container-fluid font">
        
        <!--EVENTO IN CORSO-->
        
        <div class="row color-change-red banner-height" id="evento-in-corso">
            <div class="col-3 text-center align-self-center m-auto">
                <img  src="img/gruppo-sinergia-logistica-per-ecommerce-bianco.png" class="img-header align-middle">
            </div>
            <div class="col-6 text-center descr-libera align-middle align-self-center m-auto" id="descr">
                <div class=row>
                    <div class="col-12 titolo-libera" >
                        <p id="titolo-in-corso">LIBERA</p>
                        
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <h3 id="responsabile"></h3>
                    </div>
                
                </div>
           
            </div>
            <div class="col-3 text-center align-self-center m-auto" id="ora">
                
            </div>

        </div> 
        
        
    
        <!--EVENTI-->

        <div class="row middle">
            
            <!--DI OGGI-->
            
            <div class="col-3 oggi">
                <div class="row titolo">
                    <div class="col-12  align-self-center m-auto" id="data-oggi">
                    </div>
                </div>
                <div class="row">
                    <div class="col-12" id="colonna-oggi">
       
                       
                           
                     
                    </div>
                </div>
            </div>

            <!--DELLA SETTIMANA-->

            <div class="col-9"  id="settimana">
                
                    <div class="row titolo" id="titolo2">
                        <div class="col-12 align-middle align-self-center m-auto" id="titolo-mese">
                            
                            
                        </div>
                    </div>
                    <div class="row">
                        
                                            
                        <div class="col blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12" id="giorno-titolo-1">
                                    
                                </div>
                            </div>
                                <div  id="giorno-1">
                                
                            </div>
                      
                        </div>
                                        
                        <div class="col blocco-settimana" >
                            <div class="row" id="giorno-settimana">
                                <div class="col-12" id="giorno-titolo-2">
                                    
                                </div>
                            </div>
                                <div id="giorno-2">
                                
                            </div>
                            
                        </div>
                                           
                        <div class="col blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12" id="giorno-titolo-3">
                                    
                                </div>
                            </div>
                                <div id="giorno-3">
                                
                            </div>
                           
                        </div>
                                             
                        <div class="col blocco-settimana" >
                            <div class="row" id="giorno-settimana">
                                <div class="col-12" id="giorno-titolo-4">
                                    
                                </div>
                            </div>
                                <div id="giorno-4">
                                
                            </div>
                            
                        </div>
                                              
                        <div class="col blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12" id="giorno-titolo-5">
                                  
                                </div>
                            </div>
                                <div id="giorno-5">
                                
                            </div>
                           
                        </div>
                    </div>
                    <div class="row">
                                            
                        <div class="col blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12" id="giorno-titolo-6">
                                    
                                </div>
                            </div>
                                <div id="giorno-6">
                                
                            </div>
                            
                        </div>
                                             
                        <div class="col blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12" id="giorno-titolo-7">
                                    
                                </div>
                            </div>
                                <div id="giorno-7">
                                
                            </div>
                            
                        </div>
                                            
                        <div class="col blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12" id="giorno-titolo-8">
                                    
                                </div>
                            </div>
                                <div id="giorno-8">
                                
                            </div>
                            
                        </div>
                                             
                        <div class="col blocco-settimana" >
                            <div class="row" id="giorno-settimana">
                                <div class="col-12" id="giorno-titolo-9">
                                    
                                </div>
                            </div>
                                <div id="giorno-9">
                                
                            </div>
                            
                        </div>
                                            
                        <div class="col blocco-settimana">
                            <div class="row" id="giorno-settimana">
                                <div class="col-12" id="giorno-titolo-10">
                                    
                                </div>
                            </div>
                                <div id="giorno-10">
                                
                            </div>
                            
                        </div>
                                              
                 
                    </div>
                    
                  
                    
                    
         
                </div>
           
        </div>
            
        <!-- BARRA INFO -->
        <div class="row barra-info">
            <div class="col-3">
            <div class="row meteo">    
                    <div><img class="weather " id="img-meteo"></div>
                    <div class="gradi" id="gradi">17°</div>
                </div>
            </div>
            <div class="col-6 text-center flip-vertical-left">
                    <div class="line-1 align-middle align-self-center m-auto" id="messaggio-benv">Benvenuti in Gruppo Sinergia</div>
            </div>
            <div class="col-3">
                <div class="row legenda">    
                    <div><img src="/img/rounded-black-square-orange">Sala Riunioni</div>
                    <div><img src="/img/rounded-black-square-blue">Saletta Riunioni</div>
                </div>
            </div>
            
        </div>

    </div>

<script
  src="https://code.jquery.com/jquery-3.4.1.js"
  integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
  crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script type="text/javascript" src="js/weather.js"></script>
<script type="text/javascript" src="js/calendar.js"></script>
    
<script async defer src="https://apis.google.com/js/api.js" onload="this.onload=function(){};handleClientLoad()" onreadystatechange="if (this.readyState === 'complete') this.onload()"></script>

</body>
</html>
