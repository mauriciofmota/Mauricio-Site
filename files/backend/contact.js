export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/whatsapp") {
      const msg = encodeURIComponent("Hi Mauricio! I just saw your portfolio and wanted to get in touch.");
      return Response.redirect(`https://wa.me/${env.ZAP_NUMBER}?text=${msg}`, 302);
    }
    return new Response("No Acess.", { status: 403 });
  }
};