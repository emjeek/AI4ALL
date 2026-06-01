export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.ai4allwithmj.com") {
      url.hostname = "ai4allwithmj.com";
      return Response.redirect(url.toString(), 308);
    }

    if (request.method === "GET" && url.pathname === "/api/health") {
      return Response.json({
        ok: true,
        service: "ai4all"
      });
    }

    return env.ASSETS.fetch(request);
  }
};
