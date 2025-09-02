// create user

// create article

// edit article

// delete article

import { check, group } from "k6";
import http from "k6/http";
import { Options } from "k6/options";

export const options: Options = {
  cloud: {
    distribution: {
      "amazon:de:frankfurt": { loadZone: "amazon:de:frankfurt", percent: 100 },
    },
    projectID: 4089466,
    name: "Article CRUD",
  },
  vus: 1,
  iterations: 1,
};

export default function () {
  const token = group("login", () => {
    const response = http.post(
      "https://conduit-api.learnwebdriverio.com/api/users/login",
      JSON.stringify({ user: { email: "psp@gm.com", password: "1234" } }),
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "en-US,en;q=0.9,uk;q=0.8",
          Connection: "keep-alive",
          "Content-Type": "application/json;charset=UTF-8",
          Host: "conduit-api.learnwebdriverio.com",
          Origin: "https://demo.learnwebdriverio.com",
          Referer: "https://demo.learnwebdriverio.com/",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
          "sec-ch-ua":
            '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
        },
      }
    );

    check(response, {
      "Status 200": (response) => response.status === 200,
    });

    return response.json()!["user"]["token"];
  });

  const slug = group("create article", () => {
    const articleResponse = http.post(
      "https://conduit-api.learnwebdriverio.com/api/articles",
      JSON.stringify({
        article: {
          author: {},
          title: "test",
          description: "test",
          body: "safasfaf",
          tagList: [],
        },
      }),
      {
        headers: {
          Authorization: `Token ${token}`,
          Accept: "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "en-US,en;q=0.9,uk;q=0.8",
          Connection: "keep-alive",
          "Content-Type": "application/json;charset=UTF-8",
          Host: "conduit-api.learnwebdriverio.com",
          Origin: "https://demo.learnwebdriverio.com",
          Referer: "https://demo.learnwebdriverio.com/",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
          "sec-ch-ua":
            '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
        },
      }
    );

    check(articleResponse, {
      "Status 200": (articleResponse) => articleResponse.status === 200,
    });

    const slug = articleResponse.json()!["article"]["slug"];

    return slug;
  });

  group("edit article", () => {
    const editArticleResponse = http.put(
      `https://conduit-api.learnwebdriverio.com/api/articles/${slug}`,
      JSON.stringify({
        article: {
          slug: slug,
          title: "test11123",
          description: "test",
          body: "safasfafafsas",
          createdAt: "2025-08-27T17:34:10.515Z",
          updatedAt: "2025-08-27T17:34:10.515Z",
          tagList: [],
          favorited: false,
          favoritesCount: 0,
          author: {
            username: "psp",
            image: "https://static.productionready.io/images/smiley-cyrus.jpg",
            following: false,
          },
        },
      }),
      {
        headers: {
          authorization: `Token ${token}`,
          Accept: "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "en-US,en;q=0.9,uk;q=0.8",
          Connection: "keep-alive",
          "Content-Type": "application/json;charset=UTF-8",
          Host: "conduit-api.learnwebdriverio.com",
          Origin: "https://demo.learnwebdriverio.com",
          Referer: "https://demo.learnwebdriverio.com/",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
          "sec-ch-ua":
            '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
        },
      }
    );

    check(editArticleResponse, {
      "Status 200": (editArticleResponse) => editArticleResponse.status === 200,
    });
  });

  group("delete article", () => {
    const deleteArticleResponse = http.del(
      `https://conduit-api.learnwebdriverio.com/api/articles/${slug}`,
      null,
      {
        headers: {
          authorization: `Token ${token}`,
          Accept: "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "en-US,en;q=0.9,uk;q=0.8",
          Connection: "keep-alive",
          "Content-Type": "application/json;charset=UTF-8",
          Host: "conduit-api.learnwebdriverio.com",
          Origin: "https://demo.learnwebdriverio.com",
          Referer: "https://demo.learnwebdriverio.com/",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
          "sec-ch-ua":
            '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
        },
      }
    );

    check(deleteArticleResponse, {
      "Status 204": (deleteArticleResponse) =>
        deleteArticleResponse.status === 204,
    });
  });
}
