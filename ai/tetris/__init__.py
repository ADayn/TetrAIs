from tetris.shape import Shape
from tetris.game_type import GameType

simple_shapes = [
    # dot
    Shape(
        rot_0=[
            [1]
        ],
        rot_90=[
            [1]
        ],
        rot_180=[
            [1]
        ],
        rot_270=[
            [1]
        ],
    )
]

simplest = GameType(simple_shapes, 3, 3)
classic = ... # TODO
