#Assignment 260313

#definizione casa 2D
def House2D():
	wall = MKPOL([ [[0,0],[8,0],[0,6],[8,6],[4,8]], [[1,2,3,4,5]], None	])
	door = CUBOID([2,4])
	window = CUBOID([1,2])
	return STRUCT([wall, T([1])([2])(door), T([1,2])([5,2])(window)])

h = House2D()


#fila di tre case
def triplet(x):
	transl = T([1])([12])
	return STRUCT([x, transl(x),transl(transl(x))])

t = triplet(h)

#alberi
def Leaves(r):
	return CIRCLE(r)([18,1])

def MyTree(h):
	return STRUCT([ T([1])([-h/24])(CUBOID([h/9,2*h/3])), T([2])([2*h/3])(Leaves(h/3)) ])

def Trees():
	return STRUCT([ MyTree(9), T([1])([2])(MyTree(11)) ])

def HouseTrees():
	return STRUCT([ House2D(), T([1])([-0.75])(Trees()) ])

t = triplet(HouseTrees())


#reflection
def Mirror(dimension,x):
	return STRUCT([S([dimension])([-1])(x)])

def HouseTreesMirror():
	return STRUCT([HouseTrees(), Mirror(1,HouseTrees())])

t = triplet(HouseTreesMirror())


#CarModel

def car():
 	verts = [[0,0],[3,0],[7,0],[6,2],[4,2],[3,1],[1,1]]
	cells = [[1,2,6,7],[2,3,4,5,6]]
	pols  = [[1,2]]
	body  = MKPOL([verts, cells, pols])
	wheel = S([1,2])([0.5,0.5])(CIRCLE(1)([18,1]))
	return T([2])([0.5])(STRUCT([body, T([1])([1.5])(wheel), T([1])([6])(wheel)]))

#fila di auto
def carQueue(n):
	return STRUCT(NN(n)([car(), T([1])([1.2 * SIZE(1)(car())])]))

cq = carQueue(2)

def rotatedCarQueue(n,degrees):
	alpha = degrees * PI/180
	x = (SIZE(1)(carQueue(n))) * (COS(alpha))
	y = (SIZE(1)(carQueue(n))) * (SIN(alpha))
	basis = MKPOL([[[0,0],[x,0],[x,y]],[[1,2,3]],[[1]]])
	return STRUCT([ basis, R([1,2])(alpha)(carQueue(n)) ])

rcq = rotatedCarQueue(5,8)

#Scena 2d

def InclinedTriple(degrees, ogg):
	x = SIZE(1)(ogg)
	transf = T([1,2])([x, x * TAN((PI*degrees/180))])
	return STRUCT([ogg, transf(ogg), transf(transf(ogg))])

scene = STRUCT([InclinedTriple(8, HouseTreesMirror()), rotatedCarQueue(5,8)	])

#Visualizziamo lo scheletro della scena2d

VIEW(SKELETON(1)(scene))