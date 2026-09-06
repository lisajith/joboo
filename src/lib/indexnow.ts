const INDEXNOW_KEY = "3396849ccc4a40d8828b2bc0875989ff";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://whereismyjob.vercel.app";

export async function notifyIndexNow(urls: string[]) {
  if (!urls.length) return;

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: "whereismyjob.vercel.app",
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });

    if (!response.ok) {
      console.error(
        "IndexNow submission failed:",
        response.status,
        await response.text(),
      );
      return;
    }

    console.log("IndexNow submitted:", urls);
  } catch (error) {
    console.error("IndexNow error:", error);
  }
}
