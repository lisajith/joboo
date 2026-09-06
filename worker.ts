import handler from "vinext/server/fetch-handler";

export default {
  async fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url);

    // Redirect old Cloudflare domain to Vercel
    if (url.hostname === "joboo.whereismyjob.workers.dev") {
      const destination = new URL(
        `https://whereismyjob.vercel.app${url.pathname}${url.search}`,
      );

      return Response.redirect(destination.toString(), 308);
    }

    // Let Vinext handle everything else
    return handler.fetch(request, env, ctx);
  },
};
