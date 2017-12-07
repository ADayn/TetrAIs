-- Main.elm
module Main exposing (..)
import Model exposing (..)
import Subscriptions
import Update
import View

main : Program Never Model Msg
main =
    Html.program
        { init = Model.init
        , view = View.view
        , update = Update.update
        , subscriptions = Subscriptions.subscriptions
        }