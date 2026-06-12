const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = "2024-01-01"

async function sanityFetch(query: string, params = {}) {
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ params }),
  })
  const data = await res.json()
  return data.result
}

export { sanityFetch, projectId, dataset, apiVersion }