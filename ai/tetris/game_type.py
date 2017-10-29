from typing import *
from tetris.shape import Shape


class GameType:
    def __init__(self, shapes: List[Shape], height: int, width: int):
        self.shapes: List[Shape] = shapes
        self.height: int = height
        self.width: int = width
