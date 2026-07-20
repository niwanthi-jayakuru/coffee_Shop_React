export function notFound(req, res) {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    },
  });
}

export function errorHandler(err, req, res, next) {
  const status = typeof err?.status === "number" ? err.status : 500;

  if (status >= 500) {
    // Avoid leaking stack traces to clients; keep it server-side.
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(status).json({
    error: {
      code: err?.code ?? (status >= 500 ? "INTERNAL_ERROR" : "BAD_REQUEST"),
      message: err?.message ?? "Something went wrong",
    },
  });
}

