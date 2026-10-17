#include <cstddef>
#include <string>

#include <emscripten/bind.h>

#include "chad/core/error.h"
#include "chad/lang/compile.h"
#include "chad/net/engine.h"
#include "chad/runtime/io.h"

struct RunResult {
    std::string output;
    std::string error;
    int line = 0;
};

static RunResult run(const std::string& source) {
    RunResult result;

    chad::Io io{chad::IoHandlers{
        [](char*, std::size_t) -> long { return 0; },
        [&result](const char* bytes, std::size_t count) -> long {
            result.output.append(bytes, count);
            return static_cast<long>(count);
        },
        [] { return true; },
    }};

    try {
        chad::run(chad::compile(source), io);
    } catch (const chad::Error& error) {
        io.flushOutput();
        result.error = error.what();
        result.line = error.line;
    }

    return result;
}

EMSCRIPTEN_BINDINGS(chad) {
    emscripten::value_object<RunResult>("RunResult")
        .field("output", &RunResult::output)
        .field("error", &RunResult::error)
        .field("line", &RunResult::line);

    emscripten::function("run", &run);
}