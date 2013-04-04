# Exercise 040313

# MAISON DOMINO

#_______________________________________________STRUTTURA DI BASE____________________________________________________________#

foundations = INSR(PROD)(AA(QUOTE)([[8, -30, 8, -30, 8, -12, 8], [8, -30, 8], [6]]))

#passiamo ai pilastri
pillars = INSR(PROD)(AA(QUOTE)([[-3, 2, -36, 2, -36, 2, -18, 2], [-3, 2, -36, 2], [-7.4, 23.6, 1.4, 23.6, 1.4]]))

building = STRUCT([foundations,pillars])

#solaio lezione
#horiz_partitions = INSR(PROD)(AA(QUOTE)([[-1,2, 2, 36, 2, 36, 2, 18, 2,2], [9, 2, 36, 2, 9], [-6, 1.4, -23.6, 1.4, -23.6, 1.4]]))
#nota con queste cose dovrebbe venire tutto spostato nell'origine, sistemeremo. Devo traslare sulle y di -6
# building = STRUCT([foundations,pillars, T([2])([-6])(horiz_partitions)])

#solaio alternativo
horiz_partitions_alt = INSR(PROD)(AA(QUOTE)([[-1,2, 2, 36, 2, 36, 2], [9, 2, 36, 2, 9], [-6, 1.4, -23.6, 1.4, -23.6, 1.4]]))
building = STRUCT([foundations,pillars, T([2])([-6])(horiz_partitions_alt)])

hor_plus = MKPOL([ [[0,0],[18,0],[18,6], [25,6], [25,23],[0,23],[0,0]], [[1,2,3,6,7],[3,4,5,6,3]], None  ])
hor_plus3D = PROD([hor_plus, Q(1.4)])
horiz_partitions0 = STRUCT([horiz_partitions_alt,T([1,3])([-1+2+2+36+2+36+2, 6])(hor_plus3D), T([1,3])([-1+2+2+36+2+36+2, 31])(hor_plus3D), T([1,3])([-1+2+2+36+2+36+2, 56])(hor_plus3D)])

back_floor = CUBOID([25,11,1.4])

horiz_partitions = STRUCT([horiz_partitions0, T([1,2,3])([-1+2+2+36+2+36+2, 9+2+36, 6])(back_floor), T([1,2,3])([-1+2+2+36+2+36+2, 9+2+36, 31])(back_floor), T([1,2,3])([-1+2+2+36+2+36+2, 9+2+36, 56])(back_floor)])

#__________________________________________________________________________________________________________________________#


#_______________________________________________________________SCALE______________________________________________________#

#gradino
step2D = MKPOL([ [[0,0],[0, 2.65], [2.66, 1.25], [2.66, 2.65] ], [[1,2,3,4]], None ])
step3D =MAP([S1,S3,S2])(PROD([step2D,Q(9)]))

#rampa
ramp = STRUCT(NN(10)([step3D, T([1,3])([2.66,1.25])]))

#posiziono la prima rampa
ramp1 = T([1,2,3])([3+2+36+2+36+2+18, 3+2+12,6])(R([1,2])(PI/2)(ramp))

#primo patio scale, creo nell'origine e poi traslo
patio = CUBOID([18,9,2.65])
patio1 = T([1,2,3])([3+2+36+2+36+2, 3+2+36+2, 6+1.4+11.8-1.25])(patio)

#seconda rampa
ramp2 = T([1,2,3])([3+2+36+2+36+2, 3+2+36+2, 6+1.4+11.8-1.25])(R([1,2])(-PI/2)(ramp))

#scala primo piano
stairs1 = STRUCT([ramp1, patio1, ramp2])

#scala secondo piano
stairs2 = STRUCT([stairs1, T(3)(25)(stairs1)])

#_________________________________________________________________________________________________________________________#

#_____________________________________________________STRUTTURA COMPLETA__________________________________________________#

building = STRUCT([foundations,pillars, T([2])([-6])(horiz_partitions), stairs1, stairs2])
