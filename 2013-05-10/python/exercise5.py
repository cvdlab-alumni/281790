# exercise5.py
# Create at least two interesting car surfaces and add them to the mock-up.

###############################################

from pyplasm import *
import scipy   
from scipy import *

#####################IMPORTING EXERCISE 2/3/4

# exercise 2.py


#Generate the 2D profile curves of the car envelope in the three coordinate directions, 
#embed them in 3D (in the x=0, y=0 and z=0 planes, respectively, with the reference frame origin set 
#approximately at the car centroid) and mount them together in a "two-and-a-half-dimensional" (2.5D) or "pseudo-3D" model.

from pyplasm import *

domain = INTERVALS(1)(20)

#profile with y=0

def profile_xz():
    #control points
    #down
    fp0 = [[0.06*2,0,1.4],[0.06*2,0,0.9],[0.08*2,0,0.6],[0.11*2,0,0.3]]
    fp1 = [[0.11*2,0,0.3],[0.17*2,0,0.25],[0.5*2,0,0.16],[0.9*2,0,0.08]]
    #ruota anteriore
    fp2 = [[0.9*2,0,0.08],[0.8*2,0,0.8],[1*2,0,1.7],[1.2*2,0,2.1],[1.6*2,0,1.9],[1.8*2,0,1.5],[1.8*2,0,0]]
    fp10 = [[3.6,0,0],[7,0,0]]
    #ruota posteriore
    # fp11 = [[7.6,0,0],[0.8*2,0,0.8],[1*2,0,1.7],[1.2*2,0,2.1],[1.6*2,0,1.9],[1.8*2,0,1.5],[1.8*2,0,0]]
    #up
    fp3 = [[0.06*2,0,1.4],[0.45*2,0,2],[0.95*2,0,2.4],[1.4*2,0,2.6],[1.5*2,0,2.7],[1.7*2,0,2.6]]
    fp4 = [[3.4,0,2.6],[3.8,0,2.7],[4.2,0,3.3],[4.8,0,3.6],[4.7,0,3.8]]
    fp5 = [[4.7,0,3.8],[5.4,0,4],[6.1,0,4],[7,0,3.9]]
    fp6 = [[7,0,3.9],[7.1,0,3.7]]
    fp7 = [[7.1,0,3.7],[8.5,0,3.2],[9.2,0,2.9],[9.6,0,3],[10.1,0,3.1]]
    fp8 = [[10.1,0,3.1],[10,0,2.3],[10.2,0,2],[10.4,0,2]]
    fp9 = [[10.4,0,2],[10.2,0,1]]
    fp12 = [[10.2,0,1],[9.6,0,0.6],[9.3,0,0.3],[8.8,0,0]]

    #BEZIER CURVES
    fb0 = BEZIER(S1)(fp0)
    fb1 = BEZIER(S1)(fp1)
    fb2 = BEZIER(S1)(fp2)
    fb3 = BEZIER(S1)(fp3)
    fb4 = BEZIER(S1)(fp4)
    fb5 = BEZIER(S1)(fp5)
    fb6 = BEZIER(S1)(fp6)
    fb7 = BEZIER(S1)(fp7)
    fb8 = BEZIER(S1)(fp8)
    fb9 = BEZIER(S1)(fp9)
    fb10 = BEZIER(S1)(fp10)
    fb12 = BEZIER(S1)(fp12)

    # MAPPING
    fc0 = MAP(fb0)(domain)
    fc1 = MAP(fb1)(domain)
    fc2 = MAP(fb2)(domain)
    fc3 = MAP(fb3)(domain)
    fc4 = MAP(fb4)(domain)
    fc5 = MAP(fb5)(domain)
    fc6 = MAP(fb6)(domain)
    fc7 = MAP(fb7)(domain)
    fc8 = MAP(fb8)(domain)
    fc9 = MAP(fb9)(domain)
    fc10 = MAP(fb10)(domain)
    fc11 = T([1,3])([7-1.8,-0.08])(fc2)
    fc12 = MAP(fb12)(domain)
    # structuring
    side0 = STRUCT([fc0,fc1,fc2,fc3,fc4,fc5,fc6,fc7,fc8,fc9,fc10,fc12,fc11])
    side = STRUCT([side0, T([2])([5])(side0)])
    return side


# VIEW(profile_xz())


#profile with x=0

