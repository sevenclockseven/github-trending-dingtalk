function formatProjectData(project) {
    return {
        title: project.name,
        url: project.html_url,
        description: project.description || 'No description available',
        stars: project.stargazers_count,
        forks: project.forks_count,
        language: project.language || 'Not specified',
        owner: project.owner.login,
    };
}

export { formatProjectData };