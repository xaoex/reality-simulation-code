#!/bin/sh
# Tests for the simsim executable output and exit status
set -e
out=$("${1:-./simsim}")
echo "$out" | grep -q "Reality Simulation Code - SimSim"
echo "$out" | grep -q "Version: 1.0.0"
echo "$out" | grep -q "Author: xaoex"
echo "test_simsim: all tests passed"
