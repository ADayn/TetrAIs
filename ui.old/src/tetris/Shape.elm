module Shape exposing
    ( Shape(..)
    )

type Shape4x4 = Shape Bool Bool Bool Bool
                      Bool Bool Bool Bool
                      Bool Bool Bool Bool
                      Bool Bool Bool Bool

rot_cw : Shape4x4 -> Shape4x4
rot_cw Shape c00 c01 c02 c03
             c10 c11 c12 c13
             c20 c21 c22 c23
             c30 c31 c32 c33 =

