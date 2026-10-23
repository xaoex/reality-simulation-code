/* Tests for maxopts_everything_this_era */
#include <stdio.h>
#include <limits.h>

int maxopts_everything_this_era(int *c, int size);

static int failures = 0;

#define EXPECT(expr) do { if (!(expr)) { printf("FAIL: %s (line %d)\n", #expr, __LINE__); failures++; } } while (0)

int main(void) {
    int mixed[] = {3, 9, -2, 7};
    int negatives[] = {-5, -1, -8};
    int single[] = {42};
    int ties[] = {4, 4, 4};
    int extremes[] = {INT_MIN, INT_MAX, 0};

    EXPECT(maxopts_everything_this_era(mixed, 4) == 9);
    EXPECT(maxopts_everything_this_era(negatives, 3) == -1);
    EXPECT(maxopts_everything_this_era(single, 1) == 42);
    EXPECT(maxopts_everything_this_era(ties, 3) == 4);
    EXPECT(maxopts_everything_this_era(extremes, 3) == INT_MAX);
    EXPECT(maxopts_everything_this_era(mixed, 1) == 3);
    EXPECT(maxopts_everything_this_era(NULL, 3) == INT_MIN);
    EXPECT(maxopts_everything_this_era(mixed, 0) == INT_MIN);
    EXPECT(maxopts_everything_this_era(mixed, -1) == INT_MIN);

    if (failures) {
        return 1;
    }
    printf("test_maxopts: all tests passed\n");
    return 0;
}
