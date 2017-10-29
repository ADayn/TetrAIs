from typing import *

import numpy as np


def str_bool_ndarray(array: np.ndarray, filler: str="[]") -> str:
    elem_len = len(filler)
    x, y = array.shape
    to_char = np.vectorize(lambda x: filler if x is True else " " * elem_len)
    char_array = to_char(array)
    header = "-" * (x * elem_len + 2)
    body = "\n".join(["|" + "".join(row) + "|" for row in char_array])
    return "\n".join([header, body, header])
