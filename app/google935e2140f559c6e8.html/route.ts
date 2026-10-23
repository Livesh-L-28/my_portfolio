export async function GET() {
  return new Response("google-site-verification: google935e2140f559c6e8.html", {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
