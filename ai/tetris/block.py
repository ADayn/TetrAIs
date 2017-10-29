import numpy as np
from tetris.shape import Shape


class Block:
    """
    A class to represent the blocks which fall in the game. Each has a shape and
    starts at a rotation of 0.
    """
    def __init__(self, shape: Shape, rot: int = 0, x: int = 0, y: int = 0) -> None:
        self.shape = shape
        self.rot = rot
        self.x = x
        self.y = y
        self.width = shape.width
        self.height = shape.height

    def matrix(self) -> np.ndarray:
        return self.shape.rots[self.rot]


def rot_cw(block: Block) -> Block:
    """
    Returns a new block, rotated 90 degrees clockwise.
    The original block is unchanged.
    """
    return Block(
        shape=block.shape,
        rot=(block.rot + 1) % 4,
        x=block.x,
        y=block.y,
    )


def rot_ccw(block: Block) -> Block:
    """
    Returns a new block, rotated 90 degrees counter-clockwise.
    The original block is unchanged.
    """
    return Block(
        shape=block.shape,
        rot=(block.rot - 1) % 4,
        x=block.x,
        y=block.y,
    )


def down(block: Block) -> Block:
    """
    Returns a new block, shifted 1 y down.
    The original block is unchanged.
    """
    return Block(
        shape=block.shape,
        rot=block.rot,
        x=block.x,
        y=block.y + 1,
    )


def left(block: Block) -> Block:
    """
    Returns a new block, shifted 1 x down (left).
    The original block is unchanged.
    """
    return Block(
        shape=block.shape,
        rot=block.rot,
        x=block.x - 1,
        y=block.y,
    )


def right(block: Block) -> Block:
    """
    Returns a new block, shifted 1 x up (right).
    The original block is unchanged.
    """
    return Block(
        shape=block.shape,
        rot=block.rot,
        x=block.x + 1,
        y=block.y,
    )
