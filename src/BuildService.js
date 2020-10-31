const url = 'http://localhost:5001/api/builds/'

class BuildService {
    // Get
    static getBuilds() {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((res) => res.json())
                .then(function (data) {
                    resolve(
                        data.map(build => ({
                            ...build,
                            createdAt: new Date(build.createdAt)
                        }))
                    )
                })
                .catch(err => {
                    reject(err)
                })

        })
    }

    // Create
    static insertBuild(name, user, items) {
        let data = {
            name,
            user,
            items
        }
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
    // Delete
    static deleteBuild(id) {
        return fetch(`${url}${id}`, {
            method: 'DELETE'
        })
    }
}

export default BuildService