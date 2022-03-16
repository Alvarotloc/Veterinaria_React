import { useState, useEffect } from "react";
import Error from "./Error";

export interface IPaciente {
  nombre: string;
  propietario: string;
  email: string;
  fecha: string;
  sintomas: string;
  id?: string;
}

const Formulario = ({
  pacientes,
  setPacientes,
  paciente,
  setPaciente,
}: {
  pacientes: IPaciente[];
  setPacientes: Function;
  paciente: IPaciente;
  setPaciente: Function;
}): JSX.Element => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    const { nombre, propietario, email, fecha, sintomas } = paciente;

    if (Object.keys(paciente).length > 0) {
      setNombre(nombre);
      setPropietario(propietario);
      setEmail(email);
      setFecha(fecha);
      setSintomas(sintomas);
    }
  }, [paciente]);

  const generarId: () => string = (): string => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación del Formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      console.log("Hay Al Menos un campo vacio");

      setError(true);
      return;
    }

    setError(false);

    // Objeto de Paciente
    const objetoPaciente: IPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    };

    if (paciente.id) {
      // Editando el Registro
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      );

      setPacientes(pacientesActualizados);
      setPaciente({});
    } else {
      // Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    // Reiniciar el form
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="text-center font-black text-3xl">Seguimiento Pacientes</h2>

      <p className="mt-5 text-lg text-center mb-10">
        Añade pacientes y {""}
        <span className="text-indigo-600 font-bold">Adminístralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5"
        onSubmit={handleSubmit}
      >
        {error && <Error>Todos los campos son obligatorios</Error>}
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Mascota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(evento) => {
              setNombre(evento.target.value);
            }}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(evento) => {
              setPropietario(evento.target.value);
            }}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(evento) => {
              setEmail(evento.target.value);
            }}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Alta
          </label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(evento) => {
              setFecha(evento.target.value);
            }}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Síntomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describa los síntomas"
            className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(evento) => {
              setSintomas(evento.target.value);
            }}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold cursor-pointer transition-all rounded-md hover:bg-indigo-700"
          value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
        />
      </form>
    </div>
  );
};

export default Formulario;
