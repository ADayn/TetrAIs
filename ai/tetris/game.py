from typing import *
import numpy as np
import random

from tetris.shape import Shape
from tetris.block import Block, down, left, right, rot_cw, rot_ccw
from tetris.utils import str_bool_ndarray
from tetris.game_type import GameType

free = False
taken = True


class Game:

    #
    # Private methods
    #

    def __init__(self, type: GameType):
        height = type.height
        width = type.width
        shapes = type.shapes
        if height < 1:
            raise ValueError("Height must be at least 1")
        if width < 1:
            raise ValueError("Width must be at least 1")
        if len(shapes) == 0:
            raise ValueError("At least one shape must be provided")

        assert all(map(lambda shape: shape.width < width, shapes)), "No shapes can be wider than board"

        # Extra space needed on top for placing the next falling shape out of view
        top_extra = max(map(lambda shape: shape.height, shapes))
        # Extra space needed on each side so a shape can be up against the wall
        # without it's matrix (and thus, (x, y) location) passing out of bounds.
        side_extra = max(map(lambda shape: shape.width, shapes))
        # 1 added to height for bottom boarder, so no pieces fall through
        bottom_extra = 1
        board = np.full((height + top_extra + bottom_extra, width + side_extra * 2), free, dtype=bool)

        # Add boarders
        board[-1, :] = taken  # Bottom
        board[:, 0:side_extra] = taken  # Left
        board[:, -side_extra:] = taken  # right

        # Fill fields
        self.score: int = 0
        self.board: np.ndarray = board
        self.block: Block = None
        self.shapes: List[Shape] = shapes
        # N, E, S, W
        self.boarder: Tuple[int, int, int, int] = (top_extra, side_extra, bottom_extra, side_extra)
        self.width: int = width
        self.height: int = height
        self.game_over: bool = False

        # Initialize game
        self.gen_block()

    def __str__(self) -> str:
        only_board = self.get_visible()
        if self.block is None:
            string = str_bool_ndarray(only_board)
        else:
            n, e, s, w = self.boarder
            b = self.block
            y = b.y - n
            x = b.x - w
            y1, y2 = y, y + b.height
            x1, x2 = x, x + b.width
            only_block = np.full((self.height, self.width), False, dtype=bool)
            only_block[y1:y2, x1:x2] |= b.matrix()
            string = str_bool_ndarray(only_block | only_board)

        if self.game_over:
            string = "GAME OVER\n" + string + "\nSCORE: %d" % self.score
        return string

    def clear_full_rows(self) -> None:
        """
        Responsible for turning this:

        |      |
        |[][][]| <-
        |  [][]|
        |[][][]| <-
        |  []  |

        into this:

        |      |
        |      | <-
        |  [][]|
        |      | <-
        |  []  |

        and updating scores
        """
        assert not self.game_over
        visible_rows: np.ndarray = self.get_visible()
        streak = 0
        for row in visible_rows:
            if row.all():
                row[:] = free
                streak += 1
            else:
                streak = 0
            if streak:
                # Some random exponential scoring function I made up
                self.score += 10 * (3 ** streak)

    def drop_floating_rows(self) -> None:
        """
        Responsible for turning this:

        |      |
        |      |
        |  [][]|
        |      | <-
        |  []  |

        into this:

        |      |
        |      |
        |      |
        |  [][]|
        |  []  |
        """
        assert not self.game_over
        visible_rows: np.ndarray = self.get_visible()
        # Keep track of this so we know which row to pull from when filling
        # empty row
        dropped = 0
        height = len(visible_rows)
        for i in reversed(range(height)):
            while i - dropped >= 0 and not visible_rows[i - dropped].any():
                dropped += 1
            if i - dropped < 0:
                return
            else:
                # Swap rows (does nothing if dropped is 0)
                visible_rows[[i, i - dropped]] = visible_rows[[i - dropped, i]]

    def gen_block(self):
        assert not self.game_over
        if self.block is not None:
            raise ValueError("Cannot generate two blocks before the last has "
                             "been stamped")
        n, e, s, w = self.boarder
        next_shape: Shape = random.choice(self.shapes)
        init_x: int = e + self.width // 2 - next_shape.width // 2
        init_y: int = n - next_shape.height
        self.block = Block(next_shape, x=init_x, y=init_y)

    def get_visible(self) -> np.ndarray:
        n, e, s, w = self.boarder
        return np.atleast_2d(self.board[n:-s, w:-e])

    def get_staging(self) -> np.ndarray:
        n, e, s, w = self.boarder
        return np.atleast_2d(self.board[0:n, w:-e])

    def attempt_translation(self,
                            translation: Callable[[Block], Block],
                            otherwise: Callable[[], None] = None):
        assert not self.game_over
        new_block = translation(self.block)
        new_y = new_block.y
        new_x = new_block.x
        y1, y2 = new_y, new_y + new_block.height
        x1, x2 = new_x, new_x + new_block.width
        overlapping_new: np.ndarray = self.board[y1:y2, x1:x2]
        assert overlapping_new.shape == new_block.matrix().shape
        if not (overlapping_new & new_block.matrix()).any():
            self.block = new_block
        elif otherwise is not None:
            otherwise()

    def ensure_not_gameover(self):
        if self.game_over:
            raise ValueError("Unsupported when game is over")

    #
    # Public methods
    #

    def down(self) -> None:
        self.ensure_not_gameover()

        def otherwise():
            # Collision, need to stamp current block into board and generate new
            # one, or end game if stamped block enters staging area
            curr_block = self.block
            curr_x = curr_block.x
            curr_y = curr_block.y
            # Stamp block
            y1, y2 = curr_y, curr_y + curr_block.height
            x1, x2 = curr_x, curr_x + curr_block.width
            self.board[y1:y2, x1:x2] |= curr_block.matrix()
            self.block = None
            # Check for end of game
            self.clear_full_rows()
            self.drop_floating_rows()
            if self.get_staging().any():
                self.game_over = True
            else:
                self.gen_block()

        self.attempt_translation(down, otherwise)

    def left(self) -> None:
        self.ensure_not_gameover()
        self.attempt_translation(left)

    def right(self) -> None:
        self.ensure_not_gameover()
        self.attempt_translation(right)

    def rot_cw(self) -> None:
        self.ensure_not_gameover()
        self.attempt_translation(rot_cw)

    def rot_ccw(self) -> None:
        self.ensure_not_gameover()
        self.attempt_translation(rot_ccw)