def profile_yz():
    #generic control points
    p0 = [[0,0.7,0.07],[0,1.06,0.14],[0,1.57,0.16],[0,2.1,0.25]]
    p1 = [[0,2.1,0.25],[0,2.64,0.27]]
    p2 = [[0,0.7,0.07],[0,0.55,0.26],[0,0.51,1],[0,0.45,1.42],[0,0.61,1.5]]
    p3 = [[0,0.61,1.5],[0,0.83,1.6],[0,1.07,2],[0,1.2,2.3]]
    p4 = [[0,1.2,2.3], [0,1.47,2.4],[0,1.9,2.4],[0,2.3,2.5],[0,2.6,2.5]]

    # FRONT control points
    # values for cubic HERMITE
    fp0 = [[0,0.86,1.4],[0,1.6,1.15],[0,0.8,1],[0,0.3,-0.8]]
    # fp0 = [[0,0.86,1.6],[0,1.2,1.5],[0,1.36,1.39],[0,1.6,1.15]]
    

    fp1 = [[0,2.64,1.6],[0,1,1.6]]
    fp2 = [[0,1,1.6],[0,1,1.9],[0,1.2,2.1],[0,1.4,2.3]]
    fp3 = [[0,1.4,2.3],[0,2.1,2.3],[0,2.64,2.3]]

    #faro
    fp4 = [[0,0.7,1.3],[0,0.9,1.37],[0,1.1,1.3],[0,1.2,1.1],[0,1.2,1]]
    fp5 = [[0,1.2,1],[0,0.9,1],[0,0.7,1.2],[0,0.7,1.3]]

    #presa d'aria
    fp6 = [[0,0.8,0.5],[0,1,0.7],[0,1.5,0.7],[0,1.9,0.6],[0,2,0.4]]
    fp7 = [[0,2,0.4],[0,1.8,0.3],[0,1.1,0.3],[0,0.9,0.4],[0,0.8,0.5]]


    # RETRO control points
    rp0 = [[0,2.5,2.64],[0,1.4,2.4]]
    rp1 = [[0,1.4,2.4],[0,1.2,2.1],[0,1.5,1.8],[0,1.7,1.9]]
    rp2 = [[0,2.64,1.9],[0,1.8,1.9],[0,1.3,1.8],[0,0.7,1.7]]
    rp3 = [[0,0.7,1.7],[0,0.5,1.6],[0,0.6,1.2]]
    rp4 = [[0,0.4,1.6],[0,0.5,2],[0,0.8,2],[0,1.4,1.8]]


    # generic bezier curves
    b0 = BEZIER(S1)(p0)
    b1 = BEZIER(S1)(p1)
    b2 = BEZIER(S1)(p2)
    b3 = BEZIER(S1)(p3)
    b4 = BEZIER(S1)(p4)

    #front  curves
    fb0 = CUBICHERMITE(S1)(fp0)
    
    fb1 = BEZIER(S1)(fp1)
    fb2 = BEZIER(S1)(fp2)
    fb3 = BEZIER(S1)(fp3)
    fb4 = BEZIER(S1)(fp4)
    fb5 = BEZIER(S1)(fp5)
    fb6 = BEZIER(S1)(fp6)
    fb7 = BEZIER(S1)(fp7)

    #retro curves
    rb0 = BEZIER(S1)(rp0)
    rb1 = BEZIER(S1)(rp1)
    rb2 = BEZIER(S1)(rp2)
    rb3 = BEZIER(S1)(rp3)
    rb4 = BEZIER(S1)(rp4)

    # generic MAPPINGS
    c0 = MAP(b0)(domain)
    c1 = MAP(b1)(domain)
    c2 = MAP(b2)(domain)
    c3 = MAP(b3)(domain)
    c4 = MAP(b4)(domain)

    #front mappings
    fc0 = MAP(fb0)(domain)
    fc1 = MAP(fb1)(domain)
    fc2 = MAP(fb2)(domain)
    fc3 = MAP(fb3)(domain)
    fc4 = MAP(fb4)(domain)
    fc5 = MAP(fb5)(domain)
    fc6 = MAP(fb6)(domain)
    fc7 = MAP(fb7)(domain)

    #retro mappings
    rc0 = MAP(rb0)(domain)
    rc1 = MAP(rb1)(domain)
    rc2 = MAP(rb2)(domain)
    rc3 = MAP(rb3)(domain)
    rc4 = MAP(rb4)(domain)


    # generic structuring
    faro = T([2,3])([0.2,-0.1])(STRUCT([fc4,fc5]))
    front = STRUCT([fc0,fc1,fc2,fc3,fc6,fc7,faro])
    
    retro = STRUCT([rc0,rc1,rc2,rc3,rc4])
    
    g0 = STRUCT([c0,c1,c2,c3,c4,front])
    gr = STRUCT([c0,c1,c2,c3,c4,retro])

    # r_t front
    g1 = R([1,2])(PI)(g0)
    t_g1 = T([2])([5.2])(g1)
    
    #r_t retro
    g2 = R([1,2])(PI)(gr)
    t_g2 = T([2])([5.2])(g2)
    
    gen_f = STRUCT([g0,t_g1])
    gen_r = STRUCT([gr,t_g2])
    gen = STRUCT([gen_f,T([1])([10.8])(gen_r)])

    return gen


