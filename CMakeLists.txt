cmake_minimum_required(VERSION 3.10)
project(RealitySimulationCode VERSION 1.0.0 LANGUAGES C)

# Set C standard
set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED ON)

# Add executable for simsim
add_executable(simsim simsim.c)

# Add library for maxopts
add_library(maxopts STATIC maxopts.c)

# Enable testing
enable_testing()

# Add a simple test
add_test(NAME SimSimTest COMMAND simsim)

# Unit test: simsim
add_executable(test_simsim tests/test_simsim.c)
add_test(NAME UnitTest_SimSim COMMAND test_simsim)

# Unit test: maxopts
add_executable(test_maxopts tests/test_maxopts.c maxopts.c)
add_test(NAME UnitTest_MaxOpts COMMAND test_maxopts)

# Installation rules
install(TARGETS simsim maxopts
    RUNTIME DESTINATION bin
    LIBRARY DESTINATION lib
    ARCHIVE DESTINATION lib)
