/**
 * Reality Simulation Code - MaxOpts Test Suite
 * Tests for maxopts_everything_this_era()
 */

#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

/* forward-declare the function under test */
int maxopts_everything_this_era(int *c, int size);

static int tests_run = 0;
static int tests_passed = 0;

#define ASSERT_EQ(actual, expected, msg) do { \
    tests_run++; \
    if ((actual) == (expected)) { \
        printf("[PASS] %s\n", msg); \
        tests_passed++; \
    } else { \
        printf("[FAIL] %s  (got %d, want %d)\n", msg, (actual), (expected)); \
    } \
} while (0)

/* ---- tests ---- */

static void test_single_element(void) {
    int arr[] = {42};
    ASSERT_EQ(maxopts_everything_this_era(arr, 1), 42,
              "single element returns that element");
}

static void test_all_positive(void) {
    int arr[] = {3, 1, 4, 1, 5, 9, 2, 6};
    ASSERT_EQ(maxopts_everything_this_era(arr, 8), 9,
              "max of {3,1,4,1,5,9,2,6} is 9");
}

static void test_all_negative(void) {
    int arr[] = {-7, -3, -10, -1};
    ASSERT_EQ(maxopts_everything_this_era(arr, 4), -1,
              "max of all-negative array is -1");
}

static void test_mixed_sign(void) {
    int arr[] = {-100, 0, 50, -50, 100};
    ASSERT_EQ(maxopts_everything_this_era(arr, 5), 100,
              "max of mixed-sign array is 100");
}

static void test_duplicates(void) {
    int arr[] = {7, 7, 7, 7};
    ASSERT_EQ(maxopts_everything_this_era(arr, 4), 7,
              "max of all-same array returns that value");
}

static void test_null_pointer(void) {
    ASSERT_EQ(maxopts_everything_this_era(NULL, 5), INT_MIN,
              "NULL pointer returns INT_MIN");
}

static void test_zero_size(void) {
    int arr[] = {1, 2, 3};
    ASSERT_EQ(maxopts_everything_this_era(arr, 0), INT_MIN,
              "zero size returns INT_MIN");
}

static void test_negative_size(void) {
    int arr[] = {1, 2, 3};
    ASSERT_EQ(maxopts_everything_this_era(arr, -1), INT_MIN,
              "negative size returns INT_MIN");
}

static void test_large_values(void) {
    int arr[] = {INT_MAX, INT_MIN, 0};
    ASSERT_EQ(maxopts_everything_this_era(arr, 3), INT_MAX,
              "max with INT_MAX in array returns INT_MAX");
}

/* ---- runner ---- */

int main(void) {
    printf("=== MaxOpts Test Suite ===\n");
    test_single_element();
    test_all_positive();
    test_all_negative();
    test_mixed_sign();
    test_duplicates();
    test_null_pointer();
    test_zero_size();
    test_negative_size();
    test_large_values();
    printf("==========================\n");
    printf("Results: %d/%d tests passed\n", tests_passed, tests_run);
    return (tests_passed == tests_run) ? 0 : 1;
}