# VIEW(profile_yz())


# profile xy (z=0)

def profile_xy():

    # generic contro points

    p0 = [[0,2.1,0],[0.1,1.4,0],[0.5,0.4,0],[0.9,0.2,0],[1.8,0,0]]
    p1 = [[1.8,0,0],[9.1,0,0]]
    p2 = [[9.1,0,0],[10,0.2,0],[10.3,0.7,0],[10.5,2.1,0]]

    # generic curves

    b0 = BEZIER(S1)(p0)
    b1 = BEZIER(S1)(p1)
    b2 = BEZIER(S1)(p2)

    # generic mapping

    c0 = MAP(b0)(domain)
    c1 = MAP(b1)(domain)
    c2 = MAP(b2)(domain)

    # generic structuring

    gen0 = STRUCT([c0,c1,c2])
    gen1 = STRUCT([gen0, T([2])([4.2])(R([2,3])(PI)(gen0))])


    # up control points

    up0 = [[0.38,2.1,0],[0.5,1.4,0],[1,1,0],[3,0.7,0]]
    up1 = [[2.8,2.1,0],[3,0.7,0],[3.5,0.5,0]]
    up2 = [[3.5,0.5,0],[4.7,0.8,0],[4.7,1.4,0],[4.7,2.1,0]]
    up3 = [[7,2.1,0],[6.9,1,0]]
    up4 = [[6.9,1,0], [7.5,0.8,0],[9,0.9,0],[10,1.1,0]]
    up5 = [[10,1.1,0], [10,2.1,0]]

    # up curves

    ub0 = BEZIER(S1)(up0)
    ub1 = BEZIER(S1)(up1)
    ub2 = BEZIER(S1)(up2)
    ub3 = BEZIER(S1)(up3)
    ub4 = BEZIER(S1)(up4)
    ub5 = BEZIER(S1)(up5)

    # up mapping

    uc0 = MAP(ub0)(domain)
    uc1 = MAP(ub1)(domain)
    uc2 = MAP(ub2)(domain)
    uc3 = MAP(ub3)(domain)
    uc4 = MAP(ub4)(domain)
    uc5 = MAP(ub5)(domain)

    #  structuring

    up0 = STRUCT([gen0,uc0,uc1,uc2,uc3,uc4,uc5])
    up1 = STRUCT([up0, T([2])([4.2])(R([2,3])(PI)(up0))])

    gen = STRUCT([gen1, T([3])([4])(up1)])

    return gen



profile = STRUCT([profile_xz(), profile_yz(), profile_xy()])

# VIEW(profile)

#################################################


###############SUPPORT METHODS
#---------------------------------------------------------
def VERTEXTRUDE((V,coords)):
    """
        Utility function to generate the output model vertices in a 
        multiple extrusion of a LAR model.
        V is a list of d-vertices (each given as a list of d coordinates).
        coords is a list of absolute translation parameters to be applied to 
        V in order to generate the output vertices.
        
        Return a new list of (d+1)-vertices.
    """
    return CAT(AA(COMP([AA(AR),DISTR]))(DISTL([V,coords])))

def cumsum(iterable):
    # cumulative addition: list(cumsum(range(4))) => [0, 1, 3, 6]
    iterable = iter(iterable)
    s = iterable.next()
    yield s
    for c in iterable:
        s = s + c
        yield s

