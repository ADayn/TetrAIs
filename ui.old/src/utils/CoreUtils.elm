module CoreUtils exposing (..)

(?) : Maybe a -> a -> a
(?) (Just a) _  = a
(?) (Nothing) a = a
infixr 8 ?

type Sign = Negative | Positive | Zero
sign : Int -> Sign
sign i =
    if      i == 0 then Zero
    else if i < 0  then Negative
    else                Positive
