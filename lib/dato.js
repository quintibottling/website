const API_KEY = process.env.NEXT_PUBLIC_DATO_API_KEY;

export default async function fetchData(q, v = null, preview = false) {
  try {
    const response = await fetch(
      `https://graphql.datocms.com${preview ? "/preview" : ""}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ query: q, variables: v }),
      }
    );
    console.log("status", response?.status);
    const result = await response.json();
    if (result?.errors) {
      console.error("RESPONSE ERROR");
      throw result.errors;
    }
    return result?.data;
  } catch (error) {
    console.error("QUERY ERROR", v, q);
    throw error;
  }
}
