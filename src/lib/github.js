const GITHUB_OWNER = "usamaimdadsian";
const GITHUB_API_BASE = "https://api.github.com";

function createHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchGithubJson(path) {
  const response = await fetch(`${GITHUB_API_BASE}${path}`, {
    headers: createHeaders(),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status} ${path}`);
  }

  return response.json();
}

function decodeBase64Utf8(value) {
  return Buffer.from(value, "base64").toString("utf8");
}

export async function getPublicRepositories() {
  try {
    const repositories = await fetchGithubJson(`/users/${GITHUB_OWNER}/repos?per_page=100&sort=updated`);

    return repositories
      .filter((repository) => !repository.private)
      .sort((left, right) => new Date(right.pushed_at).getTime() - new Date(left.pushed_at).getTime())
      .map((repository) => ({
        id: repository.id,
        name: repository.name,
        slug: repository.name,
        description: repository.description || "No repository description provided yet.",
        htmlUrl: repository.html_url,
        homepage: repository.homepage || "",
        language: repository.language || "",
        topics: Array.isArray(repository.topics) ? repository.topics : [],
        updatedAt: repository.pushed_at || repository.updated_at,
        createdAt: repository.created_at,
        defaultBranch: repository.default_branch,
        stargazersCount: repository.stargazers_count,
        forksCount: repository.forks_count,
      }));
  } catch (error) {
    console.error("Failed to fetch public repositories", error);
    return [];
  }
}

export async function getRepositoryReadme(repoName) {
  try {
    const readme = await fetchGithubJson(`/repos/${GITHUB_OWNER}/${repoName}/readme`);

    return {
      content: decodeBase64Utf8(readme.content || ""),
      htmlUrl: readme.html_url || "",
      path: readme.path || "README.md",
    };
  } catch (error) {
    console.error(`Failed to fetch README for ${repoName}`, error);
    return {
      content: "",
      htmlUrl: "",
      path: "README.md",
    };
  }
}

export async function getRepositoryProject(repoName) {
  const repositories = await getPublicRepositories();
  const repository = repositories.find((entry) => entry.name === repoName);

  if (!repository) {
    return null;
  }

  const readme = await getRepositoryReadme(repoName);

  return {
    ...repository,
    readme,
  };
}

export { GITHUB_OWNER };
