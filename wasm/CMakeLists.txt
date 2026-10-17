cmake_minimum_required(VERSION 3.16)

project(chad_wasm LANGUAGES CXX)

# chad::Error is thrown and caught inside the engine, so wasm needs real exceptions
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fwasm-exceptions")

set(CHAD_BUILD_APP OFF CACHE BOOL "" FORCE)
set(CHAD_BUILD_TESTS OFF CACHE BOOL "" FORCE)
add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/../chadnet ${CMAKE_BINARY_DIR}/chadnet)

add_executable(chad bindings.cpp)
target_link_libraries(chad PRIVATE chad::core embind)
target_link_options(chad PRIVATE
    -fwasm-exceptions
    -sMODULARIZE
    -sEXPORT_ES6
    -sENVIRONMENT=web,worker
    -sALLOW_MEMORY_GROWTH
)
set_target_properties(chad PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/../src/engine/wasm
)