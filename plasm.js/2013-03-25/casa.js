	//Esercizio modello casa

	//______________________________________ STRUTTURA PRINCIPALE________________________________________________//

	//creo un disegno 2D di una casetta
	var points = [[0,0],[6,0],[0,6],[6,6],[3,9]];
	var cells  = [[0,1,2],[1,3,2],[2,3,4]];
	var home2D = SIMPLICIAL_COMPLEX(points)(cells);

	//con la funzione EXTRUDE porto la casa in 3D
	var home3D = EXTRUDE([10])(home2D);

	//coloro 
	var colHome3D = COLOR([0.7, 0.8, 0])(home3D);


	//________________________________________________________TETTO____________________________________________//

	//creo il disegno 2D del tetto
	var r_points = [ [-0.5,0] , [0,0] , [3,3] , [6,0] , [6.5,0] , [3,3.5] , [-0.5,0]];
	var r_cells = [[0,1,2,5], [2,3,4,5]];
	var roof2D = SIMPLICIAL_COMPLEX(r_points)(r_cells);

	//estrudo per portarlo in 3d
	var roof3D = EXTRUDE([11])(roof2D);

	//coloro
	var colroof3D = COLOR([0.9, 0.2, 0])(roof3D);

	//traslo sull'asse z di -	0.5, e sull'asse y di 6 (altezza casa)
	var r_transl = T([1,2])([6,-0.5])(colroof3D);

	//creo struttura casa/tetto
	var home0 = STRUCT([colHome3D,r_transl]);
	//________________________________________________________________________________________________________//


	//_____________________________________ ENTRATA __________________________________________________________//

	//PORTA 

	//definisco la porta come un cuboid nell'origine che poi traslerò adeguatamente
	var door = CUBOID([1,2,0.2]);
	//coloro
	var coldoor = COLOR([0.9,0.5,0.2])(door);
	//traslo
	var t_door = T([0,2])([2.5,-0.2])(coldoor);


	//stipite
	var st_points = [ [2.3,0], [2.5,0], [2.5,2], [3.5,2], [3.5,0], [3.7,0], [3.7,2.3], [2.3,2.3], [2.3,0] ];
	var st_cells  = [ [0,1,2,7], [2,3,6,7], [3,4,5,6]];
	var st_2D = SIMPLICIAL_COMPLEX(st_points)(st_cells);
	var st_3D = EXTRUDE([0.3])(st_2D);
	var st_transl = T([2])([-0.3])(st_3D);

	//timpano
	//definisco prima un "mezzo timpano", poi ruoterò sull'opportuno asse e strutturerò i due mezzi elementi

	var semitimp_points = [	[2.3,2.3], [3,2.3], [3,2.5], [2.7,2.5], [3,2.9], [3,3.3], [2.3,2.3] ];
	var semitimp_cells = [[0,1,2,3], [3,4,5,0]];
	var semitimp_2D = SIMPLICIAL_COMPLEX(semitimp_points)(semitimp_cells);
	var semitimp_3D = EXTRUDE([0.3])(semitimp_2D);

	//ruoto il semitimpano
	var rotation = R([0,2])(PI);

	//strutturo il semitimpano con quello "specchiato" (opportunamente traslato)
	var timp3D = STRUCT([semitimp_3D, T([0])([6])(rotation(T([2])([-0.3])(semitimp_3D)))]);
	//traslo sulle z
	var timp_transl = T([2])([-0.3])(timp3D);

	//Strutturo porta/stipite/timpano
	var entrance = STRUCT([t_door, st_transl, timp_transl]);

	//strutturo casa + entrata
	var home1 = STRUCT([home0, entrance]);

	//______________________________________________________________________________________________________________//


	//_______________________________ FINESTRE ____________________________________________________________________//

	//creo una struttura finestra che poi riposizionerò varie volte attraverso opportune traslazioni

	var base_finestra = CUBOID([1,1,0.1]);
	var colbase_finestra = COLOR([0.9,0.5,0.2])(base_finestra);
	var vetro = COLOR([0.1,0.7,1])(CUBOID([0.8, 0.8, 0.01]));
	var finestra = STRUCT([colbase_finestra, T([0,1,2])([0.1,0.1,-0.01])(vetro)]);

	//finestre facciata
	var fin1 = T([0,1,2])([1,4,-0.1])(finestra)
	var fin2 = T([0,1,2])([4,4,-0.1])(finestra)
	var fin_facc = STRUCT([fin1, fin2]);

	// finestre lati
	//creo la fila di finestre nell'origine
	var fin_row = STRUCT(REPLICA(3)([finestra, T([0])([3])]));

	//fila dx finestre
	// traslo 
	var t_fin_row = T([0,1,2])([-8.5,4, -0.1])(fin_row);
	//ruoto
	var rt_fin_row = R([0,2])([PI/2])(t_fin_row);

	//fila sx finestre
	//prima ribalto la fila nell'origine e poi traslo
	r = R([0,2])([-PI/2])(fin_row);
	t = T([0])([6.1])(r)

	//traslo per ottenere la fila di sx opportunamente posizionata
	var lt_fin_row = T([1,2])([4,1.5])(t);

	//STRUTTURA COMPLETA
	var home2 = STRUCT([home1, fin_facc,rt_fin_row, lt_fin_row]);

	DRAW(home2);