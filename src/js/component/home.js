import React from "react";
import { Jumbotron, Form, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";

//create your first component
export function Home() {
	const [tareas, setTareas] = useState([]);
	const [agregar, setAgregar] = useState("");
	const URI = "https://assets.breatheco.de/apis/fake/todos/";

	const handleSubmit = e => {
		e.preventDefault();
		if (agregar !== "") {
			manejarFetchPut();
		}
	};

	const eliminar = index => {
		manejarFetchDelete(index);
	};

	const manejarFetchGet = async () => {
		try {
			const response = await fetch(URI + "/user/aserdnad");
			const data = await response.json();
			console.log(data);
			setTareas(data);
		} catch (error) {
			console.log(error);
		}
	};

	const manejarFetchPut = async () => {
		try {
			const response = await fetch(URI + "/user/aserdnad", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify([
					...tareas,
					{ label: agregar, done: false }
				])
			});
			if (response.ok) {
				await manejarFetchGet();
				setAgregar("");
			} else {
				console.log(response.status);
				console.log(response.statusText);
				const data = await response.json();
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const manejarFetchDelete = async id => {
		try {
			const copia = tareas;
			copia.splice(id, 1);
			const response = await fetch(URI + "/user/aserdnad", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify([...copia])
			});
			if (response.ok) {
				manejarFetchGet();
			} else {
				console.log(response.status);
				console.log(response.statusText);
				const data = await response.json();
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		manejarFetchGet();
	}, []);

	return (
		<div className="contenido">
			<h1 className="mt-5">todos</h1>
			<Jumbotron className="container bg-white">
				<Form onSubmit={e => handleSubmit(e)}>
					<Form.Group controlId="formTodo">
						<Form.Control
							type="text"
							placeholder="Agrega tu tarea manito"
							value={agregar}
							onChange={e => setAgregar(e.target.value)}
						/>
					</Form.Group>
				</Form>
				<ListGroup>
					{tareas.length === 0 ? (
						<ListGroup.Item>
							No hay tareas pendientes, agregue tarea
						</ListGroup.Item>
					) : (
						tareas.map((tarea, index) => {
							return (
								<ListGroup.Item
									key={index}
									className="escondido d-flex justify-content-between">
									{tarea["label"]}{" "}
									<span onClick={e => eliminar(index)}>
										❌
									</span>
								</ListGroup.Item>
							);
						})
					)}
					{tareas.length > 0 && (
						<ListGroup.Item className="final">
							Quedan {tareas.length} pendientes
						</ListGroup.Item>
					)}
				</ListGroup>
			</Jumbotron>
		</div>
	);
}