def larExtrude(model,pattern):
    V,FV = model
    d = len(FV[0])
    offset = len(V)
    m = len(pattern)
    outcells = []
    for cell in FV:
        # create the indices of vertices in the cell "tube"
        tube = [v + k*offset for k in range(m+1) for v in cell]
        # take groups of d+1 elements, via shifting by one
        rangelimit = len(tube)-d
        cellTube = [tube[k:k+d+1] for k in range(rangelimit)]
        outcells += [scipy.reshape(cellTube,newshape=(m,d,d+1)).tolist()]
    outcells = AA(CAT)(TRANS(outcells))
    outcells = [group for k,group in enumerate(outcells) if pattern[k]>0 ]
    coords = list(cumsum([0]+(AA(ABS)(pattern))))
    outVerts = VERTEXTRUDE((V,coords))
    newModel = outVerts, CAT(outcells)
    return newModel

def GRID(args):
    model = ([[]],[[0]])
    for k,steps in enumerate(args):
        model = larExtrude(model,steps*[1])
    V,cells = model
    verts = AA(list)(scipy.array(V) / AA(float)(args))
    return MKPOL([verts, AA(AA(lambda h:h+1))(cells), None])
#---------------------------------------------------------


domain1D = INTERVALS(1)(20)
domain2D = GRID([20,20])

# RAGGI

def raggio():
	p0 = [[0,0,0],	  [0.2,-0.04,0.05],  [0.3,-0.2,0.1],  [0.45,-0.04,0.05],  [0.5,0,0],    [0.45,0.04,0.05],  [0.3,0.2,0.1],  [0.2,0.04,0.05],[0,0,0]]
	p1 = [[0.2,0,0.3],[0.2,-0.03,0.3],[0.4,-0.1,0.3],[0.6,-0.03,0.3],[0.5,0,0.3], [0.6,0.02,0.3],[0.4,0.1,0.3],[0.2,0.03,0.3], [0.2,0,0.3]]
	p2 = [[0.2,0,0.6],[0.2,-0.02,0.6],[0.4,-0.05,0.6],[0.7,-0.02,0.6],[0.4,0,0.6],  [0.6,0.02,0.6],[0.4,0.05,0.6],[0.2,0.02,0.6], [0.2,0,0.6]]
	p3 = [[0.1,0,0.8],[0.2,-0.01,0.8],[0.4,-0.02,0.8],[0.6,-0.01,0.8],[0.3,0,0.8], [0.6,0.01,0.8],[0.4,0.02,0.8],[0.1,0.01,0.8], [0.1,0,0.8]]
	

	b0 = BEZIER(S1)(p0)
	b1 = BEZIER(S1)(p1)
	b2 = BEZIER(S1)(p2)
	b3 = BEZIER(S1)(p3)

	c0 = MAP(b0)(domain1D)
	c1 = MAP(b1)(domain1D)
	c2 = MAP(b2)(domain1D)
	c3 = MAP(b3)(domain1D)

	s0 = MAP(BEZIER(S2)([b0,b1,b2,b3]))(domain2D)

	# VIEW(STRUCT([c0,c1,c2,c3]))
	return s0

def raggi():
	r0 = raggio()
	r1 = R([1,3])(-2*PI/5)(raggio())
	r2 = R([1,3])(-4*PI/5)(raggio())
	r3 = R([1,3])(-8*PI/5)(raggio())
	r4 = R([1,3])(-16*PI/5)(raggio())
	raggi = STRUCT([r0,r1,r2,r3,r4])
	return raggi


def cerchio():
	c0 = RING([0.7,1])([36,36])
	c0_3d = PROD([c0,Q(0.05)])
	c1 = RING([0.7,0.8])([36,36])
	c1_3d = T([3])([0.05])(PROD([c1,Q(0.7)]))
	c = STRUCT([c0_3d,c1_3d,T([3])([0.7])(c0_3d)])

	return c

def cerchio_interno():
    c0 = CYLINDER([0.4,0.08])(36)
    c1 = CYLINDER([0.2,0.1])(12)
    cerchio_int = STRUCT([c0, T([3])([0.08])(c1), T([3])([-0.08])(c1)])
    return cerchio_int

# VIEW(R([2,3])(-PI/2)(cerchio()))

# VIEW(raggi())
# VIEW(cerchio_interno())

inter = STRUCT([raggi(),T([2])([-0.04])(R([2,3])(-PI/2)(cerchio_interno()))])

cerchio_completo = STRUCT([inter, R([2,3])(-PI/2)(cerchio())])

col_circle = COLOR(GRAY)(cerchio_completo) 


