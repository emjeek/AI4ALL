export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/api/health") {
      return Response.json({
        ok: true,
        service: "ai4all-mj"
      });
    }

    return env.ASSETS.fetch(request);
  }
};
