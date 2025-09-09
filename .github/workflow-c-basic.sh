#!/bin/bash

# Install necessary compilers/interpreters
sudo apt-get update
sudo apt-get install -y build-essential gcc gdb nasm

# Install Basic interpreter (using bwbasic as an example)
sudo apt-get install -y bwbasic

# Function to compile and run C programs
compile_and_run_c() {
    gcc -o "$1.out" "$1.c"
    ./"$1.out"
}

# Function to assemble and run Assembly programs
assemble_and_run_asm() {
    nasm -f elf64 "$1.asm" && ld -o "$1" "$1.o"
    ./"$1"
}

# Function to run Basic programs
run_basic() {
    bwbasic "$1.bas"
}

# Check for language and file extensions, then run accordingly
for file in *; do
    case "$file" in
        *.c)
            compile_and_run_c "${file%.*}"
            ;;
        *.asm)
            assemble_and_run_asm "${file%.*}"
            ;;
        *.bas)
            run_basic "$file"
            ;;
        *)
            echo "Unknown file type: $file"
            ;;
    esac
done
