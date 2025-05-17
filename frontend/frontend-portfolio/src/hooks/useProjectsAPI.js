import { useEffect, useState } from 'react'

export function useProjectsAPI() {
	const [projects, setProjects] = useState([])

	//const URL = "" // para MSW
	const URL = "https://6827ff336b7628c52911e155.mockapi.io" // oara MockApi
	//const URL = "[insira URL final aqui]" //url do back verdadeiro

	useEffect(() => {
		fetch(URL+'/api/projects')
			.then(res => {
				if (!res.ok) throw new Error('Failed to fetch projects')
				return res.json()
			})
			.then(setProjects)
			.catch(err => {
				console.error('[useProjectsAPI] Error loading projects:', err)
				setProjects([]) // fallback to empty
			})
	}, [])

	const addProject = async (data) => {
		const res = await fetch(URL+'/api/projects', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
		const newProject = await res.json()
		setProjects(prev => [...prev, newProject])
	}

	const updateProject = async (data) => {
		const res = await fetch(URL+`/api/projects/${data.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
		const updated = await res.json()
		setProjects(prev => prev.map(p => p.id === data.id ? updated : p))
	}

	const deleteProject = async (id) => {
		await fetch(URL+`/api/projects/${id}`, { method: 'DELETE' })
		setProjects(prev => prev.filter(p => p.id !== id))
	}

	return [projects, { addProject, updateProject, deleteProject }]
}
