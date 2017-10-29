from typing import *
import numpy as np

from tetris.utils import str_bool_ndarray

Rotation = NewType("Rotation", List[List[int]])


class Shape:
    """
    A class to define shapes with 4 rotations
    """
    def __init__(self,
                 rot_0: Rotation,
                 rot_90: Rotation,
                 rot_180: Rotation,
                 rot_270: Rotation):
        """
        each `rot_n` is a 2 dimensional, X * X List of Lists that represents the
        4 rotations of the shape. Place 1 where the shape exists, 0 elsewhere
        """
        rots = np.array([rot_0,
                         rot_90,
                         rot_180,
                         rot_270], dtype=bool)
        assert len(rots.shape) == 3, "Shape must be two dimensional list"
        assert rots.any(axis=0).all(), "All rotations must have at least one " \
                                       "filled square"
        self.rots: np.ndarray = rots
        self.width: int = rots.shape[1]
        self.height: int = rots.shape[2]

    def __str__(self):
        return str_bool_ndarray(self.rots[0])
