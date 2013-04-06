
# EXERCISE3
# Define, with names north, south, east, and west, the 4 models of vertical enclosures (including the hollows), 
# and add them to the STRUCT of the building model.


# using GRID
GRID = COMP([INSR(PROD),AA(QUOTE)])

center_tensor = T([1,2])([-0.125,-0.125])


# useful structures
x_tr = CUBOID([10.25,0.3,0.25])
y_tr = CUBOID([7.0,0.3,0.25])

#EAST
#floor0
f0_east_wall_0 = GRID([[-1.8,1.9,0.55,6],[1.8],[0.25]])
f0_east_wall_1 = GRID([[-1.8,1.9,-0.55,6],[-1.8,0.55],[0.25]])
f0_east_wall_2 = GRID([[-1.8,1.9,0.55,6],[-1.8,-0.55,0.15],[0.25]])
f0_east_wall = STRUCT([f0_east_wall_0,f0_east_wall_1, f0_east_wall_2])

#floor1
f1_east_wall_0 = GRID([[10.25],[-2.5,-0.3,1],[0.25]])
f1_east_wall_1 = GRID([[2.6,-2.6,5.05],[-2.5,-0.3,-1,1],[0.25]])
f1_east_wall_2 = GRID([[10.25],[-2.5,-0.3,-1,-1,0.5],[0.25]])
f1_east_wall = STRUCT([f1_east_wall_0,f1_east_wall_1, f1_east_wall_2])

#floor2
f2_east_wall_0 = GRID([[10.25],[-2.5,-0.3,-2.5,0.6],[0.25]])
f2_east_wall_1 = GRID([[1.5,-0.125,0.55,-0.125, 7.95],[-2.5,-0.3,-2.5,-0.6,1],[0.25]])
f2_east_wall_2 = GRID([[10.25],[-2.5,-0.3,-2.5,-0.6,-1,0.9],[0.25]])
f2_east_wall = STRUCT([f2_east_wall_0,f2_east_wall_1, f2_east_wall_2])

#floor3
f3_east_wall = GRID([[10.25],[-2.5,-0.3,-2.5,-2.5,2.5],[0.25]])

east_wall = STRUCT([f0_east_wall, f1_east_wall, f2_east_wall, f3_east_wall])

#posizione east_wall
ew_r0 = R([1,3])(PI)(east_wall)
ew_r1 = R([2,3])(PI/2)(ew_r0)
ew_r = center_tensor(ew_r1)

#positioned east wall
positioned_east_wall = T([1,2])([10.25,6.75])(ew_r)


#WEST

#floor1

f1_west_wall_0 = GRID([[10.25],[-2.5,-0.3,0.75],[0.25]])
f1_west_wall_1 = GRID([[10.25],[-2.5,-0.3,-0.75,0.37],[0.25]])
f1_west_wall_2 = GRID([[6.2,-2.6,1.45],[-2.5,-0.3,-0.75,-0.37,1],[0.25]])
f1_west_wall_3 = GRID([[10.25],[-2.5,-0.3,-0.75,-0.37,-1,0.38],[0.25]])

f1_west_wall = STRUCT([f1_west_wall_0,f1_west_wall_1, f1_west_wall_2, f1_west_wall_3, T([2])([5.3])(x_tr)])


#floor2
f2_west_wall_0 = GRID([[10.25],[-2.5,-0.3,-2.5,-0.3,0.6],[0.25]])
f2_west_wall_1 = GRID([[6.2,-2.6,1.45],[-2.5,-0.3,-2.5,-0.3,-0.6,1],[0.25]])
f2_west_wall_2 = GRID([[10.25],[-2.5,-0.3,-2.5,-0.3,-0.6,-1,0.9],[0.25]])

f2_west_wall = STRUCT([f2_west_wall_0,f2_west_wall_1, f2_west_wall_2])


#floor3
f3_west_wall_0 = GRID([[10.25],[-2.5,-0.3,-2.5,-0.3,-2.5,-0.3,0.15],[0.25]])
f3_west_wall_1 = GRID([[0.125,-5.8,0.4,-2.6,1.325],[-2.5,-0.3,-2.5,-0.3,-2.5,-0.3,-0.15,1],[0.25]])
f3_west_wall_2 = GRID([[10.25],[-2.5,-0.3,-2.5,-0.3,-2.5,-0.13,-1,1.05],[0.25]])

f3_west_wall = STRUCT([f3_west_wall_0,f3_west_wall_1, f3_west_wall_2, T([2])([8.1])(x_tr)])

