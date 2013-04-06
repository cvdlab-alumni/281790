# Exercise01
# Define, with names pillars0, pillars1, pillars2, and pillars3, the models of pillars of the 4 house floors, 
# and put them into the STRUCT of an initial building model.

# PILLARS

# pillar
pillar = CUBOID([0.25,0.25,2.5])

# cylindrical pillar
cyl_pill_surface = CIRCLE(0.125)([32,1])
cyl_pill_3D = PROD([cyl_pill_surface, Q(2.5)])


# PILLARS0
center_tensor = T([1,2])([-0.125,-0.125])

# pillars rows
p0_first_row = STRUCT(NN(5)([cyl_pill_3D, T([1])([2.5])]))
p0_second_row = STRUCT([cyl_pill_3D, T([1,2])([2.375,-0.125])(STRUCT(NN(3)([pillar, T([1])([2.5])])))])

pillars0 = STRUCT([p0_first_row, T([2])([5.5])(p0_second_row)])

# PILLARS1

p1_first_row_nont = STRUCT(NN(5)([pillar, T([1])([2.5])]))
p1_first_row = center_tensor(p1_first_row_nont)

p1_second_row_partial = STRUCT(NN(3)([pillar, T([1])([2.5])]))
p1_second_row_nont = STRUCT([p1_second_row_partial, T([1])([2.5*4])(pillar)])
p1_second_row = STRUCT([center_tensor(p1_second_row_nont), T([1])([2.5*3])(cyl_pill_3D)])

pillars1 = STRUCT([p1_first_row, T([2])([5.5])(p1_second_row)])

# PILLARS2

p2_first_row_nont = STRUCT([pillar, T([1])([2.5])(pillar), T([1])([2.5*2])(pillar), T([1])([2.5*4])(pillar)])
p2_first_row = center_tensor(p2_first_row_nont)

p2_second_row_nont = STRUCT(NN(5)([pillar, T([1])([2.5])]))
p2_second_row = center_tensor(p2_second_row_nont)

pillars2 = STRUCT([p2_first_row, T([2])([5.5])(p2_second_row)])


# PILLARS3

p3_first_row_row_nont = STRUCT([T([1])([2.5*2])(pillar), T([1])([2.5*4])(pillar)])
p3_first_row = center_tensor(p3_first_row_row_nont)

p3_second_row_nont = STRUCT(NN(5)([pillar, T([1])([2.5])]))
p3_second_row = center_tensor(p3_second_row_nont)

pillars3 = STRUCT([p3_first_row, T([2])([5.5])(p3_second_row)])


# first building structure, considering attic depth 0.3

building = STRUCT([pillars0, T([3])([2.5+0.3])(pillars1), T([3])([(2.5+0.3)*2])(pillars2), T([3])([(2.5+0.3)*3])(pillars3)])


VIEW(building)
