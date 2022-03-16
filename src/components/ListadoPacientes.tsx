import Paciente from "./Paciente";
import { IPaciente } from "./Formulario";
import { useEffect } from 'react';

const ListadoPacientes = ({pacientes,setPaciente, eliminarPaciente}: {pacientes: IPaciente[],setPaciente:Function,eliminarPaciente:Function}): JSX.Element => {

  // useEffect(()=>{
  //   if(pacientes.length > 0){
  //     console.log("Nuevo Paciente");
  //   } 
  // },[pacientes])

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {pacientes && pacientes.length ? (
        <>
          <h2 className="font-black text-center text-3xl">Listado Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {""}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>

          {pacientes.map((paciente: IPaciente) => {
            return <Paciente key={paciente.id} paciente={paciente} setPaciente={setPaciente} eliminarPaciente={eliminarPaciente}/>
            })}
        </>
      ) : (
        <>
          <h2 className="font-black text-center text-3xl">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando pacientes {""}
            <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
          </p>
        </>
      )}
    </div>
  );
};
export default ListadoPacientes;