# COPERTONE

def copertone():
    #SIDE
    p0 = [[0,0,0.7],[0.7,0,0.7],[0.7,0,0]]
    p1 = [[0,0,1.3],[1.3,0,1.3],[1.3,0,0]]

    b0 = BEZIER(S1)(p0)
    b1 = BEZIER(S1)(p1)

    c0 = MAP(b0)(domain1D)
    c1 = MAP(b1)(domain1D)

    s0 = MAP(BEZIER(S2)([b0,b1]))(domain2D)

    
    #TOP

    l00 = [[0,0,0.7],[0,0.7,0.7]]
    l01 = [[0.7,0,0.7],[0.7,0.7,0.7]]
    l02 = [[0.7,0,0],[0.7,0.7,0]]

    l10 = [[0,0,1.3],[0,0.7,1.3]]
    l11 = [[1.3,0,1.3],[1.3,0.7,1.3]]
    l12 = [[1.3,0,0],[1.3,0.7,0]]

    lb00 = BEZIER(S1)(l00)
    lb01 = BEZIER(S1)(l01)
    lb02 = BEZIER(S1)(l02)

    lb10 = BEZIER(S1)(l10)
    lb11 = BEZIER(S1)(l11)
    lb12 = BEZIER(S1)(l12)

    ls00 = MAP(BEZIER(S2)([lb00,lb01,lb02]))(domain2D)
    ls10 = MAP(BEZIER(S2)([lb10,lb11,lb12]))(domain2D)

    # STRUCTURING
    quart = STRUCT([s0,ls00,ls10,T([2])([0.6])(s0)])
    full = STRUCT([quart,R([1,3])(PI/2)(quart),R([1,3])(PI)(quart),R([1,3])(3*PI/2)(quart)])
    return COLOR(BLACK)(full)

wheel = STRUCT([col_circle,T([2])([0.05])(copertone())])


# generating all the 4-wheels
wheels_row = STRUCT([T([1])([2.7])(wheel),T([1])([7.9])(wheel)])
wheels_row1 = T([2])([5])(R([2,3])(PI)(wheels_row))
wheels = STRUCT([wheels_row,wheels_row1])




######################### EXERCISE 4 ##############################


domain = INTERVALS(1)(20)
domain2d = GRID([20,20])



# esterno volante -> up
p0 = [[0,0,0],[0,0.1,0], [0,0.02,0.2],[0,-0.02,-0.2]]
p1 = [[-1,0,-1],[-1,0.1,-1], [-0.2,0.02,0],[0.2,-0.02,0]]


ch = CUBICHERMITE(S1)(p0)
ch1 = CUBICHERMITE(S1)(p1)

c = MAP(ch)(domain)
c1 = MAP(ch1)(domain)

s = MAP(CUBICHERMITE(S2)([ch,ch1,[-2.5,0,0],[0.2,0,-1]]))(domain2d)
ext_up_t = STRUCT([T([3])([1.01])(s),T([1])([0.8])(R([1,3])(-PI/2)(s))])
ext_up_d = R([2,3])(PI)(ext_up_t)
# R([1,3])(-PI)(s),R([1,3])(-3*PI/2)(s)])
# VIEW(STRUCT([c,c1]))
up = STRUCT([ext_up_t,T([1,2,3])([-0.007,0.1,0.18])(ext_up_d)])




# esterno volante -> down
d0 = [[0,0,0],[0,0.1,0], [0,-0.02,-0.2],[0,0.02,0.2]]
d1 = [[-1,0,-1],[-1,0.1,-1], [0.2,-0.02,0],[-0.2,0.02,0]]


dh = CUBICHERMITE(S1)(d0)
dh1 = CUBICHERMITE(S1)(d1)

d = MAP(ch)(domain)
d1 = MAP(ch1)(domain)

s = MAP(CUBICHERMITE(S2)([dh,dh1,[-2.5,0,0],[0.2,0,-1]]))(domain2d)
ext_down_t = STRUCT([T([3])([1.01])(s),T([1])([0.8])(R([1,3])(-PI/2)(s))])
ext_down_d = R([2,3])(PI)(ext_down_t)
# R([1,3])(-PI)(s),R([1,3])(-3*PI/2)(s)])
# VIEW(STRUCT([c,c1]))
down = STRUCT([ext_down_t,T([1,2,3])([-0.007,0.1,0.18])(ext_down_d)])

