import React from "react";
import { Jumbotron, Form, ListGroup } from "react-bootstrap";
import { useState } from "react";

//create your first component
export function Home() {
	const [tareas, setTareas] = useState([]);
	const [agregar, setAgregar] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		let copia = tareas;
		if (agregar !== "") {
			setTareas([...copia, agregar]);
			setAgregar("");
		}
	};

	const eliminar = index => {
		// let copia = [...tareas];
		// copia.splice(index, 1);
		// setTareas(copia);
		setTareas(tareas.filter((tarea, i) => i !== index));
	};

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
									{tarea}{" "}
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
