export const setCollectionCacheHeaders = (req, res) => {
  res.vary("Authorization");

  if (req.headers.authorization) {
    res.set("Cache-Control", "no-store");
    return;
  }

  res.set(
    "Cache-Control",
    "public, max-age=60, s-maxage=300, stale-while-revalidate=86400"
  );
};
