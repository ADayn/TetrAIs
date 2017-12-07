module Array2dUtils exposing
    ( or2d
    , slice
    )

import Array2D exposing (Array2D, indexedMap, get)
import CoreUtils exposing ((?), sign, Sign(..))

--liftMaybe : Array2D (Maybe a) -> Maybe (Array2D a)

or2d : (a -> Bool) -> a -> Array2D a -> Array2D a -> Array2D a
or2d isTrue errFill arr1 arr2 =
    let
        orArr2 = \row col cell ->
                         if isTrue cell then cell
                         else get row col arr2 ? errFill
    in
        indexedMap (orArr2)

slice : Int -> Int -> Int -> Int -> Maybe (Array2D a)
slice row1 col1 row2 col2 =
    let

        (topLeft, bottomLeft) =
            case sign (row1 - row2) of
                Negative -> (row2, row1)
                _        -> (row1, row2)

        (topLeft, bottomLeft) =
            case sign (row1 - row2) of
                Negative -> (row2, row1)

    in

