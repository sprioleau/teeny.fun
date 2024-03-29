import Head from "next/head";
import type { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";
import { trpc } from "@utils";

const REDIRECT_DURATION = 2500;

const RedirectPage: NextPage = () => {
  const router = useRouter();

  const { query } = router;
  const { to: redirectUrl, id } = query as { to: string; id: string | undefined };
  const { data: teenyUrlData } = trpc.url.getHits.useQuery({ id });

  React.useEffect(() => {
    if (!query) router.push("/");
    if (!window || !id) return;

    const redirectTimeout = setTimeout(() => {
      router.push(`/redirect-handler?redirectUrl=${redirectUrl}&id=${id}`);
    }, REDIRECT_DURATION);

    return () => clearTimeout(redirectTimeout);
  }, [router, query, id, redirectUrl]);

  return (
    <>
      <Head>
        <title>Teeny.fun</title>
        <meta
          name="description"
          content="Make teeny tiny URLs with emojis 😂!"
        />
        <link
          rel="icon"
          href="/teeny-fun-favicon.png"
          type="image/png"
        />
      </Head>

      <div className="redirect page">
        <h2>Redirecting to {redirectUrl}</h2>
        {Boolean(teenyUrlData?.hits) && <p>Hits: {teenyUrlData?.hits}</p>}
      </div>
    </>
  );
};

export default RedirectPage;