ext = STRUCT([up,down])

# VIEW(STRUCT([up,down]))


# interno volante

p0 = [[0,0,0],[0,0,0], [0.2,1,0],[-0.2,2,0]]
p1 = [[0,0,0.9],[0,0,0.9], [0.2,1,0.3],[-0.2,2,0.3]]

ch = CUBICHERMITE(S1)(p0)
ch1 =  CUBICHERMITE(S1)(p1)

s = MAP(BEZIER(S2)([ch,ch1]))(domain2d)

s0 = R([1,2])(PI/2)(s)

s1 = R([1,3])(2*PI/3)(s0)
s2 = R([1,3])(4*PI/3)(s0)
s3 = R([1,3])(6*PI/3)(s0)

rays = STRUCT([s1,s2,s3])

# VIEW(STRUCT([ext,T([1,3])([-0.1,0.1])(rays)]))


d_i = CIRCLE(0.2)([8,8])
d_i_3d = PROD([d_i,Q(0.1)])
c0 = RING([0.2,0.3])([8,8])
c0_3d = PROD([c0,Q(0.15)])

hearth = STRUCT([d_i_3d,c0_3d]) 

steering = STRUCT([STRUCT([ext,T([1,3])([-0.04,0.08])(R([2,3])(-PI/2)(hearth)),T([1,3])([-0.1,0.1])(rays)])])

col_steering = COLOR(CYAN)(steering) 

r_steer = R([1,3])(PI)(col_steering)
r1_steer = R([1,2])(PI/2)(r_steer)

# VIEW(r1_steer)

# VIEW(STRUCT([profile,wheels,T([1,2,3])([4,1.5,1.7])(r1_steer)]))



############################ ESERCIZIO 5 ##############################


domain = GRID([20,20])
 

# SPECCHIETTO


half1=BEZIER(S1)([[0,0,0],[0,0.1,0],[0.1,0.1,0],[0.1,0,0]])
fn1=CYLINDRICALSURFACE([half1,[0,0,0.2]])
half2=BEZIER(S1)([[0,0,0],[0,-0.1,0],[0.1,-0.1,0],[0.1,0,0]])
fn2=CYLINDRICALSURFACE([half2,[0,0,0.2]])
h1 = MAP(fn1)(domain)
h2 = MAP(fn2)(domain)

sostegno = STRUCT([h1,h2])
sostengi = STRUCT([sostegno, T([1])([0.2])(sostegno)]) 

# VIEW(sostengi)

#specchietto
vert=BEZIER(S1)([[0,0,0],[2,0,0],[0,0,4],[0,0,0]])
hor =BEZIER(S2)([[0,0,0],[3,-0.5,0],[3,3.5,0],[0,3,0]])
specchietto = MAP(PROFILEPRODSURFACE([vert,hor]))(domain)
s_specchietto = S([1,2,3])([0.3,0.3,0.3])(specchietto)
r_specchietto = R([1,2])(-PI/2)(s_specchietto)
r1_specchietto = R([1,3])(PI/2)(r_specchietto)

specchio_completo = COLOR(RED)(STRUCT([sostengi,T([1,2,3])([0.5,0.3,0.2])(r1_specchietto)]))
r0_sp_completo = R([2,3])(PI/2)(specchio_completo) 
r1_sp_completo = R([1,3])(-PI/2)(r0_sp_completo)

# VIEW(r1_sp_completo)



# COFANO
p1=BEZIER(S1)([[0.5,1.3,0],[0.3,1.8,0.1],[0.3,2.6,0.1],[0.5,3,0]])
p2=BEZIER(S1)([[1.6,1,0.05],[1.6,1.6,0.05],[1.6,2.8,0.05],[1.6,3.2,0]])
p3=BEZIER(S1)([[3,0.7,0.2],[2.7,1.6,0.3],[2.7,2.6,0.3],[3,3.5,0.2]])

cof0 = MAP(BEZIER(S2)([p1,p2,p3]))(domain)
r_cof = R([1,3])(PI/12)(cof0)
cof = COLOR(RED)(r_cof)

# VIEW(cof)


########### STRUTTURA HW2 COMPLETA

VIEW(STRUCT([profile,wheels,T([1,2,3])([4,1.5,1.7])(r1_steer),T([1,3])([3.7,2])(r1_sp_completo),T([1,2,3])([0.3,0.4,1.5])(cof)]))