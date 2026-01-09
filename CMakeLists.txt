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

# Installation rules
install(TARGETS simsim maxopts
    RUNTIME DESTINATION bin
    LIBRARY DESTINATION lib
    ARCHIVE DESTINATION lib)
