def grid_paths(m: int, n: int) -> int:
    if m == 1 or n == 1:
        return 1
    else:
        return grid_paths(m - 1, n) + grid_paths(m, n - 1)