#complete west wall
west_wall = STRUCT([f1_west_wall,f2_west_wall,f3_west_wall])

# positioning west wall
ww_r = R([2,3])(PI/2)(west_wall)
ww_rt = center_tensor(ww_r)
# positioned wall
positioned_west_wall = T([2])([0.25])(ww_rt)


#NORTH

#floor1

f1_north_wall_0 = GRID([[0.3,5.2,1.1,-0.2,0.2],[-2.5,-0.3,1.3],[0.25]])
f1_north_wall_1 = GRID([[0.3,-5.2,1.1,-0.2,0.2],[-2.5,-0.3,-1.3,1],[0.25]])
f1_north_wall_2 = GRID([[0.3,5.2,1.1,-0.2,0.2],[-2.5,-0.3,-1.3-1,0.2],[0.25]])

f1_north_wall = STRUCT([f1_north_wall_0,f1_north_wall_1, f1_north_wall_2])


#floor2

f2_north_wall_0 = GRID([[0.3,5.2,1.1,-0.2,0.2],[-2.5,-0.3,-2.5,-0.3,1.3],[0.25]])
f2_north_wall_1 = GRID([[0.3,-5.2,1.1,-0.2,0.2],[-2.5,-0.3,-2.5,-0.3,-1.3,1],[0.25]])
f2_north_wall_2 = GRID([[0.3,5.2,1.1,-0.2,0.2],[-2.5,-0.3,-2.5,-0.3,-1.3-1,0.2],[0.25]])

f2_north_wall = STRUCT([f2_north_wall_0,f2_north_wall_1, f2_north_wall_2])


#floor3

f3_north_wall_0 = GRID([[0.3,5.2,1.1,-0.2,0.2],[-2.5,-0.3,-2.5,-0.3,-2.5,1.3],[0.25]])
f3_north_wall_1 = GRID([[0.3,-5.2,1.1,-0.2,0.2],[-2.5,-0.3,-2.5,-0.3,-2.5,-1.3,1],[0.25]])
f3_north_wall_2 = GRID([[0.3,5.2,1.1,-0.2,0.2],[-2.5,-0.3,-2.5,-0.3,-2.5,-1.3-1,0.2],[0.25]])

f3_north_wall = STRUCT([f3_north_wall_0,f3_north_wall_1, f3_north_wall_2])
north_wall = STRUCT([f1_north_wall,f2_north_wall,f3_north_wall])

#positioning north wall

nw_r1 = R([2,3])(PI/2)(north_wall)
nw_r2 = R([1,2])(PI/2)(nw_r1)
nw_t1 = T([1,3])([10,-0.3])(nw_r2)
positioned_north_wall = center_tensor(nw_t1)


#SOUTH

#floor1

f1_south_wall_0 = GRID([[0.3,-1,0.2,-5.2,0.3],[-2.5,-0.3,2],[0.25]])
f1_south_wall_1 = GRID([[7],[-2.5,-0.3,-2,0.5],[0.25]])

f1_south_wall = STRUCT([f1_south_wall_0,f1_south_wall_1,])


#floor2

f2_south_wall_0 = GRID([[0.3,-1,0.2,-5.2,0.3],[-2.5,-0.3,-2.5,2.5],[0.25]])
f2_south_wall_1 = GRID([[7],[-2.5,-0.3,-2.5,-2,1.25],[0.25]])
f2_south_wall = STRUCT([f2_south_wall_0,f2_south_wall_1,])

#floor3
f3_south_wall_0 = GRID([[7],[-2.5,-0.3,-2.5,-0.3,-2.5,-0.3,0.15],[0.25]])
f3_south_wall_1 = GRID([[0.125,-1.25,0.125,-5.2,0.3],[-2.5,-0.3,-2.5,-0.3,-2.5,-0.3,-0.15,1],[0.25]])
f3_south_wall_2 = GRID([[7],[-2.5,-0.3,-2.5,-0.3,-2.5,-0.3,-0.15,-1,0.75],[0.25]])
f3_south_wall = STRUCT([f3_south_wall_0,f3_south_wall_1, f3_south_wall_2])

#complete south wall
south_wall = STRUCT([f1_south_wall,f2_south_wall,f3_south_wall])

#south positioning
sw_r1 = R([2,3])(PI/2)(south_wall)
sw_r2 = R([1,2])(PI/2)(sw_r1)
#correct positioning south wall
positioned_south_wall = center_tensor(sw_r2)



#building the structure of exercise2
building = STRUCT([building,positioned_west_wall,positioned_east_wall, positioned_north_wall, positioned_south_wall])
VIEW(building)
