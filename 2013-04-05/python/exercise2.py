# Exercise02
# Define plan by plan, with names floor0, floor1, floor2, floor3, and floor4, the 5 models of horizontal partitions,
# and add them to the STRUCT of the building model.


# FLOOR0
floor0_nont = T([3])([-0.3])(CUBOID([10.25,7,0.3]))
floor0 = center_tensor(floor0_nont)

# FLOOR1
floor1_0 = CUBOID([10.25,2,0.3])
floor1_1 = GRID([[4.4,-1.65,4.2],[2,-1.75],[0.3]])
floor1_2 = CUBOID([10.25,2,0.3])
floor1_3 = GRID([[1.3,-4.75,4.2],[1],[0.3]])
floor1_4 = CUBOID([10.25,0.25,0.3])
floor1_5 = CUBOID([1.2,1,0.3])

floor1_nont = STRUCT([floor1_0, T([2])([2])(floor1_1), T([2])([2+1.75])(floor1_2), T([2])([2+1.75+2])(floor1_3), T([2])([2+1.75+2+1])(floor1_4), T([1,2])([-1.2, 2+1.75+2])(floor1_5)])
floor1 = center_tensor(floor1_nont)


# FLOOR2
floor2_0 = GRID([[-5.75,4.5],[5.75],[0.3]])
floor2_1 = GRID([[-1.3,-4.75,4.2],[1],[0.3]])
floor2_2 = CUBOID([10.25,0.25,0.3])
floor2_3 = CUBOID([5.75,0.25,0.3])
floor2_4 = GRID([[-0.6,4.4,-0.7,2.9],[-5.7,0.05],[0.3]])
floor2_5_2D = MKPOL([ [[0,0],[-0.8,5.75],[0,5.75]],[[1,2,3]],None])
floor2_5 = PROD([floor2_5_2D, Q(0.3)])


floor2_nont = STRUCT([floor2_0, T([2])([5.75])(floor2_1), T([2])([5.75+1])(floor2_2), floor2_3,floor2_4, T([1])([5.75])(floor2_5)])
floor2 = center_tensor(floor2_nont)


# FLOO3
floor3_0 = GRID([[-5,5.25],[5.75],[0.3]])
floor3_1 = GRID([[-5,0.25,-3.0,2],[1],[0.3]])
floor3_2 = GRID([[0.25,-2.25,0.25],[-5.5,0.25],[0.3]])
floor3_3 = CUBOID([5.25,0.25,0.3])
floor3_4 = CUBOID([5,0.125,0.3])
floor3_5 = CUBOID([5,0.25,0.3])

floor3_nont = STRUCT([floor3_0, T([2])([5.75])(floor3_1), floor3_2, T([1,2])([5,5.75+1])(floor3_3), T([2])([5.75+1.125])(floor3_4),floor3_5])
floor3 = center_tensor(floor3_nont)

#FLOOR4
floor4_0 = GRID([[-5,5.25],[5.75],[0.3]])
floor4_1 = GRID([[10.25],[1.5],[0.3]])

floor4_nont = STRUCT([floor4_0, T([2])([5.5])(floor4_1)])
floor4 = center_tensor(floor4_nont)


floors = STRUCT([floor0, T([3])([2.5])(floor1), T([3])([5])(floor2), T([3])([7.5])(floor3), T([3])([10])(floor4)])

# fix pillars translation
building = STRUCT([pillars0, T([3])([2.5+0.3])(pillars1), T([3])([2.5*2])(pillars2), T([3])([2.5*3])(pillars3)])

# second structure of the building
building = STRUCT([building,floors])

VIEW(building)

